


--Criar o schema
CREATE SCHEMA IF NOT EXISTS operon;

--tabela de usuarios
CREATE TABLE operon.usuarios(
    id uuid PRIMARY KEY REFERENCES auth.users(id),
    nome TEXT NOT NULL,
    -- 'admin' | 'tecnico' | 'cliente'
    role TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);


-- tabela de clientes
CREATE TABLE operon.clientes(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    usuario_id uuid UNIQUE REFERENCES operon.usuarios(id),
    cpf TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT NOT NULL,
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    ativo BOOLEAN DEFAULT true
);


--tabelas de especialidades
CREATE TABLE operon.especialidades(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    ativo BOOLEAN DEFAULT true
);


--tabela de serviços
CREATE TABLE operon.servicos(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    especialidade_id uuid REFERENCES operon.especialidades(id),
    nome TEXT NOT NULL,
    descricao TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    ativo BOOLEAN DEFAULT true
);


-- tabela de tecnicos
CREATE TABLE operon.tecnicos(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    usuario_id uuid UNIQUE REFERENCES operon.usuarios(id),
    cnpj TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT NOT NULL,
    observacoes TEXT,
    especialidade_id uuid REFERENCES operon.especialidades(id),
    nivel TEXT NOT NULL,
    area_atuacao TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    ativo BOOLEAN DEFAULT true
);


-- tabela de endereço
CREATE TABLE operon.enderecos(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id uuid REFERENCES operon.clientes(id),
    tecnico_id uuid REFERENCES operon.tecnicos(id),
    logradouro TEXT NOT NULL,
    numero TEXT,
    complemento TEXT,
    cep TEXT NOT NULL,
    bairro TEXT NOT NULL,
    cidade TEXT NOT NULL,
    uf VARCHAR(2) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    ativo BOOLEAN DEFAULT true,
    CONSTRAINT check_owner
    CHECK (
        (cliente_id IS NOT NULL AND tecnico_id IS NULL)
        OR
        (cliente_id IS NULL AND tecnico_id IS NOT NULL)
    )
);


--tabela de orcamento
CREATE TABLE operon.orcamentos(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id uuid REFERENCES operon.clientes(id),
    endereco_id uuid REFERENCES operon.enderecos(id),
    tecnico_id uuid REFERENCES operon.tecnicos(id),
    especialidade_id uuid REFERENCES operon.especialidades(id),
    servico_id uuid REFERENCES operon.servicos(id),
    descricao TEXT NOT NULL,
    data_servico DATE NOT NULL,
    -- CRIADO | RESPONDIDO | ACEITO | RECUSADO
    status_orcamento TEXT NOT NULL DEFAULT 'CRIADO',
    valor DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    ativo BOOLEAN DEFAULT true
);


--tabela de ordens
CREATE TABLE operon.ordens(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id uuid REFERENCES operon.clientes(id),
    tecnico_id uuid REFERENCES operon.tecnicos(id),
    servico_id uuid REFERENCES operon.servicos(id),
    orcamento_id uuid UNIQUE REFERENCES operon.orcamentos(id),
    os_number INT GENERATED ALWAYS AS IDENTITY UNIQUE,
    status_ordem TEXT NOT NULL,-- PENDENTE, CONCLUIDO, PAGO
    paid_at TIMESTAMP,
    valor DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    ativo BOOLEAN DEFAULT true,
    status_ordem TEXT NOT NULL
    CHECK (status_ordem IN ('PENDENTE', 'EM ANDAMENTO', 'AGUARDANDO PEÇA', 'CONCLUÍDO', 'PAGO'))
);





