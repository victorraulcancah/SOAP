/**
 * Estado de las pestañas: funciones puras, sin React ni router.
 *
 * Una pestaña se identifica por la "clave" de la vista que muestra (en el panel
 * es el id del menu, "config.usuarios"; "" es el inicio). Una vista vive en una
 * sola pestaña a la vez: abrirla de nuevo enfoca la que ya existe.
 */
export interface TabsState {
  keys: string[]
  active: string
}

export type TabsAction =
  /** Navegar: enfoca la pestaña que ya muestra la vista o, si no hay, cambia la vista de la activa. */
  | { type: 'go'; key: string }
  /** Abrir en una pestaña nueva (o enfocar la existente). */
  | { type: 'open'; key: string }
  | { type: 'close'; key: string }
  | { type: 'closeOthers'; key: string }
  | { type: 'closeRight'; key: string }

export function tabsReducer(max: number) {
  return (state: TabsState, action: TabsAction): TabsState => {
    const { keys, active } = state

    switch (action.type) {
      case 'go': {
        if (action.key === active) return state
        if (keys.includes(action.key)) return { keys, active: action.key }
        return { keys: keys.map((k) => (k === active ? action.key : k)), active: action.key }
      }

      case 'open': {
        if (keys.includes(action.key)) return action.key === active ? state : { keys, active: action.key }
        if (keys.length >= max) return state
        return { keys: [...keys, action.key], active: action.key }
      }

      case 'close': {
        const at = keys.indexOf(action.key)
        // Siempre queda al menos una pestaña abierta.
        if (at === -1 || keys.length <= 1) return state
        const rest = keys.filter((k) => k !== action.key)
        if (action.key !== active) return { keys: rest, active }
        // Al cerrar la activa pasa a la vecina de la derecha o, si era la ultima, a la de la izquierda.
        return { keys: rest, active: rest[at] ?? rest[at - 1] }
      }

      case 'closeOthers':
        return keys.includes(action.key) ? { keys: [action.key], active: action.key } : state

      case 'closeRight': {
        const at = keys.indexOf(action.key)
        if (at === -1 || at === keys.length - 1) return state
        const rest = keys.slice(0, at + 1)
        return { keys: rest, active: rest.includes(active) ? active : action.key }
      }
    }
  }
}

interface InitOptions {
  /** Lo ultimo guardado (puede ser de otra version del menu: se filtra). */
  saved: TabsState | null
  /** Vista que pide la URL en este momento. */
  routeKey: string
  isValid: (key: string) => boolean
  max: number
  /** Pestaña con la que empieza si no hay nada guardado ni la URL es valida. */
  home: string
}

/** Pestañas con las que arranca: las guardadas, mas la que pida la URL (que queda activa). */
export function initTabs({ saved, routeKey, isValid, max, home }: InitOptions): TabsState {
  const keys = [...new Set((saved?.keys ?? []).filter(isValid))].slice(0, max)
  let active = saved && keys.includes(saved.active) ? saved.active : keys[0]

  if (isValid(routeKey)) {
    if (!keys.includes(routeKey)) {
      if (keys.length < max) keys.push(routeKey)
      else keys[keys.indexOf(active)] = routeKey
    }
    active = routeKey
  }

  if (keys.length === 0) return { keys: [home], active: home }
  return { keys, active: active ?? keys[0] }
}

/** Ids del DOM que enlazan cada pestaña con su panel (aria-controls / aria-labelledby). */
const domKey = (key: string) => (key ? key.replace(/[^\w-]/g, '-') : 'home')
export const tabDomId = (key: string) => `workspace-tab-${domKey(key)}`
export const panelDomId = (key: string) => `workspace-panel-${domKey(key)}`
