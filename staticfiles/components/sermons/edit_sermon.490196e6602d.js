function activateEditSermon() {
    let editBtns = document.querySelectorAll(".edit-btn");

    editBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();

            let sermonPk = e.currentTarget.dataset.pk;
            let title = e.currentTarget.dataset.sermon_title;
            let body = e.currentTarget.dataset.sermon_body;

            setEditForm(sermonPk, title, body);
            showEditForm();

        });
    });
}


function setEditForm(pk, title, body) {
    let editForm = document.querySelector(".edit-sermon-form");

    let pkInput = editForm.querySelector("input[name=sermon_pk]");
    let fmrTitleInput = editForm.querySelector("input[name=fmr_title]");

    let titleInput = editForm.querySelector("input[name=title]");
    let textarea = editForm.querySelector("textarea[name=body]");


    pkInput.value = pk;
    titleInput.value = title;

    fmrTitleInput.value = title;
    textarea.innerText = body;
}


function resetEditForm() {
    let editForm = document.querySelector(".edit-sermon-form");
    editForm.reset();
}

function showEditForm() {
    let editOverlay = document.querySelector(".edit-sermon-popup");
    editOverlay.style.display = "block";
}

function activateHideEditForm() {
    let closeBtn = document.querySelector(".close-edit-form");
    closeBtn.addEventListener("click", function () {
        hideEditForm();
    });
}

function hideEditForm() {
    let editOverlay = document.querySelector(".edit-sermon-popup");
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
    let popupForm = document.querySelector("form.edit-sermon-form");
    popupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let url = this.action;
        let data = new FormData(this);

        showEditProcessing();
        editSermon(url, data);

    });
}



function editSermon(url, data) {
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
});