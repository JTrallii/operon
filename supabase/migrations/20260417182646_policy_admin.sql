


--Policies para admin
CREATE POLICY "selecionar todos os usuarios"
ON operon.usuarios
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM operon.usuarios
    WHERE id = auth.uid() AND role = 'admin'
  )
);


CREATE POLICY "selecionar todos os clientes"
ON operon.clientes
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM operon.usuarios
    WHERE id = auth.uid() AND role = 'admin'
  )
);


CREATE POLICY "Excluir clientes"
ON operon.clientes
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM operon.usuarios
    WHERE id = auth.uid() AND role = 'admin'
  )
);


CREATE POLICY "selecionar todos os orçamentos"
ON operon.orcamentos
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM operon.usuarios
    WHERE id = auth.uid() AND role = 'admin'
  )
);
--------------------------------------------------------------------------------------------------

