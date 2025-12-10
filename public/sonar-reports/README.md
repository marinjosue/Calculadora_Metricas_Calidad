# 📁 Carpeta para Reportes de SonarQube

## 📊 ¿Qué va aquí?

Esta carpeta está destinada para descomprimir y analizar reportes de SonarQube en diferentes formatos.

## 🎯 Formatos Soportados

### 1. Archivos Protocol Buffer (.pb)
SonarQube genera archivos `.pb` con todas las métricas:
- `measures.pb`
- `issues.pb`
- `metrics.pb`
- `components.pb`
- etc.

### 2. Archivos de Scanner Report
Descomprime el ZIP del scanner report aquí:
```
sonar-reports/
  ├── measures.pb
  ├── issues.pb
  ├── metrics.pb
  ├── components.pb
  └── metadata.pb
```

## 📥 Cómo Obtener los Archivos

### Opción 1: Desde el directorio de trabajo del scanner
```bash
# Después de ejecutar sonar-scanner, busca:
.scannerwork/
  └── report-task.txt  # Contiene la ubicación del reporte
  └── scanner-report/  # ¡Aquí están los archivos .pb!

# Copiar a esta carpeta
cp .scannerwork/scanner-report/*.pb public/sonar-reports/
```

### Opción 2: Desde el servidor SonarQube
```bash
# Los reportes procesados se almacenan en:
$SONARQUBE_HOME/data/ce/
```

### Opción 3: Exportar desde API (formato JSON)
```bash
# Crear script para exportar métricas
curl -u token: "http://localhost:9000/api/measures/component?component=proyecto&metricKeys=ncloc,bugs,comment_lines" > sonar-export.json

# Guardar en esta carpeta
mv sonar-export.json public/sonar-reports/
```

## 🔧 Uso en la Aplicación

1. **Descomprime tu reporte aquí**
2. **Sube cualquier archivo generado** (.pb, .json, .txt)
3. **La app extraerá las métricas automáticamente**

## 📋 Ejemplo de Estructura

```
sonar-reports/
├── README.md (este archivo)
├── ejemplo-sonar.json (ejemplo incluido)
├── ejemplo-sonar.csv (ejemplo incluido)
└── tu-proyecto/
    ├── measures.pb
    ├── issues.pb
    └── components.pb
```

## 🐍 Script Python Conversor

### `convertir_sonar.py` - Convierte archivos .pb a JSON

**Requisitos:** Python 3 (sin dependencias externas)

**Uso básico:**
```bash
# Busca automáticamente .scannerwork
python convertir_sonar.py

# O especifica la ruta
python convertir_sonar.py .scannerwork/scanner-report
python convertir_sonar.py ../mi-proyecto/.scannerwork/scanner-report
```

**Salida:**
- Genera `sonar-export.json` listo para importar
- Muestra resumen de métricas encontradas
- Compatible con el importador de la aplicación web

**Ejemplo:**
```bash
$ python convertir_sonar.py
============================================================
🔧 Conversor de Reportes SonarQube (.pb → JSON)
============================================================

📂 Analizando: .scannerwork/scanner-report

✓ Encontrado: measures.pb
✓ Encontrado: issues.pb
✓ Encontrado: components.pb

✅ Archivo JSON generado: sonar-export.json
📊 Métricas extraídas: 7

💡 Ahora puedes subir 'sonar-export.json' en la aplicación web
```

## 💡 Tips

- Los archivos `.pb` son binarios, usa `convertir_sonar.py` para extraer métricas
- La app intentará leer JSON/CSV primero
- Si solo tienes `.pb`, el script Python los convierte automáticamente
- Mantén esta carpeta organizada por proyecto
- El script no requiere instalar protobuf u otras dependencias

---

**¡Arrastra y suelta tu reporte de SonarQube aquí!** 📊
