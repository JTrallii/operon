


"use server";

import { createClient } from "@/lib/supabase/server";

type Input = {
  email: string;
  password: string;
  nome: string;
  telefone: string;
  cnpj: string;
  especialidade_id: string;
  nivel: string;
  area_atuacao: string;
};

export async function createTecnico(data: Input) {
  const supabase = await createClient();

  // 1. criar usuário no Auth (admin only)
  const { data: authUser, error: authError } =
    await supabase.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });

  if (authError || !authUser.user) {
    return {
      success: false,
      message: authError?.message || "Erro ao criar usuário",
    };
  }

  const userId = authUser.user.id;

  // 2. inserir na tabela usuarios
  const { error: usuarioError } = await supabase
    .schema("operon")
    .from("usuarios")
    .insert({
      id: userId,
      nome: data.nome,
      role: "tecnico",
    });

  if (usuarioError) {
    return {
      success: false,
      message: "Erro ao criar usuário interno",
    };
  }

  // 3. inserir técnico
  const { error: tecnicoError } = await supabase
    .schema("operon")
    .from("tecnicos")
    .insert({
      id: crypto.randomUUID(),
      usuario_id: userId,
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      cnpj: data.cnpj,
      especialidade_id: data.especialidade_id,
      nivel: data.nivel,
      area_atuacao: data.area_atuacao,
    });

  if (tecnicoError) {
    return {
      success: false,
      message: "Erro ao criar técnico",
    };
  }

  return {
    success: true,
    message: "Técnico criado com sucesso",
  };
}