"use server";
import { createClient } from "@/lib/supabase/server";

export async function signUp(_: any, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  });

  if (error) return { error: "Signup failed." };
  return { message: "Check email to continue sign in process." };
}
