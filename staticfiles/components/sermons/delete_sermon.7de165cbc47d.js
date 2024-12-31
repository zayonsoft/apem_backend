function activateDeleteBtns() {
    let deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            let clickedElement = e.currentTarget;
            let pk = clickedElement.dataset.pk;
            let sermonTitle = clickedElement.dataset.sermon_title;

            setDeleteForm(pk, sermonTitle);

            showConfirmationDialog(`Are You Sure You Want to Delete a Sermon Titled: <b>${sermonTitle}</b> ?`);
        });
    });
}

function setDeleteForm(pk, title) {
    let pkInput = document.querySelector("input[name=sermon_pk]");
    let titleInput = document.querySelector("input[name=title]");

    pkInput.value = pk;
    titleInput.value = title;
}


function activateDeleteConfirm() {
    let confirmBtn = document.querySelector(".confirmation-cover .confirm-btn");
    confirmBtn.addEventListener("click", function () {
        let deleteForm = document.querySelector("form.delete-sermon-form");

        let url = deleteForm.action;
        let data = new FormData(deleteForm);

        //add a preloader here
        showPreloader();
        deleteSermon(url, data);

    });
}



function deleteSermon(url, data) {
    $.ajax({
        url: url,
        type: "POST",
        contentType: false,
        processData: false,
        data: data,
        success: function (response) {
            hidePreloader();
            if (response.success) {
                invokeGetSermons();
                showSuccessMessage(response.message);
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
    activateDeleteConfirm();
});