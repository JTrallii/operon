"use server";



import { createClient } from "@/lib/supabase/server";

type dataRegisterProps = {
    nome: string,
    email: string,
    password: string
}

export async function register(data: dataRegisterProps) {
  const supabase = await createClient();

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) throw new Error(error.message);

  const userId = authData.user?.id;

  await supabase.from("usuarios").insert({
    id: userId,
    nome: data.nome,
    role: "cliente",
  });

  await supabase.from("clientes").insert({
    nome: data.nome,
    usuario_id: userId,
    email: data.email
  });
}