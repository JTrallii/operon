
import { createClient } from "@/lib/supabase/server";
import Header from "../../components/header/header";
import { redirect } from "next/navigation";


export default async function Layout({ children }: { children: React.ReactNode }) {

  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  return (
    <>
      <Header />
      <main className="p-20">{children}</main>
    </>
  );
};
