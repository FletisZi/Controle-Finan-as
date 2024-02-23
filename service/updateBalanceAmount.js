const balancelDisplay = document.querySelector('#balance');
const incomeDisplay = document.querySelector('#money-plus');
const expanseDisplay = document.querySelector('#money-minus');

const updateBalanceAmount = (transactions) =>{
    
    const transactionsAmounts = transactions.value.map( transaction => transaction.amount); // mudar mes automatico
    const total = transactionsAmounts.reduce((acumulator, transaction) => acumulator + transaction, 0).toFixed(2);
    const income = transactionsAmounts.filter(item => item > 0).reduce((acumulator,value) => acumulator + value , 0).toFixed(2);
    const expanse = Math.abs(transactionsAmounts.filter(item => item <0).reduce( (acumulator,value) => acumulator + value, 0).toFixed(2));
    
    balancelDisplay.textContent = `RS ${total}`
    incomeDisplay.textContent = `R$ ${income}`;
    expanseDisplay.textContent = `R$ ${expanse}`;
    
}

export default updateBalanceAmount