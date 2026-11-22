-- Un esquema por módulo. Ningún módulo hace consultas ni llaves foráneas hacia el esquema de otro.
-- Los esquemas de cada módulo de negocio se agregan cuando se cree el módulo.
CREATE SCHEMA IF NOT EXISTS platform;
CREATE SCHEMA IF NOT EXISTS outbox;
