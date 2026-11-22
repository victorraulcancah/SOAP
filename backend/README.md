# Backend

Workspace de Cargo del backend. Es solo el esqueleto: arquitectura, dependencias y herramientas. Todavía no tiene lógica de negocio. El diseño está en [docs/11-arquitectura.md](../docs/11-arquitectura.md) y el stack en [docs/10-stack-tecnico.md](../docs/10-stack-tecnico.md).

> **Estado:** el esqueleto se generó sin Rust instalado, así que **todavía no se ha compilado**. La primera vez que corras `cargo check` pueden aparecer ajustes de versiones de dependencias.

## Estructura

```
backend/
├── apps/
│   ├── api-server/      # Binario principal: Axum, arma todos los módulos
│   └── worker/          # Tareas en segundo plano: outbox, alertas, reportes
├── platform/            # Piezas transversales
│   ├── shared-kernel/   # Tipos mínimos comunes (TenantId, más adelante Dinero, Cantidad)
│   ├── identity/        # Usuarios, roles, permisos (JWT, argon2)
│   ├── audit/           # Auditoría
│   ├── outbox-events/   # Eventos entre módulos (patrón outbox)
│   └── workflow-engine/ # Flujos de aprobación
└── migrations/          # Migraciones de SQLx (un esquema por módulo)
```

**Los módulos de negocio todavía no existen.** Cuando se creen (inventario, WMS, cumplimiento…), cada uno irá en `modules/<nombre>/` con cuatro crates: `domain`, `application`, `adapters` y `api` (ver [arquitectura](../docs/11-arquitectura.md)), y habrá que agregar `"modules/*/*"` a `members` en [Cargo.toml](Cargo.toml).

## Regla de dependencias

Regla prevista para cuando existan los módulos. Se aplicará con las dependencias de cada `Cargo.toml`, de modo que el compilador la haga cumplir:

| Crate | Puede depender de | No puede depender de |
|-------|-------------------|----------------------|
| `*-domain` | `shared-kernel` y librerías puras (serde, uuid, time, rust_decimal, thiserror) | Axum, SQLx, Redis |
| `*-api` | `shared-kernel` | El dominio del propio módulo ni de otros |
| `*-application` | `*-domain`, `*-api` del mismo módulo y el `*-api` de otros módulos | Axum, SQLx, Redis, adapters |
| `*-adapters` | `*-application`, SQLx, Redis, Axum, `platform-*` | El `domain` o `adapters` de otros módulos |
| `api-server` | Los `*-adapters` de cada módulo y `platform-*` | — |

**Un módulo solo usa el `api` de otro**, nunca su `domain` ni sus tablas.

## Base de datos

- Una sola base PostgreSQL con **un esquema por módulo**: por ahora solo `platform` y `outbox`; los de cada módulo se agregan al crearlo (ver [migrations/0001_esquemas.sql](migrations/0001_esquemas.sql)).
- Sin llaves foráneas ni consultas entre esquemas.
- Redis solo acelera y coordina; la fuente de verdad es PostgreSQL.

## Dependencias

Todas las versiones se declaran una sola vez en `[workspace.dependencies]` de [Cargo.toml](Cargo.toml) y cada crate las usa con `nombre.workspace = true`.

| Área | Crates |
|------|--------|
| Servidor web | `axum`, `tokio`, `tower`, `tower-http` |
| Datos | `sqlx` (PostgreSQL, migraciones, rustls), `redis` (Streams, ConnectionManager) |
| Serialización y tipos | `serde`, `serde_json`, `uuid` (v7), `time`, `rust_decimal` |
| Validación y errores | `validator`, `thiserror`, `anyhow` |
| Contrato de API | `utoipa`, `utoipa-axum` (OpenAPI para generar el cliente del frontend) |
| Autenticación | `jsonwebtoken`, `argon2` |
| Observabilidad y configuración | `tracing`, `tracing-subscriber`, `dotenvy` |

## Herramientas a instalar

Ya se asume PostgreSQL y Redis instalados. Falta:

1. **Rust** (incluye `cargo`, `rustfmt` y `clippy`) con [rustup](https://rustup.rs). La versión mínima es 1.85 (edición 2024); `rust-toolchain.toml` fija el canal estable.
2. **sqlx-cli**, para crear la base y correr migraciones:
   ```powershell
   cargo install sqlx-cli --no-default-features --features rustls,postgres
   ```
3. Opcionales, para el día a día:
   ```powershell
   cargo install cargo-watch cargo-nextest cargo-audit cargo-deny
   ```
   - `cargo-watch`: recompila y reinicia al guardar.
   - `cargo-nextest`: ejecutor de pruebas más rápido.
   - `cargo-audit` y `cargo-deny`: vulnerabilidades y licencias de dependencias.

En Windows, `rustup` pide además las **Build Tools de Visual Studio** (carga de trabajo "Desarrollo para el escritorio con C++") para enlazar.

## Primer arranque

```powershell
cd backend
Copy-Item .env.example .env        # ajusta DATABASE_URL y REDIS_URL
sqlx database create
sqlx migrate run
cargo check --workspace
cargo run -p api-server
```

`api-server` expone por ahora solo `GET /health`, que responde 200 si PostgreSQL contesta.

## Comandos útiles

| Comando | Para qué |
|---------|----------|
| `cargo check --workspace` | Comprobar que todo compila |
| `cargo fmt --all` | Formatear |
| `cargo clippy --workspace --all-targets` | Revisar con clippy |
| `cargo nextest run --workspace` | Ejecutar pruebas |
| `cargo watch -x "run -p api-server"` | Reiniciar el servidor al guardar |
| `cargo run -p worker` | Ejecutar el worker |
