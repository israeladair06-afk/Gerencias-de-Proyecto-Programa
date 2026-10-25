# Sistema de Matrícula UTP

Aplicación web para la gestión y consulta de matrícula estudiantil de la Universidad Tecnológica de Panamá (UTP), desarrollada con **React**, **Vite** y **Tailwind CSS**, con soporte para integración de hardware/base de datos externa mediante **Arduino** (RFID / sensores / almacenamiento serial).

---

## 🚀 Cómo ejecutar el proyecto (Paso a paso)

### Requisito previo (Solo la primera vez)
Tener instalado **[Node.js](https://nodejs.org/)** (versión LTS recomendada).

### Opción A: Con 1 solo clic (Recomendado en Windows)
1. Clona el repositorio o descárgalo como ZIP:
   ```bash
   git clone https://github.com/israeladair06-afk/Gerencias-de-Proyecto-Programa.git
   ```
2. Entra a la carpeta del proyecto y haz **doble clic** en:
   👉 **`iniciar.bat`**
3. El script instalará dependencias automáticamente y abrirá la aplicación en tu navegador:
   👉 **`http://localhost:8443`**

### Opción B: Por terminal (Consola)
```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev
```

---

## 🔌 Módulo Arduino (Base de Datos / RFID / Hardware)

Para conectar un Arduino como fuente de datos física (carné estudiantil por RFID, teclado, sensor o almacenamiento):

Toda la configuración está centralizada en la carpeta [`arduino/`](./arduino/):
* **Código Arduino:** [`arduino/codigo_arduino/codigo_arduino.ino`](./arduino/codigo_arduino/codigo_arduino.ino) (listo para abrir y cargar con Arduino IDE).
* **Servidor puente USB <-> Web:** [`arduino/server_bridge/`](./arduino/server_bridge/)
  * Para encenderlo, haz doble clic en [`iniciar_bridge.bat`](./arduino/server_bridge/iniciar_bridge.bat).
* **Servicio en React:** [`src/services/arduinoService.ts`](./src/services/arduinoService.ts) (funciones `obtenerDatosArduino()` y `suscribirArduinoEnTiempoReal()` listas para usar en `src/App.tsx`).

Para ver los detalles completos de conexión, consulta [`arduino/README_ARDUINO.txt`](./arduino/README_ARDUINO.txt).

---

## 🛠️ Tecnologías utilizadas

* **Frontend:** React 19, TypeScript, Tailwind CSS v4, Vite 8
* **Hardware & Bridge:** Arduino C++, Node.js, Express, SerialPort (USB)

