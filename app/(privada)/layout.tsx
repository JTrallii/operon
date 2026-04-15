import { createClient } from "@/lib/supabase/server";
import Header from "../../components/header/header";
import { redirect } from "next/navigation";


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

  if (!user) {
    redirect("/login");
  }

  // buscar dados completos no banco
  const { data: usuario } = await supabase
    .from("usuarios")
    .select("id, nome, role")
    .eq("id", user.id)
    .maybeSingle();


  return (
    <>
      <Header usuario={usuario} />
      <main className="p-8">{children}</main>
    </>
  );
}
