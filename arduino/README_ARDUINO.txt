====================================================================
GUIA PARA CONECTAR ARDUINO COMO FUENTE DE DATOS / MATRICULA UTP
====================================================================

¡Hola! Esta carpeta fue creada especialmente para ti, que vas a 
conectar el Arduino con la aplicación web.

Aquí tienes todo organizado para que puedas trabajar rápidamente.

--------------------------------------------------------------------
1. ESTRUCTURA DE ESTA CARPETA
--------------------------------------------------------------------
arduino/
│
├── codigo_arduino/
│   └── codigo_arduino.ino   <-- Código listo para abrir en Arduino IDE
│
├── server_bridge/
│   ├── server.js            <-- Servidor Node.js que lee el Arduino
│   ├── package.json         <-- Librerías (express, cors, serialport)
│   └── iniciar_bridge.bat   <-- Doble clic para iniciar el puente
│
└── README_ARDUINO.txt       <-- Este documento explicativo

--------------------------------------------------------------------
2. ¿CÓMO FUNCIONA LA COMUNICACIÓN?
--------------------------------------------------------------------
    [ ARDUINO ]  
         │  (Cable USB / Puerto Serial COM3 a 9600 baudios)
         ▼
    [ server.js (Node.js) ] (Puerto 3001)
         │  (API REST / Eventos en tiempo real SSE)
         ▼
    [ React Web App ] (Puerto 8443)

El Arduino envía los datos (por ejemplo, el carnet escaneado por RFID,
cédula o datos del estudiante) por el cable USB.
El servidor "server.js" los recibe y se los entrega a React a través
de la dirección: http://localhost:3001/api/estudiante

--------------------------------------------------------------------
3. PASOS PARA PONERLO A FUNCIONAR
--------------------------------------------------------------------

PASO 1: Cargar el código en tu Arduino
1. Abre con Arduino IDE el archivo:
   arduino/codigo_arduino/codigo_arduino.ino
2. Conecta tu Arduino por USB y dale "Subir / Upload".

PASO 2: Iniciar el servidor puente
1. Entra a la carpeta: arduino/server_bridge/
2. Haz doble clic en:
   👉 iniciar_bridge.bat
3. Verás en la consola la lista de puertos COM detectados y la confirmación
   de conexión con tu Arduino.

PASO 3: Probar en React
1. Inicia la aplicación web principal con "iniciar.bat" en la raíz.
2. Puedes consultar desde React los datos del Arduino haciendo una petición:

   fetch("http://localhost:3001/api/estudiante")
     .then(res => res.json())
     .then(datos => console.log("Datos recibidos del Arduino:", datos));

--------------------------------------------------------------------
4. ¿DÓNDE DEBO TOCAR EN EL CÓDIGO DE REACT?
--------------------------------------------------------------------
El archivo principal donde está la información y pantalla del estudiante es:
👉 src/App.tsx

Para facilitarte aún más el trabajo, creamos un archivo auxiliar en:
👉 src/services/arduinoService.ts

Puedes importar funciones listas como:
- obtenerDatosArduino()
- suscribirArduinoEnTiempoReal((datos) => { ... })

¡Listo! Con esto tienes la comunicación completa entre el hardware
y la interfaz web.
====================================================================

