const COLOR_BRUSH = "color-brush";
const ERASE_BRUSH = "erase-brush";
const LIGHTEN_BRUSH = "lighten-brush";
const DARKEN_BRUSH = "darken-brush";
const RAINBOW_BRUSH = 5; // no used

let gridSize = 16;
let activeBrush = document.querySelector(".active");
let brushColor = document.querySelector("#color-picker").value;
let mouseDown = false;

function createGrid() {
    let container = document.querySelector(".grid-container");
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
    let container = document.querySelector(".grid-container");
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

function useBrush(e) {
    if (e.type === "mouseover" && mouseDown === false) {
        return;
    }
    let currentBrightness = window.getComputedStyle(this).getPropertyValue("filter").match(/\((.*)\)/)[1];
    if (activeBrush === RAINBOW_BRUSH) {
        let colour = getRandomColour();
        this.style.background = `rgb(${colour[0]}, ${colour[1]}, ${colour[2]})`;
    } else if (activeBrush.id === DARKEN_BRUSH) {
        this.style.filter = `brightness(${parseFloat(currentBrightness) - 0.1})`;
    } else if (activeBrush.id === LIGHTEN_BRUSH && currentBrightness < 1) {
        this.style.filter = `brightness(${parseFloat(currentBrightness) + 0.1})`;
    } else if (activeBrush.id === COLOR_BRUSH) {
        this.style.background = brushColor;
    } else if (activeBrush.id === ERASE_BRUSH) {
        this.style.background = "white";
        this.style.filter = `brightness(${1})`;
    }
}

function addBrushEventListener() {
    document.body.onmousedown = () => {
        mouseDown = true;
    };
    document.body.onmouseup = () => {
        mouseDown = false;
    };
    document.querySelectorAll(".square").forEach(square => {
        square.addEventListener("mouseover", useBrush);
        square.addEventListener("mousedown", useBrush);
    });
}

function addBrushButtonEventListener() {
    document.querySelectorAll(".brush-button").forEach(brush => {
        brush.addEventListener("click", () => {
            let active = document.querySelector(".active");
            active.classList.remove("active");
            brush.classList.add("active");
            activeBrush = brush;
        });
    });
}

function addColorPickerEventListener() {
    document.querySelector("#color-picker").addEventListener("input", () => {
        brushColor = document.querySelector("#color-picker").value;
    });
}

function addClearButtonEventListener() {
    document.querySelector(".clear-button").addEventListener("click", () => {
        deleteCurrentSketchPad();
        init();
    });
}

function addNewGridButtonEventListener() {
    document.querySelector(".new-grid-button").addEventListener("click", () => {
        gridSize = prompt("What size sketchpad: ");
        while (gridSize > 100) {
            gridSize = prompt("Please choose a size smaller than 100: ");
        }
        deleteCurrentSketchPad();
        init();
    });
}

function addEventListeners() {
    addBrushEventListener();
    addBrushButtonEventListener();
    addColorPickerEventListener();
    addClearButtonEventListener();
    addNewGridButtonEventListener();
}

function init() {
    createGrid();
    addEventListeners();
}

init();