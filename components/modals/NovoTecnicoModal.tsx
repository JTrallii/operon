"use client";

import { useActionState, useCallback, useEffect, useState } from "react";
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
import { UserPlus, Briefcase, Award, Edit2, MapPin, ShieldCheck, FileText, Info, EyeOff, Eye } from "lucide-react";
import { showError, showSuccess } from "@/components/utils/toast";
import Tecnico from "@/types/Tecnico";
import Endereco from "@/types/Endereco";
import { getTecnicoById } from "@/app/actions/tecnicos/getTecnicoById";
import { salvarTecnico } from "@/app/actions/tecnicos/criarTecnico";




interface TecnicoModalProps {
  children?: React.ReactNode;
  tecnicoId?: string | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const initialState = { success: false, message: '' };

const TecnicoModal = ({
  children,
  tecnicoId,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: TecnicoModalProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen =
    externalOnOpenChange !== undefined ? externalOnOpenChange : setInternalOpen;
  const [showPassword, setShowPassword] = useState(false);
  const [tecnico, setTecnico] = useState<Tecnico | null>(null);
  const [endereco, setEndereco] = useState<Endereco | null>(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [rules, setRules] = useState({
    length: false,
    upper: false,
    number: false,
    symbol: false,
  });
  const [state, formAction, isPending] = useActionState(
    salvarTecnico,
    initialState,
  );

  function validatePassword(value: string) {
    setRules({
      length: value.length >= 8,
      upper: /[A-Z]/.test(value),
      number: /[0-9]/.test(value),
      symbol: /[^A-Za-z0-9]/.test(value),
    });
  }

  function isValidPassword(pwd: string) {
    return (
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&
      /[0-9]/.test(pwd) &&
      /[^A-Za-z0-9]/.test(pwd)
    );
  }

  const isEditing = !!tecnicoId;

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        showSuccess(state.message);
        setOpen(false);
      } else {
        showError(state.message);
      }
    }
  }, [state, setOpen]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setTecnico(null);
      setEndereco(null);
    }
  };

  useEffect(() => {
    if (isEditing && tecnicoId && open) {
      const fetchData = async () => {
        setLoading(true);
        const result = await getTecnicoById(tecnicoId);
        if (result.success) {
          setTecnico(result.tecnico);
          setEndereco(result.endereco);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [isEditing, tecnicoId, open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!isEditing) {
      const senha = formData.get("password") as string;
      if (!isValidPassword(senha)) {
        // precisa modificar a função isValidPassword para receber um parâmetro
        showError(
          "A senha precisa ter 8 caracteres, 1 maiúscula, 1 número e 1 símbolo",
        );
        return;
      }
    }

    formAction(formData); // dispara a Server Action
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[700px] w-[95vw] max-h-[90vh] bg-white border-slate-200 rounded-xl p-0 overflow-hidden shadow-2xl flex flex-col">
        <DialogHeader className="bg-slate-50 border-b border-slate-200 p-4 md:p-6 shrink-0">
          <div className="flex items-center gap-3 ">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
              {isEditing ? <Edit2 size={18} /> : <UserPlus size={18} />}
            </div>
            <div>
              <DialogTitle className="text-lg md:text-xl font-bold text-slate-900">
                {isEditing ? "Editar Técnico" : "Novo Técnico"}
              </DialogTitle>
              <DialogDescription className="text-[10px] md:text-xs font-medium text-slate-500">
                Gestão de equipe técnica e especialidades.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto flex-1 no-scrollbar"
        >
          <input type="hidden" name="id" value={tecnicoId || ''} />
          <div className="p-4 md:p-8 space-y-6 md:space-y-8">
            {/* Seção: Identificação */}
            <div className="space-y-4">
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                <Briefcase size={12} className="text-blue-500" /> Identificação
                e Contato
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Nome Completo *
                  </Label>
                  <Input
                    defaultValue={tecnico?.nome}
                    name="nome"
                    placeholder="Ex: Ricardo Silva"
                    required
                    className="h-10 border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    E-mail *
                  </Label>
                  <Input
                    defaultValue={tecnico?.email}
                    type="email"
                    name="email"
                    placeholder="ricardo@empresa.com"
                    required
                    className="h-10 border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Telefone *
                  </Label>
                  <Input
                    defaultValue={tecnico?.telefone}
                    placeholder="(00) 00000-0000"
                    name="telefone"
                    required
                    className="h-10 border-slate-200 rounded-lg text-xs"
                  />
                </div>

                {!isEditing && (
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                      Senha de Acesso *
                    </Label>

                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Ex: Abc123@"
                        value={password}
                        name="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                          validatePassword(e.target.value);
                        }}
                        required
                        className="h-10 border-slate-200 rounded-lg text-xs pr-10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>

                    <div className="text-[10px] space-y-1 mt-2">
                      <p
                        className={
                          rules.length ? "text-green-600" : "text-red-500"
                        }
                      >
                        • Mínimo 8 caracteres
                      </p>
                      <p
                        className={
                          rules.upper ? "text-green-600" : "text-red-500"
                        }
                      >
                        • 1 letra maiúscula
                      </p>
                      <p
                        className={
                          rules.number ? "text-green-600" : "text-red-500"
                        }
                      >
                        • 1 número
                      </p>
                      <p
                        className={
                          rules.symbol ? "text-green-600" : "text-red-500"
                        }
                      >
                        • 1 símbolo (!@#$%)
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                    <FileText size={12} className="text-slate-400" /> CNPJ *
                  </Label>
                  <Input
                    defaultValue={tecnico?.cnpj}
                    placeholder="00.000.000/0000-00"
                    name="cnpj"
                    required
                    className="h-10 border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <ShieldCheck size={12} className="text-slate-400" /> Status
                  </Label>
                  <Select defaultValue={tecnico?.status || "Ativo"}>
                    <SelectTrigger className="h-10 border-slate-200 rounded-lg text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Seção: Perfil Profissional */}
            <div className="space-y-4">
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                <Award size={12} className="text-blue-500" /> Perfil
                Profissional
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Especialidade *
                  </Label>
                  <Select defaultValue={tecnico?.especialidade?.toLowerCase()}>
                    <SelectTrigger className="h-10 border-slate-200 rounded-lg text-xs">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elétrica">Elétrica</SelectItem>
                      <SelectItem value="climatização">Climatização</SelectItem>
                      <SelectItem value="infra de ti">Infra de TI</SelectItem>
                      <SelectItem value="obras civis">Obras Civis</SelectItem>
                      <SelectItem value="segurança eletrônica">
                        Segurança Eletrônica
                      </SelectItem>
                      <SelectItem value="hidráulica">Hidráulica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Nível
                  </Label>
                  <Select
                    defaultValue={tecnico?.nivel?.toUpperCase() || "PLENO"}
                  >
                    <SelectTrigger className="h-10 border-slate-200 rounded-lg text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JUNIOR">Júnior</SelectItem>
                      <SelectItem value="PLENO">Pleno</SelectItem>
                      <SelectItem value="SÊNIOR">Sênior</SelectItem>
                      <SelectItem value="ESPECIALISTA">Especialista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Seção: Endereço */}
            <div className="space-y-4">
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                <MapPin size={12} className="text-blue-500" /> Endereço
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    CEP
                  </Label>
                  <Input
                    defaultValue={endereco?.cep}
                    placeholder="01001-000"
                    name="cep"
                    className="h-10 border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div className="col-span-2 sm:col-span-3 space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Logradouro / Rua
                  </Label>
                  <Input
                    defaultValue={endereco?.logradouro}
                    placeholder="Praça da Sé"
                    name="logradouro"
                    className="h-10 border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div className="col-span-1 space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Número
                  </Label>
                  <Input
                    defaultValue={endereco?.numero}
                    placeholder="1"
                    name="numero"
                    className="h-10 border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div className="col-span-2 sm:col-span-2 space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Complemento
                  </Label>
                  <Input
                    defaultValue={endereco?.complemento}
                    placeholder="Apto, Sala, Bloco..."
                    name="complemento"
                    className="h-10 border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div className="col-span-2 sm:col-span-2 space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Bairro
                  </Label>
                  <Input
                    defaultValue={endereco?.bairro}
                    name="bairro"
                    placeholder="Sé"
                    className="h-10 border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div className="col-span-1 sm:col-span-1 space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    Cidade
                  </Label>
                  <Input
                    defaultValue={endereco?.cidade}
                    placeholder="São Paulo"
                    name="cidade"
                    className="h-10 border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div className="col-span-1 sm:col-span-1 space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    UF
                  </Label>
                  <Input
                    defaultValue={endereco?.UF}
                    placeholder="SP"
                    maxLength={2}
                    name="uf"
                    className="h-10 border-slate-200 rounded-lg text-xs uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Seção: Informações Extras */}
            <div className="space-y-4">
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                <Info size={12} className="text-blue-500" /> Informações Extras
              </p>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                  Observações do Técnico
                </Label>
                <Textarea
                  defaultValue={tecnico?.observacoes}
                  name="observacoes"
                  placeholder="Detalhes importantes, referências de localização ou histórico..."
                  className="min-h-[100px] border-slate-200 rounded-lg resize-none text-xs"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="bg-slate-50 border-t border-slate-200 p-4 md:p-6 gap-2 flex-col sm:flex-row shrink-0">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="h-10 text-slate-500 font-bold text-xs px-6 w-full sm:w-auto"
            >
              Cancelar
            </Button>
            {/* isPending Desabilita o clique duplicado do mouse */}
            <Button type="submit" disabled={isPending} className="...">
              {isPending ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TecnicoModal;