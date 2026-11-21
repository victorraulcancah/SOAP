# Productos y ubicación

## Ficha del producto

Cada producto tiene una ficha con todos los datos que el sistema necesita para saber cómo guardarlo, cuánto espacio ocupa y dónde conviene ubicarlo. Amplía el submódulo de productos de [Configuración y maestros](08-modulos-y-roadmap.md).

### Identificación
- Código interno, nombre, marca y categoría (arroz, menestras, azúcar, aceites, conservas, etc.).
- Código de barras de cada presentación.
- Proveedor habitual.

### Presentaciones y equivalencias

Un mismo producto se maneja en varias presentaciones, y el sistema sabe cuánto equivale cada una.

| Presentación | Equivalencia (ejemplo) |
|--------------|------------------------|
| Saco de 50 kg | 1 saco |
| Bolsa de 5 kg | 10 bolsas = 1 saco |
| Caja | 6 bolsas de 5 kg |
| Pallet | 40 sacos |

Así, si se recibe un saco y se vende por bolsas, el sistema puede convertir y llevar el stock de ambas formas.

### Tamaño y peso

Por cada presentación se registra:
- Largo, ancho y alto.
- Peso neto (solo el producto) y peso bruto (con empaque).
- Volumen, que el sistema calcula.
- Si es frágil o si se puede apilar, y cuántas unidades pueden ir una sobre otra.

Con estos datos el sistema sabe cuánto espacio ocupa cada producto y cuánto pesa lo que se coloca en cada ubicación.

### Armado del pallet
- Unidades por capa y capas por pallet.
- Unidades, peso y altura total de un pallet completo.
- Cuántos pallets se pueden apilar uno sobre otro.
- Tipo de pallet que se usa.

### Condiciones de almacenamiento
- Zona permitida (seca, ventilada, refrigerada, aislada) y nivel de riesgo.
- Temperatura y humedad adecuadas.
- Productos con los que no puede almacenarse (detergentes, químicos).
- Si controla lote y fecha de vencimiento.
- Vida útil total y vida útil mínima aceptada al recibirlo.

### Rotación y reposición
- Clasificación por rotación: alta, media o baja.
- Promedio de ventas por periodo.
- Stock mínimo y máximo.
- Estacionalidad (productos que se venden más en ciertas fechas).

### Datos normativos
- Registro o autorización sanitaria.
- Permisos o entidades que aplican según el producto.
- Reglas especiales de manipulación o transporte.

### Ejemplo de ficha: arroz extra de 50 kg

| Dato | Valor de ejemplo |
|------|------------------|
| Presentaciones | Saco de 50 kg, bolsa de 5 kg |
| Medidas del saco | 80 × 50 × 15 cm |
| Peso neto / bruto | 50 kg / 50,2 kg |
| Pallet | 10 sacos por capa, 4 capas, 40 sacos por pallet |
| Peso del pallet completo | Cerca de 2 000 kg |
| Apilamiento | Máximo 2 pallets, uno sobre otro |
| Condición | Seco, ventilado, lejos de químicos y paredes |
| Rotación | Alta |
| Vencimiento | Controla lote y fecha; mínimo aceptado de 6 meses |

> Las cifras son solo un ejemplo; las medidas reales se cargan con cada producto.

## Cómo se decide dónde va cada producto

Cuando llega mercadería, el sistema no elige una ubicación al azar: revisa una serie de criterios **en orden**.

| Orden | Criterio | Qué revisa |
|-------|----------|-----------|
| 1 | Cumplimiento | Que la zona esté permitida para ese producto y que no haya incompatibilidades cerca |
| 2 | Capacidad | Que la ubicación aguante el peso, tenga el volumen y la altura necesarios |
| 3 | Peso | Lo pesado va abajo y lo liviano arriba |
| 4 | Rotación | Lo que más se vende va cerca de la zona de preparación y despacho, y a la altura de la mano |
| 5 | Lote y vencimiento | No se mezclan lotes en una misma ubicación y lo que vence antes queda más accesible |
| 6 | Aprovechamiento | Se completan primero las ubicaciones ya empezadas del mismo producto |
| 7 | Evitar confusiones | Productos parecidos (por ejemplo, variedades de frejol) no van uno junto a otro |

### Tipos de lugar de almacenaje

| Tipo | Se usa para | Ejemplo |
|------|-------------|---------|
| Almacenaje en piso con pallets | Mucho volumen y alta rotación | Pallets de arroz en sacos |
| Estantes o racks | Productos de rotación media o baja, o con varios niveles de altura | Menestras, azúcar y harinas |
| Zona de preparación de pedidos | Lo que se recoge a diario, en cantidades pequeñas | Bolsas y cajas pequeñas a nivel bajo |
| Reserva | Pallets completos que reponen la zona de preparación | Pallets en altura sobre la zona de preparación |
| Cuarentena, merma, devoluciones | Producto retenido o dudoso | Zona separada y marcada |

### Ubicación fija o libre

- **Fija:** cada producto tiene su lugar asignado. Es fácil de aprender, pero puede desperdiciar espacio.
- **Libre:** el sistema asigna donde haya espacio. Aprovecha mejor el almacén, pero depende de que todo se escanee bien.
- **Mixta (la más común):** la zona de preparación de pedidos tiene lugares fijos por producto y la reserva se asigna libremente.

### Ejemplos de decisión

| Llega | Dónde iría | Por qué |
|-------|-----------|---------|
| 20 pallets de arroz de 50 kg | Zona de piso cerca del despacho, con reserva en altura | Mucho volumen, alta rotación y peso elevado |
| Menestras en bolsas de 1 kg | Estantes, con una parte en la zona de preparación | Rotación media y se despachan en cajas |
| Aceite en botellas | Zona aparte, lejos de granos | Riesgo de derrame y contaminación |
| Producto con vencimiento en 2 meses | Al frente y marcado para venta prioritaria | Debe salir primero |
| Pallet con sacos dañados | Zona de cuarentena o merma | Se retiene hasta decidir |

### Reorganización periódica

- Si un producto cambia de rotación, el sistema sugiere moverlo a una zona más cercana o más lejana.
- En temporadas de alta venta, se pueden acercar los productos de la temporada a la zona de despacho.
- El sistema muestra el nivel de ocupación de cada zona y avisa cuando una está casi llena.
- Todo cambio de ubicación queda registrado como movimiento.
