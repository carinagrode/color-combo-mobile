const grid = document.querySelector('#grid');

const level = document.querySelector('#level');
let levelCounter = 1;
level.textContent = levelCounter;

createGrid('rgb(86, 229, 222)', 'rgb(255, 192, 203)');

function createGrid(gridColor, paintbrushColor) {
    grid.style.backgroundColor = gridColor;

    for (let i = 0; i < 256; i++) {
        const box = document.createElement('div');
        grid.appendChild(box);
    
        box.style.border = '2px solid white';
        box.style.width = '40px';
        box.style.height = '40px';

        box.setAttribute('class', 'pixel');
    
        box.addEventListener('mouseenter', () => {
            box.style.backgroundColor = paintbrushColor;
            checkGameEnd(paintbrushColor);
        });

        box.addEventListener('mouseleave', () => {
            box.style.backgroundColor = paintbrushColor;
        });
    }

    const levelText = document.querySelector('#level-text');
    const taskText = document.querySelector('#task-text');
    levelText.style.color = gridColor;
    taskText.style.color = paintbrushColor;
}

function checkGameEnd(color) {
    const pixels = document.querySelectorAll('.pixel');
    let pixelCounter = 256
    
    for (let i = 0; i < pixels.length; i++) {

        if (pixels[i].style.backgroundColor === color) {
            pixelCounter--;
        }

        if (pixelCounter === 0) {
            createNewGrid();
        }
    }
}

function createNewGrid() {
    removeGrid();

    const randomColor = [];
    let i = 0;
    while (i < 6) {
        color = getRandomNumber();
        randomColor.push(color);
        i++;
    }

    const randomGridColor = `rgb(${randomColor[0]}, ${randomColor[1]}, ${randomColor[2]})`;
    const randomPaintbrushColor = `rgb(${randomColor[3]}, ${randomColor[4]}, ${randomColor[5]})`;

    createGrid(randomGridColor, randomPaintbrushColor);

    levelCounter++;
    level.textContent = levelCounter;
}

function removeGrid() {

    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 256);
}


// Change the favicon color each time the browser is refreshed

const favicon = document.querySelector('link[rel="icon"]');

function changeFavicon() {
  const randomColor = getRandomColor();
  favicon.href = `favicon/${randomColor}.png`;
}

function getRandomColor() {

  const randomNumber = Math.floor(Math.random() * 5) + 1;
  return `color${randomNumber}`;
}

window.addEventListener('load', changeFavicon);

