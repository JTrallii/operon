import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function register(formData: FormData) {
  const supabase = await createClient();

  const nome = formData.get("nome") as string;
  const sobrenome = formData.get("sobrenome") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  const userId = authData.user?.id;

  await supabase.from("usuarios").insert({
    id: userId,
    nome: `${nome} ${sobrenome}`,
    role: "cliente",
  });

  await supabase.from("clientes").insert({
    nome,
    sobrenome,
    usuario_id: userId,
    email,
  });

  return { success: true };
}