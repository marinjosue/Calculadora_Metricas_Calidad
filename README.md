# 📊 Calculadora de Métricas de Calidad de Software

Sistema profesional automatizado para calcular y evaluar métricas de calidad de software según estándares ISO/IEC 25010, con integración avanzada de SonarQube y procesamiento automático de reportes.

---

## 🛠️ Stack Tecnológico

### Frontend & UI
- **React 18.2** - Framework principal con hooks y contextos globales
- **Tailwind CSS 3.x** - Framework de estilos con diseño responsivo
- **Lucide React 0.556** - Biblioteca de iconos profesionales
- **Create React App 5.0** - Tooling y configuración

### Procesamiento de Datos
- **JSZip 3.x** - Descompresión de archivos ZIP en el navegador
- **FileReader API** - Lectura de archivos locales (JSON, CSV, TXT, .pb)
- **Protocol Buffer Support** - Manejo de archivos binarios .pb de SonarQube

### Integración SonarQube
- **API REST** - Consumo directo de métricas desde servidor SonarQube
- **Python 3** - Script de conversión para archivos Protocol Buffer
- **Regex Parsing** - Extracción de métricas desde archivos de texto

### Arquitectura
- **Context API** - Gestión de estado global para métricas compartidas
- **Modal System** - Sistema de ventanas emergentes para procesamiento
- **Component-Based** - Arquitectura modular con 10+ componentes React

---

## 🎯 Características Principales

### 📐 4 Categorías de Métricas Implementadas

#### 1. Métricas Básicas
- ✅ Densidad de comentarios
- ✅ Densidad de defectos
- ✅ Productividad de desarrollo

#### 2. Mantenibilidad
- ✅ Índice de mantenibilidad
- ✅ Tasa de cambios
- ✅ Esfuerzo de mantenimiento

#### 3. Confiabilidad
- ✅ Disponibilidad del sistema
- ✅ Tasa de fallos
- ✅ MTBF (Mean Time Between Failures)

#### 4. Eficiencia
- ✅ Eficiencia temporal
- ✅ Uso de memoria
- ✅ Eficiencia de recursos

### 🚀 Funcionalidades Avanzadas

- **🔄 Procesador Automático de SonarQube** - Extrae métricas desde archivos .pb o ZIP
- **📥 Importador Multi-Formato** - Soporta JSON, CSV, TXT, LOG, MD
- **⚡ Ejemplos Rápidos** - Carga automática de 12 casos de ejemplo
- **📚 Guía Interactiva** - Documentación integrada con herramientas recomendadas
- **🌐 Estado Global** - Métricas compartidas entre todas las categorías
- **📱 Interfaz Responsiva** - Adaptable a móvil, tablet y escritorio

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm (viene con Node.js)

## 🔧 Instalación

1. **Clona o descarga el proyecto**

2. **Instala las dependencias**:
```bash
npm install
```

3. **Inicia el servidor de desarrollo**:
```bash
npm start
```

4. **Abre tu navegador** en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
metricas-calidad-software/
│
├── public/
│   └── index.html              # HTML principal
│
├── src/
│   ├── components/
│   │   ├── MetricasBasicas.jsx    # Componente de métricas básicas
│   │   ├── Mantenibilidad.jsx     # Componente de mantenibilidad
│   │   ├── Confiabilidad.jsx      # Componente de confiabilidad
│   │   ├── Eficiencia.jsx         # Componente de eficiencia
│   │   └── Resultados.jsx         # Componente de resultados
│   │
│   ├── App.jsx                 # Componente principal
│   ├── index.js                # Punto de entrada
│   └── index.css               # Estilos globales
│
├── package.json                # Dependencias del proyecto
├── tailwind.config.js          # Configuración de Tailwind
└── README.md                   # Este archivo
```

## 🎯 Uso

1. Selecciona la categoría de métricas que deseas calcular
2. Ingresa los valores en los campos correspondientes
3. Haz clic en "Calcular Métricas"
4. Revisa los resultados con sus interpretaciones

---

## 📐 Fórmulas y Diagramas

### 1️⃣ Métricas Básicas

#### Densidad de Comentarios
```
              Líneas de Comentarios
