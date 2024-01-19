const transactionUL = document.querySelector('#transactions');
const balancelDisplay = document.querySelector('#balance');
const incomeDisplay = document.querySelector('#money-plus');
const expanseDisplay = document.querySelector('#money-minus');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount')


const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

const transactionRemove = ID =>{
    transactions = transactions.filter( transaction => transaction.id != ID);
    init();
    updateLocalStorage()
}

const addTransactionList = transactions =>{
    const operator  =  transactions.amount < 0 ? '-' : '+';
    const CSSclass = transactions.amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(transactions.amount);
    const li = document.createElement('li')
    li.classList.add(CSSclass)

    li.innerHTML = `${transactions.name} <span>${operator}R$${amountWithoutOperator}</span><button class="delete-btn" onClick="transactionRemove(${transactions.id})">x</button>`
    
    transactionUL.append(li)
}


const updateBalanceAmount = () =>{
    const transactionsAmounts = transactions.map( transaction => transaction.amount);
    const total = transactionsAmounts.reduce((acumulator, transaction) => acumulator + transaction, 0).toFixed(2);
    const income = transactionsAmounts.filter(item => item > 0).reduce((acumulator,value) => acumulator + value , 0).toFixed(2);
    const expanse = Math.abs(transactionsAmounts.filter(item => item <0).reduce( (acumulator,value) => acumulator + value, 0).toFixed(2));
    
    balancelDisplay.textContent = `RS ${total}`
    incomeDisplay.textContent = `R$ ${income}`;
    expanseDisplay.textContent = `R$ ${expanse}`;
    
}

const init = () =>{
    transactionUL.innerHTML = "";
    transactions.forEach(addTransactionList)
    updateBalanceAmount();
}

init();

const updateLocalStorage = () => { localStorage.setItem('transactions', JSON.stringify(transactions))}

const generateID = () => Math.round(Math.random()*1000);

const formSubmit = e => {
    e.preventDefault();

    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();
    if(transactionName === '' || transactionAmount === ''){
        alert('Preencha todos os campos');
        return
    }

    const transaction = {id: generateID(), name : transactionName, amount : Number(transactionAmount)};

    transactions.push(transaction);
    init()
    updateLocalStorage();

    inputTransactionName.value = "";
    inputTransactionAmount.value = "";
    
}

form.addEventListener('submit', formSubmit)