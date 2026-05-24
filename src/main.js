// Простой пример "нестандартного элемента": переключатель темы.
// TODO студент: замени или дополни своим.

// === РОЗОВАЯ ТЕМА С КОТИКАМИ, ОГОНЬКАМИ И ПОРОСЯТАМИ ===

// 1. ГЕНЕРАТОР ОГОНЬКОВ
function createSparkle() {
  const el = document.createElement('div');
  el.className = 'sparkle';
  el.style.left = Math.random() * 100 + 'vw';
  el.style.top = Math.random() * 100 + 'vh';
  el.style.animationDuration = (Math.random() * 1.5 + 1) + 's';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// 2. ГЕНЕРАТОР ЛЕТАЮЩИХ КОТИКОВ
function createCat() {
  const cats = ['🐱', '', '😺', '😻', '😸', ''];
  const el = document.createElement('div');
  el.className = 'floating-cat';
  el.textContent = cats[Math.floor(Math.random() * cats.length)];
  el.style.left = Math.random() * 90 + 'vw';
  el.style.top = Math.random() * 90 + 'vh';
  el.style.animationDuration = (Math.random() * 3 + 4) + 's';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 8000);
}

// 3. ГЕНЕРАТОР ПАДАЮЩИХ ПОРОСЯТ
function createPig() {
  const pig = document.createElement('div');
  pig.className = 'falling-pig';
  pig.textContent = '🐷';
  pig.style.left = Math.random() * 100 + 'vw';
  pig.style.animationDuration = (Math.random() * 3 + 3) + 's';
  document.body.appendChild(pig);
  setTimeout(() => pig.remove(), 6500);
}

// Запускаем генерацию
for (let i = 0; i < 50; i++) createSparkle();
for (let i = 0; i < 20; i++) createCat();
for (let i = 0; i < 20; i++) createPig();
setInterval(createSparkle, 900);
setInterval(createCat, 1500);
setInterval(createPig, 600);

// 4. ЗВУК ПРИ КЛИКЕ (Web Audio API)
const clickAudioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playPopSound() {
  if (clickAudioCtx.state === 'suspended') {
    clickAudioCtx.resume();
  }
  
  const osc = clickAudioCtx.createOscillator();
  const gain = clickAudioCtx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, clickAudioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, clickAudioCtx.currentTime + 0.15);
  
  gain.gain.setValueAtTime(0.12, clickAudioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, clickAudioCtx.currentTime + 0.15);
  
  osc.connect(gain);
  gain.connect(clickAudioCtx.destination);
  
  osc.start();
  osc.stop(clickAudioCtx.currentTime + 0.15);
}

// 5. ОБРАБОТЧИК КЛИКА (котик + звук)
document.addEventListener('click', (e) => {
  // Проверяем, что клик не по кнопке
  if (!e.target.closest('button')) {
    playPopSound();
    
    const cat = document.createElement('div');
    cat.className = 'floating-cat';
    cat.textContent = '😻';
    cat.style.left = e.clientX + 'px';
    cat.style.top = e.clientY + 'px';
    cat.style.animationDuration = '1.5s';
    document.body.appendChild(cat);
    setTimeout(() => cat.remove(), 1500);
  }
});

// 6. ФОНОВАЯ МУЗЫКА
const bgMusic = new Audio('./bg-music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.35;

const musicBtn = document.getElementById('music-toggle');
let musicPlaying = false;

if (musicBtn) {
  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (musicPlaying) {
      bgMusic.pause();
      musicBtn.textContent = '🎵';
    } else {
      bgMusic.play();
      musicBtn.textContent = '🎶';
    }
    musicPlaying = !musicPlaying;
  });
}