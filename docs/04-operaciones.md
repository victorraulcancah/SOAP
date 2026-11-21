# Operaciones: recepción, acomodo y despacho

Caso de ejemplo: empresa de abarrotes, menestras y arroz.

## 1. Recepción de mercadería

### Antes de que llegue el camión
- Se registra la orden de compra o el aviso del proveedor: productos, cantidades y fecha.
- Se asigna un muelle y una hora de descarga.
- Lo que llegue fuera de lo esperado se marca como diferencia.

### Llegada y revisión del vehículo
- Se registran placa, chofer y hora de llegada.
- Se revisa que el camión esté limpio, sin olores, humedad, plagas ni goteras, y sin mezcla con productos que contaminen (químicos, combustibles).
- Si no cumple, se puede rechazar antes de descargar, con foto como evidencia.

### Revisión de documentos
- Guía de remisión y factura del proveedor.
- Registro o autorización sanitaria del proveedor, según corresponda.
- Lote y fecha de vencimiento de cada producto.
- El sistema compara los documentos con la orden de compra.

### Inspección de la mercadería
- **Cantidad:** contar sacos, cajas o bolsas y comparar con la guía.
- **Empaque:** sacos rotos, rasgados, húmedos o manchados.
- **Calidad visual:** gorgojos, polillas, hongos, mal olor o humedad (crítico en arroz y menestras).
- **Vencimiento:** vida útil mínima aceptable, definida por la empresa.
- **Muestreo:** en lotes grandes, se abren algunos sacos al azar.
- **Peso:** verificación por saco o por lote.

### Decisión por cada producto

| Resultado | Qué pasa |
|-----------|----------|
| Aceptado | Entra al stock disponible |
| Aceptado con observación | Entra, y queda anotado el reclamo al proveedor |
| Cuarentena | Se separa en una zona aparte hasta que calidad decida |
| Rechazado | No entra; se registra el motivo con fotos y se devuelve |

### Identificación
Cada pallet recibe una etiqueta con producto, lote, vencimiento, cantidad y fecha de ingreso, y desde ese momento se puede seguir en todo el almacén.

## 2. Acomodo de la mercadería

### Qué decide dónde se guarda
- **Tipo de producto:** arroz, menestras, azúcar, harinas, aceites, conservas, cada uno en su zona.
- **Peso y volumen:** lo pesado abajo, lo liviano arriba.
- **Rotación:** lo que más se vende queda cerca de la zona de despacho.
- **Vencimiento:** lo que vence primero queda accesible para salir primero (FEFO).
- **Lote:** no se mezclan lotes distintos en una misma ubicación.

El detalle de criterios y su orden está en [Productos y ubicación](03-productos-y-ubicacion.md).

### Reglas de higiene y cumplimiento
- Nada directo sobre el piso: siempre sobre pallets o parihuelas.
- Separación de paredes y techo, para ventilar y poder fumigar.
- Alimentos lejos de detergentes, químicos y productos de limpieza.
- Zona seca y ventilada, sin humedad.
- Registro vigente de fumigación y control de plagas.
- Límite de apilamiento por tipo de saco.

### Paso a paso
1. El sistema sugiere una ubicación según las reglas.
2. El operario lleva el pallet y escanea la etiqueta del pallet y la de la ubicación.
3. Si la ubicación es incorrecta, el sistema avisa y no deja confirmar.
4. Al confirmar, el stock queda disponible para vender, con su ubicación exacta.
5. Queda el historial: quién recibió, quién acomodó, cuándo y dónde.

### Casos especiales
- **Mercadería dañada:** va a una zona de merma o devoluciones.
- **Vencimiento corto:** se ubica al frente y se marca para venta prioritaria.
- **Pallet incompleto:** se completa con el mismo lote o queda identificado como saldo.
- **Falta de espacio:** el sistema propone la mejor alternativa y, si no es ideal, pide autorización.

## 3. Despacho

1. El pedido entra y reserva el stock.
2. El sistema decide de dónde sacar cada producto según vencimiento, lote y reglas de cumplimiento; nunca sugiere lotes vencidos, retenidos o sin documentación.
3. Se genera la lista de preparación con ubicación exacta y recorrido ordenado.
4. El operario escanea ubicación y producto para evitar errores.
5. Los productos van a la zona de preparación, asignada por pedido, ruta o transportista.
6. Se verifica, embala y etiqueta el pedido.
7. Revisión final (documentos, transportista, cantidades), guía de remisión y salida del stock.

