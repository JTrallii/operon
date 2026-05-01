"use client";

import { useEffect, useState } from "react";
import { Plus, Filter, Briefcase, Award, Edit2 } from "lucide-react";
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
import TecnicoModal from "@/components/modals/NovoTecnicoModal";
import { getTecnicos } from "@/app/actions/tecnicos/getTecnicos";
import Tecnico from "@/types/Tecnico";



const Técnico = () => {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [loading, setLoading] = useState(true);
  const [selecionarTecnicoId, setSelecionarTecnicoId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Carrega a lista de técnicos (apenas dados da tabela tecnicos)
  useEffect(() => {
    const fetchTecnicos = async () => {
      setLoading(true);
      const result = await getTecnicos();
      if (result.sucess) {
        setTecnicos(result.data);
      } else {
        console.error(result.mensagem);
      }
      setLoading(false);
    };
    fetchTecnicos();
  }, []);


  const handleEdit = (id: string) => {
    setSelecionarTecnicoId(id);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelecionarTecnicoId(null);
    setIsModalOpen(true);
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Carregando técnicos...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Equipe Técnica
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Gerencie os profissionais de campo e suas especialidades.
          </p>
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
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Filtros:
          </span>
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
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500 pl-6">
                Técnico
              </TableHead>
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500">
                Especialidade
              </TableHead>
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500">
                Nível
              </TableHead>
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500 text-center">
                Status
              </TableHead>
              <TableHead className="h-12 text-[11px] font-black uppercase tracking-widest text-slate-500 text-right pr-6">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tecnicos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <p className="text-sm text-slate-500">
                    Nenhum técnico cadastrado!
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              tecnicos.map((tecnico) => (
                <TableRow
                  key={tecnico.id}
                  className="table-row-hover border-b border-slate-100 last:border-0 transition-colors"
                >
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[10px] border border-blue-100">
                        {tecnico.nome
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {tecnico.nome}
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium">
                          {tecnico.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                      <Briefcase size={12} className="text-blue-500" />{" "}
                      {tecnico.especialidade}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                      <Award size={12} className="text-amber-500" />{" "}
                      {tecnico.nivel}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <span
                      className={cn(
                        "status-badge",
                        tecnico.status === "Ativo"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-slate-100 text-slate-500 border-slate-200",
                      )}
                    >
                      {tecnico.status}
                    </span>
                  </TableCell>
                  <TableCell className="pr-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="text-[11px] font-bold text-slate-700 mr-2">
                        {tecnico.telefone}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(tecnico.id)}
                        className="h-8 w-8 text-slate-400 hover:text-blue-600"
                      >
                        <Edit2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="bg-slate-50/50 border-t border-slate-200 px-6 py-3 flex items-center justify-between">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            {tecnicos.length === 1
              ? "profissional na base"
              : "profissionais na base"}
          </p>
        </div>
      </div>

      <TecnicoModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        tecnicoId={selecionarTecnicoId}
      />
    </div>
  );
};

export default Técnico;