(() => {
  const stage = document.getElementById('stage');
  const busNode = c => document.getElementById('bus-' + c);
  const pauseOverlay = document.getElementById('pauseOverlay');
  const pauseHit = document.getElementById('pauseHit');
  const soundHit = document.getElementById('soundHit');
  const soundState = document.getElementById('soundState');
  const resumeButton = document.getElementById('resumeButton');
  const restartPauseButton = document.getElementById('restartPauseButton');
  let muted = localStorage.getItem('busQueueMuted') === '1';
  let soundTimer;

  const buzz = pattern => { try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (_) {} };
  const coreSfx = window.sfx;
  window.sfx = function(type) { if (!muted) return coreSfx(type); };

  function showSoundState() {
    if (!soundState) return;
    soundState.textContent = muted ? '×' : '♪';
    soundState.classList.toggle('muted', muted);
    soundState.classList.add('show');
    clearTimeout(soundTimer);
    soundTimer = setTimeout(() => soundState.classList.remove('show'), 650);
  }

  function setPaused(value) {
    if (!state || state.locked) return;
    state.paused = value;
    stage.classList.toggle('paused', value);
    pauseOverlay.classList.toggle('show', value);
    if (value) buzz(10);
  }

  if (pauseHit) pauseHit.addEventListener('click', () => setPaused(true));
  if (resumeButton) resumeButton.addEventListener('click', () => setPaused(false));
  if (restartPauseButton) restartPauseButton.addEventListener('click', () => {
    setPaused(false);
    restartLevel();
  });
  if (soundHit) soundHit.addEventListener('click', () => {
    muted = !muted;
    localStorage.setItem('busQueueMuted', muted ? '1' : '0');
    showSoundState();
    if (!muted) coreSfx('tool');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && state && !state.locked) setPaused(!state.paused);
  });

  function pulseBus(color) {
    const node = busNode(color);
    if (!node) return;
    node.classList.remove('board-pulse');
    void node.offsetWidth;
    node.classList.add('board-pulse');
    setTimeout(() => node.classList.remove('board-pulse'), 300);
  }

  const coreAnimatePerson = window.animatePerson;
  window.animatePerson = function(type, sx, sy, dx, dy, done) {
    let targetColor = null;
    for (const [color, pos] of Object.entries(busPos)) {
      if (Math.abs(pos[0] - dx) < 4 && Math.abs(pos[1] - dy) < 4) { targetColor = color; break; }
    }
    return coreAnimatePerson(type, sx, sy, dx, dy, () => {
      if (targetColor) { pulseBus(targetColor); buzz(12); }
      if (done) done();
    });
  };

  const coreAutoWaiting = window.autoWaiting;
  window.autoWaiting = function() {
    if (state && (state.busTransition || state.paused)) return;
    return coreAutoWaiting();
  };

  const coreTapPassenger = window.tapPassenger;
  window.tapPassenger = function(...args) {
    if (state && (state.busTransition || state.paused)) return;
    const before = state ? state.moves : null;
    const out = coreTapPassenger(...args);
    if (state && before !== state.moves) {
      const moves = document.getElementById('movesLabel');
      moves.classList.remove('move-tick');
      void moves.offsetWidth;
      moves.classList.add('move-tick');
      setTimeout(() => moves.classList.remove('move-tick'), 260);
    }
    return out;
  };

  ['useShuffle','useExtraSlot','useRefresh'].forEach(name => {
    const core = window[name];
    window[name] = function(...args) {
      if (state && (state.busTransition || state.paused)) return;
      buzz(10);
      return core(...args);
    };
  });

  window.busFull = function(color) {
    if (!state || state.busTransition) return;
    state.busTransition = true;
    state.capacities[color] = 12;
    stage.classList.add('bus-transition');
    render();
    sfx('bus');
    buzz([25, 35, 35]);

    const node = busNode(color);
    const [x, y] = busPos[color];
    if (node) {
      node.classList.remove('board-pulse', 'depart', 'arrive');
      node.classList.add('full-celebrate');
    }

    const badge = document.createElement('div');
    badge.className = 'bus-status';
    badge.textContent = 'FULL!';
    badge.style.left = x / W * 100 + '%';
    badge.style.top = (y - 38) / H * 100 + '%';
    stage.appendChild(badge);
    burst(x, y, 18);

    setTimeout(() => {
      if (node) {
        node.classList.remove('full-celebrate');
        node.classList.add('depart');
      }
      toast(color.toUpperCase() + ' BUS DEPARTING');
    }, 420);

    setTimeout(() => {
      state.capacities[color] = 0;
      if (node) {
        node.classList.remove('depart');
        node.classList.add('arrive');
      }
      const cap = document.getElementById('cap-' + color);
      if (cap) cap.textContent = '0/12';
    }, 1030);

    setTimeout(() => {
      if (node) node.classList.remove('arrive');
      badge.remove();
      state.busTransition = false;
      stage.classList.remove('bus-transition');
      if (!state.locked && !state.paused) coreAutoWaiting();
      render();
      toast('NEW ' + color.toUpperCase() + ' BUS ARRIVED');
      buzz(18);
    }, 1640);
  };

  const coreLose = window.lose;
  window.lose = function() {
    if (stage && stage.animate) stage.animate([
      {transform:'translateX(0)'},{transform:'translateX(-5px)'},{transform:'translateX(5px)'},{transform:'translateX(-3px)'},{transform:'translateX(0)'}
    ],{duration:280,easing:'ease-out'});
    buzz([35,35,70]);
    return coreLose();
  };

  const coreCheckWin = window.checkWin;
  window.checkWin = function() {
    const before = state && state.locked;
    const out = coreCheckWin();
    if (!before && state && state.locked && state.boarded >= state.target) buzz([30, 40, 30, 40, 80]);
    return out;
  };
})();