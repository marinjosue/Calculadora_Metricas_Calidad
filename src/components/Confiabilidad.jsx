import React, { useState, useContext, useEffect } from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { MetricasContext } from '../App';
import EjemplosRapidos from './EjemplosRapidos';

const Confiabilidad = ({ onCalculate }) => {
  const { metricasGlobales } = useContext(MetricasContext);
  const [formData, setFormData] = useState({
    mttf: '',
    mttr: '',
    numeroFallos: '',
    tiempoOperacion: ''
  });

  useEffect(() => {
    if (metricasGlobales && metricasGlobales.defectos) {
      setFormData(prev => ({
        ...prev,
        numeroFallos: metricasGlobales.defectos
      }));
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
    
    const mttf = parseFloat(formData.mttf);
    const mttr = parseFloat(formData.mttr);
    const numeroFallos = parseFloat(formData.numeroFallos);
    const tiempoOperacion = parseFloat(formData.tiempoOperacion);

    // Disponibilidad: (MTTF / (MTTF + MTTR)) × 100
    const disponibilidad = (mttf / (mttf + mttr)) * 100;

    // Tasa de Fallos: Número de Fallos / Tiempo de Operación
    const tasaFallos = numeroFallos / tiempoOperacion;

    // MTBF: Tiempo de Operación / Número de Fallos
    const mtbf = tiempoOperacion / numeroFallos;

    const resultados = {
      categoria: 'Confiabilidad',
      metricas: [
        {
          nombre: 'Disponibilidad',
          valor: disponibilidad.toFixed(2),
          unidad: '%',
          formula: '(MTTF / (MTTF + MTTR)) × 100',
          interpretacion: disponibilidad >= 99 
            ? 'Disponibilidad excelente' 
            : disponibilidad >= 95 
            ? 'Disponibilidad buena' 
            : 'Requiere mejoras en disponibilidad'
        },
        {
          nombre: 'Tasa de Fallos',
          valor: tasaFallos.toFixed(4),
          unidad: 'fallos/hora',
          formula: 'Número de Fallos / Tiempo de Operación',
          interpretacion: tasaFallos <= 0.01 
            ? 'Muy confiable' 
            : tasaFallos <= 0.05 
            ? 'Confiabilidad aceptable' 
            : 'Baja confiabilidad'
        },
        {
          nombre: 'MTBF (Tiempo Medio Entre Fallos)',
          valor: mtbf.toFixed(2),
          unidad: 'horas',
          formula: 'Tiempo de Operación / Número de Fallos',
          interpretacion: mtbf >= 1000 
            ? 'Excelente confiabilidad' 
            : mtbf >= 100 
            ? 'Buena confiabilidad' 
            : 'Se requieren mejoras'
        }
      ]
    };

    onCalculate(resultados);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Shield className="mr-2 text-red-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Confiabilidad</h2>
        </div>
        {metricasGlobales && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg text-sm">
            <CheckCircle size={16} />
            <span className="font-medium">Métricas SonarQube cargadas</span>
          </div>
        )}
      </div>

      <EjemplosRapidos categoria="confiabilidad" onCargarEjemplo={handleCargarEjemplo} />
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            MTTF - Tiempo Medio Hasta el Fallo (horas)
          </label>
          <input
            type="number"
            name="mttf"
            value={formData.mttf}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            min="0.1"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            MTTR - Tiempo Medio de Reparación (horas)
          </label>
          <input
            type="number"
            name="mttr"
            value={formData.mttr}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            min="0.1"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de Fallos
          </label>
          <input
            type="number"
            name="numeroFallos"
            value={formData.numeroFallos}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tiempo de Operación (horas)
          </label>
          <input
            type="number"
            name="tiempoOperacion"
            value={formData.tiempoOperacion}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            min="1"
            step="0.1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200 font-medium"
        >
          Calcular Métricas
        </button>
      </form>
    </div>
  );
};

export default Confiabilidad;