El flujo completo con responsables y controles está en [Roles, flujos y puntos de control](05-roles-y-flujos.md).

## 4. Evidencia que queda para una inspección

- Fecha y hora de cada ingreso, con sus documentos.
- Fotos de rechazos y observaciones.
- Lotes y vencimientos de todo lo almacenado.
- Ubicación actual de cada producto.
- De qué ubicación y lote salió cada despacho, quién lo preparó y cuándo.
- Registros de limpieza, fumigación y control de plagas.

## 5. Coordinación en el área de recepción

Es el momento en que llega la mercadería y varias personas deben trabajar juntas sin estorbarse.

### Quién forma el equipo de recepción

Para cada camión se arma una cuadrilla con roles claros. Su tamaño depende de la carga: más sacos, más ayudantes.

| Rol | Qué hace |
|-----|----------|
| Líder de recepción (recepcionista) | Dirige la descarga, revisa documentos, cuenta y decide con calidad |
| Ayudantes de descarga | Bajan los sacos y cajas y los ordenan en pallets |
| Controlador de calidad | Inspecciona la mercadería cuando el líder lo llama |
| Operario de acomodo | Traslada los pallets ya identificados a su ubicación |
| Supervisor de turno | Asigna muelle y equipo, y resuelve problemas |

### Paso a paso de la llegada de un camión

| Momento | Quién | Qué ocurre | Cómo se coordina |
|---------|-------|-----------|------------------|
| Víspera | Compras y supervisor | Se revisan las citas del día y se prepara el equipo | El sistema muestra los camiones esperados, con productos y cantidades |
| Llegada | Vigilante o recepcionista | Registra placa, chofer y hora | El camión queda «en espera de muelle» y el supervisor recibe aviso |
| Asignación | Supervisor | Asigna un muelle libre y la cuadrilla | Aparece en el tablero de muelles y en el celular de cada integrante |
| Revisión | Recepcionista | Revisa el vehículo y los documentos antes de descargar | Si no cumple, se rechaza con foto |
| Descarga | Ayudantes | Bajan la mercadería y arman pallets | El recepcionista cuenta; el sistema muestra lo esperado frente a lo recibido |
| Calidad | Controlador | Inspecciona por lote y toma muestras | El recepcionista lo llama desde su celular y el producto espera identificado |
| Etiquetado | Recepcionista | Pega la etiqueta a cada pallet | Se crea una tarea de acomodo automáticamente |
| Acomodo | Operario de acomodo | Toma la tarea y lleva el pallet | Elige primero lo urgente (vencimiento corto, pedido pendiente) |
| Cierre | Recepcionista | Cierra la recepción y firma | Se avisa a compras; las diferencias quedan como reclamo |

### Cómo se comunican

- **Tablero de muelles:** una pantalla en el área que muestra qué camión está en cada muelle, cuánto lleva descargado y cuánto falta.
- **Tareas en el celular:** cada persona ve lo que le toca y marca cuando termina.
- **Alertas automáticas:** camión esperando demasiado tiempo, pallets sin acomodar, diferencias de cantidad, documentos incompletos.
- **Llamadas o mensajes al supervisor** para casos especiales, que quedan anotados en el sistema.

### Situaciones frecuentes

| Situación | Qué se hace |
|-----------|------------|
| Llegan dos camiones a la vez | El supervisor prioriza por cita, perecibilidad o urgencia, y el otro espera con aviso |
| Camión sin cita | Se registra, se asigna muelle cuando haya espacio y se avisa a compras |
| Camión llega tarde | Se reasigna el muelle y se anota el retraso del proveedor |
| Mercadería sin orden de compra | Queda retenida hasta que compras la autorice |
| Diferencia entre lo recibido y la guía | Se anota en el momento, con fotos, y se avisa al proveedor |
| Falta de personal | El supervisor reasigna personas de otras áreas y el sistema ajusta las tareas |
| Pallets acumulados sin acomodar | Alerta al supervisor para reforzar el equipo de acomodo |
