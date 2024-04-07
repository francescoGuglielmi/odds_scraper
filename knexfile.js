import "dotenv/config"

export default {
  development: {
    client: 'pg',
    connection: process.env.CONNECTION_STRING, // connection string
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};