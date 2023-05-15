import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table) => {
    table.uuid('id').primary();
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
  });

  await knex.schema.createTable('refreshToken', (table) => {
    table.uuid('userId').primary().references('user.id').onDelete('CASCADE');
    table.string('refreshToken').unique().notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('refreshToken');
  await knex.schema.dropTable('user');
}
