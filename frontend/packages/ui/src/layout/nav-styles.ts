/**
 * Fila activa del menu: fondo suave del tema, texto en --t-600 y una barra
 * vertical de 4px pegada al borde izquierdo con el degradado del tema.
 */
export const ACTIVE_ROW = [
  'relative bg-[color-mix(in_oklab,var(--grad-start)_9%,white)] text-(--t-600)',
  'before:absolute before:top-1/2 before:-left-2 before:h-6 before:w-1 before:-translate-y-1/2',
  "before:rounded-r-full before:bg-[linear-gradient(180deg,var(--grad-start),var(--grad-end))] before:content-['']",
].join(' ')
