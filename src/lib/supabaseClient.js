import { createClient } from '@supabase/supabase-js'

export const SUPABASE_ORIGIN_URL = import.meta.env.VITE_SUPABASE_URL || 'https://isqrtfnpztylatjrkgpi.supabase.co'
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzcXJ0Zm5wenR5bGF0anJrZ3BpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzMTY4NzgsImV4cCI6MjEwODg5Mjg3OH0.Tgex5kbNxXi8vb_hh8AyOscGr7RAC4ZZoJ_AmcpQOI0'

/**
 * Dynamically resolves the best endpoint:
 * In browser environments on localhost/127.0.0.1 or same-origin deployments,
 * routes through the `/supabase-api` reverse proxy to eliminate browser ad-blocker
 * blocks (Brave Shields, uBlock Origin, Privacy Badger) and CORS preflight issues.
 */
export const getEffectiveSupabaseUrl = () => {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname
    const isLocal = host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')
    if (isLocal) {
      return `${window.location.origin}/supabase-api`
    }
  }
  return SUPABASE_ORIGIN_URL
}

/**
 * Resilient custom fetcher:
 * Handles direct or proxied requests, cleanly cloning Request bodies if retry is needed.
 */
const resilientFetch = async (input, init) => {
  let rawUrl = ''
  if (typeof input === 'string') {
    rawUrl = input
  } else if (input instanceof URL) {
    rawUrl = input.toString()
  } else if (input?.url) {
    rawUrl = input.url
  }

  // Pre-clone request in case body stream needs to be re-read on fallback
  let clonedReq = null
  if (input instanceof Request) {
    try {
      clonedReq = input.clone()
    } catch {
      // ignore
    }
  }

  try {
    return await fetch(input, init)
  } catch (err) {
    const errMsg = (err?.message || '').toLowerCase()
    const isFetchErr = err?.name === 'TypeError' || 
                       errMsg.includes('failed to fetch') || 
                       errMsg.includes('network') ||
                       errMsg.includes('blocked')

    if (isFetchErr && typeof window !== 'undefined' && rawUrl && rawUrl.includes('supabase.co')) {
      try {
        const parsed = new URL(rawUrl)
        const proxyUrl = `${window.location.origin}/supabase-api${parsed.pathname}${parsed.search}`
        
        if (clonedReq) {
          const body = await clonedReq.arrayBuffer().catch(() => null)
          const headers = new Headers(clonedReq.headers)
          return await fetch(proxyUrl, {
            method: clonedReq.method,
            headers,
            body: ['GET', 'HEAD'].includes(clonedReq.method) ? undefined : body,
            credentials: clonedReq.credentials
          })
        } else {
          return await fetch(proxyUrl, init)
        }
      } catch (proxyErr) {
        console.warn('Resilient fetch proxy fallback failed:', proxyErr)
      }
    }
    throw err
  }
}

export const supabase = createClient(getEffectiveSupabaseUrl(), SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storageKey: 'dreamzone-auth-token',
  },
  db: {
    schema: 'public'
  },
  global: {
    fetch: resilientFetch
  }
})
