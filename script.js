let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');

const equalsButton = document.getElementById('equalsBtn');
const clearButton = document.getElementById('clearBtn');
const deleteButton = document.getElementById('deleteBtn');
const pointButton = document.getElementById('pointBtn');

const lastOperationScreen = document.getElementById('prev');
const currentOperationScreen = document.getElementById('current');

window.addEventListener('keydown', handleKeyboardInput);
equalsButton.addEventListener('click', equal);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNum);
pointButton.addEventListener('click', addPoint);

numberButtons.forEach((button) =>
  button.addEventListener('click', () => addNumber(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
);

function addNumber(number) {
  if (currentOperationScreen.textContent === '0' || shouldResetScreen) {
    resetScreen();
  }
  currentOperationScreen.textContent += number;
};

function resetScreen() {
  currentOperationScreen.textContent = '';
  shouldResetScreen = false;
}

function clear() {
  currentOperationScreen.textContent = '0';
  lastOperationScreen.textContent = '';
  firstOperand = '';
  secondOperand = '';
  currentOperation = null;
}

function addPoint() {
  if (shouldResetScreen) {
    resetScreen();
  }
  if (currentOperationScreen.textContent === '') {
    currentOperationScreen.textContent = '0';
  }
  if (currentOperationScreen.textContent.includes('.')) {
    return;
  }
  currentOperationScreen.textContent += '.';
}

function deleteNum() {
  currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1);
}

function setOperation(operator) {
  if (currentOperation !== null) {
    equal();
  }
  firstOperand = currentOperationScreen.textContent;
  currentOperation = operator;
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}

function equal() {
  if (currentOperation === null || shouldResetScreen) {
    return;
  }
  if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
    return;
  }
  secondOperand = currentOperationScreen.textContent;
  currentOperationScreen.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand));
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) {
    addNumber(e.key);
  }
  if (e.key === '.') {
    addPoint();
  }
  if (e.key === '=' || e.key === 'Enter') {
    equal();
  }
  if (e.key === 'Backspace') {
    deleteNumber();
  }
  if (e.key === 'Escape') {
    clear();
  }
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    setOperation(convertOperator(e.key));
  }
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return 'x'
  if (keyboardOperator === '-') return '-'
  if (keyboardOperator === '+') return '+'
}

function add(a, b) {
    return a+b;
}

function subtract(a, b) {
    return a-b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return a/b;
}

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
      case '+':
        return add(a, b);
      case '-':
        return subtract(a, b);
      case 'x':
        return multiply(a, b);
      case '÷':
        if (b === 0) {
            return null;
        } else {
            return divide(a, b);
        }
      default:
        return null;
    }
}