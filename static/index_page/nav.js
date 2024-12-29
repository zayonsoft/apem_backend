function activateNavControl() {
    let navBtn = document.querySelector("button.nav-btn");
    let header = document.querySelector("header");
    navBtn.addEventListener("click", function () {
        if (header.classList.contains("closed-nav")) {
            openNav();
        }
        else {
            closeNav();

        }
    });

}

function openNav() {
    let header = document.querySelector("header");
    header.classList.remove("closed-nav");
    header.classList.add("opened-nav");
    setNavHeight();
}

function closeNav() {
    let header = document.querySelector("header");
    header.classList.remove("opened-nav");
    header.classList.add("closed-nav");
    removeNavHeight();
}

function setNavHeight() {
    let heightTeller = document.querySelector("div.nav-links-container");
    let currentHeight = heightTeller.getBoundingClientRect().height;

    let heightMaker = document.querySelector("div.nav-links-cover");
    heightMaker.style.height = `${currentHeight}px`;
}

function removeNavHeight() {
    let heightMaker = document.querySelector("div.nav-links-cover");
    heightMaker.style.height = `${0}px`;
}

function activateNavFixing() {
    document.addEventListener("scroll", function () {
        closeNav();
        if (scrollY >= 150) {
            fixHeader();
        }
        else {
            unfixHeader();
        }
    });
}

function fixHeader() {
    let header = document.querySelector("header");
    header.classList.add("fixed-header");
}

function unfixHeader() {
    let header = document.querySelector("header");
    header.classList.remove("fixed-header");
}

function activateNavLinkScroll() {
    let navLinks = document.querySelectorAll(".scroll-link");
    navLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            let clickedElement = e.currentTarget;
            let locationClass = clickedElement.dataset.location;
            let locationElement = document.querySelector(`section.${locationClass}`);

            let header = document.querySelector("header");

            let elementPosition = locationElement.offsetTop;

            let headerHeight = header.getBoundingClientRect().height;
            let scrollPosition = elementPosition - headerHeight;

            let navLinks = document.querySelector("div.nav-links-cover");
            let navLinksHeight = navLinks.getBoundingClientRect().height;

            if (header.classList.contains("opened-nav")) {
                scrollPosition = scrollPosition + navLinksHeight;
            }

            scrollTo({
                "left": 0,
                "top": Math.ceil(scrollPosition),
            })


        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    activateNavControl();
    activateNavFixing();
    activateNavLinkScroll();
});