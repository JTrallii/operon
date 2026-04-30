


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
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Briefcase, Award, FileText } from "lucide-react";
import { showSuccess } from "../utils/toast";


interface NewServiceTypeModalProps {
  children: React.ReactNode;
}

const NewServiceTypeModal = ({ children }: NewServiceTypeModalProps) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Tipo de serviço cadastrado com sucesso!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px] w-[95vw] max-h-[90vh] bg-white border-slate-200 rounded-xl p-0 overflow-hidden shadow-2xl flex flex-col">
        <DialogHeader className="bg-slate-50 border-b border-slate-200 p-4 md:p-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
              <Briefcase size={18} />
            </div>
            <div>
              <DialogTitle className="text-lg md:text-xl font-bold text-slate-900">Novo Tipo de Serviço</DialogTitle>
              <DialogDescription className="text-[10px] md:text-xs font-medium text-slate-500">
                Defina um novo serviço padrão.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 no-scrollbar">
          <div className="p-4 md:p-8 space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Nome do Serviço *</Label>
              <Input placeholder="Ex: Manutenção Preventiva" required className="h-10 border-slate-200 rounded-lg text-xs" />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                <Award size={12} className="text-blue-500" /> Especialidade *
              </Label>
              <Select required>
                <SelectTrigger className="h-10 border-slate-200 rounded-lg text-xs">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem className="cursor-pointer" value="eletrica">Elétrica</SelectItem>
                  <SelectItem className="cursor-pointer" value="climatizacao">Climatização</SelectItem>
                  <SelectItem className="cursor-pointer" value="hidraulica">Hidráulica</SelectItem>
                  <SelectItem className="cursor-pointer" value="infra-ti">Infra de TI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                <FileText size={12} className="text-slate-400" /> Descrição *
              </Label>
              <Textarea 
                placeholder="Descreva o que está incluso..." 
                required 
                className="min-h-[100px] border-slate-200 rounded-lg resize-none text-xs" 
              />
            </div>
          </div>

          <DialogFooter className="bg-slate-50 border-t border-slate-200 p-4 md:p-6 gap-2 flex-col sm:flex-row shrink-0">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="h-10 text-slate-500 font-bold text-xs px-6 w-full sm:w-auto">
              Cancelar
            </Button>
            <Button type="submit" className="h-10 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm w-full sm:w-auto">
              Cadastrar Serviço
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewServiceTypeModal;