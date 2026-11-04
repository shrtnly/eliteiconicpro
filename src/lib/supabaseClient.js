import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://isqrtfnpztylatjrkgpi.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzcXJ0Zm5wenR5bGF0anJrZ3BpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzMTY4NzgsImV4cCI6MjEwODg5Mjg3OH0.Tgex5kbNxXi8vb_hh8AyOscGr7RAC4ZZoJ_AmcpQOI0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storageKey: 'dreamzone-auth-token',
  },
  db: {
    schema: 'public'
  }
})
