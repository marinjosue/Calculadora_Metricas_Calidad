import React, { useState, createContext, useEffect } from 'react';
import './App.css';
import Inicio from './components/Inicio';
import MetricasBasicas from './components/MetricasBasicas';
import Mantenibilidad from './components/Mantenibilidad';
import Confiabilidad from './components/Confiabilidad';
import Eficiencia from './components/Eficiencia';
import Resultados from './components/Resultados';
import ProcesadorSonar from './components/ProcesadorSonar';
import Dashboard from './components/Dashboard';
import AnalizadorProyecto from './components/AnalizadorProyecto';
import Graficas from './components/Graficas';
import CalidadEnUso from './components/CalidadEnUso';
import InicioISO25022 from './components/InicioISO25022';
import { Calculator, Wrench, Shield, Zap, Home, FileArchive, BarChart3, FolderOpen, Sun, Moon, TrendingUp, Users, ChevronDown, ChevronRight } from 'lucide-react';

// Contexto global para métricas de SonarQube
export const MetricasContext = createContext();

function App() {
  const [categoria, setCategoria] = useState('inicio');
  const [resultados, setResultados] = useState(null);
  const [resultadosCalculados, setResultadosCalculados] = useState({});
  const [metricasGlobales, setMetricasGlobales] = useState(null);
  const [mostrarProcesador, setMostrarProcesador] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(() => {
    // Recuperar preferencia guardada
    const guardado = localStorage.getItem('modoOscuro');
    return guardado ? JSON.parse(guardado) : false;
  });
  const [menuISO25010Expandido, setMenuISO25010Expandido] = useState(true);
  const [menuISO25022Expandido, setMenuISO25022Expandido] = useState(true);

  // Aplicar clase dark al document cuando cambie el modo
  useEffect(() => {
    if (modoOscuro) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('modoOscuro', JSON.stringify(modoOscuro));
  }, [modoOscuro]);

  const handleCalculate = (resultadosNuevos) => {
    setResultados(resultadosNuevos);
    // Acumular todos los resultados calculados
    setResultadosCalculados(prev => ({ ...prev, ...resultadosNuevos }));
  };

  const handleMetricasExtraidas = (metricas) => {
    setMetricasGlobales(metricas);
    // No cerrar automáticamente para que el usuario vea el resultado
  };

  const cerrarProcesador = () => {
    setMostrarProcesador(false);
  };

  const renderComponente = () => {
    switch (categoria) {
      case 'inicio':
        return <Inicio />;
      case 'basicas':
        return <MetricasBasicas onCalculate={handleCalculate} />;
      case 'mantenibilidad':
        return <Mantenibilidad onCalculate={handleCalculate} />;
      case 'confiabilidad':
        return <Confiabilidad onCalculate={handleCalculate} />;
      case 'eficiencia':
        return <Eficiencia onCalculate={handleCalculate} />;
      case 'inicioISO25022':
        return <InicioISO25022 />;
      case 'calidadEnUso':
        return <CalidadEnUso onCalculate={handleCalculate} />;
      case 'dashboard':
        return <Dashboard />;
      case 'analizador':
        return <AnalizadorProyecto onMetricasExtraidas={handleMetricasExtraidas} />;
      case 'graficas':
        return <Graficas />;
      default:
        return <Inicio />;
    }
  };

  return (
    <MetricasContext.Provider value={{ metricasGlobales, setMetricasGlobales, resultadosCalculados }}>
      <div className={`min-h-screen transition-colors duration-300 ${modoOscuro
          ? 'bg-gradient-to-br from-gray-900 to-gray-800'
          : 'bg-gradient-to-br from-gray-50 to-gray-100'
        }`}>

        {/* Sidebar Lateral Fijo */}
        <aside className={`fixed left-0 top-0 w-64 h-screen border-r shadow-lg transition-colors duration-300 z-40 ${modoOscuro
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
          }`}>
          {/* Logo y Título */}
          <div className={`p-4 border-b ${modoOscuro ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-lg">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h1 className={`text-sm font-bold ${modoOscuro ? 'text-white' : 'text-gray-800'}`}>
                  Métricas de Calidad
                </h1>
                <p className={`text-xs ${modoOscuro ? 'text-gray-400' : 'text-gray-500'}`}>
                  ESPE 2025
                </p>
              </div>
            </div>

            {/* Botón de Modo Oscuro */}
            <button
              onClick={() => setModoOscuro(!modoOscuro)}
              className={`w-full p-2 rounded-lg transition-all duration-300 ${modoOscuro
                  ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900'
                  : 'bg-gray-800 hover:bg-gray-700 text-yellow-300'
                }`}
              title={modoOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              <div className="flex items-center justify-center gap-2">
                {modoOscuro ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span className="text-xs font-semibold">
                  {modoOscuro ? 'Modo Claro' : 'Modo Oscuro'}
                </span>
              </div>
            </button>
          </div>

          {/* Navegación */}
          <nav className="p-3 space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
            {/* Navegación Principal */}
            <div className="space-y-1">
              <button
                onClick={() => setCategoria('inicio')}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all text-sm ${categoria === 'inicio'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md'
                    : modoOscuro
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <Home size={16} />
                Inicio
              </button>

              <button
                onClick={() => setCategoria('analizador')}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all text-sm ${categoria === 'analizador'
                    ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-md'
                    : modoOscuro
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <FolderOpen size={16} />
                Analizador
              </button>

              <button
                onClick={() => setCategoria('dashboard')}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all text-sm ${categoria === 'dashboard'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : modoOscuro
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <BarChart3 size={16} />
                Dashboard
              </button>

              <button
                onClick={() => setCategoria('graficas')}
                data-categoria="graficas"
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all text-sm ${categoria === 'graficas'
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md'
                    : modoOscuro
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <TrendingUp size={16} />
                Gráficas
              </button>
            </div>

            {/* Divisor */}
            <div className={`h-px my-3 ${modoOscuro ? 'bg-gray-600' : 'bg-gray-300'}`}></div>

            {/* ISO 25010 - Menú Expandible */}
            <div className={`rounded-lg border ${modoOscuro ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
              <button
                onClick={() => setMenuISO25010Expandido(!menuISO25010Expandido)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-sm font-semibold ${modoOscuro
                    ? 'text-blue-300 hover:bg-gray-700'
                    : 'text-blue-700 hover:bg-blue-50'
                  }`}
              >
                <span className="flex items-center gap-2">
                  <Calculator size={16} />
                  ISO 25010
                </span>
                {menuISO25010Expandido ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {menuISO25010Expandido && (
                <div className="px-2 pb-2 space-y-1">
                  <button
                    onClick={() => setCategoria('basicas')}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all text-xs ${categoria === 'basicas'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-sm'
                        : modoOscuro
                          ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <Calculator size={14} />
                    Métricas Básicas
                  </button>

                  <button
                    onClick={() => setCategoria('mantenibilidad')}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all text-xs ${categoria === 'mantenibilidad'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-sm'
                        : modoOscuro
                          ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <Wrench size={14} />
                    Mantenibilidad
                  </button>

                  <button
                    onClick={() => setCategoria('confiabilidad')}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all text-xs ${categoria === 'confiabilidad'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-sm'
                        : modoOscuro
                          ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <Shield size={14} />
                    Confiabilidad
                  </button>

                  <button
                    onClick={() => setCategoria('eficiencia')}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all text-xs ${categoria === 'eficiencia'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-sm'
                        : modoOscuro
                          ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <Zap size={14} />
                    Eficiencia
                  </button>
                </div>
              )}
            </div>

            {/* ISO 25022 - Menú Expandible */}
            <div className={`rounded-lg border ${modoOscuro ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
              <button
                onClick={() => setMenuISO25022Expandido(!menuISO25022Expandido)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-sm font-semibold ${modoOscuro
                    ? 'text-cyan-300 hover:bg-gray-700'
                    : 'text-cyan-700 hover:bg-cyan-50'
                  }`}
              >
                <span className="flex items-center gap-2">
                  <Users size={16} />
                  ISO 25022
                </span>
                {menuISO25022Expandido ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {menuISO25022Expandido && (
                <div className="px-2 pb-2 space-y-1">
                  <button
                    onClick={() => setCategoria('inicioISO25022')}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all text-xs ${categoria === 'inicioISO25022'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                        : modoOscuro
                          ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <Home size={14} />
                    Fórmulas y Conceptos
                  </button>

                  <button
                    onClick={() => setCategoria('calidadEnUso')}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all text-xs ${categoria === 'calidadEnUso'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                        : modoOscuro
                          ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <Users size={14} />
                    Calcular Métricas
                  </button>
                </div>
              )}
            </div>
          </nav>
        </aside>

        {/* Contenido Principal con margen izquierdo */}
        <div className="ml-64 flex flex-col min-h-screen">
          {/* Header Compacto */}
          <header className={`border-b shadow-sm transition-colors duration-300 sticky top-0 z-30 ${modoOscuro
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
            }`}>
            <div className="px-6 py-4">
              <h2 className={`text-2xl font-bold ${modoOscuro ? 'text-white' : 'text-gray-800'}`}>
                Sistema de Evaluación de Métricas de Calidad
              </h2>
              <p className={`text-sm ${modoOscuro ? 'text-gray-400' : 'text-gray-500'}`}>
                Aseguramiento de la Calidad de Software
              </p>
            </div>
          </header>

          {/* Botón Flotante para Procesador SonarQube */}}
          <button
            onClick={() => setMostrarProcesador(true)}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all z-50 flex items-center gap-2 group"
            title="Procesar Reportes SonarQube"
          >
            <FileArchive className="w-6 h-6" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-semibold">
              Procesar SonarQube
            </span>
          </button>

          {/* Modal del Procesador SonarQube */}
          {mostrarProcesador && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
                <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-2xl flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <FileArchive className="w-8 h-8" />
                    <div>
                      <h2 className="text-2xl font-bold">Procesador de Reportes SonarQube</h2>
                      <p className="text-purple-100 text-sm">Extrae métricas automáticamente desde archivos .pb o ZIP</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMostrarProcesador(false)}
                    className="bg-white/20 hover:bg-white/30 rounded-lg p-2 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-6">
                  <ProcesadorSonar
                    onMetricasExtraidas={handleMetricasExtraidas}
                    onCerrar={cerrarProcesador}
                  />
                </div>
              </div>
            </div>
          )}

          <main className="flex-1 p-6">
            {categoria === 'inicio' || categoria === 'dashboard' || categoria === 'analizador' || categoria === 'inicioISO25022' ? (
              renderComponente()
            ) : (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {renderComponente()}
                </div>
                <div className="lg:col-span-1">
                  {resultados && <Resultados resultados={resultados} />}
                </div>
              </div>
            )}
          </main>

          <footer className={`border-t mt-auto transition-colors duration-300 ${modoOscuro
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
            }`}>
            <div className={`px-6 py-4 text-center text-sm ${modoOscuro ? 'text-gray-300' : 'text-gray-600'
              }`}>
              <p>Sistema de Métricas de Calidad de Software | ESPE 2025</p>
            </div>
          </footer>
        </div>
      </div>
    </MetricasContext.Provider>
  );
}

export default App;
