// querySelector selects the first item in the DOM
const canvas = document.querySelector("canvas");
// context
const ctx = canvas.getContext("2d");

let primary = '#90A9F4';
let secondary = '#314275';

const grid = 32;
let count = 0; // frame rate

let score = 0;

// playable characters
let snake = {
    x: grid * 5,
    y: grid * 5,

    vx: grid, // vel on x axis
    vy: 0, // vel on y axis

    cells: [],

    maxCells: 4
};

let apple = {
    x: grid * 10,
    y: grid * 10
};


function update() {
    // Call it again
    requestAnimationFrame(update);

    if (++count < 4) {
        return;
    }
    count = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Make the snake move
    snake.x += snake.vx;
    snake.y += snake.vy;

    // Respawn it back to canvas
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    // Cells
    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // Apple
    ctx.fillStyle = secondary;
    ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    // Snake
    ctx.fillStyle = primary;
    snake.cells.forEach(function (cell, index) {
        ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        //  Apple Check
        if (cell.x === apple.x && cell.y === apple.y) {
            // Snake grows longer
            snake.maxCells++;

            // Reward Counter
            score++;

            // Respawn Apple randomly
            apple.x = getRandomInt(0, 24) * grid;
            apple.y = getRandomInt(0, 14) * grid;
        }

        // Kill when head touches body
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                window.location.reload();
            }
        }

    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

document.addEventListener("keydown", function (evt) {

    // Left Key
    if (evt.which === 37 && snake.vx === 0) {
        snake.vx = -grid;
        snake.vy = 0;

    } // Top Key
    else if (evt.which === 38 && snake.vy === 0) {
        snake.vy = -grid;
        snake.vx = 0;

    } // Right
    else if (evt.which === 39 && snake.vx === 0) {
        snake.vx = grid;
        snake.vy = 0;

    } // Bottom
    else if (evt.which === 40 && snake.vy === 0) {
        snake.vy = grid;
        snake.vx = 0;
    }
});

// Starts the game, runs only once
requestAnimationFrame(update);