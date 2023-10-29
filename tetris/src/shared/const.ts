import { Shape } from '@/shared/types.ts';
export const SHAPE_COLORS = ['#33A1FD', '#FFD700', '#B57EDC', '#00E64D', '#FF6B6B', '#87CEEB', '#FFA500', '#B0B0B0'];

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