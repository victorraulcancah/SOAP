# Frontend

Monorepo del frontend (pnpm + Turborepo). Es solo la base: estructura, dependencias y herramientas, sin pantallas ni módulos de negocio. El diseño está en [docs/12-frontend.md](../docs/12-frontend.md).

## Estructura

```
frontend/
├── apps/
│   ├── backoffice/   # SPA con Vite: ERP, WMS, RRHH, CRM, TMS, SCM, OAS
│   └── warehouse/    # App del operario (móvil, escaneo)
└── packages/
    ├── ui/           # Sistema de diseño (hoy solo la utilidad `cn`)
    ├── tokens/       # Tema de Tailwind v4 (colores, tipografía, espaciado)
    ├── api-client/   # Cliente tipado del contrato OpenAPI del backend (pendiente de generar)
    └── config/       # tsconfig base compartido
```

Se añaden más adelante, cuando toquen: `apps/pos`, `apps/storefront`, `packages/domain-ui` y `packages/hooks`.

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
