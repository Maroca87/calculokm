# Kilometraje y Cobro - PWA Mobile First

> **PWA sencilla, rápida y enfocada en una sola necesidad: calcular recorridos y determinar cuánto corresponde cobrar por kilometraje con tarifas oficiales de Costa Rica (CGR).**

---

## 🎯 Flujo Principal Inmediato

La aplicación está diseñada **Mobile First**, con ajuste completo a pantalla de celulares, respeto de notch / safe-areas de iOS y Android, sin módulos innecesarios.

```text
Origen → Destino 1 → Destino 2 → ... (Finaliza en el último destino ingresado)
```

### Funciones Principales:
* **Ubicación actual como origen**: Botón `📍 Mi ubicación` mediante GPS del celular.
* **Búsqueda de lugares**: Autocompletado rápido con catálogo offline de Costa Rica y geocodificación en línea (OpenStreetMap).
* **Múltiples destinos**: Agregar (`➕`), eliminar (`✕`) y reordenar (`▲`/`▼`) destinos al instante.
* **Cálculo de distancias por carretera (Automóvil / DRIVE)**:
  - Motor de routing real por red vial y carreteras (Google Maps Platform Routes API / Compute Routes con fallback de conducción OSRM Car).
  - Cálculo estricto tramo a tramo: `Origen → Destino 1`, `Destino 1 → Destino 2`, etc.
  - Suma exacta con 1 decimal: `KM TOTAL = Tramo 1 + Tramo 2 + ...`
  - Posibilidad de escribir o ajustar manualmente los kilómetros de cualquier tramo en cualquier momento.
* **Historial de recorridos**:
  - Guardado rápido en almacenamiento local.
  - Muestra fecha, origen, destinos, kilómetros por tramo, kilómetros totales, tarifa aplicada y monto total.
  - Ordenados con los más recientes primero.

---

## 💰 Resultados Destacados

Para cada tramo se muestra de inmediato:
```text
Origen → Destino = XX.X km
```

Y de forma destacada y de alto impacto:

* **KM TOTALES: XXX.X km**
* **TARIFA OFICIAL: ₡XXX / km**
* **TOTAL A COBRAR: ₡XX,XXX**

> **Fórmula Oficial CGR:** `Kilómetros totales × Tarifa correspondiente = Monto total`

---

## 🚗 Vehículo y Matriz Oficial de Tarifas CGR

Conserva **únicamente** los criterios oficiales de la tabla de la Contraloría General de la República (CGR Costa Rica) para determinar la tarifa exacta:
* **Año (Antigüedad 0 a 10+ años, base modelo 2025)**
* **Motor / Cilindrada (cc)** (≤ 1.600 cc para Liviano A, > 1.600 cc para Liviano B, > 2.200 cc para Rural)
* **Tipo de Combustible** (Gasolina, Diésel, Híbrido, Eléctrico)
* **Carrocería** (Automóvil/Sedán, Rural/Pick-up, Motocicleta)

### 📊 Tabla de Verdad de Tarifas:
* Incluye vista directa a la **matriz completa oficial de tarifas CGR** (en ₡/km para los 11 escalones de antigüedad y todas las categorías vehiculares), con resaltado automático del año del vehículo activo.
* Comboboxes estilizados con diseño moderno y minimalista, sin textos de ejemplo o valores ficticios precargados.

---

## 📄 Justificación y Resumen

Opción para ver, compartir o imprimir un resumen completo que incluye:
* Fecha
* Vehículo y categoría CGR
* Origen y destinos con desglose de kilómetros por tramo
* Kilómetros totales
* Tarifa aplicada por km
* **Total a cobrar**

Permite **copiar al portapapeles / compartir vía WhatsApp** o **imprimir directamente en PDF/papel**.

---

## 📱 PWA e Instalación en Celular

* **Manifest PWA** y **Service Worker** con soporte offline.
* **Nuevo logo minimalista y moderno**: Fondo naranja, ruta, kilometraje y cálculo.
* Totalmente adaptada a **Safe Areas** de iOS y Android sin barras cortadas ni desplazamiento horizontal.
* Lista para **GitHub Pages** con rutas relativas (`./`).
