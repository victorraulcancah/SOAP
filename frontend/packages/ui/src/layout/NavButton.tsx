import type { MouseEvent, ReactNode } from 'react'
import { cn } from '../ui/cn'
import { ACTIVE_ROW } from './nav-styles'

interface Props {
  icon: ReactNode
  label: string
  badge?: string
  pending?: boolean
  active: boolean
  collapsed: boolean
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  /** Clic derecho (p. ej. "abrir en una pestaña nueva"). */
  onContextMenu?: (e: MouseEvent<HTMLButtonElement>) => void
  small?: boolean
}

const INACTIVE_ROW = 'text-ink-muted hover:bg-(--accent-soft) hover:text-(--accent-ink)'

export function NavButton({
  icon,
  label,
  badge,
  pending = false,
  active,
  collapsed,
  onClick,
  onContextMenu,
  small = false,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      onContextMenu={onContextMenu}
      title={collapsed ? label : pending ? `${label} — vista pendiente` : undefined}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group flex w-full cursor-pointer items-center gap-2.5 rounded-lg transition-colors',
        small ? 'px-2.5 py-1.5 text-[13px]' : 'px-3 py-2 text-sm font-medium',
        collapsed && 'justify-center px-0',
        active ? cn(ACTIVE_ROW, 'font-semibold') : INACTIVE_ROW,
      )}
    >
      <span className="shrink-0">{icon}</span>
      {!collapsed && (
        <span className="flex-1 truncate text-left">
          {/* las letras llevan los colores del tema; la fila activa se distingue por el fondo y la barra */}
          <span className="text-grad">{label}</span>
        </span>
      )}
      {!collapsed && badge && (
        <span className="shrink-0 rounded-full bg-(--accent-soft) px-1.5 py-0.5 text-[10px] font-bold text-(--accent-ink)">
          {badge}
        </span>
      )}
      {/* punto tenue: la vista todavia no existe */}
      {!collapsed && !badge && pending && (
        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-line-strong" title="Pendiente" />
      )}
    </button>
  )
}
