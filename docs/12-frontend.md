# Frontend

Recomendación para el frontend de la plataforma. Complementa el [Stack técnico](10-stack-tecnico.md) y la [Arquitectura de la plataforma](11-arquitectura.md) del backend.

> **Estado:** recomendación, aún no es una decisión cerrada. Ver [Puntos por definir](09-pendientes.md).

## Recomendación: monorepo con varias apps que comparten un sistema de diseño

No hacer una sola aplicación gigante. El POS, el ecommerce, el backoffice y la app del almacén tienen necesidades muy distintas (sin conexión, SEO, pantallas táctiles, tablas enormes). Lo que sí debe ser común es el **sistema de diseño y los componentes**, y eso se logra con un monorepo.

## Stack base (React + Tailwind)

Las plantillas de paneles administrativos actuales convergen en esta combinación: React 19 con Vite y TypeScript, TanStack Router, TanStack Query con Zustand, y Tailwind CSS v4 con shadcn/Radix.

| Necesidad | Herramienta |
|-----------|-------------|
| Base | **React 19 + TypeScript + Vite** |
| Estilos | **Tailwind CSS v4** |
| Componentes base | **shadcn/ui** sobre Radix, con **class-variance-authority** y **tailwind-merge** |
| Rutas | **TanStack Router** (rutas con tipos verificados) |
| Datos del servidor | **TanStack Query** |
| Tablas grandes | **TanStack Table** + **TanStack Virtual** |
| Formularios | **React Hook Form + Zod** (o TanStack Form) |
| Estado local | **Zustand** (solo lo mínimo) |
| Gráficos | **Recharts** o **ECharts** |
| Idiomas | **i18next** |
| Documentación de componentes | **Storybook** |
| Pruebas | **Vitest**, **Testing Library**, **Playwright** |

Un ejemplo reciente de plantilla usa justo class-variance-authority, tailwind-merge, shadcn/ui y Storybook, que es el enfoque útil para componentes reutilizables.

### Lo que se evitaría

- **Redux:** TanStack Query ya cubre el estado del servidor.
- **Micro-frontends con Module Federation:** agrega mucha complejidad sin necesidad aquí.
- **Next.js para el backoffice:** no necesita renderizado en servidor.

## Estructura del monorepo (pnpm + Turborepo)

```
frontend/
├── apps/
│   ├── backoffice/     # ERP, WMS, RRHH, CRM, TMS, SCM, OAS (SPA con Vite)
│   ├── pos/            # Punto de venta táctil, PWA sin conexión
│   ├── warehouse/      # App del operario: escaneo, tareas (PWA)
│   └── storefront/     # Ecommerce público con SEO (Next.js)
└── packages/
    ├── ui/             # Sistema de diseño: primitivos y componentes compuestos
    ├── tokens/         # Colores, tipografía, espaciado (tema de Tailwind)
    ├── api-client/     # Cliente tipado generado desde el contrato OpenAPI del backend
    ├── domain-ui/      # Componentes con significado de negocio (selector de producto, ubicación)
    ├── hooks/          # Hooks compartidos
    └── config/         # ESLint, TypeScript, Tailwind compartidos
```

### Por qué cada app es distinta

| App | Necesidades |
|-----|-------------|
| **Backoffice** | Tablas, formularios y reportes, con muchos módulos cargados bajo demanda |
| **POS** | Debe vender aunque se caiga el internet. PWA con base local y cola de sincronización, atajos de teclado, lector de barras y botones grandes |
| **Warehouse** | Móvil, con cámara para escanear y trabajo sin señal (ver [Operaciones](04-operaciones.md)) |
| **Storefront** | SEO y carga rápida. Conviene renderizado en servidor; Next.js es la opción más madura. Alternativa: TanStack Start, que se usa con React 19, Vite y shadcn en plantillas de dashboards |

## Componentes reutilizables: cuatro niveles

