# Módulos y hoja de ruta

El sistema se organiza en 16 módulos de negocio más complementos. Cada módulo cubre una parte del negocio y se divide en submódulos.

## Módulos y submódulos

### 1. Configuración y maestros
Los datos base que usan todos los demás módulos.
- Empresas y sucursales
- Almacenes
- Productos: categorías, unidades, presentaciones (saco, caja, bolsa), nivel de riesgo y condiciones de almacenamiento (ver [ficha del producto](03-productos-y-ubicacion.md))
- Proveedores y clientes
- Transportistas, vehículos y choferes
- Usuarios, roles y permisos (por almacén y por zona)
- Motivos predefinidos (rechazo, ajuste, merma, devolución, préstamo)
- Series y numeración de documentos

### 2. Plano y ubicaciones
- Editor de planos de cada almacén
- Zonas, pasillos, racks, niveles y posiciones
- Tipos de ubicación (almacenaje, picking, recepción, despacho, cuarentena, merma, devoluciones, suministros)
- Capacidades y restricciones por ubicación
- Etiquetas con código de barras o QR
- Mapas de ocupación y de riesgo

### 3. Cumplimiento normativo
El módulo que diferencia al sistema.
- Entidades fiscalizadoras y normas aplicables
- Reglas por tipo de producto (incompatibilidades, límites, condiciones)
- Permisos, licencias y certificados con fechas de vencimiento
- Control de fumigación, limpieza y plagas
- Bloqueos preventivos y autorizaciones con justificación
- Listas de verificación de inspección interna
- Inspecciones recibidas, observaciones, multas y plazos de subsanación
- Vista de inspector con acceso limitado

### 4. Recepción
- Citas y asignación de muelles
- Órdenes de compra esperadas
- Revisión del vehículo
- Revisión de documentos (guía, factura, registros sanitarios)
- Inspección de calidad (cantidad, empaque, plagas, humedad, vencimiento, peso, muestreo)
- Decisión: aceptado, con observación, cuarentena o rechazado
- Diferencias y reclamos al proveedor
- Etiquetado de pallets y lotes

### 5. Acomodo y almacenamiento
- Sugerencia de ubicación según reglas
- Confirmación por escaneo de pallet y ubicación
- Reubicaciones y consolidación de pallets
- Gestión de cuarentena, merma y devoluciones
- Control de apilamiento y separación entre productos

### 6. Inventario
- Stock por ubicación, lote y vencimiento
- Estados del stock (disponible, reservado, cuarentena, prestado, de terceros, merma)
- Kardex y movimientos
- Control de vencimientos próximos y rotación (FEFO)
- Stock mínimo y alertas de reposición
- Inventarios periódicos y recuentos
- Reempaque y fraccionamiento (saco grande a bolsas)

### 7. Ajustes de stock
- Registro de ajustes con motivo y evidencia
- Autorización según monto o cantidad
- Tolerancia de merma por producto
- Destrucción de productos vencidos con acta
- Reportes y alertas de patrones por motivo, almacén y persona

### 8. Pedidos y despacho
- Pedidos y reserva de stock
- Preparación (picking) con lista y recorrido ordenado
- Zona de preparación por pedido, ruta o transportista
- Verificación y embalaje (packing)
- Revisión final de cumplimiento
- Guías de remisión y documentos de salida
- Carga del vehículo y salida

### 9. Transporte y entregas
- Programación de rutas y asignación de vehículos y choferes
- Control de licencias y permisos de transporte
- Confirmación de entrega
- Incidencias en la entrega

### 10. Traslados entre almacenes
- Solicitud y autorización del traslado
- Salida y mercadería en tránsito
- Recepción en el almacén destino y diferencias

### 11. Préstamos
- Préstamos que hace la empresa (a clientes, proveedores, otras tiendas, empleados)
- Préstamos que recibe la empresa (mercadería y bienes de terceros)
- Seguimiento de plazos y alertas de vencimiento
- Devolución con revisión de estado
- Cierre: devuelto, cobrado o dado de baja

### 12. Suministros y herramientas
- Consumibles: stock, vales de entrega, consumo por área, reposición
- Herramientas y equipos: registro individual, responsable, entrega y devolución
- Mantenimiento y calibración
- Bajas por daño o pérdida

### 13. Devoluciones y reclamos
- Devoluciones de clientes
- Devoluciones a proveedores
- Reclamos y su seguimiento
- Decisión sobre el producto devuelto: reingreso, cuarentena o merma

### 14. Personal y productividad
- Tareas asignadas por operario
- Productividad por persona, turno y área
- Errores y diferencias por persona
- Capacitaciones y autorizaciones por zona (quién puede entrar o manipular qué)

### 15. Trazabilidad, auditoría y evidencia
- Historial inalterable de movimientos
- Trazabilidad completa por lote (de dónde vino y a quién salió)
- Fotos, actas y documentos adjuntos
- Reportes listos para inspección

### 16. Reportes, tableros y alertas
- Tablero del gerente: riesgo y cumplimiento de toda la empresa
- Tablero del jefe de almacén: operación del día
- Reportes de inventario, vencimientos, mermas, préstamos y consumos
- Alertas y notificaciones (permisos por vencer, vencimientos, préstamos atrasados, stock mínimo, bloqueos)

### Complementos
No son módulos de negocio propios, pero el sistema los necesita:
- **App móvil para operarios:** escaneo, tareas, fotos, funcionamiento sin señal.
- **Conexiones con otros sistemas:** facturación electrónica, ERP, ecommerce y contabilidad.

### Módulos adicionales surgidos del trabajo diario
Descritos en [Trabajo diario, personal e indicadores](07-trabajo-diario-personal.md): tareas y coordinación, personal/seguridad/higiene, control de acceso y visitas, indicadores.

## Quién usa cada módulo

| Módulo | Gerente | Jefe de almacén | Operario | Legal o seguridad | Inspector |
|--------|---------|-----------------|----------|-------------------|-----------|
| Configuración y maestros | Consulta | Usa | — | Consulta | — |
| Plano y ubicaciones | Consulta | Administra | Consulta | Consulta | Consulta |
| Cumplimiento normativo | Consulta | Usa | Cumple reglas | Administra | Consulta |
| Recepción | Consulta | Supervisa | Ejecuta | Consulta | Consulta |
| Acomodo | — | Supervisa | Ejecuta | — | Consulta |
| Inventario | Consulta | Administra | Consulta | Consulta | Consulta |
| Ajustes de stock | Autoriza | Registra | — | Consulta | Consulta |
| Pedidos y despacho | Consulta | Supervisa | Ejecuta | Consulta | Consulta |
| Préstamos | Autoriza | Registra | Ejecuta | — | — |
| Suministros y herramientas | Consulta | Administra | Usa | — | — |
| Reportes y tableros | Usa | Usa | — | Usa | Consulta |

## Orden sugerido para construirlo

1. **Primera versión** (lo mínimo para operar y demostrar cumplimiento): configuración y maestros, plano y ubicaciones, recepción, acomodo, inventario, pedidos y despacho, cumplimiento normativo básico (permisos, vencimientos, bloqueos), trazabilidad.
2. **Segunda etapa:** ajustes de stock, préstamos, suministros y herramientas, devoluciones, traslados entre almacenes.
3. **Tercera etapa:** transporte y entregas, personal y productividad, tableros avanzados, conexiones con otros sistemas.
