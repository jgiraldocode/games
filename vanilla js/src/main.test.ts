import { update } from '@/logic/logic.ts';
import { init } from '@/main.ts';

const canvas = document.createElement('canvas') as HTMLCanvasElement;
const scoreElement = document.createElement('span') as HTMLSpanElement;
init(
	canvas,
	scoreElement
);

describe('listen core events', () => {
	test('update', async() => {
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

		global.alert = alertFn;

		const event = new Event('game_over');
		await window.dispatchEvent(event);

		expect(alertFn).toBeCalledTimes(1);
	});
});

describe('Catch the user interactions', () => {
	test('press key arrow up', () => {
		update();
		const eventSpy = jest.spyOn(window, 'dispatchEvent');

		const event = new KeyboardEvent('keydown', {'key': 'ArrowUp'});
		document.dispatchEvent(event);

		expect(eventSpy).toBeCalledWith(new Event('update'));

		eventSpy.mockRestore();
	});

	test('press key arrow down', () => {
		const eventSpy = jest.spyOn(window, 'dispatchEvent');

		const event = new KeyboardEvent('keydown', {'key': 'ArrowDown'});
		document.dispatchEvent(event);

		expect(eventSpy).toBeCalledWith(new Event('update'));

		eventSpy.mockRestore();
	});

	test('press key arrow left', () => {
		const eventSpy = jest.spyOn(window, 'dispatchEvent');

		const event = new KeyboardEvent('keydown', {'key': 'ArrowLeft'});
		document.dispatchEvent(event);

		expect(eventSpy).toBeCalledWith(new Event('update'));

		eventSpy.mockRestore();
	});

	test('press key arrow right', () => {
		const eventSpy = jest.spyOn(window, 'dispatchEvent');

		const event = new KeyboardEvent('keydown', {'key': 'ArrowRight'});
		document.dispatchEvent(event);

		expect(eventSpy).toBeCalledWith(new Event('update'));

		eventSpy.mockRestore();
	});

	test('press key space', () => {
		const eventSpy = jest.spyOn(window, 'dispatchEvent');

		const event = new KeyboardEvent('keydown', {'key': ' '});
		document.dispatchEvent(event);

		expect(eventSpy).toBeCalledWith(new Event('update'));

		eventSpy.mockRestore();
	});
});
