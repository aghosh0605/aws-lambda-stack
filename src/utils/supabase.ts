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

    supabase = createClient(
      "https://mdeunrgwldikrpqvffht.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kZXVucmd3bGRpa3JwcXZmZmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkyMjM3NDMsImV4cCI6MTk5NDc5OTc0M30.gItWH0cRS3QkyAZMMBJZDSsClAKmWNWz-xSMbLatpl8",
      options
    );
  }
  console.log("SupabaseClient returned!!");
  return supabase;
};
