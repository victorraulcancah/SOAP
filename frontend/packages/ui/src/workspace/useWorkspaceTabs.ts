import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import { initTabs, tabsReducer } from './tabsState'
import { loadTabs, saveTabs } from './tabsStorage'

export interface WorkspaceTabsOptions {
  /** Vista que indica la URL ahora mismo (el hook no sabe de rutas: se la dan). */
  routeKey: string
  /** Cambia la URL a la vista indicada (sin llenar el historial). */
  onNavigate: (key: string) => void
  /** Donde se recuerdan las pestañas abiertas; incluye al usuario para no mezclarlas. */
  storageKey: string
  /** Debe ser estable (definida fuera del componente). */
  isValid?: (key: string) => boolean
  max?: number
  /** Vista con la que empieza el espacio de trabajo. */
  home?: string
}

const anyKey = () => true

/**
 * Pestañas de un espacio de trabajo, sincronizadas con la URL en los dos sentidos:
 *  - la URL manda: llegar a una vista (menu, enlace, atras) la enfoca o la muestra
 *    en la pestaña activa;
 *  - la pestaña activa manda sobre la URL: abrir, cerrar o enfocar una pestaña
 *    actualiza la direccion.
 *
 * Se recuerdan entre recargas.
 */
export function useWorkspaceTabs({
  routeKey,
  onNavigate,
  storageKey,
  isValid = anyKey,
  max = 12,
  home = '',
}: WorkspaceTabsOptions) {
  const reducer = useMemo(() => tabsReducer(max), [max])
  const [state, dispatch] = useReducer(reducer, undefined, () =>
    initTabs({ saved: loadTabs(storageKey), routeKey, isValid, max, home }),
  )

  // Lo ultimo que dijo la URL, para que el efecto de abajo no dependa de ella.
  const route = useRef({ routeKey, onNavigate })
  useEffect(() => {
    route.current = { routeKey, onNavigate }
  })

  // URL -> pestañas
  useEffect(() => {
    if (isValid(routeKey)) dispatch({ type: 'go', key: routeKey })
  }, [routeKey, isValid])

  // Pestañas -> URL
  useEffect(() => {
    if (state.active !== route.current.routeKey) route.current.onNavigate(state.active)
  }, [state.active])

  useEffect(() => saveTabs(storageKey, state), [storageKey, state])

  const open = useCallback((key: string) => dispatch({ type: 'open', key }), [])
  const close = useCallback((key: string) => dispatch({ type: 'close', key }), [])
  const closeOthers = useCallback((key: string) => dispatch({ type: 'closeOthers', key }), [])
  const closeRight = useCallback((key: string) => dispatch({ type: 'closeRight', key }), [])

  return {
    keys: state.keys,
    active: state.active,
    max,
    canOpen: state.keys.length < max,
    open,
    close,
    closeOthers,
    closeRight,
  }
}
