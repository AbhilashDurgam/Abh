// Get form elements
const signupForm = document.getElementById('signupForm');
const starsContainer = document.getElementById('stars-container');

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

// Form validation and submission
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const termsAccepted = document.getElementById('terms').checked;
  
  // Validate passwords match
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }
  
  // Validate password length
  if (password.length < 6) {
    alert('Password must be at least 6 characters long!');
    return;
  }
  
  // Validate terms
  if (!termsAccepted) {
    alert('Please accept the Terms & Conditions!');
    return;
  }
  
  // Success message
  alert(`Account created successfully!\n\nWelcome, ${fullName}!`);
  
  // Redirect to login page
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 1000);
});
