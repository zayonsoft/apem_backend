function activateEditAccounts() {
    let editBtns = document.querySelectorAll(".edit-btn");
    editBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            let clickedElement = e.currentTarget;
            let accountName = clickedElement.dataset.acc_name;
            let bankName = clickedElement.dataset.bank_name;
            let accountNumber = clickedElement.dataset.acc_number;
            let pk = clickedElement.dataset.pk;

            setEditForm(pk, accountNumber, accountName, accountNumber, bankName);
            showEditForm();
        });
    });
}


function setEditForm(account_pk, fmr_account_number, account_name, account_number, bank_name) {
    let editForm = document.querySelector(".edit-account-form");

    let accountPkInput = editForm.querySelector("input[name=account_pk]");
    let oldAccountNumberInput = editForm.querySelector("input[name=old_account_number]");

    let accountNameInput = editForm.querySelector("input[name=account_name]");
    let accountNumberInput = editForm.querySelector("input[name=account_number]");
    let BankNameInput = editForm.querySelector("input[name=bank_name]");

    accountPkInput.value = account_pk;
    oldAccountNumberInput.value = fmr_account_number;
    accountNameInput.value = account_name;
    accountNumberInput.value = account_number;
    BankNameInput.value = bank_name;
}

function resetEditForm() {
    let editForm = document.querySelector(".edit-account-form");
    editForm.reset();
}

function showEditForm() {
    let editOverlay = document.querySelector(".edit-account-popup");
    editOverlay.style.display = "block";
}

function activateHideEditForm() {
    let closeBtn = document.querySelector(".close-edit-form");
    closeBtn.addEventListener("click", function () {
        hideEditForm();
    });
}

function hideEditForm() {
    let editOverlay = document.querySelector(".edit-account-popup");
    editOverlay.style.display = "none";
    resetEditForm();
}

function showEditProcessing() {
    // removeError();
    let btn = document.querySelector(".submit-edit");
    btn?.classList.add("processing");
    if (btn)
        btn.innerHTML = `Processing...`;
    btn?.setAttribute("disabled", "disabled");
}

function removeEditProcessing() {
    let btn = document.querySelector(".submit-edit");
    if (btn)
        btn.innerHTML = `Submit`;

    btn?.classList.remove("processing");
    btn?.removeAttribute("disabled");
}

function activateSubmitEdit() {
    let popupForm = document.querySelector("form.edit-account-form");
    popupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let url = this.action;
        let data = new FormData(this);

        showEditProcessing();
        editAccount(url, data);

    });
}


function editAccount(url, data) {
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
                hideEditForm();
            }
            else {
                showErrorMessage(response.message);
            }

            removeEditProcessing();
        },
        error: function (err) {
            removeEditProcessing();
            let message = specifyError(err.status);
            showErrorMessage(message);
        }

    });
}


document.addEventListener("DOMContentLoaded", function () {
    activateHideEditForm();
    activateSubmitEdit();
})