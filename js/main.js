



function renderNewInputs(){
    const inputContainer = document.getElementById("inputs");
    inputContainer.innerHTML ="";
    const newPhoneInputDiv =document.createElement("div");
    newPhoneInputDiv.setAttribute("class", "container__inputs--phone");
    newPhoneInputDiv.innerHTML = `
    <label><strong>Numer telefonu</strong></label><br>
    <input type="number" placeholder="Numer telefonu"/>`;

    const newPasscodeDiv = document.createElement("div");
    newPasscodeDiv.setAttribute("class","container__inputs--passcode");
    newPasscodeDiv.innerHTML=`<label><strong>Kod odbioru</strong></label><br>
    <input type="number" placeholder="Kod odbioru"/>`;

    
    inputContainer.append(newPhoneInputDiv,newPasscodeDiv);

}


