const regexPhone = /^(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\1\d{3}$/;
const regexCode = /^(?:\d{4}|\(\d{4}\))/;

const CODE_MAX_LENGHT = 4;
const PHONE_MAX_LENGHT = 11;
const PHONE_VALIDATION_LENGHT = 9;
const SECOND = 1000;

function showOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.style["visibility"] = "visible";
  overlay.style["opacity"] = "1";
}

function hideOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.style["visibility"] = "hidden";
  overlay.style["opacity"] = "0";
}
function goToHomePage() {
  const modal = document.getElementById("modal-content");
  const inputContainer = document.getElementById("inputs");
  const containerButtonDiv = document.getElementById("button");

  modal.innerHTML = "";
  hideOverlay();
  inputContainer.innerHTML = "";
  containerButtonDiv.innerHTML = "";
  containerButtonDiv.innerHTML = `<button onclick="renderNewInputs()">Zaczynamy!</button>`;
}

function collectNextPackage() {
  const modal = document.getElementById("modal-content");
  let inputPhone = document.getElementById("phone-input");
  let inputCode = document.getElementById("code-input");
  let buttonContainer = document.getElementById("button");
  hideOverlay();
  inputPhone.value = "";
  inputCode.value = "";
  buttonContainer.value = "";
  createNewButton();
  modal.innerHTML = "";
}

function collectPackage() {
  const modal = document.getElementById("modal-content");
  document.getElementById("loader").style.display = "none";
  modal.innerHTML = `
    <h2><strong>Paczka odebrana!</strong</h2><br>
    <p class="modal__info">Zrobiłeś to w czasie 10 sekund! Czy mozemy zrobić dla Ciebie coś jeszcze?</p>
    <div class="modal__buttons">
    <button class="modal__button" onclick="goToHomePage()">To wszystko na dziś</button>
    <button class="modal__button" onclick="collectNextPackage()">Odbierz kolejną paczkę</button>
    </div>`;
}

function loader() {
  document.getElementById("loader").style.display = "flex";
  showOverlay();

  const promise = new Promise((resolve) => {
    window.setTimeout(function () {
      resolve();
    }, Math.random() * 2 * SECOND + 1 * SECOND);
  });
  promise.then(() => {
    collectPackage();
  });
}

function createNewButton() {
  const buttonContainer = document.getElementById("button");
  // set the button state to disabled
  buttonContainer.innerHTML = `
   <button disabled id="button-collect" onclick="loader()">Odbierz paczkę</button>`;
}

function renderNewInputs() {
  const inputContainer = document.getElementById("inputs");
  inputContainer.innerHTML = "";
  createNewButton();
  const newPhoneInputDiv = document.createElement("div");
  newPhoneInputDiv.setAttribute("class", "container__inputs--phone");
  newPhoneInputDiv.innerHTML = `
    <label><strong>Numer telefonu</strong></label><br>
    <input id="phone-input" type="text" pattern="\d*" maxlength="11" placeholder="Np.: 999-000-999"/><br>
    <p id="error-message-phone"></p>`;
  const newPasscodeDiv = document.createElement("div");
  newPasscodeDiv.setAttribute("class", "container__inputs--passcode");
  newPasscodeDiv.innerHTML = `
    <label><strong>Kod odbioru</strong></label><br>
    <input id="code-input"type="text" pattern="\d*" maxlength="4" placeholder="Np.: 1234"/><br>
    <p id="error-message-code"></p>`;

  inputContainer.append(newPhoneInputDiv, newPasscodeDiv);

  let inputPhone = document.getElementById("phone-input");
  let inputCode = document.getElementById("code-input");
  let errorMsgPhone = document.getElementById("error-message-phone");
  let errorMsgCode = document.getElementById("error-message-code");

  inputPhone.addEventListener("keyup", (event) => {
    setButtonStatus(validatePhoneLength() && validateCodeLength());
    showErrorMsgPhone(validatePhoneLength());
  });
  inputCode.addEventListener("keyup", (event) => {
    setButtonStatus(validatePhoneLength() && validateCodeLength());
    showErrorMsgCode(validateCodeLength());
  });

  function validatePhoneLength() {
    return (
      inputPhone.value.length >= PHONE_VALIDATION_LENGHT ||
      inputPhone.value.length == PHONE_MAX_LENGHT
    );
  }
  function validateCodeLength() {
    return inputCode.value.length == CODE_MAX_LENGHT;
  }
  function validatePhoneInput(inputPhone) {
    const validatedPhone = regexPhone.exec(inputPhone.value);
    if (!validatedPhone) {
      errorMsgPhone.textContent = `${inputPhone.value} isn't a phone number format!`;
      inputPhone.setAttribute("class", "inputs__phone--invalid");
    } else {
      errorMsgPhone.textContent = "";
      inputPhone.removeAttribute("class", "inputs__phone--invalid");
    }
  }

  function validateCodeInput(inputCode) {
    const validatedCode = regexCode.exec(inputCode.value);
    if (!validatedCode) {
      errorMsgCode.textContent = `${inputCode.value} isn't code!`;
      inputCode.setAttribute("class", "inputs__code--invalid");
    } else {
      errorMsgCode.textContent = "";
      inputCode.removeAttribute("class", "inputs__code--invalid");
    }
    return validatedCode;
  }

  function showErrorMsgPhone(status) {
    if (status) {
      validatePhoneInput(inputPhone);
    } else {
      errorMsgPhone.textContent = "";
      inputPhone.removeAttribute("class", "inputs__phone--invalid");
    }
  }

  function showErrorMsgCode(status) {
    if (status) {
      validateCodeInput(inputCode);
    } else {
      errorMsgCode.textContent = "";
      inputCode.removeAttribute("class", "inputs__code--invalid");
    }
  }

  function setButtonStatus(status) {
    let button = document.getElementById("button-collect");
    const validatedPhone = regexPhone.exec(inputPhone.value);
    const validatedCode = regexCode.exec(inputCode.value);
    if (status && validatedCode !== null && validatedPhone !== null) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "true");
    }
  }
}
