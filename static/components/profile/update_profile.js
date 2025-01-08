function activateUpdateProfile() {
    let theForm = document.querySelector("form.update-profile");
    theForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let email = document.querySelector("input[name=email]").value;
        let firstname = document.querySelector("input[name=first_name]").value;
        let lastname = document.querySelector("input[name=last_name]").value;

        if (!email.trim()) {
            showErrorMessage("Enter Your Email!");
            return;
        }
        if (!firstname.trim()) {
            showErrorMessage("Enter First Name!");
            return;
        }

        if (!lastname.trim()) {
            showErrorMessage("Enter Last Name!");
            return;
        }


        let url = this.action;
        let data = new FormData(this);
        showProcessing();
        updateProfile(url, data);

    });
}


function updateProfile(url, data) {
    $.ajax({
        url: url,
        type: "POST",
        contentType: false,
        processData: false,
        data: data,
        success: function (response) {
            if (response.success) {
                showSuccessMessage(response.message);
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
    let btn = document.querySelector(".update-profile-btn");
    btn?.classList.add("processing");
    if (btn)
        btn.innerHTML = `Processing...`;
    btn?.setAttribute("disabled", "disabled");
}

function removeProcessing() {
    let btn = document.querySelector(".update-profile-btn");
    if (btn)
        btn.innerHTML = `Update Profile`;

    btn?.classList.remove("processing");
    btn?.removeAttribute("disabled");
}



function invokeFetchCurentData() {
    let url = document.querySelector("input[name=get_profile_url]").value;
    let data = { '': '' };
    fetchCurrentData(url, data);
}


function fetchCurrentData(url, data) {
    $.ajax({
        url: url,
        type: "GET",
        data: data,
        success: function (response) {
            appendDetails(response.details);
        },
        error: function (err) {

        }
    });
}


function appendDetails(details) {
    let theForm = document.querySelector("form.update-profile");
    let emailInput = theForm.querySelector("input[name=email]");
    let firstnameInput = theForm.querySelector("input[name=first_name]");
    let lastnameInput = theForm.querySelector("input[name=last_name]");

    emailInput.value = details.email;
    firstnameInput.value = details.first_name;
    lastnameInput.value = details.last_name;
}

document.addEventListener("DOMContentLoaded", function () {
    activateUpdateProfile();
    invokeFetchCurentData();
});