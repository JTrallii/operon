

export default interface Tecnico {
  id: string;
  nome: string;
  CNPJ: string;
  email: string;
  telefone: string;
  status: string;
  especialidade: string;
  nivel: string;
  logradouro: string;
  numero?: string;
  complemento?: string;
  bairro: string;
  cep: string;
  cidade: string;
  UF: string;
  observacoes: string;
}