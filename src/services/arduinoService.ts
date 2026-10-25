/**
 * Servicio para comunicar la interfaz de React con el Arduino
 * Servidor puente por defecto en http://localhost:3001
 */

const API_URL = "http://localhost:3001/api";

export interface DatosArduinoEstudiante {
  tipo?: string;
  nombre?: string;
  cedula?: string;
  sede?: string;
  facultad?: string;
  carrera?: string;
  indice?: string;
  activo?: string;
  fuente?: string;
  raw?: string;
  timestamp?: string;
}

/**
 * Consulta puntual para obtener el último dato registrado por el Arduino
 */
export async function obtenerDatosArduino(): Promise<DatosArduinoEstudiante | null> {
  try {
    const respuesta = await fetch(`${API_URL}/estudiante`);
    if (!respuesta.ok) throw new Error("Respuesta no válida del servidor puente");
    return await respuesta.json();
  } catch (error) {
    console.warn("No se pudo conectar con el servidor de Arduino:", error);
    return null;
  }
}

/**
 * Enviar un comando o texto hacia el Arduino (ej: "MATRICULA_OK", "LED_ON")
 */
export async function enviarComandoArduino(comando: string) {
  try {
    const respuesta = await fetch(`${API_URL}/comando`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comando }),
    });
    return await respuesta.json();
  } catch (error) {
    console.error("Error al enviar comando al Arduino:", error);
    return null;
  }
}

/**
 * Escuchar en tiempo real (Server-Sent Events): cada vez que el Arduino
 * lea un carné RFID o envíe datos, se ejecutará el callback automáticamente.
 */
export function suscribirArduinoEnTiempoReal(
  onData: (datos: DatosArduinoEstudiante) => void
): () => void {
  const eventSource = new EventSource(`${API_URL}/stream`);

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onData(data);
    } catch (e) {
      console.error("Error parseando evento del Arduino:", e);
    }
  };

  eventSource.onerror = () => {
    // Si el servidor puente no está encendido, simplemente espera reconexión
  };

  // Retorna función para cancelar la suscripción
  return () => {
    eventSource.close();
  };
}

