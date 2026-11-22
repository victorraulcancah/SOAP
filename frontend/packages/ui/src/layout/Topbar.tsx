import type { ReactNode } from 'react'
import { Menu, PanelLeftOpen } from 'lucide-react'

export interface TopbarProps {
  /** El sider esta oculto: se muestra el boton para traerlo de vuelta. */
  siderOculto: boolean
  onMostrarSider: () => void
  onOpenMenu: () => void
  /** Pestañas abiertas (ocupan el ancho que sobra, a la izquierda). */
  tabs?: ReactNode
  /** Todo lo que va a la derecha (menu de usuario, notificaciones...). */
  right?: ReactNode
}

// Mismo aspecto que la campana: circulo blanco con sombra suave, de 34px.
const roundButton =
  'inline-flex size-[34px] cursor-pointer items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-shadow hover:shadow-md'

/**
 * Franja superior del area de trabajo, estilo navegador: un gris algo mas
 * oscuro que la pagina, con las pestañas apoyadas en su borde inferior para que
 * la activa se funda con el contenido. Se queda fija al desplazar la pagina.
 *
 * Escritorio: [pestañas ............ controles]. Movil: los controles arriba y
 * las pestañas en una fila propia debajo, porque juntos no caben.
 */
export function Topbar({ siderOculto, onMostrarSider, onOpenMenu, tabs, right }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-end gap-x-2 gap-y-1 bg-[color-mix(in_oklab,var(--color-surface-alt),black_7%)] pt-1.5 pr-3 pl-2 lg:flex-nowrap">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Abrir menú"
        className={`${roundButton} mb-1 lg:hidden`}
      >
        <Menu size={18} />
      </button>

      {/* order-last: en movil baja a su propia fila; en escritorio toma el hueco central */}
      <div className="order-last w-full min-w-0 lg:order-none lg:w-auto lg:flex-1">{tabs}</div>
      {!tabs && <div className="flex-1" />}

      <div className="mb-1 ml-auto flex items-center gap-2 lg:ml-0">
        {/*
          Con el sider oculto, el boton para traerlo de vuelta va JUNTO al menu
          de usuario (a su izquierda): es la unica forma de recuperarlo y asi
          queda con el resto de controles en vez de suelto en la otra esquina.
        */}
        {siderOculto && (
          <button
            type="button"
            onClick={onMostrarSider}
            aria-label="Mostrar menú"
            title="Mostrar menú"
            className={`${roundButton} hidden lg:inline-flex`}
          >
            <PanelLeftOpen size={18} />
          </button>
        )}

        {right}
      </div>
    </header>
  )
}
