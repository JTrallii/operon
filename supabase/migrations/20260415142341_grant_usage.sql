


-- Permissões de schema
GRANT USAGE ON SCHEMA operon TO authenticated, anon;  -- anon pode ser necessário para login

-- Tabela usuarios
GRANT SELECT, UPDATE ON operon.usuarios TO authenticated;

-- Tabela clientes
GRANT SELECT, UPDATE ON operon.clientes TO authenticated;

-- Tabela enderecos
GRANT SELECT, INSERT, UPDATE, DELETE ON operon.enderecos TO authenticated;

-- Tabela orcamentos
GRANT SELECT, INSERT, UPDATE, DELETE ON operon.orcamentos TO authenticated;

-- Tabela ordens
GRANT SELECT, INSERT, UPDATE, DELETE ON operon.ordens TO authenticated;

-- Tabelas de consulta (especialidades, servicos, tecnicos)
GRANT SELECT, INSERT, UPDATE, DELETE ON operon.especialidades, operon.servicos, operon.tecnicos TO authenticated;
