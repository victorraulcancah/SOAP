import { useEffect, useLayoutEffect, useRef } from 'react'
import type { KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import type { LucideIcon } from 'lucide-react'
import { cn } from './cn'

export interface ContextMenuItem {
  label: string
  icon?: LucideIcon
  onSelect: () => void
  disabled?: boolean
  /** Texto de apoyo a la derecha (un atajo o el motivo de que este desactivado). */
  hint?: string
}

export interface ContextMenuProps {
  /** Posicion del puntero (coordenadas de ventana). */
  x: number
  y: number
  items: ContextMenuItem[]
  onClose: () => void
}

/**
 * Menu de clic derecho. Se abre en el puntero, se mantiene dentro de la
 * pantalla y se cierra con un clic fuera, Escape, scroll o al cambiar el
 * tamano de la ventana. Se pinta en #modal-root (dentro del data-sys del
 * modulo abierto) para tomar su color sin que el menu lo sepa.
 */
export function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Se mide ya pintado y se corrige directo en el DOM: sin estado extra ni parpadeo.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    el.style.left = `${Math.max(8, Math.min(x, window.innerWidth - width - 8))}px`
    el.style.top = `${Math.max(8, Math.min(y, window.innerHeight - height - 8))}px`
  }, [x, y, items.length])

  useEffect(() => {
    const fuera = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose()
    }
    const escape = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && onClose()

    // mousedown (no contextmenu): un clic derecho en otro sitio cierra este
    // menu antes de que el nuevo se abra, sin que se pisen.
    document.addEventListener('mousedown', fuera)
    document.addEventListener('keydown', escape)
    window.addEventListener('resize', onClose)
    window.addEventListener('blur', onClose)
    window.addEventListener('scroll', onClose, true)

    ref.current?.querySelector<HTMLButtonElement>('button:not(:disabled)')?.focus()

    return () => {
      document.removeEventListener('mousedown', fuera)
      document.removeEventListener('keydown', escape)
      window.removeEventListener('resize', onClose)
      window.removeEventListener('blur', onClose)
      window.removeEventListener('scroll', onClose, true)
    }
  }, [onClose])

  // Flechas arriba/abajo recorren las opciones habilitadas.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    const buttons = [...e.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)')]
    if (!buttons.length) return
    const at = buttons.indexOf(document.activeElement as HTMLButtonElement)
    const next = e.key === 'ArrowDown' ? at + 1 : at - 1
    buttons[(next + buttons.length) % buttons.length].focus()
  }

  return createPortal(
    <div
      ref={ref}
      role="menu"
      style={{ left: x, top: y }}
      onKeyDown={onKeyDown}
      onContextMenu={(e) => e.preventDefault()}
      className="ui-fade-up fixed z-[60] min-w-52 rounded-panel border border-line bg-white p-1 shadow-panel"
    >
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          role="menuitem"
          disabled={item.disabled}
          onClick={() => {
            item.onSelect()
            onClose()
          }}
          className={cn(
            'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13px] text-ink-muted transition-colors',
            'enabled:cursor-pointer enabled:hover:bg-(--accent-soft) enabled:hover:text-(--accent-ink)',
            'focus-visible:bg-(--accent-soft) focus-visible:text-(--accent-ink) focus-visible:outline-none',
            'disabled:opacity-50',
          )}
        >
          {item.icon && <item.icon size={15} className="shrink-0" aria-hidden />}
          <span className="flex-1 truncate">{item.label}</span>
          {item.hint && <span className="shrink-0 text-[11px] text-ink-soft">{item.hint}</span>}
        </button>
      ))}
    </div>,
    document.getElementById('modal-root') ?? document.body,
  )
}
