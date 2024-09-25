const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Установим размеры холста явно
canvas.width = 400;
canvas.height = 400;

const box = 20; // Размер одного сегмента змейки
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box,
};
let score = 0;

// Управление змеей
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

// Проверка столкновения
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Отрисовка игры
function drawGame() {
    // Очистка холста перед каждым кадром
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Отрисовка змеи
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "lime";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Отрисовка еды
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Движение змеи
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // Если съели еду
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box,
        };
    } else {
        snake.pop(); // Убираем хвост, если не съели еду
    }

    let newHead = { x: snakeX, y: snakeY };

    // Проверка столкновений с границами или самой собой
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("Игра окончена! Ваш счёт: " + score);
    }

    snake.unshift(newHead); // Добавляем новую голову

    // Отображение счёта
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Счёт: " + score, box, box);
}

// Запуск игры
let game = setInterval(drawGame, 100);
