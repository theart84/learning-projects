let numberField = document.getElementById("display-field");
let numberArray = document.getElementsByClassName("number-btn");
let operationArray = document.getElementsByClassName("operation-btn");
let resultButton = document.getElementById("result");
let clearButton = document.getElementById("clear-btn");
let number1;
let number2;
let number3;
let operation;
let eraseDisplay = true;
let oneItteration = false;
function eraseField() {
    numberField.value = null;
    operation = null;
    eraseDisplay = true;
    oneItteration = false;
    
}
function onClickNumberButton(eventObject) {
    let numberButton = eventObject.currentTarget;
    let number = numberButton.innerHTML;     
    if (eraseDisplay === true) {
        numberField.value = null;
        numberField.value += number; 
        eraseDisplay = false;       
    } else {
        numberField.value += number;        
    }
    
}
function onClickOperationButton(eventObject) {
    let operationButton = eventObject.currentTarget;
    operation = operationButton.innerHTML;
    number1 = Number(numberField.value);
    eraseDisplay = true;     
    // numberField.value = null;
}
function onClickResultButton() { 
    if (oneItteration === false) {
    number2 = Number(numberField.value);
    oneItteration = true;      
    switch (operation) {
        case "+":
            numberField.value = number1 + number2;            
            break;
        case "-":
            numberField.value = number1 - number2;
            break;
        case "*":
            numberField.value = number1 * number2;
            break;
        case "/":
            numberField.value = number1 / number2;
            break;
        default:
            break;
     }
    } else {        
        number3 = number2;              
        switch (operation) {
            case "+":
                numberField.value = Number(numberField.value) + number3;                
                break;
            case "-":
                numberField.value = Number(numberField.value) - number3;                
                break;
            case "*":
                numberField.value = Number(numberField.value) * number3;
                break;
            case "/":
                numberField.value = Number(numberField.value) / number3;
                break;
            default:
                break;
         }
    }  
}

for (i = 0; i < numberArray.length; i++) {  
    numberArray[i].addEventListener("click", onClickNumberButton);
}
for (i = 0; i < operationArray.length; i++) {
    operationArray[i].addEventListener("click", onClickOperationButton);
}
clearButton.addEventListener("click", eraseField);
resultButton.addEventListener("click", onClickResultButton);




