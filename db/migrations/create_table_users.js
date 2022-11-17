/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.bigint('id').notNullable()
    table.primary('id')
    table.string('first_name').notNullable()
    table.string('last_name')
    table.string('nickname').notNullable()
    table.string('comment')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = (knex) => {
  // return knex.schema.dropTable('users')
}

export { up, down }
