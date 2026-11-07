import { createClient } from '@supabase/supabase-js'

export const SUPABASE_ORIGIN_URL = import.meta.env.VITE_SUPABASE_URL || 'https://isqrtfnpztylatjrkgpi.supabase.co'
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzcXJ0Zm5wenR5bGF0anJrZ3BpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzMTY4NzgsImV4cCI6MjEwODg5Mjg3OH0.Tgex5kbNxXi8vb_hh8AyOscGr7RAC4ZZoJ_AmcpQOI0'

const PROXY_PREFIX = '/supabase-api'

/**
 * Resilient fetch:
 * 1. First try the same-origin proxy (/supabase-api -> Supabase) so ad-blockers,
 *    firewalls and ISP blocks of *.supabase.co cannot break login (works locally via
 *    Vite proxy and in production via vercel.json / netlify _redirects rewrite).
 * 2. If the proxy is not available (network error, or 404 HTML from SPA fallback),
 *    fall back to the direct Supabase URL.
 */
const resilientFetch = async (input, init) => {
  if (typeof window === 'undefined') return fetch(input, init)

  const req = input instanceof Request ? input : null
  const rawUrl = req ? req.url : String(input)

  let parsed
  try {
    parsed = new URL(rawUrl)
  } catch {
    return fetch(input, init)
  }

  const origin = new URL(SUPABASE_ORIGIN_URL).origin
  if (parsed.origin !== origin) return fetch(input, init)

  const proxyUrl = `${window.location.origin}${PROXY_PREFIX}${parsed.pathname}${parsed.search}`
  const directReq = req ? req.clone() : null

  try {
    const res = await fetch(req ? new Request(proxyUrl, req) : proxyUrl, init)
    const type = res.headers.get('content-type') || ''
    const proxyMissing = res.status === 404 && type.includes('text/html')
    if (!proxyMissing) return res
  } catch {
    // proxy unreachable -> fall back to direct
  }

  return fetch(directReq || input, init)
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
