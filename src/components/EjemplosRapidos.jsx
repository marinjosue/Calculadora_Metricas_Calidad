import React from 'react';
import { Sparkles } from 'lucide-react';

const EjemplosRapidos = ({ categoria, onCargarEjemplo }) => {
  const ejemplos = {
    basicas: [
      {
        nombre: 'Proyecto Pequeño',
        datos: { comentarios: '150', loc: '1000', defectos: '3', tiempo: '40' }
      },
      {
        nombre: 'Proyecto Mediano',
        datos: { comentarios: '400', loc: '2500', defectos: '8', tiempo: '120' }
      },
      {
        nombre: 'Proyecto Grande',
        datos: { comentarios: '1200', loc: '10000', defectos: '25', tiempo: '500' }
      }
    ],
    mantenibilidad: [
      {
        nombre: 'Sistema Estable',
        datos: { tiempoPromedioMantenimiento: '2', cambios: '10', locTotal: '5000', tiempoMantenimiento: '20', numeroCambios: '10' }
      },
      {
        nombre: 'Sistema en Evolución',
        datos: { tiempoPromedioMantenimiento: '4', cambios: '25', locTotal: '15000', tiempoMantenimiento: '100', numeroCambios: '25' }
      },
      {
        nombre: 'Sistema Legacy',
        datos: { tiempoPromedioMantenimiento: '8', cambios: '50', locTotal: '30000', tiempoMantenimiento: '400', numeroCambios: '50' }
      }
    ],
    confiabilidad: [
      {
        nombre: 'Alta Disponibilidad',
        datos: { mttf: '1440', mttr: '1', numeroFallos: '2', tiempoOperacion: '2880' }
      },
      {
        nombre: 'Disponibilidad Media',
        datos: { mttf: '720', mttr: '2', numeroFallos: '5', tiempoOperacion: '2160' }
      },
      {
        nombre: 'Requiere Mejoras',
        datos: { mttf: '168', mttr: '4', numeroFallos: '10', tiempoOperacion: '720' }
      }
    ],
    eficiencia: [
      {
        nombre: 'Alto Rendimiento',
        datos: { tiempoEjecucion: '0.1', memoriaUsada: '128', memoriaDisponible: '2048' }
      },
      {
        nombre: 'Rendimiento Medio',
        datos: { tiempoEjecucion: '0.5', memoriaUsada: '512', memoriaDisponible: '2048' }
      },
      {
        nombre: 'Requiere Optimización',
        datos: { tiempoEjecucion: '2', memoriaUsada: '1536', memoriaDisponible: '2048' }
      }
    ]
  };

  const ejemplosCategoria = ejemplos[categoria] || ejemplos.basicas;

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 mb-4 border-2 border-amber-200">
      <div className="flex items-center mb-3">
        <Sparkles className="mr-2 text-amber-600" size={20} />
        <h4 className="font-semibold text-gray-800">Ejemplos Rápidos</h4>
      </div>
      <p className="text-sm text-gray-600 mb-3">
        Haz clic en un ejemplo para cargar valores automáticamente:
      </p>
      <div className="flex flex-wrap gap-2">
        {ejemplosCategoria.map((ejemplo, idx) => (
          <button
            key={idx}
            onClick={() => onCargarEjemplo(ejemplo.datos)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition duration-200 shadow-sm"
          >
            {ejemplo.nombre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EjemplosRapidos;
