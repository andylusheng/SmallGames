(() => {
  'use strict';
  const cfg = window.ZP_GAME || { slug: 'cascade-solitaire', title: 'Cascade Solitaire' };
  const root = document.getElementById('app');
  const KEY = `zp:${cfg.slug}:best`;
  let best = Number(localStorage.getItem(KEY) || 0) || 0;
  const suits = ['♠', '♥'];
  const red = new Set(['♥']);
  const rankName = (r) => r === 1 ? 'A' : r === 11 ? 'J' : r === 12 ? 'Q' : r === 13 ? 'K' : String(r);
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  root.innerHTML = `<div class="zp-shell">
    <header class="zp-hud">
      <div class="zp-title-wrap"><span class="zp-dot"></span><div><strong>${esc(cfg.title)}</strong><small>Build descending runs · clear same-suit K→A sequences</small></div></div>
      <div class="zp-stats"><div><span>Cleared</span><b id="score">0/4</b></div><div><span>Best</span><b id="best">${best}/4</b></div><button id="restart" aria-label="Restart">↻</button></div>
    </header>
    <main id="stage" class="zp-stage dom-stage"></main>
    <div id="toast" class="zp-toast" aria-live="polite"></div>
    <div id="end" class="zp-end" hidden><div class="zp-end-card"><small id="end-kicker">RUN COMPLETE</small><h2 id="end-title"></h2><p id="end-copy"></p><button id="again">Play Again</button></div></div>
  </div>`;

  const stage = document.getElementById('stage');
  const scoreEl = document.getElementById('score');
  const bestEl = document.getElementById('best');
  const toastEl = document.getElementById('toast');
  const endEl = document.getElementById('end');
  let toastTimer = 0;
  let cols = [];
  let stock = [];
  let cleared = 0;
  let selected = null;
  let ended = false;

  function emit(event, data = {}) {
    try { parent.postMessage({ type: 'zeroplay-game-event', event, slug: cfg.slug, ...data }, '*'); } catch (_) {}
  }
  function toast(text, tone = 'good') {
    clearTimeout(toastTimer);
    toastEl.textContent = text;
    toastEl.dataset.tone = tone;
    toastEl.classList.add('show');
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 850);
  }
  function setProgress() {
    scoreEl.textContent = `${cleared}/4`;
    if (cleared > best) {
      best = cleared;
      localStorage.setItem(KEY, String(best));
      bestEl.textContent = `${best}/4`;
    }
  }
  function finish(title, copy, success = false) {
    if (ended) return;
    ended = true;
    document.getElementById('end-title').textContent = title;
    document.getElementById('end-copy').textContent = copy;
    document.getElementById('end-kicker').textContent = success ? 'BOARD CLEARED' : 'RUN COMPLETE';
    endEl.hidden = false;
    emit('game_end', { score: cleared * 100, success });
  }
  function cardHtml(c, picked = false) {
    return `<button class="card ${red.has(c.s) ? 'red' : ''} ${picked ? 'picked' : ''}" data-id="${esc(c.id)}"><span>${rankName(c.r)}</span><i>${c.s}</i></button>`;
  }
  function makeDeck() {
    const d = [];
    for (const s of suits) for (let copy = 0; copy < 2; copy++) for (let r = 1; r <= 13; r++) d.push({ s, r, id: `${s}-${copy}-${r}` });
    return shuffle(d);
  }
  function isMovableRun(col, start) {
    if (start < 0 || start >= col.length) return false;
    for (let i = start; i < col.length - 1; i++) {
      if (col[i].s !== col[i + 1].s || col[i].r !== col[i + 1].r + 1) return false;
    }
    return true;
  }
  function canPlace(run, target) {
    if (!run.length) return false;
    const top = target.at(-1);
    return !top || top.r === run[0].r + 1;
  }
  function collapse(colIndex) {
    const col = cols[colIndex];
    if (col.length < 13) return false;
    const run = col.slice(-13);
    const s = run[0].s;
    if (run.every((c, i) => c.s === s && c.r === 13 - i)) {
      col.splice(-13);
      cleared += 1;
      setProgress();
      toast('Complete sequence cleared!');
      if (cleared === 4) finish('Cascade Cleared', 'All four same-suit King-to-Ace sequences were removed.', true);
      return true;
    }
    return false;
  }
  function hasMove() {
    if (stock.length) return true;
    for (let from = 0; from < cols.length; from++) {
      const col = cols[from];
      for (let start = 0; start < col.length; start++) {
        if (!isMovableRun(col, start)) continue;
        const run = col.slice(start);
        for (let to = 0; to < cols.length; to++) {
          if (to !== from && canPlace(run, cols[to])) return true;
        }
      }
    }
    return false;
  }
  function render() {
    stage.innerHTML = `<div class="card-game cascade">
      <div class="card-top">
        <button class="stock wide" data-deal ${stock.length ? '' : 'disabled'}>${stock.length ? 'Deal row' : 'Stock empty'}<small>${stock.length} cards</small></button>
        <div class="clear-meter">Cleared <b>${cleared}/4</b></div>
      </div>
      <div class="tableau eight">${cols.map((col, ci) => `<div class="lane" data-col="${ci}">${col.map((c, i) => cardHtml(c, selected?.col === ci && selected.start === i)).join('')}</div>`).join('')}</div>
      <div class="game-note">Tap any card that begins a same-suit descending run, then tap a destination lane. Empty lanes accept any run.</div>
    </div>`;
  }
  function dealRow() {
    if (!stock.length || ended) return;
    const count = Math.min(cols.length, stock.length);
    for (let i = 0; i < count; i++) cols[i].push(stock.pop());
    selected = null;
    for (let i = 0; i < cols.length; i++) collapse(i);
    render();
    if (!ended && !hasMove()) finish('No Moves Left', `You cleared ${cleared} of 4 sequences.`);
  }
  function start() {
    ended = false;
    endEl.hidden = true;
    cleared = 0;
    selected = null;
    const deck = makeDeck();
    cols = Array.from({ length: 8 }, () => []);
    for (let i = 0; i < 40; i++) cols[i % 8].push(deck.pop());
    stock = deck;
    setProgress();
    render();
    emit('runtime_ready');
  }

  stage.addEventListener('click', (e) => {
    if (ended) return;
    if (e.target.closest('[data-deal]')) { dealRow(); return; }
    const lane = e.target.closest('[data-col]');
    if (!lane) return;
    const colIndex = Number(lane.dataset.col);
    const cardButton = e.target.closest('[data-id]');

    if (!selected) {
      if (!cardButton) return;
      const startIndex = cols[colIndex].findIndex((c) => c.id === cardButton.dataset.id);
      if (!isMovableRun(cols[colIndex], startIndex)) {
        toast('Only same-suit descending runs can move', 'bad');
        return;
      }
      selected = { col: colIndex, start: startIndex };
      render();
      return;
    }

    if (selected.col === colIndex && cardButton) {
      const startIndex = cols[colIndex].findIndex((c) => c.id === cardButton.dataset.id);
      if (isMovableRun(cols[colIndex], startIndex)) selected = { col: colIndex, start: startIndex };
      render();
      return;
    }

    const source = cols[selected.col];
    const run = source.slice(selected.start);
    if (!canPlace(run, cols[colIndex])) {
      toast('Destination must be one rank higher', 'bad');
      selected = null;
      render();
      return;
    }
    source.splice(selected.start);
    cols[colIndex].push(...run);
    selected = null;
    collapse(colIndex);
    render();
    if (!ended && !hasMove()) finish('No Moves Left', `You cleared ${cleared} of 4 sequences.`);
  });

  document.getElementById('restart').addEventListener('click', () => { emit('game_restart_internal'); start(); });
  document.getElementById('again').addEventListener('click', () => { emit('game_restart_internal'); start(); });
  start();
})();