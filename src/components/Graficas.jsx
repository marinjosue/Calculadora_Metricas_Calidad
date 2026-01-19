import React, { useState, useEffect, useContext } from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Calendar,
  Download,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  XCircle,
  Activity,
  Lightbulb,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Minus,
  Shield,
  ChevronDown,
  ChevronUp,
  EyeOff
} from 'lucide-react';
import { MetricasContext } from '../App';

const Graficas = () => {
  const { resultadosCalculados } = useContext(MetricasContext);
  const [historial, setHistorial] = useState([]);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [vistaActual, setVistaActual] = useState('graficas'); // 'graficas' o 'historial'
  const [mostrarModalResultados, setMostrarModalResultados] = useState(false);
  const [categoriaModalSeleccionada, setCategoriaModalSeleccionada] = useState(null);
  
  // Estados para controlar la visibilidad de cada gráfica
  const [mostrarBasicas, setMostrarBasicas] = useState(true);
  const [mostrarMantenibilidad, setMostrarMantenibilidad] = useState(true);
  const [mostrarConfiabilidad, setMostrarConfiabilidad] = useState(true);
  const [mostrarEficiencia, setMostrarEficiencia] = useState(true);
  const [mostrarCalidadEnUso, setMostrarCalidadEnUso] = useState(true);

  // Cargar historial desde localStorage al montar
  useEffect(() => {
    const historialGuardado = localStorage.getItem('historialMetricas');
    if (historialGuardado) {
      setHistorial(JSON.parse(historialGuardado));
    }
  }, []);

  // Guardar resultado actual en historial
  const guardarEnHistorial = () => {
    if (!resultadosCalculados || Object.keys(resultadosCalculados).length === 0) {
      alert('No hay resultados para guardar. Calcula métricas primero.');
      return;
    }

    const nuevoRegistro = {
      id: Date.now(),
      fecha: new Date().toISOString(),
      resultados: resultadosCalculados,
      timestamp: new Date().toLocaleString('es-ES')
    };

    const nuevoHistorial = [nuevoRegistro, ...historial];
    setHistorial(nuevoHistorial);
    localStorage.setItem('historialMetricas', JSON.stringify(nuevoHistorial));
    alert('Resultados guardados en el historial');
  };

  // Eliminar registro del historial
  const eliminarRegistro = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este registro?')) {
      const nuevoHistorial = historial.filter(reg => reg.id !== id);
      setHistorial(nuevoHistorial);
      localStorage.setItem('historialMetricas', JSON.stringify(nuevoHistorial));
      if (registroSeleccionado?.id === id) {
        setRegistroSeleccionado(null);
      }
    }
  };

  // Limpiar todo el historial
  const limpiarHistorial = () => {
    if (window.confirm('¿Estás seguro de limpiar todo el historial?')) {
      setHistorial([]);
      localStorage.removeItem('historialMetricas');
      setRegistroSeleccionado(null);
      alert('Historial limpiado');
    }
  };

  // Obtener color según interpretación
  const obtenerColor = (interpretacion) => {
    if (!interpretacion) return 'bg-gray-400';
    const texto = interpretacion.toLowerCase();
    if (texto.includes('excelente') || texto.includes('muy bien') || texto.includes('alta')) {
      return 'bg-green-500';
    } else if (texto.includes('bueno') || texto.includes('aceptable') || texto.includes('moderado')) {
      return 'bg-yellow-500';
    } else {
      return 'bg-red-500';
    }
  };

  // Obtener icono según interpretación
  const obtenerIcono = (interpretacion) => {
    if (!interpretacion) return XCircle;
    const texto = interpretacion.toLowerCase();
    if (texto.includes('excelente') || texto.includes('muy bien') || texto.includes('alta')) {
      return CheckCircle;
    } else if (texto.includes('bueno') || texto.includes('aceptable') || texto.includes('moderado')) {
      return AlertCircle;
    } else {
      return XCircle;
    }
  };

  // Obtener recomendaciones según métrica
  const obtenerRecomendaciones = (nombreMetrica, interpretacion) => {
    const texto = interpretacion?.toLowerCase() || '';
    const recomendaciones = [];

    // Si es excelente, solo felicitar
    if (texto.includes('excelente') || texto.includes('muy bien') || texto.includes('alta')) {
      return [{
        tipo: 'exito',
        icono: CheckCircle,
        texto: '¡Excelente! Mantén estas buenas prácticas.'
      }];
    }

    // Recomendaciones específicas por métrica
    const nombre = nombreMetrica.toLowerCase();
    
    if (nombre.includes('comentarios')) {
      recomendaciones.push({
        tipo: 'mejora',
        icono: Lightbulb,
        texto: 'Incrementa la documentación del código'
      });
      recomendaciones.push({
        tipo: 'accion',
        icono: AlertTriangle,
        texto: 'Usa JSDoc o Docstrings para funciones clave'
      });
    } else if (nombre.includes('defectos')) {
      recomendaciones.push({
        tipo: 'critico',
        icono: AlertTriangle,
        texto: 'Revisar y corregir bugs identificados urgentemente'
      });
      recomendaciones.push({
        tipo: 'accion',
        icono: Lightbulb,
        texto: 'Implementar más pruebas unitarias y de integración'
      });
    } else if (nombre.includes('productividad')) {
      recomendaciones.push({
        tipo: 'mejora',
        icono: TrendingUp,
        texto: 'Optimizar flujo de trabajo y eliminar bloqueos'
      });
      recomendaciones.push({
        tipo: 'accion',
        icono: Lightbulb,
        texto: 'Considerar herramientas de automatización'
      });
    } else if (nombre.includes('mantenibilidad')) {
      recomendaciones.push({
        tipo: 'mejora',
        icono: Lightbulb,
        texto: 'Refactorizar código complejo en módulos más simples'
      });
      recomendaciones.push({
        tipo: 'accion',
        icono: AlertTriangle,
        texto: 'Aplicar principios SOLID y patrones de diseño'
      });
    } else if (nombre.includes('cambios')) {
      recomendaciones.push({
        tipo: 'mejora',
        icono: TrendingUp,
        texto: 'Estabilizar la arquitectura del sistema'
      });
      recomendaciones.push({
        tipo: 'accion',
        icono: Lightbulb,
        texto: 'Definir mejor los requisitos antes de codificar'
      });
    } else if (nombre.includes('disponibilidad') || nombre.includes('fallos')) {
      recomendaciones.push({
        tipo: 'critico',
        icono: AlertTriangle,
        texto: 'Implementar monitoreo y alertas en tiempo real'
      });
      recomendaciones.push({
        tipo: 'accion',
        icono: Lightbulb,
        texto: 'Configurar redundancia y failover automático'
      });
    } else if (nombre.includes('mtbf')) {
      recomendaciones.push({
        tipo: 'mejora',
        icono: TrendingUp,
        texto: 'Mejorar pruebas de estrés y resistencia'
      });
      recomendaciones.push({
        tipo: 'accion',
        icono: Lightbulb,
        texto: 'Implementar logging detallado para diagnóstico'
      });
    } else if (nombre.includes('eficiencia') || nombre.includes('memoria')) {
      recomendaciones.push({
        tipo: 'mejora',
        icono: TrendingUp,
        texto: 'Optimizar consultas y algoritmos'
      });
      recomendaciones.push({
        tipo: 'accion',
        icono: Lightbulb,
        texto: 'Usar profiling para identificar cuellos de botella'
      });
    } else if (nombre.includes('efectividad')) {
      // Recomendaciones para Efectividad (ISO 25022)
      if (texto.includes('bajo') || texto.includes('aceptable')) {
        recomendaciones.push({
          tipo: 'critico',
          icono: AlertTriangle,
          texto: 'Revisa UX/UI: Los usuarios no completan las tareas exitosamente'
        });
        recomendaciones.push({
          tipo: 'mejora',
          icono: TrendingUp,
          texto: 'Realiza pruebas de usabilidad y simplifica flujos de trabajo'
        });
      } else if (texto.includes('bueno')) {
        recomendaciones.push({
          tipo: 'info',
          icono: AlertCircle,
          texto: 'Identifica las tareas con menor tasa de éxito y mejóralas'
        });
      }
    } else if (nombre.includes('nps') || nombre.includes('satisfacción')) {
      // Recomendaciones para NPS/Satisfacción
      if (texto.includes('crítico')) {
        recomendaciones.push({
          tipo: 'critico',
          icono: AlertTriangle,
          texto: 'NPS negativo: Urgente mejorar satisfacción del usuario'
        });
        recomendaciones.push({
          tipo: 'mejora',
          icono: TrendingUp,
          texto: 'Recopila feedback activo y atiende quejas principales'
        });
      } else if (texto.includes('aceptable')) {
        recomendaciones.push({
          tipo: 'mejora',
          icono: AlertCircle,
          texto: 'Mejora la experiencia del usuario para aumentar promotores'
        });
      }
    } else if (nombre.includes('riesgo')) {
      // Recomendaciones para Libertad de Riesgo
      if (texto.includes('alto')) {
        recomendaciones.push({
          tipo: 'critico',
          icono: AlertTriangle,
          texto: 'Alto riesgo económico: Implementa controles de calidad urgentes'
        });
        recomendaciones.push({
          tipo: 'mejora',
          icono: Shield,
          texto: 'Aumenta validaciones y pruebas de regresión'
        });
      } else if (texto.includes('moderado')) {
        recomendaciones.push({
          tipo: 'mejora',
          icono: AlertCircle,
          texto: 'Fortalece pruebas automatizadas y manejo de errores'
        });
      }
    } else if (nombre.includes('cobertura')) {
      // Recomendaciones para Cobertura de Contexto
      if (texto.includes('bajo') || texto.includes('aceptable')) {
        recomendaciones.push({
          tipo: 'mejora',
          icono: AlertCircle,
          texto: 'Amplía casos de prueba para cubrir más contextos de uso'
        });
        recomendaciones.push({
          tipo: 'info',
          icono: TrendingUp,
          texto: 'Prueba en diferentes dispositivos, redes y condiciones'
        });
      }
    } else {
      // Recomendación genérica
      recomendaciones.push({
        tipo: 'mejora',
        icono: Lightbulb,
        texto: 'Revisar y mejorar según estándares de la industria'
      });
    }

    return recomendaciones;
  };

  // Preparar datos para gráficas
  const prepararDatosGraficas = () => {
    if (!resultadosCalculados || Object.keys(resultadosCalculados).length === 0) return null;

    const categorias = {
      basicas: [],
      mantenibilidad: [],
      confiabilidad: [],
      eficiencia: [],
      calidadEnUso: []  // Nueva categoría para ISO 25022
    };

    // Procesar resultados - puede ser array de métricas o estructura plana
    Object.entries(resultadosCalculados).forEach(([key, value]) => {
      // Si el valor es un array de métricas (estructura antigua)
      if (Array.isArray(value)) {
        value.forEach(metrica => {
          const metricaObj = {
            nombre: metrica.nombre || key,
            valor: parseFloat(metrica.valor) || 0,
            interpretacion: metrica.interpretacion || '',
            unidad: metrica.unidad || ''
          };
          
          // Clasificar por categoría según el nombre de la métrica
          const nombreLower = metricaObj.nombre.toLowerCase();
          if (nombreLower.includes('comentarios') || nombreLower.includes('defectos') || nombreLower.includes('productividad')) {
            categorias.basicas.push(metricaObj);
          } else if (nombreLower.includes('mantenibilidad') || nombreLower.includes('cambios') || nombreLower.includes('esfuerzo')) {
            categorias.mantenibilidad.push(metricaObj);
          } else if (nombreLower.includes('disponibilidad') || nombreLower.includes('fallos') || nombreLower.includes('mtbf') || nombreLower.includes('confiabilidad')) {
            categorias.confiabilidad.push(metricaObj);
          } else if (nombreLower.includes('eficiencia') || nombreLower.includes('memoria') || nombreLower.includes('temporal')) {
            categorias.eficiencia.push(metricaObj);
          } else if (nombreLower.includes('efectividad') || nombreLower.includes('nps') || nombreLower.includes('riesgo') || nombreLower.includes('cobertura') || nombreLower.includes('satisfacción')) {
            categorias.calidadEnUso.push(metricaObj);
          }
        });
      } else if (value && typeof value === 'object' && value.valor !== undefined) {
        // Estructura nueva: { key: { valor, interpretacion, unidad } }
        const metricaObj = {
          nombre: key,
          valor: parseFloat(value.valor) || 0,
          interpretacion: value.interpretacion || '',
          unidad: value.unidad || ''
        };
        
        // Clasificar también por el key
        const keyLower = key.toLowerCase();
        if (keyLower.includes('comentarios') || keyLower.includes('defectos') || keyLower.includes('productividad')) {
          categorias.basicas.push(metricaObj);
        } else if (keyLower.includes('mantenibilidad') || keyLower.includes('cambios') || keyLower.includes('esfuerzo')) {
          categorias.mantenibilidad.push(metricaObj);
        } else if (keyLower.includes('disponibilidad') || keyLower.includes('fallos') || keyLower.includes('mtbf') || keyLower.includes('confiabilidad')) {
          categorias.confiabilidad.push(metricaObj);
        } else if (keyLower.includes('eficiencia') || keyLower.includes('memoria') || keyLower.includes('temporal')) {
          categorias.eficiencia.push(metricaObj);
        } else if (keyLower.includes('efectividad') || keyLower.includes('nps') || keyLower.includes('riesgo') || keyLower.includes('cobertura') || keyLower.includes('satisfacción')) {
          categorias.calidadEnUso.push(metricaObj);
        }
      }
    });

    return categorias;
  };

  // Renderizar gráfica de líneas (tendencia)
  const GraficaLineas = ({ titulo, metricas, color }) => {
    if (!metricas || metricas.length === 0) return null;

    // Calcular puntos para la línea
    const maxValor = Math.max(...metricas.map(m => m.valor), 1);
    const minValor = Math.min(...metricas.map(m => m.valor), 0);
    const rango = maxValor - minValor || 1;
    const width = 100;
    const height = 60;
    const padding = 5; // Padding para que los puntos no toquen los bordes
    
    const puntos = metricas.map((metrica, idx) => {
      const x = (idx / Math.max(metricas.length - 1, 1)) * width;
      // Ajustar escala para usar todo el espacio disponible
      const valorNormalizado = (metrica.valor - minValor) / rango;
      const y = height - (valorNormalizado * (height - padding * 2)) - padding;
      return `${x},${y}`;
    }).join(' ');

    // Calcular área bajo la curva para gradiente
    const areaPoints = `0,${height} ${puntos} ${width},${height}`;

    return (
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`${color} p-2.5 rounded-xl shadow-lg`}>
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white text-lg">{titulo}</h4>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
              <TrendingUp className="w-4 h-4" />
              {metricas.length} métricas
            </div>
            <button
              onClick={() => {
                setCategoriaModalSeleccionada({ titulo, metricas, color });
                setMostrarModalResultados(true);
              }}
              className="bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-800/50 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-colors duration-300 text-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              Ver Detalles
            </button>
          </div>
        </div>
        
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-56 mb-4">
          {/* Definir gradientes */}
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" className={color.replace('bg-', 'text-')} stopOpacity="0.3" />
              <stop offset="100%" className={color.replace('bg-', 'text-')} stopOpacity="0.05" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Líneas de cuadrícula */}
          {[0, 25, 50, 75, 100].map(y => (
            <line 
              key={y}
              x1="0" 
              y1={height * (y / 100)} 
              x2={width} 
              y2={height * (y / 100)}
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-gray-300 dark:text-gray-600"
              strokeDasharray={y === 50 ? "none" : "1,1"}
            />
          ))}
          
          {/* Área bajo la curva */}
          <polygon
            points={areaPoints}
            fill={`url(#gradient-${color})`}
            className="transition-all duration-500"
          />
          
          {/* Línea principal con efecto glow */}
          <polyline
            points={puntos}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className={color.replace('bg-', 'text-')}
            filter="url(#glow)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Puntos de datos con efecto mejorado */}
          {metricas.map((metrica, idx) => {
            const x = (idx / Math.max(metricas.length - 1, 1)) * width;
            const valorNormalizado = (metrica.valor - minValor) / rango;
            const y = height - (valorNormalizado * (height - padding * 2)) - padding;
            const colorPunto = obtenerColor(metrica.interpretacion);
            const IconoMetrica = obtenerIcono(metrica.interpretacion);
            
            return (
              <g key={idx}>
                {/* Círculo externo brillante */}
                <circle
                  cx={x}
                  cy={y}
                  r="3.5"
                  className={colorPunto}
                  fill="currentColor"
                  opacity="0.2"
                />
                {/* Círculo principal */}
                <circle
                  cx={x}
                  cy={y}
                  r="2.5"
                  className={colorPunto}
                  fill="currentColor"
                  stroke="white"
                  strokeWidth="0.8"
                />
              </g>
            );
          })}
        </svg>
        
        {/* Etiquetas mejoradas */}
        <div className="grid grid-cols-3 gap-3 text-xs">
          {metricas.map((metrica, idx) => {
            const IconoMetrica = obtenerIcono(metrica.interpretacion);
            const colorMetrica = obtenerColor(metrica.interpretacion);
            
            return (
              <div key={idx} className="text-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 transition-all hover:shadow-md">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <IconoMetrica className={`w-3 h-3 ${colorMetrica.replace('bg-', 'text-')}`} />
                  <div className="font-semibold text-gray-700 dark:text-gray-300 truncate text-[10px]">
                    {metrica.nombre.replace(/([A-Z])/g, ' $1').trim().substring(0, 10)}
                  </div>
                </div>
                <div className={`font-bold ${colorMetrica.replace('bg-', 'text-')} text-sm`}>
                  {metrica.valor.toFixed(1)}
                </div>
                <div className="text-[9px] text-gray-500 dark:text-gray-400">
                  {metrica.unidad}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Renderizar gráfica de categoría con barras y recomendaciones
  const GraficaCategoria = ({ titulo, metricas, icono: Icono, color }) => {
    if (!metricas || metricas.length === 0) return null;

    // Calcular promedio de calidad
    const promedioCalidad = metricas.reduce((acc, m) => {
      const texto = m.interpretacion?.toLowerCase() || '';
      if (texto.includes('excelente')) return acc + 100;
      if (texto.includes('bueno')) return acc + 70;
      return acc + 40;
    }, 0) / metricas.length;

    return (
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`${color} p-3 rounded-xl shadow-lg transform hover:scale-110 transition-transform duration-300`}>
              <Icono className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {titulo}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-20 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${color} transition-all duration-1000`}
                    style={{ width: `${promedioCalidad}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {promedioCalidad.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full ${color} bg-opacity-10 dark:bg-opacity-20`}>
            <span className={`text-xs font-bold ${color.replace('bg-', 'text-')}`}>
              {metricas.length} {metricas.length === 1 ? 'métrica' : 'métricas'}
            </span>
          </div>
        </div>
        
        {/* Contenedor principal con dos columnas */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Columna izquierda: Métricas (3/5) */}
          <div className="lg:col-span-3 space-y-6">
            {metricas.map((metrica, idx) => (
              <div key={idx}>
                <BarraHorizontal metrica={metrica} />
                
                {/* Recomendaciones */}
                <div className="mt-2 ml-2 space-y-1">
                  {obtenerRecomendaciones(metrica.nombre, metrica.interpretacion).map((rec, recIdx) => (
                    <div 
                      key={recIdx}
                      className={`flex items-start gap-2 text-xs p-2 rounded-lg ${
                        rec.tipo === 'exito' 
                          ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
                          : rec.tipo === 'critico'
                          ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                          : rec.tipo === 'mejora'
                          ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                          : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      }`}
                    >
                      <rec.icono className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      <span>{rec.texto}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Columna derecha: Estadísticas y resumen (2/5) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Resumen de la categoría */}
            <div className={`${color} bg-opacity-10 dark:bg-opacity-20 rounded-xl p-4 border-2 ${color.replace('bg-', 'border-')}`}>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Resumen
              </h4>
              
              {/* Estadísticas generales */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Promedio General</span>
                  <span className={`text-lg font-bold ${color.replace('bg-', 'text-')}`}>
                    {(metricas.reduce((acc, m) => acc + m.valor, 0) / metricas.length).toFixed(1)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Valor Máximo</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {Math.max(...metricas.map(m => m.valor)).toFixed(1)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Valor Mínimo</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {Math.min(...metricas.map(m => m.valor)).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Distribución de calidad */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <PieChart className="w-4 h-4" />
                Distribución
              </h4>
              
              <div className="space-y-2">
                {(() => {
                  const excelentes = metricas.filter(m => m.interpretacion?.toLowerCase().includes('excelente')).length;
                  const buenos = metricas.filter(m => m.interpretacion?.toLowerCase().includes('bueno') || m.interpretacion?.toLowerCase().includes('aceptable')).length;
                  const mejorables = metricas.length - excelentes - buenos;
                  
                  return (
                    <>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Excelente</span>
                            <span className="font-bold text-green-600">{excelentes}</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div className="bg-green-500 h-full rounded-full" style={{ width: `${(excelentes / metricas.length) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Aceptable</span>
                            <span className="font-bold text-yellow-600">{buenos}</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${(buenos / metricas.length) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-500" />
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Mejorable</span>
                            <span className="font-bold text-red-600">{mejorables}</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div className="bg-red-500 h-full rounded-full" style={{ width: `${(mejorables / metricas.length) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Top métricas */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                Mejor Métrica
              </h4>
              
              {(() => {
                // Encontrar la métrica con mejor interpretación (excelente > bueno > otros)
                const getPrioridad = (interpretacion) => {
                  const texto = interpretacion?.toLowerCase() || '';
                  if (texto.includes('excelente') || texto.includes('muy bien') || texto.includes('alta')) return 3;
                  if (texto.includes('bueno') || texto.includes('aceptable') || texto.includes('moderado')) return 2;
                  return 1;
                };
                
                const mejorMetrica = metricas.reduce((prev, current) => {
                  const prioridadPrev = getPrioridad(prev.interpretacion);
                  const prioridadCurrent = getPrioridad(current.interpretacion);
                  if (prioridadCurrent > prioridadPrev) return current;
                  if (prioridadCurrent === prioridadPrev && current.valor > prev.valor) return current;
                  return prev;
                });
                
                const IconoMejor = obtenerIcono(mejorMetrica.interpretacion);
                const colorMejor = obtenerColor(mejorMetrica.interpretacion);
                
                return (
                  <div className="flex items-center gap-3">
                    <div className={`${colorMejor} p-2 rounded-lg`}>
                      <IconoMejor className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">
                        {mejorMetrica.nombre.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className={`text-xl font-bold ${colorMejor.replace('bg-', 'text-')}`}>
                        {mejorMetrica.valor.toFixed(1)} {mejorMetrica.unidad}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {mejorMetrica.interpretacion}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Peor métrica */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <ArrowDown className="w-4 h-4 text-orange-600" />
                Requiere Atención
              </h4>
              
              {(() => {
                // Encontrar la métrica con peor interpretación
                const getPrioridad = (interpretacion) => {
                  const texto = interpretacion?.toLowerCase() || '';
                  if (texto.includes('excelente') || texto.includes('muy bien') || texto.includes('alta')) return 3;
                  if (texto.includes('bueno') || texto.includes('aceptable') || texto.includes('moderado')) return 2;
                  return 1;
                };
                
                const peorMetrica = metricas.reduce((prev, current) => {
                  const prioridadPrev = getPrioridad(prev.interpretacion);
                  const prioridadCurrent = getPrioridad(current.interpretacion);
                  if (prioridadCurrent < prioridadPrev) return current;
                  if (prioridadCurrent === prioridadPrev && current.valor < prev.valor) return current;
                  return prev;
                });
                
                const IconoPeor = obtenerIcono(peorMetrica.interpretacion);
                const colorPeor = obtenerColor(peorMetrica.interpretacion);
                
                return (
                  <div className="flex items-center gap-3">
                    <div className={`${colorPeor} p-2 rounded-lg`}>
                      <IconoPeor className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">
                        {peorMetrica.nombre.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className={`text-xl font-bold ${colorPeor.replace('bg-', 'text-')}`}>
                        {peorMetrica.valor.toFixed(1)} {peorMetrica.unidad}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {peorMetrica.interpretacion}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const datos = prepararDatosGraficas();

  // Debug: mostrar en consola los datos recibidos
  useEffect(() => {
    if (resultadosCalculados) {
      console.log('📊 Resultados en Gráficas:', resultadosCalculados);
      console.log('📈 Datos preparados:', datos);
    }
  }, [resultadosCalculados]);

  // Calcular estadísticas generales
  const calcularEstadisticas = () => {
    if (!datos) return { excelentes: 0, buenos: 0, mejorables: 0, total: 0 };

    let excelentes = 0;
    let buenos = 0;
    let mejorables = 0;

    Object.values(datos).forEach(categoria => {
      categoria.forEach(metrica => {
        const texto = metrica.interpretacion?.toLowerCase() || '';
        if (texto.includes('excelente') || texto.includes('muy bien') || texto.includes('alta')) {
          excelentes++;
        } else if (texto.includes('bueno') || texto.includes('aceptable') || texto.includes('moderado')) {
          buenos++;
        } else {
          mejorables++;
        }
      });
    });

    return {
      excelentes,
      buenos,
      mejorables,
      total: excelentes + buenos + mejorables
    };
  };

  const estadisticas = calcularEstadisticas();

  // Renderizar barra horizontal
  const BarraHorizontal = ({ metrica }) => {
    // Calcular porcentaje basado en el valor - ajustar según tipo de métrica
    let porcentaje = metrica.valor;
    
    // Si el valor ya es un porcentaje o está normalizado a 100
    if (metrica.unidad === '%' || metrica.valor <= 100) {
      porcentaje = Math.min(Math.max(metrica.valor, 0), 100);
    } else {
      // Para valores que no son porcentajes, normalizar a escala visual
      // Usar escala logarítmica para valores grandes
      if (metrica.valor > 1000) {
        porcentaje = Math.min((Math.log10(metrica.valor) / Math.log10(10000)) * 100, 100);
      } else {
        porcentaje = Math.min((metrica.valor / 10) * 100, 100);
      }
    }
    
    const color = obtenerColor(metrica.interpretacion);
    const Icono = obtenerIcono(metrica.interpretacion);
    
    return (
      <div className="mb-5 bg-white dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Icono className={`w-4 h-4 ${color.replace('bg-', 'text-')}`} />
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 capitalize">
              {metrica.nombre.replace(/([A-Z])/g, ' $1').trim()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-lg font-bold ${color.replace('bg-', 'text-')}`}>
              {metrica.valor.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {metrica.unidad}
            </span>
          </div>
        </div>
        
        <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-5 overflow-hidden shadow-inner">
          {/* Barra de fondo con patrón */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          
          {/* Barra de progreso con gradiente */}
          <div 
            className={`${color} h-full rounded-full transition-all duration-700 ease-out flex items-center justify-between px-2 shadow-lg relative overflow-hidden group`}
            style={{ width: `${porcentaje}%`, minWidth: porcentaje > 0 ? '3%' : '0%' }}
          >
            {/* Efecto de brillo animado */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            {porcentaje > 20 && (
              <span className="text-xs text-white font-bold drop-shadow-md z-10">
                {porcentaje.toFixed(0)}%
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-2 flex items-start gap-2">
          <div className={`w-1 h-1 rounded-full ${color} mt-1.5 flex-shrink-0`} />
          <p className="text-xs text-gray-600 dark:text-gray-400 italic leading-relaxed">
            {metrica.interpretacion}
          </p>
        </div>
      </div>
    );
  };

  // Vista de gráficas
  const VistaGraficas = () => (
    <div className="space-y-6">
      {/* Botones de control */}
      <div className="flex justify-between items-center gap-3">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => {
              const todasMostradas = mostrarBasicas && mostrarMantenibilidad && mostrarConfiabilidad && mostrarEficiencia && mostrarCalidadEnUso;
              setMostrarBasicas(!todasMostradas);
              setMostrarMantenibilidad(!todasMostradas);
              setMostrarConfiabilidad(!todasMostradas);
              setMostrarEficiencia(!todasMostradas);
              setMostrarCalidadEnUso(!todasMostradas);
            }}
            className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-300 text-sm"
          >
            {(mostrarBasicas && mostrarMantenibilidad && mostrarConfiabilidad && mostrarEficiencia && mostrarCalidadEnUso) ? (
              <><EyeOff className="w-4 h-4" /> Ocultar Todas</>
            ) : (
              <><Eye className="w-4 h-4" /> Mostrar Todas</>
            )}
          </button>
        </div>
        <button
          onClick={guardarEnHistorial}
          className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-300 shadow-lg"
        >
          <Download className="w-5 h-5" />
          Guardar en Historial
        </button>
      </div>

      {/* Gráficos de Líneas - Tendencia */}
      <div className="grid lg:grid-cols-1 gap-6 mb-6">
        {datos?.basicas && datos.basicas.length > 0 && (
          <div className="space-y-3">
            <button
              onClick={() => setMostrarBasicas(!mostrarBasicas)}
              className="w-full bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg font-semibold flex items-center justify-between transition-colors duration-300 border-2 border-blue-200 dark:border-blue-800"
            >
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Tendencia - Métricas Básicas
              </span>
              {mostrarBasicas ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {mostrarBasicas && (
              <GraficaLineas 
                titulo="Tendencia - Métricas Básicas" 
                metricas={datos.basicas}
                color="bg-blue-600"
              />
            )}
          </div>
        )}
        
        {datos?.mantenibilidad && datos.mantenibilidad.length > 0 && (
          <div className="space-y-3">
            <button
              onClick={() => setMostrarMantenibilidad(!mostrarMantenibilidad)}
              className="w-full bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-lg font-semibold flex items-center justify-between transition-colors duration-300 border-2 border-green-200 dark:border-green-800"
            >
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Tendencia - Mantenibilidad
              </span>
              {mostrarMantenibilidad ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {mostrarMantenibilidad && (
              <GraficaLineas 
                titulo="Tendencia - Mantenibilidad" 
                metricas={datos.mantenibilidad}
                color="bg-green-600"
              />
            )}
          </div>
        )}
        
        {datos?.confiabilidad && datos.confiabilidad.length > 0 && (
          <div className="space-y-3">
            <button
              onClick={() => setMostrarConfiabilidad(!mostrarConfiabilidad)}
              className="w-full bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-lg font-semibold flex items-center justify-between transition-colors duration-300 border-2 border-red-200 dark:border-red-800"
            >
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Tendencia - Confiabilidad
              </span>
              {mostrarConfiabilidad ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {mostrarConfiabilidad && (
              <GraficaLineas 
                titulo="Tendencia - Confiabilidad" 
                metricas={datos.confiabilidad}
                color="bg-red-600"
              />
            )}
          </div>
        )}
        
        {datos?.eficiencia && datos.eficiencia.length > 0 && (
          <div className="space-y-3">
            <button
              onClick={() => setMostrarEficiencia(!mostrarEficiencia)}
              className="w-full bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-4 py-2 rounded-lg font-semibold flex items-center justify-between transition-colors duration-300 border-2 border-yellow-200 dark:border-yellow-800"
            >
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Tendencia - Eficiencia
              </span>
              {mostrarEficiencia ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {mostrarEficiencia && (
              <GraficaLineas 
                titulo="Tendencia - Eficiencia" 
                metricas={datos.eficiencia}
                color="bg-yellow-600"
              />
            )}
          </div>
        )}
        
        {datos?.calidadEnUso && datos.calidadEnUso.length > 0 && (
          <div className="space-y-3">
            <button
              onClick={() => setMostrarCalidadEnUso(!mostrarCalidadEnUso)}
              className="w-full bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 px-4 py-2 rounded-lg font-semibold flex items-center justify-between transition-colors duration-300 border-2 border-cyan-200 dark:border-cyan-800"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Tendencia - Calidad en Uso (ISO 25022)
              </span>
              {mostrarCalidadEnUso ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {mostrarCalidadEnUso && (
              <GraficaLineas 
                titulo="Tendencia - Calidad en Uso (ISO 25022)" 
                metricas={datos.calidadEnUso}
                color="bg-cyan-600"
              />
            )}
          </div>
        )}
      </div>

      {/* Resumen estadístico */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-700 dark:to-purple-800 text-white rounded-xl shadow-lg p-8 transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <PieChart className="w-8 h-8" />
          Resumen de Calidad
        </h2>
        
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-3xl font-bold mb-2">{estadisticas.total}</div>
            <div className="text-sm text-indigo-100">Métricas Totales</div>
          </div>
          
          <div className="bg-green-500/30 backdrop-blur-sm rounded-lg p-4 text-center border-2 border-green-300">
            <div className="text-3xl font-bold mb-2">{estadisticas.excelentes}</div>
            <div className="text-sm text-green-100">Excelentes</div>
          </div>
          
          <div className="bg-yellow-500/30 backdrop-blur-sm rounded-lg p-4 text-center border-2 border-yellow-300">
            <div className="text-3xl font-bold mb-2">{estadisticas.buenos}</div>
            <div className="text-sm text-yellow-100">Aceptables</div>
          </div>
          
          <div className="bg-red-500/30 backdrop-blur-sm rounded-lg p-4 text-center border-2 border-red-300">
            <div className="text-3xl font-bold mb-2">{estadisticas.mejorables}</div>
            <div className="text-sm text-red-100">Requieren Mejora</div>
          </div>
        </div>

        {/* Barra de progreso general */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progreso de Calidad General</span>
            <span>{((estadisticas.excelentes / estadisticas.total) * 100).toFixed(1)}% Excelente</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
            <div className="h-full flex">
              <div 
                className="bg-green-500 h-full"
                style={{ width: `${(estadisticas.excelentes / estadisticas.total) * 100}%` }}
              />
              <div 
                className="bg-yellow-500 h-full"
                style={{ width: `${(estadisticas.buenos / estadisticas.total) * 100}%` }}
              />
              <div 
                className="bg-red-500 h-full"
                style={{ width: `${(estadisticas.mejorables / estadisticas.total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Vista de historial
  const VistaHistorial = () => (
    <div className="space-y-6">
      {/* Header del historial */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Historial de Métricas
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {historial.length} {historial.length === 1 ? 'registro guardado' : 'registros guardados'}
              </p>
            </div>
          </div>
          
          {historial.length > 0 && (
            <button
              onClick={limpiarHistorial}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-300"
            >
              <Trash2 className="w-4 h-4" />
              Limpiar Todo
            </button>
          )}
        </div>
      </div>

      {/* Lista de registros */}
      {historial.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center border-2 border-dashed border-gray-300 dark:border-gray-600 transition-colors duration-300">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No hay registros en el historial
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Calcula métricas y guárdalas para crear tu historial
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {historial.map((registro) => {
            const estadisticasRegistro = calcularEstadisticasRegistro(registro.resultados);
            
            return (
              <div 
                key={registro.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <Calendar className="w-4 h-4" />
                    {registro.timestamp}
                  </div>
                  <div className="text-2xl font-bold">
                    {Object.keys(registro.resultados).length} Métricas
                  </div>
                </div>

                <div className="p-4">
                  {/* Mini resumen */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-green-700 dark:text-green-300">
                        {estadisticasRegistro.excelentes}
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400">Excelentes</div>
                    </div>
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-yellow-700 dark:text-yellow-300">
                        {estadisticasRegistro.buenos}
                      </div>
                      <div className="text-xs text-yellow-600 dark:text-yellow-400">Aceptables</div>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-red-700 dark:text-red-300">
                        {estadisticasRegistro.mejorables}
                      </div>
                      <div className="text-xs text-red-600 dark:text-red-400">Mejorables</div>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setRegistroSeleccionado(registro)}
                      className="flex-1 bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-800/50 text-indigo-700 dark:text-indigo-300 px-3 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-300"
                    >
                      <Eye className="w-4 h-4" />
                      Ver Detalle
                    </button>
                    <button
                      onClick={() => eliminarRegistro(registro.id)}
                      className="bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-800/50 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg transition-colors duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de detalle de registro */}
      {registroSeleccionado && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Detalle del Registro</h3>
                  <p className="text-indigo-200">{registroSeleccionado.timestamp}</p>
                </div>
                <button
                  onClick={() => setRegistroSeleccionado(null)}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {Object.entries(registroSeleccionado.resultados).map(([key, value]) => {
                const Icono = obtenerIcono(value.interpretacion);
                const color = obtenerColor(value.interpretacion);
                
                return (
                  <div key={key} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`${color} p-1.5 rounded`}>
                            <Icono className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-white capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {value.interpretacion}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {parseFloat(value.valor).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {value.unidad}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Modal de resultados detallados
  const ModalResultados = () => {
    if (!mostrarModalResultados || !categoriaModalSeleccionada) return null;

    const { titulo, metricas, color } = categoriaModalSeleccionada;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in duration-300">
          {/* Header del modal */}
          <div className={`${color} p-6 text-white`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{titulo}</h3>
                  <p className="text-white/80 text-sm mt-1">
                    Análisis detallado de {metricas.length} {metricas.length === 1 ? 'métrica' : 'métricas'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMostrarModalResultados(false);
                  setCategoriaModalSeleccionada(null);
                }}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors backdrop-blur-sm"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Contenido del modal */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Resumen rápido */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                  <Activity className="w-4 h-4" />
                  <span className="text-xs font-semibold">Promedio</span>
                </div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {(metricas.reduce((acc, m) => acc + m.valor, 0) / metricas.length).toFixed(2)}
                </div>
                <div className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1">
                  Valor general
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
                  <ArrowUp className="w-4 h-4" />
                  <span className="text-xs font-semibold">Máximo</span>
                </div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {Math.max(...metricas.map(m => m.valor)).toFixed(2)}
                </div>
                <div className="text-xs text-green-600/70 dark:text-green-400/70 mt-1">
                  Mejor valor
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-2">
                  <ArrowDown className="w-4 h-4" />
                  <span className="text-xs font-semibold">Mínimo</span>
                </div>
                <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                  {Math.min(...metricas.map(m => m.valor)).toFixed(2)}
                </div>
                <div className="text-xs text-orange-600/70 dark:text-orange-400/70 mt-1">
                  Valor más bajo
                </div>
              </div>
            </div>

            {/* Lista detallada de métricas */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Desglose Detallado
              </h4>
              
              {metricas.map((metrica, idx) => {
                const IconoMetrica = obtenerIcono(metrica.interpretacion);
                const colorMetrica = obtenerColor(metrica.interpretacion);
                
                return (
                  <div 
                    key={idx}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`${colorMetrica} p-2.5 rounded-lg`}>
                          <IconoMetrica className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-900 dark:text-white text-base">
                            {metrica.nombre.replace(/([A-Z])/g, ' $1').trim()}
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400 italic mt-1">
                            {metrica.interpretacion}
                          </p>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className={`text-3xl font-bold ${colorMetrica.replace('bg-', 'text-')}`}>
                          {metrica.valor.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          {metrica.unidad}
                        </div>
                      </div>
                    </div>

                    {/* Barra de progreso en el modal */}
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden mb-3">
                      <div 
                        className={`${colorMetrica} h-full rounded-full transition-all duration-700`}
                        style={{ 
                          width: `${Math.min(metrica.unidad === '%' ? metrica.valor : (metrica.valor / Math.max(...metricas.map(m => m.valor))) * 100, 100)}%` 
                        }}
                      />
                    </div>

                    {/* Recomendaciones */}
                    <div className="space-y-2 mt-3">
                      {obtenerRecomendaciones(metrica.nombre, metrica.interpretacion).map((rec, recIdx) => (
                        <div 
                          key={recIdx}
                          className={`flex items-start gap-2 text-xs p-3 rounded-lg ${
                            rec.tipo === 'exito' 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800' 
                              : rec.tipo === 'critico'
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                              : rec.tipo === 'mejora'
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800'
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                          }`}
                        >
                          <rec.icono className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span className="font-medium">{rec.texto}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer del modal */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 border-t border-gray-200 dark:border-gray-600 flex justify-end gap-3">
            <button
              onClick={() => {
                setMostrarModalResultados(false);
                setCategoriaModalSeleccionada(null);
              }}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-lg font-semibold transition-colors duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Calcular estadísticas para un registro específico
  const calcularEstadisticasRegistro = (resultados) => {
    let excelentes = 0;
    let buenos = 0;
    let mejorables = 0;

    Object.values(resultados).forEach(metrica => {
      const texto = metrica.interpretacion?.toLowerCase() || '';
      if (texto.includes('excelente') || texto.includes('muy bien') || texto.includes('alta')) {
        excelentes++;
      } else if (texto.includes('bueno') || texto.includes('aceptable') || texto.includes('moderado')) {
        buenos++;
      } else {
        mejorables++;
      }
    });

    return { excelentes, buenos, mejorables };
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Navegación de pestañas */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 mb-6 flex gap-2 transition-colors duration-300">
        <button
          onClick={() => setVistaActual('graficas')}
          className={`flex-1 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
            vistaActual === 'graficas'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          Gráficas y Análisis
        </button>
        
        <button
          onClick={() => setVistaActual('historial')}
          className={`flex-1 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
            vistaActual === 'historial'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <Calendar className="w-5 h-5" />
          Historial
          {historial.length > 0 && (
            <span className="bg-white text-indigo-600 dark:bg-gray-800 dark:text-indigo-400 text-xs font-bold px-2 py-1 rounded-full">
              {historial.length}
            </span>
          )}
        </button>
      </div>

      {/* Contenido según vista */}
      {!resultadosCalculados || Object.keys(resultadosCalculados).length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center border-2 border-dashed border-gray-300 dark:border-gray-600 transition-colors duration-300">
          <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No hay datos para mostrar
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Calcula métricas en cualquier categoría para ver las gráficas
          </p>
          
          {/* Instrucciones */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4 max-w-md mx-auto">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">📋 Pasos para generar gráficas:</h4>
            <ol className="text-left text-sm text-blue-800 dark:text-blue-300 space-y-1">
              <li>1️⃣ Ve a <strong>Métricas Básicas</strong>, <strong>Mantenibilidad</strong>, <strong>Confiabilidad</strong> o <strong>Eficiencia</strong></li>
              <li>2️⃣ Ingresa los valores y haz clic en <strong>"Calcular Métricas"</strong></li>
              <li>3️⃣ Regresa a <strong>Gráficas</strong> para ver los resultados visualizados</li>
            </ol>
          </div>
          
          {historial.length > 0 && (
            <button
              onClick={() => setVistaActual('historial')}
              className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors duration-300"
            >
              <Calendar className="w-5 h-5" />
              Ver Historial ({historial.length} {historial.length === 1 ? 'registro' : 'registros'})
            </button>
          )}
        </div>
      ) : (
        vistaActual === 'graficas' ? <VistaGraficas /> : <VistaHistorial />
      )}

      {/* Modal de resultados */}
      <ModalResultados />
    </div>
  );
};

export default Graficas;
