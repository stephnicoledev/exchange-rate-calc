const currencyElement_one = document.getElementById('currency-one');
const currencyElement_two = document.getElementById('currency-two');
const amountElement_one = document.getElementById('amount-one');
const amountElement_two = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swapButton = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
    // Get the values of currencies
    const currency_one = currencyElement_one.value;
    const currency_two = currencyElement_two.value;

    // Make request
    fetch(`https://v6.exchangerate-api.com/v6/46db5798b535839276a776f2/latest/${currency_one}`)
    .then(response => response.json())
    .then(data => {
        const currencyRate = data.conversion_rates[currency_two];
        
        rate.innerText = `1 ${currency_one} = ${currencyRate} ${currency_two}`;
        
        amountElement_two.value = (amountElement_one.value * currencyRate).toFixed(2);
    });
}

// Event listeners
currencyElement_one.addEventListener('change', calculate);
amountElement_one.addEventListener('input', calculate);
currencyElement_two.addEventListener('change', calculate);
amountElement_two.addEventListener('input', calculate);

swapButton.addEventListener('click', () => {
    const temp = currencyElement_one.value;
    currencyElement_one.value = currencyElement_two.value;
    currencyElement_two.value = temp;
    calculate();
});

calculate();