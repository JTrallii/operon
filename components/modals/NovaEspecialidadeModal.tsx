




"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Award } from "lucide-react";
import { showError, showSuccess } from "../utils/toast";
import { criarEspecialidade } from "@/app/actions/especialidades/criarEspecialidade";

interface NovaEspecialidadeModalProps {
  children: React.ReactNode;
  onCreated: () => void 
}

const NovaEspecialidadeModal = ({ children, onCreated }: NovaEspecialidadeModalProps) => {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return showError('Digite o nome da especialidade.');

    setIsLoading(true);
    const formData = new FormData();
    formData.append('nome', nome);
    const result = await criarEspecialidade(formData);
    setIsLoading(false);

    if (result.success) {
      showSuccess(result.message);
      setNome('');
      setOpen(false);
      onCreated(); // notifica o pai para recarregar a lista
    } else {
      showError(result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px] w-[95vw] bg-white border-slate-200 rounded-xl p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="bg-slate-50 border-b border-slate-200 p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-500 rounded-lg flex items-center justify-center text-white shadow-sm">
              <Award size={18} />
            </div>
            <div>
              <DialogTitle className="text-lg md:text-xl font-bold text-slate-900">Nova Especialidade</DialogTitle>
              <DialogDescription className="text-[10px] md:text-xs font-medium text-slate-500">
                Adicione uma nova categoria técnica.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="p-4 md:p-8 space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Nome da Especialidade *</Label>
              <Input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Segurança Eletrônica" required className="h-10 border-slate-200 rounded-lg text-xs" />
            </div>
          </div>

          <DialogFooter className="bg-slate-50 border-t border-slate-200 p-4 md:p-6 gap-2 flex-col sm:flex-row">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="h-10 text-slate-500 font-bold text-xs px-6 w-full sm:w-auto">
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="h-10 px-10 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-lg shadow-sm w-full sm:w-auto">
              {isLoading ? "Cadastrando..." : "Cadastrar Especialidade"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NovaEspecialidadeModal;