# Stack técnico

Recomendación inicial de tecnología para el backend. El frontend y la app móvil se deciden más adelante.

> **Estado:** recomendación, aún no es una decisión cerrada. Ver [Puntos por definir](09-pendientes.md).

## Framework web: Axum

Las comparaciones de 2026 coinciden en que el desarrollo web en Rust se ha asentado en **Axum** para las APIs nuevas, con Actix Web y Rocket como alternativas establecidas. Axum es el framework del equipo de Tokio y usa capas de Tower para el middleware, por lo que se puede reutilizar mucho código de la comunidad (autenticación, límites de uso, trazas, compresión).

### Por qué encaja con un WMS

- Un WMS es una API con muchas reglas de negocio, transacciones y roles. La velocidad bruta importa poco, y Axum suele quedar cerca de Actix en rendimiento.
- Va a crecer mucho (módulos, app móvil, integraciones). Axum es modular y el compilador revisa el estado compartido, lo que ayuda a mantenerlo ordenado.
- Funciona bien con las demás piezas del stack, que son las más usadas en el ecosistema.

### Alternativas

| Opción | Cuándo elegirla | Salvedades |
|--------|-----------------|-----------|
| **Actix-web** | Si ya hay experiencia con él. Es maduro, rápido y trae crates propios para sesiones, CORS, archivos y más | Su middleware es propio y no Tower, por lo que comparte menos piezas con el ecosistema de Axum. No es una mala opción: ambos son válidos |
| **Rocket** | Cuando se prioriza la comodidad | Menos adopción para sistemas grandes |
| **Loco** | Para arrancar rápido: es un framework completo estilo Rails sobre Axum | Ata el proyecto a su manera de organizar el código |

Sin una razón fuerte para lo contrario, la elección es Axum.

## Stack básico

| Pieza | Recomendación | Para qué |
|-------|---------------|----------|
| Servidor web | **Axum** sobre Tokio | API REST, autenticación, WebSockets para el tablero de muelles |
| Base de datos | **PostgreSQL** con **SQLx** | Consultas verificadas al compilar y migraciones |
| Caché y colas | **Redis** | Sesiones, caché de reglas, bloqueos de reserva de stock, alertas en tiempo real |
| Serialización | **Serde** | JSON de entrada y salida |
| Validación y errores | **validator** y **thiserror** | Reglas de entrada y errores claros |
| Autenticación | **JWT** con **argon2** para claves | Roles y permisos por almacén y zona |
| Registros | **tracing** | Historial y diagnóstico |
| Tareas en segundo plano | Cola sobre Redis | Alertas de vencimiento, reportes, avisos de permisos |

### SQLx sobre un ORM

Un WMS tiene consultas de stock, kardex y reportes que conviene escribir en SQL. SQLx lo permite y comprueba las consultas al compilar.

## Decisiones de diseño desde el inicio

1. **Stock como movimientos.** El saldo se calcula a partir de movimientos inmutables (entrada, salida, ajuste). Esto da la trazabilidad y la auditoría que ofrece el producto (ver [Trazabilidad, auditoría y evidencia](08-modulos-y-roadmap.md) y [Ajustes de stock](06-stock-prestamos-ajustes.md)).
2. **Redis no es la fuente de verdad.** Todo lo importante vive en PostgreSQL; Redis solo acelera y coordina.

## Cómo se relaciona con los requisitos del producto

| Necesidad del producto | Pieza técnica |
|------------------------|---------------|
| Tablero de muelles en tiempo real | WebSockets en Axum |
| Roles y permisos por almacén y zona | JWT + modelo de permisos en PostgreSQL |
| Historial inalterable de movimientos | Stock como movimientos inmutables |
| Alertas de permisos y vencimientos | Tareas en segundo plano sobre Redis |
| Reglas de cumplimiento configurables | Reglas en base de datos, con caché en Redis |
| Reserva de stock en pedidos concurrentes | Bloqueos en Redis, con PostgreSQL como fuente de verdad |
| Funcionamiento sin señal en la app móvil | Pendiente de diseñar (sincronización); ver app móvil |

## Siguientes pasos posibles

- **Arquitectura general:** ya recomendada en [Arquitectura de la plataforma](11-arquitectura.md).
- **Modelo de datos** de los módulos de la primera etapa (ver [hoja de ruta](08-modulos-y-roadmap.md)).
- Decidir el frontend y la app móvil.
