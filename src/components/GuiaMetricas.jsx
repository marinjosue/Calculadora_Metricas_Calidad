import React from 'react';
import { BookOpen, Lightbulb, Calculator, FileCode } from 'lucide-react';

const GuiaMetricas = ({ categoria }) => {
  const guias = {
    basicas: {
      titulo: 'Guía de Métricas Básicas',
      descripcion: 'Estas métricas miden aspectos fundamentales del código fuente',
      ejemplos: [
        {
          titulo: 'Ejemplo Real: Proyecto Web',
          datos: {
            'Líneas de Código (LOC)': '2,500',
            'Líneas de Comentarios': '400',
            'Número de Defectos': '8',
            'Tiempo de Desarrollo': '120 horas'
          },
          comoObtener: [
            '📊 LOC: SonarQube (ncloc), cloc, tokei, o wc -l en Linux',
            '💬 Comentarios: SonarQube (comment_lines) o análisis manual',
            '🐛 Defectos: SonarQube (bugs), GitHub Issues, Jira, o sistema de seguimiento',
            '⏱️ Tiempo: Suma de horas del equipo (usar Toggl, Clockify, o registros)',
            '✨ PLUS: Subir reporte de SonarQube JSON/CSV para autocompletar'
          ]
        }
      ],
      herramientas: [
        { nombre: 'SonarQube', uso: 'Análisis completo de código' },
        { nombre: 'cloc', uso: 'Contar líneas de código' },
        { nombre: 'GitHub Insights', uso: 'Estadísticas del repositorio' },
        { nombre: 'JIRA', uso: 'Seguimiento de defectos' }
      ]
    },
    mantenibilidad: {
      titulo: 'Guía de Mantenibilidad',
      descripcion: 'Mide qué tan fácil es mantener y modificar el software',
      ejemplos: [
        {
          titulo: 'Ejemplo Real: Sistema Bancario',
          datos: {
            'Tiempo Promedio por Cambio': '4 horas',
            'Número de Cambios': '25',
            'LOC Total': '15,000',
            'Tiempo Total Mantenimiento': '100 horas'
          },
          comoObtener: [
            '🔧 Tiempo por Cambio: Promedio de tiempo en commits/PRs completados',
            '📝 Número de Cambios: Git commits, PRs merged, tickets cerrados, o SonarQube (code_smells)',
            '📦 LOC Total: SonarQube (ncloc) o análisis estático del código completo',
            '⏳ Tiempo Total: Suma de horas en tareas de mantenimiento',
            '✨ PLUS: Importar reporte de SonarQube para LOC y cambios'
          ]
        }
      ],
      herramientas: [
        { nombre: 'Git Analytics', uso: 'Historial de cambios' },
        { nombre: 'Code Climate', uso: 'Índice de mantenibilidad' },
        { nombre: 'GitLab Insights', uso: 'Métricas de desarrollo' }
      ]
    },
    confiabilidad: {
      titulo: 'Guía de Confiabilidad',
      descripcion: 'Evalúa la capacidad del sistema para funcionar sin fallos',
      ejemplos: [
        {
          titulo: 'Ejemplo Real: Aplicación E-commerce',
          datos: {
            'MTTF': '720 horas (30 días)',
            'MTTR': '2 horas',
            'Número de Fallos': '5',
            'Tiempo de Operación': '2,160 horas (90 días)'
          },
          comoObtener: [
            '⏰ MTTF: Tiempo promedio entre inicio y primer fallo',
            '🔧 MTTR: Tiempo promedio desde fallo hasta reparación',
            '❌ Fallos: Caídas del sistema, errores críticos en logs',
            '✅ Tiempo Operación: Uptime del servidor (usar Pingdom, UptimeRobot)'
          ]
        }
      ],
      herramientas: [
        { nombre: 'New Relic', uso: 'Monitoreo de disponibilidad' },
        { nombre: 'DataDog', uso: 'Tracking de incidentes' },
        { nombre: 'Sentry', uso: 'Captura de errores en producción' },
        { nombre: 'AWS CloudWatch', uso: 'Logs y métricas de infraestructura' }
      ]
    },
    eficiencia: {
      titulo: 'Guía de Eficiencia',
      descripcion: 'Mide el uso de recursos del sistema',
      ejemplos: [
        {
          titulo: 'Ejemplo Real: API REST',
          datos: {
            'Tiempo de Ejecución': '0.5 segundos',
            'Memoria Usada': '256 MB',
            'Memoria Disponible': '2048 MB (2 GB)'
          },
          comoObtener: [
            '⚡ Tiempo: Herramientas de profiling o time en terminal',
            '💾 Memoria Usada: Task Manager, htop, o monitores del sistema',
            '📊 Memoria Disponible: Especificaciones del servidor/VM',
            '🔬 Profiling: Chrome DevTools, Python cProfile, Java VisualVM'
          ]
        }
      ],
      herramientas: [
        { nombre: 'Chrome DevTools', uso: 'Performance profiling web' },
        { nombre: 'Python cProfile', uso: 'Análisis de rendimiento Python' },
        { nombre: 'JProfiler', uso: 'Profiling de aplicaciones Java' },
        { nombre: 'Grafana', uso: 'Visualización de métricas' }
      ]
    }
  };

  const guia = guias[categoria] || guias.basicas;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <BookOpen className="mr-2 text-indigo-600" size={24} />
        <h3 className="text-2xl font-bold text-gray-800">{guia.titulo}</h3>
      </div>

      <p className="text-gray-600 mb-6">{guia.descripcion}</p>

      {/* Ejemplos Prácticos */}
      {guia.ejemplos.map((ejemplo, idx) => (
        <div key={idx} className="mb-6">
          <div className="flex items-center mb-3">
            <Lightbulb className="mr-2 text-yellow-500" size={20} />
            <h4 className="text-lg font-semibold text-gray-800">{ejemplo.titulo}</h4>
          </div>

          {/* Datos del Ejemplo */}
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(ejemplo.datos).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="text-sm text-gray-600">{key}</span>
                  <span className="text-lg font-bold text-blue-600">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cómo Obtener los Datos */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Calculator className="mr-2 text-green-600" size={18} />
              <h5 className="font-semibold text-gray-800">¿Cómo obtener estos valores?</h5>
            </div>
            <ul className="space-y-2">
              {ejemplo.comoObtener.map((item, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {/* Herramientas Recomendadas */}
      <div className="bg-purple-50 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <FileCode className="mr-2 text-purple-600" size={20} />
          <h5 className="font-semibold text-gray-800">Herramientas Recomendadas</h5>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {guia.herramientas.map((herramienta, i) => (
            <div key={i} className="bg-white rounded p-3 border border-purple-200">
              <div className="font-medium text-gray-800">{herramienta.nombre}</div>
              <div className="text-sm text-gray-600">{herramienta.uso}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuiaMetricas;
