const canvas = document.getElementById('canvas')
const scoreUI = document.getElementById('score')
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 1000;

const SIZE_GRID = 50;

const HEIGHT_GRID = canvas.height / SIZE_GRID;
const WIDTH_GRID = canvas.width / SIZE_GRID;


var grid = []
var score = 0
var pieces = [
    {
        x: Math.round(WIDTH_GRID / 2),
        y: 0,
        shape: [
            [1, 1],
            [1, 1]
        ]
    },
    {
        x: Math.round(WIDTH_GRID / 2),
        y: 0,
        shape: [
            [1, 0, 0],
            [1, 1, 1]
        ]
    },
    {
        x: Math.round(WIDTH_GRID / 2),
        y: 0,
        shape: [
            [0, 0, 1],
            [1, 1, 1]
        ]
    },
    {
        x: Math.round(WIDTH_GRID / 2),
        y: 0,
        shape: [
            [1, 0],
            [1, 1],
            [0, 1],
        ]
    },
    {
        x: Math.round(WIDTH_GRID / 2),
        y: 0,
        shape: [
            [0, 1],
            [1, 1],
            [1, 0],
        ]
    },
    {
        x: Math.round(WIDTH_GRID / 2),
        y: 0,
        shape: [
            [1],
            [1],
            [1],
            [1],
        ]
    },
    {
        x: Math.round(WIDTH_GRID / 2),
        y: 0,
        shape: [
            [1, 1],
            [1, 0],
            [1, 0],
        ]
    },
    {
        x: Math.round(WIDTH_GRID / 2),
        y: 0,
        shape: [
            [1, 0],
            [1, 1],
            [1, 0],
        ]
    }
]

var currentShape = null

function drawGrid() {
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;

    for (let i = 0; i < WIDTH_GRID * SIZE_GRID; i = i + SIZE_GRID) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, HEIGHT_GRID * SIZE_GRID);
        ctx.stroke();
    }

    for (let i = 0; i < HEIGHT_GRID * SIZE_GRID; i = i + SIZE_GRID) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(WIDTH_GRID * SIZE_GRID, i);
        ctx.stroke();
    }
}

function drawRects() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 1) {
                ctx.fillStyle = "yellow";
            } else {
                ctx.fillStyle = "black";
            }

            ctx.beginPath();
            ctx.rect(j * SIZE_GRID, i * SIZE_GRID, SIZE_GRID, SIZE_GRID);
            ctx.fill();
            ctx.stroke();
        }
    }
}

function drawPiece(piece) {
    ctx.fillStyle = "red";

    for (let i = 0; i < piece.shape.length; i++) {
        for (let j = 0; j < piece.shape[i].length; j++) {
            if (piece.shape[i][j] === 0) {
                continue
            }

            ctx.beginPath();
            ctx.rect((piece.x + j) * SIZE_GRID, (piece.y + i) * SIZE_GRID, SIZE_GRID, SIZE_GRID);
            ctx.fill();
            ctx.stroke();
        }

    }
}

function initGrid() {
    for (let i = 0; i < HEIGHT_GRID; i++) {
        const row = new Array(WIDTH_GRID).fill(0);
        grid.push(row);
    }
}

function checkCollition() {
    for (let y = 0; y < currentShape.shape.length; y++) {
        for (let x = 0; x < currentShape.shape[y].length; x++) {
            const element = currentShape.shape[y][x];
            if (currentShape.shape[y][x] === 1 && (grid[currentShape.y + y] === undefined || grid[currentShape.y + y][currentShape.x + x] === undefined || grid[currentShape.y + y][currentShape.x + x] === 1)) {
                return true
            }

        }

    }

    return false
}

function solidity() {
    let posX = currentShape.x
    let posY = currentShape.y

    for (let i = 0; i < currentShape.shape.length; i++) {
        for (let j = 0; j < currentShape.shape[i].length; j++) {
            if (currentShape.shape[i][j] === 1) {
                grid[posY + i][posX + j] = 1
            }
        }

    }
}

function getRandomNumber(x) {
    const randomNumber = Math.random();
    const randomValue = Math.floor(randomNumber * x);

    return randomValue;
}

function deleteCompleted() {
    for (let y = 0; y < grid.length; y++) {
        let allFill = true;
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 1) {
                continue
            }

            allFill = false;
            break
        }

        if (allFill) {
            grid.splice(y, 1);
            grid.unshift(new Array(WIDTH_GRID).fill(0))
            score += WIDTH_GRID;
            scoreUI.textContent = score;
        }
    }
}

function update() {
    if (currentShape === null) {
        currentShape = { ...pieces[getRandomNumber(pieces.length)] }
    } else {
        currentShape.y++
        if (checkCollition()) {
            currentShape.y--
            solidity()
            currentShape = { ...pieces[getRandomNumber(pieces.length)] }
            deleteCompleted();
        }
    }

    if (checkCollition()) {
        alert("Game over");
        grid = [];
        score = 0;
        scoreUI.textContent = score;
        initGrid();
    }

    drawRects()
    drawGrid()
    drawPiece(currentShape)

    const time = 500 - score
    if (time < 150) {
        time = 150
    }

    requestAnimationFrame(() => {
        setTimeout(() => {
            update()
        }, time);
    });
}

initGrid()
drawRects()
drawGrid()
update()

function rotate(piece) {
    let shape = piece.shape
    let rotateShape = new Array(shape[0].length)

    for (let y = 0; y < shape.length; y++) {
        for (let x = shape[y].length - 1; x > -1; x--) {
            if (rotateShape[shape[y].length - 1 - x] === undefined) {
                rotateShape[shape[y].length - 1 - x] = []
            }

            rotateShape[shape[y].length - 1 - x].push(shape[y][x])
        }
    }

    return rotateShape
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        currentShape.x--
        if (checkCollition()) {
            currentShape.x++
        } else {
            drawRects()
            drawGrid()
            drawPiece(currentShape)
        }
    } else if (event.key === 'ArrowUp') {
        let shapeWithoutRotation = currentShape.shape
        currentShape.shape = rotate(currentShape)
        if (checkCollition()) {
            currentShape.shape = shapeWithoutRotation
        } else {
            drawRects()
            drawGrid()
            drawPiece(currentShape)
        }
    } else if (event.key === 'ArrowRight') {
        currentShape.x++
        if (checkCollition()) {
            currentShape.x--
        } else {
            drawRects()
            drawGrid()
            drawPiece(currentShape)
        }
    } else if (event.key === 'ArrowDown') {
        currentShape.y++
        if (checkCollition()) {
            currentShape.y--
        } else {
            drawRects()
            drawGrid()
            drawPiece(currentShape)
        }
    } else if (event.key === ' ') {
        for (let y = currentShape.y; y < grid.length; y++) {
            currentShape.y++
            if (checkCollition()) {
                currentShape.y--
            }
        }

        drawRects()
        drawGrid()
        drawPiece(currentShape)
    }
});