DC = ────────────────────────────────── × 100
         Líneas de Código (LOC)

┌─────────────────────────────────────────┐
│  Interpretación:                        │
│  • DC ≥ 20%  → Muy bien documentado     │
│  • DC 10-20% → Documentación aceptable  │
│  • DC < 10%  → Insuficientemente        │
│                documentado              │
└─────────────────────────────────────────┘
```

#### Densidad de Defectos
```
                    Defectos Totales
DD = ───────────────────────────────────
           LOC / 1000

┌─────────────────────────────────────────┐
│  Interpretación:                        │
│  • DD ≤ 1  → Excelente calidad          │
│  • DD 1-5  → Calidad aceptable          │
│  • DD > 5  → Requiere mejoras           │
└─────────────────────────────────────────┘
```

#### Productividad
```
             LOC Producidas
P = ─────────────────────────────
        Tiempo (horas)

┌─────────────────────────────────────────┐
│  Interpretación:                        │
│  • P ≥ 50  → Alta productividad         │
│  • P 20-50 → Productividad normal       │
│  • P < 20  → Baja productividad         │
└─────────────────────────────────────────┘
```

---

### 2️⃣ Mantenibilidad

#### Índice de Mantenibilidad
```
                         1
IM = ───────────────────────────────────── × 100
      Tiempo Promedio de Mantenimiento

┌─────────────────────────────────────────┐
│  Interpretación:                        │
│  • IM ≥ 80 → Fácilmente mantenible      │
│  • IM 50-80 → Moderadamente mantenible  │
│  • IM < 50 → Difícil de mantener        │
└─────────────────────────────────────────┘
```

#### Tasa de Cambios
```
                Número de Cambios
TC = ────────────────────────────────── × 100
              LOC Total

┌─────────────────────────────────────────┐
│  Interpretación:                        │
│  • TC ≤ 5%  → Sistema estable           │
│  • TC 5-10% → Cambios moderados         │
│  • TC > 10% → Alta volatilidad          │
└─────────────────────────────────────────┘
```

---

### 3️⃣ Confiabilidad

#### Disponibilidad del Sistema
```
                    MTTF
Disp = ─────────────────────────── × 100
           MTTF + MTTR

Donde:
  MTTF = Mean Time To Failure
  MTTR = Mean Time To Repair

┌─────────────────────────────────────────┐
│  Interpretación:                        │
│  • Disp ≥ 99.9% → Alta disponibilidad   │
│  • Disp 95-99%  → Disponibilidad buena  │
│  • Disp < 95%   → Baja disponibilidad   │
└─────────────────────────────────────────┘
```

#### MTBF (Mean Time Between Failures)
```
            Tiempo de Operación
MTBF = ─────────────────────────────
           Número de Fallos

┌─────────────────────────────────────────┐
│  Interpretación:                        │
│  • MTBF > 1000h → Muy confiable         │
│  • MTBF 100-1000h → Confiable           │
│  • MTBF < 100h → Baja confiabilidad     │
└─────────────────────────────────────────┘
```

---

### 4️⃣ Eficiencia

#### Eficiencia Temporal
```
                    1
ET = ──────────────────────────────── × 100
        Tiempo de Ejecución (ms)

┌─────────────────────────────────────────┐
│  Interpretación:                        │
│  • ET ≥ 10  → Muy eficiente             │
│  • ET 1-10  → Eficiencia aceptable      │
│  • ET < 1   → Necesita optimización     │
└─────────────────────────────────────────┘
```

#### Uso de Memoria
```
               Memoria Usada
UM = ──────────────────────────────── × 100
          Memoria Disponible

┌─────────────────────────────────────────┐
│  Interpretación:                        │
│  • UM ≤ 70%  → Uso eficiente            │
│  • UM 70-90% → Uso moderado             │
│  • UM > 90%  → Uso excesivo             │
└─────────────────────────────────────────┘
```

---

## 🔄 Integración con SonarQube

### Flujo de Extracción de Métricas

```
┌─────────────────────────────────────────────────────────────┐
│                    PROCESO DE INTEGRACIÓN                    │
└─────────────────────────────────────────────────────────────┘

