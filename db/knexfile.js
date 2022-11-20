import dotenv from 'dotenv'

dotenv.config({ path: '~/Prog/smb/.env' })

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const knexfile = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  // staging: {},

  // production: {},
}

export default knexfile
