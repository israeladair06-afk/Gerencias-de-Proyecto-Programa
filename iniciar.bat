@echo off
chcp 65001 >nul
title Sistema - Matrícula UTP
cls
echo =======================================================
echo         Iniciando Sistema - Matrícula UTP
echo =======================================================
echo.

:: 1. Comprobar si Node.js está instalado en la máquina
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no está instalado en este equipo.
    echo.
    echo Para ejecutar este proyecto por primera vez:
    echo 1. Descarga el instalador recomendado desde https://nodejs.org
    echo 2. Instálalo dando "Siguiente" a todo.
    echo 3. Vuelve a hacer doble clic en este archivo.
    echo.
    pause
    exit /b
)

:: 2. Instalar dependencias si es la primera vez que se ejecuta
if not exist "node_modules\" (
    echo [1/2] Configurando dependencias por primera vez...
    echo Esto puede tardar uno o dos minutos, por favor espera.
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Ocurrió un problema al instalar dependencias.
        pause
        exit /b
    )
)

:: 3. Iniciar el servidor local y abrir el navegador
echo.
echo [2/2] Servidor listo. Abriendo en tu navegador...
echo Si no se abre automáticamente, entra a: http://localhost:8443
echo.
echo Para cerrar el programa, simplemente cierra esta ventana.
echo =======================================================
echo.

start http://localhost:8443
call npm run dev