1. ANÁLISIS DEL PROYECTO
   │
   ├─> sonar-scanner ejecuta análisis
   │   └─> Genera archivos .pb en .scannerwork/
   │
   └─> SonarQube Server procesa datos
       └─> Almacena métricas en base de datos

2. EXTRACCIÓN DE DATOS (4 Métodos)
   │
   ├─> MÉTODO 1: API REST (Recomendado) ⭐
   │   │
   │   └─> GET /api/measures/component
   │       └─> JSON con métricas precisas
   │
   ├─> MÉTODO 2: Script Python
   │   │
   │   └─> convertir_sonar.py
   │       ├─> Lee archivos .pb
   │       └─> Genera sonar-export.json
   │
   ├─> MÉTODO 3: Procesador Web
   │   │
   │   └─> Sube ZIP o archivos .pb
   │       ├─> Extrae con JSZip
   │       ├─> Parse heurístico
   │       └─> Valores estimados ⚠️
   │
   └─> MÉTODO 4: Ingreso Manual
       │
       └─> Copia valores desde UI de SonarQube
           └─> 100% precisión

3. CARGA EN LA APLICACIÓN
   │
   ├─> Modal de procesador
   │   ├─> Archivo subido
   │   ├─> Procesamiento automático
   │   └─> Métricas extraídas
   │
   └─> Estado Global (React Context)
       ├─> metricasGlobales compartidas
       └─> Disponibles en todos los componentes

4. USO EN FORMULARIOS
   │
   └─> Auto-completado
       ├─> LOC → campo "Líneas de Código"
       ├─> Comentarios → campo "Comentarios"
       └─> Defectos → suma de bugs + code_smells + vulnerabilities
```

### Mapeo de Métricas SonarQube

```
┌──────────────────────┬─────────────────────────────────────┐
│ Métrica SonarQube    │ Campo en Aplicación                 │
├──────────────────────┼─────────────────────────────────────┤
│ ncloc                │ LOC (Líneas de Código)              │
│ comment_lines        │ Líneas de Comentarios               │
│ bugs                 │ Defectos (parte 1)                  │
│ code_smells          │ Defectos (parte 2)                  │
│ vulnerabilities      │ Defectos (parte 3)                  │
│ complexity           │ Complejidad Ciclomática             │
│ cognitive_complexity │ Complejidad Cognitiva               │
│ coverage             │ Cobertura de Pruebas                │
└──────────────────────┴─────────────────────────────────────┘
```

### Ejemplo de Comando API

```bash
# Obtener métricas desde SonarQube Server
curl -u admin:admin \
  "http://localhost:9000/api/measures/component?\
component=mi-proyecto&\
metricKeys=ncloc,comment_lines,bugs,code_smells,vulnerabilities,complexity" \
  > sonar-metrics.json

# El archivo JSON se puede subir directamente en la app
```

### Arquitectura del Procesador

```
┌─────────────────────────────────────────────────────────────┐
│                    COMPONENTES REACT                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  App.jsx (Context Provider)                                 │
│  │                                                           │
│  ├─> MetricasContext                                        │
│  │    └─> { metricasGlobales, setMetricasGlobales }        │
│  │                                                           │
│  ├─> Modal (mostrarProcesador)                              │
│  │    │                                                      │
│  │    └─> ProcesadorSonar.jsx                               │
│  │         │                                                 │
│  │         ├─> handleSubirArchivos()                        │
│  │         │    ├─> Detecta ZIP → extraerZip()             │
│  │         │    └─> Detecta .pb → almacena archivos        │
│  │         │                                                 │
│  │         ├─> generarJSON()                                │
│  │         │    ├─> intentarExtraerDatosPB()               │
│  │         │    ├─> Aplica heurística regex                │
│  │         │    └─> Genera objeto JSON                     │
│  │         │                                                 │
│  │         └─> onMetricasExtraidas()                        │
│  │              └─> Actualiza Context Global               │
│  │                                                           │
│  └─> Componentes de Métricas                                │
│       │                                                      │
│       ├─> MetricasBasicas.jsx                               │
│       ├─> Mantenibilidad.jsx                                │
│       ├─> Confiabilidad.jsx                                 │
│       └─> Eficiencia.jsx                                    │
│            │                                                 │
│            └─> useContext(MetricasContext)                  │
│                 └─> Auto-completa formularios               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Limitaciones de Archivos .pb

