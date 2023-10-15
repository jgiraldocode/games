export const SIZE_GRID = 50;
export const HEIGHT_GRID = 1000 / SIZE_GRID;
export const WIDTH_GRID = 500 / SIZE_GRID;
export const SHAPE_COLOR = '#ff0000';
export const SOLID_COLOR = '#ffff00';

const MAX_VELOCITY = 500;
const MIN_VELOCITY = 150;


let grid: Array<Array<number>> = [];
let score: number = 0;
const pieces = [
	{
		x: 0,
		y: 0,
		shape: [
			[1, 1],
			[1, 1]
		]
	},
	{
		x: 0,
		y: 0,
		shape: [
			[1, 0, 0],
			[1, 1, 1]
		]
	},
	{
		x: 0,
		y: 0,
		shape: [
			[0, 0, 1],
			[1, 1, 1]
		]
	},
	{
		x: 0,
		y: 0,
		shape: [
			[1, 0],
			[1, 1],
			[0, 1],
		]
	},
	{
		x: 0,
		y: 0,
		shape: [
			[0, 1],
			[1, 1],
			[1, 0],
		]
	},
	{
		x: 0,
		y: 0,
		shape: [
			[1],
			[1],
			[1],
			[1],
		]
	},
	{
		x: 0,
		y: 0,
		shape: [
			[1, 1],
			[1, 0],
			[1, 0],
		]
	},
	{
		x: 0,
		y: 0,
		shape: [
			[1, 0],
			[1, 1],
			[1, 0],
		]
	}
] as Array<Shape>;

interface Shape {
    x: number;
    y: number;
    shape: Array<Array<number>>;

}

let currentShape: Shape | null = null;

export function getVelocity(): number {
	return (MAX_VELOCITY - score < MIN_VELOCITY) ? MIN_VELOCITY : MAX_VELOCITY - score;
}

function drawGrid(ctx: CanvasRenderingContext2D) {
	if (ctx === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found context');
	}

	ctx.strokeStyle = 'grey';
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

function drawRects(ctx: CanvasRenderingContext2D) {
	if (ctx === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found context');
	}

	ctx.clearRect(0, 0, WIDTH_GRID * SIZE_GRID, HEIGHT_GRID * SIZE_GRID);

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === 0) {
				continue;
			}

			ctx.fillStyle = SOLID_COLOR;
			ctx.beginPath();
			ctx.rect(j * SIZE_GRID, i * SIZE_GRID, SIZE_GRID, SIZE_GRID);
			ctx.fill();
			ctx.stroke();
		}
	}
}

function drawPiece(ctx: CanvasRenderingContext2D, piece: Shape | null) {
	if (ctx === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found context');
	}

	if (piece === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found piece');
	}

	ctx.fillStyle = SHAPE_COLOR;

	for (let i = 0; i < piece.shape.length; i++) {
		for (let j = 0; j < piece.shape[i].length; j++) {
			if (piece.shape[i][j] === 0) {
				continue;
			}

			ctx.beginPath();
			ctx.rect((piece.x + j) * SIZE_GRID, (piece.y + i) * SIZE_GRID, SIZE_GRID, SIZE_GRID);
			ctx.fill();
			ctx.stroke();
		}

	}
}

function initGrid() {
	grid = [];

	for (let i = 0; i < HEIGHT_GRID; i++) {
		const row = new Array(WIDTH_GRID).fill(0);
		grid.push(row);
	}
}

function checkCollition() {
	if (currentShape === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found currentShape');
	}

	for (let y = 0; y < currentShape.shape.length; y++) {
		for (let x = 0; x < currentShape.shape[y].length; x++) {
			if (currentShape.shape[y][x] === 1 && (grid[currentShape.y + y] === undefined || grid[currentShape.y + y][currentShape.x + x] === undefined || grid[currentShape.y + y][currentShape.x + x] === 1)) {
				return true;
			}

		}

	}

	return false;
}

