const { Pool } = require('pg');

const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgresql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

class PostgresPool {
  // Propiedad estática que guardará la instancia única
  static instance = null;

  constructor() {
    if (PostgresPool.instance) {
      // Si ya existe, devolvemos la misma instancia
      return PostgresPool.instance;
    }

    // Creamos el pool nativo de pg
    this.pool = new Pool({ connectionString: URI });

    // Escuchamos errores del pool
    this.pool.on('error', (err) => {
      console.error('Error inesperado en el pool', err);
    });

    console.log('✅ Nueva instancia de Pool creada');

    // Guardamos la instancia para futuras llamadas
    PostgresPool.instance = this;
  }

  // Método de conveniencia para consultas
  async query(sql, params) {
    const result = await this.pool.query(sql, params);
    return result;
  }

  // Método opcional para cerrar el pool si la app se apaga
  async close() {
    await this.pool.end();
    console.log('🔒 Pool cerrado correctamente');
  }
}

module.exports = new PostgresPool(); // Exportamos la única instancia
