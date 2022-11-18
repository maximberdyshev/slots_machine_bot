import dotenv from 'dotenv'
import knex from 'knex'
import knexfile from '../db/knexfile.js'

dotenv.config({ path: '~/Prog/lm/.env' })

const knx = knex(knexfile[process.env.KNEX_PROFILE])

const DBC = {
  getUser: async (req) => {
    const res = await knx('users')
      .select('id')
      .where({ id: req })
      .then((id) => {
        return id
      })
      .catch((err) => {
        console.log(`DBC.getUser(), err: ${err}`)
        return false
      })

    if (res) {
      if (res.length == 0) {
        return false
      } else {
        return res[0].id
      }
    } else {
      return false
    }
  },

  setUser: async (req) => {
    await knx('users')
      .insert({
        id: req.id,
        first_name: req.first_name,
        last_name: req.last_name,
        nickname: req.nickname,
      })
      .catch((err) => {
        console.log(`DBC.setUser(), err: ${err}`)
        return
      })
  },

  setThrow: async (req) => {
    await knx('game_log')
      .insert({
        date: req.date,
        user_id: req.user_id,
        dice_id: req.dice_id,
        chat_id: req.chat_id,
      })
      .catch((err) => {
        console.log(`DBC.setThrow(), err: ${err}`)
        return
      })
  },
}

export default DBC
