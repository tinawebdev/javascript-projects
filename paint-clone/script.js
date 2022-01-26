jscolor.install();
const activeToolEl = document.getElementById('active-tool');
const brushColorBtn = document.getElementById('brush-color');
const brushIcon = document.getElementById('brush');
const brushSize = document.getElementById('brush-size');
const brushSlider = document.getElementById('brush-slider');
const bucketColorBtn = document.getElementById('bucket-color');
const eraser = document.getElementById('eraser');
const clearCanvasBtn = document.getElementById('clear-canvas');
const saveStorageBtn = document.getElementById('save-storage');
const loadStorageBtn = document.getElementById('load-storage');
const clearStorageBtn = document.getElementById('clear-storage');
const downloadBtn = document.getElementById('download');
const { body } = document;

// Global Variables
const canvas = document.createElement('canvas');
canvas.id = 'canvas';
const context = canvas.getContext('2d');
let currentSize = 10;
let bucketColor = '#FFFFFF';
let currentColor = '#1DABB8';
let isEraser = false;

// Formatting Brush Size
function displayBrushSize() {
  if (brushSlider.value < 10) {
    brushSize.textContent = `0${brushSlider.value}`;
  } else {
    brushSize.textContent = brushSlider.value;
  }
}

// Setting Brush Size
brushSlider.addEventListener('change', () => {
  currentSize = brushSlider.value;
  displayBrushSize();
});

// Setting Brush Color
brushColorBtn.addEventListener('change', () => {
  isEraser = false;
  currentColor = brushColorBtn.value;
});

// Setting Background Color
bucketColorBtn.addEventListener('change', () => {
  bucketColor = bucketColorBtn.value;
  createCanvas();
});

// Eraser
eraser.addEventListener('click', () => {
  isEraser = true;
  brushIcon.style.color = 'white';
  eraser.style.color = 'black';
  activeToolEl.textContent = 'Eraser';
  currentColor = bucketColor;
  currentSize = 50;
});

// Switch back to Brush
function switchToBrush() {
  isEraser = false;
  activeToolEl.textContent = 'Brush';
  brushIcon.style.color = 'black';
  eraser.style.color = 'white';
  currentColor = brushColorBtn.value;
  currentSize = 10;
  brushSlider.value = 10;
  displayBrushSize();
}

// Create Canvas
function createCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 50;
  context.fillStyle = bucketColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  body.appendChild(canvas);
  switchToBrush();
}

// Event Listener
brushIcon.addEventListener('click', switchToBrush);

// On Load
createCanvas();
