const { getExchange } = require('../services/api');

// Converter
async function change(currency, value) {
  const data = await getExchange();

  const result = data.find((item) => item.ccy === currency.toUpperCase());
  return Number(value / result.sale).toFixed(2);
}

module.exports = {
  change,
};
