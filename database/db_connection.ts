/**
 * =====================================================================
 * PROYECTO: DIPLO-UTP
 * Configuración y Conexión de Base de Datos (PostgreSQL 18 / MySQL 8.0+)
 * =====================================================================
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export const DB_CONFIG = {
  postgres: {
    engine: 'PostgreSQL 18',
    host: process.env.PG_HOST || 'localhost',
    port: Number(process.env.PG_PORT || 5432),
    database: process.env.PG_DATABASE || 'diploutp',
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || 'Israel0660',
    get connectionString() {
      return `postgresql://${this.user}:${encodeURIComponent(this.password)}@${this.host}:${this.port}/${this.database}`;
    },
    psqlPath: 'C:\\Program Files\\PostgreSQL\\18\\bin\\psql.exe',
  },
  mysql: {
    engine: 'MySQL 8.0+',
    host: process.env.MYSQL_HOST || '192.168.20.20',
    port: Number(process.env.MYSQL_PORT || 3306),
    database: process.env.MYSQL_DATABASE || 'diploutp',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'Israel0660',
    charset: 'utf8mb4',
  },
};

/**
 * Ejecuta una consulta SQL en PostgreSQL 18 y devuelve el resultado parseado.
 */
export async function queryPostgresJSON<T = any>(sqlQuery: string): Promise<T> {
  const wrappedQuery = `SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json) FROM (${sqlQuery}) t;`;
  const { stdout } = await execFileAsync(
    DB_CONFIG.postgres.psqlPath,
    [DB_CONFIG.postgres.connectionString, '-t', '-A', '-c', wrappedQuery],
    { encoding: 'utf8' }
  );
  const trimmed = stdout.trim();
  return trimmed ? JSON.parse(trimmed) : ([] as unknown as T);
}

/**
 * Ejecuta una sentencia DML (INSERT / UPDATE / DELETE) en PostgreSQL 18.
 */
export async function executePostgresCommand(sqlCommand: string): Promise<string> {
  const { stdout } = await execFileAsync(
    DB_CONFIG.postgres.psqlPath,
    [DB_CONFIG.postgres.connectionString, '-t', '-A', '-c', sqlCommand],
    { encoding: 'utf8' }
  );
  return stdout.trim();
}
