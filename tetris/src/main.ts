import './style.css';
import { setup, update, getVelocity, moveLeft, rotateShape, moveRight, moveDown, downFast, grid, currentShape, score, gameStatus, setGameStatus, shadowShape } from '@/logic/logic.ts';
import {WIDTH_GRID, SIZE_GRID, HEIGHT_GRID} from '@/shared/const.ts';
import { updateText, updateUI } from './ui/render';
import { GameStatus } from './shared/types';

let canvas: HTMLCanvasElement | null =  null;
let scoreUI: HTMLSpanElement | null = null;
let ctx:CanvasRenderingContext2D|null  =  null;
let enableSound: boolean = true;
let timeOut:NodeJS.Timeout|null = null;

const btnControlGame: HTMLButtonElement = document.getElementById('btnControlGame') as HTMLButtonElement ;
const btnSound: HTMLButtonElement = document.getElementById('btnSound') as HTMLButtonElement ;
const soundStatus: HTMLSpanElement = document.getElementById('soundStatus') as HTMLButtonElement ;
const audio:HTMLAudioElement = document.getElementById('soundPlayer') as HTMLAudioElement;

function mainLoop() {
	requestAnimationFrame(() => {
		if (timeOut !== null){
			clearTimeout(timeOut);
		}

		timeOut = setTimeout(() => {
			if (gameStatus !== GameStatus.Running) {
				return;
			}

			mainLoop();
			update();
		}, getVelocity());
	});
}

function switchSound(){
	if (!enableSound){
		audio.play();
		updateText(soundStatus, 'off');
		enableSound = true;
		return;
	}

	audio?.pause();
	updateText(soundStatus, 'on');
	enableSound = false;
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

function run(){
	btnControlGame.blur();
	setGameStatus(GameStatus.Running);
	updateText(btnControlGame, 'Pausar');
	if (enableSound) audio?.play();
}

function pause(){
	btnControlGame.blur();
	setGameStatus(GameStatus.Pause);
	updateText(btnControlGame, 'Continuar');
	if (enableSound) audio?.pause();
}

btnControlGame?.addEventListener('click', ()=>{
	switch (gameStatus){
	case GameStatus.NotStarted:
		init(
					document.getElementById('canvas') as HTMLCanvasElement,
					document.getElementById('score') as HTMLSpanElement
		);
		run();

		break;
	case GameStatus.Pause:
		run();
		mainLoop();
		break;

	case GameStatus.Running:
		pause();
		break;
	}
});

btnSound?.addEventListener('click', ()=>{
	switchSound();
	btnSound.blur();
});

window.addEventListener('update', () => {
	updateUI(ctx as CanvasRenderingContext2D, grid, currentShape, shadowShape);
});

window.addEventListener('change_score', () => {
	if (scoreUI === null){
		return;
	}

	updateText(scoreUI, score.toString());
});

window.addEventListener('game_over', () => {
	if (enableSound) audio?.pause();
	alert('Game over');

	if (enableSound) audio?.play();
	setup();
});

document.addEventListener('keydown', function(event) {
	if (gameStatus !== GameStatus.Running){
		return;
	}

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
