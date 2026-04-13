// 'use server';


// import { supabaseAdmin } from "@/lib/supabase/admin";


// export async function register(formData: FormData) {


//   const nome = formData.get("nome") as string;
//   const sobrenome = formData.get("sobrenome") as string;
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   // cria no auth (admin)
//   const { data: authData, error } = await supabaseAdmin.auth.admin.createUser({
//     email,
//     password,
//     email_confirm: true, // já confirma automaticamente
//   });

//   console.log("AUTH DATA:", authData );
// console.log("AUTH ERROR:", error);

//   if (error) {
//     return { success: false, message: error.message };
//   }

//   const userId = authData.user?.id;
//   console.log("USER ID:", userId);

//   // insere em usuarios
//   const { error: userError } = await supabaseAdmin.schema("operon").from("usuarios").insert({
//     id: userId,
//     nome: `${nome} ${sobrenome}`,
//     role: "cliente",
//   });
//   console.log("USER INSERT ERROR:", userError);

//   if (userError) {
//     return { success: false, message: userError.message };
//   }

//   // insere em clientes
//   const { error: clienteError } = await supabaseAdmin.schema("operon").from("clientes").insert({
//     nome,
//     sobrenome,
//     usuario_id: userId,
//     email,
//   });
//   console.log("CLIENTE INSERT ERROR:", clienteError);

//   if (clienteError) {
//     return { success: false, message: clienteError.message };
//   }

//   return { success: true };
// }


"use server";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function register(formData: FormData) {
  const supabase = await createClient();

  const nome = formData.get("nome") as string;
  const sobrenome = formData.get("sobrenome") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("=== INICIO REGISTER ===");

  // 1. AUTH
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  console.log("AUTH DATA:", data);
  console.log("AUTH ERROR:", error);

  if (error) {
    return { success: false, message: error.message };
  }

  const userId = data.user?.id;

  console.log("USER ID:", userId);

  // 2. TESTE DIRETO NO BANCO (CRÍTICO)
  const { data: testData, error: testError } = await supabaseAdmin
    .schema("operon")
    .from("usuarios")
    .select("*")
    .limit(1);

  console.log("TEST SELECT USUARIOS:", testData);
  console.log("TEST SELECT ERROR:", testError);

  // 3. INSERT USUARIOS
  const { data: userInsertData, error: userError } = await supabaseAdmin
    .schema("operon")
    .from("usuarios")
    .insert({
      id: userId,
      nome: `${nome} ${sobrenome}`,
      role: "cliente",
    })
    .select();

  console.log("USER INSERT DATA:", userInsertData);
  console.log("USER INSERT ERROR:", userError);

  // 4. INSERT CLIENTES
  const { data: clienteInsertData, error: clienteError } =
    await supabaseAdmin
      .schema("operon")
      .from("clientes")
      .insert({
        nome,
        sobrenome,
        usuario_id: userId,
        email,
      })
      .select();

  console.log("CLIENTE INSERT DATA:", clienteInsertData);
  console.log("CLIENTE INSERT ERROR:", clienteError);

  console.log("=== FIM REGISTER ===");

  return { success: true };
}