import dotenv from 'dotenv'
import { Telegraf } from 'telegraf'

dotenv.config({ path: '~/Prog/smb/.env' })

const smb = new Telegraf(process.env.BOT_TOKEN)

smb.on('dice', (ctx) => {
    // ctx.reply(ctx.message.text)
    // ctx.reply(ctx.message.dice)
    console.log(ctx.message.dice)
})

smb.launch()