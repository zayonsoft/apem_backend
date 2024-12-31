function submitLogin(url, data) {
    $.ajax({
        url: url,
        type: "POST",
        contentType: false,
        processData: false,
        data: data,
        success: function (response) {
            if (response.success) {
                showSuccess(response.message);
                setTimeout(function () {
                    location.replace(response.next_url);
                }, 800);
            }
            else {
                showError(response.message);
                removeProcessing();
            }
        },
        error: function (err) {
            let message = specifyError(err.status);
            showError(message);
            removeProcessing();
        }

    });

}
