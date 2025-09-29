"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { error } from "console";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: "Logout failed." };
  }
  redirect("/");
}
