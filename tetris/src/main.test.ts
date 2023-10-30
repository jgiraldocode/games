import { setGameStatus, update } from '@/logic/logic.ts';
import { init } from '@/main.ts';
import { GameStatus } from './shared/types';

const canvas = document.createElement('canvas') as HTMLCanvasElement;
Object.defineProperty(HTMLCanvasElement.prototype, 'clientHeight', { configurable: true, value: 1000 });
Object.defineProperty(HTMLCanvasElement.prototype, 'clientWidth', { configurable: true, value: 500 });

const scoreElement = document.createElement('span') as HTMLSpanElement;
init(
	canvas,
	scoreElement
);

describe('listen core events', () => {
	test('update', async() => {
		update();
		const ctx = canvas?.getContext('2d');

		const event = new Event('update');
		await window.dispatchEvent(event);

		expect(ctx?.clearRect).toBeCalled();
		expect(ctx?.beginPath).toBeCalled();
		expect(ctx?.moveTo).toBeCalled();
		expect(ctx?.lineTo).toBeCalled();
		expect(ctx?.stroke).toBeCalled();
	});

	test('change_score', async() => {
		scoreElement.textContent = 'dummy';

		const event = new Event('change_score');
		await window.dispatchEvent(event);

		expect(scoreElement.textContent).toBe('0');
	});

	test('game_over', async() => {
		const alertFn = jest.fn();

		window.alert = alertFn;

		const event = new Event('game_over');
		await window.dispatchEvent(event);

		expect(alertFn).toBeCalledTimes(1);
	});
});

describe('Catch the user interactions', () => {
	beforeEach(()=>{
		init(
			canvas,
			scoreElement
		);
	});


	test('press any key when game is pause', () => {
		update();
		setGameStatus(GameStatus.Pause);

		const eventSpy = jest.spyOn(window, 'dispatchEvent');

		const event = new KeyboardEvent('keydown', {'key': 'ArrowUp'});
		document.dispatchEvent(event);

		expect(eventSpy).toBeCalledTimes(0);

		eventSpy.mockRestore();
		setGameStatus(GameStatus.Running);
	});

	test('press key arrow up', () => {
		init(canvas, scoreElement);
		update();
		setGameStatus(GameStatus.Running);
		const eventSpy = jest.spyOn(window, 'dispatchEvent');

		const event = new KeyboardEvent('keydown', {'key': 'ArrowUp'});
		document.dispatchEvent(event);

		expect(eventSpy).toBeCalledWith(new Event('update'));

		eventSpy.mockRestore();
	});

	test('press key arrow down', () => {
		update();
		setGameStatus(GameStatus.Running);
		const eventSpy = jest.spyOn(window, 'dispatchEvent');

		const event = new KeyboardEvent('keydown', {'key': 'ArrowDown'});
		document.dispatchEvent(event);

		expect(eventSpy).toBeCalledWith(new Event('update'));

		eventSpy.mockRestore();
	});

	test('press key arrow left', () => {
		update();
		setGameStatus(GameStatus.Running);
		const eventSpy = jest.spyOn(window, 'dispatchEvent');

		const event = new KeyboardEvent('keydown', {'key': 'ArrowLeft'});
		document.dispatchEvent(event);

		expect(eventSpy).toBeCalledWith(new Event('update'));

		eventSpy.mockRestore();
	});

	test('press key arrow right', () => {
		update();
		setGameStatus(GameStatus.Running);
		const eventSpy = jest.spyOn(window, 'dispatchEvent');

		const event = new KeyboardEvent('keydown', {'key': 'ArrowRight'});
		document.dispatchEvent(event);

		expect(eventSpy).toBeCalledWith(new Event('update'));

		eventSpy.mockRestore();
	});

	test('press key space', () => {
		update();
		setGameStatus(GameStatus.Running);
		const eventSpy = jest.spyOn(window, 'dispatchEvent');

		const event = new KeyboardEvent('keydown', {'key': ' '});
		document.dispatchEvent(event);

		expect(eventSpy).toBeCalledWith(new Event('update'));

		eventSpy.mockRestore();
	});
});
