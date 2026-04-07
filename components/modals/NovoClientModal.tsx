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
import { UserPlus, MapPin, User, Phone, Mail, FileText, Edit2 } from "lucide-react";
import { showSuccess } from "../utils/toast"; 

interface Client {
  id?: number;
  name: string;
  email: string;
  phone: string;
  status?: string;
  cpf?: string;
  cep?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  notes?: string;
}

interface ClientModalProps {
  children?: React.ReactNode;
  client?: Client | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void; //true
}

const ClientModal = ({ children, client, open: externalOpen, onOpenChange: externalOnOpenChange }: ClientModalProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOnOpenChange !== undefined ? externalOnOpenChange : setInternalOpen;

  const isEditing = !!client;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(isEditing ? "Cadastro do cliente atualizado!" : "Cliente cadastrado com sucesso!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[700px] bg-white border-slate-200 rounded-xl p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="bg-slate-50 border-b border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
              {isEditing ? <Edit2 size={20} /> : <UserPlus size={20} />}
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-900">
                {isEditing ? `Editar Cliente: ${client.name}` : "Novo Cliente"}
              </DialogTitle>
              <DialogDescription className="text-xs font-medium text-slate-500">
                {isEditing 
                  ? "Atualize as informações cadastrais e de localização do cliente." 
                  : "Cadastre os dados completos para faturamento e atendimento."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto no-scrollbar">
          <div className="p-8 space-y-8">
            {/* Seção: Dados Pessoais */}
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                <User size={12} className="text-blue-500" /> Dados Pessoais / Identificação
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Nome Completo *</Label>
                  <Input defaultValue={client?.name} placeholder="Ex: João da Silva Santos" required className="h-10 border-slate-200 focus-visible:ring-blue-500 rounded-lg" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">E-mail de Contato *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <Input defaultValue={client?.email} type="email" placeholder="cliente@email.com" required className="pl-9 h-10 border-slate-200 focus-visible:ring-blue-500 rounded-lg" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Telefone / WhatsApp *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <Input defaultValue={client?.phone} placeholder="(00) 00000-0000" required className="pl-9 h-10 border-slate-200 focus-visible:ring-blue-500 rounded-lg" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">CPF / CNPJ</Label>
                  <Input defaultValue={client?.cpf} placeholder="000.000.000-00" className="h-10 border-slate-200 focus-visible:ring-blue-500 rounded-lg" />
                </div>
              </div>
            </div>

            {/* Seção: Endereço */}
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                <MapPin size={12} className="text-blue-500" /> Endereço de Atendimento
              </p>
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">CEP</Label>
                  <Input defaultValue={client?.cep} placeholder="00000-000" className="h-10 border-slate-200 focus-visible:ring-blue-500 rounded-lg" />
                </div>
                <div className="col-span-4 space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Logradouro / Rua</Label>
                  <Input defaultValue={client?.address} placeholder="Av. Paulista" className="h-10 border-slate-200 focus-visible:ring-blue-500 rounded-lg" />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Número</Label>
                  <Input defaultValue={client?.number} placeholder="123" className="h-10 border-slate-200 focus-visible:ring-blue-500 rounded-lg" />
                </div>
                <div className="col-span-4 space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Complemento</Label>
                  <Input defaultValue={client?.complement} placeholder="Apto, Sala, Bloco..." className="h-10 border-slate-200 focus-visible:ring-blue-500 rounded-lg" />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Bairro</Label>
                  <Input defaultValue={client?.neighborhood} placeholder="Centro" className="h-10 border-slate-200 focus-visible:ring-blue-500 rounded-lg" />
                </div>
                <div className="col-span-3 space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Cidade</Label>
                  <Input defaultValue={client?.city} placeholder="São Paulo" className="h-10 border-slate-200 focus-visible:ring-blue-500 rounded-lg" />
                </div>
                <div className="col-span-1 space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">UF</Label>
                  <Input defaultValue={client?.state} placeholder="SP" maxLength={2} className="h-10 border-slate-200 focus-visible:ring-blue-500 rounded-lg uppercase text-center" />
                </div>
              </div>
            </div>

            {/* Seção: Observações */}
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                <FileText size={12} className="text-blue-500" /> Informações Extras
              </p>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Observações do Cliente</Label>
                <Textarea defaultValue={client?.notes} placeholder="Detalhes importantes, referências de localização ou histórico..." className="min-h-[100px] border-slate-200 focus-visible:ring-blue-500 rounded-lg resize-none" />
              </div>
            </div>
          </div>

          <DialogFooter className="bg-slate-50 border-t border-slate-200 p-6 gap-3">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="h-10 text-slate-500 font-bold text-xs px-6">
              Cancelar
            </Button>
            <Button type="submit" className="h-10 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm">
              {isEditing ? "Salvar Alterações" : "Cadastrar Cliente"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClientModal;