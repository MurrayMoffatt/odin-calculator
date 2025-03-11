const MAXDIGITS = 12;
let operand1 = null;
let operand2 = null;
let operator = null;
let power = false;
let inError = false;
let resultMode = false;

document.addEventListener("DOMContentLoaded", function () {
  AddEventListeners();
});

function AddEventListeners() {
  const numberButtons = document.querySelectorAll(".numberbutton");
  numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
      if (power) numberClicked(numberButton);
    });
  });

  const operatorButtons = document.querySelectorAll(".operatorbutton");
  operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", () => {
      if (power) operatorClicked(operatorButton);
    });
  });

  const equalsButton = document.getElementById("button-equals");
  equalsButton.addEventListener("click", () => {
    if (power) equalsClicked();
  });

  const clearButton = document.getElementById("button-clear");
  clearButton.addEventListener("click", () => {
    if (power) clearClicked();
  });

  const offButton = document.getElementById("button-off");
  offButton.addEventListener("click", () => {
    if (power) offClicked();
  });

  const onButton = document.getElementById("button-on");
  onButton.addEventListener("click", () => {
    if (!power) onClicked();
  });
}

function numberClicked(numberButton) {
  const number = numberButton.value;
  const digits = document.getElementById("digits");
  if (inError) return;
  if (resultMode) {
    operand1 = null;
    operand2 = null;
    operator = null;
  }
  if (operator === null) {
    if (operand1 === null) {
      operand1 = number;
    } else if (operand1.length < 8) {
      if (operand1 === "0" && number !== "0") {
        operand1 = number;
      } else if (operand1 !== "0") {
        operand1 += number;
      }
    }
    digits.textContent = operand1;
  } else {
    if (operand2 === null) {
      operand2 = number;
    } else if (operand2.length < 8) {
      if (operand2 === "0" && number !== "0") {
        operand2 = number;
      } else if (operand2 !== "0") {
        operand2 += number;
      }
    }
    digits.textContent = operand2;
  }
  resultMode = false;
}

function operatorClicked(operatorButton) {
  const operatorValue = operatorButton.value;
  if (operator !== null) {
    equalsClicked();
  }
  operator = operatorValue;
  resultMode = false;
}


function equalsClicked() {
  const digits = document.getElementById("digits");
  const errorIndicator = document.getElementById("error-indicator");
  if (operand1 === null || operand2 === null || operator === null) {
    return;
  }
  if (operator === "/" && operand2 === "0") {
    // Divide by zero
    errorIndicator.textContent = "E";
    digits.textContent = "0";
    inError = true;
    return;
  }
  const result = operate(Number(operand1), Number(operand2), operator);
  if (parseInt(result).toString().length > MAXDIGITS) {
    // Number too large
    errorIndicator.textContent = "E";
    digits.textContent = "0";
    inError = true;
    return;
  }
  digits.textContent = result.toString().substring(0, MAXDIGITS);
  operand1 = result.toString();
  operand2 = null;
  operator = null;
  resultMode = true;
}

function clearClicked() {
  operand1 = null;
  operand2 = null;
  operator = null;
  const digits = document.getElementById("digits");
  digits.textContent = "0";
  const errorIndicator = document.getElementById("error-indicator");
  errorIndicator.textContent = "";
  inError = false;
  resultMode = false;
}

function offClicked() {
  operand1 = null;
  operand2 = null;
  operator = null;
  const digits = document.getElementById("digits");
  digits.innerHTML = "";
  const errorIndicator = document.getElementById("error-indicator");
  errorIndicator.textContent = "";
  power = false;
  resultMode = false;
}

function onClicked() {
  operand1 = null;
  operand2 = null;
  operator = null;
  const digits = document.getElementById("digits");
  digits.textContent = "0";
  power = true;
  inError = false;
  resultMode = false;
}

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Invalid operator";
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function clear() {
  operand1 = 0;
  operand2 = 0;
  operator = "";
}