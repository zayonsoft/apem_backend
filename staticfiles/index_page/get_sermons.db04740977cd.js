function invokeGetSermons() {
    let url = document.querySelector("input[name=get_sermon_url]").value;

    let data = { search_value: "" };
    appendGetSermonPreloader();

    getSermons(url, data);

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
                appendGetSermonError(response.message);
            }
        },
        error: function (err) {
            let message = specifyError(err.status);
            appendGetSermonError(message)
        }

    });

}



function appendGetSermonPreloader() {
    let sermonCover = document.querySelector("div.blog-news-cover");

    sermonCover.innerHTML = `
    <div class="preloader-cover">
        <span class="styled-preloader"></span>
    </div>

    `
}


function appendSermons(sermon_list) {
    let sermonCover = document.querySelector("div.blog-news-cover");
    sermonCover.innerHTML = ``;

    for (var i in sermon_list) {
        let sermon = sermon_list[i];

        let a = document.createElement("a");
        a.classList.add("each-blog-post");
        a.setAttribute("href", "#")

        // let sermonPk = sermon.pk;
        let title = sermon.title;
        let body = sermon.body;
        let date = sermon.date;

        let poster = sermon.poster;
        let stringLength = 7;
        let reducedBody;
        if (body.length > stringLength) {
            reducedBody = `${body.slice(0, stringLength)}...`;
        }
        else {
            reducedBody = `${body.slice(0, stringLength)}...`;
        }

        let sermonImg = document.querySelector("input[name=sermon_img_url]").value;

        a.innerHTML = `
        <div class="blog-post-image">

            <img src="${sermonImg}" alt="">
            <section class="post-date">${date}</section>

        </div><!-- div.blog-post-image -->
        <div class="blog-post-details">
            <section class="author">
                <span class="blog-post-poster-icon">
                    <i class="far fa-user"></i>
                </span>
                <span class="blog-post-icon-text">by ${poster}</span>
            </section><!-- section.author -->
            <section class="comment-details">
                <span class="blog-post-icon">
                    <i class="far fa-comment"></i>
                </span>
                <span class="blog-post-icon-text">0 Comments</span>
            </section><!-- section.comment-details -->
        </div><!-- div.blog-post-details -->

        <div class="blog-post-title">
            <h3 class="blog-post-title-text">${title}</h3>
        </div><!-- div.blog-post-title -->
            
        `;
        sermonCover.appendChild(a);
    }

}

function appendGetSermonError(err_message) {
    let sermonCover = document.querySelector("div.blog-news-cover");
    sermonCover.innerHTML = `
    <p style="text-align:center; color:black;" > <b>${err_message}</b></p>

    `;
}

document.addEventListener("DOMContentLoaded", function () {
    invokeGetSermons();
});