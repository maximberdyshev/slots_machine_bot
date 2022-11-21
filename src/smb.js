import dotenv from 'dotenv'
import { Telegraf } from 'telegraf'
import DBC from './DBC.js'

dotenv.config({ path: '~/Prog/smb/.env' })

const smb = new Telegraf(process.env.BOT_TOKEN)

smb.on('dice', async (ctx) => {
  // ограничение на доступ
  // TODO: сделать проверку через таблицу в БД
  //   if (ctx.chat.id != process.env.CHAT_ID) return
  const checkAccess = await DBC.getAcces(ctx.chat.id)
  if (!checkAccess) return

  // античит :D
  // (не работает против юзербота!)
  // TODO: возможно ограничить? )
  if (ctx.message.forward_date) {
    ctx.reply('Читы - бан!')
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

smb.command('/my_dices', async (ctx) => {
  // ограничение на доступ
  // TODO: сделать проверку через таблицу в БД
  //   if (ctx.chat.id != process.env.CHAT_ID) return
  const checkAccess = await DBC.getAcces(ctx.chat.id)
  if (!checkAccess) return

  let response = {
    user_name: ctx.message.from.first_name,
    // user_balance: 1000,
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
  if (checkUser) {
    response.dice_counts = await DBC.getMyDices(ctx.message.from.id, null)
    response.dice_alko = await DBC.getMyDices(ctx.message.from.id, 'alko')
    response.dice_berries = await DBC.getMyDices(ctx.message.from.id, 'berries')
    response.dice_lemons = await DBC.getMyDices(ctx.message.from.id, 'lemons')
    response.dice_axes = await DBC.getMyDices(ctx.message.from.id, 'axes')

    response.networth = await DBC.getMyNetWorth(ctx.message.from.id)
    // response.user_balance = Number.parseInt(1000 + response.networth)

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

    ctx.sendMessage(`${response.user_name}, твоя стата:
    бросков:  ${response.dice_counts}
    бар:  ${response.dice_alko},  (${chance.alko}%)
    ягодки:  ${response.dice_berries},  (${chance.berries}%)
    лимоны:  ${response.dice_lemons},  (${chance.lemons}%)
    топоры:  ${response.dice_axes},  (${chance.axes}%)
    net worth:  ${response.networth}`)

    return
  }

  // если пользователь новый, то выводим сообщение
  ctx.sendMessage(`${ctx.message.from.first_name}, сорян, но по тебе нет статы.. 
Ждёшь особого приглашения? Крути слоты!!!`)
})

smb.launch()
