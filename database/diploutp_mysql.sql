-- =====================================================
-- PROYECTO: DIPLO-UTP
-- Base de datos para solicitud y seguimiento de diplomas
-- Motor: MySQL 8.0+
-- =====================================================

CREATE DATABASE IF NOT EXISTS diploutp
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE diploutp;

-- 1. USUARIOS
CREATE TABLE IF NOT EXISTS usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM(
        'Estudiante',
        'Administrador',
        'Revisor',
        'Finanzas'
    ) NOT NULL DEFAULT 'Estudiante',
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. ESTUDIANTES
CREATE TABLE IF NOT EXISTS estudiantes (
    estudiante_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NULL UNIQUE,
    matricula VARCHAR(30) NOT NULL UNIQUE,
    cedula VARCHAR(30) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo_institucional VARCHAR(150) NOT NULL UNIQUE,
    facultad VARCHAR(120),
    carrera VARCHAR(120) NOT NULL,
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_estudiante_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(usuario_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 3. SOLICITUDES DE DIPLOMA
CREATE TABLE IF NOT EXISTS solicitudes_diploma (
    solicitud_id INT AUTO_INCREMENT PRIMARY KEY,
    numero_solicitud VARCHAR(30) NOT NULL UNIQUE,
    estudiante_id INT NOT NULL,
    fecha_solicitud DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado ENUM(
        'Pendiente',
        'En revision',
        'Requiere correccion',
        'Aprobada',
        'Rechazada',
        'En proceso de emision',
        'Lista para entrega',
        'Entregada'
    ) NOT NULL DEFAULT 'Pendiente',
    observaciones VARCHAR(1000),
    fecha_actualizacion DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_solicitud_estudiante
        FOREIGN KEY (estudiante_id)
        REFERENCES estudiantes(estudiante_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    INDEX idx_solicitud_estado_fecha (estado, fecha_solicitud)
) ENGINE=InnoDB;

-- 4. DOCUMENTOS
CREATE TABLE IF NOT EXISTS documentos (
    documento_id INT AUTO_INCREMENT PRIMARY KEY,
    solicitud_id INT NOT NULL,
    tipo_documento VARCHAR(100) NOT NULL,
    ruta_archivo VARCHAR(500) NOT NULL,
    fecha_subida DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado ENUM(
        'Pendiente',
        'Validado',
        'Rechazado'
    ) NOT NULL DEFAULT 'Pendiente',
    observaciones VARCHAR(500),

    CONSTRAINT fk_documento_solicitud
        FOREIGN KEY (solicitud_id)
        REFERENCES solicitudes_diploma(solicitud_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    INDEX idx_documento_solicitud (solicitud_id)
) ENGINE=InnoDB;

-- 5. PAGOS
CREATE TABLE IF NOT EXISTS pagos (
    pago_id INT AUTO_INCREMENT PRIMARY KEY,
    solicitud_id INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha_pago DATETIME NULL,
    referencia VARCHAR(100),
    ruta_comprobante VARCHAR(500),
    estado ENUM(
        'Pendiente',
        'En verificacion',
        'Confirmado',
        'Rechazado'
    ) NOT NULL DEFAULT 'Pendiente',
    observaciones VARCHAR(500),

    CONSTRAINT chk_pago_monto
        CHECK (monto >= 0),

    CONSTRAINT fk_pago_solicitud
        FOREIGN KEY (solicitud_id)
        REFERENCES solicitudes_diploma(solicitud_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    INDEX idx_pago_solicitud (solicitud_id)
) ENGINE=InnoDB;

-- 6. REVISIONES ADMINISTRATIVAS
CREATE TABLE IF NOT EXISTS revisiones (
    revision_id INT AUTO_INCREMENT PRIMARY KEY,
    solicitud_id INT NOT NULL,
    usuario_revisor_id INT NOT NULL,
    area VARCHAR(100) NOT NULL,
    resultado ENUM(
        'Pendiente',
        'Aprobada',
        'Rechazada',
        'Correccion'
    ) NOT NULL DEFAULT 'Pendiente',
    comentarios VARCHAR(1000),
    fecha_revision DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_revision_solicitud
        FOREIGN KEY (solicitud_id)
        REFERENCES solicitudes_diploma(solicitud_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_revision_usuario
        FOREIGN KEY (usuario_revisor_id)
        REFERENCES usuarios(usuario_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    INDEX idx_revision_solicitud (solicitud_id)
) ENGINE=InnoDB;

-- 7. HISTORIAL DE ESTADOS
CREATE TABLE IF NOT EXISTS historial_estados (
    historial_id INT AUTO_INCREMENT PRIMARY KEY,
    solicitud_id INT NOT NULL,
    usuario_id INT NULL,
    estado_anterior VARCHAR(30),
    estado_nuevo VARCHAR(30) NOT NULL,
    comentario VARCHAR(500),
    fecha_cambio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_historial_solicitud
        FOREIGN KEY (solicitud_id)
        REFERENCES solicitudes_diploma(solicitud_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_historial_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(usuario_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    INDEX idx_historial_solicitud_fecha
        (solicitud_id, fecha_cambio)
) ENGINE=InnoDB;

-- 8. NOTIFICACIONES
CREATE TABLE IF NOT EXISTS notificaciones (
    notificacion_id INT AUTO_INCREMENT PRIMARY KEY,
    solicitud_id INT NOT NULL,
    usuario_id INT NOT NULL,
    mensaje VARCHAR(500) NOT NULL,
    fecha_envio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    leida BOOLEAN NOT NULL DEFAULT FALSE,
    canal ENUM('Sistema', 'Correo') NOT NULL DEFAULT 'Sistema',

    CONSTRAINT fk_notificacion_solicitud
        FOREIGN KEY (solicitud_id)
        REFERENCES solicitudes_diploma(solicitud_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_notificacion_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(usuario_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    INDEX idx_notificacion_usuario_leida (usuario_id, leida)
) ENGINE=InnoDB;

-- =====================================================
-- COMPROBACION DE LAS TABLAS CREADAS
-- =====================================================

SHOW TABLES;
