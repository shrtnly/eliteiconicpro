import { createClient } from '@supabase/supabase-js'

export const SUPABASE_ORIGIN_URL = import.meta.env.VITE_SUPABASE_URL || 'https://isqrtfnpztylatjrkgpi.supabase.co'
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzcXJ0Zm5wenR5bGF0anJrZ3BpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzMTY4NzgsImV4cCI6MjEwODg5Mjg3OH0.Tgex5kbNxXi8vb_hh8AyOscGr7RAC4ZZoJ_AmcpQOI0'

// Resilient custom fetcher:
// If browser ad-blockers (Brave Shields, uBlock Origin, Privacy Badger, AdGuard) or network firewalls
// block direct cross-origin requests to *.supabase.co with "Failed to fetch", automatically retries
// via the same-origin Vite proxy (/supabase-api) so authentication is never blocked.
const resilientFetch = async (input, init) => {
  let rawUrl = ''
  if (typeof input === 'string') {
    rawUrl = input
  } else if (input instanceof URL) {
    rawUrl = input.toString()
  } else if (input?.url) {
    rawUrl = input.url
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
        const proxiedReq = input instanceof Request ? new Request(proxyUrl, init) : proxyUrl
        const proxiedRes = await fetch(proxiedReq, init)
        if (proxiedRes) {
          return proxiedRes
        }
      } catch (proxyErr) {
        console.warn('Resilient fetch proxy retry failed:', proxyErr)
      }
    }
    throw err
  }
}

export const supabase = createClient(SUPABASE_ORIGIN_URL, SUPABASE_ANON_KEY, {
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
