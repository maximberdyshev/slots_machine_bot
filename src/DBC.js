import dotenv from 'dotenv'
import knex from 'knex'
import knexfile from '../db/knexfile.js'

dotenv.config({ path: '~/Prog/lm/.env' })

const knx = knex(knexfile[process.env.KNEX_PROFILE])

const DBC = {
  getMVP: async () => {
    const res = await knx('mvp_day')
      .select(['first_name', 'net_worth'])
      .then((net_worth) => {
        return net_worth
      })
      .catch((err) => {
        console.log(`DBC.getMVP(), err: ${err}`)
        return false
      })

    if (res) {
      if (res.length == 0) {
        return 0
      } else {
        return res
      }
    } else {
      return 0
    }
  },

  getAllBalance: async () => {
    const res = await knx('net_worth')
      .select(['first_name', 'net_worth'])
      .then((net_worth) => {
        return net_worth
      })
      .catch((err) => {
        console.log(`DBC.getAllBalance(), err: ${err}`)
        return false
      })

    if (res) {
      if (res.length == 0) {
        return 0
      } else {
        return res
      }
    } else {
      return 0
    }
  },

  getMyNetWorth: async (req) => {
    const res = await knx('net_worth')
      .select('net_worth')
      .where({ user_id: req })
      .then((net_worth) => {
        return net_worth
      })
      .catch((err) => {
        console.log(`DBC.getMyNetWorth(), err: ${err}`)
        return false
      })

    if (res) {
      if (res.length == 0) {
        return 0
      } else {
        return res[0].net_worth
      }
    } else {
      return 0
    }
  },

  getMyDices: async (id, tripple) => {
    const res = await knx('tripples')
      .select('amount')
      .where({ user_id: id })
      .andWhere({ tripple: tripple })
      .then((amount) => {
        return amount
      })
      .catch((err) => {
        console.log(`DBC.getMyDices(), err: ${err}`)
        return false
      })

    if (res) {
      if (res.length == 0) {
        return 0
      } else {
        return res[0].amount
      }
    } else {
      return 0
    }
  },

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
        return true
      }
    } else {
      return false
    }
  },

  getAcces: async (req) => {
    const res = await knx('chats')
      .select('is_allowed')
      .where({ id: req })
      .then((is_allowed) => {
        return is_allowed
      })
      .catch((err) => {
        console.log(`DBC.getAcces(), err: ${err}`)
        return false
      })

    if (res) {
      if (res.length == 0) {
        return false
      } else {
        return true
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
