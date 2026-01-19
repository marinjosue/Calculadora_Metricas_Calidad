import React, { useState, useContext, useEffect } from 'react';
import { CheckCircle, TrendingUp, AlertCircle, Users, Shield, BarChart3, LineChart } from 'lucide-react';
import { MetricasContext } from '../App';

const CalidadEnUso = ({ onCalculate }) => {
  const { metricasGlobales } = useContext(MetricasContext);
  const [modoOscuro] = useState(() => {
    const guardado = localStorage.getItem('modoOscuro');
    return guardado ? JSON.parse(guardado) : false;
  });
  const [mostrarBotonGraficas, setMostrarBotonGraficas] = useState(false);

  const [formData, setFormData] = useState({
    // Efectividad
    tareasExitosas: '',
    totalTareas: '',
    // Eficiencia
    tiempoBenchmark: '',
    tiempoReal: '',
    // Satisfacción (NPS)
    promotores: '',
    detractores: '',
    totalEncuestados: '',
    // Libertad de Riesgo
    erroresImpacto: '',
    totalTransacciones: '',
    // Cobertura de Contexto
    contextosExitosos: '',
    contextosEvaluados: ''
  });

  useEffect(() => {
    if (metricasGlobales) {
      setFormData(prev => ({
        ...prev,
        ...metricasGlobales
      }));
    }
  }, [metricasGlobales]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const efectividad = (parseFloat(formData.tareasExitosas) / parseFloat(formData.totalTareas)) * 100;
    
    const eficienciaRelativa = (parseFloat(formData.tiempoBenchmark) / parseFloat(formData.tiempoReal)) * 100;
    
    const pctPromotores = (parseFloat(formData.promotores) / parseFloat(formData.totalEncuestados)) * 100;
    const pctDetractores = (parseFloat(formData.detractores) / parseFloat(formData.totalEncuestados)) * 100;
    const nps = pctPromotores - pctDetractores;
    
    const riesgoEconomico = (parseFloat(formData.erroresImpacto) / parseFloat(formData.totalTransacciones)) * 100;
    
    const cobertura = (parseFloat(formData.contextosExitosos) / parseFloat(formData.contextosEvaluados)) * 100;

    const resultados = {
      categoria: 'Calidad en Uso (ISO 25022)',
      metricas: [
        {
          nombre: 'Efectividad',
          valor: efectividad.toFixed(2),
          unidad: '%',
          descripcion: 'Grado en que usuarios completan tareas correctamente',
          formula: '(Tareas exitosas / Total de tareas) × 100',
          interpretacion: efectividad >= 95 ? 'Excelente' : efectividad >= 80 ? 'Bueno' : efectividad >= 60 ? 'Aceptable' : 'Bajo'
        },
        {
          nombre: 'Eficiencia Relativa',
          valor: eficienciaRelativa.toFixed(2),
          unidad: '%',
          descripcion: 'Relación tiempo real vs benchmark',
          formula: '(Tiempo benchmark / Tiempo real) × 100',
          interpretacion: eficienciaRelativa >= 100 ? 'Mejor al benchmark' : eficienciaRelativa >= 80 ? 'Bueno' : 'Requiere optimización'
        },
        {
          nombre: 'NPS (Net Promoter Score)',
          valor: nps.toFixed(2),
          unidad: 'puntos',
          descripcion: 'Satisfacción del usuario',
          formula: '% Promotores - % Detractores',
          interpretacion: nps >= 50 ? 'Excelente' : nps >= 20 ? 'Bueno' : nps >= 0 ? 'Aceptable' : 'Crítico',
          detalles: {
            pctPromotores: pctPromotores.toFixed(2),
            pctDetractores: pctDetractores.toFixed(2)
          }
        },
        {
          nombre: 'Riesgo Económico',
          valor: riesgoEconomico.toFixed(2),
          unidad: '%',
          descripcion: 'Errores con impacto respecto al total',
          formula: '(Errores con impacto / Total transacciones) × 100',
          interpretacion: riesgoEconomico <= 1 ? 'Bajo' : riesgoEconomico <= 5 ? 'Moderado' : 'Alto'
        },
        {
          nombre: 'Cobertura de Contexto',
          valor: cobertura.toFixed(2),
          unidad: '%',
          descripcion: 'Porcentaje de contextos cubiertos exitosamente',
          formula: '(Contextos exitosos / Contextos evaluados) × 100',
          interpretacion: cobertura >= 90 ? 'Excelente' : cobertura >= 75 ? 'Bueno' : cobertura >= 60 ? 'Aceptable' : 'Bajo'
        }
      ]
    };

    onCalculate(resultados);
    setMostrarBotonGraficas(true);
    
    // Scroll al top para que el usuario vea el mensaje
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ejemplosRapidos = [
    {
      nombre: 'Sistema Web Típico',
      datos: {
        tareasExitosas: '95',
        totalTareas: '100',
        tiempoBenchmark: '5',
        tiempoReal: '4.2',
        promotores: '60',
        detractores: '10',
        totalEncuestados: '100',
        erroresImpacto: '2',
        totalTransacciones: '1000',
        contextosExitosos: '18',
        contextosEvaluados: '20'
      }
    },
    {
      nombre: 'Aplicación Crítica',
      datos: {
        tareasExitosas: '99',
        totalTareas: '100',
        tiempoBenchmark: '3',
        tiempoReal: '3.1',
        promotores: '85',
        detractores: '3',
        totalEncuestados: '100',
        erroresImpacto: '0',
        totalTransacciones: '5000',
        contextosExitosos: '20',
        contextosEvaluados: '20'
      }
    },
    {
      nombre: 'App Móvil en Desarrollo',
      datos: {
        tareasExitosas: '78',
        totalTareas: '100',
        tiempoBenchmark: '2.5',
        tiempoReal: '3.8',
        promotores: '35',
        detractores: '25',
        totalEncuestados: '100',
        erroresImpacto: '12',
        totalTransacciones: '500',
        contextosExitosos: '12',
        contextosEvaluados: '20'
      }
    }
  ];

  return (
    <div className={`space-y-6 ${modoOscuro ? 'text-white' : 'text-gray-900'}`}>
      {/* Encabezado */}
      <div className={`rounded-xl p-6 border-l-4 border-cyan-500 ${
        modoOscuro ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-r from-cyan-50 to-blue-50'
      }`}>
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-lg flex-shrink-0">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Calidad en Uso - ISO/IEC 25022</h2>
            <p className={`text-sm ${modoOscuro ? 'text-gray-300' : 'text-gray-600'}`}>
              Mide la percepción del usuario sobre la calidad del software mediante 5 dimensiones clave
            </p>
          </div>
        </div>
      </div>

      {/* Banner de éxito con botón a Gráficas */}
      {mostrarBotonGraficas && (
        <div className={`rounded-xl p-6 border-l-4 border-green-500 ${
          modoOscuro ? 'bg-green-900/20 border-green-700' : 'bg-green-50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="text-lg font-bold text-green-800 dark:text-green-300">
                  ¡Métricas Calculadas Exitosamente!
                </h3>
                <p className={`text-sm ${modoOscuro ? 'text-green-200' : 'text-green-700'}`}>
                  Tus resultados están listos. Visualízalos en gráficas para un mejor análisis.
                </p>
              </div>
            </div>
            <a
              href="#graficas"
              onClick={(e) => {
                e.preventDefault();
                // Cambiar a la pestaña de gráficas
                const botonGraficas = document.querySelector('[data-categoria="graficas"]');
                if (botonGraficas) botonGraficas.click();
              }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
            >
              <LineChart className="w-5 h-5" />
              Ver en Gráficas
            </a>
          </div>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className={`rounded-xl border p-6 shadow-sm ${
        modoOscuro 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        
        {/* 1. Efectividad */}
        <div className="mb-8 pb-8 border-b border-gray-300 dark:border-gray-600">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold">1. Efectividad</h3>
          </div>
          <p className={`text-xs mb-4 ${modoOscuro ? 'text-gray-400' : 'text-gray-500'}`}>
            Grado en que los usuarios logran completar sus tareas de forma correcta y completa
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
                Tareas Completadas con Éxito
              </label>
              <input
                type="number"
                step="0.01"
                name="tareasExitosas"
                value={formData.tareasExitosas}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  modoOscuro
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                placeholder="Ej: 95"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
                Total de Tareas Intentadas
              </label>
              <input
                type="number"
                step="0.01"
                name="totalTareas"
                value={formData.totalTareas}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  modoOscuro
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                placeholder="Ej: 100"
              />
            </div>
          </div>
        </div>

        {/* 2. Eficiencia */}
        <div className="mb-8 pb-8 border-b border-gray-300 dark:border-gray-600">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">2. Eficiencia (Temporal)</h3>
          </div>
          <p className={`text-xs mb-4 ${modoOscuro ? 'text-gray-400' : 'text-gray-500'}`}>
            Relación entre recursos utilizados y resultados obtenidos
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
                Tiempo Benchmark (segundos)
              </label>
              <input
                type="number"
                step="0.01"
                name="tiempoBenchmark"
                value={formData.tiempoBenchmark}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  modoOscuro
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Ej: 5"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
                Tiempo Real (segundos)
              </label>
              <input
                type="number"
                step="0.01"
                name="tiempoReal"
                value={formData.tiempoReal}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  modoOscuro
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Ej: 4.2"
              />
            </div>
          </div>
        </div>

        {/* 3. Satisfacción (NPS) */}
        <div className="mb-8 pb-8 border-b border-gray-300 dark:border-gray-600">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold">3. Satisfacción (NPS)</h3>
          </div>
          <p className={`text-xs mb-4 ${modoOscuro ? 'text-gray-400' : 'text-gray-500'}`}>
            Net Promoter Score - Medida de satisfacción y lealtad del usuario
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
                Promotores (9-10)
              </label>
              <input
                type="number"
                step="0.01"
                name="promotores"
                value={formData.promotores}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  modoOscuro
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder="Ej: 60"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
                Detractores (0-6)
              </label>
              <input
                type="number"
                step="0.01"
                name="detractores"
                value={formData.detractores}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  modoOscuro
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder="Ej: 10"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
                Total Encuestados
              </label>
              <input
                type="number"
                step="0.01"
                name="totalEncuestados"
                value={formData.totalEncuestados}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  modoOscuro
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder="Ej: 100"
              />
            </div>
          </div>
        </div>

        {/* 4. Libertad de Riesgo */}
        <div className="mb-8 pb-8 border-b border-gray-300 dark:border-gray-600">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-semibold">4. Libertad de Riesgo</h3>
          </div>
          <p className={`text-xs mb-4 ${modoOscuro ? 'text-gray-400' : 'text-gray-500'}`}>
            Capacidad del software de proteger datos y evitar daños económicos
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
                Errores con Impacto Económico
              </label>
              <input
                type="number"
                step="0.01"
                name="erroresImpacto"
                value={formData.erroresImpacto}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  modoOscuro
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                placeholder="Ej: 2"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
                Total de Transacciones
              </label>
              <input
                type="number"
                step="0.01"
                name="totalTransacciones"
                value={formData.totalTransacciones}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  modoOscuro
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                placeholder="Ej: 1000"
              />
            </div>
          </div>
        </div>

        {/* 5. Cobertura de Contexto */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-semibold">5. Cobertura de Contexto</h3>
          </div>
          <p className={`text-xs mb-4 ${modoOscuro ? 'text-gray-400' : 'text-gray-500'}`}>
            Alcance de los contextos de uso cubiertos exitosamente
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
                Contextos Cubiertos con Éxito
              </label>
              <input
                type="number"
                step="0.01"
                name="contextosExitosos"
                value={formData.contextosExitosos}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  modoOscuro
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                placeholder="Ej: 18"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
                Total Contextos Evaluados
              </label>
              <input
                type="number"
                step="0.01"
                name="contextosEvaluados"
                value={formData.contextosEvaluados}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  modoOscuro
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                placeholder="Ej: 20"
              />
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Calcular Métricas
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({
                tareasExitosas: '',
                totalTareas: '',
                tiempoBenchmark: '',
                tiempoReal: '',
                promotores: '',
                detractores: '',
                totalEncuestados: '',
                erroresImpacto: '',
                totalTransacciones: '',
                contextosExitosos: '',
                contextosEvaluados: ''
              });
            }}
            className={`px-6 py-3 rounded-lg font-semibold transition-all border ${
              modoOscuro
                ? 'bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
          >
            Limpiar
          </button>
        </div>
      </form>

      {/* Ejemplos Rápidos */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 mb-4 border-2 border-amber-200">
        <div className="flex items-center mb-3">
          <CheckCircle className="mr-2 text-amber-600" size={20} />
          <h4 className="font-semibold text-gray-800">Ejemplos Rápidos</h4>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Haz clic en un ejemplo para cargar valores automáticamente:
        </p>
        <div className="flex flex-wrap gap-2">
          {ejemplosRapidos.map((ejemplo, idx) => (
            <button
              key={idx}
              onClick={() => setFormData(ejemplo.datos)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition duration-200 shadow-sm"
            >
              {ejemplo.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* Información ISO 25022 */}
      <div className={`rounded-xl border p-6 shadow-sm ${
        modoOscuro 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
      }`}>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Acerca de ISO/IEC 25022
        </h3>
        <p className={`text-sm mb-3 ${modoOscuro ? 'text-gray-300' : 'text-gray-600'}`}>
          ISO/IEC 25022 define un modelo de medición para evaluar la <strong>Calidad en Uso</strong> desde la perspectiva del usuario. 
          Mide cómo el software logra los objetivos especificados en contextos reales.
        </p>
        <div className={`text-xs grid grid-cols-1 md:grid-cols-2 gap-3 ${modoOscuro ? 'text-gray-400' : 'text-gray-600'}`}>
          <div>• <strong>Efectividad:</strong> Completitud y precisión de objetivos</div>
          <div>• <strong>Eficiencia:</strong> Recursos gastados respecto a resultados</div>
          <div>• <strong>Satisfacción:</strong> Agrado del usuario con el producto</div>
          <div>• <strong>Libertad de Riesgo:</strong> Protección de datos y daños</div>
          <div>• <strong>Cobertura:</strong> Contextos de uso cubiertos</div>
        </div>
      </div>
    </div>
  );
};

export default CalidadEnUso;
