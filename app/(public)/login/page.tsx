"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/header/logo";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/painel-principal");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex mb-8">
            <Logo textSize="text-2xl" iconSize={20} />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Bem-vindo de volta</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Acesse sua conta operacional</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail corporativo</Label>
              <Input 
                type="email" 
                placeholder="seu@exemplo.com" 
                // required 
                className="h-11 border-slate-200 rounded-lg focus-visible:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Senha de acesso</Label>
                <a href="#" className="text-[10px] text-blue-600 hover:underline font-bold uppercase tracking-widest">Esqueceu?</a>
              </div>
              <Input 
                type="password" 
                placeholder="••••••••" 
                // required 
                className="h-11 border-slate-200 rounded-lg focus-visible:ring-blue-500"
              />
            </div>
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 rounded-lg transition-all group">
              Entrar no sistema <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center text-sm">
          <span className="text-slate-500 font-medium">Não tem acesso?</span>{" "}
          <Link href="/cadastrar" className="text-blue-600 font-bold hover:underline">
            Solicitar cadastro
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;