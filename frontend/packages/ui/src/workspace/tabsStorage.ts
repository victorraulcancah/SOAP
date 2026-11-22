import type { TabsState } from './tabsState'

/** Pestañas guardadas en este navegador. Si no se puede leer, se empieza de cero. */
export function loadTabs(storageKey: string): TabsState | null {
  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return null

    const { keys, active } = parsed as Partial<TabsState>
    if (!Array.isArray(keys) || typeof active !== 'string') return null
    return { keys: keys.filter((k): k is string => typeof k === 'string'), active }
  } catch {
    return null
  }
}

export function saveTabs(storageKey: string, state: TabsState): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state))
  } catch {
    // Modo privado o almacenamiento lleno: las pestañas siguen funcionando, solo no se recuerdan.
  }
}
