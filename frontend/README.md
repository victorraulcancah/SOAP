# Frontend

Monorepo del frontend (pnpm + Turborepo). Es solo la base: estructura, dependencias y herramientas, sin pantallas ni módulos de negocio. El diseño está en [docs/12-frontend.md](../docs/12-frontend.md).

## Estructura

```
frontend/
├── apps/
│   ├── backoffice/   # SPA con Vite: ERP, WMS, RRHH, CRM, TMS, SCM, OAS
│   └── warehouse/    # App del operario (móvil, escaneo)
└── packages/
    ├── ui/           # Sistema de diseño: componentes copiados de Ecommerce (ver abajo)
    ├── tokens/       # Tema de Tailwind v4: tokens, color por módulo y tonos (de Ecommerce)
    ├── api-client/   # Cliente tipado del contrato OpenAPI del backend (pendiente de generar)
    └── config/       # tsconfig base compartido
```

Se añaden más adelante, cuando toquen: `apps/pos`, `apps/storefront`, `packages/domain-ui` y `packages/hooks`.

## Componentes copiados de Ecommerce

`packages/ui` y `packages/tokens` contienen una **copia** de lo reutilizable de `C:\laragon\www\Ecommerce\frontend\src` (`shared/` y `styles/`), con Tailwind v4:

| Origen                  | Destino                     | Contenido                                                                                                                  |
| ----------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `shared/ui`             | `packages/ui/src/ui`        | Button, Input, Select, Modal, Toast, Tabs, SysDataTable, ListPage, StatCard, filtros, buscadores…                          |
| `shared/charts`         | `packages/ui/src/charts`    | Gráficos de barras, líneas, dona, dispersión, mapa de calor                                                                |
| `shared/layout`         | `packages/ui/src/layout`    | AppShell, Sidebar, Topbar, UserMenu, NotificationsBell                                                                     |
| `shared/workspace`      | `packages/ui/src/workspace` | Pestañas de trabajo estilo navegador                                                                                       |
| `shared/lib`            | `packages/ui/src/lib`       | Formato y fechas                                                                                                           |
| `styles/` e `index.css` | `packages/tokens/`          | `theme.css` (tokens, base y utilidades), `themes.css` (color por módulo con `data-sys`) y `tones.css` (insignias y avisos) |

Cada app carga los estilos así (ver `apps/*/src/styles.css`):

```css
@import 'tailwindcss';
@import '@soap/tokens/theme.css';
@source '../../../packages/ui/src';
```

Los componentes se usan con `import { Button, Badge } from '@soap/ui'`. El color de un módulo se cambia con `data-sys="inv"` en un contenedor, sin tocar componentes (ver el README de Ecommerce, sección "Sistema de color").

**Lo que no se copió:** nada de `modules/` ni `apps/` de Ecommerce (componentes con lógica de negocio como `ProductCard` o `StockBadge`, que irían en `domain-ui`), ni `shared/api` (cliente HTTP).

**Cambios respecto al origen**

- `Toast`: `ToastProvider` ya no usa `react-router-dom` (`ui` no debe depender del router). Ahora recibe `sys` como propiedad (por defecto `brand`); quien lo monte le pasa el módulo activo.
- `cn` es la del origen (une clases sin resolver conflictos), no la de `tailwind-merge`.
- Prettier sigue el estilo del origen (sin punto y coma, comillas simples) y **no formatea** `packages/ui/src` ni los CSS de `tokens`, para que las copias sigan idénticas. Si Ecommerce cambia, se vuelve a copiar.
- ESLint desactiva en `packages/ui/src` algunas reglas nuevas de React 19 (`react-hooks/refs`, `immutability`, `set-state-in-effect`), porque el origen se revisaba con oxlint y no las cumple.

## Herramientas

Node 22 o superior y pnpm 10 (`corepack enable` o `npm i -g pnpm`).

| Necesidad             | Herramienta instalada                                                |
| --------------------- | -------------------------------------------------------------------- |
| Base                  | React 19, TypeScript 6.0, Vite                                       |
| Estilos               | Tailwind CSS v4 (`@tailwindcss/vite`)                                |
| Componentes           | class-variance-authority, tailwind-merge, clsx, Radix Slot (en `ui`) |
| Rutas y datos         | TanStack Router, TanStack Query                                      |
| Tablas (backoffice)   | TanStack Table, TanStack Virtual                                     |
| Formularios           | React Hook Form, Zod, `@hookform/resolvers`                          |
| Estado local          | Zustand                                                              |
| Gráficos (backoffice) | Recharts                                                             |
| Idiomas               | i18next, react-i18next                                               |
| Pruebas               | Vitest, Testing Library, jsdom, Playwright (`@playwright/test`)      |
| Calidad               | ESLint (flat config), Prettier                                       |
| Monorepo              | pnpm workspaces, Turborepo                                           |

TypeScript está fijado en 6.0 porque `typescript-eslint` aún no admite la 7.

**Pendiente de configurar:** Storybook (catálogo de componentes), generación del cliente OpenAPI y la CLI de shadcn/ui (`components.json`). Los navegadores de Playwright se instalan con `pnpm exec playwright install`.

## Comandos

```powershell
cd frontend
pnpm install
pnpm dev          # levanta las apps en modo desarrollo
pnpm build        # compila todo
pnpm typecheck    # revisa tipos
pnpm lint         # ESLint
pnpm format       # Prettier
pnpm test         # Vitest (aún sin pruebas)
```
