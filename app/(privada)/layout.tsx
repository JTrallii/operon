import { createClient } from "@/lib/supabase/server";
import Header from "../../components/header/header";
import { redirect } from "next/navigation";

type Usuario = {
  id: string;
  nome: string;
  role: string;
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // usuário autenticado
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("Usuario", user);

  if (!user) {
    redirect("/login");
  }

  // buscar dados completos no banco
  const { data: usuario } = await supabase
    .from("usuarios")
    .select("id, nome, role")
    .eq("id", user.id)
    .maybeSingle();

  console.log(usuario);

  const { data, error: testError } = await supabase
    .from("usuarios")
    .select("*");
  console.log("Teste tabela usuarios:", { data, error: testError });

  console.log("Tem usuario aqui", usuario);
  console.log(await supabase.auth.getUser());
  console.log(await supabase.from("usuarios").select("*"));

  return (
    <>
      <Header usuario={usuario} />
      <main className="p-8">{children}</main>
    </>
  );
}
