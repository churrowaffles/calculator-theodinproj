var currentEntry = ''
var num1 = ''
var num2 = ''
var previousOperator = null
var previousEntry = null
var currentSolution = null
var ops = {
    '+':add,
    '-':subtract,
    '×':multiply,
    '÷':divide
}

document.addEventListener("DOMContentLoaded", function() {
    mainDisplay = document.querySelector('.main-display');
    smallDisplay = document.querySelector('.small-display');

    // When numbers clicked, record as current entry & display on calculator
    numbers = document.querySelectorAll('.nums input');
    numbers.forEach(e => {
        e.addEventListener('click', () => {
            if (e.value=='.' && currentEntry.includes('.')) {
                return;
            } else if (previousEntry in ops) {
                smallDisplay.textContent = num1 + previousOperator;
            } else if (previousEntry == '=') {
                num1 = '';
            }
            previousEntry = e.value;
            currentEntry += e.value;
            mainDisplay.textContent = currentEntry;
        })
    });

    operators = document.querySelectorAll('.ops');
    operators.forEach(e => {
        e.addEventListener('click', () => {
            if (currentEntry) {
                if (num1 == '') {
                    num1 = Number(currentEntry);
                } else if (num2 == '') {
                    num2 = Number(currentEntry);
                    currentSolution = operate(num1, num2, ops[previousOperator]);
                    displayCalculation(mainDisplay, smallDisplay);
                    num1 = currentSolution;
                    num2 = '';
                }
            }
            previousEntry = previousOperator = e.value;
            currentEntry = '';
        })
    })

    equalSign = document.querySelector('.eq');
    equalSign.addEventListener('click', () => {
        if (currentEntry && num1 !== '' && num2 == '') {
            num2 = Number(currentEntry);
            currentSolution = operate(num1, num2, ops[previousOperator]);
            displayCalculation(mainDisplay, smallDisplay);
            num1 = currentSolution;
            num2 = '';
            previousEntry = equalSign.value;
            currentEntry = '';
        }
    })

})

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(a, b, op) {
    return op(a, b)
}


function displayCalculation(mainDisplay, smallDisplay) {
    mainDisplay.textContent = currentSolution;
    smallDisplay.textContent = num1 + previousOperator + num2;
}