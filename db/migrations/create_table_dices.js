/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = (knex) => {
    return knex.schema.createTable('dices', (table) => {
        table.smallint('id').notNullable()
        table.primary('id')
        table.string('descriptions').notNullable()
        table.string('alias').notNullable().defaultTo('nothing')
        table.integer('price').notNullable().defaultTo('0')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = (knex) => {
    // return knex.schema.dropTable('dices')
}

export { up, down }
