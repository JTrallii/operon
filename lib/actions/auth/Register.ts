'use server';


import { supabaseAdmin } from "@/lib/supabase/admin";


export async function register(formData: FormData) {


  const nome = formData.get("nome") as string;
  const sobrenome = formData.get("sobrenome") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // cria no auth (admin)
  const { data: authData, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // já confirma automaticamente
  });



  if (error) {
    return { success: false, message: "Esse e-mail já está cadastrado !" };
  }

  const userId = authData.user?.id;


  // insere em usuarios
  const { error: userError } = await supabaseAdmin.schema("operon").from("usuarios").insert({
    id: userId,
    nome: `${nome} ${sobrenome}`,
    role: "cliente",
  });


  if (userError) {
    return { success: false, message: "Erro ao inserir usuário !" };
  }

  // insere em clientes
  const { error: clienteError } = await supabaseAdmin.schema("operon").from("clientes").insert({
    nome,
    sobrenome,
    usuario_id: userId,
    email,
  });

  if (clienteError) {
    return { success: false, message: "Erro ao inserir cliente !" };
  }

  return { success: true };
}


