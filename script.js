const firstCurrency = document.getElementById('firstCurrency');
const secondCurrency = document.getElementById('secondCurrency');
const firstRate = document.getElementById('firstCurrencyRate');
const secondRate = document.getElementById('secondCurrencyRate');
const rate = document.getElementById('rate');
const swapButton = document.getElementById('swap');

function calculateRate() {
    // Get the values of the two currencies
    const currencyOne = firstCurrency.value;
    const currencyTwo = secondCurrency.value;

    // Make request
    fetch(`https://v6.exchangerate-api.com/v6/46db5798b535839276a776f2/latest/${currencyOne}`)
    .then(response => response.json())
    .then(data => {
        const currencyRate = data.conversion_rates[currencyTwo];
        rate.innerText = `1 ${currencyOne} = ${currencyRate} ${currencyTwo}`;
        secondRate.value = (firstRate.value * currencyRate).toFixed(2);
    });
}

firstCurrency.addEventListener('change', calculateRate);
secondCurrency.addEventListener('change', calculateRate);
firstRate.addEventListener('input', calculateRate);
secondRate.addEventListener('input', calculateRate);
swapButton.addEventListener('click', () => {
    const temporaryValue = firstCurrency.value;
    firstCurrency.value = secondCurrency.value;
    secondCurrency.value = temporaryValue;
    calculateRate();
});

calculateRate();