/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const seed = async (knex) => {
  await knex('dices').del()
  await knex('dices').insert([
    { id: 1, descriptions: 'bar, bar, bar', alias: 'alko', price: 100 },
    { id: 2, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 3, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 4, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 5, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 6, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 7, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 8, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 9, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 10, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 11, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 12, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 13, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 14, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 15, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 16, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 17, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 18, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 19, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 20, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 21, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 22, descriptions: 'berry, berry, berry', alias: 'berries', price: 100 },
    { id: 23, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 24, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 25, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 26, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 27, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 28, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 29, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 30, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 31, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 32, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 33, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 34, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 35, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 36, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 37, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 38, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 39, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 40, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 41, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 42, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 43, descriptions: 'lemon, lemon, lemon', alias: 'lemons', price: 100 },
    { id: 44, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 45, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 46, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 47, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 48, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 49, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 50, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 51, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 52, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 53, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 54, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 55, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 56, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 57, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 58, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 59, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 60, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 61, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 62, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 63, descriptions: '-, -, -', alias: 'nothing', price: 0 },
    { id: 64, descriptions: 'seven, seven, seven', alias: 'axes', price: 1000 },
  ])
}

export { seed }
