// ====================================================================
// SERVIDOR PUENTE: ARDUINO <---> REACT WEB APP (Matrícula UTP)
// ====================================================================
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001; // Puerto donde corre este servidor

app.use(cors());
app.use(express.json());

// CONFIGURACIÓN DEL PUERTO SERIAL DEL ARDUINO
// Cambia 'COM3' por el puerto donde conectes tu Arduino (ej: COM3, COM4, COM5)
const PUERTO_COM_POR_DEFECTO = process.env.ARDUINO_PORT || 'COM3';
const BAUD_RATE = 9600;

let serialPort = null;
let ultimoDatoArduino = {
  tipo: "ESTUDIANTE",
  nombre: "ISRAEL VERGARA",
  cedula: "8-900-1234",
  sede: "COLÓN",
  facultad: "INGENIERÍA DE SISTEMAS COMPUTACIONALES",
  carrera: "LIC. EN DESAR. Y GEST. DE SOF.",
  indice: "2.07",
  activo: "SI",
  fuente: "Arduino en espera de lectura..."
};

let clientesSSE = [];

// Intentar cargar la librería serialport si está instalada
let SerialPortLib = null;
let ReadlineParser = null;
try {
  const sp = require('serialport');
  SerialPortLib = sp.SerialPort;
  ReadlineParser = require('@serialport/parser-readline').ReadlineParser;
} catch (e) {
  console.log('[AVISO] Para conectar el Arduino físico, ejecuta primero: npm install en esta carpeta.');
}

async function iniciarConexionSerial() {
  if (!SerialPortLib) {
    console.log('[MODO SIMULACIÓN] El servidor está listo para recibir peticiones web.');
    return;
  }

  try {
    // Listar puertos disponibles
    const puertos = await SerialPortLib.list();
    console.log('\n--- Puertos COM detectados en tu equipo ---');
    if (puertos.length === 0) {
      console.log('No se detectaron dispositivos USB/Serial conectados.');
    } else {
      puertos.forEach(p => console.log(`• ${p.path} (${p.manufacturer || 'Dispositivo USB'})`));
    }
    console.log('-------------------------------------------\n');

    const existePuerto = puertos.some(p => p.path.toUpperCase() === PUERTO_COM_POR_DEFECTO.toUpperCase());
    const puertoAConectar = existePuerto ? PUERTO_COM_POR_DEFECTO : (puertos[0]?.path || PUERTO_COM_POR_DEFECTO);

    console.log(`Intentando conectar a Arduino en ${puertoAConectar}...`);

    serialPort = new SerialPortLib({
      path: puertoAConectar,
      baudRate: BAUD_RATE,
      autoOpen: true
    });

    const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    serialPort.on('open', () => {
      console.log(`[EXITO] Conectado exitosamente al Arduino en ${puertoAConectar} a ${BAUD_RATE} baudios.`);
    });

    parser.on('data', (linea) => {
      console.log('[ARDUINO DICE]:', linea);
      try {
        const json = JSON.parse(linea);
        ultimoDatoArduino = { ...json, timestamp: new Date().toISOString() };
      } catch (err) {
        ultimoDatoArduino = { raw: linea, timestamp: new Date().toISOString() };
      }

      // Notificar a React en tiempo real vía SSE
      clientesSSE.forEach(res => {
        res.write(`data: ${JSON.stringify(ultimoDatoArduino)}\n\n`);
      });
    });

    serialPort.on('error', (err) => {
      console.log('[ERROR SERIAL]:', err.message);
    });

  } catch (error) {
    console.log('[AVISO] No se pudo abrir el puerto serial:', error.message);
  }
}

// --------------------------------------------------------------------
// RUTAS DE LA API PARA REACT
// --------------------------------------------------------------------

// 1. Obtener el último dato recibido del Arduino
app.get('/api/estudiante', (req, res) => {
  res.json(ultimoDatoArduino);
});

// 2. Enviar un comando desde React hacia el Arduino (ej: "MATRICULA_OK", "GET_STUDENT")
app.post('/api/comando', (req, res) => {
  const { comando } = req.body;
  if (!comando) {
    return res.status(400).json({ error: 'Falta el campo "comando"' });
  }

  if (serialPort && serialPort.isOpen) {
    serialPort.write(comando + '\n', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al escribir en Arduino', detalle: err.message });
      }
      return res.json({ status: 'Comando enviado al Arduino', comando });
    });
  } else {
    console.log(`[SIMULACION] Comando enviado: ${comando}`);
    res.json({ status: 'Simulado (Arduino no conectado)', comando });
  }
});

// 3. Conexión en tiempo real (Server-Sent Events) para que React reciba datos al instante
app.get('/api/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  clientesSSE.push(res);

  // Enviar el estado actual de inmediato
  res.write(`data: ${JSON.stringify(ultimoDatoArduino)}\n\n`);

  req.on('close', () => {
    clientesSSE = clientesSSE.filter(c => c !== res);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`Servidor puente Arduino iniciado en: http://localhost:${PORT}`);
  console.log(`React puede consultar: http://localhost:${PORT}/api/estudiante`);
  console.log(`======================================================\n`);
  iniciarConexionSerial();
});

