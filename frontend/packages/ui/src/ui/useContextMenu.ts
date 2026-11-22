import { useCallback, useState } from 'react'
import type { MouseEvent } from 'react'

type Open<T> = { x: number; y: number; payload: T }

/**
 * Estado de un ContextMenu: donde esta abierto y sobre que elemento.
 *
 *   const menu = useContextMenu<string>()
 *   <button onContextMenu={(e) => menu.open(e, id)} />
 *   {menu.state && <ContextMenu x={menu.state.x} y={menu.state.y} items={...} onClose={menu.close} />}
 */
export function useContextMenu<T = undefined>() {
  const [state, setState] = useState<Open<T> | null>(null)

  const open = useCallback((e: MouseEvent, payload: T) => {
    e.preventDefault()
    setState({ x: e.clientX, y: e.clientY, payload })
  }, [])

  const close = useCallback(() => setState(null), [])

  return { state, open, close }
}
