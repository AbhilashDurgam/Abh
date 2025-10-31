// Game state
let score = 0;
let timeLeft = 30;
let gameActive = false;
let timerInterval;
let highScore = localStorage.getItem('tapGameHighScore') || 0;

// Elements
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const highScoreEl = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const target = document.getElementById('target');
const gameArea = document.getElementById('gameArea');
const starsContainer = document.getElementById('stars-container');

// Initialize
highScoreEl.textContent = highScore;
randomizeTargetPosition();

// Create stars
function createStars() {
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.width = Math.random() * 3 + 1 + 'px';
    star.style.height = star.style.width;
    star.style.setProperty('--duration', Math.random() * 3 + 2 + 's');
    star.style.setProperty('--glow', Math.random() * 5 + 2 + 'px');
    star.style.setProperty('--color', `rgba(102, 126, 234, ${Math.random() * 0.5 + 0.3})`);
    starsContainer.appendChild(star);
  }
}

createStars();

// Start game
function startGame() {
  score = 0;
  timeLeft = 30;
  gameActive = true;
  
  scoreEl.textContent = score;
  timerEl.textContent = timeLeft;
  
  startBtn.disabled = true;
  target.style.display = 'flex';
  
  randomizeTargetPosition();
  
  // Timer
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// End game
function endGame() {
  gameActive = false;
  clearInterval(timerInterval);
  startBtn.disabled = false;
  target.style.display = 'none';
  
  // Check high score
  if (score > highScore) {
    highScore = score;
    highScoreEl.textContent = highScore;
    localStorage.setItem('tapGameHighScore', highScore);
    alert(`🎉 New High Score! ${highScore} points!`);
  } else {
    alert(`Game Over! Your score: ${score}`);
  }
}

// Reset game
function resetGame() {
  gameActive = false;
  clearInterval(timerInterval);
  score = 0;
  timeLeft = 30;
  
  scoreEl.textContent = score;
  timerEl.textContent = timeLeft;
  startBtn.disabled = false;
  target.style.display = 'flex';
  
  randomizeTargetPosition();
}

// Randomize target position
function randomizeTargetPosition() {
  const gameAreaRect = gameArea.getBoundingClientRect();
  const targetSize = 60;
  
  const maxX = gameAreaRect.width - targetSize;
  const maxY = gameAreaRect.height - targetSize;
  
  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;
  
  target.style.left = randomX + 'px';
  target.style.top = randomY + 'px';
}

// Target click
target.addEventListener('click', (e) => {
  if (!gameActive) return;
  
  e.stopPropagation();
  score++;
  scoreEl.textContent = score;
  
  // Add hit animation
  target.classList.add('hit');
  setTimeout(() => target.classList.remove('hit'), 200);
  
  // Move target
  randomizeTargetPosition();
  
  // Create click effect
  createClickEffect(e.clientX, e.clientY);
});

// Create click effect
function createClickEffect(x, y) {
  const effect = document.createElement('div');
  effect.style.position = 'fixed';
  effect.style.left = x + 'px';
  effect.style.top = y + 'px';
  effect.style.width = '20px';
  effect.style.height = '20px';
  effect.style.borderRadius = '50%';
  effect.style.background = 'rgba(102, 126, 234, 0.8)';
  effect.style.pointerEvents = 'none';
  effect.style.zIndex = '9999';
  effect.style.transform = 'translate(-50%, -50%)';
  effect.style.animation = 'clickEffect 0.5s ease-out';
  
  document.body.appendChild(effect);
  
  setTimeout(() => effect.remove(), 500);
}

// Add click effect animation
const style = document.createElement('style');
style.textContent = `
  @keyframes clickEffect {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Event listeners
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

// Game area click (miss)
gameArea.addEventListener('click', (e) => {
  if (!gameActive) return;
  if (e.target === target) return;
  
  // Optional: penalize for missing
  // score = Math.max(0, score - 1);
  // scoreEl.textContent = score;
});
