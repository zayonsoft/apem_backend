function invokeGetSermons() {
    let url = document.querySelector("input[name=get_sermon_url]").value;

    let data = { search_value: getSeachValue()  };
    appendGetPreloader();

    getSermons(url, data);

}


function getSeachValue() {
    let searchInput = document.querySelector("input[name=search_value]");
    return searchInput.value;
}


function activateRealTimeSearch() {
    let searchInput = document.querySelector("input[name=search_value]");
    let timer;
    searchInput.addEventListener("keyup", () => {
        clearTimeout(timer);
        timer = setTimeout(invokeGetSermons, 800);
    });
    searchInput.addEventListener("input", () => {
        clearTimeout(timer);
        timer = setTimeout(invokeGetSermons, 800);
    });
}


function getSermons(url, data) {
    $.ajax({
        url: url,
        type: "GET",
        data: data,
        success: function (response) {
            if (response.success) {
                appendSermons(response.sermon_list);
            }
            else {
                appendGetError(response.message);
            }
        },
        error: function (err) {
            let message = specifyError(err.status);
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



function appendSermons(sermon_list) {
    let postsCover = document.querySelector("div.posts-cover");
    postsCover.innerHTML = ``;

    for (var i in sermon_list) {
        let sermon = sermon_list[i];

        let li = document.createElement("li");
        li.classList.add("each-post");

        let sermonPk = sermon.pk;
        let title = sermon.title;
        let body = sermon.body;

        let poster = sermon.poster;
        let stringLength = 7;
        let reducedBody;
        if (body.length > stringLength) {
            reducedBody = `${body.slice(0, stringLength)}...`;
        }
        else {
            reducedBody = `${body.slice(0, stringLength)}...`;
        }

        li.innerHTML = `
            <span class="title"> <b class="bigger">Title:</b> ${title}
            </span>

            <span class="title">
                <b class="bigger">Description:</b> ${reducedBody}
            </span>
            <span class="title">
                <b class="bigger">Posted By:</b> ${poster}
            </span>

            <span class="crud">
                <a data-pk="${sermonPk}" data-sermon_title="${title}" data-sermon_body="${body}" href="" class="view-btn">View</a>

                <a data-pk="${sermonPk}" data-sermon_title="${title}" data-sermon_body="${body}" href="" class="edit-btn">Edit</a>
                <a data-pk="${sermonPk}" data-sermon_title="${title}" data-sermon_body="${body}" href="" class="delete-btn">Delete</a>
            </span>
        `;
        postsCover.appendChild(li);
    }
    activateEditSermon();
    activateDeleteBtns();

}

function appendGetError(err_message) {
    let postsCover = document.querySelector("div.posts-cover");
    postsCover.innerHTML = `
    <p style="text-align:center;" >${err_message}</p>
    `;
}


document.addEventListener("DOMContentLoaded", function () {
    invokeGetSermons();
    activateRealTimeSearch();
});