/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = (knex) => {
  return knex.schema.createTable('game_log', (table) => {
    table.increments('id').notNullable()
    table.date('date').notNullable()
    table.bigint('user_id').notNullable()
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION')
    table.smallint('dice_id').notNullable()
    table
      .foreign('dice_id')
      .references('id')
      .inTable('dices')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION')
    table.bigint('chat_id').notNullable()
    table
      .foreign('chat_id')
      .references('id')
      .inTable('chats')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = (knex) => {
  // return knex.schema.dropTable('game_log')
}

export { up, down }
