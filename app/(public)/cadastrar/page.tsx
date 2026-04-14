"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Logo from "@/components/header/logo";
import { ArrowLeft, Loader2 } from "lucide-react";
import { showError, showSuccess } from "@/components/utils/toast";
import { register } from "@/lib/actions/auth/Register";
import { useRouter } from "next/navigation";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [pending, startTransition] = useTransition();

  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
    const res = await register(formData);

    if (!res?.success) {
      showError(res?.message || "Erro ao cadastrar");
      return;
    }

    showSuccess("Cadastro realizado!");

    setTimeout(() => {
      router.push("/painel-principal");
    }, 1500);
  });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Voltar para o Início
      </Link>

      <div className="w-full max-w-[450px] space-y-8">
        <div className="flex flex-col items-center text-center space-y-2">
          <Logo textSize="text-2xl" iconSize={24} />
          <p className="text-slate-500 font-medium text-sm">
            Solicite seu acesso à plataforma Operon
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50">
          <form action={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Nome
                </Label>
                <Input
                  placeholder="João"
                  name="nome"
                  required
                  className="h-11 border-slate-200 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Sobrenome
                </Label>
                <Input
                  placeholder="Silva"
                  name="sobrenome"
                  required
                  className="h-11 border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                E-mail Profissional
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="joao@empresa.com"
                required
                className="h-11 border-slate-200 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Senha
              </Label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="h-11 border-slate-200 rounded-lg"
              />
            </div>

            <div className="flex items-start space-x-3 pt-2">
              <Checkbox
                id="terms"
                className="mt-0.5 border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                required
              />
              <Label
                htmlFor="terms"
                className="text-xs font-medium text-slate-500 leading-relaxed cursor-pointer select-none"
              >
                Aceito os{" "}
                <button
                  type="button"
                  className="text-blue-600 font-bold hover:underline"
                >
                  Termos de Serviço
                </button>{" "}
                e as{" "}
                <button
                  type="button"
                  className="text-blue-600 font-bold hover:underline"
                >
                  diretrizes de privacidade
                </button>{" "}
                do sistema.
              </Label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Criar Minha Conta"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 font-medium">
          Já possui uma conta?{" "}
          <Link href="/login" className="text-blue-600 font-bold hover:underline">
            Fazer Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