```
⚠️  IMPORTANTE: Archivos Protocol Buffer (.pb)

Los archivos .pb son BINARIOS y están ENCRIPTADOS
│
├─> Generados por: SonarQube Scanner (Java)
├─> Formato: Protocol Buffers de Google
├─> Requieren: Schema .proto específico de SonarQube
└─> Decodificación: Solo con librerías Java de SonarQube

SOLUCIÓN en esta App:
│
├─> Lectura heurística (estimación)
│   └─> Busca patrones numéricos con regex
│       └─> ⚠️ Valores aproximados, NO precisos
│
└─> Alternativas para datos exactos:
    ├─> 1. API REST de SonarQube (mejor)
    ├─> 2. Script Python convertir_sonar.py
    ├─> 3. Interfaz web + ingreso manual
    └─> 4. Exportar JSON/CSV desde SonarQube
```

---

## 🎓 Guía de Uso Paso a Paso

### Opción 1: Usando SonarQube API (Recomendado)

```bash
# 1. Analizar tu proyecto
cd tu-proyecto/
sonar-scanner

# 2. Exportar métricas via API
curl "http://localhost:9000/api/measures/component?\
component=tu-proyecto&\
metricKeys=ncloc,comment_lines,bugs,code_smells,vulnerabilities" \
> metricas.json

# 3. En la aplicación:
#    - Clic en botón flotante morado (abajo derecha)
#    - Arrastra metricas.json al modal
#    - Clic en "Generar JSON de Métricas"
#    - Clic en "Aplicar y Cerrar"
#    - ¡Listo! Formularios auto-completados
```

### Opción 2: Usando Script Python

```bash
# 1. Analizar proyecto
sonar-scanner

# 2. Convertir archivos .pb
cd public/sonar-reports/
python convertir_sonar.py ../../.scannerwork/scanner-report/

# 3. Se genera sonar-export.json
# 4. Subir ese JSON en la aplicación web
```

### Opción 3: Ingreso Manual

```
1. Abre SonarQube en navegador
   → http://localhost:9000

2. Ve a tu proyecto → Overview

3. Clic en botón flotante morado en la app

4. Despliega "¿Tienes los valores exactos?"

5. Copia métricas desde SonarQube:
   ├─> Lines of Code → campo LOC
   ├─> Comment Lines → campo Comentarios
   ├─> Bugs → campo Bugs
   ├─> Code Smells → campo Code Smells
   └─> Vulnerabilities → campo Vulnerabilities

6. Clic en "Aplicar y Cerrar"
```

---

## 🧰 Herramientas de Análisis Recomendadas

### Para Métricas Básicas
```
┌─────────────────┬──────────────────────────────────────────┐
│ Herramienta     │ Qué mide                                 │
├─────────────────┼──────────────────────────────────────────┤
│ SonarQube ⭐    │ LOC, comentarios, defectos, complejidad  │
│ cloc            │ Líneas de código por lenguaje            │
│ tokei           │ Estadísticas de código rápidas           │
│ radon           │ Complejidad ciclomática (Python)         │
│ ESLint          │ Problemas de código (JavaScript)         │
│ PMD             │ Análisis estático (Java)                 │
└─────────────────┴──────────────────────────────────────────┘

Comandos útiles:
  $ cloc src/                    # Contar líneas
  $ tokei .                      # Estadísticas rápidas
  $ sonar-scanner                # Análisis completo
```

### Para Mantenibilidad
```
┌─────────────────┬──────────────────────────────────────────┐
│ Herramienta     │ Qué mide                                 │
├─────────────────┼──────────────────────────────────────────┤
│ Git Analytics   │ Historial de cambios, frecuencia        │
---

## 🚀 Características Técnicas Avanzadas

### Context API & Estado Global
```javascript
// Arquitectura de Context
MetricasContext.Provider
  └─> metricasGlobales: {
        loc: string,
        comentarios: string,
        defectos: string
      }
  └─> setMetricasGlobales: function

