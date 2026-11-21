# Arquitectura de la plataforma

El WMS es una parte de una plataforma empresarial completa: POS para una cadena grande de minimarkets, ecommerce, ERP, RRHH, TMS, SCM, CRM y OAS (gestión documental, flujos de trabajo, calendarios).

> **Estado:** recomendación de arquitectura, aún no es una decisión cerrada. El stack tecnológico está en [Stack técnico](10-stack-tecnico.md).
>
> **Nota:** en la conversación original aparecía "DNS"; se asume que se refería a **DMS** (sistema de gestión documental). Conviene confirmarlo.

## Recomendación: monolito modular, DDD por contexto, hexagonal en cada módulo

**No empezar con microservicios.** Son 10 o más áreas de negocio, un equipo que recién arranca y reglas que todavía se están definiendo. Con microservicios desde el día uno se paga el costo de la red, el despliegue y los datos distribuidos sin necesitarlo. Tampoco conviene un monolito sin estructura, porque a los seis meses nadie podrá separar nada.

La ruta:

1. **Un solo programa**, dividido internamente en módulos que no pueden tocarse entre sí por la espalda.
2. **DDD estratégico:** cada área de negocio es un *contexto delimitado* con su propio lenguaje y sus propios datos.
3. **Hexagonal dentro de cada módulo:** el negocio no depende de Axum, PostgreSQL ni Redis.
4. **Extraer a servicio** solo lo que lo justifique (POS en tienda, ecommerce).

## Los contextos de la plataforma

| Grupo | Contextos | Cómo tratarlos |
|-------|-----------|----------------|
| **Núcleo** (aquí está el valor) | Inventario y stock, WMS (ubicaciones, recepción, despacho), cumplimiento normativo, POS, pedidos y precios | DDD completo y hexagonal estricto |
| **Soporte de negocio** | ERP (compras, ventas, finanzas, facturación), SCM, TMS, ecommerce, CRM | DDD con agregados donde hay reglas; capas simples donde es mayormente CRUD |
| **Administrativos** | RRHH, OAS (documentos, calendarios, reservas, viajes) | Capas simples, sin sobrediseño |
| **Transversales** | Identidad y permisos, auditoría, notificaciones, archivos, motor de flujos de aprobación | Plataforma compartida |

**No aplicar DDD y hexagonal completos a todo.** Un calendario corporativo o una reserva de salas no tienen reglas de negocio complejas, y la ceremonia solo frena el avance en Rust.

**Motor de flujos de trabajo (OAS):** construirlo una vez como pieza de plataforma. Lo reutilizan las aprobaciones de ajustes de stock, préstamos, compras y vacaciones (ver [Stock, préstamos y ajustes](06-stock-prestamos-ajustes.md)).

## Decisión clave: quién es dueño del stock

Hoy el stock aparece en el WMS, en el POS (stock de tienda) y en el ecommerce (stock vendible). Si cada uno tiene su propia verdad, se desordena todo.

- Un contexto **Inventario** es dueño de los saldos, como un libro de movimientos inmutables (entrada, salida, ajuste, traslado, reserva).
- **WMS** agrega el *dónde* (ubicaciones, lotes, cuarentena).
- **POS** y **ecommerce** consultan y reservan stock mediante su interfaz pública, nunca leyendo sus tablas.

## Estructura del proyecto (Cargo workspace)

```
plataforma/
├── apps/
│   ├── api-server/        # Binario principal: Axum, arma todos los módulos
│   ├── worker/            # Tareas en segundo plano: alertas, eventos, reportes
│   └── pos-edge/          # Servicio en tienda (modo sin conexión), más adelante
├── platform/              # Piezas transversales
│   ├── shared-kernel/     # Tipos mínimos comunes (Dinero, Cantidad, TenantId)
│   ├── identity/          # Usuarios, roles, permisos
│   ├── audit/             # Auditoría
│   ├── outbox-events/     # Eventos entre módulos
│   └── workflow-engine/   # Flujos de aprobación
└── modules/
    ├── inventory/
    │   ├── domain/        # Entidades, reglas, eventos (Rust puro)
    │   ├── application/   # Casos de uso y puertos (traits)
    │   ├── adapters/      # Postgres, Redis, HTTP
    │   └── api/           # Interfaz pública hacia otros módulos
    ├── wms/
    ├── compliance/
    ├── pos/
    ├── ecommerce/
    ├── erp-purchasing/    # ... y así cada contexto
    └── hr/
```

