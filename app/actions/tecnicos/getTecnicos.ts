

'use server'


import { createClient } from "@/lib/supabase/server";
import Tecnico from "@/types/Tecnico";


export async function getTecnicos(): Promise<{ sucess: boolean, data: Tecnico[], mensagem?: string }> {

    const supabase = await createClient();

    const { data, error } = await supabase
    .schema('operon')
    .from('tecnicos')
    .select('*')
    .order('nome');

    if (error) {
      return {
        sucess: false,
        data: [],
        mensagem: "Nenhum técnico cadastrado no sistema !",
      };
    }

    return { sucess: true, data: data || [] };
};