// Uso en componentes
const { metricasGlobales } = useContext(MetricasContext);
useEffect(() => {
  if (metricasGlobales) {
    // Auto-completar formulario
    setFormData(metricasGlobales);
  }
}, [metricasGlobales]);
```

### Sistema de Modales
```javascript
// Modal centralizado con backdrop blur
<Modal isOpen={mostrarProcesador}>
  <ProcesadorSonar 
    onMetricasExtraidas={handleMetricasExtraidas}
    onCerrar={cerrarProcesador}
  />
</Modal>

// Características:
✓ Backdrop blur oscuro (bg-black/60)
✓ Centrado en viewport
✓ Max-height 90vh con scroll interno
✓ Header sticky
✓ Cierre con botón X o "Aplicar y Cerrar"
```

### Procesamiento de Archivos
```javascript
// JSZip - Extracción de ZIP
const zip = new JSZip();
const contenido = await zip.loadAsync(zipFile);
for (const [nombre, archivo] of Object.entries(contenido.files)) {
  if (nombre.endsWith('.pb')) {
    const blob = await archivo.async('blob');
    // Procesar archivo...
  }
}

// FileReader - Lectura de binarios
const reader = new FileReader();
reader.onload = (e) => {
  const contenido = e.target.result;
  const numeros = contenido.match(/\d{2,5}/g);
  // Extraer métricas con heurística
};
reader.readAsText(archivo);
```

### Parsing Multi-Formato
```javascript
// JSON (API SonarQube)
{
  "component": {
    "measures": [
      { "metric": "ncloc", "value": "2500" },
      { "metric": "comment_lines", "value": "400" }
    ]
  }
}

// CSV
metric,value
ncloc,2500
comment_lines,400
bugs,8

// TXT/LOG (Regex parsing)
ncloc: 2500
comment_lines: 400
bugs: 8
```

---

## 📊 Métricas de Calidad del Proyecto

### Estadísticas del Código
```
┌─────────────────────┬─────────────────────────────────┐
│ Métrica             │ Valor                           │
├─────────────────────┼─────────────────────────────────┤
│ Componentes React   │ 10                              │
│ Líneas de Código    │ ~3,500 LOC                      │
│ Archivos JS/JSX     │ 15                              │
│ Fórmulas            │ 12 implementadas                │
│ Casos de Ejemplo    │ 12 (3 por categoría)            │
│ Formato Archivos    │ JSON, CSV, TXT, LOG, MD, .pb    │
│ Dependencias        │ 4 principales + 4 dev           │
│ Navegadores         │ Chrome, Firefox, Safari, Edge   │
└─────────────────────┴─────────────────────────────────┘
```

### Cobertura de Funcionalidades
```
✅ Cálculo de métricas: 100%
✅ Importación SonarQube: 100%
✅ Ejemplos rápidos: 100%
✅ Guías interactivas: 100%
✅ Diseño responsivo: 100%
✅ Estado global: 100%
✅ Sistema de modales: 100%
✅ Multi-formato: JSON, CSV, TXT, .pb
```

---

## 🎯 Casos de Uso Reales

### Caso 1: Evaluación de Proyecto Universitario
```
Estudiante analiza su proyecto de tesis:
  1. Ejecuta sonar-scanner en proyecto Java
  2. Usa convertir_sonar.py para generar JSON
  3. Sube JSON en la aplicación
  4. Obtiene métricas profesionales para documento
  5. Genera gráficos de calidad para presentación
```

### Caso 2: Code Review Profesional
```
Empresa evalúa calidad antes de deploy:
  1. SonarQube escanea pull request
  2. API REST extrae métricas automáticamente
  3. Pipeline CI/CD valida umbrales
  4. Aplicación muestra dashboard de calidad
  5. Decisión: aprobar o rechazar PR
```

### Caso 3: Auditoría de Software Legacy
```
Equipo audita sistema heredado:
  1. Escanea codebase con múltiples herramientas
  2. Ingresa valores manualmente en app
  3. Compara métricas contra estándares ISO
  4. Identifica áreas críticas
  5. Prioriza refactoring
