import type { LucideIcon } from 'lucide-react'

/** Lo que la barra necesita para dibujar una pestaña. */
export interface WorkspaceTab {
  /** Clave de la vista que muestra (unica entre las pestañas abiertas). */
  key: string
  label: string
  /** Ayuda al pasar el cursor, p. ej. "Configuración › Usuarios". */
  title?: string
  icon: LucideIcon
  /** Color del modulo: un `data-sys` de styles/themes.css. */
  sys: string
  closable: boolean
}
