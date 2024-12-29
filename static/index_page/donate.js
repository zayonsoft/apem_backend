function activateCloseDonate() {
    let closeBtn = document.querySelector("button.close-giving");
    closeBtn.addEventListener("click", function () {
        closeDonate();
    });
}

function activateOpenDonate() {
    let openBtn = document.querySelector("button.give-btn");
    openBtn.addEventListener("click", function () {
        openDonate();
    });
}
function activateClickClose() {
    let giveOverlay = document.querySelector("section.give-overlay");
    giveOverlay.addEventListener("click", function (e) {
        let clickedElement = e.target;
        if (clickedElement.classList.contains("close-click")) {
            closeDonate();

        }
    });
}

function activateScrollClose() {
    document.addEventListener("scroll", function () {
        closeDonate();
    });
}

function closeDonate() {
    let giveOverlay = document.querySelector("section.give-overlay");
    giveOverlay.style.display = "none";
}

function openDonate() {
    let giveOverlay = document.querySelector("section.give-overlay");
    giveOverlay.style.display = "block";
    invokeGetAccounts();
}

// UNVERIFIED CODE

function activateCopyToClipboard() {

    let copyBtns = document.querySelectorAll("button.clipboard");
    copyBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            let clickedBtn = e.currentTarget;
            let parent = clickedBtn.parentElement;
            let textSpan = parent.querySelector("span.give-text-content");
            let textToCopy = textSpan.textContent;

            let clipboardInput = parent.querySelector("input.clipboard-text");
            clipboardInput.value = textToCopy;

            // Select the text
            clipboardInput.select();
            clipboardInput.setSelectionRange(0, 99999); // For mobile devices

            // Copy the text
            try {
                navigator.clipboard.writeText(clipboardInput.value)
                    .then(() => {
                        activateCopied(clickedBtn);
                    })
                    .catch(err => {

                    });
            } catch (err) {
                // Fallback for older browsers
                document.execCommand("copy");
                activateCopied(clickedBtn);
            }

        });
    });

}


let ID;
function activateCopied(clickedBtn) {
    deactivateCopied();
    clearTimeout(ID);
    let btnParent = clickedBtn.parentElement;
    let copyText = btnParent.querySelector("span.show-copied");
    clickedBtn.classList.remove("not-copied");
    clickedBtn.classList.add("copied");
    copyText.innerText = `copied`;
    ID = setTimeout(deactivateCopied, 1500);
}

function deactivateCopied() {
    let btns = document.querySelectorAll("button.clipboard");
    btns.forEach(function (btn) {
        btn.classList.remove("copied");
        btn.classList.add("not-copied");
    });
    let copyTexts = document.querySelectorAll(".show-copied");
    copyTexts.forEach(function (text) {
        text.innerText = ``;
    });
}





document.addEventListener("DOMContentLoaded", function () {
    activateOpenDonate();
    activateCloseDonate();
    activateClickClose();
    activateScrollClose();
    // activateCopyToClipboard();
});