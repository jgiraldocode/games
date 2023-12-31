import { GameStatus, Grid, Shape } from '@/shared/types.ts';
import { Pieces, SHAPE_COLORS } from '@/shared/const';
import { maxHeight, maxWidth, sizeCube } from '@/main';

const MAX_VELOCITY = 500;
const MIN_VELOCITY = 150;


export let grid: Grid = [];
export let currentShape: Shape | null = null;
export let shadowShape: Shape | null = null;
export let score: number = 0;
export let gameStatus: GameStatus = GameStatus.NotStarted;

export function setup() {
	score = 0;
	currentShape = null;
	gameStatus = GameStatus.Running;

	initGrid();
	window.dispatchEvent(new Event('update'));
	window.dispatchEvent(new Event('change_score'));
}

export function setGameStatus(_gameStatus: GameStatus){
	gameStatus = _gameStatus;
}

export function getVelocity(): number {
	return (MAX_VELOCITY - score < MIN_VELOCITY) ? MIN_VELOCITY : MAX_VELOCITY - score;
}

export function update() {
	updateCurrentShape();

	if (checkCollition(currentShape)) {
		window.dispatchEvent(new Event('game_over'));
		return;
	}

	window.dispatchEvent(new Event('update'));
}

function calculateShadow(shape:Shape){
	shadowShape = {...shape};
	shadowShape.color = '#ffffff61';

	for (let y = shadowShape.y; y < grid.length; y++) {
		shadowShape.y = y;
		if (checkCollition(shadowShape)) {
			shadowShape.y--;
			break;
		}
	}
}

export function rotateShape(){
	if (currentShape === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found currentShape');
	}

	const shapeWithRotation = {...currentShape};
	shapeWithRotation.shape = rotate(shapeWithRotation);
	if (!checkCollition(shapeWithRotation)) {
		currentShape = shapeWithRotation;
		calculateShadow(currentShape);
		window.dispatchEvent(new Event('update'));
		return;
	}

	for (let x = currentShape.x; x > currentShape.x - 4;x--){
		shapeWithRotation.x = x;
		if (checkCollition(shapeWithRotation)) {
			continue;
		}

		currentShape = shapeWithRotation;
		calculateShadow(currentShape);
		window.dispatchEvent(new Event('update'));
		return;
	}
}

export function moveRight(){
	if (currentShape === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found currentShape');
	}

	currentShape.x++;
	if (!checkCollition(currentShape)) {
		calculateShadow(currentShape);
		window.dispatchEvent(new Event('update'));
		return;
	}

	currentShape.x--;
}

export function moveLeft(){
	if (currentShape === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found currentShape');
	}

	currentShape.x--;
	if (!checkCollition(currentShape)) {
		calculateShadow(currentShape);
		window.dispatchEvent(new Event('update'));
		return;

	}

	currentShape.x++;
}

export function moveDown(){
	if (currentShape === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found currentShape');
	}

	currentShape.y++;
	if (!checkCollition(currentShape)) {
		window.dispatchEvent(new Event('update'));
		return;
	}

	currentShape.y--;
}

export function downFast(){
	if (currentShape === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found currentShape');
	}

	for (let y = currentShape.y; y < grid.length; y++) {
		currentShape.y++;
		if (checkCollition(currentShape)) {
			currentShape.y--;
			break;
		}
	}

	window.dispatchEvent(new Event('update'));
}

function initGrid() {
	grid = [];

	for (let i = 0; i < maxHeight / sizeCube; i++) {
		const row = new Array(maxWidth / sizeCube).fill('');
		grid.push(row);
	}
}

function isFreeSpace(grid:Grid, shape:Shape, x:number, y:number){
	if (grid[shape.y + y] === undefined || grid[shape.y + y][shape.x + x] === undefined){
		return false;
	}

	return  grid[shape.y + y][shape.x + x] === '';
}

function checkCollition(shape:Shape|null) {
	if (shape === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found shape');
	}

	for (let y = 0; y < shape.shape.length; y++) {
		for (let x = 0; x < shape.shape[y].length; x++) {
			if (shape.shape[y][x] === 1 && !isFreeSpace(grid, shape, x, y)) {
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
				grid[posY + y][posX + x] = currentShape.color;
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
	score += maxWidth / sizeCube;

	grid.splice(y, 1);
	grid.unshift(new Array(maxWidth / sizeCube).fill(''));

	window.dispatchEvent(new Event('change_score'));
}

function reviewCompletedRows() {
	for (let y = 0; y < grid.length; y++) {
		let allRowFill = true;
		for (let x = 0; x < grid[y].length; x++) {
			if (grid[y][x] !== '') {
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
	const shape:Shape = { ...Pieces[getRandomnumber(Pieces.length)] };
	const color:string = SHAPE_COLORS[getRandomnumber(SHAPE_COLORS.length)];

	shape.x = Math.round(maxWidth / sizeCube / 2);
	shape.color = color;

	return shape;
}

function  updateCurrentShape(){
	if (currentShape === null) {
		currentShape = getRandomShape();
		calculateShadow(currentShape);
		return;
	}

	currentShape.y++;
	if (!checkCollition(currentShape)) {
		return;
	}

	currentShape.y--;
	solidity();
	reviewCompletedRows();
	currentShape = getRandomShape();
	calculateShadow(currentShape);
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