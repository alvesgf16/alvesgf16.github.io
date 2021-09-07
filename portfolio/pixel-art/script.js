function generateRgbValues() {
  const rgbValues = [];
  for (let index = 0; index < 3; index += 1) {
    rgbValues.push(Math.floor(Math.random() * (255 + 1)));
  }

  return `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
}

function generateColorIds() {
  const colorPalette = document.getElementsByClassName('color');
  for (let index = 1; index < colorPalette.length; index += 1) {
    colorPalette[index].id = generateRgbValues();
  }
}

function paintColorPalette() {
  const colorPalette = document.getElementsByClassName('color');
  for (let index = 0; index < colorPalette.length; index += 1) {
    colorPalette[index].style.backgroundColor = colorPalette[index].id;
  }
}

function createPixel() {
  const pixel = document.createElement('div');
  pixel.className = 'pixel';
  pixel.style.backgroundColor = 'white';
  return pixel;
}

function createpixelLine(lineSize) {
  const pixelLine = document.createElement('div');
  pixelLine.className = 'pixel-line';

  for (let j = 0; j < lineSize; j += 1) {
    const pixel = createPixel();
    pixelLine.appendChild(pixel);
  }

  return pixelLine;
}

function createPixelBoard(boardSize) {
  const pixelBoard = document.getElementById('pixel-board');
  for (let i = 0; i < boardSize; i += 1) {
    const pixelLine = createpixelLine(boardSize);
    pixelBoard.appendChild(pixelLine);
  }
}

function setInitialColor() {
  const blackColor = document.getElementById('black');
  blackColor.classList.add('selected');
}

function changeSelectedColor(event) {
  const currentColor = document.querySelector('.selected');
  const newColor = event.target;

  currentColor.classList.remove('selected');
  newColor.classList.add('selected');
}

function selectColor() {
  const colorPalette = document.getElementsByClassName('color');
  for (let index = 0; index < colorPalette.length; index += 1) {
    colorPalette[index].addEventListener('click', changeSelectedColor);
  }
}

function paintPixel(event) {
  const currentColor = document.querySelector('.selected');
  const targetPixel = event.target;

  targetPixel.style.backgroundColor = currentColor.id;
}

function selectPixel() {
  const pixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].addEventListener('click', paintPixel);
  }
}

function clearBoard() {
  const clearButton = document.getElementById('clear-board');
  clearButton.addEventListener('click', () => {
    const pixels = document.getElementsByClassName('pixel');
    for (let index = 0; index < pixels.length; index += 1) {
      pixels[index].style.backgroundColor = 'white';
    }
  });
}

function removeOldBoard() {
  const pixelBoard = document.getElementById('pixel-board');
  while (pixelBoard.firstChild) {
    pixelBoard.removeChild(pixelBoard.firstChild);
  }
}

function changeBoardSize() {
  const input = document.getElementById('board-size');
  let newBoardSize;
  if (input.value === '') {
    alert('Board inválido!');
  } else if (input.value < 5) {
    newBoardSize = 5;
  } else if (input.value > 50) {
    newBoardSize = 50;
  } else {
    newBoardSize = input.value;
  }

  return newBoardSize;
}

function generateNewBoard() {
  const boardGeneratorButton = document.getElementById('generate-board');
  boardGeneratorButton.addEventListener('click', () => {
    removeOldBoard();
    const newBoardSize = changeBoardSize();
    createPixelBoard(newBoardSize);
    selectPixel();
  });
}

window.onload = () => {
  generateColorIds();
  paintColorPalette();
  createPixelBoard(5);
  setInitialColor();
  selectColor();
  selectPixel();
  clearBoard();
  generateNewBoard();
};
