const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();
const { change } = require('./utils/converter');

const bot = new Telegraf(process.env.TOKEN);

// Listener /help
bot.help((ctx) =>
  ctx.reply(`
/start - Перезапустить бота
/help - Помощь по боту
`)
);

// Listener /start
bot.command('start', async (ctx) => {
  try {
    await ctx.replyWithHTML(
      `Привет, ${ctx.from.first_name}! Выбери валюту для обмена`,
      Markup.inlineKeyboard([[Markup.button.callback('Доллары', 'USD'), Markup.button.callback('Евро', 'EUR')]])
    );
  } catch (error) {
    console.error(error);
  }
});

// Handler USD
bot.action('USD', async (ctx) => {
  try {
    const result = await change(ctx.callbackQuery.data, 100);
    await ctx.reply(`Меняя 100 грн. вы получите ${result} $`);
    await ctx.answerCbQuery();
  } catch (error) {
    console.error(error);
    await ctx.reply('Сервис временно недоступен');
    await ctx.answerCbQuery();
  }
});

// Handler EUR
bot.action('EUR', async (ctx) => {
  try {
    const result = await change(ctx.callbackQuery.data, 100);
    await ctx.reply(`Меняя 100 грн. вы получите ${result} €`);
    await ctx.answerCbQuery();
  } catch (error) {
    console.error(error);
    await ctx.reply('Сервис временно недоступен');
    await ctx.answerCbQuery();
  }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
