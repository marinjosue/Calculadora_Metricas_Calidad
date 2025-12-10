import React, { useState } from 'react';
import { Upload, FolderOpen, FileCode, Zap, AlertCircle, CheckCircle, Code2, Calculator } from 'lucide-react';

export default function AnalizadorProyecto({ onMetricasExtraidas }) {
  const [archivos, setArchivos] = useState([]);
  const [analizando, setAnalizando] = useState(false);
  const [resultados, setResultados] = useState(null);
  const [formulasCalculadas, setFormulasCalculadas] = useState(null);
  const [error, setError] = useState(null);

  // Extensiones soportadas por lenguaje
  const extensionesPorLenguaje = {
    javascript: ['.js', '.jsx', '.mjs'],
    typescript: ['.ts', '.tsx'],
    python: ['.py'],
    java: ['.java'],
    csharp: ['.cs'],
    cpp: ['.cpp', '.cc', '.cxx', '.hpp', '.h'],
    php: ['.php'],
    ruby: ['.rb'],
    go: ['.go'],
    rust: ['.rs']
  };

  // Detectar lenguaje por extensión
  const detectarLenguaje = (nombreArchivo) => {
    const ext = nombreArchivo.substring(nombreArchivo.lastIndexOf('.')).toLowerCase();
    for (const [lenguaje, extensiones] of Object.entries(extensionesPorLenguaje)) {
      if (extensiones.includes(ext)) return lenguaje;
    }
    return 'desconocido';
  };

  // Contar líneas de código
  const contarLineas = (contenido) => {
    const lineas = contenido.split('\n');
    let loc = 0;
    let comentarios = 0;
    let vacias = 0;

    lineas.forEach(linea => {
      const lineaTrim = linea.trim();
      
      if (lineaTrim === '') {
        vacias++;
      } else if (
        lineaTrim.startsWith('//') || 
        lineaTrim.startsWith('#') || 
        lineaTrim.startsWith('/*') || 
        lineaTrim.startsWith('*') ||
        lineaTrim.startsWith('<!--')
      ) {
        comentarios++;
      } else {
        loc++;
      }
    });

    return { loc, comentarios, vacias, total: lineas.length };
  };

  // Detectar patrones de complejidad
  const analizarComplejidad = (contenido, lenguaje) => {
    let complejidad = 0;
    
    // Patrones condicionales
    const patronesCondicionales = [
      /if\s*\(/g, /else/g, /switch/g, /case\s+/g,
      /while\s*\(/g, /for\s*\(/g, /foreach/g,
      /\?\s*:/g, // operador ternario
      /catch/g, /try/g
    ];

    patronesCondicionales.forEach(patron => {
      const matches = contenido.match(patron);
      if (matches) complejidad += matches.length;
    });

    return complejidad;
  };

  // Detectar funciones/métodos
  const contarFunciones = (contenido, lenguaje) => {
    let funciones = 0;
    const patronesPorLenguaje = {
      javascript: [/function\s+\w+/g, /const\s+\w+\s*=\s*\(/g, /\w+\s*:\s*function/g],
      typescript: [/function\s+\w+/g, /const\s+\w+\s*=\s*\(/g, /\w+\s*\([^)]*\)\s*{/g],
      python: [/def\s+\w+/g, /async\s+def\s+\w+/g],
      java: [/public\s+\w+\s+\w+\s*\(/g, /private\s+\w+\s+\w+\s*\(/g, /protected\s+\w+\s+\w+\s*\(/g],
      csharp: [/public\s+\w+\s+\w+\s*\(/g, /private\s+\w+\s+\w+\s*\(/g],
      php: [/function\s+\w+/g],
      ruby: [/def\s+\w+/g],
      go: [/func\s+\w+/g],
      cpp: [/\w+\s+\w+\s*\([^)]*\)\s*{/g]
    };

    const patrones = patronesPorLenguaje[lenguaje] || [];
    patrones.forEach(patron => {
      const matches = contenido.match(patron);
      if (matches) funciones += matches.length;
    });

    return funciones;
  };

  // Detectar imports/dependencias
  const contarImports = (contenido, lenguaje) => {
    let imports = 0;
    const patronesPorLenguaje = {
      javascript: [/import\s+/g, /require\s*\(/g],
      typescript: [/import\s+/g],
      python: [/import\s+/g, /from\s+\w+\s+import/g],
      java: [/import\s+/g],
      csharp: [/using\s+/g],
      php: [/use\s+/g, /require/g, /include/g],
      go: [/import\s+/g],
      rust: [/use\s+/g],
      cpp: [/#include/g]
    };

    const patrones = patronesPorLenguaje[lenguaje] || [];
    patrones.forEach(patron => {
      const matches = contenido.match(patron);
      if (matches) imports += matches.length;
    });

    return imports;
  };

  // Manejar subida de archivos
  const handleSubirArchivos = (e) => {
    const archivosSubidos = Array.from(e.target.files);
    setArchivos(archivosSubidos);
    setError(null);
    setResultados(null);
  };

  // Analizar todos los archivos
  const analizarProyecto = async () => {
    if (archivos.length === 0) {
      setError('Por favor, selecciona al menos un archivo de código fuente');
      return;
    }

    setAnalizando(true);
    setError(null);

    try {
      const analisisPorArchivo = [];
      let totales = {
        loc: 0,
        comentarios: 0,
        vacias: 0,
        funciones: 0,
        complejidad: 0,
        imports: 0
      };

      // Analizar cada archivo
      for (const archivo of archivos) {
        const contenido = await leerArchivo(archivo);
        const lenguaje = detectarLenguaje(archivo.name);
        
        if (lenguaje === 'desconocido') continue;

        const lineas = contarLineas(contenido);
        const funciones = contarFunciones(contenido, lenguaje);
        const complejidad = analizarComplejidad(contenido, lenguaje);
        const imports = contarImports(contenido, lenguaje);

        analisisPorArchivo.push({
          nombre: archivo.name,
          lenguaje,
          ...lineas,
          funciones,
          complejidad,
          imports
        });

        totales.loc += lineas.loc;
        totales.comentarios += lineas.comentarios;
        totales.vacias += lineas.vacias;
        totales.funciones += funciones;
        totales.complejidad += complejidad;
        totales.imports += imports;
      }

      // Calcular métricas derivadas
      const densidadComentarios = totales.loc > 0 ? ((totales.comentarios / totales.loc) * 100).toFixed(2) : 0;
      const complejidadPromedio = totales.funciones > 0 ? (totales.complejidad / totales.funciones).toFixed(2) : 0;

      const resultadosFinales = {
        totales,
        derivadas: {
          densidadComentarios,
          complejidadPromedio,
          lineasPorFuncion: totales.funciones > 0 ? (totales.loc / totales.funciones).toFixed(2) : 0
        },
        archivos: analisisPorArchivo,
        estadisticas: {
          totalArchivos: archivos.length,
          archivosAnalizados: analisisPorArchivo.length,
          lenguajesDetectados: [...new Set(analisisPorArchivo.map(a => a.lenguaje))]
        }
      };

      setResultados(resultadosFinales);

      // Calcular todas las fórmulas de métricas
      calcularFormulas(resultadosFinales);

      // Enviar métricas al contexto global
      if (onMetricasExtraidas) {
        onMetricasExtraidas({
          loc: totales.loc.toString(),
          comentarios: totales.comentarios.toString(),
          defectos: Math.ceil(totales.complejidad * 0.1).toString(), // Estimación de defectos basada en complejidad
          complejidad: totales.complejidad.toString(),
          funciones: totales.funciones.toString()
        });
      }

    } catch (err) {
      setError(`Error al analizar archivos: ${err.message}`);
    } finally {
      setAnalizando(false);
    }
  };

  // Calcular todas las fórmulas de métricas de calidad
  const calcularFormulas = (datos) => {
    const { totales } = datos;
    
    // 1. MÉTRICAS BÁSICAS
    const densidadComentarios = totales.loc > 0 
      ? ((totales.comentarios / totales.loc) * 100).toFixed(2) 
      : 0;
    
    const defectosEstimados = Math.ceil(totales.complejidad * 0.1);
    const densidadDefectos = totales.loc > 0 
      ? (defectosEstimados / (totales.loc / 1000)).toFixed(2)
      : 0;
    
    // Productividad (asumiendo 1 hora por cada 50 líneas de código)
    const tiempoEstimado = totales.loc / 50;
    const productividad = tiempoEstimado > 0 
      ? (totales.loc / tiempoEstimado).toFixed(2)
      : 0;

    // 2. MANTENIBILIDAD
    // Índice de mantenibilidad basado en complejidad
    const tiempoMantenimientoPromedio = totales.complejidad > 0 
      ? (totales.complejidad / 10) 
      : 1;
    const indiceMantenibilidad = ((1 / tiempoMantenimientoPromedio) * 100).toFixed(2);
    
    // Tasa de cambios (estimación: 1 cambio por cada 100 líneas de complejidad)
    const cambiosEstimados = Math.ceil(totales.complejidad / 100);
    const tasaCambios = totales.loc > 0 
      ? ((cambiosEstimados / totales.loc) * 100).toFixed(2)
      : 0;
    
    const esfuerzoMantenimiento = cambiosEstimados > 0 
      ? (tiempoMantenimientoPromedio / cambiosEstimados).toFixed(2)
      : 0;

    // 3. CONFIABILIDAD
    // Estimación de tiempo de operación basado en complejidad
    const tiempoOperacion = 1000; // horas estimadas
    const numeroFallos = Math.max(1, Math.ceil(totales.complejidad / 50));
    
    const mtbf = (tiempoOperacion / numeroFallos).toFixed(2);
    const tasaFallos = (numeroFallos / tiempoOperacion).toFixed(4);
    
    // MTTF y MTTR estimados
    const mttf = parseFloat(mtbf) * 0.9;
    const mttr = parseFloat(mtbf) * 0.1;
    const disponibilidad = ((mttf / (mttf + mttr)) * 100).toFixed(2);

    // 4. EFICIENCIA
    // Estimación basada en complejidad
    const tiempoEjecucion = totales.complejidad > 0 
      ? totales.complejidad / 10 
      : 100;
    const eficienciaTemporal = ((1 / tiempoEjecucion) * 100).toFixed(4);
    
    // Uso de memoria estimado (basado en LOC y complejidad)
    const memoriaDisponible = 1000; // MB
    const memoriaUsada = (totales.loc / 100) + (totales.complejidad * 2);
    const usoMemoria = ((memoriaUsada / memoriaDisponible) * 100).toFixed(2);
    const eficienciaMemoria = (100 - parseFloat(usoMemoria)).toFixed(2);

    // Interpretar resultados
    const interpretaciones = {
      densidadComentarios: densidadComentarios >= 20 ? 'Excelente' : densidadComentarios >= 10 ? 'Aceptable' : 'Insuficiente',
      densidadDefectos: densidadDefectos <= 1 ? 'Excelente' : densidadDefectos <= 5 ? 'Aceptable' : 'Requiere mejoras',
      productividad: productividad >= 50 ? 'Alta' : productividad >= 20 ? 'Normal' : 'Baja',
      indiceMantenibilidad: indiceMantenibilidad >= 80 ? 'Fácilmente mantenible' : indiceMantenibilidad >= 50 ? 'Moderado' : 'Difícil',
      tasaCambios: tasaCambios <= 5 ? 'Sistema estable' : tasaCambios <= 10 ? 'Moderado' : 'Alta volatilidad',
      disponibilidad: disponibilidad >= 99.9 ? 'Alta disponibilidad' : disponibilidad >= 95 ? 'Buena' : 'Baja',
      mtbf: mtbf > 1000 ? 'Muy confiable' : mtbf > 100 ? 'Confiable' : 'Baja confiabilidad',
      eficienciaTemporal: eficienciaTemporal >= 10 ? 'Muy eficiente' : eficienciaTemporal >= 1 ? 'Aceptable' : 'Necesita optimización',
      usoMemoria: usoMemoria <= 70 ? 'Eficiente' : usoMemoria <= 90 ? 'Moderado' : 'Excesivo'
    };

    const formulas = {
      basicas: {
        densidadComentarios: { valor: densidadComentarios, unidad: '%', interpretacion: interpretaciones.densidadComentarios },
        densidadDefectos: { valor: densidadDefectos, unidad: 'defectos/KLOC', interpretacion: interpretaciones.densidadDefectos },
        productividad: { valor: productividad, unidad: 'LOC/hora', interpretacion: interpretaciones.productividad }
      },
      mantenibilidad: {
        indiceMantenibilidad: { valor: indiceMantenibilidad, unidad: '%', interpretacion: interpretaciones.indiceMantenibilidad },
        tasaCambios: { valor: tasaCambios, unidad: '%', interpretacion: interpretaciones.tasaCambios },
        esfuerzoMantenimiento: { valor: esfuerzoMantenimiento, unidad: 'horas/cambio', interpretacion: interpretaciones.esfuerzoMantenimiento }
      },
      confiabilidad: {
        disponibilidad: { valor: disponibilidad, unidad: '%', interpretacion: interpretaciones.disponibilidad },
        tasaFallos: { valor: tasaFallos, unidad: 'fallos/hora', interpretacion: 'Estimado' },
        mtbf: { valor: mtbf, unidad: 'horas', interpretacion: interpretaciones.mtbf }
      },
      eficiencia: {
        eficienciaTemporal: { valor: eficienciaTemporal, unidad: '%', interpretacion: interpretaciones.eficienciaTemporal },
        usoMemoria: { valor: usoMemoria, unidad: '%', interpretacion: interpretaciones.usoMemoria },
        eficienciaMemoria: { valor: eficienciaMemoria, unidad: '%', interpretacion: 'Memoria libre' }
      }
    };

    setFormulasCalculadas(formulas);
  };

  // Leer contenido de archivo
  const leerArchivo = (archivo) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(archivo);
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg shadow-lg p-8 mb-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <Code2 className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold">Analizador Automático de Proyectos</h1>
            <p className="text-green-100">Sube tus archivos de código y extrae métricas automáticamente</p>
          </div>
        </div>
      </div>

      {/* Área de carga */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Upload className="w-6 h-6 text-green-600" />
          Subir Archivos del Proyecto
        </h2>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-500 transition-colors">
          <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              accept=".js,.jsx,.ts,.tsx,.py,.java,.cs,.cpp,.hpp,.php,.rb,.go,.rs,.c,.h"
              onChange={handleSubirArchivos}
              className="hidden"
            />
            <span className="text-lg font-semibold text-green-600 hover:text-green-700">
              Haz clic para seleccionar archivos
            </span>
            <p className="text-sm text-gray-500 mt-2">
              o arrastra y suelta archivos aquí
            </p>
          </label>
          <p className="text-xs text-gray-400 mt-4">
            Soporta: JavaScript, TypeScript, Python, Java, C#, C++, PHP, Ruby, Go, Rust
          </p>
        </div>

        {/* Lista de archivos seleccionados */}
        {archivos.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <FileCode className="w-5 h-5 text-green-600" />
              Archivos seleccionados ({archivos.length})
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
              {archivos.map((archivo, index) => (
                <div key={index} className="flex items-center gap-2 text-sm py-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{archivo.name}</span>
                  <span className="text-gray-400">({(archivo.size / 1024).toFixed(2)} KB)</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botón de análisis */}
        <button
          onClick={analizarProyecto}
          disabled={archivos.length === 0 || analizando}
          className={`w-full mt-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all ${
            archivos.length > 0 && !analizando
              ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {analizando ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Analizando proyecto...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Analizar Proyecto
            </>
          )}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-800">Error</p>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Resultados */}
      {resultados && (
        <div className="space-y-6">
          {/* Resumen general */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Resultados del Análisis
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-4xl font-bold text-green-600">{resultados.totales.loc}</p>
                <p className="text-sm text-gray-600 mt-1">Líneas de Código</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-4xl font-bold text-blue-600">{resultados.totales.comentarios}</p>
                <p className="text-sm text-gray-600 mt-1">Comentarios</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-4xl font-bold text-purple-600">{resultados.totales.funciones}</p>
                <p className="text-sm text-gray-600 mt-1">Funciones/Métodos</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-4xl font-bold text-orange-600">{resultados.totales.complejidad}</p>
                <p className="text-sm text-gray-600 mt-1">Complejidad Total</p>
              </div>
            </div>

            {/* Métricas derivadas */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-lg mb-4">📊 Métricas Derivadas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Densidad de Comentarios</p>
                  <p className="text-2xl font-bold text-green-600">{resultados.derivadas.densidadComentarios}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Complejidad Promedio</p>
                  <p className="text-2xl font-bold text-blue-600">{resultados.derivadas.complejidadPromedio}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Líneas por Función</p>
                  <p className="text-2xl font-bold text-purple-600">{resultados.derivadas.lineasPorFuncion}</p>
                </div>
              </div>
            </div>

            {/* Estadísticas del proyecto */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4">📈 Estadísticas del Proyecto</h3>
              <div className="space-y-2">
                <p><strong>Archivos analizados:</strong> {resultados.estadisticas.archivosAnalizados} de {resultados.estadisticas.totalArchivos}</p>
                <p><strong>Lenguajes detectados:</strong> {resultados.estadisticas.lenguajesDetectados.join(', ')}</p>
                <p><strong>Total de imports:</strong> {resultados.totales.imports}</p>
              </div>
            </div>
          </div>

          {/* Tabla de archivos */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold mb-4">📁 Desglose por Archivo</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border border-green-200 px-4 py-3 text-left">Archivo</th>
                    <th className="border border-green-200 px-4 py-3 text-left">Lenguaje</th>
                    <th className="border border-green-200 px-4 py-3 text-center">LOC</th>
                    <th className="border border-green-200 px-4 py-3 text-center">Comentarios</th>
                    <th className="border border-green-200 px-4 py-3 text-center">Funciones</th>
                    <th className="border border-green-200 px-4 py-3 text-center">Complejidad</th>
                  </tr>
                </thead>
                <tbody>
                  {resultados.archivos.map((archivo, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="border border-gray-200 px-4 py-3 font-mono text-sm">{archivo.nombre}</td>
                      <td className="border border-gray-200 px-4 py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {archivo.lenguaje}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-center">{archivo.loc}</td>
                      <td className="border border-gray-200 px-4 py-3 text-center">{archivo.comentarios}</td>
                      <td className="border border-gray-200 px-4 py-3 text-center">{archivo.funciones}</td>
                      <td className="border border-gray-200 px-4 py-3 text-center">{archivo.complejidad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Resultados de Fórmulas Calculadas */}
          {formulasCalculadas && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Calculator className="w-6 h-6 text-purple-600" />
                Métricas de Calidad Calculadas
              </h2>

              <div className="space-y-6">
                {/* Métricas Básicas */}
                <div className="border-l-4 border-blue-500 pl-6 bg-blue-50 p-4 rounded-r-lg">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">📊 Métricas Básicas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Densidad de Comentarios</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {formulasCalculadas.basicas.densidadComentarios.valor}{formulasCalculadas.basicas.densidadComentarios.unidad}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{formulasCalculadas.basicas.densidadComentarios.interpretacion}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Densidad de Defectos</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {formulasCalculadas.basicas.densidadDefectos.valor} <span className="text-sm">{formulasCalculadas.basicas.densidadDefectos.unidad}</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{formulasCalculadas.basicas.densidadDefectos.interpretacion}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Productividad</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {formulasCalculadas.basicas.productividad.valor} <span className="text-sm">{formulasCalculadas.basicas.productividad.unidad}</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{formulasCalculadas.basicas.productividad.interpretacion}</p>
                    </div>
                  </div>
                </div>

                {/* Mantenibilidad */}
                <div className="border-l-4 border-yellow-500 pl-6 bg-yellow-50 p-4 rounded-r-lg">
                  <h3 className="text-xl font-bold text-yellow-800 mb-4">🔧 Mantenibilidad</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Índice de Mantenibilidad</p>
                      <p className="text-3xl font-bold text-yellow-600">
                        {formulasCalculadas.mantenibilidad.indiceMantenibilidad.valor}{formulasCalculadas.mantenibilidad.indiceMantenibilidad.unidad}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{formulasCalculadas.mantenibilidad.indiceMantenibilidad.interpretacion}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Tasa de Cambios</p>
                      <p className="text-3xl font-bold text-yellow-600">
                        {formulasCalculadas.mantenibilidad.tasaCambios.valor}{formulasCalculadas.mantenibilidad.tasaCambios.unidad}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{formulasCalculadas.mantenibilidad.tasaCambios.interpretacion}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Esfuerzo de Mantenimiento</p>
                      <p className="text-3xl font-bold text-yellow-600">
                        {formulasCalculadas.mantenibilidad.esfuerzoMantenimiento.valor} <span className="text-sm">{formulasCalculadas.mantenibilidad.esfuerzoMantenimiento.unidad}</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{formulasCalculadas.mantenibilidad.esfuerzoMantenimiento.interpretacion}</p>
                    </div>
                  </div>
                </div>

                {/* Confiabilidad */}
                <div className="border-l-4 border-green-500 pl-6 bg-green-50 p-4 rounded-r-lg">
                  <h3 className="text-xl font-bold text-green-800 mb-4">🛡️ Confiabilidad</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Disponibilidad</p>
                      <p className="text-3xl font-bold text-green-600">
                        {formulasCalculadas.confiabilidad.disponibilidad.valor}{formulasCalculadas.confiabilidad.disponibilidad.unidad}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{formulasCalculadas.confiabilidad.disponibilidad.interpretacion}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Tasa de Fallos</p>
                      <p className="text-3xl font-bold text-green-600">
                        {formulasCalculadas.confiabilidad.tasaFallos.valor} <span className="text-sm">{formulasCalculadas.confiabilidad.tasaFallos.unidad}</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{formulasCalculadas.confiabilidad.tasaFallos.interpretacion}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">MTBF</p>
                      <p className="text-3xl font-bold text-green-600">
                        {formulasCalculadas.confiabilidad.mtbf.valor} <span className="text-sm">{formulasCalculadas.confiabilidad.mtbf.unidad}</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{formulasCalculadas.confiabilidad.mtbf.interpretacion}</p>
                    </div>
                  </div>
                </div>

                {/* Eficiencia */}
                <div className="border-l-4 border-purple-500 pl-6 bg-purple-50 p-4 rounded-r-lg">
                  <h3 className="text-xl font-bold text-purple-800 mb-4">⚡ Eficiencia</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Eficiencia Temporal</p>
                      <p className="text-3xl font-bold text-purple-600">
                        {formulasCalculadas.eficiencia.eficienciaTemporal.valor}{formulasCalculadas.eficiencia.eficienciaTemporal.unidad}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{formulasCalculadas.eficiencia.eficienciaTemporal.interpretacion}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Uso de Memoria</p>
                      <p className="text-3xl font-bold text-purple-600">
                        {formulasCalculadas.eficiencia.usoMemoria.valor}{formulasCalculadas.eficiencia.usoMemoria.unidad}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{formulasCalculadas.eficiencia.usoMemoria.interpretacion}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Eficiencia de Memoria</p>
                      <p className="text-3xl font-bold text-purple-600">
                        {formulasCalculadas.eficiencia.eficienciaMemoria.valor}{formulasCalculadas.eficiencia.eficienciaMemoria.unidad}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{formulasCalculadas.eficiencia.eficienciaMemoria.interpretacion}</p>
                    </div>
                  </div>
                </div>

                {/* Nota informativa */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <strong>ℹ️ Nota:</strong> Estos valores son calculados automáticamente basándose en el análisis del código fuente.
                    Las métricas de confiabilidad y eficiencia son estimaciones heurísticas basadas en la complejidad del código.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
