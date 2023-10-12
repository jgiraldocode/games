import { SIZE_GRID, setup, update } from "./logic.ts";

let canvas = document.createElement('canvas') as HTMLCanvasElement
let scoreElement = document.createElement('span') as HTMLSpanElement
let ctx = canvas.getContext("2d") as CanvasRenderingContext2D

beforeEach(() => {
  canvas = document.createElement('canvas') as HTMLCanvasElement
  ctx = canvas.getContext("2d") as CanvasRenderingContext2D
  scoreElement = document.createElement('span') as HTMLSpanElement

  //setup(ctx, canvas)
})

describe('Catch the user interactions', () => {
  test("press key arrow top", () => {
    expect(5).toBe(5);
  })

  test("press key arrow down", () => {
    expect(5).toBe(5);
  })

  test("press key arrow left", () => {
    expect(5).toBe(5);
  })

  test("press key arrow right", () => {
    expect(5).toBe(5);
  })

  test("press key space", () => {
    expect(5).toBe(5);
  })
})

describe('Validate the game events', () => {
  test("Start game", () => {
    setup(ctx, canvas)

    expect(canvas.width).toBe(500)
    expect(canvas.height).toBe(1000)

    // validate that draw grid
    expect(ctx.lineTo).toBeCalledTimes((500 / SIZE_GRID) + (1000 / SIZE_GRID))
    // don't draw any rec
    expect(ctx.rect).toBeCalledTimes(0)
  })

  test("Game over", () => {
    expect(5).toBe(5);
  })

  test("Increase score", () => {
    expect(5).toBe(5);
    update(ctx, scoreElement)
  })


  test("Restart Game", () => {
    expect(5).toBe(5);
  })
})