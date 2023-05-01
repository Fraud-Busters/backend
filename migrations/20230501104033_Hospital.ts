import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('hospital', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('contact').notNullable();
    table.string('postalCode').notNullable();
    table.string('address').notNullable();
    table.text('addressDetail').notNullable();
    table.string('regNo').notNullable();
    table.string('licenseNo').notNullable();
    table.string('ceoName').notNullable();
    table.string('ceoPhone').notNullable();
    table.string('managerPhone').notNullable();
    table.text('details').notNullable();
    table.datetime('createdAt').notNullable().defaultTo(knex.fn.now());
    table.datetime('deletedAt');
    table.string('refundName').notNullable();
    table.string('refundBankName').notNullable();
    table.string('refundBankAccount').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('hospital');
}
