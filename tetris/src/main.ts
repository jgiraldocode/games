import './style.css';
import { setup, update, getVelocity, moveLeft, rotateShape, moveRight, moveDown, downFast, grid, currentShape, score } from '@/logic/logic.ts';
import {WIDTH_GRID, SIZE_GRID, HEIGHT_GRID} from '@/shared/const.ts';
import { updateText, updateUI } from './ui/render';

let canvas: HTMLCanvasElement | null =  null;
let scoreUI: HTMLSpanElement | null = null;
let ctx:CanvasRenderingContext2D|null  =  null;

const btnStart: HTMLButtonElement = document.getElementById('btnStart') as HTMLButtonElement ;
const btnSound: HTMLButtonElement = document.getElementById('btnSound') as HTMLButtonElement ;
const soundStatus: HTMLSpanElement = document.getElementById('soundStatus') as HTMLButtonElement ;
const audio:HTMLAudioElement = document.getElementById('soundPlayer') as HTMLAudioElement;

function mainLoop() {
	requestAnimationFrame(() => {
		setTimeout(() => {
			update();
			mainLoop();
		}, getVelocity());
	});
}

function switchSound(){
	if (audio?.paused){
		audio.play();
		updateText(soundStatus, 'off');
		return;
	}

	audio?.pause();
	updateText(soundStatus, 'on');
}

export function init(canvasElement:HTMLCanvasElement, scoreElement:HTMLSpanElement){
	canvas = canvasElement;
	scoreUI = scoreElement;
	ctx = canvas?.getContext('2d');

	canvas.width = WIDTH_GRID * SIZE_GRID;
	canvas.height = HEIGHT_GRID * SIZE_GRID;

	setup();
	mainLoop();
}

btnStart?.addEventListener('click', ()=>{
	init(
		document.getElementById('canvas') as HTMLCanvasElement,
		document.getElementById('score') as HTMLSpanElement
	);

	audio?.play();
	btnStart.disabled = true;
	btnStart.blur();
});

btnSound?.addEventListener('click', ()=>{
	switchSound();
	btnSound.blur();
});

window.addEventListener('update', () => {
	updateUI(ctx as CanvasRenderingContext2D, grid, currentShape);
});

window.addEventListener('change_score', () => {
	if (scoreUI === null){
		return;
	}

	updateText(scoreUI, score.toString());
});

window.addEventListener('game_over', () => {
	audio?.pause();
	alert('Game over');

	audio?.play();
	setup();
});

document.addEventListener('keydown', function(event) {
	try {
		switch (event.key) {
		case 'ArrowLeft':
			moveLeft();
			break;
		case 'ArrowUp':
			rotateShape();
			break;
		case 'ArrowRight':
			moveRight();
			break;
		case 'ArrowDown':
			moveDown();
			break;
		case ' ':
			downFast();
			break;
		}
	} catch (error) {
		console.log(error);
	}
});
