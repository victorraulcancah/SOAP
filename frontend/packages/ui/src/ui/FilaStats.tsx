import type { ReactNode } from 'react'
import { cn } from './cn'

/**
 * La fila de indicadores de arriba de una pantalla.
 *
 * En movil van en UNA fila que se desliza: apilados uno sobre otro empujaban
 * la tabla fuera de la pantalla y obligaban a hacer scroll antes de ver el
 * primer dato. Desde sm vuelven a ser una grilla. Los margenes negativos hacen
 * que la fila sangre hasta el borde, para que se note que hay mas tarjetas a
 * la derecha.
 *
 * La usan ListPage y las pantallas que arman su propio encabezado (Mi Caja,
 * el estado de resultados): asi todas se ven igual en el telefono.
 */
export function FilaStats({
  children,
  lateral = false,
  className,
}: {
  children: ReactNode
  /** En pantallas anchas (xl) las tarjetas pasan a una columna de 14rem; ListPage la pone al costado. */
  lateral?: boolean
  className?: string
}) {
  return (
    <section
      className={cn(
        '-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1',
        // Tarjetas compactas de ancho acotado: la fila las acomoda sin estirarlas hasta llenar la pantalla.
        'sm:mx-0 sm:grid sm:grid-cols-[repeat(auto-fill,minmax(12rem,14rem))] sm:gap-3',
        'sm:overflow-visible sm:px-0 sm:pb-0',
        '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        lateral && 'xl:flex xl:w-56 xl:shrink-0 xl:snap-none xl:flex-col xl:gap-3',
        className,
      )}
    >
      {children}
    </section>
  )
}
