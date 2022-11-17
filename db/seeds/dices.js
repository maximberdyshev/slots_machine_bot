/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const seed = async (knex) => {
  await knex('dices').del()
  await knex('dices').insert([
    {id: 1, descriptions: 'bar, bar, bar', alias: 'alko', price: 100,},
    {id: 22, descriptions: 'berry, berry, berry', alias: 'berries', price: 100,},
    {id: 43, descriptions: 'lemon, lemon, lemon', alias: 'lemons', price: 100,},
    {id: 64, descriptions: 'seven, seven, seven', alias: 'axes', price: 1000,},
  ])
}

export { seed }
