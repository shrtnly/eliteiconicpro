-- ============================================================================
-- Supabase Table Schema: "Schedule & Consultation"
-- Project: Dream Zone Properties Ltd. (Dhaka Icon City)
-- Run in the Supabase SQL Editor, THEN run supabase_admin_setup.sql
-- ============================================================================

CREATE TABLE IF NOT EXISTS public."Schedule & Consultation" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  purpose TEXT NOT NULL,
  visit_date TEXT,
  preferred_time TEXT,
  pickup_location TEXT,
  plot_size TEXT,
  investment_amount TEXT,
  details TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public."Schedule & Consultation" ENABLE ROW LEVEL SECURITY;

-- Website visitors may SUBMIT a request (insert only).
DROP POLICY IF EXISTS "Allow public insert on Schedule & Consultation" ON public."Schedule & Consultation";
CREATE POLICY "Allow public insert on Schedule & Consultation"
  ON public."Schedule & Consultation"
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- IMPORTANT: leads contain personal data (name/phone). Public SELECT is removed.
-- Only admins can read/update/delete (policies are created in supabase_admin_setup.sql).
DROP POLICY IF EXISTS "Allow read on Schedule & Consultation" ON public."Schedule & Consultation";
