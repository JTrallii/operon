import { showError } from "@/components/utils/toast";
import { createClient } from "@/lib/supabase/server";
import Endereco from "@/types/Endereco";
import Tecnico from "@/types/Tecnico";




//técnico + endereço (busca individual por ID)
export async function getTecnicoById(id: string): Promise<{ success: boolean; tecnico: Tecnico | null; endereco: Endereco | null; message?: string }> {
  const supabase = await createClient();

  // Busca o técnico
  const { data: tecnico, error: errorTec } = await supabase
    .schema("operon")
    .from("tecnicos")
    .select("*")
    .eq("id", id)
    .single();

  if (errorTec || !tecnico) {
    return { success: false, tecnico: null, endereco: null, message: "Aconteceu algum erro ao buscar pelo técnico !" };
  }

  // Busca o endereço associado (pode não existir)
  const { data: endereco, error: errorEnd } = await supabase
    .schema("operon")
    .from("enderecos")
    .select("*")
    .eq("tecnico_id", id)
    .maybeSingle();

  if (errorEnd) showError("Erro ao carregar endereço do técnico");;

  return { success: true, tecnico, endereco: endereco || null };
}