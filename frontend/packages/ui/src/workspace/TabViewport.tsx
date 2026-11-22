import type { ReactNode } from 'react'
import { TabErrorBoundary } from './TabErrorBoundary'
import { panelDomId, tabDomId } from './tabsState'

export interface TabViewportProps {
  /** Claves de las pestañas abiertas. */
  keys: string[]
  /** Clave de la pestaña a la vista. */
  active: string
  /** Contenido de cada pestaña. */
  render: (key: string) => ReactNode
  /** Al cambiar, todas las pestañas se vuelven a montar (p. ej. al cambiar de sucursal). */
  resetKey?: string | number
}

/**
 * Contenido de las pestañas abiertas. Todas siguen montadas aunque no se vean
 * (solo se ocultan), asi al volver a una conserva su estado: filtros, pagina de
 * la tabla, lo escrito en un formulario. Una pestaña se monta la primera vez
 * que se abre, no antes.
 */
export function TabViewport({ keys, active, render, resetKey = 0 }: TabViewportProps) {
  return (
    <>
      {keys.map((key) => (
        <div
          key={`${resetKey}:${key}`}
          role="tabpanel"
          id={panelDomId(key)}
          aria-labelledby={tabDomId(key)}
          hidden={key !== active}
          // al volver a mostrarse (display none -> block) la animacion arranca de nuevo
          className="ui-fade-up"
        >
          <TabErrorBoundary>{render(key)}</TabErrorBoundary>
        </div>
      ))}
    </>
  )
}
