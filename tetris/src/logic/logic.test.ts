import { currentShape, downFast, grid, score, setup, update } from './logic.ts';
import {HEIGHT_GRID, WIDTH_GRID} from '@/shared/const.ts';

describe('Validate the game events', () => {
	test('Game over', () => {
		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				grid[y][x] = 1;
			}
		}

		const gameOverEvent = jest.fn();
		window.dispatchEvent = gameOverEvent;

		expect(gameOverEvent).toBeCalledTimes(0);

		update();

		expect(gameOverEvent).toBeCalledTimes(1);
		expect((gameOverEvent.mock.calls[0][0] as Event).type).toBe('game_over');
	});

	test('Start game', () => {
		const updateEvent = jest.fn();
		window.dispatchEvent = updateEvent;

		expect(updateEvent).toBeCalledTimes(0);

		setup();

		expect(grid.length).toBe(HEIGHT_GRID);
		expect(grid[0].length).toBe(WIDTH_GRID);
		expect(score).toBe(0);
		expect(updateEvent).toBeCalledTimes(2);
		expect((updateEvent.mock.calls[0][0] as Event).type).toBe('update');
		expect((updateEvent.mock.calls[1][0] as Event).type).toBe('change_score');

		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				expect(grid[y][x]).toBe(0);
			}

		}
	});

	test('load shape', () => {
		setup();
		expect(currentShape).toBeNull();
		update();

		expect(currentShape === null).toBeFalsy();
		expect(currentShape).toBeInstanceOf(Object);
		expect(currentShape?.y).toBe(0);
		expect(currentShape?.x).toBeGreaterThan(0);
	});



	test('Increase score', () => {
		setup();
		update();

		for (let x = 0; x < grid[0].length; x++) {
			grid[grid.length - 1][x] = 1;
		}

		const changeScoreEvent = jest.fn();
		window.dispatchEvent = changeScoreEvent;

		downFast();
		update();

		expect(score).toBe(grid[0].length);
		expect((changeScoreEvent.mock.calls[1][0] as Event).type).toBe('change_score');
	});


	test('Restart Game', () => {
		const updateEvent = jest.fn();
		window.dispatchEvent = updateEvent;

		expect(updateEvent).toBeCalledTimes(0);

		setup();

		expect(grid.length).toBe(HEIGHT_GRID);
		expect(grid[0].length).toBe(WIDTH_GRID);
		expect(score).toBe(0);
		expect(updateEvent).toBeCalledTimes(2);
		expect((updateEvent.mock.calls[0][0] as Event).type).toBe('update');
		expect((updateEvent.mock.calls[1][0] as Event).type).toBe('change_score');

		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				expect(grid[y][x]).toBe(0);
			}

		}
	});
});