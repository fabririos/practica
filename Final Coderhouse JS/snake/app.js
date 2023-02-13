import { update as updateSnake, draw as drawSnake, snake_speed, snakeHead, snakeInterseccion} from './snake.js';
import { update as updateFood, draw as drawFood} from './food.js';
import { outsideGrid } from './grid.js' ;


let lastRenderTime = 0;
let gameOver = false
const tablero = document.getElementById('tablero');


//CONFIGURACIONES
function main(currentTime) {
    if (gameOver){
        if (confirm('Perdiste. Presiona Aceptar para reiniciar')) {
            window.location = '/snake'
        }
        return
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / snake_speed) return;

    console.log('Render');
    lastRenderTime = currentTime;

    update ();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkdeath();
}

function draw() {
    tablero.innerHTML = '';
    drawSnake(tablero);
    drawFood(tablero);
}

//FIN DEL JUEGO
function checkdeath() {
    gameOver = outsideGrid(snakeHead()) || snakeInterseccion()
}