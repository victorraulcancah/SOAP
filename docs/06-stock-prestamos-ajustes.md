# Stock: artículos, préstamos, ajustes y estados

## Tipos de artículos

El almacén maneja tres tipos de artículos, y cada uno se controla distinto:

| Tipo | Ejemplos | Qué se controla |
|------|----------|-----------------|
| Mercadería para vender | Arroz, menestras, azúcar, aceite | Stock, lote, vencimiento, ubicación, cumplimiento |
| Consumibles (se gastan) | Cintas, papel, etiquetas, bolsas, film, cajas, guantes | Cantidad disponible, consumo por área, reposición |
| Herramientas y equipos (se usan y se devuelven) | Carretillas, escaleras, balanzas, pistolas lectoras, cuchillos, parihuelas | Quién la tiene, estado, mantenimiento, pérdida o daño |

### Consumibles

- Se guardan en una zona de suministros aparte de la mercadería, y nunca se despachan a clientes.
- Tienen stock mínimo y el sistema avisa cuándo reponer.
- Cada salida se registra con un **vale de entrega**: qué se llevó, cuánto, quién lo recibió y para qué área u operación.
- Se mide el consumo por área y por periodo para detectar excesos (por ejemplo, un área que gasta el doble de cinta que las demás).
- Su costo se trata como gasto de operación, no como costo de la mercadería vendida.
- Se puede definir un consumo esperado por tarea (por ejemplo, cantidad de cinta por cada cierto número de cajas despachadas) para comparar con lo realmente usado.

### Herramientas y equipos

- Cada herramienta se identifica individualmente (código o serie), porque no se cuenta por cantidad sino una por una.
- Siempre tiene un responsable: persona o área que la tiene a su cargo.
- Se registra la entrega y la devolución, con el estado en que salió y en que volvió.
- Tiene un historial de mantenimiento y, en equipos como las balanzas, de calibración, que también puede pedir una inspección.
- Si se daña, se pierde o se desecha, se registra la baja con el motivo y, si corresponde, quién es responsable.
- El sistema avisa cuando una herramienta lleva demasiado tiempo fuera o cuando le toca mantenimiento.

## Préstamos

Existen dos sentidos, y el sistema debe manejar ambos.

### Lo que la empresa presta

A un cliente, proveedor, otra tienda o un empleado. Puede ser mercadería (muestras, consignación, apoyo a otro negocio) o bienes (parihuelas, balanzas, herramientas).

1. **Solicitud** de quién pide y para qué.
2. **Autorización** de la persona responsable.
3. **Salida con documento**, que indica qué sale, cuánto, a quién y hasta cuándo debe volver (según el caso, con guía de remisión).
4. El producto sale del stock disponible, pero sigue siendo de la empresa: queda en un estado «prestado» y no se pierde de vista.
5. **Seguimiento y alertas** cuando se acerca o vence el plazo de devolución.
6. **Devolución** con revisión de cantidad y estado, y vuelve al stock (o a cuarentena o merma si llegó dañado).
7. **Cierre.** Si no se devuelve, se decide si se cobra como venta, se registra como pérdida o se reclama.

### Lo que la empresa pide prestado

Mercadería, parihuelas, equipos o herramientas de un proveedor, cliente u otra empresa.

- Al ingresar queda como «de terceros»: se guarda y se controla, pero no cuenta como stock propio ni se vende, salvo acuerdo.
- Se registra de quién es, qué se recibió, en qué estado y cuándo hay que devolverlo.
- Si es mercadería de alimentos, se siguen controlando lote, vencimiento y condiciones de almacenamiento.
- Alertas antes del plazo de devolución y registro del estado en que se devuelve, para evitar reclamos.

### Qué evita esto

- Que mercadería o herramientas «desaparezcan» sin explicación.
- Que stock prestado se cuente como si estuviera en el almacén, o stock ajeno se cuente como propio.
- Reclamos por cosas que nadie sabe cuándo ni en qué estado se devolvieron.

## Ajustes de stock

Un ajuste es cualquier cambio de cantidad que no viene de una compra, una venta o un traslado normal. Es la parte más delicada, porque es donde se esconden pérdidas, errores y fraudes.

### Motivos más comunes

- Merma o daño: sacos rotos, empaque mojado, producto aplastado.
- Vencimiento: producto que pasó su fecha límite.
- Plagas o contaminación: gorgojos, hongos, humedad.
- Diferencia de conteo: lo que hay físicamente no coincide con el sistema.
- Error de registro: se anotó mal una cantidad o un producto.
- Pérdida o robo.
- Reempaque o fraccionamiento: un saco grande que se convierte en bolsas pequeñas.
- Pérdida natural de peso en granos por humedad.
- Muestras, regalos o consumo interno.
- Devolución a proveedor.

### Reglas del ajuste

- El stock **nunca se corrige a mano sin dejar rastro**: cada ajuste es un movimiento con motivo, cantidad, producto, lote, ubicación, fecha y responsable.
- Obligatorio indicar el motivo y, en casos importantes, adjuntar fotos o documentos.
- Según el tamaño del ajuste (cantidad o valor), requiere la autorización de un jefe o gerente.
- Existe una **tolerancia de merma** definida por producto; lo que pase de ese límite se marca para revisión.
- El producto vencido o contaminado se retira y se registra su destrucción o disposición con **acta**, que sirve de evidencia en una inspección.
- Los ajustes salen en reportes por motivo, almacén, producto y persona, con alertas cuando se repite un patrón (por ejemplo, el mismo operario con muchas diferencias).

### Inventario periódico

- Conteos por zona o ubicación en fechas programadas, enfocados primero en los productos de mayor valor o riesgo.
- Las diferencias no se ajustan de inmediato: se recuenta, se investiga y recién después se autoriza el ajuste.

## Estados del stock

Cada unidad de producto está siempre en un estado claro:

| Estado | Significado |
|--------|-------------|
| Disponible | Se puede vender o despachar |
| Reservado | Comprometido para un pedido |
| Cuarentena | Retenido hasta que calidad decida |
| Prestado | Es nuestro, pero está en manos de otro hasta que lo devuelva |
| De terceros | Está en nuestro almacén, pero es de otro y no es stock propio |
| Merma o baja | Dañado, vencido o destruido; sale del stock |
| Consumo interno | Se usó en la operación (consumibles) |
