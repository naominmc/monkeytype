// ==========================================================================
// KetikKilat - Typing Game Engine (Self-contained, zero-dependency, CORS-free)
// ==========================================================================

// Kumpulan kata dan kalimat Indonesia & Inggris
const INDONESIAN_WORDS = [
  "yang", "untuk", "pada", "ke", "karena", "oleh", "dalam", "mengatakan", "ini", "itu",
  "dengan", "dan", "dari", "tidak", "akan", "bisa", "ada", "mereka", "kita", "sudah",
  "saya", "bila", "juga", "lebih", "dapat", "hari", "tahun", "saat", "bukan", "hanya",
  "sangat", "orang", "waktu", "banyak", "harus", "menjadi", "lain", "seperti", "masih",
  "setiap", "semua", "tentang", "melihat", "dunia", "hidup", "jalan", "kata", "besar",
  "kecil", "rumah", "kerja", "tempat", "tahu", "punya", "datang", "pergi", "kembali",
  "malam", "pagi", "siang", "sore", "senang", "sedih", "cinta", "hati", "pikiran",
  "langit", "bumi", "laut", "gunung", "sungai", "angin", "hujan", "cahaya", "gelap",
  "matahari", "bulan", "bintang", "pohon", "daun", "bunga", "hewan", "teman", "keluarga",
  "belajar", "membaca", "menulis", "bicara", "dengar", "rasa", "mimpi", "harapan",
  "semangat", "sukses", "gagal", "usaha", "tujuan", "langkah", "perjalanan", "cerita",
  "wajah", "senyum", "mata", "tangan", "langkah", "kaki", "suara", "irama", "nada",
  "jiwa", "raga", "karya", "seni", "teknologi", "komputer", "layar", "ketik", "keyboard",
  "kecepatan", "ketepatan", "fokus", "latihan", "juara", "unggul", "kreatif", "inovasi",
  "masa", "depan", "sekarang", "kemarin", "esok", "selamanya", "abadi", "makna",
  "kekuatan", "keberanian", "kesabaran", "kejujuran", "kedamaian", "kebahagiaan",
  "kebebasan", "pengetahuan", "kebijaksanaan", "kebersamaan", "persahabatan", "kehangatan"
];

const ENGLISH_WORDS = [
  "the", "be", "of", "and", "a", "to", "in", "he", "have", "it", "that", "for", "they",
  "with", "as", "not", "on", "she", "at", "by", "this", "we", "you", "do", "but", "his",
  "from", "they", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would",
  "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go",
  "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", "people",
  "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then",
  "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use",
  "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because",
  "any", "these", "give", "day", "most", "us", "great", "world", "keyboard", "speed",
  "accuracy", "focus", "challenge", "practice", "journey", "success", "future", "light",
  "energy", "rhythm", "mastery", "typing", "smooth", "lightning", "passion", "progress"
];

const INDONESIAN_QUOTES = [
  {
    text: "Pendidikan adalah senjata paling ampuh yang bisa kau gunakan untuk mengubah dunia.",
    source: "Nelson Mandela"
  },
  {
    text: "Bermimpilah setinggi langit, jika engkau jatuh, engkau akan jatuh di antara bintang-bintang.",
    source: "Ir. Soekarno"
  },
  {
    text: "Hanya mereka yang berani gagal besar yang bisa mencapai keberhasilan besar.",
    source: "Robert F. Kennedy"
  },
  {
    text: "Keberhasilan bukanlah kunci dari kebahagiaan, melainkan kebahagiaan adalah kunci dari keberhasilan.",
    source: "Albert Schweitzer"
  },
  {
    text: "Jadilah perubahan yang ingin kamu lihat di dunia ini dengan tindakan nyata setiap harinya.",
    source: "Mahatma Gandhi"
  },
  {
    text: "Kegagalan hanyalah kesempatan untuk memulai lagi dengan cara yang lebih cerdas dan bijak.",
    source: "Henry Ford"
  },
  {
    text: "Waktu terbaik untuk menanam pohon adalah dua puluh tahun lalu, dan waktu terbaik kedua adalah sekarang.",
    source: "Pepatah Tiongkok"
  },
  {
    text: "Kecepatan memang penting, namun ketepatan dan ketenangan adalah kunci penguasaan sejati.",
    source: "Filosofi Mengetik"
  },
  {
    text: "Bukan kesulitan yang membuat kita takut, melainkan ketakutan kitalah yang membuat segalanya menjadi sulit.",
    source: "Seneca"
  },
  {
    text: "Lakukan apa yang bisa kamu lakukan, dengan apa yang kamu miliki, di tempat kamu berada saat ini.",
    source: "Theodore Roosevelt"
  }
];

