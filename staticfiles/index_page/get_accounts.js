function invokeGetAccounts() {
    let url = document.querySelector("input[name=get_account_url]").value;

    let data = { search_value: "" };
    appendAccountsPreloader();
    getAccounts(url, data);

}


function getAccounts(url, data) {
    $.ajax({
        url: url,
        type: "GET",
        data: data,
        success: function (response) {
            if (response.success) {
                appendAccounts(response.account_list);
            }
            else {
                appendGetAccountError(response.message);
            }
        },
        error: function (err) {
            let message = specifyError(err.status);

            appendGetAccountError(message)
        }

    });

}

function appendAccountsPreloader() {
    let accountsCover = document.querySelector("div.accounts-cover");

    accountsCover.innerHTML = `
    <div class="preloader-cover">
        <span class="styled-preloader"></span>
    </div>
    `
}

function appendAccounts(acc_list) {
    let accountsCover = document.querySelector("div.accounts-cover");
    accountsCover.innerHTML = ``;
    for (var i in acc_list) {
        let account = acc_list[i];

        let div = document.createElement("div");
        div.classList.add("each-account-cover");

        let accountName = account.account_name;
        let bankName = account.bank_name;
        let accountNumber = account.account_number;

        div.innerHTML = `

        <div class="bank-name">
            <span class="give-label">Bank Name</span>
            <span class="give-text">${bankName}</span>
        </div>

        <div class="account-name">
            <span class="give-label">Account Name</span>
            <span class="give-text">${accountName}</span>
        </div>

        <div class="account-number">
            <span class="give-label">Account Number</span>
            <span class="give-text">
                <span class="give-text-content">${accountNumber}</span>
                <input style="display: none;" type="text" class="clipboard-text" value="">

                <button class="clipboard not-copied">
                    <span class="not-copied"><i class="fa fa-copy">
                        </i>
                    </span>
                    <span class="copied">
                        <i class="fa fa-check"></i>
                    </span>
                </button>
                <span class="show-copied"></span>
            </span>
        </div>

        `;
        accountsCover.appendChild(div);
    }

    activateCopyToClipboard();

}


function appendGetAccountError(err_message) {
    let accountsCover = document.querySelector("div.accounts-cover");
    accountsCover.innerHTML = `
    <p style="text-align:center; color:darkred;" > <b>${err_message}</b></p>
    `;
}
