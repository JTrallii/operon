

'use server';

import { supabaseAdmin } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function criarEspecialidade(formData: FormData) {
  const nome = formData.get('nome') as string;
  if (!nome || nome.trim().length === 0) {
    return { success: false, message: 'Nome da especialidade é obrigatório.' };
  }

  const { data, error } = await supabaseAdmin
    .schema('operon')
    .from('especialidades')
    .insert({ nome: nome.trim() })
    .select('id, nome')
    .single();

  if (error) {
    console.error(error);
    return { success: false, message: error.message };
  }

  revalidatePath('/tecnicos'); // atualiza a lista de técnicos (se necessário)
  return { success: true, message: 'Especialidade criada!', data };
}