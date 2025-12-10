import React, { useState, useContext, useEffect } from 'react';
import { Wrench, CheckCircle } from 'lucide-react';
import { MetricasContext } from '../App';
import EjemplosRapidos from './EjemplosRapidos';
import ImportadorSonar from './ImportadorSonar';

const Mantenibilidad = ({ onCalculate }) => {
  const { metricasGlobales } = useContext(MetricasContext);
  const [formData, setFormData] = useState({
    tiempoPromedioMantenimiento: '',
    cambios: '',
    locTotal: '',
    tiempoMantenimiento: '',
    numeroCambios: ''
  });

  useEffect(() => {
    if (metricasGlobales && metricasGlobales.loc) {
      setFormData(prev => ({
        ...prev,
        locTotal: metricasGlobales.loc
      }));
    }
  }, [metricasGlobales]);

  const handleCargarEjemplo = (datosEjemplo) => {
    setFormData(datosEjemplo);
  };

  const handleDatosSonar = (datosSonar) => {
    setFormData(prevData => ({
      ...prevData,
      ...datosSonar
    }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const tiempoPromedioMantenimiento = parseFloat(formData.tiempoPromedioMantenimiento);
    const cambios = parseFloat(formData.cambios);
    const locTotal = parseFloat(formData.locTotal);
    const tiempoMantenimiento = parseFloat(formData.tiempoMantenimiento);
    const numeroCambios = parseFloat(formData.numeroCambios);

    // Índice de Mantenibilidad: (1 / Tiempo Promedio Mantenimiento) × 100
    const indiceMantenibilidad = (1 / tiempoPromedioMantenimiento) * 100;

    // Tasa de Cambios: (Cambios / LOC Total) × 100
    const tasaCambios = (cambios / locTotal) * 100;

    // Esfuerzo de Mantenimiento: Tiempo Mantenimiento / Número de Cambios
    const esfuerzoMantenimiento = tiempoMantenimiento / numeroCambios;

    const resultados = {
      categoria: 'Mantenibilidad',
      metricas: [
        {
          nombre: 'Índice de Mantenibilidad',
          valor: indiceMantenibilidad.toFixed(2),
          unidad: '%',
          formula: '(1 / Tiempo Promedio Mantenimiento) × 100',
          interpretacion: indiceMantenibilidad >= 20 
            ? 'Excelente mantenibilidad' 
            : indiceMantenibilidad >= 10 
            ? 'Mantenibilidad adecuada' 
            : 'Se requiere refactorización'
        },
        {
          nombre: 'Tasa de Cambios',
          valor: tasaCambios.toFixed(2),
          unidad: '%',
          formula: '(Cambios / LOC Total) × 100',
          interpretacion: tasaCambios <= 5 
            ? 'Código estable' 
            : tasaCambios <= 15 
            ? 'Código moderadamente estable' 
            : 'Alto nivel de cambios'
        },
        {
          nombre: 'Esfuerzo de Mantenimiento',
          valor: esfuerzoMantenimiento.toFixed(2),
          unidad: 'horas/cambio',
          formula: 'Tiempo Mantenimiento / Número de Cambios',
          interpretacion: esfuerzoMantenimiento <= 2 
            ? 'Bajo esfuerzo' 
            : esfuerzoMantenimiento <= 5 
            ? 'Esfuerzo moderado' 
            : 'Alto esfuerzo de mantenimiento'
        }
      ]
    };

    onCalculate(resultados);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Wrench className="mr-2 text-green-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Mantenibilidad</h2>
        </div>
        {metricasGlobales && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg text-sm">
            <CheckCircle size={16} />
            <span className="font-medium">Métricas SonarQube cargadas</span>
          </div>
        )}
      </div>

      <ImportadorSonar categoria="mantenibilidad" onDatosExtraidos={handleDatosSonar} />

      <EjemplosRapidos categoria="mantenibilidad" onCargarEjemplo={handleCargarEjemplo} />
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tiempo Promedio de Mantenimiento (horas)
          </label>
          <input
            type="number"
            name="tiempoPromedioMantenimiento"
            value={formData.tiempoPromedioMantenimiento}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            min="0.1"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de Cambios Realizados
          </label>
          <input
            type="number"
            name="cambios"
            value={formData.cambios}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LOC Total del Sistema
          </label>
          <input
            type="number"
            name="locTotal"
            value={formData.locTotal}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tiempo Total de Mantenimiento (horas)
          </label>
          <input
            type="number"
            name="tiempoMantenimiento"
            value={formData.tiempoMantenimiento}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            min="0.1"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de Cambios (para esfuerzo)
          </label>
          <input
            type="number"
            name="numeroCambios"
            value={formData.numeroCambios}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            min="1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 font-medium"
        >
          Calcular Métricas
        </button>
      </form>
    </div>
  );
};

export default Mantenibilidad;
