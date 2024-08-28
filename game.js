const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const player1Pos = { x: 100, y: 180 };
const player2Pos = { x: 700, y: 180 };
const ballPos = { x: 400, y: 190 };

const playerSize = 20;
const ballSize = 10;

let keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function drawPixelArt(x, y, color, size) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
}

function drawField() {
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw center line
    ctx.strokeStyle = '#ecf0f1';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
    ctx.stroke();
}

function drawPlayer(x, y, color) {
    drawPixelArt(x, y, color, playerSize);
    drawPixelArt(x + 5, y - 5, color, playerSize / 2); // Head
    drawPixelArt(x - 5, y + 15, color, playerSize / 2); // Feet
    drawPixelArt(x + 15, y + 15, color, playerSize / 2); // Feet
}

function drawBall(x, y) {
    drawPixelArt(x, y, '#ffffff', ballSize);
}

function updateGame() {
    // Player 1 Controls
    if (keys['w']) player1Pos.y -= 5;
    if (keys['s']) player1Pos.y += 5;
    if (keys['a']) player1Pos.x -= 5;
    if (keys['d']) player1Pos.x += 5;

    // Player 2 Controls
    if (keys['ArrowUp']) player2Pos.y -= 5;
    if (keys['ArrowDown']) player2Pos.y += 5;
    if (keys['ArrowLeft']) player2Pos.x -= 5;
    if (keys['ArrowRight']) player2Pos.x += 5;

    // Ball Movement Logic (Basic Collision)
    if (Math.abs(player1Pos.x - ballPos.x) < 20 && Math.abs(player1Pos.y - ballPos.y) < 20) {
        ballPos.x += (ballPos.x - player1Pos.x) / 10;
        ballPos.y += (ballPos.y - player1Pos.y) / 10;
    }

    if (Math.abs(player2Pos.x - ballPos.x) < 20 && Math.abs(player2Pos.y - ballPos.y) < 20) {
        ballPos.x += (ballPos.x - player2Pos.x) / 10;
        ballPos.y += (ballPos.y - player2Pos.y) / 10;
    }

    drawField();
    drawPlayer(player1Pos.x, player1Pos.y, '#3498db');
    drawPlayer(player2Pos.x, player2Pos.y, '#e74c3c');
    drawBall(ballPos.x, ballPos.y);

    requestAnimationFrame(updateGame);
}

document.getElementById('start').addEventListener('click', () => {
    updateGame();
});

document.getElementById('restart').addEventListener('click', () => {
    player1Pos.x = 100;
    player1Pos.y = 180;
    player2Pos.x = 700;
    player2Pos.y = 180;
    ballPos.x = 400;
    ballPos.y = 190;
    drawField();
    drawPlayer(player1Pos.x, player1Pos.y, '#3498db');
    drawPlayer(player2Pos.x, player2Pos.y, '#e74c3c');
    drawBall(ballPos.x, ballPos.y);
});

// Initial Drawing
drawField();
drawPlayer(player1Pos.x, player1Pos.y, '#3498db');
drawPlayer(player2Pos.x, player2Pos.y, '#e74c3c');
drawBall(ballPos.x, ballPos.y);
