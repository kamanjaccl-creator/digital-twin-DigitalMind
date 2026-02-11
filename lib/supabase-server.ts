import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabaseServerClient: SupabaseClient | null = null;

export function getSupabaseServer(): SupabaseClient | null {
  if (supabaseServerClient) return supabaseServerClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !serviceKey || !/^https?:\/\//.test(url)) {
    console.warn(
      "Supabase env vars missing or invalid (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_KEY); dashboard will show a setup message."
    );
    return null;
  }

  supabaseServerClient = createClient(url, serviceKey);
  return supabaseServerClient;
}
