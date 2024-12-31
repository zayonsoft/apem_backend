function activateAddBtn() {
    let addBtn = document.querySelector("button.add-sermon-btn");
    addBtn.addEventListener("click", function () {
        showAddForm();
    });
}

function activateSubmitAddSermon() {
    let popupForm = document.querySelector("form.add-sermon");
    popupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let url = this.action;
        let data = new FormData(this);

        showProcessing();
        addSermon(url, data);

    });
}



function addSermon(url, data) {
    $.ajax({
        url: url,
        type: "POST",
        contentType: false,
        processData: false,
        data: data,
        success: function (response) {
            if (response.success) {
                showSuccessMessage(response.message);
                invokeGetSermons();
                hideAddForm();

            }
            else {
                showErrorMessage(response.message);
            }
            removeProcessing();
        },
        error: function (err) {
            removeProcessing();
            let message = specifyError(err.status);
            showErrorMessage(message);
        }

    });

}




function showAddForm() {
    let popCover = document.querySelector("div.add-popup-cover");
    popCover.style.display = "block";
}

function hideAddForm() {
    let popCover = document.querySelector("div.add-popup-cover");
    popCover.style.display = "none";
    resetAddForm();
    removeProcessing();
}

function activateCloseAdd() {
    let closer = document.querySelector("button.close-add-btn");
    closer.addEventListener("click", function () {
        hideAddForm();
    });
}

function resetAddForm() {
    let popupForm = document.querySelector("form.add-sermon");
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
    activateSubmitAddSermon();
});