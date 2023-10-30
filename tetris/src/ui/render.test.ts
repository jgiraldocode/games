import { Shape } from '@/shared/types';
import { updateText, updateUI } from './render';

describe('draw functions', () => {
	test('updateText', () => {
		const textElement = document.createElement('span');
		textElement.textContent = 'dummy';

		updateText(textElement, 'test');

		expect(textElement.textContent).toBe('test');
	});

	test('updateUI', () => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		const grid = [
			['', '', '', ''],
			['#ff', '', '', '']
		];
		const shape:Shape = {
			x : 0,
			y:0,
			color: '#fff',
			shape: [
				[0, 1, 1],
				[1, 1, 0]
			]
		};

		updateUI(ctx, grid, shape, null);

		expect(ctx?.clearRect).toBeCalled();
		expect(ctx?.beginPath).toBeCalled();
		expect(ctx?.moveTo).toBeCalled();
		expect(ctx?.lineTo).toBeCalled();
		expect(ctx?.stroke).toBeCalled();
	});

	test('updateUI without shape', () => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		const grid = [
			['', '', '', ''],
			['', '', '', '']
		];
		const shape = null;

		updateUI(ctx, grid, shape, null);

		expect(ctx?.rect).toBeCalledTimes(0);
		expect(ctx?.clearRect).toBeCalled();
		expect(ctx?.beginPath).toBeCalled();
		expect(ctx?.moveTo).toBeCalled();
		expect(ctx?.lineTo).toBeCalled();
		expect(ctx?.stroke).toBeCalled();
	});
});