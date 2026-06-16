/* =============================================
   FutureBridge Story Edition — Main Script
   ============================================= */

/* =============================================
   STARS CANVAS
   ============================================= */
const canvas = document.getElementById('star-canvas');
const ctx    = canvas.getContext('2d');
let stars    = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  for (let i = 0; i < 80; i++) {
    stars.push({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      size:  Math.random() < 0.7 ? 2 : 4,
      speed: Math.random() * 0.5 + 0.2,
      color: ['#F0EEF8','#7B2FFF','#00F5D4','#FFD700'][Math.floor(Math.random() * 4)],
      blink: Math.random() * Math.PI * 2,
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.blink += s.speed * 0.03;
    const alpha = (Math.sin(s.blink) * 0.5 + 0.5) * 0.8 + 0.1;
    ctx.fillStyle   = s.color;
    ctx.globalAlpha = alpha;
    ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.size, s.size);
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initStars();
});
resizeCanvas();
initStars();
drawStars();

/* =============================================
   TYPING EFFECT
   ============================================= */
const lines = [
  'Bukan sekadar tes minat biasa.',
  'Ikuti cerita. Buat pilihanmu.',
  'Biarkan AI mengenali potensimu.',
];

let lineIdx  = 0;
let charIdx  = 0;
let deleting = false;

const typingEl = document.getElementById('typing-text');

function type() {
  const full = lines[lineIdx];

  if (!deleting) {
    charIdx++;
    typingEl.innerHTML = full.slice(0, charIdx) + '<span class="cursor"></span>';

    if (charIdx === full.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
    setTimeout(type, 60);

  } else {
    charIdx--;
    typingEl.innerHTML = full.slice(0, charIdx) + '<span class="cursor"></span>';

    if (charIdx === 0) {
      deleting = false;
      lineIdx  = (lineIdx + 1) % lines.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(type, 30);
  }
}

setTimeout(type, 800);

/* =============================================
   DEMO INTERACTION
   ============================================= */
const demoResults = {
  empati:  '✦ Kamu menunjukkan empati tinggi dan suka membantu! Bidang yang mungkin cocok: Kedokteran, Psikologi, Pendidikan.',
  logika:  '◈ Kamu berpikir logis dan solutif! Bidang yang mungkin cocok: Informatika, Teknik, Data Science.',
  kreatif: '✦ Kamu kreatif dan inovatif! Bidang yang mungkin cocok: Desain, Komunikasi, Seni Rupa.',
  teknis:  '⚙ Kamu peneliti dan suka eksplorasi! Bidang yang mungkin cocok: Teknik Komputer, Informatika, Sistem Informasi.',
};

function pickDemo(btn, type) {
  document.querySelectorAll('.demo-opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  const result = document.getElementById('demo-result');
  const text   = document.getElementById('demo-result-text');
  text.textContent = demoResults[type];
  result.classList.add('show');
}

/* =============================================
   NAV SCROLL HIGHLIGHT
   ============================================= */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.borderBottomColor = window.scrollY > 40
    ? 'var(--violet)'
    : 'var(--border)';
});
