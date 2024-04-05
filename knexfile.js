import "dotenv/config"

export default {
  development: {
    client: 'pg',
    connection: process.env.CONNECTION_STRING,
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};