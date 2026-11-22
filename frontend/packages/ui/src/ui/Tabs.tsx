import { useRef } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { cn } from './cn'

export interface TabItem {
  id: string
  label: string
  icon?: ReactNode
  /** Numero al costado: cuantos registros tiene la pestaña, o cuantos esperan atencion. */
  badge?: number
}

export interface TabsProps {
  items: TabItem[]
  active: string
  onChange: (id: string) => void
  className?: string
}

/**
 * Pestañas de una vista, como selector de pildora.
 *
 * La activa va rellena con el color del modulo: se lee de un vistazo cual es, sin depender de una linea
 * fina bajo el texto. Las demas quedan sobre blanco y se iluminan al pasar el cursor. Con teclado se
 * recorren con las flechas (y Inicio / Fin), como cualquier lista de pestañas.
 *
 * Se usan cuando varias tablas o formularios pertenecen al mismo tema y no merecen entrada propia en el
 * menu. En movil el selector se desliza: tres o cuatro pestañas no entran en 390px.
 */
export function Tabs({ items, active, onChange, className }: TabsProps) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})

  const move = (e: KeyboardEvent, from: number) => {
    const last = items.length - 1
    const forward = e.key === 'ArrowRight'
    const backward = e.key === 'ArrowLeft'
    const target = forward ? (from === last ? 0 : from + 1) : backward ? (from === 0 ? last : from - 1) : e.key === 'Home' ? 0 : e.key === 'End' ? last : -1
    if (target < 0) return
    e.preventDefault()
    const next = items[target]
    onChange(next.id)
    refs.current[next.id]?.focus()
  }

  return (
    <div className={cn('-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden', className)}>
      <div role="tablist" className="inline-flex gap-1 rounded-2xl border border-line bg-white p-1 shadow-sm">
        {items.map((item, index) => {
          const activa = item.id === active
          return (
            <button
              key={item.id}
              ref={(el) => {
                refs.current[item.id] = el
              }}
              role="tab"
              type="button"
              aria-selected={activa}
              tabIndex={activa ? 0 : -1}
              onClick={() => onChange(item.id)}
              onKeyDown={(e) => move(e, index)}
              className={cn(
                'flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold whitespace-nowrap',
                'transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)]',
                activa
                  ? 'bg-[var(--accent)] text-[var(--accent-on)] shadow-sm'
                  : 'text-ink-muted hover:bg-surface-alt hover:text-ink',
              )}
            >
              {item.icon}
              {item.label}
              {item.badge !== undefined && (
                <span
                  className={cn(
                    'min-w-5 rounded-full px-1.5 py-0.5 text-center text-[11px] leading-none font-bold',
                    activa
                      ? 'bg-white/25 text-[var(--accent-on)]'
                      : 'bg-[var(--accent-soft)] text-[var(--accent-ink)]',
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
