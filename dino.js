const dino = document.getElementById("dino"); 
const outputDiv = document.getElementById('output');
var gameElement = document.querySelector(".game"); 
var cactus = document.getElementById("cactus");
var position = gameElement.offsetWidth;
document.addEventListener("keydown", handleKeyDown);
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("stopButton").addEventListener("click", stopTimer);
startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);
let isGameRunning = false;
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let isCollision = false;

//функции start, stop и restart
function startGame() {
    if (!isGameRunning) {
        isGameRunning = true;
        animate();
    }
}
function stopGame() {
    if (isGameRunning) {
        isGameRunning = false;
        cancelAnimationFrame(animationId);
    }
}
document.getElementById("restartButton").addEventListener("click", function() {
    location.reload();
});


//запускает, остонавливает и выводит время на экран
function startTimer() {
    if (!isRunning && !isCollision) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 1000);
        isRunning = true;
    }
}
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = Date.now() - startTime;
    isRunning = false;
}
function updateTimer() {
    if (!isCollision) {
        const seconds = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById("timer").textContent = seconds;
    } else {
        stopTimer();
    }
}


//анимация кактуса
function animate() { 
    position -= 6; 
    cactus.style.left = position + "px"; 

    if (position + cactus.offsetWidth > 0 ) { 
        animationId = requestAnimationFrame(animate);
    } else {
        position = gameElement.offsetWidth; 
        cactus.style.left = position + "px";
        animate(); 
    }
}


//все функция отвечающие за прижок
var positionY = 150; //Начальная позиция 
var velocityY = 0; //Скорость движения 
var jumpHeight = 120; //Высота прыжка
//обработка нажатия клавиш
function handleKeyDown(event) {
    if (event.keyCode === 32 || event.keyCode === 38) {
        velocityY = -10;
    }
}
//обновление позиции динозавра
function updateDinoPosition() {
    positionY += velocityY;
    if (positionY > 150) {
        positionY = 150;
        velocityY = 0;
    }
    dino.style.top = positionY + "px";
    if (positionY <= 150 - jumpHeight) {
        velocityY = 5; //скорость падения
    }
}
//обновление игры на каждом кадре
function updateGame() {
    updateDinoPosition();
    requestAnimationFrame(updateGame);
}
updateGame();


//условие столкновения и вывод Game over
function endGame() {
    outputDiv.textContent = "Game Over";
}
let isAlive = setInterval(function() {
    let dinoRect = dino.getBoundingClientRect();
    let cactusRect = cactus.getBoundingClientRect();
  
    if (
        dinoRect.right >= cactusRect.left &&
        dinoRect.left <= cactusRect.right &&
        dinoRect.bottom >= cactusRect.top &&
        dinoRect.top <= cactusRect.bottom
    ) {
        cancelAnimationFrame(animationId);
        isCollision = true;
        endGame();
    }
}, 10);