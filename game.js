const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const player1 = new Image();
player1.src = 'assets/player1.png';
const player2 = new Image();
player2.src = 'assets/player2.png';
const ball = new Image();
ball.src = 'assets/ball.png';

let player1Pos = { x: 100, y: 180 };
let player2Pos = { x: 700, y: 180 };
let ballPos = { x: 400, y: 190 };

let keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function drawPlayers() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(player1, player1Pos.x, player1Pos.y, 50, 50);
    ctx.drawImage(player2, player2Pos.x, player2Pos.y, 50, 50);
    ctx.drawImage(ball, ballPos.x, ballPos.y, 30, 30);
}

function updateGame() {
    if (keys['w']) player1Pos.y -= 5;
    if (keys['s']) player1Pos.y += 5;
    if (keys['a']) player1Pos.x -= 5;
    if (keys['d']) player1Pos.x += 5;

    if (keys['ArrowUp']) player2Pos.y -= 5;
    if (keys['ArrowDown']) player2Pos.y += 5;
    if (keys['ArrowLeft']) player2Pos.x -= 5;
    if (keys['ArrowRight']) player2Pos.x += 5;

    // Basic ball movement logic (needs improvement)
    if (Math.abs(player1Pos.x - ballPos.x) < 50 && Math.abs(player1Pos.y - ballPos.y) < 50) {
        ballPos.x += (ballPos.x - player1Pos.x) / 10;
        ballPos.y += (ballPos.y - player1Pos.y) / 10;
    }

    if (Math.abs(player2Pos.x - ballPos.x) < 50 && Math.abs(player2Pos.y - ballPos.y) < 50) {
        ballPos.x += (ballPos.x - player2Pos.x) / 10;
        ballPos.y += (ballPos.y - player2Pos.y) / 10;
    }

    drawPlayers();
    requestAnimationFrame(updateGame);
}

document.getElementById('start').addEventListener('click', () => {
    updateGame();
});

document.getElementById('restart').addEventListener('click', () => {
    player1Pos = { x: 100, y: 180 };
    player2Pos = { x: 700, y: 180 };
    ballPos = { x: 400, y: 190 };
    drawPlayers();
});

drawPlayers();
