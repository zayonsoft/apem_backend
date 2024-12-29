let currentID;
let currentNumber;
function activateDeleteBtns() {
    let deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            let clickedElement = e.currentTarget;
            let accountNumber = clickedElement.dataset.acc_number;
            let pk = clickedElement.dataset.pk;

            currentID = pk;
            currentNumber = accountNumber;
            showConfirmationDialog(`Are You Sure You Want to Delete the Account with Number: <b>${accountNumber}</b> ?`);
        });
    });
}

function activateDeleteConfirm() {
    let confirmBtn = document.querySelector(".confirmation-cover .confirm-btn");
    confirmBtn.addEventListener("click", function () {
        let deleteForm = document.querySelector("form.delete-account");
        let accountPkInput = deleteForm.querySelector("input[name=account_pk]");
        let accountNumberInput = deleteForm.querySelector("input[name=account_number]");
        accountNumberInput.value = currentNumber;
        accountPkInput.value = currentID;

        currentID = null;
        currentNumber = null;

        let url = deleteForm.action;
        let data = new FormData(deleteForm);

        //add a preloader here
        showPreloader();
        deleteAccount(url, data);

    });
}


function deleteAccount(url, data) {
    $.ajax({
        url: url,
        type: "POST",
        contentType: false,
        processData: false,
        data: data,
        success: function (response) {
            hidePreloader();
            if (response.success) {
                showSuccessMessage(response.message);
                invokeGetAccounts();
            }
            else {
                showErrorMessage(response.message);
            }
        },
        error: function (err) {
            hidePreloader();
            let message = specifyError(err.status);
            showErrorMessage(message);
        }

    });

}

document.addEventListener("DOMContentLoaded", function () {
    activateDeleteBtns();
    activateDeleteConfirm();
})