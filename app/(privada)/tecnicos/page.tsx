"use client";

import { useState } from "react";
import { Search, Plus, Mail, Phone, Filter, Briefcase, Award, Edit2 } from "lucide-react";
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
import { cn } from "@/lib/utils";
import Tecnico from "@/types/Tecnico";
import TecnicoModal from "@/components/modals/NovoTecnicoModal";

const Técnico = () => {
  const [selectedTech, setSelectedTech] = useState<Tecnico | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tecnicos = [
  {
    id: "1",
    nome: "Ricardo Silva",
    CNPJ: "12.345.678/0001-91",
    email: "ricardo@empresa.com",
    telefone: "(11) 98888-0001",
    status: "Ativo",
    especialidade: "Elétrica",
    nivel: "Sênior",
    logradouro: "Rua das Flores",
    numero: "120",
    complemento: "Sala 3",
    bairro: "Centro",
    cep: "01001-000",
    cidade: "São Paulo",
    UF: "SP",
    observacoes: "Atuação principal em instalações industriais"
  },
  {
    id: "2",
    nome: "André Lucas",
    CNPJ: "23.456.789/0001-82",
    email: "andre@empresa.com",
    telefone: "(11) 98888-0002",
    status: "Ativo",
    especialidade: "Climatização",
    nivel: "Pleno",
    logradouro: "Av. Industrial",
    numero: "455",
    complemento: "",
    bairro: "Zona Norte",
    cep: "02010-000",
    cidade: "São Paulo",
    UF: "SP",
    observacoes: "Manutenção de sistemas split e centrais"
  },
  {
    id: "3",
    nome: "Paula Santos",
    CNPJ: "34.567.890/0001-73",
    email: "paula@empresa.com",
    telefone: "(11) 98888-0003",
    status: "Ativo",
    especialidade: "Infra de TI",
    nivel: "Especialista",
    logradouro: "Rua Tecnologia",
    numero: "88",
    complemento: "Andar 2",
    bairro: "Barueri Centro",
    cep: "06400-000",
    cidade: "Barueri",
    UF: "SP",
    observacoes: "Infraestrutura de redes e servidores"
  },
  {
    id: "4",
    nome: "Marcos Lima",
    CNPJ: "45.678.901/0001-64",
    email: "marcos@empresa.com",
    telefone: "(11) 98888-0004",
    status: "Inativo",
    especialidade: "Obras Civis",
    nivel: "Júnior",
    logradouro: "Rua das Obras",
    numero: "300",
    complemento: "",
    bairro: "Industrial",
    cep: "18110-000",
    cidade: "Sorocaba",
    UF: "SP",
    observacoes: "Atualmente sem atuação ativa"
  },
  {
    id: "5",
    nome: "Beatriz Souza",
    CNPJ: "56.789.012/0001-55",
    email: "beatriz@empresa.com",
    telefone: "(11) 98888-0005",
    status: "Ativo",
    especialidade: "Segurança Eletrônica",
    nivel: "Sênior",
    logradouro: "Rua Segurança",
    numero: "77",
    complemento: "Casa",
    bairro: "Jardim Paulista",
    cep: "01420-000",
    cidade: "São Paulo",
    UF: "SP",
    observacoes: "Instalação de CFTV e alarmes"
  },
  {
    id: "6",
    nome: "Fernando Costa",
    CNPJ: "67.890.123/0001-46",
    email: "fernando@empresa.com",
    telefone: "(11) 98888-0006",
    status: "Ativo",
    especialidade: "Hidráulica",
    nivel: "Pleno",
    logradouro: "Rua das Águas",
    numero: "210",
    complemento: "",
    bairro: "Vila Galvão",
    cep: "07074-000",
    cidade: "Guarulhos",
    UF: "SP",
    observacoes: "Redes hidráulicas residenciais e comerciais"
  },
  {
    id: "7",
    nome: "Luciana Pereira",
    CNPJ: "78.901.234/0001-37",
    email: "luciana@empresa.com",
    telefone: "(11) 98888-0007",
    status: "Ativo",
    especialidade: "Pintura Industrial",
    nivel: "Especialista",
    logradouro: "Av. das Indústrias",
    numero: "900",
    complemento: "Galpão 4",
    bairro: "Distrito Industrial",
    cep: "03210-000",
    cidade: "São Paulo",
    UF: "SP",
    observacoes: "Pintura técnica em estruturas metálicas"
  },
  {
    id: "8",
    nome: "Gabriel Santos",
    CNPJ: "89.012.345/0001-28",
    email: "gabriel@empresa.com",
    telefone: "(11) 98888-0008",
    status: "Ativo",
    especialidade: "Marcenaria",
    nivel: "Pleno",
    logradouro: "Rua da Madeira",
    numero: "150",
    complemento: "",
    bairro: "Lapa",
    cep: "05070-000",
    cidade: "São Paulo",
    UF: "SP",
    observacoes: "Móveis sob medida e reparos"
  }
];

  const handleEdit = (tech: Tecnico) => {
    setSelectedTech(tech);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedTech(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Equipe Técnica</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Gerencie os profissionais de campo e suas especialidades.</p>
        </div>
        
        <Button 
          onClick={handleAdd}
          className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs gap-2"
        >
          <Plus size={16} /> Novo Técnico
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 py-2">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5">
          <Filter size={14} className="text-slate-400" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filtros:</span>
        </div>
        
        <select className="h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option>Todas as Especialidades</option>
          <option>Elétrica</option>
          <option>Climatização</option>
          <option>Segurança</option>
        </select>

        <Input 
          placeholder="Buscar por nome ou técnico..." 
          className="h-9 w-64 bg-white border-slate-200 text-xs rounded-lg"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-b border-slate-200">
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500 pl-6">Técnico</TableHead>
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500">Especialidade</TableHead>
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500">Nível</TableHead>
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500 text-center">Status</TableHead>
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500 text-right pr-6">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tecnicos.map((tech) => (
              <TableRow key={tech.id} className="table-row-hover border-b border-slate-100 last:border-0 transition-colors">
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[10px] border border-blue-100">
                      {tech.nome.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{tech.nome}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{tech.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <Briefcase size={12} className="text-blue-500" /> {tech.especialidade}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <Award size={12} className="text-amber-500" /> {tech.nivel}
                  </div>
                </TableCell>
                <TableCell className="py-4 text-center">
                  <span className={cn(
                    "status-badge",
                    tech.status === 'Ativo' ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-500 border-slate-200"
                  )}>
                    {tech.status}
                  </span>
                </TableCell>
                <TableCell className="pr-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="text-[11px] font-bold text-slate-700 mr-2">{tech.telefone}</div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEdit(tech)}
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
            {tecnicos.length} profissionais na base
          </p>
        </div>
      </div>

      <TecnicoModal
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        tecnico={selectedTech}
      />
    </div>
  );
};

export default Técnico;