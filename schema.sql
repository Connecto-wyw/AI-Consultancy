-- =========================================================
-- Connecto AI Consultancy - Ultra Thin MVP Schema
-- =========================================================

-- 1. Drop old tables from the previous complex workflow
DROP VIEW IF EXISTS public.latest_case_diagnoses;
DROP VIEW IF EXISTS public.latest_case_deliverables;
DROP TABLE IF EXISTS public.case_reviews CASCADE;
DROP TABLE IF EXISTS public.case_deliverables CASCADE;
DROP TABLE IF EXISTS public.case_diagnoses CASCADE;
DROP TABLE IF EXISTS public.case_messages CASCADE;
DROP TABLE IF EXISTS public.case_outputs CASCADE;
DROP TABLE IF EXISTS public.consulting_cases CASCADE;

-- 2. Profiles (Keep if already exists)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  full_name TEXT,
  company_name TEXT,
  role TEXT NOT NULL DEFAULT 'client',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Thin MVP Consulting Cases
CREATE TABLE public.consulting_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  input_text TEXT NOT NULL,
  consulting_type TEXT NOT NULL CHECK (consulting_type IN ('marketing', 'automation', 'branding', 'sales')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Case Outputs (Single JSON response mapping)
CREATE TABLE public.case_outputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.consulting_cases(id) ON DELETE CASCADE UNIQUE,
  diagnosis_json JSONB NOT NULL,
  strategy_json JSONB NOT NULL,
  deliverables_json JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Disable RLS for rapid MVP testing
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.consulting_cases DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_outputs DISABLE ROW LEVEL SECURITY;
