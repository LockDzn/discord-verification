import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('verify', table => {
        table.string('id').notNullable().primary()
        table.string('username').notNullable()
        table.string('discriminator').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('verify')
}

