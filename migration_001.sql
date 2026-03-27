-- SQL Migration to update the schema for the new Thin UI specifications

BEGIN;

-- 1. Add "general" to the check constraint for `consulting_type`
ALTER TABLE public.consulting_cases DROP CONSTRAINT IF EXISTS consulting_cases_consulting_type_check;

ALTER TABLE public.consulting_cases ADD CONSTRAINT consulting_cases_consulting_type_check 
  CHECK (consulting_type IN ('marketing', 'automation', 'branding', 'sales', 'general'));

-- 2. Set default value for `consulting_type`
ALTER TABLE public.consulting_cases ALTER COLUMN consulting_type SET DEFAULT 'general';

-- 3. Rename `deliverables_json` to `deliverable_json` inside `case_outputs` to match requested naming exactly
DO $$ 
BEGIN 
  IF EXISTS(
    SELECT *
    FROM information_schema.columns
    WHERE table_name='case_outputs' AND column_name='deliverables_json'
  )
  THEN
      ALTER TABLE public.case_outputs RENAME COLUMN deliverables_json TO deliverable_json;
  END IF;
END $$;

COMMIT;
