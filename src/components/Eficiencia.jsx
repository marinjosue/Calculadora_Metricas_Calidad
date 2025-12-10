import React, { useState, useContext, useEffect } from 'react';
import { Zap, CheckCircle } from 'lucide-react';
import { MetricasContext } from '../App';
import EjemplosRapidos from './EjemplosRapidos';

const Eficiencia = ({ onCalculate }) => {
  const { metricasGlobales } = useContext(MetricasContext);
  const [formData, setFormData] = useState({
    tiempoEjecucion: '',
    memoriaUsada: '',
    memoriaDisponible: ''
  });

  useEffect(() => {
    if (metricasGlobales) {
      // Las métricas globales están disponibles si se necesitan
    }
  }, [metricasGlobales]);

  const handleCargarEjemplo = (datosEjemplo) => {
    setFormData(datosEjemplo);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const tiempoEjecucion = parseFloat(formData.tiempoEjecucion);
    const memoriaUsada = parseFloat(formData.memoriaUsada);
    const memoriaDisponible = parseFloat(formData.memoriaDisponible);

    // Eficiencia Temporal: (1 / Tiempo de Ejecución) × 100
    const eficienciaTemporal = (1 / tiempoEjecucion) * 100;

    // Uso de Memoria: (Memoria Usada / Memoria Disponible) × 100
    const usoMemoria = (memoriaUsada / memoriaDisponible) * 100;

    // Eficiencia de Memoria: 100 - ((Memoria Usada / Memoria Disponible) × 100)
    const eficienciaMemoria = 100 - ((memoriaUsada / memoriaDisponible) * 100);

    const resultados = {
      categoria: 'Eficiencia',
      metricas: [
        {
          nombre: 'Eficiencia Temporal',
          valor: eficienciaTemporal.toFixed(2),
          unidad: '%',
          formula: '(1 / Tiempo de Ejecución) × 100',
          interpretacion: eficienciaTemporal >= 50 
            ? 'Excelente rendimiento temporal' 
            : eficienciaTemporal >= 20 
            ? 'Rendimiento aceptable' 
            : 'Se requiere optimización'
        },
        {
          nombre: 'Uso de Memoria',
          valor: usoMemoria.toFixed(2),
          unidad: '%',
          formula: '(Memoria Usada / Memoria Disponible) × 100',
          interpretacion: usoMemoria <= 60 
            ? 'Uso eficiente de memoria' 
            : usoMemoria <= 80 
            ? 'Uso moderado de memoria' 
            : 'Alto uso de memoria'
        },
        {
          nombre: 'Eficiencia de Memoria',
          valor: eficienciaMemoria.toFixed(2),
          unidad: '%',
          formula: '100 - ((Memoria Usada / Memoria Disponible) × 100)',
          interpretacion: eficienciaMemoria >= 40 
            ? 'Excelente eficiencia de memoria' 
            : eficienciaMemoria >= 20 
            ? 'Eficiencia aceptable' 
            : 'Requiere optimización de memoria'
        }
      ]
    };

    onCalculate(resultados);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Zap className="mr-2 text-yellow-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Eficiencia</h2>
        </div>
        {metricasGlobales && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg text-sm">
            <CheckCircle size={16} />
            <span className="font-medium">Métricas SonarQube cargadas</span>
          </div>
        )}
      </div>

      <EjemplosRapidos categoria="eficiencia" onCargarEjemplo={handleCargarEjemplo} />
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tiempo de Ejecución (segundos)
          </label>
          <input
            type="number"
            name="tiempoEjecucion"
            value={formData.tiempoEjecucion}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
            min="0.01"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Memoria Usada (MB)
          </label>
          <input
            type="number"
            name="memoriaUsada"
            value={formData.memoriaUsada}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
            min="0"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Memoria Disponible (MB)
          </label>
          <input
            type="number"
            name="memoriaDisponible"
            value={formData.memoriaDisponible}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
            min="1"
            step="0.1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition duration-200 font-medium"
        >
          Calcular Métricas
        </button>
      </form>
    </div>
  );
};

export default Eficiencia;
