

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


--Policies de usuarios
CREATE POLICY "selecionar proprio usuario"
ON operon.usuarios
FOR SELECT
TO authenticated
USING (id = auth.uid());


CREATE POLICY "editar proprio usuario"
ON operon.usuarios
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());
--------------------------------------------------------------------------------------------------


--Policies de clientes
CREATE POLICY "selecionar cliente"
ON operon.clientes
FOR SELECT
TO authenticated
USING (usuario_id = auth.uid());


CREATE POLICY "editar proprio cliente"
ON operon.clientes
FOR UPDATE
TO authenticated
USING (usuario_id = auth.uid())
WITH CHECK (usuario_id = auth.uid());


CREATE POLICY "excluir proprio cliente"
ON operon.clientes
FOR DELETE
TO authenticated
USING (usuario_id = auth.uid());
--------------------------------------------------------------------------------------------------


--Policies de endereços
CREATE POLICY "selecionar endereço"
ON operon.enderecos
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM operon.clientes c
    WHERE c.id = enderecos.cliente_id
    AND c.usuario_id = auth.uid()
  )
  OR
  EXISTS (
    SELECT 1 FROM operon.tecnicos t
    WHERE t.id = enderecos.tecnico_id
    AND t.usuario_id = auth.uid()
  )
);


CREATE POLICY "criar endereço"
ON operon.enderecos
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM operon.clientes c
    WHERE c.id = enderecos.cliente_id
    AND c.usuario_id = auth.uid()
  )
  OR
  EXISTS (
    SELECT 1 FROM operon.tecnicos t
    WHERE t.id = enderecos.tecnico_id
    AND t.usuario_id = auth.uid()
  )
);


CREATE POLICY "editar proprio endereço"
ON operon.enderecos
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM operon.clientes c
    WHERE c.id = enderecos.cliente_id
    AND c.usuario_id = auth.uid()
  )
  OR
  EXISTS (
    SELECT 1 FROM operon.tecnicos t
    WHERE t.id = enderecos.tecnico_id
    AND t.usuario_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM operon.clientes c
    WHERE c.id = enderecos.cliente_id
    AND c.usuario_id = auth.uid()
  )
  OR
  EXISTS (
    SELECT 1 FROM operon.tecnicos t
    WHERE t.id = enderecos.tecnico_id
    AND t.usuario_id = auth.uid()
  )
);


CREATE POLICY "excluir proprio endereço"
ON operon.enderecos
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM operon.clientes c
    WHERE c.id = enderecos.cliente_id
    AND c.usuario_id = auth.uid()
  )
  OR
  EXISTS (
    SELECT 1 FROM operon.tecnicos t
    WHERE t.id = enderecos.tecnico_id
    AND t.usuario_id = auth.uid()
  )
);
--------------------------------------------------------------------------------------------------


--Policies de ordens
CREATE POLICY "selecionar ordens do cliente e tecnico"
ON operon.ordens
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM operon.clientes c
    WHERE c.id = ordens.cliente_id
    AND c.usuario_id = auth.uid()
  )
  OR
  EXISTS (
    SELECT 1 FROM operon.tecnicos t
    WHERE t.id = ordens.tecnico_id
    AND t.usuario_id = auth.uid()
  )
);


CREATE POLICY "criar ordens do tecnico"
ON operon.ordens
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM operon.tecnicos t
    WHERE t.id = ordens.tecnico_id
    AND t.usuario_id = auth.uid()
  )
);


CREATE POLICY "editar ordens do tecnico"
ON operon.ordens
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM operon.tecnicos t
    WHERE t.id = ordens.tecnico_id
    AND t.usuario_id = auth.uid()
  ))
WITH CHECK (
  EXISTS (
    SELECT 1 FROM operon.tecnicos t
    WHERE t.id = ordens.tecnico_id
    AND t.usuario_id = auth.uid()
  )
);


