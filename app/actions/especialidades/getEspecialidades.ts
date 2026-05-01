




'use server'


import { createClient } from "@/lib/supabase/server";
import Especialidade from "@/types/especialidade";


export async function getEspecialidades(): Promise<{ success: boolean, data: Especialidade[], mensagem?: string }> {

    const supabase = await createClient();

    const { data, error } = await supabase
    .schema('operon')
    .from('especialidades')
    .select('*')
    .order('nome');

    if (error) {
      return {
        success: false,
        data: [],
        mensagem: "Nenhuma especialidade cadastrada no sistema !",
      };
    }

    return { success: true, data: data || [] };
};