import type { ReactNode } from 'react'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from './cn'

/**
 * Tarjeta de indicador.
 *
 * El icono es obligatorio a proposito: en una fila de tres o cuatro tarjetas
 * el ojo se guia por la forma antes que por el texto, y una sin icono rompe el
 * ritmo de la fila.
 */

export type StatTono = 'sys' | 'neutral' | 'success' | 'warning' | 'danger'

const TONOS: Record<StatTono, string> = {
  sys: 'bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] text-[var(--accent-ink)]',
  neutral: 'bg-slate-100 text-slate-600',
  success: 'bg-emerald-50 text-emerald-600',
  warning: 'bg-amber-50 text-amber-600',
  danger: 'bg-red-50 text-red-600',
}

export interface StatCardProps {
  label: string
  value: string
  /** Obligatorio: toda tarjeta lleva icono. */
  icon: ReactNode
  tono?: StatTono
  /** Variacion respecto al periodo anterior, ej. 12.4 o -3.1. */
  trend?: number
  /** Aclaracion corta bajo el numero. */
  hint?: string
  className?: string
}

export function StatCard({
  label,
  value,
  icon,
  tono = 'sys',
  trend,
  hint,
  className,
}: StatCardProps) {
  const chip = TONOS[tono]
  const sube = (trend ?? 0) >= 0

  return (
    <div
      className={cn(
        'flex items-start justify-between gap-3 rounded-field border border-line bg-white p-4',
        'transition-shadow duration-200 hover:shadow-md',
        // En la fila desplazable de movil cada tarjeta conserva un ancho legible; desde sm la grilla
        // (ver FilaStats) decide el ancho: la tarjeta no se estira para llenar la fila.
        'w-52 shrink-0 snap-start sm:w-auto sm:shrink',
        className,
      )}
    >
      {/* El titulo puede ocupar dos lineas: cortarlo con "..." ocultaba justo lo que dice el indicador. */}
      <div className="min-w-0 flex-1">
        <p className="text-[13px] leading-snug font-medium text-ink-muted">{label}</p>

        <p className="mt-1.5 truncate text-3xl leading-none font-bold tracking-tight text-ink tabular-nums">{value}</p>

        {(trend !== undefined || hint) && (
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
            {trend !== undefined && (
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-semibold',
                  sube ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700',
                )}
              >
                {sube ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {sube ? '+' : ''}
                {trend}%
              </span>
            )}
            {hint && <span className="text-ink-soft">{hint}</span>}
          </div>
        )}
      </div>

      <span className={cn('inline-flex size-9 shrink-0 items-center justify-center rounded-lg', chip)}>{icon}</span>
    </div>
  )
}
