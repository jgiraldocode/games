import { Shape } from '@/shared/types.ts';

export const SIZE_GRID = 50;
export const HEIGHT_GRID = 1000 / SIZE_GRID;
export const WIDTH_GRID = 500 / SIZE_GRID;
export const SHAPE_COLOR = '#ff0000';
export const SOLID_COLOR = '#ffff00';

export const Pieces = [
	{
		x: 0,
		y: 0,
		shape: [
			[1, 1],
			[1, 1]
		]
	},
	{
		x: 0,
		y: 0,
		shape: [
			[1, 0, 0],
			[1, 1, 1]
		]
	},
	{
		x: 0,
		y: 0,
		shape: [
			[0, 0, 1],
			[1, 1, 1]
		]
	},
	{
		x: 0,
		y: 0,
		shape: [
			[1, 0],
			[1, 1],
			[0, 1],
		]
	},
	{
		x: 0,
		y: 0,
		shape: [
			[0, 1],
			[1, 1],
			[1, 0],
		]
	},
	{
		x: 0,
		y: 0,
		shape: [
			[1],
			[1],
			[1],
			[1],
		]
	},
	{
		x: 0,
		y: 0,
		shape: [
			[1, 1],
			[1, 0],
			[1, 0],
		]
	},
	{
		x: 0,
		y: 0,
		shape: [
			[1, 0],
			[1, 1],
			[1, 0],
		]
	}
] as Array<Shape>;