### Regla de dependencias

- `domain` no depende de nada externo: ni Axum, ni SQLx, ni Redis.
- `application` depende solo de `domain` y define *puertos* (traits como `StockRepository`).
- `adapters` implementa esos puertos con PostgreSQL, Redis o HTTP.
- **Un módulo solo puede usar el `api` de otro**, nunca su `domain` ni sus tablas.

Para los módulos núcleo conviene separar `domain`, `application` y `adapters` en crates distintos, porque el compilador impide que el dominio use SQLx. En los módulos simples basta un solo crate con carpetas.

## Datos

- **Una sola base PostgreSQL con un esquema por módulo.** Sin llaves foráneas ni consultas entre esquemas.
- **Multiempresa** con `tenant_id` en cada tabla y **Row-Level Security** de PostgreSQL, para que un error no filtre datos de otra empresa.
- **Reportes entre módulos** mediante vistas de lectura alimentadas por eventos, no joins directos.
- **Redis** para caché, sesiones, colas y avisos en tiempo real. Las reservas de stock y la consistencia viven en PostgreSQL con transacciones, no en Redis.

> Esto precisa lo dicho en [Stack técnico](10-stack-tecnico.md), donde Redis aparecía también para "bloqueos de reserva de stock": la consistencia de las reservas queda en PostgreSQL y Redis solo acelera y coordina.

## Comunicación entre módulos

| Necesidad | Mecanismo |
|-----------|-----------|
| Necesito una respuesta ahora (¿hay stock?) | Llamada directa al `api` del otro módulo |
| Algo ocurrió y otros deben enterarse (pedido confirmado, stock bajo mínimo) | **Evento de dominio** con patrón **outbox**: se guarda en la misma transacción y un worker lo publica por Redis Streams |
| Trabajo largo (reportes, avisos) | Cola de tareas sobre Redis |

El **outbox** es lo que más importa: garantiza que nunca se pierda un evento ni se publique uno de una operación que falló. Y como los módulos ya hablan por eventos, separar uno después es más fácil.

## Los dos casos con tratamiento especial

1. **POS de la cadena de minimarkets.** Una tienda no puede dejar de vender si cae el internet. Necesita un **servicio local en cada tienda con su propia base**, que sincroniza con la central mediante eventos. Se diseña desde el inicio como un módulo separable.
2. **Ecommerce.** Tiene picos y lecturas masivas (catálogo, precios, disponibilidad). Usa **modelos de lectura cacheados en Redis** y una API pública separada (BFF). Es el candidato natural a extraerse primero.

**Facturación electrónica y transportistas** van como adaptadores aislados (capa anticorrupción), para que los cambios de proveedor o de norma no toquen el dominio.

## Fases sugeridas

1. **Fase 1:** monolito modular con plataforma (identidad, auditoría, eventos), inventario, WMS y cumplimiento. Aquí empieza el producto.
2. **Fase 2:** POS con servicio en tienda, pedidos, compras y facturación.
3. **Fase 3:** ecommerce, TMS, SCM, CRM, y luego RRHH y OAS.
4. **Después:** extraer servicios solo si hay una razón medible (carga, equipo o despliegue independiente).

Esta secuencia es la de la plataforma completa; la hoja de ruta funcional del WMS (primera versión, segunda y tercera etapa) está en [Módulos y hoja de ruta](08-modulos-y-roadmap.md).

## Riesgos a vigilar

- **Sobreingeniería:** DDD y hexagonal aplicados a todo harían el avance muy lento.
- **Base de datos compartida sin disciplina:** si se rompe la regla de esquemas, el monolito modular se vuelve un monolito normal.
- **Intentar construir todo a la vez:** el alcance es enorme, y conviene que el WMS con cumplimiento salga primero y valide la idea.

## Siguientes pasos posibles

- **Mapa de contextos:** qué contexto se comunica con cuál y por qué.
- **Modelo de datos del Inventario.**
