import type { LucideIcon } from 'lucide-react'
import { ICON_GRADIENT_ID } from './icon-gradient'

interface Props {
  icon: LucideIcon
  size?: number
  className?: string
  /** Id del degradado a usar (el de <IconGradientDefs id=... />). */
  gradientId?: string
  /** Sin degradado: toma el color del texto (currentColor), p. ej. en una fila activa. */
  solid?: boolean
}

/** Icono de lucide pintado con el degradado del tema. */
export function ThemedIcon({ icon: Icon, size = 18, className, gradientId = ICON_GRADIENT_ID, solid = false }: Props) {
  return (
    <Icon
      size={size}
      className={className}
      stroke={solid ? 'currentColor' : `url(#${gradientId})`}
      aria-hidden
    />
  )
}
