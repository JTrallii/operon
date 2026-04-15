


-- Revogar permissões em todas as tabelas atuais do schema operon
REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA operon FROM anon, authenticated, service_role;

-- Revogar permissões em sequências (se houver)
REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA operon FROM anon, authenticated, service_role;

-- Revogar permissões em funções (se houver)
REVOKE ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA operon FROM anon, authenticated, service_role;

-- Remover os default privileges (para evitar que novas tabelas herdem permissões amplas)
ALTER DEFAULT PRIVILEGES IN SCHEMA operon
REVOKE ALL ON TABLES FROM anon, authenticated, service_role;


--Habilitar RLS
ALTER TABLE operon.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE operon.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE operon.especialidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE operon.servicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE operon.tecnicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE operon.enderecos ENABLE ROW LEVEL SECURITY;
ALTER TABLE operon.orcamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE operon.ordens ENABLE ROW LEVEL SECURITY;
--------------------------------------------------------------------------------------------------