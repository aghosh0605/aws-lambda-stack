import { createClient, SupabaseClient } from "@supabase/supabase-js";

const options = {
  db: {
    schema: "public",
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: { "x-htbsrmist-header": "recruitment-portal-v1" },
  },
};

let supabase: SupabaseClient<any, string, any>;
export const connectSupabase = (): SupabaseClient<any, string, any> => {
  if (!supabase) {
    console.log("New SupabaseClient Created!!");

    supabase = createClient("project-url", "anon-public-key", options);
  }
  console.log("SupabaseClient returned!!");
  return supabase;
};
