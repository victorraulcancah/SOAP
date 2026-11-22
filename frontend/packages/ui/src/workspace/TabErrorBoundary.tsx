import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { TriangleAlert } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  failed: boolean
}

/**
 * Aisla las pestañas entre si: si la vista de una falla, las demas siguen
 * funcionando y se puede cerrar o reintentar solo esa.
 */
export class TabErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Fallo la vista de una pestaña', error, info.componentStack)
  }

  render() {
    if (!this.state.failed) return this.props.children

    return (
      <div className="flex flex-col items-center gap-3 rounded-[var(--radius-panel)] border border-dashed border-line-strong bg-surface p-12 text-center">
        <TriangleAlert size={28} className="text-ink-soft" aria-hidden />
        <p className="font-semibold text-ink">Esta pestaña tuvo un problema</p>
        <p className="max-w-sm text-sm text-ink-muted">
          Las demás pestañas siguen funcionando. Puedes reintentar o cerrar esta.
        </p>
        <button
          type="button"
          onClick={() => this.setState({ failed: false })}
          className="cursor-pointer rounded-lg border border-line-strong bg-white px-4 py-1.5 text-sm font-medium text-ink hover:bg-surface-alt"
        >
          Reintentar
        </button>
      </div>
    )
  }
}
