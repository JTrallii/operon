


-- Permissão de schema
GRANT USAGE ON SCHEMA operon TO service_role;

-- Permissões totais nas tabelas do schema operon
GRANT SELECT, INSERT, UPDATE, DELETE ON operon.usuarios, operon.clientes TO service_role;