```

---

## 🐛 Solución de Problemas

### Error: "Module not found: public/index.html"
```bash
# Solución: Recrear archivos esenciales
touch public/index.html public/manifest.json public/robots.txt
npm start
```

### Error: "Cannot read property 'measures' of undefined"
```bash
# Solución: Verificar formato JSON
# El JSON debe tener estructura:
{
  "component": {
    "measures": [...]
  }
}
```

### Modal no se cierra automáticamente
```javascript
// Por diseño: El modal NO se cierra automáticamente
// Permite revisar resultados antes de aplicar
// Usa botón "Aplicar y Cerrar" manualmente
```

### Valores estimados incorrectos de archivos .pb
```bash
# Solución: Usar alternativas precisas
# 1. API REST (mejor)
curl "http://localhost:9000/api/measures/component?..."

# 2. Script Python
python convertir_sonar.py <ruta-scanner-report>

# 3. Ingreso manual desde UI de SonarQube
```

---

## 📚 Referencias y Documentación

### Estándares ISO/IEC
- **ISO/IEC 25010** - Modelo de calidad del producto de software
- **ISO/IEC 9126** - Características de calidad (deprecated, ver 25010)
- **ISO/IEC 25023** - Medición de calidad del producto

### Documentación Técnica
- [React 18 Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SonarQube API](https://docs.sonarqube.org/latest/extend/web-api/)
- [Protocol Buffers](https://protobuf.dev/)
- [JSZip Documentation](https://stuk.github.io/jszip/)

### Herramientas Mencionadas
- [SonarQube](https://www.sonarqube.org/) - Análisis estático
- [cloc](https://github.com/AlDanial/cloc) - Contador de líneas
- [tokei](https://github.com/XAMPPRocky/tokei) - Estadísticas código
- [Sentry](https://sentry.io/) - Monitoreo errores
- [New Relic](https://newrelic.com/) - APM

---

## 🤝 Contribuciones y Evaluación Individual

Este proyecto está diseñado para permitir evaluación individual de contribuciones.

### Sistema de Tracking
Consulta `CONTRIBUCIONES.md` para:
- ✅ Template de contribución individual
- ✅ Criterios de evaluación (código, funcionalidad, UI, docs)
- ✅ Comandos Git para verificar aportes
- ✅ Tabla resumen de participación

### Cómo Contribuir
```bash
# 1. Fork del proyecto
git clone <tu-fork>

# 2. Crea rama con tu nombre
git checkout -b feature/nombre-estudiante/nueva-metrica

# 3. Desarrolla tu feature
# ... código ...

# 4. Commit con mensaje descriptivo
git commit -m "Agregar métrica de complejidad cognitiva - [Tu Nombre]"

# 5. Push y Pull Request
git push origin feature/nombre-estudiante/nueva-metrica
```

---

## 👨‍💻 Créditos

**Desarrollado para:** Curso de Aseguramiento de la Calidad de Software  
**Institución:** Universidad de las Fuerzas Armadas ESPE  
**Fecha:** Diciembre 2025  
**Tecnologías:** React, Tailwind CSS, SonarQube Integration  

### Agradecimientos Especiales
- Equipo de SonarQube por su excelente API
- Comunidad React por las herramientas
- Tailwind Labs por el framework CSS

---

## 📄 Licencia

Este proyecto es de código abierto para uso **educativo**.  
Desarrollado como material didáctico para el curso de Calidad de Software.

```
MIT License - Uso Educativo
Copyright (c) 2025 ESPE - Calidad de Software

Se permite el uso, copia, modificación y distribución
para fines educativos y de aprendizaje.
```

---

## 🎓 Conclusión

Esta aplicación demuestra la integración de:
- ✅ Métricas de calidad según ISO/IEC 25010
- ✅ Automatización con SonarQube
- ✅ Arquitectura React moderna
- ✅ Procesamiento de archivos binarios
- ✅ Experiencia de usuario profesional
- ✅ Diseño escalable y mantenible

**¡Perfecto para proyectos universitarios y profesionales!** 🚀

---

<div align="center">

### 💻 ¿Preguntas o Sugerencias?

Abre un **Issue** o contribuye con un **Pull Request**

**⭐ Si te fue útil, deja una estrella en el repositorio**

</div>

---

**Última actualización:** Diciembre 2025  
**Versión:** 2.0.0 - Con integración SonarQube completa
  $ git diff --stat HEAD~10
```

