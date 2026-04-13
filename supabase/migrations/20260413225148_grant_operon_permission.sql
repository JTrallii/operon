-- liberar uso do schema
GRANT USAGE ON SCHEMA operon TO anon;
GRANT USAGE ON SCHEMA operon TO authenticated;
GRANT USAGE ON SCHEMA operon TO service_role;

-- liberar acesso às tabelas existentes
GRANT ALL ON ALL TABLES IN SCHEMA operon TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA operon TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA operon TO service_role;

-- garantir permissões futuras
ALTER DEFAULT PRIVILEGES IN SCHEMA operon
GRANT ALL ON TABLES TO anon, authenticated, service_role;