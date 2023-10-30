import './style.css';
import { setup, update, getVelocity, moveLeft, rotateShape, moveRight, moveDown, downFast, grid, currentShape, score, gameStatus, setGameStatus, shadowShape } from '@/logic/logic.ts';
import { updateText, updateUI } from './ui/render';
import { GameStatus } from './shared/types';

let canvas: HTMLCanvasElement | null =  null;
let scoreUI: HTMLSpanElement | null = null;
let ctx:CanvasRenderingContext2D|null  =  null;
let enableSound: boolean = true;
let timeOut:NodeJS.Timeout|null = null;

const btnControlGame: HTMLButtonElement = document.getElementById('btnControlGame') as HTMLButtonElement ;
const btnSound: HTMLButtonElement = document.getElementById('btnSound') as HTMLButtonElement ;
const btnDown: HTMLButtonElement = document.getElementById('btnDown') as HTMLButtonElement ;
const soundStatus: HTMLSpanElement = document.getElementById('soundStatus') as HTMLButtonElement ;
const audio:HTMLAudioElement|null = document.getElementById('soundPlayer') as HTMLAudioElement;
const gameBox:HTMLDivElement = document.getElementById('game') as HTMLDivElement;

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
		audio?.play();
		updateText(soundStatus, 'off');
		enableSound = true;
		return;
	}

	audio?.pause();
	updateText(soundStatus, 'on');
	enableSound = false;
}

export let maxWidth = 500;
export let maxHeight = 1000;
export let sizeCube = 50;

function setupCanvasSize(){
	if (canvas === null) {
		return;
	}

	// setup size
	maxWidth = Math.floor(canvas.clientWidth / 50) * 50;
	maxHeight = Math.floor(canvas.clientHeight / 50) * 50;
	if (maxHeight >= (maxWidth * 2)){
		maxHeight = maxWidth * 2;
	} else {
		maxWidth = maxHeight / 2;
	}


	sizeCube = maxWidth / 10;

	canvas.width = maxWidth;
	canvas.height = maxHeight;

	canvas.style.width = maxWidth + 'px';
	canvas.style.height = maxHeight + 'px';


	canvas?.addEventListener('click', (event)=>{
		event.preventDefault();
		rotateShape();
	});
}

let positionXtouched = 0;
let positionXaftertouched = 0;
let timeoutDebounce:NodeJS.Timeout|null = null;

export function init(canvasElement:HTMLCanvasElement, scoreElement:HTMLSpanElement){
	canvas = canvasElement;
	scoreUI = scoreElement;
	ctx = canvas?.getContext('2d');

	if (audio !== null){
		audio.volume = 0.1;
	}

	setupCanvasSize();

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

btnDown?.addEventListener('click', (event)=>{
	event.preventDefault();
	if (gameStatus !== GameStatus.Running){
		return;
	}

	downFast();
	btnDown.blur();
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
	window.alert('Game over');

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
			event.preventDefault();
			moveLeft();
			break;
		case 'ArrowUp':
			event.preventDefault();
			rotateShape();
			break;
		case 'ArrowRight':
			event.preventDefault();
			moveRight();
			break;
		case 'ArrowDown':
			event.preventDefault();
			moveDown();
			break;
		case ' ':
			event.preventDefault();
			downFast();
			break;
		}
	} catch (error) {
		console.log(error);
	}
});


gameBox?.addEventListener('touchmove', (event)=>{
	if (gameStatus !== GameStatus.Running){
		return;
	}

	event.preventDefault();
	positionXtouched = Math.floor(event.changedTouches[0].clientX / sizeCube) - 1;

	clearTimeout(timeoutDebounce as NodeJS.Timeout);

	timeoutDebounce = setTimeout(()=>{
		if (positionXaftertouched === 0){
			positionXaftertouched = positionXtouched;
			return;
		}

		if (positionXaftertouched === positionXtouched){
			positionXaftertouched = positionXtouched;
			return;
		}

		if (positionXaftertouched === positionXtouched){
			positionXaftertouched = positionXtouched;
			return;
		}

		if (positionXaftertouched >= positionXtouched){
			positionXaftertouched = positionXtouched;
			moveLeft();
			return;
		}

		if (positionXaftertouched < positionXtouched){
			positionXaftertouched = positionXtouched;
			moveRight();
			return;
		}

		positionXaftertouched = positionXtouched;
	}, 1);

});