import "dotenv/config"

export default {
  development: {
    client: 'pg',
    connection: process.env.CONNECTION_STRING, // connection string
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  test: { // this is a connection to a local database in order to run tests in isolation.
    client: 'pg',
    connection: {
      host: '127.0.0.1', // The local host
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: 'odds_scraper_test_db'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};