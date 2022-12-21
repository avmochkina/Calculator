const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operator');
const input = document.getElementById('input');
const inputOperation = document.getElementById('input-operation');
const result = document.querySelector('.result');
const dot = document.querySelector('.dot');
const clearAll = document.getElementById('clear-all');
const clear = document.getElementById('clear');

let memoryFirstNumber = '';
let memorySecondNumber = '';
let ifChanged = false;
let memoryOperation = '';
let temporaryStep = '';


for(let i = 0; i < numbers.length; i++) {
    let number = numbers[i]
    number.addEventListener('click', function(e) {
        pressNumber(e.target.textContent)
    })
}

for(let i = 0; i < operators.length; i++) {
    let operator = operators[i]
    operator.addEventListener('click', function(e) {
        count(e.target.textContent)
    })
}

dot.addEventListener('click', function() {
    console.log('dot')
})

clearAll.addEventListener('click', function() {
    input.value = 0;
    inputOperation.value = 0;
    memoryFirstNumber = 0;
    memorySecondNumber = 0;
    ifChanged = false;
    memoryOperation = '';
    temporaryStep = '';
})


clear.addEventListener('click', function() {
    input.value = input.value.slice(0, - 1);
    inputOperation.value = input.value;
    if(ifChanged) memorySecondNumber = input.value;
    else memoryFirstNumber = input.value;
    console.log('после удаления символа' + memoryFirstNumber +"and"+ memorySecondNumber)
})

function pressNumber(number) {
    console.log(ifChanged)
    
    if(ifChanged) {
        input.value = number;
        memorySecondNumber = number;
        inputOperation.value = memoryFirstNumber + memoryOperation + memorySecondNumber;
        temporaryStep = memoryFirstNumber + memoryOperation + memorySecondNumber;
        ifChanged = false;
    }
    else {
        if(input.value === '0') {
            input.value = number;
            inputOperation.value = number;
            memoryFirstNumber = number;
        }
        else if(input.value.length < 9 && memorySecondNumber == '') {
            input.value += number;
            inputOperation.value += number
            memoryFirstNumber += number;
        }
        else if(input.value.length < 9) {
            input.value += number;
            inputOperation.value += number
            memorySecondNumber += number;
            temporaryStep = memoryFirstNumber + memoryOperation + memorySecondNumber;
            ifChanged = false;
        }
    }
    console.log(+memoryFirstNumber + "and"+ (+memorySecondNumber))
}

function count(operation) {
    console.log("Начало расчета" + (+memoryFirstNumber) +"and"+ (+memorySecondNumber))
    result.addEventListener('click', function() {
        console.log( "REsult" + temporaryStep)
        inputOperation.value =  temporaryStep + memoryOperation;
    })
    if(ifChanged) {
        memoryOperation = operation;
        inputOperation.value = memoryFirstNumber + memoryOperation;
    }
    else {
        ifChanged = true;
        if(memoryOperation === '+') {        
            memoryFirstNumber = (+memoryFirstNumber) + (+memorySecondNumber);  
        } 
        else if(memoryOperation === '-') {
            memoryFirstNumber -= memorySecondNumber;           
        } 
        else if(memoryOperation === '*') {
            memoryFirstNumber *= memorySecondNumber;           
        } 
        else if(memoryOperation === '/') {
            memoryFirstNumber /= memorySecondNumber;           
        } 
        else {
        }
        input.value = memoryFirstNumber;
        memoryOperation = operation;
        inputOperation.value =  memoryFirstNumber + memoryOperation;
        
    }
    console.log("Конец расчета" + memoryFirstNumber + memorySecondNumber)
}