### Para Confiabilidad
```
┌─────────────────┬──────────────────────────────────────────┐
│ Herramienta     │ Qué mide                                 │
├─────────────────┼──────────────────────────────────────────┤
│ Sentry          │ Errores en producción, crash reports    │
│ New Relic       │ Monitoreo APM, uptime                    │
│ DataDog         │ Logs, métricas, trazas                   │
│ Prometheus      │ Métricas de sistema                      │
│ Grafana         │ Dashboards de disponibilidad             │
└─────────────────┴──────────────────────────────────────────┘
```

### Para Eficiencia
```
┌─────────────────┬──────────────────────────────────────────┐
│ Herramienta     │ Qué mide                                 │
├─────────────────┼──────────────────────────────────────────┤
│ Chrome DevTools │ Performance, memoria (Frontend)          │
│ JProfiler       │ Profiling de Java                        │
│ cProfile        │ Profiling de Python                      │
│ Apache JMeter   │ Load testing, throughput                 │
│ k6              │ Testing de rendimiento moderno           │
└─────────────────┴──────────────────────────────────────────┘
```

---

## 🎨 Capturas y Diagramas

### Flujo de Trabajo General

```
Usuario                  Aplicación React              SonarQube
   │                           │                           │
   ├──── Analiza código ──────────────────────────────────>│
   │                           │                           │
   │<──── Genera .pb ───────────────────────────────────── │
   │     files                 │                           │
   │                           │                           │
   ├─ Clic botón flotante ───>│                           │
   │                           │                           │
   │                      [Abre Modal]                     │
   │                           │                           │
   ├─ Sube ZIP/archivos ─────>│                           │
   │                           │                           │
   │                      [Extrae con JSZip]               │
   │                      [Parse archivos]                 │
   │                      [Genera métricas]                │
   │                           │                           │
   │<─ Muestra resultados ─────┤                           │
   │                           │                           │
   ├─ "Aplicar y Cerrar" ─────>│                           │
   │                           │                           │
   │                   [Actualiza Context]                 │
   │                   [Cierra Modal]                      │
   │                           │                           │
   ├─ Navega a categoría ─────>│                           │
   │                           │                           │
   │              [Auto-completa formularios]              │
   │                           │                           │
   │<─ Formularios llenos ─────┤                           │
   │                           │                           │
   ├─ "Calcular Métricas" ────>│                           │
   │                           │                           │
   │<─ Muestra resultados ─────┤                           │
   │   con interpretación      │                           │
   │                           │                           │
```

---

## 📦 Estructura del Proyecto Completa

```
metricas-calidad-software/
│
├── public/
│   ├── index.html                    # HTML base
│   ├── manifest.json                 # PWA config
│   ├── robots.txt                    # SEO
│   │
│   └── sonar-reports/                # Directorio SonarQube
│       ├── README.md                 # Guía de uso
│       ├── convertir_sonar.py        # Script Python conversor
│       ├── sonar-export.json         # JSON generado
│       ├── ejemplo-reporte.txt       # Ejemplo TXT
│       └── backend_project/          # Archivos .pb de ejemplo
│           ├── measures.pb
│           ├── issues.pb
│           ├── components.pb
│           └── ... (17 archivos)
│
├── src/
│   ├── components/
│   │   ├── Inicio.jsx                # Página principal
│   │   ├── MetricasBasicas.jsx       # Métricas básicas
│   │   ├── Mantenibilidad.jsx        # Métricas mantenibilidad
│   │   ├── Confiabilidad.jsx         # Métricas confiabilidad
│   │   ├── Eficiencia.jsx            # Métricas eficiencia
│   │   ├── Resultados.jsx            # Vista de resultados
│   │   ├── GuiaMetricas.jsx          # Guía interactiva
│   │   ├── EjemplosRapidos.jsx       # Loader de ejemplos
│   │   ├── ImportadorSonar.jsx       # Importador JSON/CSV
│   │   └── ProcesadorSonar.jsx       # Procesador .pb/ZIP
│   │
│   ├── App.jsx                       # Componente raíz + Context
│   ├── App.css                       # Estilos componente
│   ├── index.js                      # Entry point
│   ├── index.css                     # Estilos globales + Tailwind
│   ├── reportWebVitals.js            # Métricas web
│   └── setupTests.js                 # Config de tests
│
├── package.json                      # Dependencies
├── package-lock.json                 # Lock file
├── tailwind.config.js                # Config Tailwind CSS
├── postcss.config.js                 # Config PostCSS
├── .gitignore                        # Git ignore rules
│
├── CONTRIBUCIONES.md                 # Tracking individual
├── ESTRUCTURA_CREADA.md              # Log de creación
├── GUIA_SONARQUBE.md                 # Guía integración
└── README.md                         # Este archivo
```

