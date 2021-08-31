const fetch = require('node-fetch');

// Получение актуального курса обмена
async function getExchange() {
  try {
    const result = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
      .then((res) => res.json())
      .then((json) => json);

    return result;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getExchange,
};
