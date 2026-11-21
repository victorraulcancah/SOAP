# Roles, flujos y puntos de control

## Puestos y responsabilidades

| Puesto | Qué hace | Qué verifica | Qué puede autorizar |
|--------|----------|--------------|---------------------|
| Jefe de almacén | Dirige la operación y atiende inspecciones | Que todo se cumpla | Ajustes, préstamos, excepciones |
| Supervisor de turno | Asigna tareas y resuelve problemas del día | Avance de pedidos y recepciones | Cambios de ubicación y prioridades |
| Recepcionista | Recibe camiones y documentos | Vehículo, documentos, cantidades | Aceptar, observar o rechazar |
| Controlador de calidad | Inspecciona producto | Plagas, humedad, empaque, vencimiento | Cuarentena y liberación |
| Operario de acomodo | Guarda la mercadería en su ubicación | Que la ubicación sea la correcta | — |
| Preparador de pedidos | Recoge los productos del pedido | Producto, lote y cantidad al escanear | — |
| Verificador | Revisa y embala el pedido ya preparado | Que el pedido esté completo y correcto | Devolver el pedido a preparación |
| Despachador | Entrega el pedido al transporte | Documentos, vehículo y cantidades | Autorizar la salida |
| Encargado de inventarios | Hace los conteos | Diferencias entre físico y sistema | Pedir ajustes |
| Encargado de suministros y herramientas | Entrega y recibe herramientas y consumibles | Estado y devolución | Bajas menores |
| Administrativo | Emite facturas y guías | Datos del documento | — |
| Responsable de cumplimiento | Mantiene permisos y normas | Vigencias y reglas | Excepciones normativas |
| Chofer | Transporta | Carga recibida y entrega | — |
| Vendedor o encargado de tienda | Pide la mercadería | Que lo pedido corresponda a lo recibido | Pedidos dentro de su límite |

> **Regla clave:** quien prepara no verifica, y quien recibe no ajusta el stock. Siempre hay una segunda persona que revisa, para evitar errores y fraudes.

## Flujo A: pedido de venta a un cliente

| Paso | Quién | Qué hace | Control |
|------|-------|----------|---------|
| 1 | Vendedor | Registra el pedido: cliente, productos, cantidades y fecha de entrega | El sistema muestra si hay stock disponible |
| 2 | Sistema | Reserva el stock y elige los lotes que deben salir primero (los que vencen antes) | No elige lotes vencidos, retenidos o sin documentación |
| 3 | Administración o jefe | Aprueba el pedido si requiere aprobación (monto, crédito, excepciones) | Registro de quién aprobó |
| 4 | Supervisor de turno | Asigna el pedido a un preparador y a una zona de espera | Prioriza según la hora de salida del vehículo |
| 5 | Preparador | Recoge los productos con la lista, siguiendo el recorrido ordenado | Escanea ubicación y producto; el sistema avisa si se equivoca |
| 6 | Preparador | Lleva todo a la zona de espera del pedido | Queda registrado que el pedido está preparado |
| 7 | Verificador | Revisa que el pedido esté completo: cuenta, compara lote y vencimiento, mira el estado de los productos | Es otra persona distinta al preparador |
| 8 | Verificador | Embala y etiqueta | Etiqueta con cliente, ruta y número de pedido |
| 9 | Administrativo | Emite la factura y la guía de remisión | Los datos coinciden con lo verificado |
| 10 | Despachador y chofer | Revisan el vehículo (limpio, sin olores, sin mezcla con químicos) y cargan | Firma del chofer y foto de la carga |
| 11 | Sistema | Descuenta el stock | El stock deja de figurar como disponible |
| 12 | Chofer | Entrega al cliente y obtiene su conformidad | Firma o foto como evidencia |
| 13 | Supervisor | Cierra el pedido; registra faltantes, rechazos o devoluciones | Todo queda en el historial |

## Flujo B: reposición para un punto de venta (tienda)

Situación en que una tienda necesita mercadería del almacén central. La tienda se trata como un lugar de stock propio: el almacén le envía mercadería y las ventas de la tienda la van consumiendo.

| Paso | Quién | Qué hace | Control |
|------|-------|----------|---------|
| 1 | Encargado de tienda | Detecta que falta mercadería, o el sistema le avisa cuando el stock de la tienda baja del mínimo | El sistema puede sugerir cantidades según lo que se vende |
| 2 | Encargado de tienda | Registra la solicitud de reposición con productos y cantidades | Queda registrada con fecha y solicitante |
| 3 | Jefe de operaciones o supervisor | Aprueba la solicitud o la ajusta | Registro de quién aprobó y qué cambió |
| 4 | Almacén | Verifica que haya stock y lo reserva | Si falta algo, se avisa a la tienda y a compras |
| 5 | Preparador | Recoge los productos | Igual que en el pedido de venta |
| 6 | Verificador | Revisa, embala y etiqueta los bultos con el nombre de la tienda | Segunda persona que revisa |
| 7 | Administrativo | Emite la guía de traslado | Coincide con lo verificado |
| 8 | Despachador y chofer | Cargan el vehículo y salen | La mercadería queda «en tránsito» |
| 9 | Encargado de tienda | Recibe, cuenta y compara con la guía; anota diferencias en el momento | Firma de conformidad o de observación |
| 10 | Sistema | Suma el stock a la tienda y lo saca del tránsito | Las ventas de la tienda empiezan a descontarlo |
| 11 | Jefe de operaciones | Investiga las diferencias, si las hubo | Se resuelve con un ajuste o un reclamo al transporte |

Cuando la tienda vende en caja, el sistema de venta descuenta el stock de la tienda. Así el almacén sabe qué tiene cada tienda y cuándo conviene reponer.

## Flujo C: pedido interno de suministros o herramientas

Cuando un área necesita cinta, papel, etiquetas o una herramienta:

1. **Solicitante** (cualquier área) registra el pedido o pide el artículo en el momento.
2. **Jefe del área** lo aprueba si supera un límite de cantidad o valor.
3. **Encargado de suministros** entrega con un vale a nombre de quien recibe.
4. En una **herramienta**, queda a nombre del responsable con fecha de devolución; en un **consumible**, se descuenta del stock y se carga al área.
5. El sistema muestra el consumo por área y avisa cuando hay que reponer.

Detalle en [Stock, préstamos y ajustes](06-stock-prestamos-ajustes.md).

## Puntos de control: quién verifica qué

| Momento | Quién verifica | Qué revisa | Si no cumple |
|---------|----------------|-----------|--------------|
| Llegada del camión | Recepcionista | Vehículo, documentos, cantidades | Rechazo con foto |
| Ingreso a almacén | Controlador de calidad | Plagas, humedad, empaque, vencimiento | Cuarentena o rechazo |
| Acomodo | Operario y sistema | Ubicación correcta y compatible | El sistema no deja confirmar |
| Preparación de pedido | Preparador y sistema | Producto, lote y cantidad | El sistema avisa el error |
| Verificación del pedido | Verificador | Pedido completo y correcto | Se devuelve a preparación |
| Antes de salir | Despachador | Documentos y vehículo | No se autoriza la salida |
| Entrega | Cliente o encargado de tienda | Que lo recibido coincida con la guía | Se anota la diferencia |
| Ajustes y préstamos | Jefe o gerente | Motivo y evidencia | No se aprueba |

## Estados de un pedido

Para que todos sepan en qué punto va cada pedido:

**Registrado → Aprobado → Reservado → En preparación → Preparado → Verificado → Embalado → Cargado → En tránsito → Entregado → Cerrado**

También existen los estados **Con faltante**, **En espera** y **Cancelado**.
