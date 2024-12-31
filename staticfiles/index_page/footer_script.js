function activateDevBtn() {
    let devBtn = document.querySelector("button.show-more-footer");
    let copyrightCover = document.querySelector("div.copyright-text-cover");
    devBtn.addEventListener("click", () => {
        if (copyrightCover.classList.contains("hide-developer")) {
            showDeveloper();
        }
        else {
            hideDeveloper();
        }

    });
}

function showDeveloper() {
    let copyrightCover = document.querySelector("div.copyright-text-cover");
    let devContactCover = document.querySelector("div.dev-contact-cover");
    let developerContact = document.querySelector("p.developer-contact");

    copyrightCover.classList.remove("hide-developer");
    copyrightCover.classList.add("show-developer");

    let devContactHeight = developerContact.getBoundingClientRect().height;
    devContactCover.style.height = `${devContactHeight}px`;

}

function hideDeveloper() {
    let copyrightCover = document.querySelector("div.copyright-text-cover");
    let devContactCover = document.querySelector("div.dev-contact-cover");

    copyrightCover.classList.add("hide-developer");
    copyrightCover.classList.remove("show-developer");

    devContactCover.style.height = `${0}px`;

}


document.addEventListener("DOMContentLoaded", () => {
    activateDevBtn();
});