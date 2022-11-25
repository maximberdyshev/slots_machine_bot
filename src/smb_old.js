import dotenv from 'dotenv'
import { Telegraf } from 'telegraf'

dotenv.config({ path: '~/Prog/smb/.env' })

const smb = new Telegraf(process.env.BOT_TOKEN)

let user_stat = []

smb.on('dice', async (ctx) => {
  if (ctx.chat.id != process.env.CHAT_ID) return

  // античит :D
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
    networth: 0,
  }

  let chance = {
    alko: 0,
    berries: 0,
    lemons: 0,
    axes: 0,
  }

  for (let stat of user_stat) {
    if (stat.user_id == ctx.message.from.id) {
      response.user_balance = stat.user_balance
      response.dice_counts = stat.dice_counts
      response.dice_alko = stat.dice_alko
      response.dice_berries = stat.dice_berries
      response.dice_lemons = stat.dice_lemons
      response.dice_axes = stat.dice_axes

      response.networth =
        stat.dice_alko * 100 +
        stat.dice_berries * 100 +
        stat.dice_lemons * 100 +
        stat.dice_axes * 1000 -
        stat.dice_counts * 10

      chance.alko = ((stat.dice_alko * 100) / stat.dice_counts).toFixed(2)
      chance.berries = ((stat.dice_berries * 100) / stat.dice_counts).toFixed(2)
      chance.lemons = ((stat.dice_lemons * 100) / stat.dice_counts).toFixed(2)
      chance.axes = ((stat.dice_axes * 100) / stat.dice_counts).toFixed(2)
    }
  }

  ctx.sendMessage(`${response.user_name}, твоя стата:
    бросков:  ${response.dice_counts}
    бар:  ${response.dice_alko},  (${chance.alko}%)
    ягодки:  ${response.dice_berries},  (${chance.berries}%)
    лимоны:  ${response.dice_lemons},  (${chance.lemons}%)
    топоры:  ${response.dice_axes},  (${chance.axes}%)
    баланc:  ${response.user_balance}
    net worth:  ${response.networth}`)
})

smb.launch()
