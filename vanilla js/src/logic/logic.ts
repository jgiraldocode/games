import { Grid, Shape } from '@/shared/types.ts';
import { HEIGHT_GRID, Pieces, WIDTH_GRID } from '@/shared/const';

const MAX_VELOCITY = 500;
const MIN_VELOCITY = 150;


export let grid: Grid = [];
export let currentShape: Shape | null = null;
export let score: number = 0;

export function setup() {
	score = 0;
	currentShape = null;

	initGrid();
	window.dispatchEvent(new Event('update'));
}

export function getVelocity(): number {
	return (MAX_VELOCITY - score < MIN_VELOCITY) ? MIN_VELOCITY : MAX_VELOCITY - score;
}

export function update() {
	updateCurrentShape();

	if (checkCollition()) {
		window.dispatchEvent(new Event('game_over'));
		return;
	}

	window.dispatchEvent(new Event('update'));
}

export function rotateShape(){
	if (currentShape === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found scoreUI');
	}

	const shapeWithoutRotation = currentShape.shape;
	currentShape.shape = rotate(currentShape);
	if (!checkCollition()) {
		window.dispatchEvent(new Event('update'));
		return;
	}

	currentShape.shape = shapeWithoutRotation;
}

export function moveRight(){
	if (currentShape === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found scoreUI');
	}

	currentShape.x++;
	if (!checkCollition()) {
		window.dispatchEvent(new Event('update'));
		return;
	}

	currentShape.x--;
}

export function moveLeft(){
	if (currentShape === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found scoreUI');
	}
	currentShape.x--;
	if (!checkCollition()) {
		window.dispatchEvent(new Event('update'));
		return;

	}

	currentShape.x++;
}

export function moveDown(){
	if (currentShape === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found scoreUI');
	}

	currentShape.y++;
	if (!checkCollition()) {
		window.dispatchEvent(new Event('update'));
		return;
	}

	currentShape.y--;
}

export function downFast(){
	if (currentShape === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found scoreUI');
	}

	for (let y = currentShape.y; y < grid.length; y++) {
		currentShape.y++;
		if (checkCollition()) {
			currentShape.y--;
			break;
		}
	}

	window.dispatchEvent(new Event('update'));
}

function initGrid() {
	grid = [];

	for (let i = 0; i < HEIGHT_GRID; i++) {
		const row = new Array(WIDTH_GRID).fill(0);
		grid.push(row);
	}
}

function isFreeSpace(grid:Grid, shape:Shape, x:number, y:number){
	if (grid[shape.y + y] === undefined || grid[shape.y + y][shape.x + x] === undefined){
		return false;
	}

	return  grid[shape.y + y][shape.x + x] === 0;
}

function checkCollition() {
	if (currentShape === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found currentShape');
	}

	for (let y = 0; y < currentShape.shape.length; y++) {
		for (let x = 0; x < currentShape.shape[y].length; x++) {
			if (currentShape.shape[y][x] === 1 && !isFreeSpace(grid, currentShape, x, y)) {
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

	for (let y = 0; y < currentShape.shape.length; y++) {
		for (let x = 0; x < currentShape.shape[y].length; x++) {
			if (currentShape.shape[y][x] === 1) {
				grid[posY + y][posX + x] = 1;
			}
		}

	}
}

function getRandomnumber(x: number) {
	const randomnumber = Math.random();
	const randomValue = Math.floor(randomnumber * x);

	return randomValue;
}

function removeRowCompleteAndIncreaseScore(y:number){
	score += WIDTH_GRID;

	grid.splice(y, 1);
	grid.unshift(new Array(WIDTH_GRID).fill(0));

	window.dispatchEvent(new Event('change_score'));
}

function reviewCompletedRows() {
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

		removeRowCompleteAndIncreaseScore(y);
	}
}

function getRandomShape():Shape{
	const shape = { ...Pieces[getRandomnumber(Pieces.length)] };
	shape.x = Math.round(WIDTH_GRID / 2);

	return shape;
}

function  updateCurrentShape(){
	if (currentShape === null) {
		currentShape = getRandomShape();
		return;
	}

	currentShape.y++;
	if (!checkCollition()) {
		return;
	}

	currentShape.y--;
	solidity();
	currentShape = getRandomShape();
	reviewCompletedRows();
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