CREATE POLICY "deletar ordens do tecnico"
ON operon.ordens
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM operon.tecnicos t
    WHERE t.id = ordens.tecnico_id
    AND t.usuario_id = auth.uid()
  )
);
--------------------------------------------------------------------------------------------------


--Policies para criar técnicos
CREATE POLICY "selecionar tecnicos"
ON operon.tecnicos
FOR SELECT
TO authenticated
USING(true);


CREATE POLICY "criar tecnicos"
ON operon.tecnicos
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM operon.usuarios
    WHERE id = auth.uid() AND role = 'admin'
  )
);


CREATE POLICY "atualizar tecnicos"
ON operon.tecnicos
FOR UPDATE
TO authenticated
USING(
  EXISTS (
    SELECT 1 FROM operon.usuarios
    WHERE id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM operon.usuarios
    WHERE id = auth.uid() AND role = 'admin'
  )
);


CREATE POLICY "deletar tecnicos"
ON operon.tecnicos
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM operon.usuarios
    WHERE id = auth.uid() AND role = 'admin'
  )
);
--------------------------------------------------------------------------------------------------


--Policies para criar especialidades
CREATE POLICY "selecionar especialidades"
ON operon.especialidades
FOR SELECT
TO authenticated
USING(true);


CREATE POLICY "criar especialidades"
ON operon.especialidades
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM operon.usuarios
    WHERE id = auth.uid() AND role = 'admin'
  )
);


CREATE POLICY "atualizar especialidades"
ON operon.especialidades
FOR UPDATE
TO authenticated
USING(
  EXISTS (
    SELECT 1 FROM operon.usuarios
    WHERE id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM operon.usuarios
    WHERE id = auth.uid() AND role = 'admin'
  )
);


CREATE POLICY "deletar especialidades"
ON operon.especialidades
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM operon.usuarios
    WHERE id = auth.uid() AND role = 'admin'
  )
);
--------------------------------------------------------------------------------------------------


--Policies para criar servicos
CREATE POLICY "selecionar servicos"
ON operon.servicos
FOR SELECT
TO authenticated
USING(true);


CREATE POLICY "criar servicos"
ON operon.servicos
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM operon.usuarios
    WHERE id = auth.uid() AND role = 'admin'
  )
);


CREATE POLICY "atualizar servicos"
ON operon.servicos
FOR UPDATE
TO authenticated
USING(
  EXISTS (
    SELECT 1 FROM operon.usuarios
    WHERE id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM operon.usuarios
    WHERE id = auth.uid() AND role = 'admin'
  )
);


CREATE POLICY "deletar servicos"
ON operon.servicos
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM operon.usuarios
    WHERE id = auth.uid() AND role = 'admin'
  )
);
--------------------------------------------------------------------------------------------------


--Policies de orçamento
CREATE POLICY "selecionar orcamentos do cliente"
ON operon.orcamentos
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM operon.clientes c
    WHERE c.id = orcamentos.cliente_id
    AND c.usuario_id = auth.uid()
  )
  OR
  EXISTS (
    SELECT 1 FROM operon.tecnicos t
    WHERE t.id = orcamentos.tecnico_id
    AND t.usuario_id = auth.uid()
  )
);


CREATE POLICY "criar orcamentos do cliente"
ON operon.orcamentos
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM operon.clientes c
    WHERE c.id = orcamentos.cliente_id
    AND c.usuario_id = auth.uid()
  )
);


CREATE POLICY "editar orcamentos"
ON operon.orcamentos
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM operon.clientes c
    WHERE c.id = orcamentos.cliente_id
    AND c.usuario_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM operon.clientes c
    WHERE c.id = orcamentos.cliente_id
    AND c.usuario_id = auth.uid()
  )
);


CREATE POLICY "deletar orcamentos"
ON operon.orcamentos
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM operon.clientes c
    WHERE c.id = orcamentos.cliente_id
    AND c.usuario_id = auth.uid()
  )
);
--------------------------------------------------------------------------------------------------






