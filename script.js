import mes from "./service/checkdate.js"; 
import addTransactionList from './service/addTransactionList.js'
import updateBalanceAmount from './service/updateBalanceAmount.js'

const transactionUL = document.querySelector('#transactions');
const balancelDisplay = document.querySelector('#balance');
const incomeDisplay = document.querySelector('#money-plus');
const expanseDisplay = document.querySelector('#money-minus');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount')
const inputTransactionsMonth = document.querySelector('#transactionsMonth')





const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));



let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []





let testeList = [
    {
        'mes':'fev',
        'value': [
            {'id': 788, 'name': "cartão credito", 'amount': 20}
        ]
    },
    {
        'mes':'jan',
        'value': [
            {'id': 759, 'name': "cartão credito", 'amount': 12}
        ]
    },
    
]


const transactionRemove = ID =>{
    const index = filterMonthAdd()
    const transactionFilterMonth = transactions[index].value.filter( transaction => transaction.id != ID);

    transactions[index].value = transactionFilterMonth;
    
    init();
    updateLocalStorage();
}


const checkMonthExists = () =>{   
    

    const countMonth = transactions.filter( transaction => transaction.mes == mes)


    if (countMonth.length == 0){
        //criar novo mes no array
  
        transactions.unshift( {'mes' : mes, 'value':[]})

        hendleSelectionMonths()

        return
    }

    // entao so criar os options

    hendleSelectionMonths()
    
    
    return

    
}


const hendleSelectionMonths = () =>{

    

    transactions.forEach( transaction => {

        const options = document.createElement('option');
        options.value = `${transaction.mes}` 
        options.textContent = `${transaction.mes}`;
        inputTransactionsMonth.append(options)
    })
    
}


function filterMonthAdd () {

    const indexMonth = transactions.findIndex((element) => element.mes == inputTransactionsMonth.options[inputTransactionsMonth.selectedIndex].value)
    return indexMonth
}


inputTransactionsMonth.addEventListener('change', function(e){
    init()
});


const init = () =>{

    transactionUL.innerHTML = "";
    
    const index = filterMonthAdd();

    updateBalanceAmount(transactions[index]);
    transactions[index].value.forEach(addTransactionList);

}

const updateLocalStorage = () => { localStorage.setItem('transactions', JSON.stringify(transactions))}

const generateID = () => Math.round(Math.random()*1000);

const formSubmit = e => {
    e.preventDefault();

    const index = filterMonthAdd();
    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();
    if(transactionName === '' || transactionAmount === ''){
        alert('Preencha todos os campos');
        return
    }

    const transaction = {id: generateID(), name : transactionName, amount : Number(transactionAmount)};

    transactions[index].value.push(transaction);

    init()
    updateLocalStorage();

    inputTransactionName.value = "";
    inputTransactionAmount.value = "";
    
}

form.addEventListener('submit', formSubmit)









// windowns load 



document.addEventListener('DOMContentLoaded', ()=>{
    
    checkMonthExists();
    
    init();
})

window.document.addEventListener('click', e =>{
    
    if(e.target.className == 'delete-btn'){
        transactionRemove(e.target.dataset.indexId)
    }
    console.log();
})