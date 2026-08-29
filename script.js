// Dynamic Year
document.getElementById('year').textContent = new Date().getFullYear();

// Click to Copy Email
const copyEmailBtn = document.getElementById('copy-email-btn');
const toast = document.getElementById('toast');

if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', async () => {
    const email = copyEmailBtn.getAttribute('data-email') || 'contact@mtlg.site';
    try {
      await navigator.clipboard.writeText(email);
      showToast(`Copied ${email} to clipboard!`);
    } catch (err) {
      // Fallback
      window.location.href = `mailto:${email}`;
    }
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Subtle card tilt on mousemove
const cards = document.querySelectorAll('.card, .hero-card');
cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});
