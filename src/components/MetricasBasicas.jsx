import React, { useState, useContext, useEffect } from 'react';
import { Calculator, CheckCircle } from 'lucide-react';
import EjemplosRapidos from './EjemplosRapidos';
import ImportadorSonar from './ImportadorSonar';
import { MetricasContext } from '../App';

const MetricasBasicas = ({ onCalculate }) => {
  const { metricasGlobales } = useContext(MetricasContext);
  const [formData, setFormData] = useState({
    comentarios: '',
    loc: '',
    defectos: '',
    tiempo: ''
  });

  // Cargar métricas globales cuando estén disponibles
  useEffect(() => {
    if (metricasGlobales) {
      setFormData(prev => ({
        ...prev,
        ...metricasGlobales
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
    
    const comentarios = parseFloat(formData.comentarios);
    const loc = parseFloat(formData.loc);
    const defectos = parseFloat(formData.defectos);
    const tiempo = parseFloat(formData.tiempo);

    // Densidad de Comentarios: (Comentarios / LOC) × 100
    const densidadComentarios = (comentarios / loc) * 100;

    // Densidad de Defectos: Defectos / (LOC / 1000)
    const densidadDefectos = defectos / (loc / 1000);

    // Productividad: LOC / Tiempo (horas)
    const productividad = loc / tiempo;

    const resultados = {
      categoria: 'Métricas Básicas',
      metricas: [
        {
          nombre: 'Densidad de Comentarios',
          valor: densidadComentarios.toFixed(2),
          unidad: '%',
          formula: '(Comentarios / LOC) × 100',
          interpretacion: densidadComentarios >= 15 
            ? 'Excelente documentación' 
            : densidadComentarios >= 10 
            ? 'Documentación adecuada' 
            : 'Se recomienda más documentación'
        },
        {
          nombre: 'Densidad de Defectos',
          valor: densidadDefectos.toFixed(2),
          unidad: 'defectos/KLOC',
          formula: 'Defectos / (LOC / 1000)',
          interpretacion: densidadDefectos <= 1 
            ? 'Calidad excelente' 
            : densidadDefectos <= 5 
            ? 'Calidad aceptable' 
            : 'Requiere mejoras significativas'
        },
        {
          nombre: 'Productividad',
          valor: productividad.toFixed(2),
          unidad: 'LOC/hora',
          formula: 'LOC / Tiempo (horas)',
          interpretacion: productividad >= 50 
            ? 'Alta productividad' 
            : productividad >= 25 
            ? 'Productividad media' 
            : 'Baja productividad'
        }
      ]
    };

    onCalculate(resultados);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Calculator className="mr-2 text-blue-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Métricas Básicas</h2>
        </div>
        {metricasGlobales && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg text-sm">
            <CheckCircle size={16} />
            <span className="font-medium">Métricas SonarQube cargadas</span>
          </div>
        )}
      </div>

      <ImportadorSonar categoria="basicas" onDatosExtraidos={handleDatosSonar} />

      <EjemplosRapidos categoria="basicas" onCargarEjemplo={handleCargarEjemplo} />
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de Comentarios
          </label>
          <input
            type="number"
            name="comentarios"
            value={formData.comentarios}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            placeholder="Ej: 400"
            title="Total de líneas de comentarios en el código (//, /* */, #)"
          />
          <p className="text-xs text-gray-500 mt-1">💡 Usa herramientas como cloc o SonarQube</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Líneas de Código (LOC)
          </label>
          <input
            type="number"
            name="loc"
            value={formData.loc}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="1"
            placeholder="Ej: 2500"
            title="Total de líneas de código (sin contar líneas en blanco)"
          />
          <p className="text-xs text-gray-500 mt-1">💡 Comando: cloc src/ o git ls-files | xargs wc -l</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de Defectos
          </label>
          <input
            type="number"
            name="defectos"
            value={formData.defectos}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            placeholder="Ej: 8"
            title="Bugs reportados y verificados en el sistema"
          />
          <p className="text-xs text-gray-500 mt-1">💡 Revisa GitHub Issues, Jira o sistema de tickets</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tiempo de Desarrollo (horas)
          </label>
          <input
            type="number"
            name="tiempo"
            value={formData.tiempo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="1"
            step="0.1"
            placeholder="Ej: 120"
            title="Horas totales invertidas en desarrollo"
          />
          <p className="text-xs text-gray-500 mt-1">💡 Usa Toggl, Clockify o registros del equipo</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
        >
          Calcular Métricas
        </button>
      </form>
    </div>
  );
};

export default MetricasBasicas;
