import React from 'react';
import { CheckCircle, TrendingUp, AlertTriangle } from 'lucide-react';

const Resultados = ({ resultados }) => {
  if (!resultados) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
        <p>Selecciona una categoría e ingresa los valores para ver los resultados</p>
      </div>
    );
  }

  const getIconByInterpretation = (interpretacion) => {
    const lower = interpretacion.toLowerCase();
    if (lower.includes('excelente') || lower.includes('alta') || lower.includes('muy confiable')) {
      return <CheckCircle className="text-green-500" size={20} />;
    } else if (lower.includes('aceptable') || lower.includes('adecuada') || lower.includes('buena') || lower.includes('moderado') || lower.includes('medio')) {
      return <TrendingUp className="text-yellow-500" size={20} />;
    } else {
      return <AlertTriangle className="text-red-500" size={20} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Resultados: {resultados.categoria}
      </h2>
      
      <div className="space-y-6">
        {resultados.metricas.map((metrica, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {metrica.nombre}
              </h3>
              {getIconByInterpretation(metrica.interpretacion)}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-blue-600 mr-2">
                  {metrica.valor}
                </span>
                <span className="text-gray-600">{metrica.unidad}</span>
              </div>
              
              <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                <strong>Fórmula:</strong> <code className="text-purple-600">{metrica.formula}</code>
              </div>
              
              <div className="flex items-start">
                <span className="text-sm font-medium text-gray-700 mr-2">Interpretación:</span>
                <span className="text-sm text-gray-600">{metrica.interpretacion}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Resumen General</h3>
        <p className="text-sm text-gray-600">
          Se han calculado {resultados.metricas.length} métricas para la categoría {resultados.categoria}.
          Revisa cada resultado y su interpretación para entender el estado de calidad de tu software.
        </p>
      </div>
    </div>
  );
};

export default Resultados;
