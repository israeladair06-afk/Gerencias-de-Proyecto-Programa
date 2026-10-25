@echo off
chcp 65001 >nul
title Servidor Puente Arduino <-> React
cls
echo =======================================================
echo        Servidor Puente Arduino - Matrícula UTP
echo =======================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no está instalado. Descárgalo de https://nodejs.org
    pause
    exit /b
)

if not exist "node_modules\" (
    echo [1/2] Instalando librerías de comunicación serial...
    call npm install
    echo.
)

echo [2/2] Iniciando servidor de comunicación con Arduino...
echo.
call node server.js
pause

