(() => {
  const stage = document.getElementById('stage');
  const busNode = c => document.getElementById('bus-' + c);
  const buzz = pattern => { try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (_) {} };

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
    if (state && state.busTransition) return;
    return coreAutoWaiting();
  };

  const coreTapPassenger = window.tapPassenger;
  window.tapPassenger = function(...args) {
    if (state && state.busTransition) return;
    return coreTapPassenger(...args);
  };

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
      if (!state.locked) coreAutoWaiting();
      render();
      toast('NEW ' + color.toUpperCase() + ' BUS ARRIVED');
      buzz(18);
    }, 1640);
  };

  const coreCheckWin = window.checkWin;
  window.checkWin = function() {
    const before = state && state.locked;
    const out = coreCheckWin();
    if (!before && state && state.locked && state.boarded >= state.target) buzz([30, 40, 30, 40, 80]);
    return out;
  };
})();