let gridSize = 16;

function createDivs() {
    let container = document.querySelector(".container");
    for (let i = 0; i < gridSize; i++) {
        let col = document.createElement("div");
        col.classList.add("grid-col");
        container.append(col);
    }
    let cols = document.querySelectorAll(".grid-col");
    cols.forEach( col => {
        for (let i = 0; i < gridSize; i++) {
            let div = document.createElement("div");
            div.classList.add("square");
            col.append(div);
        }
    });
}

function deleteSketchPadContents(node) {
    while (node.hasChildNodes()) {
        deleteSketchPadContents(node.firstChild);
    }
    node.parentNode.removeChild(node);
}

function deleteCurrentSketchPad() {
    let container = document.querySelector(".container");
    while (container.hasChildNodes()) {
        deleteSketchPadContents(container.firstChild);
    }
}

function addEventListeners() {
    document.querySelectorAll(".square").forEach(square => {
        square.addEventListener("mouseenter", () => {
            if (square.classList.contains("hovered")) {
                let currentBrightness = window.getComputedStyle(square).getPropertyValue("filter").match(/\((.*)\)/)[1];
                square.style.filter = `brightness(${currentBrightness-0.1})`;
            } else {
                square.classList.add("hovered");
            }
        })
    });

    document.querySelector(".new-grid-button").addEventListener("click", () => {
        gridSize = prompt("What size sketchpad: ");
        while (gridSize > 100) {
            gridSize = prompt("Please choose a size smaller than 100: ");
        }
        deleteCurrentSketchPad();
        init();
    })
}

function init() {
    createDivs();
    addEventListeners();
}

init();