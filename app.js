const canvas = document.querySelector("#js-canvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("js-color");
const range = document.getElementById("js-range");
const mode = document.getElementById("js-mode");
const saveBtn = document.getElementById("js-save");

ctx.fillStyle = '#2c2c2c';
ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);


let painting = false;
let filling = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event) {
    painting = true;
}

function onMouseUp(event) {
    painting = false;
}

function onMouseLeave(event) {
    painting = false;
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click", () => {
        if(filling)
        {
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    });
    canvas.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
}

if(colors) {
    Array.from(colors).forEach(color => {
        color.addEventListener("click", (event) => {
            ctx.strokeStyle = event.target.style.backgroundColor;
            ctx.fillStyle = event.target.style.backgroundColor;
        })
    });
}

if(range) {
    range.addEventListener("input", (event) => {
        ctx.lineWidth = event.target.value;
    });
}

if(mode) {
    mode.addEventListener("click", () => {
        if(filling) {
            filling = false;
            mode.innerText = "Fill";
        } else {
            filling = true;
            mode.innerText = "Paint";
        }
    });
}

if(saveBtn) {
    saveBtn.addEventListener("click", () => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");

        link.href = image;
        link.download = "painting";

        link.click();
    });
}