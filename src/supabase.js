import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pgpbvpjjnniyyexsiajb.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncGJ2cGpqbm5peXlleHNpYWpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNzY2ODgsImV4cCI6MjA0ODk1MjY4OH0.irUMF_tyMRLzVwZwSBSC_1qkhzEhCyki7beip0d1X1c';
export const supabase = createClient(supabaseUrl, supabaseKey);
