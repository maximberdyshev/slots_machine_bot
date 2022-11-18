import dotenv from 'dotenv'
import { Telegraf } from 'telegraf'
import DBC from './DBC.js'

dotenv.config({ path: '~/Prog/smb/.env' })

const smb = new Telegraf(process.env.BOT_TOKEN)

smb.on('dice', async (ctx) => {
  // ограничение на доступ
  if (ctx.chat.id != process.env.CHAT_ID) return

  // античит :D
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
    // и внести бросок в БД
    const newUser = {
      id: ctx.message.from.id,
      first_name: ctx.message.from.first_name,
      last_name: ctx.message.from.last_name,
      nickname: ctx.message.from.username,
    }
    await DBC.setUser(newUser)
    await DBC.setThrow(diceThrow)
    return
  }
})

smb.command('/myd_dices', (ctx) => {
  ctx.reply('Not implemented yet!')
})

smb.launch()
