const transactionUL = document.querySelector('#transactions');

const addTransactionList = transactions =>{
    const operator  =  transactions.amount < 0 ? '-' : '+';
    const CSSclass = transactions.amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(transactions.amount); // transformar os operadores negativos em positivos para na horas de mostrar na tela não haver sinal de menos 2 vezes
    const li = document.createElement('li')
    li.classList.add(CSSclass)
                                                
    li.innerHTML = `${transactions.name} <span>${operator}R$${amountWithoutOperator}</span><button class="delete-btn" data-index-id="${transactions.id}">x</button>`
    
    transactionUL.append(li)
}

export default addTransactionList