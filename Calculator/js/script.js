let  numbers = document.querySelectorAll("#number");
let  operators = document.querySelectorAll("#operator");
let  deleteLastEntry = document.querySelector("#delete-last-entry");
let  deleteAll = document.querySelector("#delete-all");
let  equalButton = document.querySelector("#equal");
let  dotButton = document.querySelector("#dot");
let  currentNumber = document.querySelector(".current-output");
let  outputHistory = document.querySelector(".output-history");
let isOperator = true;
let isNewNumber = false;
let currentOperator;
outputHistory.textContent = '';


numbers.forEach(number => {

    number.addEventListener("click", function addNumber(){

        if(isOperator) {

            currentNumber.textContent = this.textContent;
            isOperator = false;
            isNewNumber = true;
            return;
        }
        
        currentNumber.textContent += this.textContent;
    })
});


deleteAll.addEventListener("click", function deleteAll() {

    isOperator = true;

    currentNumber.textContent = 0;
    outputHistory.textContent = '';
});

    
 deleteLastEntry.addEventListener("click", function deleteLastEntry(){

    currentNumber.textContent = currentNumber.textContent.toString().slice(0, -1);

    if(currentNumber.textContent.toString().length == 0){

        currentNumber.textContent = 0;
        isOperator = true;
    }
 });


 dotButton.addEventListener("click", function addDot(){

    if(!currentNumber.textContent.includes('.')){

        currentNumber.textContent += '.';

    } else {

        return;
    }
 });
 

 equalButton.addEventListener("click", () => {

    calculate(currentOperator);

    if(currentNumber.textContent.includes('.')){

        currentNumber.textContent = Number(currentNumber.textContent).toFixed(5);
        outputHistory.textContent = currentNumber.textContent + ' ';

    } else {

        outputHistory.textContent = currentNumber.textContent + ' ';
    } 

    isOperator = true;
    isNewNumber = false;

    currentOperator = '';
 })


 operators.forEach(operator =>{

    operator.addEventListener("click", function() {

        if(outputHistory.textContent === '') {

            outputHistory.textContent = currentNumber.textContent + this.textContent;
            isOperator = true;
            isNewNumber = false;
            currentOperator = this.textContent;
            return;
        }
        
        outputHistory.textContent = outputHistory.textContent.toString().slice(0, -1) + this.textContent;

        if(isNewNumber) {
            
            calculate(currentOperator);

            if(currentNumber.textContent.includes('.')){

                currentNumber.textContent = Number(currentNumber.textContent).toFixed(5);
                outputHistory.textContent = currentNumber.textContent + this.textContent;

            } else {

                outputHistory.textContent = currentNumber.textContent + this.textContent;
            }    
        }
        
        currentOperator = this.textContent;
         
        isOperator = true;
        isNewNumber = false;
    })
 })


 function calculate(opt) {

    switch(opt) {

        case '+':
            currentNumber.textContent = Number(outputHistory.textContent.toString().slice(0, -1)) + Number(currentNumber.textContent); 
            break;

         case '-':
            currentNumber.textContent = Number(outputHistory.textContent.toString().slice(0, -1)) - Number(currentNumber.textContent);
            break;

        case 'x':
            currentNumber.textContent = Number(outputHistory.textContent.toString().slice(0, -1)) * Number(currentNumber.textContent);
            break;

        case '÷':
            currentNumber.textContent = Number(outputHistory.textContent.toString().slice(0, -1)) / Number(currentNumber.textContent);
            break;

        case '%':
            currentNumber.textContent = (Number(outputHistory.textContent.toString().slice(0, -1)) * Number(currentNumber.textContent)) / 100;
            break;     
            
        default:
            return;
    }
 }




 