const canvas = document.getElementById('drawing-board');
const sidebar = document.getElementById('sidebar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let chooseBoxes = document.querySelectorAll('.choose-box');
chooseBoxes.forEach(element => {
    number = element.id.slice(-1);
    let sidebar = document.getElementById(`sidebar-${number}`);
    if (sidebar !== null){
        sidebar.style.visibility = "hidden";
    }
});

let colorPickerInputs = document.querySelectorAll('input[type=color]');
if (colorPickerInputs)
  colorPickerInputs[0].setAttribute('style', 'position: absolute; top: 20px; left:50px; opacity: 0;');

let isPainting = false;
let drawLine = 0;

let simpleDrawLineWidth = 5;
let straightLineWidth = 5;

let tool = "ch--1";

let startX;
let startY;

let lineStartX;
let lineStartY;

let lineEndX;
let lineEndY;


function setBackgroundColor(toolElement) {
    let chooseBoxes = document.querySelectorAll('.choose-box');
    chooseBoxes.forEach(element => {
        number = element.id.slice(-1);
        let sidebar = document.getElementById(`sidebar-${number}`);
        if (element.id === toolElement.id){            
            if (sidebar !== null){
                sidebar.style.visibility = "visible";
            }
            element.style.backgroundColor = "#FFC107";            
            tool = toolElement.id;
        }
        else{
            element.style.backgroundColor = "#6C757D";
            if (sidebar !== null){
                sidebar.style.visibility = "hidden";
            }
        }
    });
}

sidebar.addEventListener('click', e => {
    drawLine = 0;
    isPainting = false;
    ctx.closePath();
    if (e.target.id === 'ch-1' ||
        e.target.id === 'ch-2' ||
        e.target.id === 'ch-3' ||
        e.target.id === 'ch-4' ||
        e.target.id === 'ch-5' ||
        e.target.id === 'ch-6' ||
        e.target.id === 'ch-7' ||
        e.target.id === 'ch-8' ||
        e.target.id === 'ch-9' ||
        e.target.id === 'ch-10' ||
        e.target.id === 'ch-11' ||
        e.target.id === 'ch-12') {
        setBackgroundColor(e.target);
    }
    if (e.target.id === 'ch-9') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

sidebar.addEventListener('change', e => {
    if(e.target.id === "color-picker") {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'sidebar-input-3') {
        simpleDrawLineWidth = e.target.value;
    }
    if(e.target.id === 'sidebar-input-4') {
        straightLineWidth = e.target.value;
    }
});

const draw = (e) => {
    if(!isPainting) {
        return;
    }
    if (tool === "ch-3"){
        ctx.lineWidth = simpleDrawLineWidth;
        ctx.lineCap = 'round';

        ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
        ctx.stroke();
    }
    else{
        isPainting = false;
    }
}


canvas.addEventListener('mousedown', (e) => {
    if (tool == "ch-3"){
        let sidebar = document.getElementById(`sidebar-3`);
        if (sidebar !== null){
            sidebar.style.visibility = "hidden";
        }
        isPainting = true;
        ctx.beginPath();
        startX = e.clientX;
        startY = e.clientY;
        
    }
    if (tool == "ch-4"){
        isPainting = false;
        let sidebar = document.getElementById(`sidebar-4`);
        if (sidebar !== null){
            sidebar.style.visibility = "hidden";
        }
        
        if (drawLine === 0){
            ctx.beginPath();
            drawLine = 1;
            lineStartX = e.clientX;
            lineStartY = e.clientY;
        }
        else if (drawLine === 1){
            drawLine = 2;
            lineEndX = e.clientX;
            lineEndY = e.clientY;            
        }        
    }
});

canvas.addEventListener('mouseup', e => {
    if (tool == "ch-3"){
        let sidebar = document.getElementById(`sidebar-3`);
        if (sidebar !== null){
            sidebar.style.visibility = "hidden";
        }
        isPainting = false;
        ctx.stroke();
        ctx.closePath();
    }
    if (tool == "ch-4"){
        isPainting = false;
        let sidebar = document.getElementById(`sidebar-4`);
        if (sidebar !== null){
            sidebar.style.visibility = "hidden";
        }
        if (drawLine === 2){
            drawLine = 0;
            ctx.lineWidth = straightLineWidth;
            ctx.lineCap = 'round';
            ctx.moveTo(lineStartX - canvasOffsetX, lineStartY);
            ctx.lineTo(lineEndX - canvasOffsetX, lineEndY);
            ctx.stroke();
            ctx.closePath();
        }
    }
});

canvas.addEventListener('mousemove', draw);
