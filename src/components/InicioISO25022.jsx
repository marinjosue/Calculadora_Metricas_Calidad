import React, { useState } from 'react';
import { Users, TrendingUp, BarChart3, Shield, AlertCircle, CheckCircle, BookOpen, Calculator } from 'lucide-react';

const InicioISO25022 = () => {
  const [modoOscuro] = useState(() => {
    const guardado = localStorage.getItem('modoOscuro');
    return guardado ? JSON.parse(guardado) : false;
  });

  return (
    <div className={`space-y-6 ${modoOscuro ? 'text-white' : 'text-gray-900'}`}>
      {/* Encabezado Principal */}
      <div className={`rounded-2xl p-8 border-l-4 border-cyan-500 ${
        modoOscuro ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50'
      }`}>
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-4 rounded-xl flex-shrink-0 shadow-lg">
            <Users className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3">ISO/IEC 25022 - Calidad en Uso</h1>
            <p className={`text-lg mb-4 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
              Medición de la calidad desde la perspectiva del usuario final
            </p>
            <p className={`text-sm ${modoOscuro ? 'text-gray-400' : 'text-gray-600'}`}>
              Esta norma internacional define un modelo de medición para evaluar cómo el software logra los objetivos 
              especificados en contextos reales de uso. Se enfoca en la experiencia del usuario y los resultados obtenidos.
            </p>
          </div>
        </div>
      </div>

      {/* ¿Qué es ISO 25022? */}
      <div className={`rounded-xl border p-6 ${
        modoOscuro 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-cyan-500" />
          <h2 className="text-2xl font-bold">¿Qué es la Calidad en Uso?</h2>
        </div>
        <p className={`mb-4 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
          La <strong>Calidad en Uso</strong> mide el grado en que un producto de software puede ser usado por usuarios 
          específicos para alcanzar metas específicas con efectividad, eficiencia, satisfacción y libertad de riesgo 
          en contextos de uso específicos.
        </p>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 rounded-lg ${
          modoOscuro ? 'bg-gray-700/50' : 'bg-cyan-50'
        }`}>
          <div>
            <h3 className="font-semibold text-cyan-600 dark:text-cyan-400 mb-2">Diferencia clave:</h3>
            <ul className={`text-sm space-y-1 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>• <strong>ISO 25010:</strong> Calidad del producto (código, arquitectura)</li>
              <li>• <strong>ISO 25022:</strong> Calidad en uso (experiencia del usuario)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-cyan-600 dark:text-cyan-400 mb-2">Perspectiva:</h3>
            <ul className={`text-sm space-y-1 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>• Medida desde el punto de vista del <strong>usuario final</strong></li>
              <li>• Evalúa <strong>resultados reales</strong> en escenarios de uso</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Las 5 Dimensiones de Calidad en Uso */}
      <div className={`rounded-xl border p-6 ${
        modoOscuro 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-blue-600" />
          Las 5 Dimensiones y sus Fórmulas
        </h2>

        <div className="space-y-6">
          {/* 1. Efectividad */}
          <div className={`p-5 rounded-lg border-l-4 border-green-500 ${
            modoOscuro ? 'bg-gray-700/50' : 'bg-green-50'
          }`}>
            <div className="flex items-start gap-3 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-2">
                  1. Efectividad (Effectiveness)
                </h3>
                <p className={`text-sm mb-3 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
                  Grado en que los usuarios logran completar sus tareas de forma correcta y completa.
                </p>
                <div className={`p-3 rounded-lg font-mono text-sm ${
                  modoOscuro ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <strong>Fórmula:</strong> Efectividad (%) = (Tareas exitosas / Total de tareas) × 100
                </div>
                <div className="mt-2 text-sm">
                  <strong className="text-green-600 dark:text-green-400">Rango óptimo:</strong>
                  <span className={modoOscuro ? 'text-gray-300' : 'text-gray-700'}> ≥ 95% (Excelente) | ≥ 80% (Bueno) | ≥ 60% (Aceptable)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Eficiencia */}
          <div className={`p-5 rounded-lg border-l-4 border-blue-500 ${
            modoOscuro ? 'bg-gray-700/50' : 'bg-blue-50'
          }`}>
            <div className="flex items-start gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">
                  2. Eficiencia (Efficiency)
                </h3>
                <p className={`text-sm mb-3 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
                  Relación entre los recursos utilizados (tiempo, esfuerzo) y los resultados obtenidos.
                </p>
                <div className={`p-3 rounded-lg font-mono text-sm ${
                  modoOscuro ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <strong>Fórmula:</strong> Eficiencia (%) = (Tiempo benchmark / Tiempo real) × 100
                </div>
                <div className="mt-2 text-sm">
                  <strong className="text-blue-600 dark:text-blue-400">Rango óptimo:</strong>
                  <span className={modoOscuro ? 'text-gray-300' : 'text-gray-700'}> ≥ 100% (Mejor que benchmark) | ≥ 80% (Bueno)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Satisfacción (NPS) */}
          <div className={`p-5 rounded-lg border-l-4 border-purple-500 ${
            modoOscuro ? 'bg-gray-700/50' : 'bg-purple-50'
          }`}>
            <div className="flex items-start gap-3 mb-3">
              <BarChart3 className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 mb-2">
                  3. Satisfacción - NPS (Satisfaction)
                </h3>
                <p className={`text-sm mb-3 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
                  Net Promoter Score - Medida de satisfacción y lealtad del usuario con el producto.
                </p>
                <div className={`p-3 rounded-lg font-mono text-sm ${
                  modoOscuro ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <strong>Fórmula:</strong> NPS = % Promotores (9-10) − % Detractores (0-6)
                </div>
                <div className="mt-2 text-sm">
                  <strong className="text-purple-600 dark:text-purple-400">Rango óptimo:</strong>
                  <span className={modoOscuro ? 'text-gray-300' : 'text-gray-700'}> ≥ 50 (Excelente) | ≥ 20 (Bueno) | ≥ 0 (Aceptable)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Libertad de Riesgo */}
          <div className={`p-5 rounded-lg border-l-4 border-red-500 ${
            modoOscuro ? 'bg-gray-700/50' : 'bg-red-50'
          }`}>
            <div className="flex items-start gap-3 mb-3">
              <Shield className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">
                  4. Libertad de Riesgo (Freedom from Risk)
                </h3>
                <p className={`text-sm mb-3 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
                  Capacidad del software para proteger datos, evitar daños económicos y mitigar riesgos.
                </p>
                <div className={`p-3 rounded-lg font-mono text-sm ${
                  modoOscuro ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <strong>Fórmula:</strong> Riesgo (%) = (Errores con impacto / Total transacciones) × 100
                </div>
                <div className="mt-2 text-sm">
                  <strong className="text-red-600 dark:text-red-400">Rango óptimo:</strong>
                  <span className={modoOscuro ? 'text-gray-300' : 'text-gray-700'}> ≤ 1% (Bajo) | ≤ 5% (Moderado) | &gt; 5% (Alto)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Cobertura de Contexto */}
          <div className={`p-5 rounded-lg border-l-4 border-orange-500 ${
            modoOscuro ? 'bg-gray-700/50' : 'bg-orange-50'
          }`}>
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-orange-700 dark:text-orange-400 mb-2">
                  5. Cobertura de Contexto (Context Coverage)
                </h3>
                <p className={`text-sm mb-3 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
                  Alcance de los contextos de uso (escenarios, dispositivos, condiciones) cubiertos exitosamente.
                </p>
                <div className={`p-3 rounded-lg font-mono text-sm ${
                  modoOscuro ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <strong>Fórmula:</strong> Cobertura (%) = (Contextos exitosos / Contextos evaluados) × 100
                </div>
                <div className="mt-2 text-sm">
                  <strong className="text-orange-600 dark:text-orange-400">Rango óptimo:</strong>
                  <span className={modoOscuro ? 'text-gray-300' : 'text-gray-700'}> ≥ 90% (Excelente) | ≥ 75% (Bueno) | ≥ 60% (Aceptable)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interpretación de Resultados */}
      <div className={`rounded-xl border p-6 ${
        modoOscuro 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'
      }`}>
        <h2 className="text-2xl font-bold mb-4">📊 Interpretación de Resultados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-2 text-green-600 dark:text-green-400">✅ Resultados Positivos</h3>
            <ul className={`text-sm space-y-1 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>• Alta efectividad indica tareas bien diseñadas</li>
              <li>• Eficiencia &gt; 100% muestra optimización superior</li>
              <li>• NPS alto refleja usuarios satisfechos y leales</li>
              <li>• Bajo riesgo demuestra seguridad y confiabilidad</li>
              <li>• Alta cobertura asegura versatilidad del sistema</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 text-red-600 dark:text-red-400">⚠️ Señales de Alerta</h3>
            <ul className={`text-sm space-y-1 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>• Efectividad &lt; 80%: Revisar UX/UI y flujos</li>
              <li>• Eficiencia &lt; 80%: Optimizar rendimiento</li>
              <li>• NPS negativo: Problemas críticos de satisfacción</li>
              <li>• Riesgo &gt; 5%: Implementar controles de calidad</li>
              <li>• Cobertura &lt; 60%: Ampliar casos de prueba</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cómo usar este módulo */}
      <div className={`rounded-xl border p-6 ${
        modoOscuro 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <h2 className="text-xl font-bold mb-4">🚀 Cómo usar este módulo</h2>
        <ol className={`space-y-3 ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
            <div>
              <strong>Recopilar datos:</strong> Obtenga datos de usuarios reales (pruebas de usabilidad, analytics, encuestas)
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
            <div>
              <strong>Ingresar valores:</strong> Complete los formularios de cada dimensión o use ejemplos rápidos
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
            <div>
              <strong>Calcular métricas:</strong> El sistema aplicará automáticamente las fórmulas ISO 25022
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
            <div>
              <strong>Analizar resultados:</strong> Revise recomendaciones y compare con benchmarks
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
            <div>
              <strong>Tomar decisiones:</strong> Priorice mejoras basadas en las métricas más críticas
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default InicioISO25022;
