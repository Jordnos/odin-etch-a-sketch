const COLOR_BRUSH = 1;
const ERASE_BRUSH = 2;
const LIGHTEN_BRUSH = 3;
const DARKEN_BRUSH = 4;
const RAINBOW_BRUSH = 5;

let gridSize = 16;
let brush = COLOR_BRUSH;

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

function getRandomColour() {
    let r = Math.floor(Math.random()*(226));
    let g = Math.floor(Math.random()*(226));
    let b = Math.floor(Math.random()*(226));
    return [r, g, b];
}

function addBrushEventListener() {
    document.querySelectorAll(".square").forEach(square => {
        square.addEventListener("mouseenter", () => {
            let currentBrightness = window.getComputedStyle(square).getPropertyValue("filter").match(/\((.*)\)/)[1];
            if (brush === RAINBOW_BRUSH) {
                let colour = getRandomColour();
                square.style.background = `rgb(${colour[0]}, ${colour[1]}, ${colour[2]})`;
            } else if (brush === DARKEN_BRUSH) {
                square.style.filter = `brightness(${parseFloat(currentBrightness) - 0.1})`;
            } else if (brush === LIGHTEN_BRUSH && currentBrightness < 1) {
                square.style.filter = `brightness(${parseFloat(currentBrightness) + 0.1})`;
            } else if (brush === COLOR_BRUSH) {
                square.style.background = "yellow";
            } else if (brush === ERASE_BRUSH) {
                square.style.background = "white";
                square.style.filter = `brightness(${1})`;
            }
        })
    });
}

function addEventListeners() {
    addBrushEventListener();

    document.querySelector(".new-grid-button").addEventListener("click", () => {
        gridSize = prompt("What size sketchpad: ");
        while (gridSize > 100) {
            gridSize = prompt("Please choose a size smaller than 100: ");
        }
        deleteCurrentSketchPad();
        init();
    });

    document.querySelector(".colour-brush-button").addEventListener("click", () => {
        brush = COLOR_BRUSH;
    });

    document.querySelector(".erase-brush-button").addEventListener("click", () => {
        brush = ERASE_BRUSH;
    });

    document.querySelector(".darken-brush-button").addEventListener("click", () => {
        brush = DARKEN_BRUSH;
    });

    document.querySelector(".lighten-brush-button").addEventListener("click", () => {
        brush = LIGHTEN_BRUSH;
    });
}

function init() {
    createDivs();
    addEventListeners();
}

init();