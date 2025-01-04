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
        changePassword(url, data);

    });
}