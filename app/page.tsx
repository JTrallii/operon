"use client";


import { Button } from "../components/ui/button"; 
import Logo from "../components/header/logo"; 
import { ArrowRight, Shield, Zap, BarChart3, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <Link href="/">
            <Logo />
          </Link>
          
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Entrar</Link>
            <Link href="/cadastrar">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg px-5 h-9 text-xs cursor-pointer">
                Começar Agora
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section Operacional */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest">
            Gestão Operacional de Alta Performance
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight text-slate-900">
            A plataforma definitiva para <br />
            <span className="text-blue-600">gestão de serviços técnicos.</span>
          </h1>
          
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Elimine a burocracia e foque na execução. O Operon centraliza ordens, clientes e pagamentos em uma interface limpa e eficiente.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 h-14 text-sm rounded-xl font-bold shadow-xl shadow-blue-500/20 cursor-pointer">
                Criar Conta <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="px-10 h-14 text-sm rounded-xl font-bold border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
                Acessar Sistema
              </Button>
            </Link>
          </div>

          <div className="pt-16 max-w-5xl mx-auto">
            <div className="p-4 bg-slate-100 rounded-[2rem] border border-slate-200">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2400&auhref=format&fit=crop" 
                  alt="Plataforma Operon" 
                  className="w-full h-auto opacity-90"
                  width={860}
                  height={573}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos Focados */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Zap, title: "Agilidade", desc: "Fluxo operacional otimizado para abertura e fechamento de ordens em segundos.", path: "/agilidade" },
              { icon: Shield, title: "Segurança", desc: "Dados protegidos com criptografia de ponta a ponta e backups automáticos.", path: "/seguranca" },
              { icon: BarChart3, title: "Métricas", desc: "Visão clara do seu faturamento e produtividade da equipe em tempo real.", path: "/metricas" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm hover:border-blue-500/50 transition-all group">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                <Link href={item.path} className="mt-6 flex items-center text-blue-600 font-bold text-xs uppercase tracking-widest hover:gap-2 transition-all">
                  Saber mais <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <Link href="/">
            <Logo textSize="text-sm" />
          </Link>
          <p className="text-slate-400 text-xs font-medium">
            &copy; {new Date().getFullYear()} Operon Enterprise. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-xs font-bold text-slate-400">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Termos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
