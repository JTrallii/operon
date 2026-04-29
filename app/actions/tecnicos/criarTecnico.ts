'use server';

import { supabaseAdmin } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function salvarTecnico(_prevState: { success: boolean; message: string }, formData: FormData) {
  const id = formData.get("id") as string | null;
  const password = formData.get("password") as string | null;
  const confirmPassword = formData.get("confirmPassword") as string | null;
  
  // Se for novo técnico, a senha é obrigatória
  const isNew = !id;
  if (isNew && (!password || password !== confirmPassword)) {
    return { success: false, message: "Senha não confere ou não foi informada." };
  }

  // Dados do técnico (tabela tecnicos)
  const tecnicoData = {
    nome: formData.get("nome") as string,
    CNPJ: formData.get("cnpj") as string,
    email: formData.get("email") as string,
    telefone: formData.get("telefone") as string,
    status: formData.get("status") as string,
    especialidade: formData.get("especialidade") as string,
    nivel: formData.get("nivel") as string,
    observacoes: formData.get("observacoes") as string,
  };

  // Endereço
  const enderecoData = {
    logradouro: formData.get("logradouro") as string,
    numero: formData.get("numero") as string,
    complemento: formData.get("complemento") as string,
    bairro: formData.get("bairro") as string,
    cep: formData.get("cep") as string,
    cidade: formData.get("cidade") as string,
    UF: formData.get("uf") as string,
  };

  if (isNew) {
    // 1. Criar usuário no Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: tecnicoData.email,
      password: password!,
      email_confirm: true,
    });
    
    if (authError) return { success: false, message: "Erro ao criar usuário: " + authError.message };
    const userId = authData.user?.id;
    if (!userId) return { success: false, message: "Erro ao obter ID do usuário" };

    // 2. Inserir na tabela usuarios (role = 'tecnico')
    const { error: userError } = await supabaseAdmin
      .schema("operon")
      .from("usuarios")
      .insert({ id: userId, nome: tecnicoData.nome, role: "tecnico" });
    if (userError) {
      // Rollback: deletar usuário do auth
      await supabaseAdmin.auth.admin.deleteUser(userId);
      return { success: false, message: "Erro ao inserir usuário na tabela" };
    }

    // 3. Inserir na tabela tecnicos (usando o mesmo userId como chave estrangeira)
    const { error: insertTecError } = await supabaseAdmin
      .schema("operon")
      .from("tecnicos")
      .insert({ ...tecnicoData, id: userId }); // se a coluna for id

    if (insertTecError) {
      // Rollback: deletar usuario da tabela usuarios e do auth
      await supabaseAdmin.schema("operon").from("usuarios").delete().eq("id", userId);
      await supabaseAdmin.auth.admin.deleteUser(userId);
      return { success: false, message: "Erro ao inserir técnico" };
    }

    // 4. Inserir endereço (com tecnico_id = userId)
    const { error: endError } = await supabaseAdmin
      .schema("operon")
      .from("enderecos")
      .insert({ ...enderecoData, tecnico_id: userId });
    if (endError) {
      // Não precisa fazer rollback total, mas pode logar
      console.error("Endereço não inserido:", endError);
    }

    revalidatePath("/tecnicos");
    return { success: true, message: "Técnico cadastrado com sucesso!" };
  } 
  else {
    // Edição: atualiza técnico e endereço (não mexe no auth)
    const { error: updateTecError } = await supabaseAdmin
      .schema("operon")
      .from("tecnicos")
      .update(tecnicoData)
      .eq("id", id);
    if (updateTecError) return { success: false, message: updateTecError.message };

    // Atualizar endereço (upsert)
    const { data: existingEnd } = await supabaseAdmin
      .schema("operon")
      .from("enderecos")
      .select("id")
      .eq("tecnico_id", id)
      .maybeSingle();
    if (existingEnd) {
      await supabaseAdmin.schema("operon").from("enderecos").update(enderecoData).eq("tecnico_id", id);
    } else {
      await supabaseAdmin.schema("operon").from("enderecos").insert({ ...enderecoData, tecnico_id: id });
    }

    revalidatePath("/tecnicos");
    return { success: true, message: "Técnico atualizado!" };
  }
}