import './style.css'
import { setup, update, updateUI, getVelocity } from "./logic.ts";

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const scoreUI = document.getElementById('score') as HTMLSpanElement
export const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;

setup(ctx, canvas)

function update1() {
    requestAnimationFrame(() => {
        setTimeout(() => {
            update(ctx, scoreUI)
            update1()
        }, getVelocity());
    });
}

update1()

window.addEventListener('update', () => {
    updateUI(ctx)
});