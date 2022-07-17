const displayCalculated = document.querySelector('#calculated');
const displayInput = document.querySelector('#input');
const sound = document.querySelector('audio');

let calculatedNumber = '';
let inputNumber = '';
let operator1 = '';
let operator2 = '';

function operate(operator, number1, number2) {
  
  clearDisplay();
  
  if(!number1) {
    return number2;
  }; 

  number1 = parseFloat(number1);
  number2 = parseFloat(number2);
  
  if(operator === '+') {
    return number1 + number2;
  };

  if(operator === '-') {
    return number1 - number2;
  }

  if(operator === '*') {
    return number1 * number2;
  }

  if(operator === '/' && number2 != 0) {
    return number1 / number2;
  }

  if(operator === '/' && number2 == 0) {
    clearData();
    displayInput.textContent = 'Error: division by 0';
    return '';
  }

};

window.addEventListener('keydown', (e) => {
  handleEvent(e.key);
});  

const buttons = document.querySelectorAll('.buttons');
buttons.forEach(button => {
  button.addEventListener('mousedown', (e) => {
    handleEvent(e.target.textContent);
  })
});


function handleEvent(char) {
  
  sound.currentTime = 0;
  sound.play();

  if(displayInput.textContent == "_") clearDisplay();
  if(displayInput.textContent.includes('Error')) {
    clearDisplay();
    calculatedNumber = '';
  }

  if(/\d/.test(char) && inputNumber.length < 14 && (operator1 || !calculatedNumber)) {
    inputNumber += char;
    displayInput.textContent += char; 
  }

  if(char.match(/[\/\*\-\+]/) && inputNumber) {
    operator2 = char;
    calculatedNumber = operate(operator1, calculatedNumber, inputNumber);
    calculatedNumber = adjustLength(calculatedNumber);
    operator1 = operator2;
    inputNumber = '';
    operator2 = '';
    displayCalculated.textContent = calculatedNumber + operator1;    
  }

  if(char.match(/[\/\*\-\+]/) && !inputNumber && calculatedNumber) {
    operator1 = char;
    displayInput.textContent = '';
    displayCalculated.textContent = calculatedNumber + operator1;
  }

  if((char == '=' || char == 'Enter') && inputNumber) {
    calculatedNumber = operate(operator1, calculatedNumber, inputNumber);
    calculatedNumber = adjustLength(calculatedNumber);
    inputNumber = '';
    operator1 = '';
    if(calculatedNumber) displayInput.textContent = calculatedNumber; 
  }

  if(char == '.' && !inputNumber.includes('.') && inputNumber) {
    inputNumber += char;
    displayInput.textContent += char;
  }

  if(char == 'C') {
    clearDisplay();
    clearData();
    displayInput.textContent = '_';
  }
  
  if((char == 'del' || char == 'Backspace' || char == 'Delete') && inputNumber) {
    inputNumber = inputNumber.slice(0, -1);
    displayInput.textContent = inputNumber;
  }
}

function clearData() {
  calculatedNumber = '';
  inputNumber ='';
  operator1 = '';
  operator2 = '';
}

function clearDisplay() {
  displayInput.textContent = '';
  displayCalculated.textContent = '';
}

function adjustLength(number) {
  number = number.toString();
  while (number.length>14 && number.includes('.') && !number.includes('e')) {
    number = number.slice(0, -1);
  }

  if(number[number.length -1] == '.') {
    number = number.slice(0, -1);
  };

  if(number.length > 14 || number.includes('e')) {
    clearData();
    clearDisplay();
    displayInput.textContent = 'Error: number is to big'
    return '';
  }

  return number;
}