import { useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { cn } from '../ui/cn'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import type { Brand, NavGroup } from './types'

export interface AppShellProps {
  brand: Brand
  groups: NavGroup[]
  /** Id de la vista abierta; vacio = inicio. */
  active: string
  onSelect: (id: string) => void
  /** Color de sistema de la vista abierta (un `data-sys`). */
  sys: string
  /** Pestañas de la barra superior (a la izquierda). */
  tabs?: ReactNode
  /** Contenido de la derecha de la barra superior (notificaciones, menu de usuario...). */
  topbarRight?: ReactNode
  /** Clic derecho sobre una entrada del menu (p. ej. para abrirla en una pestaña nueva). */
  onItemContextMenu?: (id: string, e: MouseEvent) => void
  children: ReactNode
}

/**
 * Estructura de un sistema interno: sider blanco fijo a la izquierda y area de
 * trabajo gris a la derecha.
 *
 * El `data-sys` del contenedor lleva el color del modulo abierto, asi que
 * topbar, botones y tarjetas se tiñen solos al cambiar de modulo. El fondo del
 * area de trabajo NO: es siempre gris (bg-surface-alt).
 */
export function AppShell({
  brand,
  groups,
  active,
  onSelect,
  sys,
  tabs,
  topbarRight,
  onItemContextMenu,
  children,
}: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [oculto, setOculto] = useState(false)

  return (
    <div data-sys={sys} className="min-h-screen bg-surface-alt">
      <Sidebar
        brand={brand}
        sys={sys}
        groups={groups}
        active={active}
        onSelect={(id) => {
          onSelect(id)
          setMobileOpen(false)
        }}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        oculto={oculto}
        onOcultar={() => setOculto(true)}
        onItemContextMenu={onItemContextMenu}
      />

      {/* el contenido se desplaza con la misma transicion que el sider */}
      <div
        className={cn(
          'flex min-h-screen flex-col transition-[padding] duration-200',
          oculto ? 'lg:pl-0' : collapsed ? 'lg:pl-[72px]' : 'lg:pl-60',
        )}
      >
        <Topbar
          siderOculto={oculto}
          onMostrarSider={() => setOculto(false)}
          onOpenMenu={() => setMobileOpen(true)}
          tabs={tabs}
          right={topbarRight}
        />

        <main className="flex-1 px-4 pt-3 pb-6 sm:px-6">{children}</main>
      </div>

      {/*
        Ancla para los modales: Modal se pinta con createPortal en #modal-root
        para no heredar el espaciado de la pagina, y al estar DENTRO de este
        data-sys toma el color del modulo abierto sin que Modal lo sepa.
      */}
      <div id="modal-root" />
    </div>
  )
}
