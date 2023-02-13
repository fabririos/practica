const grid_size = 21;


//RANDOMIZAR APARICION DE COMIDA
export function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * grid_size) + 1,
        y: Math.floor(Math.random() * grid_size) + 1
    }
}

//SI SALE DEL GRID

export function outsideGrid(position) {
    return (
        position.x < 1 || position.x > grid_size ||
        position.y < 1 || position.y > grid_size 
    )
}