# Implementación de ISO 25022 - Calidad en Uso ✅

## Resumen de Cambios

Se ha implementado **automáticamente** el componente **CalidadEnUso.jsx** con todas las fórmulas de la norma ISO/IEC 25022.

---

## 📋 Métricas Implementadas

### 1. **Efectividad** (Effectiveness)
```
Fórmula: (Tareas exitosas / Total de tareas) × 100
Mide: Grado en que usuarios completan correctamente sus tareas
Rango óptimo: ≥ 95%
```

### 2. **Eficiencia Relativa** (Efficiency)
```
Fórmula: (Tiempo benchmark / Tiempo real) × 100
Mide: Relación tiempo real vs tiempo esperado
Rango óptimo: ≥ 100% (mejor que benchmark)
```

### 3. **NPS - Net Promoter Score** (Satisfaction)
```
Fórmula: % Promotores - % Detractores
Mide: Satisfacción y lealtad del usuario
Rango óptimo: ≥ 50 (excelente)
```

### 4. **Riesgo Económico** (Freedom from Risk)
```
Fórmula: (Errores con impacto / Total transacciones) × 100
Mide: Errores que afectan la economía o datos
Rango óptimo: ≤ 1% (bajo riesgo)
```

### 5. **Cobertura de Contexto** (Context Coverage)
```
Fórmula: (Contextos exitosos / Contextos evaluados) × 100
Mide: Porcentaje de casos de uso cubiertos
Rango óptimo: ≥ 90%
```

---

## 🎯 Características del Componente

✅ **Automatización completa** de cálculos
✅ **Soporte Modo Oscuro/Claro**
✅ **Validación automática** de valores numéricos
✅ **3 ejemplos rápidos** pre-configurados:
   - Sistema Web Típico
   - Aplicación Crítica
   - App Móvil en Desarrollo
✅ **Recomendaciones automáticas** según resultados
✅ **Fórmulas visibles** para transparencia
✅ **Integración con contexto global** (MetricasContext)
✅ **Resultados en panel lateral**

---

## 📍 Ubicación del Componente

- **Archivo:** `src/components/CalidadEnUso.jsx`
- **Acceso:** Botón "Calidad en Uso" en la barra de navegación (ícono 👥)
- **Integración:** App.jsx (línea ~200)

---

## 🚀 Cómo Usar

1. Navegue a la sección **"Calidad en Uso"** en el menú
2. Ingrese los datos solicitados o seleccione un ejemplo rápido
3. Haga clic en **"Calcular Métricas"**
4. Vea los resultados automáticamente en el panel derecho

---

## 📊 Datos de Entrada Requeridos

| Métrica | Dato | Unidad |
|---------|------|--------|
| **Efectividad** | Tareas exitosas / Total tareas | cantidad |
| **Eficiencia** | Tiempo benchmark / Tiempo real | segundos |
| **NPS** | Promotores / Detractores / Total | cantidad |
| **Riesgo** | Errores impacto / Total transacciones | cantidad |
| **Cobertura** | Contextos exitosos / Total | cantidad |

---

## 🎨 Estilos Visuales

Cada métrica tiene:
- **Ícono distintivo** con color específico
- **Descripción clara** del concepto
- **Fórmula matemática** visible
- **Recomendación automática** según valor
- **Ejemplo de entrada** para referencia

---

## 🔄 Flujo de Datos

```
Usuario ingresa datos
    ↓
onClick "Calcular Métricas"
    ↓
Fórmulas se aplican automáticamente
    ↓
Validación y recomendaciones
    ↓
onCalculate() → MetricasContext
    ↓
Resultados mostrados en panel lateral
```

---

## ✨ Ejemplos Predefinidos

### Ejemplo 1: Sistema Web Típico
- Efectividad: 95%
- Eficiencia: 119% (más rápido que benchmark)
- NPS: 50 (Excelente)
- Riesgo: 0.2% (Bajo)
- Cobertura: 90%

### Ejemplo 2: Aplicación Crítica
- Efectividad: 99%
- Eficiencia: 96.8% (cercano al benchmark)
- NPS: 82 (Excelente)
- Riesgo: 0% (Sin riesgo)
- Cobertura: 100%

### Ejemplo 3: App Móvil en Desarrollo
- Efectividad: 78%
- Eficiencia: 65.8% (más lento)
- NPS: 10 (Crítico)
- Riesgo: 2.4% (Moderado)
- Cobertura: 60%

---

## 📚 Referencias ISO/IEC 25022

**Estándar:** ISO/IEC 25022:2016
**Título:** Systems and software engineering – Systems and software quality requirements and evaluation (SQuaRE) – Measurement of quality in use

---

## 🎓 Próximos Pasos Opcionales

1. Integrar con **base de datos** para histórico
2. Crear **gráficos comparativos** de métricas
3. Exportar reportes en **PDF**
4. Comparar con **benchmarks** de industria
5. Alertas automáticas por **umbrales críticos**

---

**Estado:** ✅ Implementado y funcional
**Fecha:** 18 de enero de 2026
**Última actualización:** ISO 25022 - Calidad en Uso

