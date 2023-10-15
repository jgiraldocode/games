import { update } from '@/logic/logic.ts';
import { init } from '@/main.ts';

const canvas = document.createElement('canvas') as HTMLCanvasElement;
const scoreElement = document.createElement('span') as HTMLSpanElement;
init(
	canvas,
	scoreElement
);
update();

describe('Catch the user interactions', () => {
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
	});
});