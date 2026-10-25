/*
  ==================================================================
  PROYECTO: MATRÍCULA UTP - MÓDULO ARDUINO / BASE DE DATOS
  ==================================================================
  Este código permite al Arduino comunicarse por puerto USB (Serial)
  con la computadora y con la aplicación web de Matrícula UTP.

  Puedes adaptarlo para:
  - Lector RFID (RC522) para escanear carnets de estudiantes.
  - Teclado matricial o lector de código de barras.
  - Módulo SD o memoria EEPROM como almacenamiento local de datos.
  - Envío de datos de prueba por el Monitor Serial.
*/

// Velocidad de comunicación serial
const long BAUD_RATE = 9600;

void setup() {
  // Iniciar puerto serial a 9600 baudios
  Serial.begin(BAUD_RATE);
  
  // Mensaje inicial de confirmación (puedes verlo en el Monitor Serie del Arduino IDE)
  // Nota: Al iniciar la app web, el bridge leerá las líneas JSON.
  Serial.println("{\"status\": \"Arduino conectado y listo\"}");
}

void loop() {
  // 1. REVISAR SI LA APLICACIÓN WEB ENVIÓ UNA ORDEN AL ARDUINO
  if (Serial.available() > 0) {
    String comando = Serial.readStringUntil('\n');
    comando.trim();

    // Si la web pide los datos del estudiante
    if (comando == "GET_STUDENT" || comando == "LEER") {
      enviarDatosEstudiante("ISRAEL VERGARA", "8-900-1234", "2.07", "SI");
    }
    // Si la web confirma una matrícula exitosa (puedes encender un LED o buzzer)
    else if (comando == "MATRICULA_OK") {
      // Ejemplo: digitalWrite(LED_PIN, HIGH);
      Serial.println("{\"mensaje\": \"Matricula procesada en Arduino\"}");
    }
  }

  // 2. EJEMPLO: SI DETECTAS UNA TARJETA O EVENTO (Simulación cada cierto tiempo o por sensor)
  /*
  if (tarjetaDetectada) {
     enviarDatosEstudiante("ISRAEL VERGARA", "8-900-1234", "2.07", "SI");
  }
  */

  delay(50);
}

// Función auxiliar para enviar datos en formato JSON a la aplicación web
void enviarDatosEstudiante(String nombre, String cedula, String indice, String activo) {
  Serial.print("{");
  Serial.print("\"tipo\": \"ESTUDIANTE\", ");
  Serial.print("\"nombre\": \"" + nombre + "\", ");
  Serial.print("\"cedula\": \"" + cedula + "\", ");
  Serial.print("\"sede\": \"COLON\", ");
  Serial.print("\"facultad\": \"INGENIERIA DE SISTEMAS COMPUTACIONALES\", ");
  Serial.print("\"carrera\": \"LIC. EN DESAR. Y GEST. DE SOF.\", ");
  Serial.print("\"indice\": \"" + indice + "\", ");
  Serial.print("\"activo\": \"" + activo + "\"");
  Serial.println("}");
}

