import { config } from 'dotenv';
import type { Knex } from 'knex';

config();

const knexConfig: Knex.Config = {
  client: 'mysql',
  connection: process.env.DATABASE_URL,
  migrations: {
    tableName: 'knex_migrations',
    extension: 'ts',
  },
};

module.exports = knexConfig;
