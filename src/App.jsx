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
import { Calculator, Wrench, Shield, Zap, Home, FileArchive, BarChart3, FolderOpen, Sun, Moon, TrendingUp } from 'lucide-react';

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
    switch(categoria) {
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
      <div className={`min-h-screen transition-colors duration-300 ${
        modoOscuro 
          ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
          : 'bg-gradient-to-br from-gray-50 to-gray-100'
      }`}>
      <header className={`border-b shadow-sm sticky top-0 z-50 transition-colors duration-300 ${
        modoOscuro 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${modoOscuro ? 'text-white' : 'text-gray-800'}`}>
                  Métricas de Calidad de Software
                </h1>
                <p className={`text-xs ${modoOscuro ? 'text-gray-400' : 'text-gray-500'}`}>
                  Sistema de evaluación de Metricas de Calidad
                </p>
              </div>
            </div>
            
            {/* Botón de Modo Oscuro/Claro */}
            <button
              onClick={() => setModoOscuro(!modoOscuro)}
              className={`p-3 rounded-lg transition-all duration-300 ${
                modoOscuro
                  ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900'
                  : 'bg-gray-800 hover:bg-gray-700 text-yellow-300'
              }`}
              title={modoOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {modoOscuro ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          
          <nav className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategoria('inicio')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                categoria === 'inicio'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md'
                  : modoOscuro 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Home size={18} />
              Inicio
            </button>
            
            <button
              onClick={() => setCategoria('basicas')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                categoria === 'basicas'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md'
                  : modoOscuro 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Calculator size={18} />
              Métricas Básicas
            </button>
            
            <button
              onClick={() => setCategoria('mantenibilidad')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                categoria === 'mantenibilidad'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md'
                  : modoOscuro 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Wrench size={18} />
              Mantenibilidad
            </button>
            
            <button
              onClick={() => setCategoria('confiabilidad')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                categoria === 'confiabilidad'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md'
                  : modoOscuro 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Shield size={18} />
              Confiabilidad
            </button>
            
            <button
              onClick={() => setCategoria('eficiencia')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                categoria === 'eficiencia'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md'
                  : modoOscuro 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Zap size={18} />
              Eficiencia
            </button>
            
            <div className={`w-px h-8 mx-2 ${modoOscuro ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
            
            <button
              onClick={() => setCategoria('analizador')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                categoria === 'analizador'
                  ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-md'
                  : modoOscuro 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FolderOpen size={18} />
              Analizador
            </button>
            
            <button
              onClick={() => setCategoria('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                categoria === 'dashboard'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : modoOscuro 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <BarChart3 size={18} />
              Dashboard
            </button>
            
            <button
              onClick={() => setCategoria('graficas')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                categoria === 'graficas'
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md'
                  : modoOscuro 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <TrendingUp size={18} />
              Gráficas
            </button>
          </nav>
        </div>
      </header>

      {/* Botón Flotante para Procesador SonarQube */}
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

      <main className="container mx-auto px-4 py-8">
        {categoria === 'inicio' || categoria === 'dashboard' || categoria === 'analizador' ? (
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
      
      <footer className={`border-t mt-16 transition-colors duration-300 ${
        modoOscuro 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className={`container mx-auto px-4 py-6 text-center text-sm ${
          modoOscuro ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <p>Sistema de Métricas de Calidad de Software | ESPE 2025</p>
          <p className={`text-xs mt-1 ${modoOscuro ? 'text-gray-500' : 'text-gray-500'}`}>
            Aseguramiento de la Calidad de Software
          </p>
        </div>
      </footer>
      </div>
    </MetricasContext.Provider>
  );
}

export default App;