| Nivel | Qué es | Ejemplos | Dónde vive |
|-------|--------|----------|-----------|
| 1. Primitivos | Piezas básicas, sin lógica de negocio | Button, Input, Select, Dialog, Badge | `packages/ui` |
| 2. Compuestos | Combinan primitivos para un patrón | DataTable, FormField, FilterBar, PageHeader, ConfirmDialog, EmptyState | `packages/ui` |
| 3. Plantillas de pantalla | Estructura completa de una página típica | Página de lista, de detalle, de asistente por pasos, tablero | `packages/ui` |
| 4. De dominio | Entienden el negocio | ProductPicker, LocationPicker, StockBadge, ExpiryTag, ComplianceAlert | `packages/domain-ui` |

### Reglas que mantienen los componentes limpios

- `packages/ui` **nunca llama a la API ni conoce el negocio**: recibe datos y emite eventos.
- **Composición antes que propiedades infinitas:** un `Card` con `Card.Header` y `Card.Body` envejece mejor que uno con 30 props.
- **Variantes con cva** (tamaño, color, estado) en lugar de clases sueltas repartidas por la app.
- **Tokens en el tema de Tailwind v4:** colores, espaciado y tipografía definidos una sola vez; así se cambia la marca de una empresa (multiempresa) sin tocar componentes.
- **Todo accesible por teclado**, importante para operarios y cajeros que trabajan rápido.
- **Cada componente con su historia en Storybook:** es el catálogo vivo del equipo.

## Organización interna del backoffice (por módulo del negocio)

```
apps/backoffice/src/
├── app/            # Proveedores, rutas raíz, layout, menú
├── modules/
│   ├── inventory/
│   │   ├── api/         # Consultas y mutaciones (TanStack Query)
│   │   ├── components/  # Componentes propios del módulo
│   │   ├── pages/       # Pantallas
│   │   ├── schemas/     # Validaciones (Zod)
│   │   └── routes.ts    # Rutas del módulo, cargadas bajo demanda
│   ├── wms/
│   ├── compliance/
│   └── hr/ ...
└── shared/         # Lo mínimo común de la app
```

Esto refleja los **contextos del backend** (ver [Arquitectura](11-arquitectura.md)): un módulo del frontend corresponde a un módulo del backend. Cada uno se carga solo cuando el usuario entra, y el menú aparece según los **permisos del usuario y los módulos que contrató cada empresa**.

## Conexión con el backend Rust

- El backend publica un contrato **OpenAPI** (con utoipa) y el frontend **genera el cliente tipado** automáticamente. Así, si cambia un campo en Rust, el frontend falla al compilar y no en producción.
- **Tiempo real** (tablero de muelles, alertas de stock) por WebSocket o SSE, conectado a TanStack Query para refrescar los datos.
- **Permisos** vienen del backend y se aplican en el menú, las rutas y los botones.

## Lo que más rinde invertir

Un ERP es sobre todo **tablas y formularios**. Conviene construir bien, desde el inicio:

1. **DataTable potente:** filtros, orden, paginación en servidor, selección múltiple, exportar, columnas configurables y virtualización para miles de filas.
2. **Formularios consistentes:** validación, errores del servidor, guardado y confirmación al salir.
3. **Páginas de lista y detalle como plantilla:** con eso los módulos simples (RRHH, catálogos, calendarios) casi se arman solos.

## Fases

1. **Fase 1:** monorepo, `tokens`, `ui` con los primitivos y la DataTable, cliente de API, backoffice con inventario, WMS y cumplimiento, y la app `warehouse`.
2. **Fase 2:** POS con modo sin conexión, compras, pedidos y facturación.
3. **Fase 3:** storefront del ecommerce, CRM, TMS, SCM, RRHH y OAS.

Las fases siguen las del backend en [Arquitectura](11-arquitectura.md) y la hoja de ruta funcional del WMS en [Módulos y hoja de ruta](08-modulos-y-roadmap.md).

## Riesgos

- **Componentes copiados de shadcn:** son propios y los mantiene el equipo, así que se debe decidir quién los cuida y evitar que cada módulo los modifique por su cuenta.
- **Un `ui` que se llena de lógica de negocio:** hay que cuidarlo en cada revisión.
- **Fragmentar demasiado pronto:** empezar con `backoffice`, `warehouse` y `ui`, y añadir `pos` y `storefront` cuando toquen.

## Siguientes pasos posibles

- **Catálogo de componentes del sistema de diseño:** qué piezas construir primero.
