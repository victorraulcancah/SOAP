import { useEffect, useRef } from 'react'
import type { KeyboardEvent, WheelEvent } from 'react'
import { ContextMenu } from '../ui/ContextMenu'
import type { ContextMenuItem } from '../ui/ContextMenu'
import { useContextMenu } from '../ui/useContextMenu'
import { TabItem } from './TabItem'
import { tabDomId } from './tabsState'
import type { WorkspaceTab } from './types'

export interface TabBarProps {
  tabs: WorkspaceTab[]
  /** Clave de la pestaña activa. */
  active: string
  onSelect: (key: string) => void
  onClose: (key: string) => void
  /** Opciones del clic derecho sobre una pestaña. Sin esto no hay menu. */
  menuFor?: (key: string) => ContextMenuItem[]
}

/**
 * Barra de pestañas. Solo dibuja y avisa: no sabe de rutas, modulos ni de que
 * se muestra en cada una (eso es del TabViewport y de quien la use).
 *
 * Teclado: flechas y Inicio/Fin cambian de pestaña, Supr la cierra.
 */
export function TabBar({ tabs, active, onSelect, onClose, menuFor }: TabBarProps) {
  const list = useRef<HTMLDivElement>(null)
  const menu = useContextMenu<string>()

  // Con muchas pestañas la activa puede quedar fuera de la vista.
  useEffect(() => {
    list.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [active, tabs.length])

  // La rueda del raton desliza la barra en horizontal.
  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (e.deltaY !== 0 && e.deltaX === 0) e.currentTarget.scrollLeft += e.deltaY
  }

  const move = (to: number) => {
    const next = tabs[(to + tabs.length) % tabs.length]
    onSelect(next.key)
    // el foco acompana a la seleccion
    requestAnimationFrame(() => document.getElementById(tabDomId(next.key))?.focus())
  }

  const onKeyDown = (index: number) => (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault()
        return move(index + 1)
      case 'ArrowLeft':
        e.preventDefault()
        return move(index - 1)
      case 'Home':
        e.preventDefault()
        return move(0)
      case 'End':
        e.preventDefault()
        return move(tabs.length - 1)
      case 'Delete':
        if (tabs[index].closable) onClose(tabs[index].key)
    }
  }

  return (
    <>
      <div
        ref={list}
        role="tablist"
        aria-label="Pestañas abiertas"
        onWheel={onWheel}
        // pl-3/pr-3: dejan sitio a los hombros curvos de la primera y la ultima pestaña
        className="flex min-w-0 items-end overflow-x-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab, i) => (
          <TabItem
            key={tab.key}
            tab={tab}
            active={tab.key === active}
            onSelect={() => onSelect(tab.key)}
            onClose={() => onClose(tab.key)}
            onContextMenu={menuFor ? (e) => menu.open(e, tab.key) : undefined}
            onKeyDown={onKeyDown(i)}
          />
        ))}
      </div>

      {menu.state && menuFor && (
        <ContextMenu x={menu.state.x} y={menu.state.y} items={menuFor(menu.state.payload)} onClose={menu.close} />
      )}
    </>
  )
}
