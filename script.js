// Dynamic Year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Toast Notification System
const toast = document.getElementById('toast');
let toastTimer = null;

function showToast(message) {
  if (!toast) return;
  toast.innerHTML = message;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Click to Copy Email
const copyEmailBtn = document.getElementById('copy-email-btn');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', async () => {
    const email = copyEmailBtn.getAttribute('data-email') || 'contact@mtlg.site';
    try {
      await navigator.clipboard.writeText(email);
      showToast(`Copied <strong>${email}</strong> to clipboard!`);
    } catch (err) {
      window.location.href = `mailto:${email}`;
    }
  });
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

// Share Direct Project Links
function setupShareButtons() {
  document.querySelectorAll('.card-share-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const projectId = btn.getAttribute('data-project-id');
      const projectTitle = btn.getAttribute('data-project-title') || 'Project';
      const origin = window.location.origin;
      const pathname = window.location.pathname;
      const shareUrl = `${origin}${pathname}#${projectId}`;

      try {
        await navigator.clipboard.writeText(shareUrl);
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      // Update URL in browser address bar without reload
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', '#' + projectId);
      }

      // Visual feedback on button
      btn.classList.add('copied');
      setTimeout(() => {
        btn.classList.remove('copied');
      }, 2000);

      // Visual highlight feedback on card
      const card = btn.closest('.project-card') || document.getElementById(projectId);
      if (card) {
        card.classList.remove('highlighted-project');
        void card.offsetWidth;
        card.classList.add('highlighted-project');
        setTimeout(() => {
          card.classList.remove('highlighted-project');
        }, 3600);
      }

      showToast(`Direct link to <strong>${projectTitle}</strong> copied!`);
    });
  });
}

// Deep Link Auto-Scroll & Highlight
function handleProjectDeepLink() {
  let targetId = '';
  if (window.location.hash) {
    targetId = window.location.hash.substring(1).trim();
  } else {
    const urlParams = new URLSearchParams(window.location.search);
    targetId = urlParams.get('project') || urlParams.get('p') || '';
  }

  if (!targetId) return;

  const rawId = targetId.replace(/^project-/, '');
  const targetCard = document.getElementById(rawId) ||
                     document.getElementById(targetId) ||
                     document.querySelector(`[data-project-id="${rawId}"]`) ||
                     document.querySelector(`[data-project-id="${targetId}"]`);

  if (!targetCard) return;

  setTimeout(() => {
    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    targetCard.classList.remove('highlighted-project');
    void targetCard.offsetWidth;
    targetCard.classList.add('highlighted-project');
    setTimeout(() => {
      targetCard.classList.remove('highlighted-project');
    }, 3600);
  }, 120);
}

// Initialize on Load & Hash Changes
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setupShareButtons();
    handleProjectDeepLink();
  });
} else {
  setupShareButtons();
  handleProjectDeepLink();
}

window.addEventListener('hashchange', handleProjectDeepLink);
