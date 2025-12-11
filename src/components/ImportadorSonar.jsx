import React, { useState } from 'react';
import { Upload, FileJson, AlertCircle, CheckCircle2 } from 'lucide-react';

const ImportadorSonar = ({ onDatosExtraidos, categoria }) => {
  const [archivo, setArchivo] = useState(null);
  const [estado, setEstado] = useState(''); // 'success', 'error', 'processing'
  const [mensaje, setMensaje] = useState('');

  const procesarArchivoJSON = (contenido) => {
    try {
      const datos = JSON.parse(contenido);
      
      // Estructura común de SonarQube JSON
      let datosExtraidos = {};
      
      if (categoria === 'basicas') {
        // Extraer métricas básicas de SonarQube
        const measures = datos.component?.measures || datos.measures || [];
        
        datosExtraidos = {
          loc: extraerMetrica(measures, ['ncloc', 'lines']) || '',
          comentarios: extraerMetrica(measures, ['comment_lines']) || '',
          defectos: extraerMetrica(measures, ['bugs', 'violations', 'code_smells']) || '',
          tiempo: '' // No disponible en SonarQube, debe ingresarse manualmente
        };
      } else if (categoria === 'mantenibilidad') {
        const measures = datos.component?.measures || datos.measures || [];
        
        datosExtraidos = {
          tiempoPromedioMantenimiento: '',
          cambios: extraerMetrica(measures, ['code_smells']) || '',
          locTotal: extraerMetrica(measures, ['ncloc', 'lines']) || '',
          tiempoMantenimiento: '',
          numeroCambios: extraerMetrica(measures, ['code_smells']) || ''
        };
      }
      
      return datosExtraidos;
    } catch (error) {
      throw new Error('El archivo JSON no tiene el formato correcto de SonarQube');
    }
  };

  const procesarArchivoCSV = (contenido) => {
    try {
      const lineas = contenido.split('\n').filter(l => l.trim());
      
      let datosExtraidos = {};
      
      if (categoria === 'basicas') {
        const valores = {};
        for (let i = 0; i < lineas.length; i++) {
          const cols = lineas[i].split(/[,;|\t]/);
          const metrica = cols[0]?.toLowerCase() || '';
          const valor = cols[1] || '';
          
          if (metrica.includes('ncloc') || metrica.includes('lines')) {
            valores.loc = valor;
          }
          if (metrica.includes('comment')) {
            valores.comentarios = valor;
          }
          if (metrica.includes('bug') || metrica.includes('violation')) {
            valores.defectos = valor;
          }
        }
        
        datosExtraidos = {
          loc: valores.loc || '',
          comentarios: valores.comentarios || '',
          defectos: valores.defectos || '',
          tiempo: ''
        };
      } else if (categoria === 'mantenibilidad') {
        const valores = {};
        for (let i = 0; i < lineas.length; i++) {
          const cols = lineas[i].split(/[,;|\t]/);
          const metrica = cols[0]?.toLowerCase() || '';
          const valor = cols[1] || '';
          
          if (metrica.includes('ncloc') || metrica.includes('lines')) {
            valores.loc = valor;
          }
          if (metrica.includes('code_smell') || metrica.includes('smell')) {
            valores.cambios = valor;
          }
        }
        
        datosExtraidos = {
          tiempoPromedioMantenimiento: '',
          cambios: valores.cambios || '',
          locTotal: valores.loc || '',
          tiempoMantenimiento: '',
          numeroCambios: valores.cambios || ''
        };
      }
      
      return datosExtraidos;
    } catch (error) {
      throw new Error('El archivo CSV no tiene el formato correcto');
    }
  };

  const procesarArchivoTexto = (contenido) => {
    try {
      // Intentar detectar formato de texto plano de SonarQube
      let datosExtraidos = {};
      
      if (categoria === 'basicas') {
        const valores = {};
        
        // Buscar patrones comunes en reportes de texto
        const patrones = {
          loc: /(?:ncloc|lines of code|LOC)[\s:=]+(\d+)/i,
          comentarios: /(?:comment|comments)[\s:=]+(\d+)/i,
          defectos: /(?:bugs?|violations?|issues?)[\s:=]+(\d+)/i
        };
        
        for (const [key, patron] of Object.entries(patrones)) {
          const match = contenido.match(patron);
          if (match) {
            valores[key] = match[1];
          }
        }
        
        datosExtraidos = {
          loc: valores.loc || '',
          comentarios: valores.comentarios || '',
          defectos: valores.defectos || '',
          tiempo: ''
        };
      } else if (categoria === 'mantenibilidad') {
        const valores = {};
        
        const patrones = {
          loc: /(?:ncloc|lines of code|LOC)[\s:=]+(\d+)/i,
          cambios: /(?:code_smell|smells?|maintainability)[\s:=]+(\d+)/i
        };
        
        for (const [key, patron] of Object.entries(patrones)) {
          const match = contenido.match(patron);
          if (match) {
            valores[key] = match[1];
          }
        }
        
        datosExtraidos = {
          tiempoPromedioMantenimiento: '',
          cambios: valores.cambios || '',
          locTotal: valores.loc || '',
          tiempoMantenimiento: '',
          numeroCambios: valores.cambios || ''
        };
      }
      
      return datosExtraidos;
    } catch (error) {
      throw new Error('No se pudo extraer información del archivo de texto');
    }
  };

  const extraerMetrica = (measures, claves) => {
    for (const medida of measures) {
      if (claves.includes(medida.metric?.toLowerCase() || medida.key?.toLowerCase())) {
        return medida.value || medida.val || '';
      }
    }
    return null;
  };

  const handleArchivoSeleccionado = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setArchivo(file);
    setEstado('processing');
    setMensaje('Procesando archivo...');

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const contenido = e.target.result;
        let datosExtraidos = {};

        if (file.name.endsWith('.json')) {
          datosExtraidos = procesarArchivoJSON(contenido);
        } else if (file.name.endsWith('.csv')) {
          datosExtraidos = procesarArchivoCSV(contenido);
        } else if (file.name.endsWith('.txt') || file.name.endsWith('.log') || file.name.endsWith('.md')) {
          datosExtraidos = procesarArchivoTexto(contenido);
        } else {
          throw new Error('Formato no soportado. Use JSON, CSV o TXT');
        }

        // Verificar si se extrajeron datos
        const hayDatos = Object.values(datosExtraidos).some(v => v !== '');
        
        if (hayDatos) {
          setEstado('success');
          setMensaje('✓ Datos extraídos correctamente del reporte de SonarQube');
          onDatosExtraidos(datosExtraidos);
        } else {
          setEstado('error');
          setMensaje('⚠ No se encontraron métricas en el archivo. Verifica el formato.');
        }
      } catch (error) {
        setEstado('error');
        setMensaje(`✗ Error: ${error.message}`);
      }
    };

    reader.onerror = () => {
      setEstado('error');
      setMensaje('✗ Error al leer el archivo');
    };

    reader.readAsText(file);
  };

  const limpiar = () => {
    setArchivo(null);
    setEstado('');
    setMensaje('');
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4 border-2 border-green-200">
      <div className="flex items-center mb-3">
        <FileJson className="mr-2 text-green-600" size={20} />
        <h4 className="font-semibold text-gray-800">Importar desde SonarQube</h4>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">
        Sube un reporte de SonarQube (JSON o CSV) para extraer métricas automáticamente
      </p>

      <div className="flex items-center gap-3">
        <label className="flex-1">
          <div className="flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg cursor-pointer transition duration-200 shadow-sm">
            <Upload size={18} className="mr-2" />
            <span className="text-sm font-medium">
              {archivo ? archivo.name : 'Seleccionar archivo'}
            </span>
          </div>
          <input
            type="file"
            accept=".json,.csv,.txt,.log,.md"
            onChange={handleArchivoSeleccionado}
            className="hidden"
          />
        </label>

        {archivo && (
          <button
            onClick={limpiar}
            className="px-4 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg text-sm font-medium transition duration-200"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Mensaje de estado */}
      {estado && (
        <div className={`mt-3 p-3 rounded-lg flex items-start ${
          estado === 'success' ? 'bg-green-100 border border-green-300' :
          estado === 'error' ? 'bg-red-100 border border-red-300' :
          'bg-blue-100 border border-blue-300'
        }`}>
          {estado === 'success' && <CheckCircle2 className="mr-2 text-green-600 flex-shrink-0" size={18} />}
          {estado === 'error' && <AlertCircle className="mr-2 text-red-600 flex-shrink-0" size={18} />}
          {estado === 'processing' && <div className="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />}
          <span className="text-sm">{mensaje}</span>
        </div>
      )}
    </div>
  );
};

export default ImportadorSonar;
