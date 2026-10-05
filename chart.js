// Canvas chart renderer for typing performance analysis
export class TypingChart {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.data = []; // [{ second: 1, wpm: 60, rawWpm: 65, errors: 0 }]
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

    // Handle HiDPI
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

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

    // Calculate maximum WPM value
    let maxWpm = 0;
    this.data.forEach(d => {
      if (d.wpm > maxWpm) maxWpm = d.wpm;
      if (d.rawWpm > maxWpm) maxWpm = d.rawWpm;
    });
    maxWpm = Math.max(40, Math.ceil((maxWpm + 10) / 20) * 20);

    // Draw horizontal grid lines and Y-axis labels
    const gridSteps = 4;
    this.ctx.strokeStyle = this.themeColors.grid;
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = this.themeColors.sub;
    this.ctx.font = '11px "JetBrains Mono", monospace';
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

    // Draw X-axis timestamps
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

    // 1. Draw Raw WPM Line (dashed or subtle)
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

    // 2. Draw Net WPM Area Gradient & Line
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
    // Complete polygon for gradient fill
    const lastX = getX(this.data.length - 1);
    const firstX = getX(0);
    this.ctx.lineTo(lastX, padding.top + chartH);
    this.ctx.lineTo(firstX, padding.top + chartH);
    this.ctx.closePath();
    this.ctx.fillStyle = grad;
    this.ctx.fill();

    // Net WPM stroke line
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

    // 3. Draw Errors Markers
    this.data.forEach((d, idx) => {
      if (d.errors > 0) {
        const x = getX(idx);
        const y = getY(d.wpm);
        this.ctx.fillStyle = this.themeColors.error;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 4, 0, Math.PI * 2);
        this.ctx.fill();

        // draw tiny cross marker
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 1.5;
        this.ctx.beginPath();
        this.ctx.moveTo(x - 2, y - 2);
        this.ctx.lineTo(x + 2, y + 2);
        this.ctx.moveTo(x + 2, y - 2);
        this.ctx.lineTo(x - 2, y + 2);
        this.ctx.stroke();
      }
    });

    // 4. Hover Indicator & Tooltip
    if (this.hoverIndex >= 0 && this.hoverIndex < this.data.length) {
      const d = this.data[this.hoverIndex];
      const hx = getX(this.hoverIndex);
      const hy = getY(d.wpm);

      // Vertical guide line
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      this.ctx.lineWidth = 1;
      this.ctx.moveTo(hx, padding.top);
      this.ctx.lineTo(hx, padding.top + chartH);
      this.ctx.stroke();

      // Glowing active dot
      this.ctx.beginPath();
      this.ctx.arc(hx, hy, 5, 0, Math.PI * 2);
      this.ctx.fillStyle = this.themeColors.primary;
      this.ctx.fill();
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      // Render tooltip card
      const tipText = `${d.second}s | WPM: ${d.wpm} | Raw: ${d.rawWpm} | Err: ${d.errors}`;
      this.ctx.font = '12px "JetBrains Mono", monospace';
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