function solidity() {
	if (currentShape === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found currentShape');
	}

	const posX = currentShape.x;
	const posY = currentShape.y;

	for (let i = 0; i < currentShape.shape.length; i++) {
		for (let j = 0; j < currentShape.shape[i].length; j++) {
			if (currentShape.shape[i][j] === 1) {
				grid[posY + i][posX + j] = 1;
			}
		}

	}
}

function getRandomnumber(x: number) {
	const randomnumber = Math.random();
	const randomValue = Math.floor(randomnumber * x);

	return randomValue;
}

function deleteCompleted(scoreUI: HTMLSpanElement) {
	for (let y = 0; y < grid.length; y++) {
		let allRowFill = true;
		for (let x = 0; x < grid[y].length; x++) {
			if (grid[y][x] === 1) {
				continue;
			}

			allRowFill = false;

			break;
		}

		if (!allRowFill) {
			continue;

		}

		grid.splice(y, 1);
		grid.unshift(new Array(WIDTH_GRID).fill(0));
		score += WIDTH_GRID;
		if (scoreUI === null) {
			// TODO: add error types and report to logs service
			throw new Error('Not found scoreUI');
		}

		scoreUI.textContent = score.toString();
	}
}

export function update(ctx: CanvasRenderingContext2D, scoreUI: HTMLSpanElement) {
	if (currentShape === null) {
		currentShape = { ...pieces[getRandomnumber(pieces.length)] };
		currentShape.x = Math.round(WIDTH_GRID / 2);
	} else {
		currentShape.y++;
		if (checkCollition()) {
			currentShape.y--;
			solidity();
			currentShape = { ...pieces[getRandomnumber(pieces.length)] };
			currentShape.x = Math.round(WIDTH_GRID / 2);
			deleteCompleted(scoreUI);
		}
	}

	if (checkCollition()) {
		alert('Game over');

		grid = [];
		score = 0;
		if (scoreUI === null) {
			// TODO: add error types and report to logs service
			throw new Error('Not found scoreUI');
		}
		scoreUI.textContent = score.toString();
		initGrid();
	}

	updateUI(ctx);
}

export function updateUI(ctx: CanvasRenderingContext2D) {
	drawRects(ctx);
	drawPiece(ctx, currentShape);
	drawGrid(ctx);
}

function rotate(piece: Shape) {
	const shape = piece.shape;
	const rotateShape = new Array(shape[0].length);

	for (let y = 0; y < shape.length; y++) {
		for (let x = shape[y].length - 1; x > -1; x--) {
			if (rotateShape[shape[y].length - 1 - x] === undefined) {
				rotateShape[shape[y].length - 1 - x] = [];
			}

			rotateShape[shape[y].length - 1 - x].push(shape[y][x]);
		}
	}

	return rotateShape;
}

document.addEventListener('keydown', function (event) {
	if (currentShape === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found scoreUI');
	}

	if (event.key === 'ArrowLeft') {
		currentShape.x--;
		if (checkCollition()) {
			currentShape.x++;
		} else {
			window.dispatchEvent(new Event('update'));
		}
	} else if (event.key === 'ArrowUp') {
		const shapeWithoutRotation = currentShape.shape;
		currentShape.shape = rotate(currentShape);
		if (checkCollition()) {
			currentShape.shape = shapeWithoutRotation;
		} else {
			window.dispatchEvent(new Event('update'));
		}
	} else if (event.key === 'ArrowRight') {
		currentShape.x++;
		if (checkCollition()) {
			currentShape.x--;
		} else {
			window.dispatchEvent(new Event('update'));
		}
	} else if (event.key === 'ArrowDown') {
		currentShape.y++;
		if (checkCollition()) {
			currentShape.y--;
		} else {
			window.dispatchEvent(new Event('update'));
		}
	} else if (event.key === ' ') {
		for (let y = currentShape.y; y < grid.length; y++) {
			currentShape.y++;
			if (checkCollition()) {
				currentShape.y--;
			}
		}

		window.dispatchEvent(new Event('update'));
	}
});





export function setup(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
	canvas.width = WIDTH_GRID * SIZE_GRID;
	canvas.height = HEIGHT_GRID * SIZE_GRID;

	initGrid();
	drawRects(ctx);
	drawGrid(ctx);
}