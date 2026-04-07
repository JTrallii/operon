"use client";

import { useState } from "react";
import { Search, Plus, Mail, Phone, MoreHorizontal, UserPlus, Filter, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NovoClientModal from "@/components/modals/NovoClientModal";
import { cn } from "@/lib/utils";

interface Client {
    id: number,
    name: string,
    email: string,
    phone: string,
    status: string,
    lastOrder: string,
    cpf: string,
    cep: string,
    address: string,
    number: string,
    neighborhood: string,
    city: string,
    state: string
}

const Clients = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clients = [
    { id: 1, name: "Carlos Eduardo", email: "carlos@email.com", phone: "(11) 98888-7777", status: "Ativo", lastOrder: "12/10/2023", cpf: "123.456.789-00", cep: "01001-000", address: "Praça da Sé", number: "1", neighborhood: "Sé", city: "São Paulo", state: "SP" },
    { id: 2, name: "Mariana Souza", email: "mariana@email.com", phone: "(11) 97777-6666", status: "Ativo", lastOrder: "15/10/2023", cpf: "234.567.890-11", cep: "01310-000", address: "Avenida Paulista", number: "1000", neighborhood: "Bela Vista", city: "São Paulo", state: "SP" },
    { id: 3, name: "Roberto Lima", email: "roberto@email.com", phone: "(11) 96666-5555", status: "Inativo", lastOrder: "18/10/2023", cpf: "345.678.901-22", cep: "01001-000", address: "Praça da Sé", number: "1", neighborhood: "Sé", city: "São Paulo", state: "SP" },
    { id: 4, name: "Ana Paula", email: "ana@email.com", phone: "(11) 95555-4444", status: "Ativo", lastOrder: "20/10/2023", cpf: "456.789.012-33", cep: "01001-000", address: "Praça da Sé", number: "1", neighborhood: "Sé", city: "São Paulo", state: "SP" },
    { id: 5, name: "João Silva", email: "joao@email.com", phone: "(11) 94444-3333", status: "Ativo", lastOrder: "22/10/2023", cpf: "567.890.123-44", cep: "01310-000", address: "Avenida Paulista", number: "1000", neighborhood: "Bela Vista", city: "São Paulo", state: "SP" },
  ];

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedClient(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gestão de Clientes</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Gerencie sua base de contatos e histórico de atendimentos.</p>
        </div>
        
        <Button 
          onClick={handleAdd}
          className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs gap-2"
        >
          <UserPlus size={16} /> Novo Cliente
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 py-2">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5">
          <Filter size={14} className="text-slate-400" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filtros:</span>
        </div>
        
        <select className="h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option>Todos os Status</option>
          <option>Ativos</option>
          <option>Inativos</option>
        </select>

        <Input 
          placeholder="Buscar por nome ou e-mail..." 
          className="h-9 w-64 bg-white border-slate-200 text-xs rounded-lg"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-b border-slate-200">
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500 pl-6">Cliente</TableHead>
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500">E-mail</TableHead>
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500">Telefone</TableHead>
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500 text-center">Status</TableHead>
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500 text-right pr-6">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id} className="table-row-hover border-b border-slate-100 last:border-0 transition-colors">
                <TableCell className="pl-6 py-4">
                  <span className="text-sm font-bold text-slate-900">{client.name}</span>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Mail size={12} className="text-slate-400" /> {client.email}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Phone size={12} className="text-slate-400" /> {client.phone}
                  </div>
                </TableCell>
                <TableCell className="py-4 text-center">
                  <span className={cn(
                    "status-badge",
                    client.status === 'Ativo' ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-500 border-slate-200"
                  )}>
                    {client.status}
                  </span>
                </TableCell>
                <TableCell className="pr-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <span className="text-[11px] font-medium text-slate-400">{client.lastOrder}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEdit(client)}
                      className="h-8 w-8 text-slate-400 hover:text-blue-600"
                    >
                      <Edit2 size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="bg-slate-50/50 border-t border-slate-200 px-6 py-3 flex items-center justify-between">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            {clients.length} clientes registrados
          </p>
        </div>
      </div>

      <NovoClientModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        client={selectedClient} 
      />
    </div>
  );
};

export default Clients;