-- User profiles
CREATE TABLE public.users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'client', -- 'client' or 'human_pm'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Consulting cases (Main workflow wrapper)
CREATE TABLE public.consulting_cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'intake', -- 'intake', 'diagnosis', 'strategy', 'deliverable_generation', 'review', 'completed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Case Messages (The raw inputs / chat history)
CREATE TABLE public.case_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id UUID REFERENCES public.consulting_cases(id) ON DELETE CASCADE,
  sender_role TEXT NOT NULL, -- 'user', 'ai', 'human_pm'
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Case Diagnoses (AI analysis outputs)
CREATE TABLE public.case_diagnoses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id UUID REFERENCES public.consulting_cases(id) ON DELETE CASCADE UNIQUE,
  problem_definition TEXT,
  issue_category TEXT,
  inferred_stage TEXT,
  priorities TEXT,
  recommended_deliverables_jsonb JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Case Deliverables (The generated deliverables)
CREATE TABLE public.case_deliverables (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id UUID REFERENCES public.consulting_cases(id) ON DELETE CASCADE,
  deliverable_type TEXT NOT NULL, -- e.g., 'brand_intro', 'email_draft', 'scope_outline'
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Case Reviews (Internal human PM reviews)
CREATE TABLE public.case_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id UUID REFERENCES public.consulting_cases(id) ON DELETE CASCADE,
  pm_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  comments TEXT,
  status_update TEXT, -- e.g., 'approved', 'needs_revision'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS setup (Example: secure by default, clients see their own cases)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consulting_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_reviews ENABLE ROW LEVEL SECURITY;
