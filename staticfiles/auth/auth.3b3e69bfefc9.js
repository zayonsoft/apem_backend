function activateSubmitForm() {
    let loginForm = document.querySelector(".login-form");
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        removeError();
        removeSuccess();
        let usernameInput = document.querySelector("input[name=id_or_email]");
        let passwordInput = document.querySelector("input[name=password]");

        if (usernameInput.value.trim() == "") {
            showError("Username Cannot Be Empty");
            return;
        }

        if (passwordInput.value.trim() == "") {
            showError("Password Cannot Be Empty");
            return;
        }

        showProcessing();

        let data = new FormData(loginForm);
        let url = loginForm.action;
        submitLogin(url, data);


    });
}

function showError(message) {
    let errorParagraph = document.querySelector(".error-display");
    if (errorParagraph) {
        errorParagraph.innerHTML = `${message}`;
    }
    else {
        alert("Couldn't Display Error!");
    }
}

function showSuccess(message) {
    let successParagraph = document.querySelector(".success-display");
    if (successParagraph) {
        successParagraph.innerHTML = `${message}`;
    }
    else {
        alert("Couldn't Display Message!");
    }
}

function removeSuccess() {
    let successParagraph = document.querySelector(".success-display");
    if (successParagraph) {
        successParagraph.innerHTML = ``;
    }
}

function removeError() {
    let errorParagraph = document.querySelector(".error-display");
    if (errorParagraph) {
        errorParagraph.innerHTML = ``;
    }
}

function showProcessing() {
    removeError();
    let loginBtn = document.querySelector(".login-btn");
    loginBtn?.classList.add("processing");
    if (loginBtn)
        loginBtn.innerHTML = `Processing...`;
    loginBtn?.setAttribute("disabled", "disabled");
}

function removeProcessing() {
    let loginBtn = document.querySelector(".login-btn");
    if (loginBtn)
        loginBtn.innerHTML = `LOGIN`;

    loginBtn?.classList.remove("processing");
    loginBtn?.removeAttribute("disabled");
}

document.addEventListener("DOMContentLoaded", function () {
    activateSubmitForm();
});