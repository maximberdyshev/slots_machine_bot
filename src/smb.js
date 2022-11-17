import dotenv from 'dotenv'
import { Telegraf } from 'telegraf'

dotenv.config({ path: '~/Prog/smb/.env' })

const smb = new Telegraf(process.env.BOT_TOKEN)

let user_stat = []

smb.on('dice', (ctx) => {
  if (ctx.chat.id != process.env.CHAT_ID) return

  if (ctx.message.forward_date) {
    ctx.reply('Читы - бан!')
    return
  }

  let user = {
    user_id: null,
    user_balance: 1000,
    dice_counts: 0,
    dice_alko: 0,
    dice_berries: 0,
    dice_lemons: 0,
    dice_axes: 0,
  }

  const counter = (u) => {
    u.dice_counts += 1
    u.user_balance -= 10
    switch (ctx.message.dice.value) {
      case 1:
        u.dice_alko += 1
        u.user_balance += 100
        return
      case 22:
        u.dice_berries += 1
        u.user_balance += 100
        return
      case 43:
        u.dice_lemons += 1
        u.user_balance += 100
        return
      case 64:
        u.dice_axes += 1
        u.user_balance += 1000
        return
    }
  }

  // первый запуск, статы нет
  if (user_stat.length == 0) {
    user.user_id = ctx.message.from.id
    counter(user)
    user_stat.push(user)
    return
  }

  // поиск пользователя по "бд"
  for (let stat of user_stat) {
    if (stat.user_id == ctx.message.from.id) {
      counter(stat)
      return
    }
  }

  // пользователя нет в "бд"
  user.user_id = ctx.message.from.id
  counter(user)
  user_stat.push(user)
  return
})

smb.command('/my_dices', (ctx) => {
  if (ctx.chat.id != process.env.CHAT_ID) return

  let response = {
    user_name: ctx.message.from.first_name,
    user_balance: 1000,
    dice_counts: 0,
    dice_alko: 0,
    dice_berries: 0,
    dice_lemons: 0,
    dice_axes: 0,
  }

  for (let stat of user_stat) {
    if (stat.user_id == ctx.message.from.id) {
      response.user_balance = stat.user_balance
      response.dice_counts = stat.dice_counts
      response.dice_alko = stat.dice_alko
      response.dice_berries = stat.dice_berries
      response.dice_lemons = stat.dice_lemons
      response.dice_axes = stat.dice_axes
    }
  }

  ctx.sendMessage(`${response.user_name}, твоя стата:
    баланc:  ${response.user_balance}
    бросков:  ${response.dice_counts}
    бар:  ${response.dice_alko}
    ягодки:  ${response.dice_berries}
    лимоны:  ${response.dice_lemons}
    семерки:  ${response.dice_axes}`)
})

smb.launch()
