-- ============================================================================
-- Supabase Table: "inquiries"
-- Project: Dream Zone Properties Ltd. (Dhaka Icon City)
-- Run this script in the Supabase SQL Editor.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  plot_category TEXT,
  plot_size TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 1. Anyone (public or authenticated) can submit an inquiry via the booking form
DROP POLICY IF EXISTS "Allow public insert on inquiries" ON public.inquiries;
CREATE POLICY "Allow public insert on inquiries"
  ON public.inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 2. Staff and Admin can view inquiries on the dashboard
DROP POLICY IF EXISTS "inquiries_staff_select" ON public.inquiries;
CREATE POLICY "inquiries_staff_select"
  ON public.inquiries
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'staff') AND status = 'active'
    )
  );

-- 3. Staff and Admin can update inquiries (e.g. status)
DROP POLICY IF EXISTS "inquiries_staff_update" ON public.inquiries;
CREATE POLICY "inquiries_staff_update"
  ON public.inquiries
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'staff') AND status = 'active'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'staff') AND status = 'active'
    )
  );

-- 4. Only Admin can delete inquiries
DROP POLICY IF EXISTS "inquiries_admin_delete" ON public.inquiries;
CREATE POLICY "inquiries_admin_delete"
  ON public.inquiries
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin' AND status = 'active'
    )
  );
