import type { KeyboardEvent, MouseEvent } from 'react'
import { X } from 'lucide-react'
import { cn } from '../ui/cn'
import { IconGradientDefs } from '../ui/IconGradientDefs'
import { ThemedIcon } from '../ui/ThemedIcon'
import { panelDomId, tabDomId } from './tabsState'
import type { WorkspaceTab } from './types'

interface Props {
  tab: WorkspaceTab
  active: boolean
  onSelect: () => void
  onClose: () => void
  onContextMenu?: (e: MouseEvent) => void
  onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void
}

// Estilo navegador: la pestaña activa tiene el gris del contenido y dos esquinas
// curvas abajo (los "hombros") que la funden con la pagina. Cada hombro es un
// cuarto de circulo pintado con un radial-gradient: transparente dentro del
// radio (deja ver la franja) y del color de la pestaña fuera de el.
const ACTIVE = [
  'z-10 bg-surface-alt font-semibold text-ink [--tab-bg:var(--color-surface-alt)]',
  "before:absolute before:bottom-0 before:-left-3 before:size-3 before:content-['']",
  'before:[background:radial-gradient(circle_at_0_0,transparent_12px,var(--tab-bg)_12.5px)]',
  "after:absolute after:bottom-0 after:-right-3 after:size-3 after:content-['']",
  'after:[background:radial-gradient(circle_at_100%_0,transparent_12px,var(--tab-bg)_12.5px)]',
].join(' ')

// Separador fino entre pestañas; se oculta junto a la activa y al pasar el cursor.
const INACTIVE = [
  'font-medium text-ink-muted hover:bg-white/50',
  "after:absolute after:top-2.5 after:right-0 after:h-4 after:w-px after:bg-line-strong after:content-['']",
  "hover:after:opacity-0 has-[+[aria-selected='true']]:after:opacity-0",
].join(' ')

/**
 * Una pestaña. Lleva su propio data-sys: el icono, las letras y la barra de
 * color de arriba toman el color de SU modulo, no el del que este abierto.
 */
export function TabItem({ tab, active, onSelect, onClose, onContextMenu, onKeyDown }: Props) {
  const gradientId = `${tabDomId(tab.key)}-gradient`

  return (
    <div
      data-sys={tab.sys}
      role="tab"
      id={tabDomId(tab.key)}
      aria-selected={active}
      aria-controls={panelDomId(tab.key)}
      tabIndex={active ? 0 : -1}
      title={tab.title ?? tab.label}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      onContextMenu={onContextMenu}
      // Sin esto un clic dejaba el foco (y su borde) en la pestaña. El teclado sigue
      // pudiendo enfocarla. El clic central ademas cerraria con autoscroll del sistema.
      onMouseDown={(e) => e.preventDefault()}
      onAuxClick={(e) => {
        if (e.button === 1 && tab.closable) onClose()
      }}
      className={cn(
        'group relative flex h-9 min-w-[7rem] max-w-[13rem] shrink-0 cursor-pointer items-center gap-2 rounded-t-xl pr-1.5 pl-3',
        'text-[13px] select-none outline-none transition-colors',
        'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--accent)',
        active ? ACTIVE : INACTIVE,
      )}
    >
      {/* barra de color del modulo, arriba de la activa */}
      {active && (
        <span
          aria-hidden="true"
          className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-[linear-gradient(90deg,var(--grad-start),var(--grad-end))]"
        />
      )}

      <IconGradientDefs id={gradientId} />
      <ThemedIcon icon={tab.icon} size={15} gradientId={gradientId} className="shrink-0" />
      <span className="flex-1 truncate">
        <span className="text-grad">{tab.label}</span>
      </span>

      {tab.closable && (
        <button
          type="button"
          tabIndex={-1}
          aria-label={`Cerrar ${tab.label}`}
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className={cn(
            'inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink-soft',
            'transition-[opacity,background-color] hover:bg-black/10 hover:text-ink',
            // en pantallas tactiles no hay "hover": siempre visible
            active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100',
          )}
        >
          <X size={12} aria-hidden />
        </button>
      )}
    </div>
  )
}
