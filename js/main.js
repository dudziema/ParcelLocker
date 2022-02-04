

function createNewButton(){
    const buttonContainer =document.getElementById("button")
    buttonContainer.innerHTML ="";
    buttonContainer.innerHTML =`<button id="buttons" disabled onclick="collectPackage()">Odbierz paczkę</button>`; //setting button state to disabled


}

function renderNewInputs(){
    const inputContainer = document.getElementById("inputs");
    inputContainer.innerHTML ="";
    createNewButton();
    const newPhoneInputDiv =document.createElement("div");
    newPhoneInputDiv.setAttribute("class", "container__inputs--phone");
    newPhoneInputDiv.innerHTML = `
    <label><strong>Numer telefonu</strong></label><br>
    <input id="phone-input" type="text" pattern="\d*" maxlength="9" placeholder="Numer telefonu"/>`;
    const newPasscodeDiv = document.createElement("div");
    newPasscodeDiv.setAttribute("class","container__inputs--passcode");
    newPasscodeDiv.innerHTML=`
    <label><strong>Kod odbioru</strong></label><br>
    <input id="code-input"type="text" pattern="\d*" maxlength="4" placeholder="Kod odbioru"/>`;

    inputContainer.append(newPhoneInputDiv,newPasscodeDiv);


    let inputPhone = document.getElementById("phone-input");
    let inputCode =document.getElementById("code-input")
    let button = document.getElementById("buttons"); 

    inputPhone.addEventListener("keyup", (event)=>{
        setButtonStatus(validatePhone() && validateCode())
    })
    inputCode.addEventListener("keyup", (event)=>{
        setButtonStatus(validatePhone() && validateCode())
    })

    function validatePhone() {
        return inputPhone.value.length == 9
    }
    function validateCode(){
        return inputCode.value.length == 4
    }
    function setButtonStatus(status){
        if(status){
            button.removeAttribute("disabled")
        }
        else{
            button.setAttribute("disabled", "true");
        }
    }

    
}


