// Create starry background
const starsContainer = document.getElementById('stars-container');
const starCount = 150;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  
  // Random position
  star.style.left = Math.random() * 100 + '%';
  star.style.top = Math.random() * 100 + '%';
  
  // Random size (1-3px)
  const size = Math.random() * 2 + 1;
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  
  // Random animation duration (2-5s)
  const duration = Math.random() * 3 + 2;
  star.style.setProperty('--duration', duration + 's');
  
  // Random glow
  const glow = Math.random() * 3 + 2;
  star.style.setProperty('--glow', glow + 'px');
  star.style.setProperty('--color', 'rgba(255, 255, 255, 0.8)');
  
  // Random delay
  star.style.animationDelay = Math.random() * 5 + 's';
  
  starsContainer.appendChild(star);
}

// Create shooting stars
function createShootingStar() {
  const shootingStar = document.createElement('div');
  shootingStar.className = 'shooting-star';
  shootingStar.style.left = Math.random() * 100 + '%';
  shootingStar.style.top = Math.random() * 50 + '%';
  starsContainer.appendChild(shootingStar);
  
  setTimeout(() => {
    shootingStar.remove();
  }, 3000);
}

// Create a shooting star every 5-10 seconds
setInterval(() => {
  if (Math.random() > 0.5) {
    createShootingStar();
  }
}, 5000);

// Navigation link active state handling
const links = document.querySelectorAll('.nav-link');
links.forEach(link => {
  link.addEventListener('click', (e) => {
    // Allow hash navigation but update active state
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    // Update aria-current for accessibility
    links.forEach(l => l.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'page');
  });
});
