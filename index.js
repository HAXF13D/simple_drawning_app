const canvas = document.getElementById('drawing-board');
const sidebar = document.getElementById('sidebar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let tool = -1;
let startX;
let startY;

function setBackgroundColor(tool){
    console.log(1);
    let chooseBoxes = document.querySelectorAll('.choose-box');
    console.log(chooseBoxes);
    if (tool == -1){

    }
}

sidebar.addEventListener('click', e => {
    console.log(e.target.id);
    console.log(e.target.className);
    if (e.target.id === 'ch-1') {
        console.log(1);
        setBackgroundColor(1);
    }
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

sidebar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
    
});

const draw = (e) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);