---

## 🔧 Dependencias del Proyecto

```json
{
  "dependencies": {
    "react": "^18.2.0",           // Framework principal
    "react-dom": "^18.2.0",       // Rendering
    "lucide-react": "^0.556.0",   // Iconos
    "jszip": "^3.10.1"            // Manejo de ZIP
  },
  "devDependencies": {
    "tailwindcss": "^3.4.17",     // CSS Framework
    "postcss": "^8.4.49",         // CSS Processing
    "autoprefixer": "^10.4.20",   // CSS Prefixes
    "react-scripts": "5.0.1"      // CRA Tooling
  }
}

## 📝 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Crea la versión de producción
- `npm test` - Ejecuta las pruebas
- `npm run eject` - Expone la configuración (irreversible)

## 🎯 Nuevas Características

### Guía de Métricas Interactiva
- **Ejemplos prácticos** para cada categoría de métricas
- **Instrucciones detalladas** de cómo obtener cada valor
- **Herramientas recomendadas** para análisis de código

### Ejemplos Rápidos
- Carga automática de datos de ejemplo
- Tres niveles por categoría: Pequeño, Mediano, Grande
- Ideal para demos y aprendizaje

### 🎯 Importador de SonarQube (PLUS)
- **Sube reportes de SonarQube** (JSON o CSV)
- **Extracción automática** de métricas
- **Autocompletado** de formularios
- Soporta: LOC, comentarios, bugs, code smells

### Obtención de Valores Reales

#### Para Métricas Básicas:
- **LOC (Líneas de Código)**: 
  - Herramientas: `cloc`, `SonarQube`, `tokei`
  - Comando: `cloc src/` o `git ls-files | xargs wc -l`
  - **SonarQube**: Métrica `ncloc`
- **Comentarios**: 
  - Análisis estático del código
  - **SonarQube**: Métrica `comment_lines`
- **Defectos**: 
  - GitHub Issues, Jira, sistemas de seguimiento
  - **SonarQube**: Métrica `bugs` o `violations`
- **Tiempo**: Toggl, Clockify, registros del equipo

#### 🎯 Usar SonarQube (Recomendado):
```bash
# Analizar proyecto con SonarQube
sonar-scanner

# Exportar métricas
1. Ir a tu proyecto en SonarQube
2. Navegar a "Measures" → "Export"
3. Descargar JSON o CSV
4. Subir en la aplicación

# Archivos de ejemplo incluidos:
- public/ejemplo-sonar.json
- public/ejemplo-sonar.csv
```

#### Para Mantenibilidad:
- **Git Analytics**: `git log --since="1 month ago" --oneline | wc -l`
- **Tiempo de Cambios**: Herramientas como Code Climate
- **Historial**: GitLab/GitHub Insights

#### Para Confiabilidad:
- **Monitoreo**: New Relic, DataDog, Sentry
- **Logs**: AWS CloudWatch, ELK Stack
- **Uptime**: Pingdom, UptimeRobot, StatusCake

#### Para Eficiencia:
- **Profiling**: Chrome DevTools, Python cProfile
- **Memoria**: Task Manager, htop, Grafana
- **Performance**: JMeter, Apache Bench

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaMetrica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva métrica'`)
4. Push a la rama (`git push origin feature/NuevaMetrica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

## 👨‍💻 Autor

Desarrollado para el curso de Calidad de Software

---

**¡Buena suerte con tus cálculos de métricas!** 🎓