import { ICON_GRADIENT_ID } from './icon-gradient'

/**
 * Define el degradado del tema para los trazos de los iconos. Se monta DENTRO
 * del elemento con data-sys cuyo color debe tomar: los tres tonos leen
 * --icon-a, --icon-m y --icon-b de ese contexto.
 *
 * El trazo recorre DOS colores del tema (p. ej. azul -> cian) pasando por su
 * mezcla, asi un mismo icono muestra varios colores y no un solo tono.
 *
 * Usa coordenadas de usuario (viewBox 24x24 de lucide) para que los trazos
 * rectos, que no tienen "caja" propia, tambien queden pintados.
 */
export function IconGradientDefs({ id = ICON_GRADIENT_ID }: { id?: string }) {
  return (
    <svg width="0" height="0" aria-hidden focusable="false" className="pointer-events-none absolute">
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="3" y1="3" x2="21" y2="21">
          <stop offset="0" style={{ stopColor: 'var(--icon-a)' }} />
          <stop offset="0.5" style={{ stopColor: 'var(--icon-m)' }} />
          <stop offset="1" style={{ stopColor: 'var(--icon-b)' }} />
        </linearGradient>
      </defs>
    </svg>
  )
}
