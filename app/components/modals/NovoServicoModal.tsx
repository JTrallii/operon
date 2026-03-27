"use client";

import { Calendar, ClipboardList, Clock, CreditCard, DollarSign, FileText, ShieldAlert, User } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { showSuccess } from "../utils/toast";


interface NewServiceModalProps {
  children: React.ReactNode;
}



const NovoServicoModal = ({ children }: NewServiceModalProps) => {

    const [open, setOpen] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Ordem de serviço aberta e atribuída com sucesso!");
    setOpen(false);
  };
    
    return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[750px] bg-white border-slate-200 rounded-xl p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="bg-slate-50 border-b border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
              <ClipboardList size={20} />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-900">Nova Ordem de Serviço</DialogTitle>
              <DialogDescription className="text-xs font-medium text-slate-500">
                Abertura de chamado técnico com alocação de responsável e prazos.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto no-scrollbar">
          <div className="p-8 space-y-8">
            {/* Seção: Identificação do Serviço */}
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                <FileText size={12} className="text-blue-500" /> Detalhes da Operação
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Título do Serviço / Assunto *</Label>
                  <Input placeholder="Ex: Reparo Crítico no Servidor Principal" required className="h-10 border-slate-200 focus-visible:ring-blue-500 rounded-lg" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                    <User size={12} className="text-slate-400" /> Selecionar Cliente *
                  </Label>
                  <Select required>
                    <SelectTrigger className="h-10 border-slate-200 rounded-lg">
                      <SelectValue placeholder="Buscar cliente..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="carlos">Carlos Eduardo</SelectItem>
                      <SelectItem value="mariana">Mariana Souza</SelectItem>
                      <SelectItem value="roberto">Roberto Lima</SelectItem>
                      <SelectItem value="empresa">Construtora Alfa S.A.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                    <ShieldAlert size={12} className="text-rose-500" /> Nível de Urgência
                  </Label>
                  <Select defaultValue="MEDIA">
                    <SelectTrigger className="h-10 border-slate-200 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BAIXA">Baixa (Rotina)</SelectItem>
                      <SelectItem value="MEDIA">Média (Padrão)</SelectItem>
                      <SelectItem value="ALTA">Alta (Urgente)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Seção: Responsável e Prazos */}
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                <Clock size={12} className="text-blue-500" /> Planejamento de Execução
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Técnico Responsável *</Label>
                  <Select required>
                    <SelectTrigger className="h-10 border-slate-200 rounded-lg">
                      <SelectValue placeholder="Atribuir para..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ricardo">Ricardo Silva (Elétrica)</SelectItem>
                      <SelectItem value="andre">André Lucas (Climatização)</SelectItem>
                      <SelectItem value="paula">Paula Santos (TI)</SelectItem>
                      <SelectItem value="marcos">Marcos Lima (Obras)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                    <Calendar size={12} className="text-slate-400" /> Data Prevista de Conclusão *
                  </Label>
                  <Input type="date" required className="h-10 border-slate-200 focus-visible:ring-blue-500 rounded-lg" />
                </div>
              </div>
            </div>

            {/* Seção: Financeiro e Escopo */}
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                <CreditCard size={12} className="text-emerald-600" /> Financeiro e Descritivo
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                    <DollarSign size={12} className="text-emerald-600" /> Valor do Serviço (R$) *
                  </Label>
                  <Input placeholder="0,00" required className="h-10 border-slate-200 focus-visible:ring-blue-500 rounded-lg" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Forma de Pagamento</Label>
                  <Select defaultValue="PIX">
                    <SelectTrigger className="h-10 border-slate-200 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PIX">PIX</SelectItem>
                      <SelectItem value="DINHEIRO">Dinheiro</SelectItem>
                      <SelectItem value="BOLETO">Boleto Bancário</SelectItem>
                      <SelectItem value="CARTAO">Cartão de Crédito</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Descrição Detalhada do Chamado</Label>
                  <Textarea placeholder="Descreva os problemas relatados e as ações que devem ser realizadas..." className="min-h-[100px] border-slate-200 focus-visible:ring-blue-500 rounded-lg resize-none" />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Observações Operacionais Internas</Label>
                  <Textarea placeholder="Anotações sobre senhas, acesso ao local ou riscos específicos..." className="min-h-[80px] border-slate-200 focus-visible:ring-blue-500 rounded-lg resize-none" />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="bg-slate-50 border-t border-slate-200 p-6 gap-3">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="h-10 text-slate-500 font-bold text-xs px-6">
              Cancelar
            </Button>
            <Button type="submit" className="h-10 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm">
              Abrir Ordem de Serviço
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NovoServicoModal;