import { HEIGHT_GRID, SHAPE_COLOR, SIZE_GRID, WIDTH_GRID, setup, update } from './logic.ts';

let canvas = document.createElement('canvas') as HTMLCanvasElement;
let scoreElement = document.createElement('span') as HTMLSpanElement;
let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

beforeEach(() => {
	canvas = document.createElement('canvas') as HTMLCanvasElement;
	ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
	scoreElement = document.createElement('span') as HTMLSpanElement;
});

describe('Catch the user interactions', () => {
	setup(ctx, canvas);
	update(ctx, scoreElement);

	test('press key arrow up', () => {
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

		update(ctx, scoreElement);

		//draw two shapes
		expect(ctx.rect).toBeCalledTimes(8);

	});
});

describe('Validate the game events', () => {
	test('Start game', () => {
		setup(ctx, canvas);

		const width = WIDTH_GRID * SIZE_GRID;
		const height = HEIGHT_GRID * SIZE_GRID;

		expect(canvas.width).toBe(width);
		expect(canvas.height).toBe(height);

		// validate that draw grid
		expect(ctx.lineTo).toBeCalledTimes((width / SIZE_GRID) + (height / SIZE_GRID));
		// don't draw any rec
		expect(ctx.rect).toBeCalledTimes(0);
	});

	test('load shape', () => {
		update(ctx, scoreElement);

		//draw shape rec
		expect(ctx.rect).toBeCalled();
		expect(ctx.fillStyle).toBe(SHAPE_COLOR);
	});

	test('Game over', () => {
		// TODO: resarch how improve code to support this test
	});

	test('Increase score', () => {
		// TODO: resarch how improve code to support this test
	});


	test('Restart Game', () => {
		// TODO: resarch how improve code to support this test
	});
});