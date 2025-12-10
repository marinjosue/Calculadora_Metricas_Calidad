import React, { useState, useContext } from 'react';
import { Download, FileText, BarChart3, FileJson, FileSpreadsheet, Printer, CheckCircle } from 'lucide-react';
import { MetricasContext } from '../App';

export default function Dashboard() {
  const { metricasGlobales, resultadosCalculados } = useContext(MetricasContext);
  const [formatoExportar, setFormatoExportar] = useState('json');

  // Consolidar todas las métricas y resultados
  const consolidarDatos = () => {
    return {
      proyecto: {
        nombre: "Análisis de Calidad de Software",
        fecha: new Date().toLocaleDateString('es-ES'),
        hora: new Date().toLocaleTimeString('es-ES')
      },
      metricas_base: metricasGlobales || {},
      resultados: resultadosCalculados || {},
      resumen: {
        total_metricas_calculadas: Object.keys(resultadosCalculados || {}).length,
        categorias_evaluadas: Object.keys(resultadosCalculados || {}).filter(k => 
          k.includes('basicas') || k.includes('mantenibilidad') || k.includes('confiabilidad') || k.includes('eficiencia')
        ).length
      }
    };
  };

  // Exportar como JSON
  const descargarJSON = () => {
    const datos = consolidarDatos();
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte-metricas-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Exportar como CSV
  const descargarCSV = () => {
    const datos = consolidarDatos();
    let csv = 'Categoría,Métrica,Valor,Interpretación\n';
    
    // Agregar resultados
    if (datos.resultados) {
      Object.entries(datos.resultados).forEach(([key, value]) => {
        if (typeof value === 'object' && value.valor !== undefined) {
          csv += `${key},${value.nombre || key},${value.valor},${value.interpretacion || ''}\n`;
        }
      });
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte-metricas-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Exportar como Markdown
  const descargarMarkdown = () => {
    const datos = consolidarDatos();
    let md = `# 📊 Reporte de Métricas de Calidad de Software\n\n`;
    md += `**Fecha:** ${datos.proyecto.fecha}\n`;
    md += `**Hora:** ${datos.proyecto.hora}\n\n`;
    md += `---\n\n`;
    
    md += `## 📈 Métricas Base SonarQube\n\n`;
    if (datos.metricas_base && Object.keys(datos.metricas_base).length > 0) {
      md += `| Métrica | Valor |\n`;
      md += `|---------|-------|\n`;
      Object.entries(datos.metricas_base).forEach(([key, value]) => {
        md += `| ${key} | ${value} |\n`;
      });
    } else {
      md += `_No hay métricas base disponibles_\n`;
    }
    
    md += `\n## 🎯 Resultados Calculados\n\n`;
    if (datos.resultados && Object.keys(datos.resultados).length > 0) {
      md += `| Categoría | Valor | Interpretación |\n`;
      md += `|-----------|-------|----------------|\n`;
      Object.entries(datos.resultados).forEach(([key, value]) => {
        if (typeof value === 'object' && value.valor !== undefined) {
          md += `| ${value.nombre || key} | ${value.valor} | ${value.interpretacion || 'N/A'} |\n`;
        }
      });
    } else {
      md += `_No hay resultados calculados disponibles_\n`;
    }
    
    md += `\n---\n\n`;
    md += `*Generado por Calculadora de Métricas de Calidad - ESPE*\n`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte-metricas-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Exportar como PDF (HTML imprimible)
  const imprimirPDF = () => {
    const datos = consolidarDatos();
    const ventana = window.open('', '_blank');
    ventana.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Reporte de Métricas</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { color: #7c3aed; border-bottom: 3px solid #7c3aed; padding-bottom: 10px; }
          h2 { color: #4c1d95; margin-top: 30px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #7c3aed; color: white; }
          tr:nth-child(even) { background-color: #f9fafb; }
          .header { text-align: center; margin-bottom: 30px; }
          .footer { margin-top: 50px; text-align: center; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📊 Reporte de Métricas de Calidad de Software</h1>
          <p><strong>Fecha:</strong> ${datos.proyecto.fecha} | <strong>Hora:</strong> ${datos.proyecto.hora}</p>
        </div>

        <h2>📈 Métricas Base SonarQube</h2>
        <table>
          <thead>
            <tr><th>Métrica</th><th>Valor</th></tr>
          </thead>
          <tbody>
            ${Object.entries(datos.metricas_base || {}).map(([key, value]) => 
              `<tr><td>${key}</td><td>${value}</td></tr>`
            ).join('')}
          </tbody>
        </table>

        <h2>🎯 Resultados Calculados</h2>
        <table>
          <thead>
            <tr><th>Categoría</th><th>Valor</th><th>Interpretación</th></tr>
          </thead>
          <tbody>
            ${Object.entries(datos.resultados || {}).map(([key, value]) => {
              if (typeof value === 'object' && value.valor !== undefined) {
                return `<tr><td>${value.nombre || key}</td><td>${value.valor}</td><td>${value.interpretacion || 'N/A'}</td></tr>`;
              }
              return '';
            }).join('')}
          </tbody>
        </table>

        <div class="footer">
          <p>Generado por Calculadora de Métricas de Calidad - ESPE</p>
          <p>Universidad de las Fuerzas Armadas - ${new Date().getFullYear()}</p>
        </div>
      </body>
      </html>
    `);
    ventana.document.close();
    setTimeout(() => {
      ventana.print();
    }, 500);
  };

  const handleDescargar = () => {
    switch (formatoExportar) {
      case 'json':
        descargarJSON();
        break;
      case 'csv':
        descargarCSV();
        break;
      case 'markdown':
        descargarMarkdown();
        break;
      case 'pdf':
        imprimirPDF();
        break;
      default:
        descargarJSON();
    }
  };

  const tieneResultados = resultadosCalculados && Object.keys(resultadosCalculados).length > 0;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-8 mb-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <BarChart3 className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold">Dashboard de Reportes</h1>
            <p className="text-purple-100">Exporta y gestiona todos tus resultados de métricas</p>
          </div>
        </div>
      </div>

      {/* Estado de datos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-700">Métricas SonarQube</h3>
            {metricasGlobales ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
            )}
          </div>
          <p className="text-3xl font-bold text-purple-600">
            {metricasGlobales ? Object.keys(metricasGlobales).length : 0}
          </p>
          <p className="text-sm text-gray-500">valores base cargados</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-700">Resultados Calculados</h3>
            {tieneResultados ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
            )}
          </div>
          <p className="text-3xl font-bold text-purple-600">
            {tieneResultados ? Object.keys(resultadosCalculados).length : 0}
          </p>
          <p className="text-sm text-gray-500">métricas calculadas</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-700">Formatos Disponibles</h3>
            <FileText className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600">4</p>
          <p className="text-sm text-gray-500">JSON, CSV, MD, PDF</p>
        </div>
      </div>

      {/* Exportación */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Download className="w-6 h-6 text-purple-600" />
          Exportar Reportes
        </h2>

        <div className="space-y-6">
          {/* Selector de formato */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Selecciona el formato de exportación:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: 'json', icon: FileJson, label: 'JSON', desc: 'Formato estructurado' },
                { value: 'csv', icon: FileSpreadsheet, label: 'CSV', desc: 'Excel/Sheets' },
                { value: 'markdown', icon: FileText, label: 'Markdown', desc: 'Documentación' },
                { value: 'pdf', icon: Printer, label: 'PDF', desc: 'Imprimible' }
              ].map((formato) => (
                <button
                  key={formato.value}
                  onClick={() => setFormatoExportar(formato.value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formatoExportar === formato.value
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <formato.icon className={`w-8 h-8 mx-auto mb-2 ${
                    formatoExportar === formato.value ? 'text-purple-600' : 'text-gray-400'
                  }`} />
                  <p className="font-semibold text-sm">{formato.label}</p>
                  <p className="text-xs text-gray-500">{formato.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Botón de descarga */}
          <button
            onClick={handleDescargar}
            disabled={!tieneResultados && !metricasGlobales}
            className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all ${
              tieneResultados || metricasGlobales
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Download className="w-5 h-5" />
            Descargar Reporte ({formatoExportar.toUpperCase()})
          </button>

          {!tieneResultados && !metricasGlobales && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                ⚠️ <strong>No hay datos para exportar.</strong> Primero calcula métricas o carga datos de SonarQube.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Vista previa de datos */}
      {tieneResultados && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            Vista Previa de Resultados
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-purple-100">
                  <th className="border border-purple-200 px-4 py-3 text-left font-semibold">Métrica</th>
                  <th className="border border-purple-200 px-4 py-3 text-left font-semibold">Valor</th>
                  <th className="border border-purple-200 px-4 py-3 text-left font-semibold">Interpretación</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(resultadosCalculados).map(([key, value], index) => {
                  if (typeof value === 'object' && value.valor !== undefined) {
                    return (
                      <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="border border-gray-200 px-4 py-3">{value.nombre || key}</td>
                        <td className="border border-gray-200 px-4 py-3 font-mono">{value.valor}</td>
                        <td className="border border-gray-200 px-4 py-3 text-sm">{value.interpretacion || 'N/A'}</td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
