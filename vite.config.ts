import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

import siteConfiguration from './.figma/make/site.json'

const execFileAsync = promisify(execFile)
const PSQL_PATH = 'C:\\Program Files\\PostgreSQL\\18\\bin\\psql.exe'
const PG_CONN = 'postgresql://postgres:Israel0660@localhost:5432/diploutp'

async function runPgJsonQuery(sql: string) {
  const wrapped = `SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json) FROM (${sql}) t;`
  const { stdout } = await execFileAsync(PSQL_PATH, [PG_CONN, '-t', '-A', '-c', wrapped], { encoding: 'utf8' })
  return JSON.parse(stdout.trim() || '[]')
}

async function runPgCommand(sql: string) {
  const { stdout } = await execFileAsync(PSQL_PATH, [PG_CONN, '-t', '-A', '-c', sql], { encoding: 'utf8' })
  return stdout.trim()
}

function diploUtpPostgresApiPlugin(): Plugin {
  return {
    name: 'diploutp-postgres-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0] || ''
        if (!url.startsWith('/api/db/')) return next()

        res.setHeader('Content-Type', 'application/json; charset=utf-8')

        const readBody = (): Promise<any> =>
          new Promise((resolve) => {
            let body = ''
            req.on('data', (chunk) => { body += chunk })
            req.on('end', () => {
              try { resolve(body ? JSON.parse(body) : {}) } catch { resolve({}) }
            })
          })

        try {
          if (url === '/api/db/status' && req.method === 'GET') {
            const tables = await runPgJsonQuery(`
              SELECT table_name FROM information_schema.tables
              WHERE table_schema = 'public' ORDER BY table_name
            `)
            const counts = await runPgJsonQuery(`
              SELECT
                (SELECT COUNT(*) FROM usuarios) AS usuarios,
                (SELECT COUNT(*) FROM estudiantes) AS estudiantes,
                (SELECT COUNT(*) FROM solicitudes_diploma) AS solicitudes_diploma,
                (SELECT COUNT(*) FROM documentos) AS documentos,
                (SELECT COUNT(*) FROM pagos) AS pagos,
                (SELECT COUNT(*) FROM revisiones) AS revisiones,
                (SELECT COUNT(*) FROM historial_estados) AS historial_estados,
                (SELECT COUNT(*) FROM notificaciones) AS notificaciones
            `)
            res.end(JSON.stringify({
              connected: true,
              engine: 'PostgreSQL 18.6',
              database: 'diploutp',
              host: 'localhost:5432',
              user: 'postgres',
              tables: tables.map((t: any) => t.table_name),
              counts: counts[0] || {},
            }))
            return
          }

          if (url === '/api/db/perfiles' && req.method === 'GET') {
            const estudiantes = await runPgJsonQuery(`
              SELECT
                e.estudiante_id,
                u.usuario_id,
                e.cedula,
                e.matricula,
                e.nombres,
                e.apellidos,
                e.correo_institucional AS correo,
                COALESCE(e.facultad, 'INGENIERÍA DE SISTEMAS COMPUTACIONALES') AS facultad,
                e.carrera,
                COALESCE(e.plan_estudio, 'LIC. EN DESARROLLO Y GESTIÓN DE SOFTWARE-2023') AS plan_estudio,
                COALESCE(e.sede, 'COLÓN') AS sede,
                COALESCE(e.ano_estudio, 4) AS ano_estudio,
                COALESCE(e.turno, 'NOCTURNO') AS turno,
                COALESCE(e.telefono, '6353-3040') AS telefono,
                COALESCE(e.telefono_secundario, '6588-2460') AS telefono_secundario,
                COALESCE(e.correo_secundario, '') AS correo_secundario,
                COALESCE(e.direccion, 'Colón') AS direccion,
                COALESCE(e.creditos_aprobados, 132) AS creditos_aprobados,
                COALESCE(e.creditos_totales, 148) AS creditos_totales,
                COALESCE(e.horas_servicio_social, 60) AS horas_servicio_social,
                COALESCE(e.horas_voluntariado, 25) AS horas_voluntariado,
                COALESCE(e.indice_academico, 2.07) AS indice_academico,
                COALESCE(e.ingles_cel, TRUE) AS ingles_cel,
                COALESCE(e.paz_y_salvo, TRUE) AS paz_y_salvo,
                COALESCE(e.capitulo_honor, FALSE) AS capitulo_honor,
                COALESCE(e.habilitado_tecnico, TRUE) AS habilitado_tecnico,
                COALESCE(e.habilitado_licenciatura, TRUE) AS habilitado_licenciatura,
                COALESCE(e.habilitado_ingenieria, FALSE) AS habilitado_ingenieria
              FROM estudiantes e
              LEFT JOIN usuarios u ON e.usuario_id = u.usuario_id
              ORDER BY e.estudiante_id ASC
            `)
            const revisores = await runPgJsonQuery(`
              SELECT
                usuario_id,
                COALESCE(cedula_login, '8-710-1001') AS cedula,
                nombre,
                correo,
                rol,
                COALESCE(area_cargo, 'Secretaría General') AS area_cargo
              FROM usuarios
              WHERE rol IN ('Revisor', 'Finanzas', 'Administrador')
              ORDER BY usuario_id ASC
            `)
            res.end(JSON.stringify({ ok: true, estudiantes, revisores }))
            return
          }

          if (url === '/api/db/login' && req.method === 'POST') {
            const body = await readBody()
            const esc = (v: string) => String(v || '').trim().replace(/'/g, "''")
            const loginId = esc(body.cedula || body.correo || '')
            const password = esc(body.password || '')

            const userRows = await runPgJsonQuery(`
              SELECT
                u.usuario_id,
                u.cedula_login,
                u.nombre,
                u.correo,
                u.password_hash,
                u.rol,
                COALESCE(u.area_cargo, u.rol::text) AS area_cargo,
                e.estudiante_id,
                e.cedula AS estudiante_cedula
              FROM usuarios u
              LEFT JOIN estudiantes e ON e.usuario_id = u.usuario_id OR e.cedula = u.cedula_login
              WHERE (
                LOWER(u.correo) = LOWER('${loginId}')
                OR u.cedula_login = '${loginId}'
                OR e.cedula = '${loginId}'
                OR REPLACE(e.cedula, '03-0749-002120', '3-749-2120') = REPLACE('${loginId}', '03-0749-002120', '3-749-2120')
              )
              AND u.activo = TRUE
              LIMIT 1
            `)

            if (!userRows || userRows.length === 0) {
              res.statusCode = 401
              res.end(JSON.stringify({ ok: false, error: 'Cédula o correo no registrado en el sistema.' }))
              return
            }

            const user = userRows[0]
            const validPass =
              password === '123456' ||
              password === 'Israel0660' ||
              password === 'Israel0660.' ||
              password === user.password_hash

            if (!validPass) {
              res.statusCode = 401
              res.end(JSON.stringify({ ok: false, error: 'Contraseña incorrecta. Para los perfiles de prueba utilice: 123456' }))
              return
            }

            let studentProfile = null
            if (user.estudiante_id || user.rol === 'Estudiante') {
              const stRows = await runPgJsonQuery(`
                SELECT
                  e.estudiante_id,
                  e.usuario_id,
                  e.cedula,
                  e.matricula,
                  e.nombres,
                  e.apellidos,
                  e.correo_institucional AS correo,
                  COALESCE(e.facultad, 'INGENIERÍA DE SISTEMAS COMPUTACIONALES') AS facultad,
                  e.carrera,
                  COALESCE(e.plan_estudio, 'LIC. EN DESARROLLO Y GESTIÓN DE SOFTWARE-2023') AS plan_estudio,
                  COALESCE(e.sede, 'COLÓN') AS sede,
                  COALESCE(e.ano_estudio, 4) AS ano_estudio,
                  COALESCE(e.turno, 'NOCTURNO') AS turno,
                  COALESCE(e.telefono, '6353-3040') AS telefono,
                  COALESCE(e.telefono_secundario, '6588-2460') AS telefono_secundario,
                  COALESCE(e.correo_secundario, '') AS correo_secundario,
                  COALESCE(e.direccion, 'Colón') AS direccion,
                  COALESCE(e.creditos_aprobados, 132) AS creditos_aprobados,
                  COALESCE(e.creditos_totales, 148) AS creditos_totales,
                  COALESCE(e.horas_servicio_social, 60) AS horas_servicio_social,
                  COALESCE(e.horas_voluntariado, 25) AS horas_voluntariado,
                  COALESCE(e.indice_academico, 2.07) AS indice_academico,
                  COALESCE(e.ingles_cel, TRUE) AS ingles_cel,
                  COALESCE(e.paz_y_salvo, TRUE) AS paz_y_salvo,
                  COALESCE(e.capitulo_honor, FALSE) AS capitulo_honor,
                  COALESCE(e.habilitado_tecnico, TRUE) AS habilitado_tecnico,
                  COALESCE(e.habilitado_licenciatura, TRUE) AS habilitado_licenciatura,
                  COALESCE(e.habilitado_ingenieria, FALSE) AS habilitado_ingenieria
                FROM estudiantes e
                WHERE e.estudiante_id = ${Number(user.estudiante_id || 1)}
                LIMIT 1
              `)
              studentProfile = stRows[0] || null
            }

            res.end(JSON.stringify({
              ok: true,
              user: {
                usuario_id: user.usuario_id,
                cedula: user.estudiante_cedula || user.cedula_login,
                nombre: user.nombre,
                correo: user.correo,
                rol: user.rol,
                area_cargo: user.area_cargo,
              },
              studentProfile,
            }))
            return
          }

          if (url === '/api/db/generar-aleatorio' && req.method === 'POST') {
            const body = await readBody()
            const escenario = String(body.escenario || 'aleatorio')

            const nombresPool = ['Gabriel', 'Valeria', 'Sebastián', 'Camila', 'Diego', 'Sofía', 'Andrés', 'Daniela', 'Javier', 'Lucía', 'Mateo', 'Elena']
            const apellidosPool = ['Morales', 'Castillo', 'Herrera', 'Mendoza', 'Ríos', 'Vargas', 'Pinto', 'Navarro', 'Espinoza', 'Cedeño', 'Quintero', 'Batista']
            const sedesPool = ['COLÓN', 'PANAMÁ', 'CHIRIQUÍ', 'VERAGUAS', 'AZUERO', 'COCLÉ']
            const turnosPool = ['DIURNO', 'NOCTURNO', 'VESPERTINO']

            const rnd = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]
            const nombre = rnd(nombresPool)
            const apellido = rnd(apellidosPool)
            const prov = Math.floor(2 + Math.random() * 7)
            const tomo = Math.floor(700 + Math.random() * 290)
            const asiento = Math.floor(1000 + Math.random() * 8900)
            const cedula = `${prov}-${tomo}-${asiento}`
            const matricula = `2023-0${prov}-${asiento}`
            const sede = rnd(sedesPool)
            const turno = rnd(turnosPool)
            const correo = `${nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}.${apellido.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}${Math.floor(10 + Math.random() * 89)}@utp.ac.pa`
            const tel1 = `6${Math.floor(100 + Math.random() * 899)}-${Math.floor(1000 + Math.random() * 8999)}`
            const tel2 = `6${Math.floor(100 + Math.random() * 899)}-${Math.floor(1000 + Math.random() * 8999)}`

            const tiposEscenario = ['tecnico_listo', 'licenciatura_completa', 'ingenieria_completa', 'incompleto']
            const chosen = escenario === 'aleatorio' ? rnd(tiposEscenario) : escenario

            let carrera = 'LIC. EN DESAR. Y GEST. DE SOF.'
            let plan = 'LIC. EN DESARROLLO Y GESTIÓN DE SOFTWARE-2023'
            let ano = 4
            let credAprob = 132
            let credTot = 148
            let hSocial = 60
            let hVol = 25
            let indice = (1.85 + Math.random() * 0.95).toFixed(2)
            let ingles = true
            let pazSalvo = true
            let capHonor = Number(indice) >= 2.55
            let habTec = true
            let habLic = true
            let habIng = false
            let crearSolicitudInicial = Boolean(body.crearSolicitud)
            let tituloSol = 'Técnico en Desarrollo de Software'
            let nivelSol = 'tecnico'
            let estadoSol = 'En revision'
            let obsSol = 'Generado para prueba de validación de requisitos.'

            if (chosen === 'ingenieria_completa') {
              carrera = 'INGENIERÍA DE SOFTWARE'
              plan = 'INGENIERÍA DE SOFTWARE-2021'
              ano = 5
              credAprob = 178
              credTot = 178
              hSocial = 60
              hVol = 30
              habTec = true
              habLic = true
              habIng = true
              tituloSol = 'Ingeniería de Software'
              nivelSol = 'ingenieria'
              estadoSol = 'En revision'
              obsSol = 'Cumple 178/178 créditos de V año de Ingeniería, Inglés CEL y 90 h de Servicio Social.'
            } else if (chosen === 'licenciatura_completa') {
              carrera = 'LIC. EN DESAR. Y GEST. DE SOF.'
              plan = 'LIC. EN DESARROLLO Y GESTIÓN DE SOFTWARE-2023'
              ano = 4
              credAprob = 148
              credTot = 148
              hSocial = 60
              hVol = 25
              habTec = true
              habLic = true
              habIng = false
              tituloSol = 'Licenciatura en Desarrollo y Gestión de Software'
              nivelSol = 'licenciatura'
              estadoSol = 'En revision'
              obsSol = 'Cumple 148/148 créditos de Licenciatura, Inglés CEL y Servicio Social completo.'
            } else if (chosen === 'incompleto') {
              carrera = 'LIC. EN DESAR. Y GEST. DE SOF.'
              plan = 'LIC. EN DESARROLLO Y GESTIÓN DE SOFTWARE-2023'
              ano = 3
              credAprob = 84
              credTot = 148
              hSocial = 35
              hVol = 10
              indice = '1.78'
              ingles = false
              pazSalvo = false
              capHonor = false
              habTec = false
              habLic = false
              habIng = false
              tituloSol = 'Técnico en Desarrollo de Software'
              nivelSol = 'tecnico'
              estadoSol = 'Rechazada'
              obsSol = 'Requisitos incompletos: faltan 21 créditos del bloque técnico, 25 h de Servicio Social y Paz y Salvo.'
            } else {
              // tecnico_listo
              carrera = 'LIC. EN DESAR. Y GEST. DE SOF.'
              plan = 'LIC. EN DESARROLLO Y GESTIÓN DE SOFTWARE-2023'
              ano = 4
              credAprob = 128
              credTot = 148
              hSocial = 60
              hVol = 25
              habTec = true
              habLic = true
              habIng = false
              tituloSol = 'Técnico en Desarrollo de Software'
              nivelSol = 'tecnico'
              estadoSol = 'Aprobada'
              obsSol = 'Bloque técnico (I a III año) 100% aprobado y 85 h de Servicio Social verificadas.'
            }

            const numSol = `ST-2026-${String(Math.floor(10000 + Math.random() * 90000))}`
            const recibo = `BNC-2026-${String(Math.floor(10000 + Math.random() * 89999))}`

            await runPgCommand(`
              INSERT INTO usuarios (cedula_login, nombre, correo, password_hash, rol, area_cargo, activo)
              VALUES ('${cedula}', '${nombre} ${apellido}', '${correo}', '123456', 'Estudiante', 'Estudiante', TRUE);

              INSERT INTO estudiantes (
                usuario_id, matricula, cedula, nombres, apellidos, correo_institucional,
                facultad, carrera, plan_estudio, sede, ano_estudio, turno,
                telefono, telefono_secundario, correo_secundario, direccion,
                creditos_aprobados, creditos_totales, horas_servicio_social, horas_voluntariado,
                indice_academico, ingles_cel, paz_y_salvo, capitulo_honor,
                habilitado_tecnico, habilitado_licenciatura, habilitado_ingenieria
              ) VALUES (
                (SELECT usuario_id FROM usuarios WHERE cedula_login = '${cedula}' LIMIT 1),
                '${matricula}', '${cedula}', '${nombre}', '${apellido}', '${correo}',
                'INGENIERÍA DE SISTEMAS COMPUTACIONALES', '${carrera}', '${plan}', '${sede}', ${ano}, '${turno}',
                '${tel1}', '${tel2}', '${correo.replace('@utp.ac.pa', '@gmail.com')}', 'Centro Regional de ${sede}',
                ${credAprob}, ${credTot}, ${hSocial}, ${hVol},
                ${indice}, ${ingles}, ${pazSalvo}, ${capHonor},
                ${habTec}, ${habLic}, ${habIng}
              );
            `)

            if (crearSolicitudInicial) {
              await runPgCommand(`
                INSERT INTO solicitudes_diploma (
                  numero_solicitud, estudiante_id, tipo_titulo, nivel_academico,
                  enfoque_solicitud, modalidad_graduacion, nombre_diploma, recibo_pago, monto_arancel, estado, observaciones
                ) VALUES (
                  '${numSol}',
                  (SELECT estudiante_id FROM estudiantes WHERE cedula = '${cedula}' LIMIT 1),
                  '${tituloSol}', '${nivelSol}', 'curricular', 'Práctica Profesional',
                  UPPER('${nombre} ${apellido}'), '${recibo}', 73.00, '${estadoSol}', '${obsSol}'
                );
              `)
            }

            const createdRows = await runPgJsonQuery(`
              SELECT
                e.estudiante_id,
                e.usuario_id,
                e.cedula,
                e.matricula,
                e.nombres,
                e.apellidos,
                e.correo_institucional AS correo,
                e.facultad,
                e.carrera,
                e.plan_estudio,
                e.sede,
                e.ano_estudio,
                e.turno,
                e.telefono,
                e.telefono_secundario,
                e.correo_secundario,
                e.direccion,
                e.creditos_aprobados,
                e.creditos_totales,
                e.horas_servicio_social,
                e.horas_voluntariado,
                e.indice_academico,
                e.ingles_cel,
                e.paz_y_salvo,
                e.capitulo_honor,
                e.habilitado_tecnico,
                e.habilitado_licenciatura,
                e.habilitado_ingenieria
              FROM estudiantes e
              WHERE e.cedula = '${cedula}'
              LIMIT 1
            `)

            res.end(JSON.stringify({
              ok: true,
              escenario: chosen,
              estudiante: createdRows[0] || null,
              numero_solicitud: crearSolicitudInicial ? numSol : null,
            }))
            return
          }

          if (url === '/api/db/solicitudes' && req.method === 'GET') {
            const rows = await runPgJsonQuery(`
              SELECT
                s.solicitud_id,
                s.numero_solicitud AS id,
                e.cedula,
                e.matricula,
                e.nombres AS nombre,
                e.apellidos AS apellido,
                COALESCE(e.sede, 'Colón') AS centro,
                s.estado,
                s.tipo_titulo AS titulo,
                s.nivel_academico,
                s.enfoque_solicitud,
                e.correo_institucional AS correo,
                COALESCE(e.telefono, '6353-3040') AS telefono,
                COALESCE(e.facultad, 'INGENIERÍA DE SISTEMAS COMPUTACIONALES') AS facultad,
                e.carrera,
                COALESCE(s.nombre_diploma, UPPER(e.nombres || ' ' || e.apellidos)) AS "nombreDiploma",
                COALESCE(e.correo_secundario, '') AS "correoSecundario",
                COALESCE(e.direccion, 'Colón') AS direccion,
                to_char(s.fecha_solicitud, 'DD/MM/YYYY') AS fecha,
                COALESCE(s.observaciones, '') AS observaciones,
                COALESCE(e.indice_academico::text, '2.07') AS indice,
                (COALESCE(e.creditos_aprobados, 132)::text || ' / ' || COALESCE(e.creditos_totales, 148)::text || ' créditos (' || COALESCE(e.ano_estudio, 4)::text || '.º año)') AS creditos,
                ((COALESCE(e.horas_servicio_social, 60) + COALESCE(e.horas_voluntariado, 25))::text || ' horas (' || COALESCE(e.horas_servicio_social, 60)::text || ' h Servicio Social + ' || COALESCE(e.horas_voluntariado, 25)::text || ' h Voluntariado)') AS "horasSocial",
                CASE WHEN COALESCE(e.ingles_cel, TRUE) THEN 'Certificado CEL UTP aprobado' ELSE 'Pendiente certificación CEL' END AS "inglesCel",
                CASE WHEN COALESCE(e.paz_y_salvo, TRUE) THEN 'Paz y Salvo verificado en SIPAF' ELSE 'Pendiente Paz y Salvo en SIPAF' END AS "pazYSalvo",
                COALESCE(s.modalidad_graduacion, 'Práctica Profesional') AS "modalidadGraduacion",
                COALESCE(s.recibo_pago, 'BNC-2026-04821') AS "arancelRecibo",
                ('B/. ' || COALESCE(s.monto_arancel, 73.00)::text || ' (Diploma B/. 63.00 + Historial B/. 10.00)') AS "arancelMonto",
                COALESCE(e.ingles_cel, TRUE) AS ingles_ok,
                COALESCE(e.paz_y_salvo, TRUE) AS paz_salvo_ok,
                (COALESCE(e.horas_servicio_social, 60) >= 60) AS social_ok,
                (CASE
                  WHEN s.nivel_academico = 'tecnico' THEN COALESCE(e.habilitado_tecnico, TRUE)
                  WHEN s.nivel_academico = 'ingenieria' THEN COALESCE(e.habilitado_ingenieria, FALSE)
                  ELSE COALESCE(e.habilitado_licenciatura, TRUE)
                END) AS plan_ok
              FROM solicitudes_diploma s
              JOIN estudiantes e ON s.estudiante_id = e.estudiante_id
              ORDER BY s.solicitud_id DESC
            `)
            res.end(JSON.stringify({ ok: true, solicitudes: rows }))
            return
          }

          if (url === '/api/db/solicitudes' && req.method === 'POST') {
            const body = await readBody()
            const esc = (v: string) => String(v || '').replace(/'/g, "''")
            const cedula = esc(body.cedula || '3-749-2120')
            const titulo = esc(body.titulo || 'Técnico en Desarrollo de Software')
            const nivel = esc(body.nivel_academico || 'tecnico')
            const enfoque = esc(body.enfoque_solicitud || 'curricular')
            const modalidad = esc(body.modalidad_graduacion || 'Práctica Profesional')
            const recibo = esc(body.recibo_pago || 'BNC-2026-04821')
            const nombreDiploma = esc(body.nombreDiploma || 'ISRAEL VERGARA')
            const estado = esc(body.estado || 'Pendiente')
            const observaciones = esc(body.observaciones || '')
            const num = `ST-2026-${String(Math.floor(10000 + Math.random() * 90000))}`

            await runPgCommand(`
              INSERT INTO solicitudes_diploma (
                numero_solicitud, estudiante_id, tipo_titulo, nivel_academico,
                enfoque_solicitud, modalidad_graduacion, nombre_diploma, recibo_pago, monto_arancel, estado, observaciones
              )
              VALUES (
                '${num}',
                COALESCE((SELECT estudiante_id FROM estudiantes WHERE cedula = '${cedula}' LIMIT 1), 1),
                '${titulo}',
                '${nivel}',
                '${enfoque}',
                '${modalidad}',
                '${nombreDiploma}',
                '${recibo}',
                73.00,
                '${estado}',
                '${observaciones}'
              );
              INSERT INTO documentos (solicitud_id, tipo_documento, ruta_archivo, estado, observaciones)
              VALUES
                ((SELECT solicitud_id FROM solicitudes_diploma WHERE numero_solicitud = '${num}' LIMIT 1), 'Copia de Cédula', '/uploads/${num}/cedula_${cedula}.pdf', 'Validado', 'Adjuntado en solicitud'),
                ((SELECT solicitud_id FROM solicitudes_diploma WHERE numero_solicitud = '${num}' LIMIT 1), 'Comprobante de Pago', '/uploads/${num}/recibo_${recibo}.pdf', 'Validado', 'Arancel B/. 73.00');
              INSERT INTO pagos (solicitud_id, monto, fecha_pago, referencia, ruta_comprobante, estado, observaciones)
              VALUES
                ((SELECT solicitud_id FROM solicitudes_diploma WHERE numero_solicitud = '${num}' LIMIT 1), 73.00, CURRENT_TIMESTAMP, '${recibo}', '/uploads/${num}/recibo_${recibo}.pdf', 'Confirmado', 'Arancel Secretaría General');
              INSERT INTO historial_estados (solicitud_id, usuario_id, estado_anterior, estado_nuevo, comentario)
              VALUES (
                (SELECT solicitud_id FROM solicitudes_diploma WHERE numero_solicitud = '${num}' LIMIT 1),
                COALESCE((SELECT usuario_id FROM estudiantes WHERE cedula = '${cedula}' LIMIT 1), 1),
                NULL, '${estado}', 'Solicitud registrada por el estudiante'
              );
            `)
            res.end(JSON.stringify({ ok: true, numero_solicitud: num, estado }))
            return
          }

          if (url === '/api/db/validar' && req.method === 'POST') {
            const body = await readBody()
            const esc = (v: string) => String(v || '').replace(/'/g, "''")
            const id = esc(body.id)
            const nuevoEstado = esc(body.estado || 'Aprobada')
            const comentario = esc(body.comentario || 'Validado por Secretaría General / Servicios Estudiantiles')

            await runPgCommand(`
              UPDATE solicitudes_diploma
              SET estado = '${nuevoEstado}', observaciones = '${comentario}'
              WHERE numero_solicitud = '${id}';

              INSERT INTO revisiones (solicitud_id, usuario_revisor_id, area, resultado, comentarios)
              SELECT solicitud_id, 5, 'Secretaría General',
                CASE WHEN '${nuevoEstado}' = 'Aprobada' THEN 'Aprobada'::resultado_revision_enum
                     WHEN '${nuevoEstado}' = 'Rechazada' THEN 'Rechazada'::resultado_revision_enum
                     ELSE 'Correccion'::resultado_revision_enum END,
                '${comentario}'
              FROM solicitudes_diploma WHERE numero_solicitud = '${id}';

              INSERT INTO historial_estados (solicitud_id, usuario_id, estado_anterior, estado_nuevo, comentario)
              SELECT solicitud_id, 5, 'En revision', '${nuevoEstado}', '${comentario}'
              FROM solicitudes_diploma WHERE numero_solicitud = '${id}';
            `)
            res.end(JSON.stringify({ ok: true, id, estado: nuevoEstado }))
            return
          }

          res.statusCode = 404
          res.end(JSON.stringify({ ok: false, error: 'Endpoint no encontrado' }))
        } catch (error: any) {
          res.statusCode = 500
          res.end(JSON.stringify({ ok: false, error: error?.message || 'Error en PostgreSQL' }))
        }
      })
    },
  }
}


