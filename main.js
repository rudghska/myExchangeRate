const currencyOne = document.querySelector('#currency-one');
const currencyTwo = document.querySelector('#currency-two');
const inputOne = document.querySelector('#amount-one');
const inputTwo = document.querySelector('#amount-two');
const swapButton = document.querySelector('.swap button');
const oneCurrency = document.querySelector('.swap p');

let exRate = 0;

async function getExchangeRate() {
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/1bbaa9855d2ac34ee28e6241/latest/${currencyOne.value}`
  );
  const exchangeRate = await response.json();
  const oneCurrency = exchangeRate.conversion_rates[currencyTwo.value];
  inputOne.value = 1;
  inputTwo.value = oneCurrency.toFixed(2);
  exRate = oneCurrency;
  oneCurrencyText(oneCurrency);
}

function oneCurrencyText(value) {
  oneCurrency.innerText = `1${currencyOne.value} = ${value} ${currencyTwo.value}`;
}

currencyOne.addEventListener('change', getExchangeRate);

currencyTwo.addEventListener('change', getExchangeRate);

inputOne.addEventListener('change', e => {
  const result = (e.target.value * exRate).toFixed(2) * 1;
  inputTwo.value = result;
});

swapButton.addEventListener('click', () => {
  const currency1 = currencyOne.value;
  const currency2 = currencyTwo.value;
  currencyOne.value = currency2;
  currencyTwo.value = currency1;
  getExchangeRate();
});

getExchangeRate();
