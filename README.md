# SOAP — WMS con cumplimiento normativo

Sistema de gestión de almacenes (WMS) que, además de controlar qué hay y dónde está, protege a la empresa frente a multas, clausuras y decomisos. Cada operación (recibir, guardar, preparar y despachar) se hace de una forma que cumple la ley y deja evidencia.

> **«Tu almacén siempre listo para una inspección.»**

## Estado del proyecto

Fase de definición de la idea. Esta documentación recoge el concepto, los procesos, los roles, los módulos y los puntos aún abiertos. Todavía no hay código. El stack técnico recomendado (Rust + Axum + PostgreSQL + Redis) está en [Stack técnico](docs/10-stack-tecnico.md) y la arquitectura (monolito modular, parte de una plataforma empresarial mayor) en [Arquitectura](docs/11-arquitectura.md).

## Índice de la documentación

| # | Documento | Contenido |
|---|-----------|-----------|
| 1 | [Visión y alcance](docs/01-vision.md) | Problema, propuesta de valor, usuarios, mercado, modelo de negocio, diferenciales |
| 2 | [Almacén, plano y áreas de trabajo](docs/02-almacen-y-areas.md) | Jerarquía de ubicaciones, plano visual, áreas de trabajo del almacén |
| 3 | [Productos y ubicación](docs/03-productos-y-ubicacion.md) | Ficha del producto, criterios para decidir dónde va cada producto |
| 4 | [Operaciones: recepción, acomodo y despacho](docs/04-operaciones.md) | Procesos del caso de abarrotes, evidencia para inspección, coordinación en recepción |
| 5 | [Roles, flujos y puntos de control](docs/05-roles-y-flujos.md) | Puestos, flujos de pedido/reposición/suministros, controles, estados de pedido |
| 6 | [Stock: estados, préstamos, ajustes y consumibles](docs/06-stock-prestamos-ajustes.md) | Tipos de artículos, préstamos, ajustes, inventario periódico, estados del stock |
| 7 | [Trabajo diario, personal e indicadores](docs/07-trabajo-diario-personal.md) | Organización del turno, seguridad e higiene, indicadores |
| 8 | [Módulos y hoja de ruta](docs/08-modulos-y-roadmap.md) | Los módulos del sistema, matriz de uso por rol, orden de construcción |
| 9 | [Puntos por definir](docs/09-pendientes.md) | Decisiones abiertas consolidadas |
| 10 | [Stack técnico](docs/10-stack-tecnico.md) | Axum, PostgreSQL + SQLx, Redis, autenticación y decisiones de diseño |
| 11 | [Arquitectura de la plataforma](docs/11-arquitectura.md) | Monolito modular, DDD + hexagonal, contextos, estructura del workspace, datos y eventos |

## Resumen en un minuto

- **Qué es:** un WMS que controla inventario **y** cumplimiento legal.
- **Para quién:** distribuidoras de abarrotes, alimentos y bebidas, químicos/combustibles, farmacéuticas y operadores logísticos.
- **Ejemplo guía:** empresa de abarrotes, menestras y arroz.
- **Ideas centrales:** plano del almacén con ubicaciones codificadas; productos clasificados por riesgo; permisos con vencimiento; bloqueos preventivos; despacho FEFO; evidencia lista para el inspector; separación de funciones (quien prepara no verifica, quien recibe no ajusta).
- **Primera versión:** maestros, plano y ubicaciones, recepción, acomodo, inventario, pedidos y despacho, cumplimiento básico y trazabilidad.
