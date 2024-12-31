import { submitLogin } from "./login"

function activateSubmitForm(): void {
    let loginForm = document.querySelector(".login-form")! as HTMLFormElement;
    loginForm?.addEventListener("submit", function (e) {
        e.preventDefault();
        removeError();
        removeSuccess();
        let usernameInput = document.querySelector("input[name=id_or_email]")! as HTMLInputElement;
        let passwordInput = document.querySelector("input[name=password]")! as HTMLInputElement;

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

function showError(message: string): void {
    let errorParagraph = document.querySelector(".error-display");
    if (errorParagraph) {
        errorParagraph.innerHTML = `${message}`;
    }
    else {
        alert("Couldn't Display Error!");
    }
}

function showSuccess(message: string): void {
    let successParagraph = document.querySelector(".success-display");
    if (successParagraph) {
        successParagraph.innerHTML = `${message}`;
    }
    else {
        alert("Couldn't Display Message!");
    }
}

function removeSuccess(): void {
    let successParagraph = document.querySelector(".success-display");
    if (successParagraph) {
        successParagraph.innerHTML = ``;
    }
}

function removeError(): void {
    let errorParagraph = document.querySelector(".error-display");
    if (errorParagraph) {
        errorParagraph.innerHTML = ``;
    }
}

function showProcessing(): void {
    removeError();
    let loginBtn = document.querySelector(".login-btn")! as HTMLButtonElement;
    loginBtn?.classList.add("processing");
    if (loginBtn)
        loginBtn.innerHTML = `Processing...`;
    loginBtn?.setAttribute("disabled", "disabled");
}

function removeProcessing(): void {
    let loginBtn = document.querySelector(".login-btn")! as HTMLButtonElement;
    if (loginBtn)
        loginBtn.innerHTML = `LOGIN`;

    loginBtn?.classList.remove("processing");
    loginBtn?.removeAttribute("disabled");
}

document.addEventListener("DOMContentLoaded", function () {
    activateSubmitForm();
});