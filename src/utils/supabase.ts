import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY
);
const { user, session, error } = await supabase.auth.signUp({
  email: 'example@email.com',
  password: 'example-password',
});
