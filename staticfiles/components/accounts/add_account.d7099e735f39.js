function activateAddBtn() {
    let addBtn = document.querySelector("button.add-acc-btn");
    addBtn.addEventListener("click", function () {
        showAddAccount();
    });
}


function activateCloseAdd() {
    let closer = document.querySelector("button.close-add-btn");
    closer.addEventListener("click", function () {
        hideAddAccount();
    });
}


function showAddAccount() {
    let popCover = document.querySelector("div.add-popup-cover");
    popCover.style.display = "block";
}

function hideAddAccount() {
    let popCover = document.querySelector("div.add-popup-cover");
    popCover.style.display = "none";
    resetAddForm();
    removeProcessing();
}

function activateSubmitAddAccount() {
    let popupForm = document.querySelector("form.add-account");
    popupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let url = this.action;
        let data = new FormData(this);

        showProcessing();
        addAccount(url, data);

    });
}

function addAccount(url, data) {
    $.ajax({
        url: url,
        type: "POST",
        contentType: false,
        processData: false,
        data: data,
        success: function (response) {
            if (response.success) {
                showSuccessMessage(response.message);
                invokeGetAccounts();
                hideAddAccount();
                removeProcessing();
            }
            else {
                showErrorMessage(response.message);
                removeProcessing();
            }
        },
        error: function (err) {
            removeProcessing();
            let message = specifyError(err.status);
            showErrorMessage(message);
        }

    });

}

function resetAddForm() {
    let popupForm = document.querySelector("form.add-account");
    popupForm.reset();
}


function showProcessing() {
    // removeError();
    let btn = document.querySelector(".submit-add");
    btn?.classList.add("processing");
    if (btn)
        btn.innerHTML = `Processing...`;
    btn?.setAttribute("disabled", "disabled");
}

function removeProcessing() {
    let btn = document.querySelector(".submit-add");
    if (btn)
        btn.innerHTML = `Submit`;

    btn?.classList.remove("processing");
    btn?.removeAttribute("disabled");
}


document.addEventListener("DOMContentLoaded", function () {
    activateAddBtn();
    activateCloseAdd();
    activateSubmitAddAccount();
});