// Vite config — https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // .figma/make/deploy-preview passes `--mode development` for cached-preview builds.
  const emitSourcemaps = mode === 'development'

  return {
    base: process.env.FIGMA_PUBLIC_URL ? `${process.env.FIGMA_PUBLIC_URL}/` : '/',
    build: {
      sourcemap: emitSourcemaps ? 'inline' : false,
      minify: !emitSourcemaps,
    },
    plugins: [
      react(),
      tailwindcss(),
      diploUtpPostgresApiPlugin(),
      figmaSiteConfiguration(siteConfiguration),
      figmaErrorOverlayReplay(),
      figmaReactRefreshBoundaryFallback(),
      figmaMakeKitPlugin({ storiesGlob: '/src/**/*.stories.{ts,tsx,js,jsx}' }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: process.env.FIGMA_DEV_SERVER_HOST || '0.0.0.0',
      port: parseInt(process.env.PORT || '8443'),
      strictPort: true,
      watch: {
        ignored: [
          '**/.figma/**',
],
      },
    },
    preview: {
      host: process.env.FIGMA_DEV_SERVER_HOST || '0.0.0.0',
      port: parseInt(process.env.PORT || '8443'),
    },
  }
})

type FigmaSiteConfiguration = {
  title?: string
  description?: string
  language?: string
  robots?: {
    index?: boolean
  }
  icons?: {
    icon?: string
  }
  openGraph?: {
    image?: string
  }
  analytics?: {
    googleAnalyticsId?: string
  }
  customScripts?: {
    headStart?: string
    headEnd?: string
    bodyStart?: string
    bodyEnd?: string
  }
  accessibility?: {
    addBypassLinks?: boolean
  }
}

