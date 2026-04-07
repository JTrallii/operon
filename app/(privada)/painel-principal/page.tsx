"use client";

import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import DetalheServicoModal from "@/components/modals/DetalheServicoModal";
import { cn } from "@/lib/utils";
import OrderDetails from "@/types/OrderDetails";
import { UpdateOrderExtraData } from "@/types/UpdateOrderExtraData";





const Dashboard = () => {
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [services, setServices] = useState([
    { id: "OS-001", title: "Reparo de Ar Condicionado", client: "Carlos Eduardo", technician: "Ricardo Silva", date: "12/10/2023", status: "CONCLUIDO", price: 35000, description: "Limpeza de filtros e carga de gás refrigerante R410A." },
    { id: "OS-002", title: "Instalação Elétrica", client: "Mariana Souza", technician: "André Lucas", date: "15/10/2023", status: "EM_ANDAMENTO", price: 120000, description: "Instalação de novo quadro de energia e 15 pontos de luz." },
    { id: "OS-003", title: "Manutenção de Servidor", client: "Roberto Lima", technician: "Paula Santos", date: "18/10/2023", status: "PENDENTE", price: 80000, description: "Atualização de firmware e verificação de redundância de storage." },
    { id: "OS-004", title: "Configuração de Rede", client: "Ana Paula", technician: "Paula Santos", date: "20/10/2023", status: "PAGO", price: 45000, description: "Configuração de roteadores mesh.", paidAt: "21/10/2023" },
    { id: "OS-005", title: "Aguardando Peça", client: "João Silva", technician: "Ricardo Silva", date: "22/10/2023", status: "AGUARDANDO_PECA", price: 210000, description: "Troca de placa-mãe de servidor Dell." },
  ]);

  const updateOrderStatus = (id: string, newStatus: string, extraData?: UpdateOrderExtraData) => {
    setServices(prev => prev.map(s => s.id === id ? { 
      ...s, 
      status: newStatus,
      ...(newStatus === "CONCLUIDO" && { completedAt: new Date().toLocaleDateString('pt-BR') }),
      ...(newStatus === "PAGO" && { paidAt: extraData?.paidAt || new Date().toLocaleDateString('pt-BR') })
    } : s));
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "CONCLUIDO": return { label: "Concluída", class: "bg-emerald-50 text-emerald-700 border-emerald-200" };
      case "EM_ANDAMENTO": return { label: "Em Andamento", class: "bg-blue-50 text-blue-700 border-blue-200" };
      case "PAGO": return { label: "Paga", class: "bg-purple-50 text-purple-700 border-purple-200" };
      case "PENDENTE": return { label: "Aberta", class: "bg-slate-100 text-slate-700 border-slate-200" };
      case "AGUARDANDO_PECA": return { label: "Aguardando Peça", class: "bg-amber-50 text-amber-700 border-amber-200" };
      case "ATRASADA": return { label: "Atrasada", class: "bg-rose-50 text-rose-700 border-rose-200" };
      default: return { label: status, class: "bg-slate-50 text-slate-500 border-slate-200" };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gestão de Ordens</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Acompanhe ordens, clientes e técnicos alocados.</p>
        </div>
        
        <div className="flex items-center gap-6 text-[13px] font-bold text-slate-600 bg-white px-5 py-2.5 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            Ordens abertas: <span className="text-slate-900">12</span>
          </div>
          <div className="w-px h-4 bg-slate-200" />
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            Equipe em campo: <span className="text-slate-900">8</span>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-b border-slate-200">
              <TableHead className="w-[100px] h-12 text-[11px] font-black uppercase tracking-widest text-slate-500 pl-6">Protocolo</TableHead>
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500">Cliente</TableHead>
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500">Técnico Responsável</TableHead>
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500">Serviço</TableHead>
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500 text-center">Status</TableHead>
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500 text-right pr-6">Abertura</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => {
              const status = getStatusInfo(service.status);
              return (
                <TableRow 
                  key={service.id} 
                  className="table-row-hover border-b border-slate-100 last:border-0 transition-colors"
                  onClick={() => { setSelectedOrder(service); setIsDetailsOpen(true); }}
                >
                  <TableCell className="pl-6 py-4">
                    <span className="text-[11px] font-bold text-slate-400 font-mono tracking-tighter">{service.id}</span>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-sm font-bold text-slate-900">{service.client}</span>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-600 border border-blue-100">
                        {service.technician[0]}
                      </div>
                      <span className="text-xs font-semibold text-slate-600">{service.technician}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-xs font-medium text-slate-500">{service.title}</span>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <span className={cn("status-badge", status.class)}>
                      {status.label}
                    </span>
                  </TableCell>
                  <TableCell className="pr-6 py-4 text-right">
                    <span className="text-[11px] font-medium text-slate-400">{service.date}</span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <DetalheServicoModal 
        order={selectedOrder} 
        open={isDetailsOpen} 
        onOpenChange={setIsDetailsOpen}
        onUpdateStatus={updateOrderStatus}
      />
    </div>
  );
};

export default Dashboard;