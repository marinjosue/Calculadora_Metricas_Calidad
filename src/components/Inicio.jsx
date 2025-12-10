import React from 'react';
import { 
  Calculator, 
  Shield, 
  Wrench, 
  Zap, 
  TrendingUp, 
  FileCode, 
  CheckCircle, 
  ArrowRight,
  Target,
  BookOpen,
  Code2,
  FileJson
} from 'lucide-react';

const Inicio = () => {
  const metricas = [
    {
      categoria: 'Métricas Básicas',
      icono: Calculator,
      color: 'blue',
      descripcion: 'Métricas fundamentales para evaluar la calidad del código',
      formulas: [
        {
          nombre: 'Densidad de Comentarios',
          formula: '(Comentarios / LOC) × 100',
          descripcion: 'Mide el porcentaje de código documentado'
        },
        {
          nombre: 'Densidad de Defectos',
          formula: 'Defectos / (LOC / 1000)',
          descripcion: 'Defectos encontrados por cada 1000 líneas de código'
        },
        {
          nombre: 'Productividad',
          formula: 'LOC / Tiempo (horas)',
          descripcion: 'Líneas de código producidas por hora'
        }
      ]
    },
    {
      categoria: 'Mantenibilidad',
      icono: Wrench,
      color: 'green',
      descripcion: 'Evalúa qué tan fácil es mantener y modificar el código',
      formulas: [
        {
          nombre: 'Índice de Mantenibilidad',
          formula: '171 - 5.2×ln(HV) - 0.23×CC - 16.2×ln(LOC)',
          descripcion: 'Índice general de facilidad de mantenimiento (0-100)'
        },
        {
          nombre: 'Complejidad Ciclomática',
          formula: 'E - N + 2P',
          descripcion: 'Mide la complejidad del flujo de control del programa'
        },
        {
          nombre: 'Acoplamiento',
          formula: 'Dependencias / Total de Módulos',
          descripcion: 'Nivel de interdependencia entre componentes'
        }
      ]
    },
    {
      categoria: 'Confiabilidad',
      icono: Shield,
      color: 'red',
      descripcion: 'Mide la capacidad del software para funcionar sin fallos',
      formulas: [
        {
          nombre: 'Tasa de Fallos',
          formula: 'Fallos / Total de Ejecuciones',
          descripcion: 'Proporción de ejecuciones que resultan en fallo'
        },
        {
          nombre: 'MTBF (Tiempo Medio Entre Fallos)',
          formula: 'Tiempo Total / Número de Fallos',
          descripcion: 'Tiempo promedio de operación sin fallos'
        },
        {
          nombre: 'Cobertura de Pruebas',
          formula: '(Líneas Probadas / Líneas Totales) × 100',
          descripcion: 'Porcentaje de código cubierto por pruebas'
        }
      ]
    },
    {
      categoria: 'Eficiencia',
      icono: Zap,
      color: 'yellow',
      descripcion: 'Evalúa el rendimiento y uso óptimo de recursos',
      formulas: [
        {
          nombre: 'Tiempo de Respuesta',
          formula: 'Tiempo Total / Número de Operaciones',
          descripcion: 'Tiempo promedio para completar una operación'
        },
        {
          nombre: 'Throughput',
          formula: 'Operaciones / Tiempo',
          descripcion: 'Número de operaciones procesadas por unidad de tiempo'
        },
        {
          nombre: 'Uso de Memoria',
          formula: '(Memoria Usada / Memoria Total) × 100',
          descripcion: 'Porcentaje de memoria utilizada'
        }
      ]
    }
  ];

  const funcionalidades = [
    {
      titulo: 'Cálculo de Métricas',
      descripcion: 'Calcula automáticamente métricas de calidad ingresando datos manualmente',
      icono: Calculator
    },
    {
      titulo: 'Importación desde SonarQube',
      descripcion: 'Importa reportes en formato JSON, CSV o archivos de texto',
      icono: FileJson
    },
    {
      titulo: 'Procesamiento de Archivos .pb',
      descripcion: 'Extrae métricas de archivos Protocol Buffer de SonarQube',
      icono: FileCode
    },
    {
      titulo: 'Ejemplos Rápidos',
      descripcion: 'Carga ejemplos predefinidos para aprender y probar',
      icono: Zap
    },
    {
      titulo: 'Guías Interactivas',
      descripcion: 'Aprende cómo obtener cada métrica con ejemplos prácticos',
      icono: BookOpen
    },
    {
      titulo: 'Interpretación de Resultados',
      descripcion: 'Obtén análisis automático de los resultados calculados',
      icono: TrendingUp
    }
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-700',
      text: 'text-blue-900 dark:text-blue-100',
      accent: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-800',
      iconText: 'text-blue-600 dark:text-blue-300',
      cardBg: 'bg-white dark:bg-gray-800'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-700',
      text: 'text-green-900 dark:text-green-100',
      accent: 'text-green-600 dark:text-green-400',
      iconBg: 'bg-green-100 dark:bg-green-800',
      iconText: 'text-green-600 dark:text-green-300',
      cardBg: 'bg-white dark:bg-gray-800'
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-700',
      text: 'text-red-900 dark:text-red-100',
      accent: 'text-red-600 dark:text-red-400',
      iconBg: 'bg-red-100 dark:bg-red-800',
      iconText: 'text-red-600 dark:text-red-300',
      cardBg: 'bg-white dark:bg-gray-800'
    },
    yellow: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-700',
      text: 'text-yellow-900 dark:text-yellow-100',
      accent: 'text-yellow-600 dark:text-yellow-400',
      iconBg: 'bg-yellow-100 dark:bg-yellow-800',
      iconText: 'text-yellow-600 dark:text-yellow-300',
      cardBg: 'bg-white dark:bg-gray-800'
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 text-white rounded-xl shadow-lg p-12 mb-8 transition-colors duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-white/20 dark:bg-white/30 p-4 rounded-lg backdrop-blur-sm transition-colors duration-300">
            <Target className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">Calculadora de Métricas de Calidad de Software</h1>
            <p className="text-blue-100 dark:text-blue-200 text-lg transition-colors duration-300">
              Sistema profesional para evaluar y medir la calidad de software mediante métricas estándar
            </p>
          </div>
        </div>
      </div>

      {/* ¿Qué es la Calidad de Software? */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg transition-colors duration-300">
            <Code2 className="w-7 h-7 text-indigo-600 dark:text-indigo-300" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300">¿Qué es la Calidad de Software?</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              La <strong className="text-gray-900 dark:text-white">calidad de software</strong> es el grado en que un sistema cumple con los requisitos 
              funcionales y no funcionales establecidos, satisfaciendo las necesidades y expectativas del usuario.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              Se mide a través de características específicas definidas por estándares internacionales 
              como <strong className="text-gray-900 dark:text-white">ISO/IEC 25010</strong>, que incluyen funcionalidad, confiabilidad, usabilidad, 
              eficiencia, mantenibilidad y portabilidad.
            </p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-6 rounded-lg border border-indigo-200 dark:border-indigo-700 transition-colors duration-300">
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-4 text-lg transition-colors duration-300">Beneficios de Medir la Calidad:</h3>
            <ul className="space-y-3">
              {[
                'Identificación temprana de problemas',
                'Reducción de costos de mantenimiento',
                'Mejora en la satisfacción del usuario',
                'Código más mantenible y escalable',
                'Decisiones basadas en datos objetivos'
              ].map((beneficio, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5 transition-colors duration-300" />
                  <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{beneficio}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Categorías de Métricas */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 transition-colors duration-300">
          <Calculator className="w-8 h-8 text-gray-900 dark:text-white transition-colors duration-300" />
          Métricas Implementadas
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {metricas.map((metrica, idx) => {
            const Icono = metrica.icono;
            const colors = colorClasses[metrica.color];
            
            return (
              <div 
                key={idx} 
                className={`${colors.cardBg} border-2 ${colors.border} rounded-xl p-6 hover:shadow-2xl transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${colors.iconBg} p-3 rounded-lg transition-colors duration-300`}>
                    <Icono className={`w-6 h-6 ${colors.iconText} transition-colors duration-300`} />
                  </div>
                  <h3 className={`text-xl font-bold ${colors.text} transition-colors duration-300`}>
                    {metrica.categoria}
                  </h3>
                </div>
                
                <p className={`${colors.text} mb-4 text-sm transition-colors duration-300`}>
                  {metrica.descripcion}
                </p>
                
                <div className="space-y-3">
                  {metrica.formulas.map((formula, fIdx) => (
                    <div key={fIdx} className="bg-gray-600 dark:bg-gray-700/50 rounded-lg p-4 border-2 border-gray-500 dark:border-gray-600 hover:border-gray-600 dark:hover:border-gray-500 transition-all duration-300 shadow-sm hover:shadow-md">
                      <div className="font-semibold text-white dark:text-gray-100 text-sm mb-2 transition-colors duration-300">
                        {formula.nombre}
                      </div>
                      <div className="bg-gray-800 dark:bg-gray-900 px-3 py-2 rounded-md mb-3 border border-gray-700 dark:border-gray-600 transition-colors duration-300">
                        <code className={`text-sm ${colors.accent} font-mono font-bold transition-colors duration-300`}>
                          {formula.formula}
                        </code>
                      </div>
                      <p className="text-xs text-gray-200 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                        {formula.descripcion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Funcionalidades del Sistema */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3 transition-colors duration-300">
          <Zap className="w-8 h-8 text-yellow-600 dark:text-yellow-400 transition-colors duration-300" />
          Funcionalidades del Sistema
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {funcionalidades.map((func, idx) => {
            const Icono = func.icono;
            return (
              <div 
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-5 hover:shadow-md transition-all hover:border-indigo-300 dark:hover:border-indigo-500 duration-300"
              >
                <div className="bg-indigo-100 dark:bg-indigo-900 w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-colors duration-300">
                  <Icono className="w-6 h-6 text-indigo-600 dark:text-indigo-300 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">
                  {func.titulo}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  {func.descripcion}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cómo Usar */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-700 dark:to-purple-800 text-white rounded-xl shadow-lg p-8 transition-colors duration-300">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <BookOpen className="w-8 h-8" />
          Cómo Usar Este Sistema
        </h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              numero: '1',
              titulo: 'Selecciona',
              descripcion: 'Elige la categoría de métricas que deseas calcular'
            },
            {
              numero: '2',
              titulo: 'Ingresa Datos',
              descripcion: 'Proporciona los valores manualmente o importa desde SonarQube'
            },
            {
              numero: '3',
              titulo: 'Calcula',
              descripcion: 'El sistema procesará y calculará automáticamente las métricas'
            },
            {
              numero: '4',
              titulo: 'Analiza',
              descripcion: 'Revisa los resultados e interpretaciones generadas'
            }
          ].map((paso, idx) => (
            <div key={idx} className="text-center">
              <div className="bg-white/20 dark:bg-white/30 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 border-2 border-white/40 dark:border-white/50 transition-colors duration-300">
                {paso.numero}
              </div>
              <h3 className="font-semibold text-lg mb-2">{paso.titulo}</h3>
              <p className="text-indigo-100 dark:text-indigo-200 text-sm transition-colors duration-300">{paso.descripcion}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 dark:border-white/30 text-center transition-colors duration-300">
          <p className="text-indigo-100 dark:text-indigo-200 mb-4 transition-colors duration-300">
            Selecciona una categoría en el menú superior para comenzar
          </p>
          <div className="flex items-center justify-center gap-2 text-white font-semibold">
            <span>Comienza ahora</span>
            <ArrowRight className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
