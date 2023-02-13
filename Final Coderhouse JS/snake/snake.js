import { getInputDirection } from "./input.js";

//VELOCIDAD DE MOVIMIENTO DE SNAKE
export const snake_speed = 5;

//TAMANO DE SEGMENTOS-CUERPO SNAKE

const snakeBody = [ {x: 11, y: 11} ];
let newSegments = 0;

export function update() {
    addSegments()

    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function draw(tablero) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        tablero.appendChild(snakeElement);
    })
}

export function expandSnake(amount) {
    newSegments += amount;
}

//SEGMENTOS NUEVOS, CABEZA E INTERSECCION
export function onSnake(position, {ignoreHead = false} = {} ) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0 ) return false;
        return equalPositions(segment, position);
    })
}

export function snakeHead() {
    return snakeBody[0];
}

export function snakeInterseccion() {
    return onSnake(snakeBody[0], {ignoreHead: true});
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
    
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }

    newSegments = 0;
}