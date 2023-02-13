import { onSnake, expandSnake} from './snake.js';
import {randomGridPosition } from './grid.js';

let food = randomGridPosition();
//SEGMENTOS QUE SE AGREGAN AL AGARRAR COMIDA
const expansion = 2;

//CRECIMIENTO
export function update() {
    if (onSnake(food)) {
        expandSnake(expansion);
        food = randomGridPosition();
    }
}


//COMIDA
export function draw(tablero) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    tablero.appendChild(foodElement);
}

//CAMBIO DE LUGAR DE APARICION DE COMIDA 
function randomFoodPosition() {
    let newFoodPosition
    while (newFoodPosition = null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}