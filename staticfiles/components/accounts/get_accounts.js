function invokeGetAccounts() {
    let url = document.querySelector("input[name=get_account_url]").value;

    let data = { search_value: "" };
    appendGetPreloader();
    getAccounts(url, data);

}


function getAccounts(url, data) {
    $.ajax({
        url: url,
        type: "GET",
        data: data,
        success: function (response) {
            if (response.success) {
                // showSuccessMessage(response.message);
                appendAccounts(response.account_list);
            }
            else {
                appendGetError(response.message);
            }
        },
        error: function (err) {
            let message = specifyError(err.status);
            // showErrorMessage(message);
            appendGetError(message)
        }

    });

}

function appendGetPreloader() {
    let postsCover = document.querySelector("div.posts-cover");
    let preloaderUrl = document.querySelector("input[name=preloader]").value;

    postsCover.innerHTML = `
    <div class="preloader-cover">
        <img src="${preloaderUrl}" alt="">
    </div>
    `
}

function appendAccounts(acc_list) {
    let postsCover = document.querySelector("div.posts-cover");
    postsCover.innerHTML = ``;
    for (var i in acc_list) {
        let account = acc_list[i];

        let li = document.createElement("li");
        li.classList.add("each-post");

        let accountName = account.account_name;
        let bankName = account.bank_name;
        let accountNumber = account.account_number;

        li.innerHTML = `
            <span class="details-cover">
                <span class="detail"> <b>Bank Name:</b> ${bankName}</span>
                <span class="detail"> <b>Account Name:</b> ${accountName}</span>
                <span class="detail"> <b>Account Number:</b> ${accountNumber}</span>
            </span>

            <span class="crud">
                <a data-pk="${account.pk}" data-acc_name="${accountName}" data-bank_name="${bankName}" data-acc_number="${accountNumber}" href="" class="edit-btn">
                Edit</a>
                <a data-pk="${account.pk}" data-acc_name="${accountName}" data-bank_name="${bankName}" data-acc_number="${accountNumber}" href="" class="delete-btn">
                Delete</a>
            </span>
        `;
        postsCover.appendChild(li);
    }
    activateEditAccounts();
    activateDeleteBtns();
}

function appendGetError(err_message) {
    let postsCover = document.querySelector("div.posts-cover");
    postsCover.innerHTML = `
    <p style="text-align:center;" >${err_message}</p>
    `;
}

document.addEventListener("DOMContentLoaded", function () {
    invokeGetAccounts();
});