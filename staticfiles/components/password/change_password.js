function activateChangePassword() {
    let theForm = document.querySelector("form.change_password");
    theForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let fmrPassword = document.querySelector("input[name=fmr_password]").value;
        let newPassword = document.querySelector("input[name=new_password]").value;
        let confirmPassword = document.querySelector("input[name=confirm_new_password]").value;

        if (!fmrPassword.trim()) {
            showErrorMessage("Enter Former Password!");
            return;
        }
        if (!newPassword.trim()) {
            showErrorMessage("Enter New Password!");
            return;
        }
        if (newPassword.length < 4) {
            showErrorMessage("Password too Short! Password Must be at least 4 Chars");
            return;
        }

        if (confirmPassword != newPassword) {
            showErrorMessage("Too Passwords Don't Match");
            return;
        }
        let url = this.action;
        let data = new FormData(this);
        showProcessing();
        changePassword(url, data);

    });
}


function changePassword(url, data) {
    $.ajax({
        url: url,
        type: "POST",
        contentType: false,
        processData: false,
        data: data,
        success: function (response) {
            if (response.success) {
                showSuccessMessage(response.message);
                setTimeout(
                    function () {
                        location.reload()
                    },
                    1000
                );

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

function showProcessing() {
    // removeError();
    let btn = document.querySelector(".submit-password");
    btn?.classList.add("processing");
    if (btn)
        btn.innerHTML = `Processing...`;
    btn?.setAttribute("disabled", "disabled");
}

function removeProcessing() {
    let btn = document.querySelector(".submit-password");
    if (btn)
        btn.innerHTML = `Confirm Change`;

    btn?.classList.remove("processing");
    btn?.removeAttribute("disabled");
}


document.addEventListener("DOMContentLoaded", function () {
    activateChangePassword();
});