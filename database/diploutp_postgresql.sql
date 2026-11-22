-- =====================================================
-- PROYECTO: DIPLO-UTP
-- Base de datos para solicitud y seguimiento de diplomas
-- Motor: PostgreSQL 18 (Esquema completo + Perfiles de prueba)
-- =====================================================

-- 1. TIPOS ENUMERADOS
DO $$ BEGIN
    CREATE TYPE rol_usuario AS ENUM ('Estudiante', 'Administrador', 'Revisor', 'Finanzas');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE estado_solicitud_enum AS ENUM (
        'Pendiente',
        'En revision',
        'Requiere correccion',
        'Aprobada',
        'Rechazada',
        'En proceso de emision',
        'Lista para entrega',
        'Entregada'
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE estado_documento_enum AS ENUM ('Pendiente', 'Validado', 'Rechazado');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE estado_pago_enum AS ENUM ('Pendiente', 'En verificacion', 'Confirmado', 'Rechazado');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE resultado_revision_enum AS ENUM ('Pendiente', 'Aprobada', 'Rechazada', 'Correccion');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE TYPE canal_notificacion_enum AS ENUM ('Sistema', 'Correo');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 1. USUARIOS
CREATE TABLE IF NOT EXISTS usuarios (
    usuario_id SERIAL PRIMARY KEY,
    cedula_login VARCHAR(30) UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol rol_usuario NOT NULL DEFAULT 'Estudiante',
    area_cargo VARCHAR(100) DEFAULT 'Estudiante',
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS cedula_login VARCHAR(30) UNIQUE;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS area_cargo VARCHAR(100) DEFAULT 'Estudiante';

-- 2. ESTUDIANTES
CREATE TABLE IF NOT EXISTS estudiantes (
    estudiante_id SERIAL PRIMARY KEY,
    usuario_id INT NULL UNIQUE,
    matricula VARCHAR(30) NOT NULL UNIQUE,
    cedula VARCHAR(30) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo_institucional VARCHAR(150) NOT NULL UNIQUE,
    facultad VARCHAR(120) DEFAULT 'INGENIERÍA DE SISTEMAS COMPUTACIONALES',
    carrera VARCHAR(120) NOT NULL,
    plan_estudio VARCHAR(150) DEFAULT 'LIC. EN DESARROLLO Y GESTIÓN DE SOFTWARE-2023',
    sede VARCHAR(80) DEFAULT 'COLÓN',
    ano_estudio INT DEFAULT 4,
    turno VARCHAR(40) DEFAULT 'NOCTURNO',
    telefono VARCHAR(30) DEFAULT '6353-3040',
    telefono_secundario VARCHAR(30) DEFAULT '6588-2460',
    correo_secundario VARCHAR(150),
    direccion VARCHAR(255) DEFAULT 'Barrio Norte, ciudad de Colón',
    creditos_aprobados INT DEFAULT 120,
    creditos_totales INT DEFAULT 148,
    horas_servicio_social INT DEFAULT 60,
    horas_voluntariado INT DEFAULT 25,
    indice_academico DECIMAL(4,2) DEFAULT 2.07,
    ingles_cel BOOLEAN DEFAULT TRUE,
    paz_y_salvo BOOLEAN DEFAULT TRUE,
    capitulo_honor BOOLEAN DEFAULT FALSE,
    habilitado_tecnico BOOLEAN DEFAULT TRUE,
    habilitado_licenciatura BOOLEAN DEFAULT TRUE,
    habilitado_ingenieria BOOLEAN DEFAULT FALSE,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_estudiante_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(usuario_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

ALTER TABLE estudiantes ADD COLUMN IF NOT EXISTS plan_estudio VARCHAR(150) DEFAULT 'LIC. EN DESARROLLO Y GESTIÓN DE SOFTWARE-2023';
ALTER TABLE estudiantes ADD COLUMN IF NOT EXISTS ano_estudio INT DEFAULT 4;
ALTER TABLE estudiantes ADD COLUMN IF NOT EXISTS turno VARCHAR(40) DEFAULT 'NOCTURNO';
ALTER TABLE estudiantes ADD COLUMN IF NOT EXISTS telefono_secundario VARCHAR(30) DEFAULT '6588-2460';
ALTER TABLE estudiantes ADD COLUMN IF NOT EXISTS creditos_totales INT DEFAULT 148;
ALTER TABLE estudiantes ADD COLUMN IF NOT EXISTS ingles_cel BOOLEAN DEFAULT TRUE;
ALTER TABLE estudiantes ADD COLUMN IF NOT EXISTS paz_y_salvo BOOLEAN DEFAULT TRUE;
ALTER TABLE estudiantes ADD COLUMN IF NOT EXISTS capitulo_honor BOOLEAN DEFAULT FALSE;
ALTER TABLE estudiantes ADD COLUMN IF NOT EXISTS habilitado_tecnico BOOLEAN DEFAULT TRUE;
ALTER TABLE estudiantes ADD COLUMN IF NOT EXISTS habilitado_licenciatura BOOLEAN DEFAULT TRUE;
ALTER TABLE estudiantes ADD COLUMN IF NOT EXISTS habilitado_ingenieria BOOLEAN DEFAULT FALSE;

-- 3. SOLICITUDES DE DIPLOMA
CREATE TABLE IF NOT EXISTS solicitudes_diploma (
    solicitud_id SERIAL PRIMARY KEY,
    numero_solicitud VARCHAR(30) NOT NULL UNIQUE,
    estudiante_id INT NOT NULL,
    tipo_titulo VARCHAR(120) NOT NULL DEFAULT 'Licenciatura en Desarrollo y Gestión de Software',
    nivel_academico VARCHAR(30) NOT NULL DEFAULT 'licenciatura',
    enfoque_solicitud VARCHAR(40) NOT NULL DEFAULT 'curricular',
    modalidad_graduacion VARCHAR(100) DEFAULT 'Práctica Profesional',
    nombre_diploma VARCHAR(150),
    recibo_pago VARCHAR(80) DEFAULT 'BNC-2026-04821',
    monto_arancel DECIMAL(10,2) DEFAULT 73.00,
    fecha_solicitud TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado estado_solicitud_enum NOT NULL DEFAULT 'Pendiente',
    observaciones VARCHAR(1000),
    fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_solicitud_estudiante
        FOREIGN KEY (estudiante_id)
        REFERENCES estudiantes(estudiante_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

ALTER TABLE solicitudes_diploma ADD COLUMN IF NOT EXISTS modalidad_graduacion VARCHAR(100) DEFAULT 'Práctica Profesional';
ALTER TABLE solicitudes_diploma ADD COLUMN IF NOT EXISTS recibo_pago VARCHAR(80) DEFAULT 'BNC-2026-04821';
ALTER TABLE solicitudes_diploma ADD COLUMN IF NOT EXISTS monto_arancel DECIMAL(10,2) DEFAULT 73.00;

CREATE INDEX IF NOT EXISTS idx_solicitud_estado_fecha ON solicitudes_diploma (estado, fecha_solicitud);

CREATE OR REPLACE FUNCTION actualizar_fecha_modificacion()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_actualizacion = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_solicitudes_fecha_act ON solicitudes_diploma;
CREATE TRIGGER trg_solicitudes_fecha_act
BEFORE UPDATE ON solicitudes_diploma
FOR EACH ROW
EXECUTE FUNCTION actualizar_fecha_modificacion();

-- 4. DOCUMENTOS
CREATE TABLE IF NOT EXISTS documentos (
    documento_id SERIAL PRIMARY KEY,
    solicitud_id INT NOT NULL,
    tipo_documento VARCHAR(100) NOT NULL,
    ruta_archivo VARCHAR(500) NOT NULL,
    fecha_subida TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado estado_documento_enum NOT NULL DEFAULT 'Pendiente',
    observaciones VARCHAR(500),

    CONSTRAINT fk_documento_solicitud
        FOREIGN KEY (solicitud_id)
        REFERENCES solicitudes_diploma(solicitud_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_documento_solicitud ON documentos (solicitud_id);

-- 5. PAGOS
CREATE TABLE IF NOT EXISTS pagos (
    pago_id SERIAL PRIMARY KEY,
    solicitud_id INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha_pago TIMESTAMP NULL,
    referencia VARCHAR(100),
    ruta_comprobante VARCHAR(500),
    estado estado_pago_enum NOT NULL DEFAULT 'Pendiente',
    observaciones VARCHAR(500),

    CONSTRAINT chk_pago_monto
        CHECK (monto >= 0),

    CONSTRAINT fk_pago_solicitud
        FOREIGN KEY (solicitud_id)
        REFERENCES solicitudes_diploma(solicitud_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_pago_solicitud ON pagos (solicitud_id);

-- 6. REVISIONES ADMINISTRATIVAS
CREATE TABLE IF NOT EXISTS revisiones (
    revision_id SERIAL PRIMARY KEY,
    solicitud_id INT NOT NULL,
    usuario_revisor_id INT NOT NULL,
    area VARCHAR(100) NOT NULL,
    resultado resultado_revision_enum NOT NULL DEFAULT 'Pendiente',
    comentarios VARCHAR(1000),
    fecha_revision TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_revision_solicitud
        FOREIGN KEY (solicitud_id)
        REFERENCES solicitudes_diploma(solicitud_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_revision_usuario
        FOREIGN KEY (usuario_revisor_id)
        REFERENCES usuarios(usuario_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_revision_solicitud ON revisiones (solicitud_id);

-- 7. HISTORIAL DE ESTADOS
CREATE TABLE IF NOT EXISTS historial_estados (
    historial_id SERIAL PRIMARY KEY,
    solicitud_id INT NOT NULL,
    usuario_id INT NULL,
    estado_anterior VARCHAR(30),
    estado_nuevo VARCHAR(30) NOT NULL,
    comentario VARCHAR(500),
    fecha_cambio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_historial_solicitud
        FOREIGN KEY (solicitud_id)
        REFERENCES solicitudes_diploma(solicitud_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_historial_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(usuario_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_historial_solicitud_fecha ON historial_estados (solicitud_id, fecha_cambio);

-- 8. NOTIFICACIONES
CREATE TABLE IF NOT EXISTS notificaciones (
    notificacion_id SERIAL PRIMARY KEY,
    solicitud_id INT NOT NULL,
    usuario_id INT NOT NULL,
    mensaje VARCHAR(500) NOT NULL,
    fecha_envio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    leida BOOLEAN NOT NULL DEFAULT FALSE,
    canal canal_notificacion_enum NOT NULL DEFAULT 'Sistema',

    CONSTRAINT fk_notificacion_solicitud
        FOREIGN KEY (solicitud_id)
        REFERENCES solicitudes_diploma(solicitud_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_notificacion_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(usuario_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_notificacion_usuario_leida ON notificaciones (usuario_id, leida);

-- =====================================================
-- ACTUALIZACIÓN DE CREDENCIALES Y PERFILES DE PRUEBA
-- Contraseña de acceso para pruebas: 123456 (o Israel0660)
-- =====================================================

UPDATE usuarios SET cedula_login = '3-749-2120', password_hash = '123456', area_cargo = 'Estudiante' WHERE correo = 'israel.vergara@utp.ac.pa';
UPDATE usuarios SET cedula_login = '8-921-1843', password_hash = '123456', area_cargo = 'Estudiante' WHERE correo = 'maria.gonzalez@utp.ac.pa';
UPDATE usuarios SET cedula_login = '4-812-963',  password_hash = '123456', area_cargo = 'Estudiante' WHERE correo = 'carlos.rodriguez@utp.ac.pa';
UPDATE usuarios SET cedula_login = '6-715-1094', password_hash = '123456', area_cargo = 'Estudiante' WHERE correo = 'ana.martinez@utp.ac.pa';
UPDATE usuarios SET cedula_login = '8-710-1001', password_hash = '123456', area_cargo = 'Secretaría General' WHERE correo = 'secretaria.general@utp.ac.pa';
UPDATE usuarios SET cedula_login = '8-720-2002', password_hash = '123456', area_cargo = 'Área Financiera' WHERE correo = 'finanzas@utp.ac.pa';
UPDATE usuarios SET cedula_login = '8-730-3003', password_hash = '123456', area_cargo = 'Administrador DITIC' WHERE correo = 'admin.ditic@utp.ac.pa';

UPDATE estudiantes SET
    plan_estudio = 'LIC. EN DESARROLLO Y GESTIÓN DE SOFTWARE-2023',
    sede = 'COLÓN',
    ano_estudio = 4,
    turno = 'NOCTURNO',
    creditos_aprobados = 132,
    creditos_totales = 148,
    horas_servicio_social = 60,
    horas_voluntariado = 25,
    indice_academico = 2.07,
    ingles_cel = TRUE,
    paz_y_salvo = TRUE,
    capitulo_honor = FALSE,
    habilitado_tecnico = TRUE,
    habilitado_licenciatura = TRUE,
    habilitado_ingenieria = FALSE
WHERE cedula = '3-749-2120';

UPDATE estudiantes SET
    plan_estudio = 'LIC. EN DESARROLLO Y GESTIÓN DE SOFTWARE-2023',
    sede = 'PANAMÁ',
    ano_estudio = 4,
    turno = 'DIURNO',
    creditos_aprobados = 148,
    creditos_totales = 148,
    horas_servicio_social = 60,
    horas_voluntariado = 25,
    indice_academico = 2.68,
    ingles_cel = TRUE,
    paz_y_salvo = TRUE,
    capitulo_honor = TRUE,
    habilitado_tecnico = TRUE,
    habilitado_licenciatura = TRUE,
    habilitado_ingenieria = FALSE
WHERE cedula = '8-921-1843';

UPDATE estudiantes SET
    plan_estudio = 'INGENIERÍA DE SOFTWARE-2021',
    sede = 'CHIRIQUÍ',
    ano_estudio = 5,
    turno = 'DIURNO',
    creditos_aprobados = 178,
    creditos_totales = 178,
    horas_servicio_social = 60,
    horas_voluntariado = 30,
    indice_academico = 2.35,
    ingles_cel = TRUE,
    paz_y_salvo = TRUE,
    capitulo_honor = FALSE,
    habilitado_tecnico = TRUE,
    habilitado_licenciatura = TRUE,
    habilitado_ingenieria = TRUE
WHERE cedula = '4-812-963';

UPDATE estudiantes SET
    plan_estudio = 'LIC. EN DESARROLLO Y GESTIÓN DE SOFTWARE-2023',
    sede = 'VERAGUAS',
    ano_estudio = 3,
    turno = 'VESPERTINO',
    creditos_aprobados = 88,
    creditos_totales = 148,
    horas_servicio_social = 40,
    horas_voluntariado = 10,
    indice_academico = 1.89,
    ingles_cel = FALSE,
    paz_y_salvo = TRUE,
    capitulo_honor = FALSE,
    habilitado_tecnico = FALSE,
    habilitado_licenciatura = FALSE,
    habilitado_ingenieria = FALSE
WHERE cedula = '6-715-1094';
