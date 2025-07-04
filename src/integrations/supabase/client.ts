// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ustlthsajlnxmjdvtucn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzdGx0aHNhamxueG1qZHZ0dWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0OTc4NTgsImV4cCI6MjA2NzA3Mzg1OH0.vFNm6Qvd2TWyAY0hugGCMKAnMSbGma4TLiMZzgHeZVo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});