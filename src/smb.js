import dotenv from 'dotenv'
import GameState from './GameState.js'
import { Telegraf } from 'telegraf'
import DBC from './DBC.js'

dotenv.config({ path: '~/Prog/smb/.env' })

const smb = new Telegraf(process.env.BOT_TOKEN)

// ограничение на доступ
smb.use(async (ctx, next) => {
  // TODO: данные о доступе можно вынести в память бота
  // и запрашивать обновление раз в несколько минут
  // а не по каждому броску стучать в базу
  const checkAccess = await DBC.getAcces(ctx.chat.id)
  if (!checkAccess) return
  next()
})

smb.on('dice', async (ctx) => {
  const dice = {
    message_id: ctx.message.message_id,
    user_id: ctx.message.from.id,
    date: ctx.message.date,
  }

  GameState.cleanDice(dice, ctx.deleteMessage.bind(ctx))

  // античит :D
  // (не работает против юзербота!)
  // TODO: возможно ограничить? )
  if (ctx.message.forward_date) {
    const replyMSG = await ctx.reply('Читы - бан!')
    const msg = {
      message_id: replyMSG.message_id,
      user_id: replyMSG.from.id,
      date: replyMSG.date,
    }

    GameState.cleanDice(msg, ctx.deleteMessage.bind(ctx))

    // читы - на выход!
    return
  }

  if (ctx.message.dice.emoji != '🎰') {
    return
  } else {
    // проверяем наличие пользователя в БД
    const checkUser = await DBC.getUser(ctx.message.from.id)

    // регистрируем бросок
    const diceThrow = {
      date: new Date(),
      user_id: ctx.message.from.id,
      dice_id: ctx.message.dice.value,
      chat_id: ctx.message.chat.id,
    }

    // если пользователь есть, то просто внести бросок в БД
    if (checkUser) {
      await DBC.setThrow(diceThrow)
      return
    }

    // если пользователя нет, то добавить в БД
    const newUser = {
      id: ctx.message.from.id,
      first_name: ctx.message.from.first_name,
      last_name: ctx.message.from.last_name,
      nickname: ctx.message.from.username,
    }
    await DBC.setUser(newUser)

    // и внести бросок в БД
    await DBC.setThrow(diceThrow)
    return
  }
})

smb.command('my_dices', async (ctx) => {
  const res = {
    message_id: ctx.message.message_id,
    user_id: ctx.message.from.id,
    date: ctx.message.date,
  }

  GameState.cleanMyDice(res, ctx.deleteMessage.bind(ctx))

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

  // проверяем наличие пользователя в БД
  // если по пользователю уже есть стата
  const checkUser = await DBC.getUser(ctx.message.from.id)
  let sendMSG
  if (checkUser) {
    // TODO: сделать 1-м запросом в БД
    response.dice_counts = await DBC.getMyDices(ctx.message.from.id, null)
    response.dice_alko = await DBC.getMyDices(ctx.message.from.id, 'alko')
    response.dice_berries = await DBC.getMyDices(ctx.message.from.id, 'berries')
    response.dice_lemons = await DBC.getMyDices(ctx.message.from.id, 'lemons')
    response.dice_axes = await DBC.getMyDices(ctx.message.from.id, 'axes')

    response.networth = await DBC.getMyNetWorth(ctx.message.from.id)
    response.user_balance = 1000 + Number.parseInt(response.networth)

    chance.alko = ((response.dice_alko * 100) / response.dice_counts).toFixed(2)
    chance.berries = (
      (response.dice_berries * 100) /
      response.dice_counts
    ).toFixed(2)
    chance.lemons = (
      (response.dice_lemons * 100) /
      response.dice_counts
    ).toFixed(2)
    chance.axes = ((response.dice_axes * 100) / response.dice_counts).toFixed(2)

    sendMSG = await ctx.sendMessage(`${response.user_name}, твоя стата:
    бросков:  ${response.dice_counts}
    бар:  ${response.dice_alko},  (${chance.alko}%)
    ягодки:  ${response.dice_berries},  (${chance.berries}%)
    лимоны:  ${response.dice_lemons},  (${chance.lemons}%)
    топоры:  ${response.dice_axes},  (${chance.axes}%)
    баланс: ${response.user_balance}
    net worth:  ${response.networth}`)

    return
  }

  // если пользователь новый, то выводим сообщение
  sendMSG = await ctx.sendMessage(`${ctx.message.from.first_name}, сорян, но по тебе нет статы.. 
Ждёшь особого приглашения? Крути слоты!!!`)

  const msg = {
    message_id: sendMSG.message_id,
    user_id: sendMSG.from.id,
    date: sendMSG.date,
  }

  GameState.cleanMyDice(msg, ctx.deleteMessage.bind(ctx))

  return
})

smb.command('all_stats', async (ctx) => {
  const res = {
    message_id: ctx.message.message_id,
    user_id: ctx.message.from.id,
    date: ctx.message.date,
  }

  GameState.cleanAllStatsLimit(res, ctx.deleteMessage.bind(ctx))

  const allBalance = await DBC.getAllBalance()

  let userStats = []

  for (let balance of allBalance) {
    let user = `${balance.first_name}:   ${
      1000 + Number.parseInt(balance.net_worth)
    }`
    userStats.push(user)
  }

  const sendMSG = await ctx.sendMessage(
    userStats.toString().replaceAll(',', '\n')
  )

  const msg = {
    message_id: sendMSG.message_id,
    user_id: sendMSG.from.id,
    date: sendMSG.date,
  }

  GameState.cleanAllStatsLimit(msg, ctx.deleteMessage.bind(ctx))

  return
})

smb.command('mvp', async (ctx) => {
  const res = {
    message_id: ctx.message.message_id,
    user_id: ctx.message.from.id,
    date: ctx.message.date,
  }

  GameState.cleanMVPLimit(res, ctx.deleteMessage.bind(ctx))

  const mvp = await DBC.getMVP()
  const sendMSG = await ctx.sendMessage(`MVP дня:
Игрок ${mvp[0].first_name}!!! С ценностью в ${mvp[0].net_worth} очков!!
Что за лев этот тигр!!`)

  const msg = {
    message_id: sendMSG.message_id,
    user_id: sendMSG.from.id,
    date: sendMSG.date,
  }

  GameState.cleanMVPLimit(msg, ctx.deleteMessage.bind(ctx))

  return
})

smb.launch()
