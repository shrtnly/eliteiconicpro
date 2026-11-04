-- ============================================================================
-- QUICK ADMIN PROMOTION SCRIPT FOR: freeman.find@gmail.com
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ============================================================================

-- 1. Ensure the profiles table exists
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'staff', 'admin')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
  last_sign_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Insert or update freeman.find@gmail.com as 'admin'
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

-- 3. Verify the result
SELECT id, email, role, status, created_at FROM public.profiles WHERE lower(email) = 'freeman.find@gmail.com';

