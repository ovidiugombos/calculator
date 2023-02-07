"using script";
const allButtons = document.querySelectorAll(".btn");
const numbers = document.querySelectorAll(".nr");
const display = document.querySelector(".display");
const opAndNr = document.querySelectorAll(".operations, .nr");
const operations = document.querySelectorAll(".operations");
const add = document.querySelector(".add");
const substr = document.querySelector(".substr");
const multiply = document.querySelector(".multiply");
const divide = document.querySelector(".divide");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
// console.log(add, substr, divide, multiply);
let code, value;
let trigger = 0;

const innit = function () {
  code = [];
  value = [];
};

const putOnScreen = (content) => (display.textContent = content);

innit();
////////////////////////////////////////////
const addToCode = function (btnValue) {
  code.push(btnValue);
};
allButtons.forEach((btn) => {
  btn.addEventListener("mousedown", function () {
    btn.classList.add("onClick");
    // window.setTimeout(function () {
    //   btn.classList.remove("onClick");
    // }, 100);
  });
  btn.addEventListener("mouseleave", function () {
    btn.classList.remove("onClick");
  });
  btn.addEventListener("mouseup", function () {
    btn.classList.remove("onClick");
  });
  // btn.classList.remove("onClick");
});

numbers.forEach(function (btn) {
  btn.addEventListener("click", function () {
    trigger = 0;
    value.push(btn.textContent);
    putOnScreen(value.join(""));
    addToCode(btn.textContent);
  });
});

operations.forEach(function (btn) {
  btn.addEventListener("click", function () {
    putOnScreen("");
    value = [];
    if (!trigger || btn.textContent === "√") addToCode(btn.textContent);
    trigger = 1;
  });
});

equal.addEventListener("click", function () {
  let i = 0;
  let ok = 0;

  const strInput = code.join("");
  const operators = strInput.replace(/\d+/g, "").split("");
  const codeNumbers = strInput.match(/\d+/g).map(Number);
  console.log(operators, codeNumbers);
  const result = codeNumbers.reduce(function (acc, curValue) {
    const op = operators[i];
    i++;

    if (acc === 0 && ok == 0) {
      i--;
      ok++;
      return curValue;
    } else {
      //
      switch (op) {
        case "+":
          return curValue + acc;
          break;
        case "-":
          return acc - curValue;
          break;
        case "×":
          return acc * curValue;
          break;
        case "÷":
          return Number((acc / curValue).toFixed(3));
          break;
        case "√":
          return Math.sqrt(curValue);
          break;
      }
    }
  }, 0);
  putOnScreen(result);
  innit();
});

clear.addEventListener("click", function () {
  innit();
  putOnScreen("");
});
