

export default interface Tecnico {
  id: string;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  status: string;
  especialidade: string;
  nivel: string;
  observacoes?: string;
}