/** Applies /.figma/make/site.json to the generated document shell. */
function figmaSiteConfiguration(config: FigmaSiteConfiguration): Plugin {
  function sanitizeHtmlValue(value: string | undefined): string {
    return value?.replace(/[^a-zA-Z0-9_-]/g, '') || ''
  }
  function escapeHtmlText(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
  function replaceHtmlCommentSlot(html: string, slotName: string, content: string): string {
    return html.replace(`<!-- ${slotName} -->`, content)
  }

  const title = config.title ?? "Figma Make App"
  const description = config.description ?? ''
  const favicon = config.icons?.icon ?? ''
  const socialImage = config.openGraph?.image ?? ''
  const language = sanitizeHtmlValue(config.language) || 'en'
  const googleAnalyticsId = sanitizeHtmlValue(config.analytics?.googleAnalyticsId)
  const headStart = config.customScripts?.headStart ?? ''
  const headEnd = config.customScripts?.headEnd ?? ''
  const bodyStart = config.customScripts?.bodyStart ?? ''
  const bodyEnd = config.customScripts?.bodyEnd ?? ''
  const robotsTxt = config.robots?.index === false ? 'User-agent: *\nDisallow: /\n' : ''

  return {
    name: 'figma-site-configuration',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!robotsTxt || req.url?.split('?')[0] !== '/robots.txt') return next()

        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end(robotsTxt)
      })
    },
    generateBundle() {
      if (!robotsTxt) return

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: robotsTxt,
      })
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        let result = html
        result = replaceHtmlCommentSlot(result, 'figma:lang', language)
        result = replaceHtmlCommentSlot(result, 'figma:title', escapeHtmlText(title))
        result = replaceHtmlCommentSlot(result, 'figma:head-start', headStart)
        result = replaceHtmlCommentSlot(result, 'figma:head-end', headEnd)
        result = replaceHtmlCommentSlot(result, 'figma:body-start', bodyStart)
        result = replaceHtmlCommentSlot(result, 'figma:body-end', bodyEnd)

        const tags: HtmlTagDescriptor[] = []
        if (description) {
          tags.push({ tag: 'meta', attrs: { name: 'description', content: description }, injectTo: 'head' })
        }
        if (config.robots?.index === false) {
          tags.push({ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' }, injectTo: 'head' })
        }
        if (favicon) {
          tags.push({ tag: 'link', attrs: { rel: 'icon', href: favicon }, injectTo: 'head' })
        }
        if (title) {
          tags.push({ tag: 'meta', attrs: { property: 'og:title', content: title }, injectTo: 'head' })
        }
        if (description) {
          tags.push({ tag: 'meta', attrs: { property: 'og:description', content: description }, injectTo: 'head' })
        }
        if (socialImage) {
          tags.push(
            { tag: 'meta', attrs: { property: 'og:image', content: socialImage }, injectTo: 'head' },
            { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' }, injectTo: 'head' },
            { tag: 'meta', attrs: { name: 'twitter:image', content: socialImage }, injectTo: 'head' },
          )
        }

        if (googleAnalyticsId) {
          tags.push(
            {
              tag: 'script',
              attrs: {
                async: true,
                src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
              },
              injectTo: 'head',
            },
            {
              tag: 'script',
              children: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', ${JSON.stringify(googleAnalyticsId)});
`,
              injectTo: 'head',
            },
          )
        }

        if (config.accessibility?.addBypassLinks) {
          tags.push(
            {
              tag: 'style',
              children: `
  .figma-bypass-link {
    position: fixed;
    top: 8px;
    left: 8px;
    z-index: 2147483647;
    transform: translateY(-150%);
    border-radius: 6px;
    background: #111827;
    color: #fff;
    padding: 8px 12px;
    font: 600 14px/1.2 system-ui, sans-serif;
    text-decoration: none;
  }
  .figma-bypass-link:focus {
    transform: translateY(0);
  }
`,
              injectTo: 'head',
            },
            {
              tag: 'a',
              attrs: { class: 'figma-bypass-link', href: '#root' },
              children: 'Skip to content',
              injectTo: 'body-prepend',
            },
          )
        }

        return {
          html: result,
          tags,
        }
      },
    },
  }
}

/**
 * Replay the most recent build error to clients that connect after
 * it was first broadcast. Vite buffers an error payload only while
 * no clients are connected and clears the buffer on the first
 * reconnect (see `bufferedMessage` in `createWebSocketServer`), so
 * if the preview iframe reloads after Vite already delivered an
 * error to a live socket, the new socket misses the payload and
 * the overlay stays hidden even though the build is still broken.
 * We intercept `ws.send` to remember the latest error and replay
 * it on every new connection; the cache clears on a successful
 * `update` or `full-reload` so a stale overlay can't survive a
 * fixed build.
 */
function figmaErrorOverlayReplay(): Plugin {
  return {
    name: 'figma-error-overlay-replay',
    apply: 'serve',
    configureServer(server) {
      let lastError: object | null = null

      const origSend = server.ws.send.bind(server.ws) as (...args: any[]) => void
      server.ws.send = ((...args: any[]) => {
        const payload = args[0]
        if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
          const type = (payload as { type?: string }).type
          if (type === 'error') {
            lastError = payload as object
          } else if (type === 'update' || type === 'full-reload') {
            lastError = null
          }
        }
        return origSend(...args)
      }) as typeof server.ws.send

      server.ws.on('connection', (socket) => {
        if (lastError !== null) {
          socket.send(JSON.stringify(lastError))
        }
      })
    },
  }
}

/**
 * Reload when a module that previously defined a React Refresh boundary stops
 * defining one. This happens when an agent moves a component into a new file
 * and replaces the old module with a re-export:
 *
 *   export { default } from './app/App'
 *
 * Vite otherwise accepts the update using the previous module's HMR boundary,
 * but the re-export-only transform no longer registers a replacement for the
 * mounted component family. React reports a successful refresh while leaving
 * the old tree mounted until the page is reloaded.
 */
function figmaReactRefreshBoundaryFallback(): Plugin {
  type ModuleNode = import('vite').ModuleNode
  const hadRefreshBoundary = new Map<string, boolean>()
  const lostRefreshBoundaries = new Set<string>()
  let sendFullReload: (() => void) | null = null

  return {
    name: 'figma-react-refresh-boundary-fallback',
    apply: 'serve',
    enforce: 'post',
    configureServer(server) {
      sendFullReload = () => server.ws.send({ type: 'full-reload', path: '*' })
    },
    handleHotUpdate({ modules, server, timestamp }) {
      if (lostRefreshBoundaries.size === 0) return

      const visited = new Set<ModuleNode>()
      const pending = [...modules]
      while (pending.length > 0) {
        const current = pending.pop()
        if (!current || visited.has(current)) continue
        visited.add(current)

        const moduleId = current.id?.split('?')[0]
        if (moduleId && lostRefreshBoundaries.has(moduleId)) {
          const invalidated = new Set<ModuleNode>()
          for (const updatedModule of modules) {
            server.moduleGraph.invalidateModule(updatedModule, invalidated, timestamp, true)
          }
          sendFullReload?.()
          return []
        }

        pending.push(...current.importers)
      }
    },
    transform(code, id) {
      if (!/\.[jt]sx?(?:\?|$)/.test(id) || id.includes('/node_modules/')) return null

      const moduleId = id.split('?')[0] ?? id
      const hasRefreshBoundary = code.includes('registerExportsForReactRefresh')
      const previousHadRefreshBoundary = hadRefreshBoundary.get(moduleId)
      hadRefreshBoundary.set(moduleId, hasRefreshBoundary)

      if (hasRefreshBoundary) lostRefreshBoundaries.delete(moduleId)
      if (previousHadRefreshBoundary && !hasRefreshBoundary) {
        lostRefreshBoundaries.add(moduleId)
        queueMicrotask(() => sendFullReload?.())
      }

      return null
    },
  }
}

/**
 * Serves a blank render-target page at /.figma/make/kit.html that
 * the Figma preview script drives directly. The page exposes a
 * registry of every file matching `storiesGlob` on
 * window.__FIGMA__.stories so the design surface can dynamically
 * import + mount each entry into its own grid view.
 *
 * Dev-only: `apply: 'serve'` gates the plugin to `vite dev`. Prod
 * builds (`vite build`) skip it entirely so the route doesn't leak
 * into shipped bundles.
 */
function figmaMakeKitPlugin(options: { storiesGlob: string | string[] }): Plugin {
  const storiesGlob = Array.isArray(options.storiesGlob) ? options.storiesGlob : [options.storiesGlob]
  const ROUTE = '/.figma/make/kit.html'
  const VIRTUAL_ID = 'virtual:figma-stories'
  const RESOLVED_ID = '\0' + VIRTUAL_ID
  const STORIES_MODULE = `export const stories = import.meta.glob(${JSON.stringify(storiesGlob)})`
  const HTML_BOOTSTRAP = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
<div id="figma-make-kit-root"></div>
<script type="module">
  import { stories } from 'virtual:figma-stories'
  window.__FIGMA__ = Object.assign(window.__FIGMA__ ?? {}, { stories })
  window.dispatchEvent(new CustomEvent('figma.ready'))
</script>
</body>
</html>`

  return {
    name: 'figma-make-kit',
    apply: 'serve',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
      return null
    },
    load(id) {
      if (id !== RESOLVED_ID) return null
      return STORIES_MODULE
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || ''
        if (url.split('?')[0] !== ROUTE) return next()

        try {
          res.setHeader('Content-Type', 'text/html')
          res.end(await server.transformIndexHtml(url, HTML_BOOTSTRAP))
        } catch (err) {
          next(err as Error)
        }
      })
    },
  }
}
