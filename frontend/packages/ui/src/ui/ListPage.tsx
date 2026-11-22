import type { ReactNode } from 'react'
import { cn } from './cn'
import { FilaStats } from './FilaStats'
import { PageHeader } from './PageHeader'
import { SysDataTable } from './SysDataTable'
import type { DataTableColumn, SysDataTableProps } from './SysDataTable'

export interface ListPageProps<T> extends Omit<SysDataTableProps<T>, 'actions'> {
  /** Icono de la cabecera, en pastilla con el color del sistema activo. */
  icon?: ReactNode
  title: string
  description?: string
  /** Botones de la cabecera, normalmente el de crear. */
  actions?: ReactNode
  /** Tarjetas de indicadores: sobre la tabla, o en columna al costado derecho en pantallas anchas. */
  stats?: ReactNode
  /** Aviso o error, arriba de todo. */
  alert?: ReactNode
  /** Bloque destacado entre los indicadores y la tabla. */
  banner?: ReactNode
  /** Botones de cada fila (columna Acciones de la tabla). */
  rowActions?: (row: T) => ReactNode
  /** Nota al pie, bajo la tabla. */
  note?: ReactNode
  /** Titulo de la columna del identificador (la clave de la fila). Por defecto "ID". */
  idLabel?: string
  /** Modales y demas piezas sueltas de la vista. */
  children?: ReactNode
}

/**
 * Vista de listado: cabecera, indicadores y tabla, con el mismo armado en
 * todas las pantallas.
 *
 * Es el UNICO lugar donde se decide como se compone un listado: que lleva
 * tarjeta y que no, cuanto espacio hay entre bloques, donde van los botones.
 * Un cambio de diseno se hace aqui y lo toman todas las vistas.
 *
 * Lo que no sea de la cabecera se pasa tal cual a SysDataTable.
 */
export function ListPage<T>({
  icon,
  title,
  description,
  actions,
  stats,
  alert,
  banner,
  rowActions,
  note,
  idLabel = 'ID',
  columns,
  rowKey = 'id' as keyof T & string,
  children,
  className,
  ...table
}: ListPageProps<T>) {
  // Toda tabla muestra el identificador de cada fila como primera columna
  // (a menos que la vista ya la declare ella misma).
  const withId: DataTableColumn<T>[] = columns.some((c) => c.key === rowKey)
    ? columns
    : [
        {
          key: rowKey,
          label: idLabel,
          width: 80,
          filterable: false,
          identificador: true,
          value: (row) => String((row as Record<string, unknown>)[rowKey] ?? ''),
          render: (row) => (
            <span className="text-ink-soft tabular-nums">{String((row as Record<string, unknown>)[rowKey] ?? '')}</span>
          ),
        },
        ...columns,
      ]

  return (
    <div className={cn('space-y-5', className)}>
      <PageHeader icon={icon} title={title} description={description} actions={actions} />

      {alert}

      {/*
        Indicadores y tabla. En pantallas anchas (xl) los indicadores van en una
        columna al costado derecho; en las demas, sobre la tabla: en movil una
        fila que se desliza y desde sm una grilla (ver FilaStats). En el DOM van
        primero para que arriba sea su lugar natural; xl:order los manda a la derecha.
      */}
      <div className="space-y-5 xl:flex xl:items-start xl:gap-5 xl:space-y-0">
        {stats && (
          <FilaStats lateral className="xl:order-2">
            {stats}
          </FilaStats>
        )}

        <div className="min-w-0 flex-1 space-y-5 xl:order-1">
          {banner}

          {/* La tabla trae su propio borde: no se envuelve en tarjeta. */}
          <div>
            <SysDataTable {...table} columns={withId} rowKey={rowKey} actions={rowActions} />
            {note && <div className="mt-3 text-xs text-ink-soft">{note}</div>}
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}
