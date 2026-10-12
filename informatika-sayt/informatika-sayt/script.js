// ---------- Qorong'i / yorug' rejim ----------
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');

function applyTheme(t) {
  root.setAttribute('data-theme', t);
  themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
}
let savedTheme = null;
try { savedTheme = localStorage.getItem('theme'); } catch (e) {}
applyTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// ---------- Mobil menyu ----------
const menu = document.getElementById('menu');
document.getElementById('burger').addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// ---------- Faol bo'limni ajratib ko'rsatish ----------
const links = [...menu.querySelectorAll('a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach(s => observer.observe(s));

// ---------- Tablar ----------
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ---------- Sanoq sistemalari konvertori ----------
const decInput = document.getElementById('decInput');
decInput.addEventListener('input', () => {
  const v = decInput.value.trim();
  const n = Number(v);
  const ok = v !== '' && Number.isInteger(n) && n >= 0;
  document.getElementById('outBin').textContent = ok ? n.toString(2) : '—';
  document.getElementById('outOct').textContent = ok ? n.toString(8) : '—';
  document.getElementById('outHex').textContent = ok ? n.toString(16).toUpperCase() : '—';
});

// ---------- Test ----------
const questions = [
  { q: "1 bayt necha bitga teng?", o: ["4", "8", "16", "1024"], a: 1 },
  { q: "\"Algoritm\" atamasi qaysi buyuk olim nomi bilan bog'liq?", o: ["Al-Xorazmiy", "Nyuton", "Eynshteyn", "Tesla"], a: 0 },
  { q: "Kompyuterning \"miyasi\" deb qaysi qurilma aytiladi?", o: ["Monitor", "Protsessor (CPU)", "Sichqoncha", "Printer"], a: 1 },
  { q: "Ikkilik sanoq sistemasida qaysi raqamlar ishlatiladi?", o: ["0 va 1", "1 dan 9 gacha", "0 dan 7 gacha", "faqat 2"], a: 0 },
  { q: "DNS nima vazifani bajaradi?", o: ["Virusni o'chiradi", "Domen nomini IP-manzilga aylantiradi", "Faylni siqadi", "Parolni saqlaydi"], a: 1 },
  { q: "Quyidagilardan qaysi biri doimiy xotira hisoblanadi?", o: ["RAM", "Keshe", "SSD", "Registr"], a: 2 }
];

const quizEl = document.getElementById('quiz');
let idx = 0, score = 0;

function renderQuestion() {
  const item = questions[idx];
  quizEl.innerHTML = `
    <div class="q-meta">Savol ${idx + 1} / ${questions.length}</div>
    <h3>${item.q}</h3>
    <div class="options">
      ${item.o.map((t, i) => `<button class="opt" data-i="${i}">${t}</button>`).join('')}
    </div>
    <button class="btn" id="nextBtn" style="display:none">${idx === questions.length - 1 ? 'Natijani ko\'rish' : 'Keyingisi →'}</button>
  `;
  quizEl.querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => answer(b)));
  document.getElementById('nextBtn').addEventListener('click', () => {
    idx++;
    idx < questions.length ? renderQuestion() : renderResult();
  });
}

function answer(btn) {
  const chosen = Number(btn.dataset.i);
  const correct = questions[idx].a;
  quizEl.querySelectorAll('.opt').forEach((b, i) => {
    b.disabled = true;
    if (i === correct) b.classList.add('correct');
  });
  if (chosen === correct) score++; else btn.classList.add('wrong');
  document.getElementById('nextBtn').style.display = 'inline-block';
}

function renderResult() {
  const pct = Math.round((score / questions.length) * 100);
  const msg = pct >= 80 ? "Ajoyib natija! 🎉" : pct >= 50 ? "Yaxshi, yana biroz mashq qiling 👍" : "Materiallarni qayta o'qib chiqing 📚";
  quizEl.innerHTML = `
    <h3>Natija: ${score} / ${questions.length} (${pct}%)</h3>
    <p>${msg}</p>
    <button class="btn" id="again">Qayta boshlash</button>
  `;
  document.getElementById('again').addEventListener('click', () => { idx = 0; score = 0; renderQuestion(); });
}
renderQuestion();

// ---------- Yil ----------
document.getElementById('year').textContent = new Date().getFullYear();
