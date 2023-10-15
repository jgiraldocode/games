import { HEIGHT_GRID, SHAPE_COLOR, SIZE_GRID, SOLID_COLOR, WIDTH_GRID } from '@/shared/const';
import { Grid, Shape } from '@/shared/types';

export function updateText(element:HTMLElement, text:string){
	element.textContent = text;
}

export function drawRec(ctx:CanvasRenderingContext2D, fillColor:string, x:number, y:number, w:number, h:number){
	ctx.fillStyle = fillColor;

	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.fill();
	ctx.stroke();
}

export function drawLine(ctx:CanvasRenderingContext2D, color: string, x1:number, y1:number, x2:number, y2:number){
	ctx.strokeStyle = color;
	ctx.lineWidth = 1;

	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

export function updateUI(ctx: CanvasRenderingContext2D, grid:Grid, shape:Shape|null) {
	if (ctx === null) {
		// TODO: add error types and report to logs service
		throw new Error('Not found context');
	}

	drawRects(ctx, grid);
	drawShape(ctx, shape);
	drawGrid(ctx);
}


function drawGrid(ctx: CanvasRenderingContext2D) {
	for (let x = 0; x < WIDTH_GRID * SIZE_GRID; x = x + SIZE_GRID) {
		drawLine(ctx, 'grey', x, 0, x, HEIGHT_GRID * SIZE_GRID);
	}

	for (let y = 0; y < HEIGHT_GRID * SIZE_GRID; y = y + SIZE_GRID) {
		drawLine(ctx, 'grey', 0, y, HEIGHT_GRID * SIZE_GRID, y);
	}
}

function drawRects(ctx: CanvasRenderingContext2D, grid:Grid) {
	ctx.clearRect(0, 0, WIDTH_GRID * SIZE_GRID, HEIGHT_GRID * SIZE_GRID);

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === 0) {
				continue;
			}

			drawRec(ctx, SOLID_COLOR, j * SIZE_GRID, i * SIZE_GRID, SIZE_GRID, SIZE_GRID);
		}
	}
}

function drawShape(ctx: CanvasRenderingContext2D, shape: Shape | null) {
	if (shape === null) {
		return;
	}

	for (let i = 0; i < shape.shape.length; i++) {
		for (let j = 0; j < shape.shape[i].length; j++) {
			if (shape.shape[i][j] === 0) {
				continue;
			}

			drawRec(ctx, SHAPE_COLOR, (shape.x + j) * SIZE_GRID, (shape.y + i) * SIZE_GRID, SIZE_GRID, SIZE_GRID);
		}
	}
}