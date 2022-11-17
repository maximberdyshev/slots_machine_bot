/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 const up = (knex) => {
    return knex.schema.createTable('chats', (table) => {
        table.integer('id').notNullable()
        table.primary('id')
        table.boolean('is_allowed').notNullable().defaultTo('false')
        table.string('comment')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = (knex) => {
    // return knex.schema.dropTable('chats')
}

export { up, down }
