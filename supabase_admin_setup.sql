-- ============================================================================
-- Admin Dashboard setup: profiles, roles, is_admin(), and admin-only RLS
-- Run AFTER supabase_schedule_consultation.sql in the Supabase SQL Editor.
-- ============================================================================

-- 1. Profiles (one row per auth user) --------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'staff', 'admin')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
  last_sign_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Auto-create a profile whenever someone signs up ------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill users who signed up before this script ran
INSERT INTO public.profiles (id, email)
SELECT id, email FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- 3. Role helpers (SECURITY DEFINER avoids recursive RLS on profiles) -------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin' AND status = 'active'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'staff') AND status = 'active'
  );
$$;

-- 4. Profiles policies -------------------------------------------------------
DROP POLICY IF EXISTS "profiles_select_own_or_admin" ON public.profiles;
CREATE POLICY "profiles_select_own_or_admin" ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "profiles_admin_update" ON public.profiles;
CREATE POLICY "profiles_admin_update" ON public.profiles
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 5. Leads: "Schedule & Consultation" (admin = full, staff = read/update) ----
DROP POLICY IF EXISTS "leads_staff_select" ON public."Schedule & Consultation";
CREATE POLICY "leads_staff_select" ON public."Schedule & Consultation"
  FOR SELECT TO authenticated USING (public.is_staff());

DROP POLICY IF EXISTS "leads_staff_update" ON public."Schedule & Consultation";
CREATE POLICY "leads_staff_update" ON public."Schedule & Consultation"
  FOR UPDATE TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());

DROP POLICY IF EXISTS "leads_admin_delete" ON public."Schedule & Consultation";
CREATE POLICY "leads_admin_delete" ON public."Schedule & Consultation"
  FOR DELETE TO authenticated USING (public.is_admin());

-- 6. Inquiries (only if that table exists in your project) ------------------
DO $$
BEGIN
  IF to_regclass('public.inquiries') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "inquiries_staff_select" ON public.inquiries';
    EXECUTE 'CREATE POLICY "inquiries_staff_select" ON public.inquiries FOR SELECT TO authenticated USING (public.is_staff())';
    EXECUTE 'DROP POLICY IF EXISTS "inquiries_public_insert" ON public.inquiries';
    EXECUTE 'CREATE POLICY "inquiries_public_insert" ON public.inquiries FOR INSERT TO anon, authenticated WITH CHECK (true)';
    EXECUTE 'DROP POLICY IF EXISTS "inquiries_admin_delete" ON public.inquiries';
    EXECUTE 'CREATE POLICY "inquiries_admin_delete" ON public.inquiries FOR DELETE TO authenticated USING (public.is_admin())';
  END IF;
END $$;

-- 7. BOOTSTRAP YOUR FIRST ADMIN (Pre-configured for freeman.find@gmail.com) ---
-- Upsert profile for freeman.find@gmail.com and ensure role = 'admin'
INSERT INTO public.profiles (id, email, full_name, role, status)
SELECT 
  id, 
  email, 
  COALESCE(raw_user_meta_data->>'full_name', 'Super Admin'), 
  'admin', 
  'active'
FROM auth.users
WHERE lower(email) = 'freeman.find@gmail.com'
ON CONFLICT (id) DO UPDATE 
SET role = 'admin', status = 'active';

UPDATE public.profiles 
SET role = 'admin', status = 'active' 
WHERE lower(email) = 'freeman.find@gmail.com';