const ENGLISH_QUOTES = [
  {
    text: "The only way to do great work is to love what you do.",
    source: "Steve Jobs"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    source: "Winston Churchill"
  },
  {
    text: "In the middle of difficulty lies opportunity waiting to be seized.",
    source: "Albert Einstein"
  },
  {
    text: "Do not wait to strike till the iron is hot; but make it hot by striking.",
    source: "William Butler Yeats"
  },
  {
    text: "Simplicity is the soul of efficiency and the essence of mastery.",
    source: "Austin Freeman"
  },
  {
    text: "Discipline is the bridge between goals and accomplishment in every craft.",
    source: "Jim Rohn"
  }
];

// ==========================================================================
// Web Audio API Sound Synthesizer
// ==========================================================================
class SoundManager {
  constructor() {
    this.ctx = null;
    this.soundType = 'clicky';
    this.volume = 0.4;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setSoundType(type) {
    this.soundType = type;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  playKey() {
    if (this.soundType === 'off') return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    if (this.soundType === 'clicky') {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      const freq = 1800 + (Math.random() * 400 - 200);
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(800, now);

      gain.gain.setValueAtTime(this.volume * 0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);

      const clickOsc = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      clickOsc.type = 'sine';
      clickOsc.frequency.setValueAtTime(3400, now);
      clickGain.gain.setValueAtTime(this.volume * 0.4, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
      clickOsc.connect(clickGain);
      clickGain.connect(this.ctx.destination);
      clickOsc.start(now);
      clickOsc.stop(now + 0.02);

    } else if (this.soundType === 'thock') {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      const freq = 260 + (Math.random() * 40 - 20);
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.07);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now);

      gain.gain.setValueAtTime(this.volume * 0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);

    } else if (this.soundType === 'bubble') {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const base = 500 + Math.random() * 300;
      osc.frequency.setValueAtTime(base, now);
      osc.frequency.exponentialRampToValueAtTime(base * 1.8, now + 0.05);

      gain.gain.setValueAtTime(this.volume * 0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    }
  }

  playError() {
    if (this.soundType === 'off') return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

    gain.gain.setValueAtTime(this.volume * 0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  playFinish() {
    if (this.soundType === 'off') return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const start = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(this.volume * 0.5, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + 0.4);
    });
  }
}

const soundManager = new SoundManager();

// ==========================================================================
// Canvas Chart
// ==========================================================================
class TypingChart {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.data = [];
    this.hoverIndex = -1;
    this.themeColors = {
      primary: '#e2b714',
      sub: '#646669',
      text: '#d1d0c5',
      error: '#ca4754',
      raw: '#8b8a82',
      grid: 'rgba(255, 255, 255, 0.05)'
    };
    this.bindEvents();
  }

  setThemeColors(colors) {
    this.themeColors = { ...this.themeColors, ...colors };
    this.render();
  }

  setData(data) {
    this.data = data;
    this.hoverIndex = -1;
    this.render();
  }

  bindEvents() {
    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.data || this.data.length < 2) return;
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const padding = { left: 45, right: 30 };
      const chartWidth = rect.width - padding.left - padding.right;

      if (x >= padding.left && x <= rect.width - padding.right) {
        const pct = (x - padding.left) / chartWidth;
        const index = Math.round(pct * (this.data.length - 1));
        if (index >= 0 && index < this.data.length) {
          this.hoverIndex = index;
          this.render();
        }
      } else {
        if (this.hoverIndex !== -1) {
          this.hoverIndex = -1;
          this.render();
        }
      }
    });

    this.canvas.addEventListener('mouseleave', () => {
      if (this.hoverIndex !== -1) {
        this.hoverIndex = -1;
        this.render();
      }
    });
  }

  render() {
    if (!this.canvas || !this.ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    if (w === 0 || h === 0) return;

    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);
    this.ctx.clearRect(0, 0, w, h);

    if (!this.data || this.data.length === 0) {
      this.ctx.fillStyle = this.themeColors.sub;
      this.ctx.font = '14px Outfit, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Grafik performa akan muncul setelah tes selesai', w / 2, h / 2);
      return;
    }

    const padding = { top: 25, bottom: 35, left: 45, right: 35 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    let maxWpm = 0;
    this.data.forEach(d => {
      if (d.wpm > maxWpm) maxWpm = d.wpm;
      if (d.rawWpm > maxWpm) maxWpm = d.rawWpm;
    });
    maxWpm = Math.max(40, Math.ceil((maxWpm + 10) / 20) * 20);

    const gridSteps = 4;
    this.ctx.strokeStyle = this.themeColors.grid;
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = this.themeColors.sub;
    this.ctx.font = '11px monospace';
    this.ctx.textAlign = 'right';
    this.ctx.textBaseline = 'middle';

    for (let i = 0; i <= gridSteps; i++) {
      const val = Math.round((maxWpm / gridSteps) * i);
      const y = padding.top + chartH - (val / maxWpm) * chartH;

      this.ctx.beginPath();
      this.ctx.moveTo(padding.left, y);
      this.ctx.lineTo(w - padding.right, y);
      this.ctx.stroke();

      this.ctx.fillText(val.toString(), padding.left - 8, y);
    }

    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';
    const xInterval = Math.max(1, Math.floor(this.data.length / 6));
    this.data.forEach((d, idx) => {
      if (idx % xInterval === 0 || idx === this.data.length - 1) {
        const x = padding.left + (idx / (this.data.length - 1 || 1)) * chartW;
        this.ctx.fillText(`${d.second}s`, x, padding.top + chartH + 10);
      }
    });

    const getX = (idx) => padding.left + (idx / (this.data.length - 1 || 1)) * chartW;
    const getY = (val) => padding.top + chartH - (val / maxWpm) * chartH;

    // Raw WPM line
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.themeColors.raw;
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([4, 4]);
    this.data.forEach((d, idx) => {
      const x = getX(idx);
      const y = getY(d.rawWpm);
      if (idx === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    });
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    // Net WPM gradient & line
    const grad = this.ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
    grad.addColorStop(0, `${this.themeColors.primary}33`);
    grad.addColorStop(1, `${this.themeColors.primary}00`);

    this.ctx.beginPath();
    this.data.forEach((d, idx) => {
      const x = getX(idx);
      const y = getY(d.wpm);
      if (idx === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    });
    const lastX = getX(this.data.length - 1);
    const firstX = getX(0);
    this.ctx.lineTo(lastX, padding.top + chartH);
    this.ctx.lineTo(firstX, padding.top + chartH);
    this.ctx.closePath();
    this.ctx.fillStyle = grad;
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.strokeStyle = this.themeColors.primary;
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.data.forEach((d, idx) => {
      const x = getX(idx);
      const y = getY(d.wpm);
      if (idx === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    });
    this.ctx.stroke();

    // Errors
    this.data.forEach((d, idx) => {
      if (d.errors > 0) {
        const x = getX(idx);
        const y = getY(d.wpm);
        this.ctx.fillStyle = this.themeColors.error;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 4, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });

    // Tooltip on hover
    if (this.hoverIndex >= 0 && this.hoverIndex < this.data.length) {
      const d = this.data[this.hoverIndex];
      const hx = getX(this.hoverIndex);
      const hy = getY(d.wpm);

      this.ctx.beginPath();
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      this.ctx.lineWidth = 1;
      this.ctx.moveTo(hx, padding.top);
      this.ctx.lineTo(hx, padding.top + chartH);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(hx, hy, 5, 0, Math.PI * 2);
      this.ctx.fillStyle = this.themeColors.primary;
      this.ctx.fill();

      const tipText = `${d.second}s | WPM: ${d.wpm} | Raw: ${d.rawWpm} | Err: ${d.errors}`;
      this.ctx.font = '12px monospace';
      const tipMetrics = this.ctx.measureText(tipText);
      const tipW = tipMetrics.width + 18;
      const tipH = 26;
      let tipX = hx - tipW / 2;
      let tipY = hy - 36;

      if (tipX < padding.left) tipX = padding.left;
      if (tipX + tipW > w - padding.right) tipX = w - padding.right - tipW;
      if (tipY < 5) tipY = hy + 12;

      this.ctx.fillStyle = '#1e1f23';
      this.ctx.strokeStyle = this.themeColors.primary;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.roundRect(tipX, tipY, tipW, tipH, 6);
      this.ctx.fill();
      this.ctx.stroke();

      this.ctx.fillStyle = this.themeColors.text;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(tipText, tipX + tipW / 2, tipY + tipH / 2);
    }
  }
}

// ==========================================================================
// Typing Game Application
// ==========================================================================
class TypingGame {
  constructor() {
    this.mode = 'time'; // 'time', 'words', 'quote', 'zen'
    this.timeOption = 30;
    this.wordsOption = 25;
    this.language = 'indonesia';
    this.hasPunctuation = false;
    this.hasNumbers = false;
    this.activeTheme = localStorage.getItem('ketikkilat_theme') || 'serika-dark';
    this.soundType = localStorage.getItem('ketikkilat_sound') || 'clicky';
    this.volume = parseFloat(localStorage.getItem('ketikkilat_volume') || '0.4');

    this.isTesting = false;
    this.isFinished = false;
    this.startTime = null;
    this.timerInterval = null;
    this.statsInterval = null;
    this.timerRemaining = 30;
    this.secondsElapsed = 0;

    this.wordsList = [];
    this.currentWordIdx = 0;
    this.currentCharIdx = 0;
    this.correctChars = 0;
    this.incorrectChars = 0;
    this.extraChars = 0;
    this.missedChars = 0;
    this.totalKeypresses = 0;
    this.errorsThisSecond = 0;
    this.wpmHistory = [];
    this.activeQuote = null;

    // DOM Elements
    this.wordsContainer = document.getElementById('words-container');
    this.wordsWrapper = document.getElementById('words-wrapper');
    this.wordsInput = document.getElementById('words-input');
    this.caret = document.getElementById('caret');
    this.focusOverlay = document.getElementById('focus-overlay');
    this.liveStats = document.getElementById('live-stats');
    this.liveTimer = document.getElementById('live-timer');
    this.liveWpm = document.getElementById('live-wpm');
    this.liveAcc = document.getElementById('live-acc');
    this.gameMain = document.getElementById('game-main');
    this.resultScreen = document.getElementById('result-screen');
    this.configBarWrapper = document.getElementById('config-bar-wrapper');
    this.keyboardSection = document.getElementById('keyboard-section');
    this.toastContainer = document.getElementById('toast-container');

    const canvas = document.getElementById('chart-canvas');
    this.chart = new TypingChart(canvas);

    this.init();
  }

  init() {
    this.applyTheme(this.activeTheme);
    soundManager.setSoundType(this.soundType);
    soundManager.setVolume(this.volume);

    const soundSelect = document.getElementById('select-sound');
    if (soundSelect) soundSelect.value = this.soundType;
    const volInput = document.getElementById('sound-volume');
    if (volInput) volInput.value = this.volume;

    this.bindEvents();
    this.resetTest();
  }

  applyTheme(theme) {
    this.activeTheme = theme;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('ketikkilat_theme', theme);

    document.querySelectorAll('.theme-card').forEach(card => {
      card.classList.toggle('active', card.dataset.theme === theme);
    });

    setTimeout(() => {
      const styles = getComputedStyle(document.body);
      this.chart.setThemeColors({
        primary: styles.getPropertyValue('--main-color').trim(),
        sub: styles.getPropertyValue('--sub-color').trim(),
        text: styles.getPropertyValue('--text-color').trim(),
        error: styles.getPropertyValue('--error-color').trim()
      });
    }, 50);
  }

  showToast(msg) {
    if (!this.toastContainer) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    this.toastContainer.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      el.style.transition = 'all 0.3s ease';
      setTimeout(() => el.remove(), 300);
    }, 3200);
  }

  bindEvents() {
    this.wordsInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
    this.wordsInput.addEventListener('input', () => {
      this.wordsInput.value = '';
    });

    this.wordsInput.addEventListener('focus', () => {
      this.focusOverlay.classList.remove('active');
    });
    this.wordsInput.addEventListener('blur', () => {
      if (!this.isFinished) {
        this.focusOverlay.classList.add('active');
      }
    });
    this.focusOverlay.addEventListener('click', () => {
      this.focusInput();
    });
    document.getElementById('test-area').addEventListener('click', () => {
      this.focusInput();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        this.resetTest();
        return;
      }
      if (e.key === 'Escape') {
        this.focusInput();
        return;
      }
      this.highlightVisualKey(e.key, true);
    });

    window.addEventListener('keyup', (e) => {
      this.highlightVisualKey(e.key, false);
    });

    window.addEventListener('resize', () => {
      this.updateCaretPosition();
      this.chart.render();
    });

    document.getElementById('btn-restart').addEventListener('click', () => this.resetTest());
    document.getElementById('btn-next-test').addEventListener('click', () => this.resetTest());
    document.getElementById('btn-repeat-test').addEventListener('click', () => this.repeatCurrentWords());
    document.getElementById('btn-home').addEventListener('click', () => this.resetTest());

    document.getElementById('btn-toggle-keyboard').addEventListener('click', () => {
      this.keyboardSection.classList.toggle('hidden');
      this.focusInput();
    });

    document.getElementById('btn-open-history').addEventListener('click', () => this.openHistoryModal());
    document.getElementById('btn-open-settings').addEventListener('click', () => this.openSettingsModal());

    document.querySelectorAll('.close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close');
        document.getElementById(modalId).classList.remove('open');
        this.focusInput();
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
          this.focusInput();
        }
      });
    });

    document.getElementById('select-sound').addEventListener('change', (e) => {
      this.soundType = e.target.value;
      localStorage.setItem('ketikkilat_sound', this.soundType);
      soundManager.setSoundType(this.soundType);
      soundManager.playKey();
    });

    document.getElementById('sound-volume').addEventListener('input', (e) => {
      this.volume = parseFloat(e.target.value);
      localStorage.setItem('ketikkilat_volume', this.volume);
      soundManager.setVolume(this.volume);
    });

    document.getElementById('theme-grid').addEventListener('click', (e) => {
      const card = e.target.closest('.theme-card');
      if (card) {
        this.applyTheme(card.dataset.theme);
      }
    });

    const modeBtns = document.querySelectorAll('#mode-options .config-btn');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.mode = btn.dataset.mode;
        this.updateSubOptionsUI();
        this.resetTest();
      });
    });

    const langBtns = document.querySelectorAll('#lang-options .config-btn');
    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.language = btn.dataset.lang;
        this.resetTest();
      });
    });

    const subContainer = document.getElementById('sub-options');
    subContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.config-btn');
      if (!btn) return;
      subContainer.querySelectorAll('.config-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const val = parseInt(btn.dataset.val, 10);
      if (this.mode === 'time') {
        this.timeOption = val;
      } else if (this.mode === 'words') {
        this.wordsOption = val;
      }
      this.resetTest();
    });

    const punctBtn = document.getElementById('btn-toggle-punct');
    punctBtn.addEventListener('click', () => {
      this.hasPunctuation = !this.hasPunctuation;
      punctBtn.classList.toggle('active', this.hasPunctuation);
      this.resetTest();
    });

    const numBtn = document.getElementById('btn-toggle-num');
    numBtn.addEventListener('click', () => {
      this.hasNumbers = !this.hasNumbers;
      numBtn.classList.toggle('active', this.hasNumbers);
      this.resetTest();
    });
  }

  updateSubOptionsUI() {
    const subContainer = document.getElementById('sub-options');
    subContainer.innerHTML = '';

    if (this.mode === 'time') {
      [15, 30, 60, 120].forEach(time => {
        const btn = document.createElement('button');
        btn.className = `config-btn ${this.timeOption === time ? 'active' : ''}`;
        btn.dataset.val = time;
        btn.textContent = time;
        subContainer.appendChild(btn);
      });
    } else if (this.mode === 'words') {
      [10, 25, 50, 100].forEach(count => {
        const btn = document.createElement('button');
        btn.className = `config-btn ${this.wordsOption === count ? 'active' : ''}`;
        btn.dataset.val = count;
        btn.textContent = count;
        subContainer.appendChild(btn);
      });
    } else {
      subContainer.innerHTML = `<span style="font-size:0.8rem; color:var(--sub-color); padding:0 0.5rem;">${this.mode === 'quote' ? 'kutipan terpilih' : 'latihan santai'}</span>`;
    }
  }

  highlightVisualKey(key, isActive) {
    if (this.keyboardSection.classList.contains('hidden')) return;

    let targetKey = key;
    if (key === ' ') targetKey = ' ';
    const selector = `.kb-key[data-key="${CSS.escape(targetKey.toLowerCase())}"], .kb-key[data-key="${CSS.escape(targetKey)}"]`;
    const keyEl = this.keyboardSection.querySelector(selector);
    if (keyEl) {
      if (isActive) keyEl.classList.add('active');
      else keyEl.classList.remove('active');
    }
  }

  focusInput() {
    this.wordsInput.focus();
    this.focusOverlay.classList.remove('active');
  }

  generateWordsList() {
    if (this.mode === 'quote') {
      const quotes = this.language === 'indonesia' ? INDONESIAN_QUOTES : ENGLISH_QUOTES;
      const q = quotes[Math.floor(Math.random() * quotes.length)];
      this.activeQuote = q;
      return q.text.split(' ');
    }

    this.activeQuote = null;
    const baseDict = this.language === 'indonesia' ? INDONESIAN_WORDS : ENGLISH_WORDS;
    let count = 50;
    if (this.mode === 'words') count = this.wordsOption;
    else if (this.mode === 'time') count = Math.max(70, Math.ceil(this.timeOption * 4.5));
    else if (this.mode === 'zen') count = 80;

    const list = [];
    for (let i = 0; i < count; i++) {
      let word = baseDict[Math.floor(Math.random() * baseDict.length)];

      if (this.hasPunctuation && Math.random() < 0.22) {
        const marks = [',', '.', '!', '?', ';'];
        const m = marks[Math.floor(Math.random() * marks.length)];
        if (Math.random() < 0.3) {
          word = `"${word}"`;
        } else {
          word = `${word}${m}`;
        }
      }
      if (this.hasNumbers && Math.random() < 0.12) {
        word = Math.floor(Math.random() * 999).toString();
      }

      list.push(word);
    }
    return list;
  }

  resetTest() {
    clearInterval(this.timerInterval);
    clearInterval(this.statsInterval);

    this.isTesting = false;
    this.isFinished = false;
    this.startTime = null;
    this.secondsElapsed = 0;
    this.currentWordIdx = 0;
    this.currentCharIdx = 0;
    this.correctChars = 0;
    this.incorrectChars = 0;
    this.extraChars = 0;
    this.missedChars = 0;
    this.totalKeypresses = 0;
    this.errorsThisSecond = 0;
    this.wpmHistory = [];

    this.gameMain.style.display = 'block';
    this.resultScreen.classList.remove('active');
    this.configBarWrapper.style.opacity = '1';
    this.configBarWrapper.style.pointerEvents = 'auto';

    this.wordsList = this.generateWordsList();
    this.renderWords();

    if (this.mode === 'time') {
      this.timerRemaining = this.timeOption;
      this.liveTimer.textContent = this.timerRemaining;
    } else if (this.mode === 'words') {
      this.liveTimer.textContent = `0/${this.wordsOption}`;
    } else if (this.mode === 'quote') {
      this.liveTimer.textContent = `0/${this.wordsList.length}`;
    } else {
      this.liveTimer.textContent = '0s';
    }

    this.liveWpm.textContent = '0';
    this.liveAcc.textContent = '100%';
    this.liveStats.classList.remove('visible');

    setTimeout(() => {
      this.updateCaretPosition();
      this.focusInput();
    }, 20);
  }

  repeatCurrentWords() {
    clearInterval(this.timerInterval);
    clearInterval(this.statsInterval);

    this.isTesting = false;
    this.isFinished = false;
    this.startTime = null;
    this.secondsElapsed = 0;
    this.currentWordIdx = 0;
    this.currentCharIdx = 0;
    this.correctChars = 0;
    this.incorrectChars = 0;
    this.extraChars = 0;
    this.missedChars = 0;
    this.totalKeypresses = 0;
    this.errorsThisSecond = 0;
    this.wpmHistory = [];

    this.gameMain.style.display = 'block';
    this.resultScreen.classList.remove('active');
    this.configBarWrapper.style.opacity = '1';
    this.configBarWrapper.style.pointerEvents = 'auto';

    this.renderWords();
    this.liveStats.classList.remove('visible');
    setTimeout(() => {
      this.updateCaretPosition();
      this.focusInput();
    }, 20);
  }

  renderWords() {
    this.wordsContainer.innerHTML = '';
    this.wordsContainer.style.transform = 'translateY(0)';
    this.wordsContainer.dataset.translateY = '0';

    this.wordsList.forEach((wordText, wIdx) => {
      const wordDiv = document.createElement('div');
      wordDiv.className = 'word';
      wordDiv.id = `w-${wIdx}`;

      for (let cIdx = 0; cIdx < wordText.length; cIdx++) {
        const charSpan = document.createElement('span');
        charSpan.className = 'char';
        charSpan.textContent = wordText[cIdx];
        wordDiv.appendChild(charSpan);
      }

      this.wordsContainer.appendChild(wordDiv);
    });
  }

  startTest() {
    this.isTesting = true;
    this.startTime = Date.now();
    this.liveStats.classList.add('visible');
    this.configBarWrapper.style.opacity = '0.4';
    this.configBarWrapper.style.pointerEvents = 'none';

    this.statsInterval = setInterval(() => {
      this.secondsElapsed++;

      if (this.mode === 'time') {
        this.timerRemaining--;
        this.liveTimer.textContent = this.timerRemaining;
        if (this.timerRemaining <= 0) {
          this.finishTest();
          return;
        }
      } else if (this.mode === 'zen') {
        this.liveTimer.textContent = `${this.secondsElapsed}s`;
      }

      const mins = this.secondsElapsed / 60;
      const currentNetWpm = Math.max(0, Math.round((this.correctChars / 5) / (mins || 0.001)));
      const currentRawWpm = Math.max(0, Math.round((this.totalKeypresses / 5) / (mins || 0.001)));
      const acc = this.totalKeypresses > 0 
        ? Math.round((this.correctChars / this.totalKeypresses) * 100) 
        : 100;

      this.liveWpm.textContent = currentNetWpm;
      this.liveAcc.textContent = `${acc}%`;

      this.wpmHistory.push({
        second: this.secondsElapsed,
        wpm: currentNetWpm,
        rawWpm: currentRawWpm,
        errors: this.errorsThisSecond
      });

      this.errorsThisSecond = 0;
    }, 1000);
  }

  handleKeyDown(e) {
    if (this.isFinished) return;

    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      return;
    }

    if (!this.isTesting) {
      if (e.key === 'Backspace' || e.key === 'Enter') return;
      this.startTest();
    }

    const currentWordEl = document.getElementById(`w-${this.currentWordIdx}`);
    if (!currentWordEl) return;
    const currentWordText = this.wordsList[this.currentWordIdx];

    this.caret.classList.add('typing');
    clearTimeout(this.caretTypingTimeout);
    this.caretTypingTimeout = setTimeout(() => this.caret.classList.remove('typing'), 400);

    // Backspace
    if (e.key === 'Backspace') {
      e.preventDefault();

      if (e.ctrlKey) {
        const chars = currentWordEl.querySelectorAll('.char');
        chars.forEach((c, idx) => {
          if (idx < currentWordText.length) {
            c.className = 'char';
          } else {
            c.remove();
          }
        });
        this.currentCharIdx = 0;
        this.updateCaretPosition();
        soundManager.playKey();
        return;
      }

      if (this.currentCharIdx > 0) {
        this.currentCharIdx--;
        const chars = currentWordEl.querySelectorAll('.char');
        if (this.currentCharIdx < currentWordText.length) {
          const targetChar = chars[this.currentCharIdx];
          if (targetChar.classList.contains('correct')) this.correctChars--;
          if (targetChar.classList.contains('incorrect')) this.incorrectChars--;
          targetChar.className = 'char';
        } else {
          const extraChar = chars[chars.length - 1];
          if (extraChar) {
            extraChar.remove();
            this.extraChars--;
          }
        }
        soundManager.playKey();
        this.updateCaretPosition();
      }
      return;
    }

    // Spacebar
    if (e.key === ' ') {
      e.preventDefault();
      if (this.currentCharIdx === 0) return;

      this.totalKeypresses++;

      if (this.currentCharIdx < currentWordText.length) {
        currentWordEl.classList.add('error-underline');
        this.missedChars += (currentWordText.length - this.currentCharIdx);
        this.errorsThisSecond++;
        soundManager.playError();
      } else {
        const hasErrors = currentWordEl.querySelector('.incorrect, .extra');
        if (hasErrors) {
          currentWordEl.classList.add('error-underline');
          soundManager.playError();
        } else {
          this.correctChars++;
          soundManager.playKey();
        }
      }

      this.currentWordIdx++;
      this.currentCharIdx = 0;

      if (this.mode === 'words') {
        this.liveTimer.textContent = `${this.currentWordIdx}/${this.wordsOption}`;
      } else if (this.mode === 'quote') {
        this.liveTimer.textContent = `${this.currentWordIdx}/${this.wordsList.length}`;
      }

      if (this.currentWordIdx >= this.wordsList.length) {
        this.finishTest();
        return;
      }

      this.handleWordScroll();
      this.updateCaretPosition();
      return;
    }

    // Printable character
    if (e.key.length === 1) {
      e.preventDefault();
      this.totalKeypresses++;

      const typedChar = e.key;

      if (this.currentCharIdx < currentWordText.length) {
        const expectedChar = currentWordText[this.currentCharIdx];
        const charEl = currentWordEl.children[this.currentCharIdx];

        if (typedChar === expectedChar) {
          charEl.className = 'char correct';
          this.correctChars++;
          soundManager.playKey();
        } else {
          charEl.className = 'char incorrect';
          this.incorrectChars++;
          this.errorsThisSecond++;
          soundManager.playError();
        }
      } else {
        if (this.currentCharIdx < currentWordText.length + 12) {
          const extraSpan = document.createElement('span');
          extraSpan.className = 'char extra';
          extraSpan.textContent = typedChar;
          currentWordEl.appendChild(extraSpan);
          this.extraChars++;
          this.errorsThisSecond++;
          soundManager.playError();
        }
      }

      this.currentCharIdx++;
      this.updateCaretPosition();

      if (this.currentWordIdx === this.wordsList.length - 1 && this.currentCharIdx === currentWordText.length) {
        this.finishTest();
      }
    }
  }

  handleWordScroll() {
    const activeWordEl = document.getElementById(`w-${this.currentWordIdx}`);
    if (!activeWordEl) return;

    const wrapperRect = this.wordsWrapper.getBoundingClientRect();
    const wordRect = activeWordEl.getBoundingClientRect();
    const offsetFromTop = wordRect.top - wrapperRect.top;
    const lineHeight = 44;

    if (offsetFromTop > lineHeight * 1.5) {
      const currentTranslate = parseInt(this.wordsContainer.dataset.translateY || '0', 10);
      const newTranslate = currentTranslate - lineHeight;
      this.wordsContainer.style.transform = `translateY(${newTranslate}px)`;
      this.wordsContainer.dataset.translateY = newTranslate;
    }
  }

  updateCaretPosition() {
    const activeWordEl = document.getElementById(`w-${this.currentWordIdx}`);
    if (!activeWordEl || !this.wordsWrapper) return;

    const wrapperRect = this.wordsWrapper.getBoundingClientRect();
    const chars = activeWordEl.children;

    let targetLeft = 0;
    let targetTop = 0;

    if (this.currentCharIdx < chars.length) {
      const targetChar = chars[this.currentCharIdx];
      const charRect = targetChar.getBoundingClientRect();
      targetLeft = charRect.left - wrapperRect.left;
      targetTop = charRect.top - wrapperRect.top + (charRect.height - 24) / 2;
    } else {
      const lastChar = chars[chars.length - 1];
      if (lastChar) {
        const lastRect = lastChar.getBoundingClientRect();
        targetLeft = lastRect.right - wrapperRect.left;
        targetTop = lastRect.top - wrapperRect.top + (lastRect.height - 24) / 2;
      } else {
        const wordRect = activeWordEl.getBoundingClientRect();
        targetLeft = wordRect.left - wrapperRect.left;
        targetTop = wordRect.top - wrapperRect.top;
      }
    }

    this.caret.style.left = `${Math.round(targetLeft)}px`;
    this.caret.style.top = `${Math.round(targetTop)}px`;
  }

  finishTest() {
    if (this.isFinished) return;
    this.isFinished = true;
    this.isTesting = false;

    clearInterval(this.timerInterval);
    clearInterval(this.statsInterval);

    const totalSeconds = Math.max(1, this.secondsElapsed || 1);
    const totalMinutes = totalSeconds / 60;

    const finalNetWpm = Math.max(0, Math.round((this.correctChars / 5) / totalMinutes));
    const finalRawWpm = Math.max(0, Math.round((this.totalKeypresses / 5) / totalMinutes));
    const accuracy = this.totalKeypresses > 0 
      ? Math.round((this.correctChars / this.totalKeypresses) * 100) 
      : 100;

    const consistency = this.calculateConsistency();
    soundManager.playFinish();

    document.getElementById('res-wpm').textContent = finalNetWpm;
    document.getElementById('res-acc').textContent = `${accuracy}%`;
    document.getElementById('res-raw').textContent = finalRawWpm;
    document.getElementById('res-chars').innerHTML = `
      <span class="c-cor">${this.correctChars}</span> / 
      <span class="c-inc">${this.incorrectChars}</span> / 
      <span class="c-ext">${this.extraChars}</span>
    `;
    document.getElementById('res-consistency').textContent = `${consistency}%`;
    document.getElementById('res-time').textContent = `${totalSeconds}s`;

    let testTypeDesc = `${this.mode} `;
    if (this.mode === 'time') testTypeDesc += `${this.timeOption}s`;
    else if (this.mode === 'words') testTypeDesc += `${this.wordsOption} kata`;
    testTypeDesc += ` | ${this.language}`;

    document.getElementById('res-test-type').textContent = testTypeDesc;

    const authorEl = document.getElementById('res-quote-author');
    if (this.activeQuote) {
      authorEl.textContent = `— ${this.activeQuote.source}`;
      authorEl.style.display = 'block';
    } else {
      authorEl.style.display = 'none';
    }

    this.gameMain.style.display = 'none';
    this.resultScreen.classList.add('active');

    if (this.wpmHistory.length === 0) {
      this.wpmHistory.push({ second: 1, wpm: finalNetWpm, rawWpm: finalRawWpm, errors: 0 });
    }
    this.chart.setData(this.wpmHistory);

    this.saveTestResult({
      date: new Date().toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      wpm: finalNetWpm,
      rawWpm: finalRawWpm,
      accuracy,
      consistency,
      mode: testTypeDesc
    });
  }

  calculateConsistency() {
    if (this.wpmHistory.length < 2) return 100;
    const wpms = this.wpmHistory.map(d => d.wpm);
    const mean = wpms.reduce((a, b) => a + b, 0) / wpms.length;
    if (mean === 0) return 100;

    const variance = wpms.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / wpms.length;
    const stdDev = Math.sqrt(variance);
    const coefficientOfVariation = (stdDev / mean) * 100;
    return Math.max(0, Math.min(100, Math.round(100 - coefficientOfVariation)));
  }

  saveTestResult(record) {
    try {
      const historyStr = localStorage.getItem('ketikkilat_history') || '[]';
      const history = JSON.parse(historyStr);
      history.unshift(record);
      if (history.length > 40) history.pop();
      localStorage.setItem('ketikkilat_history', JSON.stringify(history));

      const pbKey = `ketikkilat_pb_${this.mode}_${this.language}`;
      const prevPb = parseInt(localStorage.getItem(pbKey) || '0', 10);
      if (record.wpm > prevPb) {
        localStorage.setItem(pbKey, record.wpm);
        this.showToast(`🎉 REKOR BARU! WPM Tertinggi Anda: ${record.wpm} WPM!`);
      }
    } catch (e) {
      console.error('Failed to save history', e);
    }
  }

  openHistoryModal() {
    const modal = document.getElementById('modal-history');
    const container = document.getElementById('history-list');
    container.innerHTML = '';

    try {
      const history = JSON.parse(localStorage.getItem('ketikkilat_history') || '[]');
      if (history.length === 0) {
        container.innerHTML = '<div class="history-empty">Belum ada riwayat tes. Selesaikan minimal satu tes untuk melihat rekor Anda!</div>';
      } else {
        history.forEach(item => {
          const row = document.createElement('div');
          row.className = 'history-item';
          row.innerHTML = `
            <div class="history-item-left">
              <span class="hist-wpm">${item.wpm} <span style="font-size:0.75rem; color:var(--sub-color);">WPM</span></span>
              <span class="hist-acc">${item.accuracy}% akurasi</span>
            </div>
            <div class="history-item-right">
              <span>${item.mode}</span>
              <span>${item.date}</span>
            </div>
          `;
          container.appendChild(row);
        });
      }
    } catch (err) {
      container.innerHTML = '<div class="history-empty">Gagal memuat riwayat.</div>';
    }

    modal.classList.add('open');
  }

  openSettingsModal() {
    document.getElementById('modal-settings').classList.add('open');
  }
}

// ==========================================================================
// Safe Bootstrap (runs immediately or on DOM ready)
// ==========================================================================
function bootApp() {
  new TypingGame();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
}
