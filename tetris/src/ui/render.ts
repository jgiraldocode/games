import { maxHeight, maxWidth, sizeCube } from '@/main';
import { Grid, Shape } from '@/shared/types';

export function updateText(element:HTMLElement, text:string){
	element.textContent = text;
}

export function updateUI(ctx: CanvasRenderingContext2D, grid:Grid, shape:Shape|null, shadowShape:Shape|null) {
	drawCubes(ctx, grid);
	drawShape(ctx, shadowShape);
	drawShape(ctx, shape);
	drawGrid(ctx);
}

function drawCube(ctx:CanvasRenderingContext2D, fillColor:string, x:number, y:number, size:number){
	ctx.fillStyle = fillColor;

	ctx.beginPath();

	drawLine(ctx, fillColor, 4, x + (0 * size / 5), y + (1 * size / 5), x + (2 * size / 5), y + (0 * size / 5));
	drawLine(ctx, fillColor, 4, x + (2 * size / 5), y + (0 * size / 5), x + (0 * size / 5), y + (2 * size / 5));
	drawLine(ctx, fillColor, 4, x + (0 * size / 5), y + (2 * size / 5), x + (4 * size / 5), y + (0 * size / 5));
	drawLine(ctx, fillColor, 4, x + (4 * size / 5), y + (0 * size / 5), x + (0 * size / 5), y + (4 * size / 5));
	drawLine(ctx, fillColor, 4, x + (0 * size / 5), y + (4 * size / 5), x + (5 * size / 5), y + (1 * size / 5));
	drawLine(ctx, fillColor, 4, x + (5 * size / 5), y + (1 * size / 5), x + (1 * size / 5), y + (5 * size / 5));
	drawLine(ctx, fillColor, 4, x + (1 * size / 5), y + (5 * size / 5), x + (5 * size / 5), y + (2 * size / 5));
	drawLine(ctx, fillColor, 4, x + (5 * size / 5), y + (2 * size / 5), x + (3 * size / 5), y + (5 * size / 5));
	drawLine(ctx, fillColor, 4, x + (3 * size / 5), y + (5 * size / 5), x + (5 * size / 5), y + (4 * size / 5));


	ctx.fill();
	ctx.stroke();
}

function drawLine(ctx:CanvasRenderingContext2D, color: string, lineWidth:number, x1:number, y1:number, x2:number, y2:number){
	ctx.strokeStyle = color;
	ctx.lineWidth = lineWidth;

	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function drawGrid(ctx: CanvasRenderingContext2D) {
	for (let x = 0; x < maxWidth; x = x + sizeCube) {
		drawLine(ctx, 'white', 0.8, x, 0, x, maxHeight);
	}

	for (let y = 0; y < maxHeight; y = y + sizeCube) {
		drawLine(ctx, 'white', 0.8, 0, y, maxHeight, y);
	}
}

function drawCubes(ctx: CanvasRenderingContext2D, grid:Grid) {
	ctx.clearRect(0, 0, maxWidth, maxHeight);

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === '') {
				continue;
			}

			drawCube(ctx, grid[i][j], j * sizeCube, i * sizeCube, sizeCube);
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

			drawCube(ctx, shape.color, (shape.x + j) * sizeCube, (shape.y + i) * sizeCube, sizeCube);
		}
	}
}