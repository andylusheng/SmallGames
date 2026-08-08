(() => {
  'use strict';

  const canvas = document.getElementById('battle');
  const ctx = canvas.getContext('2d');
  const waveEl = document.getElementById('wave');
  const hpEl = document.getElementById('hp');
  const goldEl = document.getElementById('gold');
  const phaseLabel = document.getElementById('phaseLabel');
  const phaseText = document.getElementById('phaseText');
  const wavePreview = document.getElementById('wavePreview');
  const bossHud = document.getElementById('bossHud');
  const bossFill = document.getElementById('bossFill');
  const bossPct = document.getElementById('bossPct');
  const warning = document.getElementById('warning');
  const inspectTitle = document.getElementById('inspectTitle');
  const message = document.getElementById('message');
  const startBtn = document.getElementById('startWave');
  const buyBtn = document.getElementById('buy');
  const speedBtn = document.getElementById('speed');
  const mudBtn = document.getElementById('mud');
  const specialize = document.getElementById('specialize');
  const catapultBtn = document.getElementById('catapultBtn');
  const trebuchetBtn = document.getElementById('trebuchetBtn');
  const toast = document.getElementById('toast');
  const gameOver = document.getElementById('gameOver');

  canvas.width = 480;
  canvas.height = 270;
  ctx.imageSmoothingEnabled = false;

  const W = 480;
  const H = 270;
  const FIXED = 1 / 60;
  const STORE = 'merge-defense-medieval-1';
  const PAD_COUNT = 8;

  // Enemies always enter from the RIGHT and march toward the castle on the LEFT.
  const route = [[500,66],[390,66],[390,126],[274,126],[274,82],[146,82],[146,154],[26,154]];
  const fieldPads = [[432,108],[352,34],[338,158],[300,54],[238,160],[194,46],[112,118],[70,198]];
  const grassBits = [[20,32],[58,218],[103,33],[145,216],[181,28],[221,226],[286,209],[326,24],[365,220],[423,33],[451,214],[30,194],[171,236],[307,188]];

  let save = { bestWave: 0, totalKills: 0 };
  try { save = { ...save, ...JSON.parse(localStorage.getItem(STORE) || '{}') }; } catch {}

  let pads = Array(PAD_COUNT).fill(null);
  let selectedPad = null;
  let buildMode = false;
  let drag = null;
  let dragPos = null;
  let phase = 'prep';
  let wave = 1;
  let hp = 20;
  let gold = 60;
  let kills = 0;
  let speed = 1;
  let mudUsed = false;
  let focusTarget = null;
  let focusTimer = 0;
  let enemies = [];
  let projectiles = [];
  let particles = [];
  let floaters = [];
  let spawnQueue = [];
  let spawnCooldown = 0;
  let shake = 0;
  let hitStop = 0;
  let bossIntro = 0;
  let mudPulse = 0;
  let lastTime = performance.now();
  let accumulator = 0;
  let audio = null;

  function persist() {
    save.bestWave = Math.max(save.bestWave || 0, wave);
    localStorage.setItem(STORE, JSON.stringify(save));
  }

  function tower(level = 1, path = 'stone') {
    return { level, path, cool: 0, aim: Math.PI, pulse: 0 };
  }

  function sameTower(a, b) {
    return !!a && !!b && a.level === b.level && a.path === b.path;
  }

  function statsFor(t) {
    let damage = 8 + t.level * 5;
    let rate = Math.max(.42, .95 - t.level * .06);
    let range = 96;
    let splash = 12;
    let arc = 26;
    let duration = .48;
    if (t.path === 'catapult') {
      damage *= 1.45;
      rate *= 1.12;
      range = 112;
      splash = 36;
      arc = 34;
      duration = .62;
    }
    if (t.path === 'trebuchet') {
      damage *= 2.15;
      rate *= 1.72;
      range = 128;
      splash = 54;
      arc = 48;
      duration = .82;
    }
    return { damage, rate, range, splash, arc, duration };
  }

  function sound(kind) {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const map = {
        buy:[310,.05,'square'], merge:[560,.12,'triangle'], stone:[190,.06,'triangle'],
        catapult:[130,.10,'sawtooth'], trebuchet:[82,.15,'sawtooth'], hit:[120,.035,'square'],
        kill:[390,.05,'triangle'], base:[74,.14,'sawtooth'], wave:[450,.11,'triangle'],
        boss:[62,.28,'sawtooth'], mud:[155,.18,'triangle'], focus:[760,.05,'square'], error:[130,.07,'square']
      };
      const [f,d,type] = map[kind] || [320,.05,'square'];
      const o = audio.createOscillator();
      const g = audio.createGain();
      const now = audio.currentTime;
      o.type = type;
      o.frequency.value = f;
      g.gain.setValueAtTime(kind === 'boss' ? .06 : .028, now);
      g.gain.exponentialRampToValueAtTime(.001, now + d);
      o.connect(g); g.connect(audio.destination); o.start(now); o.stop(now + d);
    } catch {}
  }

  function vibrate(pattern) { try { navigator.vibrate?.(pattern); } catch {} }
  function showToast(text) { toast.textContent = text; toast.classList.remove('show'); void toast.offsetWidth; toast.classList.add('show'); }
  function setInfo(title, text) { inspectTitle.textContent = title; message.textContent = text; }

  function wavePlan(n) {
    if (n === 1) return ['raider','raider','raider','raider'];
    if (n === 2) return ['raider','scout','raider','scout','raider'];
    if (n === 3) return ['raider','knight','raider','scout','knight'];
    if (n === 4) return ['scout','raider','knight','scout','raider','knight','raider'];
    if (n === 5) return ['raider','scout','knight','raider','ogre'];
    if (n === 6) return ['scout','scout','scout','scout','raider','scout','scout'];
    if (n === 7) return ['knight','knight','raider','knight','scout','knight'];
    if (n === 8) return ['raider','scout','knight','raider','scout','knight','raider','scout','knight'];
    if (n === 9) return ['scout','knight','scout','knight','raider','scout','knight','scout','knight','raider'];
    if (n === 10) return ['knight','scout','knight','raider','scout','knight','ogre'];
    const count = Math.min(18, 6 + n);
    const out = [];
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      out.push(n % 5 === 0 && i === count - 1 ? 'ogre' : r < .22 ? 'knight' : r < .48 ? 'scout' : 'raider');
    }
    return out;
  }

  function previewText(n) {
    const c = {};
    wavePlan(n).forEach(x => c[x] = (c[x] || 0) + 1);
    const labels = { raider:'RAIDER', scout:'SCOUT', knight:'KNIGHT', ogre:'OGRE' };
    return Object.entries(c).map(([k,v]) => `${labels[k]} ×${v}`).join(' · ');
  }

  function updateHud() {
    waveEl.textContent = wave;
    hpEl.textContent = hp;
    goldEl.textContent = gold;
    buyBtn.disabled = phase !== 'prep' || gold < 20 || !pads.some(x => !x);
    startBtn.disabled = phase !== 'prep' || !pads.some(Boolean);
    startBtn.textContent = phase === 'prep' ? `START WAVE ${wave}` : 'WAVE RUNNING';
    speedBtn.textContent = `${speed}×`;
    mudBtn.disabled = phase !== 'battle' || mudUsed;
    mudBtn.textContent = mudUsed ? 'MUD USED' : 'MUD TRAP';
    wavePreview.textContent = phase === 'prep' ? `NEXT · ${previewText(wave)}` : `LEFT · ${spawnQueue.length + enemies.filter(e => !e.dead).length}`;
    refreshSpecialize();
  }

  function refreshSpecialize() {
    const t = selectedPad !== null ? pads[selectedPad] : null;
    specialize.classList.toggle('show', phase === 'prep' && !!t && t.level >= 3 && t.path === 'stone');
    if (t) {
      const s = statsFor(t);
      const style = t.path === 'catapult' ? 'medium boulder + splash' : t.path === 'trebuchet' ? 'huge boulder + wide splash' : 'fast thrown stones';
      setInfo(`${t.path.toUpperCase()} · LEVEL ${t.level}`, `DMG ${Math.round(s.damage)} · RANGE ${s.range}px · ${style}`);
    }
  }

  buyBtn.onclick = () => {
    if (phase !== 'prep' || gold < 20) return;
    buildMode = !buildMode;
    selectedPad = null;
    setInfo(buildMode ? 'Choose Tower Pad' : 'Build Cancelled', buildMode ? 'Tap a glowing empty foundation beside the road.' : 'Buy a Stone Tower when ready.');
    updateHud();
  };

  startBtn.onclick = () => startWave();
  speedBtn.onclick = () => { speed = speed === 1 ? 2 : 1; updateHud(); };
  catapultBtn.onclick = () => choosePath('catapult');
  trebuchetBtn.onclick = () => choosePath('trebuchet');
  mudBtn.onclick = () => {
    if (phase !== 'battle' || mudUsed) return;
    mudUsed = true;
    mudPulse = .8;
    enemies.forEach(e => { if (!e.dead) e.slow = Math.max(e.slow || 0, 2.5); });
    sound('mud'); vibrate([25,20,25]); showToast('MUD TRAP!');
    setInfo('Road Muddied', 'All active enemies are slowed for 2.5 seconds.');
    updateHud();
  };

  function choosePath(pathName) {
    if (selectedPad === null) return;
    const t = pads[selectedPad];
    if (!t || t.level < 3 || t.path !== 'stone') return;
    t.path = pathName;
    sound('merge');
    showToast(pathName === 'catapult' ? 'CATAPULT BUILT' : 'TREBUCHET BUILT');
    refreshSpecialize();
  }

  function startWave() {
    if (phase !== 'prep' || !pads.some(Boolean)) return;
    buildMode = false;
    selectedPad = null;
    focusTarget = null;
    focusTimer = 0;
    mudUsed = false;
    phase = 'battle';
    phaseLabel.classList.add('battle');
    phaseText.textContent = `WAVE ${wave}`;
    spawnQueue = wavePlan(wave);
    spawnCooldown = .1;
    enemies = [];
    projectiles = [];
    bossHud.classList.remove('show');
    if (spawnQueue.includes('ogre')) {
      bossIntro = 1.25;
      warning.classList.add('show');
      sound('boss');
      setTimeout(() => warning.classList.remove('show'), 1050);
    } else sound('wave');
    setInfo(`Wave ${wave}`, 'Enemies march RIGHT → LEFT. Click an enemy to Focus Fire; use Mud Trap once per wave.');
    updateHud();
  }

  function pointerPos(e) {
    const r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * W, y: (e.clientY - r.top) / r.height * H };
  }

  function padAt(x, y, radius = 18) {
    let best = null, bestD = radius;
    fieldPads.forEach(([px,py],i) => {
      const d = Math.hypot(x - px, y - py);
      if (d < bestD) { best = i; bestD = d; }
    });
    return best;
  }

  function enemyAt(x, y) {
    let best = null, bestD = 20;
    for (const e of enemies) {
      if (e.dead) continue;
      const d = Math.hypot(x - e.x, y - e.y);
      if (d < bestD) { best = e; bestD = d; }
    }
    return best;
  }

  canvas.addEventListener('pointerdown', e => {
    const p = pointerPos(e);
    if (phase === 'battle') {
      const target = enemyAt(p.x,p.y);
      if (target) {
        focusTarget = target;
        focusTimer = 3;
        sound('focus');
        showToast('FOCUS FIRE');
        setInfo('Target Marked', 'Towers in range prioritize this enemy for 3 seconds.');
        return;
      }
      const pi = padAt(p.x,p.y);
      if (pi !== null && pads[pi]) { selectedPad = pi; refreshSpecialize(); }
      return;
    }

    const pi = padAt(p.x,p.y);
    if (pi === null) return;
    if (buildMode) {
      if (pads[pi]) { sound('error'); setInfo('Foundation Occupied','Choose an empty foundation.'); return; }
      gold -= 20;
      pads[pi] = tower();
      selectedPad = pi;
      buildMode = false;
      sound('buy');
      showToast('STONE TOWER BUILT');
      updateHud();
      return;
    }
    if (!pads[pi]) {
      selectedPad = null;
      setInfo('Build Phase', 'Enemies enter on the RIGHT and attack the CASTLE on the LEFT.');
      return;
    }
    selectedPad = pi;
    drag = { from:pi, startX:p.x, startY:p.y, moved:false };
    dragPos = p;
    canvas.setPointerCapture?.(e.pointerId);
    refreshSpecialize();
  });

  canvas.addEventListener('pointermove', e => {
    if (!drag || phase !== 'prep') return;
    dragPos = pointerPos(e);
    if (!drag.moved && Math.hypot(dragPos.x - drag.startX, dragPos.y - drag.startY) > 8) drag.moved = true;
  });

  canvas.addEventListener('pointerup', e => {
    if (!drag || phase !== 'prep') return;
    const p = pointerPos(e);
    const from = drag.from;
    const moved = drag.moved;
    const to = padAt(p.x,p.y,24);
    drag = null; dragPos = null;
    if (!moved) { selectedPad = from; refreshSpecialize(); return; }
    if (to === null || to === from) { setInfo('Move Cancelled','Drop on an empty foundation or matching tower.'); return; }
    if (!pads[to]) {
      pads[to] = pads[from]; pads[from] = null; selectedPad = to;
      setInfo('Tower Moved','Selected tower range is shown on the battlefield.'); refreshSpecialize(); return;
    }
    if (sameTower(pads[from],pads[to])) {
      const old = pads[to];
      pads[to] = tower(old.level + 1, old.path);
      pads[from] = null;
      gold += 4 + old.level;
      selectedPad = to;
      particles.push({ type:'merge', x:fieldPads[to][0], y:fieldPads[to][1], life:.55 });
      sound('merge'); showToast(`LEVEL ${old.level + 1}!`); updateHud(); return;
    }
    sound('error'); setInfo('Cannot Merge','Only towers with the same level and type can merge.');
  });

  canvas.addEventListener('pointercancel', () => { drag = null; dragPos = null; });

  function enemyData(type) {
    const base = 26 + wave * 9;
    if (type === 'scout') return { hp:base*.7, speed:54, reward:7, size:8 };
    if (type === 'knight') return { hp:base*2.15, speed:22, reward:12, size:12, armor:.18 };
    if (type === 'ogre') return { hp:base*7.6, speed:14, reward:45, size:18, armor:.20, boss:true };
    return { hp:base, speed:34, reward:6, size:9 };
  }

  function makeEnemy(type) {
    const d = enemyData(type);
    return { type, ...d, maxHp:d.hp, pathIndex:0, x:route[0][0], y:route[0][1], hit:0, bob:Math.random()*6.28, dead:false, slow:0 };
  }

  function spawnEnemy() {
    const type = spawnQueue.shift();
    if (!type) return;
    const e = makeEnemy(type);
    enemies.push(e);
    if (e.boss) bossHud.classList.add('show');
    updateHud();
  }

  function moveEnemy(e, dt) {
    if (e.dead) return;
    const next = route[Math.min(e.pathIndex + 1, route.length - 1)];
    const dx = next[0] - e.x, dy = next[1] - e.y;
    const d = Math.hypot(dx,dy);
    if (d < 3) {
      if (e.pathIndex >= route.length - 2) { damageBase(e); return; }
      e.pathIndex++;
      return;
    }
    const slow = e.slow > 0 ? .42 : 1;
    if (e.slow > 0) e.slow -= dt;
    const step = e.speed * slow * dt;
    e.x += dx / d * step;
    e.y += dy / d * step;
    e.bob += dt * 5;
  }

  function damageBase(e) {
    e.dead = true;
    hp--;
    shake = Math.max(shake, 4);
    sound('base');
    floaters.push({ x:32, y:132, text:'CASTLE -1', life:.8, color:'#b91c1c' });
    if (hp <= 0) endGame();
    updateHud();
  }

  function progress(e) { return e.pathIndex + (W - e.x) / W; }

  function targetForTower(px, py, range) {
    if (focusTarget && !focusTarget.dead && focusTimer > 0 && Math.hypot(focusTarget.x-px,focusTarget.y-py) <= range) return focusTarget;
    let best = null, bestProgress = -Infinity;
    for (const e of enemies) {
      if (e.dead) continue;
      if (Math.hypot(e.x-px,e.y-py) <= range) {
        const p = progress(e);
        if (p > bestProgress) { best = e; bestProgress = p; }
      }
    }
    return best;
  }

  function fireTowers(dt) {
    pads.forEach((t,i) => {
      if (!t) return;
      t.cool -= dt;
      t.pulse = Math.max(0,(t.pulse||0)-dt);
      if (t.cool > 0) return;
      const [px,py] = fieldPads[i];
      const s = statsFor(t);
      const target = targetForTower(px,py,s.range);
      if (!target) return;
      t.cool = s.rate;
      t.aim = Math.atan2(target.y-py,target.x-px);
      t.pulse = .12;
      projectiles.push({ sx:px, sy:py-9, x:px, y:py-9, target, tx:target.x, ty:target.y, t:0, duration:s.duration, arc:s.arc, damage:s.damage, splash:s.splash, kind:t.path, dead:false });
      sound(t.path === 'stone' ? 'stone' : t.path);
    });
  }

  function hitEnemy(e, damage, color) {
    if (!e || e.dead) return;
    const real = damage * (1 - (e.armor || 0));
    e.hp -= real;
    e.hit = .1;
    floaters.push({ x:e.x, y:e.y-13, text:`-${Math.round(real)}`, life:.5, color });
    if (e.hp <= 0) killEnemy(e);
  }

  function killEnemy(e) {
    if (e.dead) return;
    e.dead = true;
    gold += e.reward;
    kills++;
    save.totalKills = (save.totalKills || 0) + 1;
    sound('kill');
    const color = e.type === 'scout' ? '#f1c75b' : e.type === 'knight' ? '#a6a6a6' : e.boss ? '#6e7d34' : '#9b5d35';
    for (let i = 0; i < 10; i++) particles.push({ type:'dust', x:e.x, y:e.y, vx:(Math.random()-.5)*70, vy:(Math.random()-.5)*55, life:.35+Math.random()*.25, color });
    floaters.push({ x:e.x, y:e.y, text:`+${e.reward}g`, life:.65, color:'#8a5a12' });
    if (focusTarget === e) { focusTarget = null; focusTimer = 0; }
    if (e.boss) { bossHud.classList.remove('show'); shake = 7; hitStop = .07; showToast('OGRE DOWN!'); }
    updateHud();
  }

  function updateProjectiles(dt) {
    for (const p of projectiles) {
      if (p.dead) continue;
      if (p.target && !p.target.dead) { p.tx = p.target.x; p.ty = p.target.y; }
      p.t += dt / p.duration;
      const q = Math.min(1,p.t);
      p.x = p.sx + (p.tx - p.sx) * q;
      p.y = p.sy + (p.ty - p.sy) * q - Math.sin(q * Math.PI) * p.arc;
      if (q >= 1) {
        const impactX = p.tx, impactY = p.ty;
        const color = p.kind === 'trebuchet' ? '#5b4631' : p.kind === 'catapult' ? '#6d563b' : '#786447';
        if (p.target && !p.target.dead) hitEnemy(p.target,p.damage,'#7c2d12');
        for (const e of enemies) {
          if (e.dead || e === p.target) continue;
          if (Math.hypot(e.x-impactX,e.y-impactY) < p.splash) hitEnemy(e,p.damage*(p.kind==='stone'?.22:.48),'#9a3412');
        }
        particles.push({ type:'impact', x:impactX, y:impactY, life:.34, color });
        for (let i=0;i<7;i++) particles.push({ type:'dust', x:impactX, y:impactY, vx:(Math.random()-.5)*80, vy:-10-Math.random()*55, life:.28+Math.random()*.25, color:'#c6a36a' });
        if (p.kind !== 'stone') { shake = Math.max(shake,p.kind==='trebuchet'?5:3); hitStop = p.kind==='trebuchet'?.04:.02; }
        sound('hit');
        p.dead = true;
      }
    }
    projectiles = projectiles.filter(p => !p.dead);
  }

  function updateFx(dt) {
    particles.forEach(p => { p.life -= dt; if (p.vx !== undefined) { p.x += p.vx*dt; p.y += p.vy*dt; p.vy += 85*dt; } });
    particles = particles.filter(p => p.life > 0);
    floaters.forEach(f => { f.life -= dt; f.y -= 18*dt; });
    floaters = floaters.filter(f => f.life > 0);
    if (mudPulse > 0) mudPulse -= dt;
  }

  function waveClear() {
    phase = 'prep';
    phaseLabel.classList.remove('battle');
    phaseText.textContent = 'PREP';
    const reward = 12 + wave * 3;
    gold += reward;
    persist();
    showToast(`WAVE CLEAR +${reward}g`);
    wave++;
    mudUsed = false;
    focusTarget = null;
    focusTimer = 0;
    projectiles = [];
    setInfo('Preparation',`Wave cleared. +${reward}g. Merge or reposition towers before the next attack.`);
    updateHud();
  }

  function endGame() {
    phase = 'over';
    persist();
    document.getElementById('finalWave').textContent = wave;
    document.getElementById('finalKills').textContent = kills;
    document.getElementById('bestWave').textContent = save.bestWave;
    document.getElementById('overText').textContent = `The castle fell on wave ${wave}. Merge earlier and save Mud Trap for dense waves.`;
    gameOver.classList.add('show');
  }

  document.getElementById('again').onclick = () => {
    pads = Array(PAD_COUNT).fill(null);
    selectedPad = null; buildMode = false; phase = 'prep'; wave = 1; hp = 20; gold = 60; kills = 0; speed = 1;
    enemies = []; projectiles = []; particles = []; floaters = [];
    gameOver.classList.remove('show'); phaseLabel.classList.remove('battle'); phaseText.textContent = 'PREP';
    setInfo('Build Phase','Enemies enter from the RIGHT. Defend the CASTLE on the LEFT.'); updateHud();
  };

  function update(dt) {
    updateFx(dt);
    if (phase !== 'battle') return;
    if (bossIntro > 0) { bossIntro -= dt; return; }
    if (focusTimer > 0) { focusTimer -= dt; if (focusTimer <= 0) focusTarget = null; }
    spawnCooldown -= dt;
    if (spawnQueue.length && spawnCooldown <= 0) { spawnEnemy(); spawnCooldown = .62; }
    for (const e of enemies) moveEnemy(e,dt);
    fireTowers(dt);
    updateProjectiles(dt);
    enemies = enemies.filter(e => !e.dead);
    if (phase === 'battle' && !spawnQueue.length && !enemies.length) waveClear();
    const boss = enemies.find(e => e.boss && !e.dead);
    if (boss) {
      const p = Math.max(0,boss.hp/boss.maxHp);
      bossFill.style.width = `${p*100}%`;
      bossPct.textContent = `${Math.ceil(p*100)}%`;
    }
  }

  function rect(x,y,w,h,color) { ctx.fillStyle = color; ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h)); }
  function pixelText(text,x,y,color='#fff',size=8,align='left') { ctx.save(); ctx.fillStyle=color; ctx.font=`bold ${size}px monospace`; ctx.textAlign=align; ctx.textBaseline='middle'; ctx.fillText(text,Math.round(x),Math.round(y)); ctx.restore(); }

  function drawArrow(x,y) {
    ctx.fillStyle='#76562e'; ctx.beginPath(); ctx.moveTo(x+5,y-4); ctx.lineTo(x-5,y); ctx.lineTo(x+5,y+4); ctx.closePath(); ctx.fill();
  }

  function drawCastle(x,y) {
    rect(x-15,y-17,30,30,'#6f6b60'); rect(x-12,y-20,6,6,'#817c70'); rect(x-2,y-20,6,6,'#817c70'); rect(x+8,y-20,6,6,'#817c70');
    rect(x-9,y+3,18,12,'#514a41'); rect(x-4,y+5,8,10,'#271f1a'); rect(x-11,y-11,5,7,'#b9d4e7'); rect(x+6,y-11,5,7,'#b9d4e7');
    rect(x-18,y+15,36,4,'#4a4137');
  }

  function drawCamp(x,y) {
    rect(x-13,y-10,26,20,'#7a4026'); rect(x-9,y-14,18,5,'#9c5a35'); rect(x-2,y-9,4,13,'#21150e');
    rect(x+12,y-18,3,30,'#4f2b19'); rect(x+15,y-18,12,8,'#b53a2b');
  }

  function drawMap() {
    rect(0,0,W,H,'#82b65c');
    for(let y=0;y<H;y+=16) for(let x=0;x<W;x+=16) if(((x+y)/16)%2===0) rect(x,y,16,16,'#8abd62');
    grassBits.forEach(([x,y],i) => { rect(x,y,3,3,i%2?'#4f8b3f':'#5c9947'); if(i%3===0) rect(x+4,y+2,2,4,'#a7cf72'); });
    ctx.save(); ctx.lineCap='square'; ctx.lineJoin='miter';
    ctx.strokeStyle='#7b552f'; ctx.lineWidth=38; ctx.beginPath(); ctx.moveTo(route[0][0],route[0][1]); for(let i=1;i<route.length;i++) ctx.lineTo(route[i][0],route[i][1]); ctx.stroke();
    ctx.strokeStyle='#d7ae70'; ctx.lineWidth=27; ctx.stroke();
    ctx.setLineDash([7,7]); ctx.strokeStyle='#f0d39b'; ctx.lineWidth=2; ctx.stroke(); ctx.restore();
    drawArrow(430,66); drawArrow(330,126); drawArrow(214,82); drawArrow(88,154);
    drawCamp(469,66); drawCastle(27,154);
    pixelText('SPAWN',448,42,'#73301f',7,'center'); pixelText('CASTLE',30,185,'#3f3428',7,'center');
  }

  function drawFoundation(i) {
    const [x,y] = fieldPads[i];
    const t = pads[i];
    const selected = selectedPad === i;
    ctx.save();
    ctx.strokeStyle = selected ? '#f7df76' : t ? '#74522f' : buildMode ? '#fff1a8' : '#6d914d';
    ctx.lineWidth = 2;
    ctx.setLineDash(t ? [] : [3,3]);
    ctx.strokeRect(x-12,y-9,24,18);
    ctx.setLineDash([]);
    rect(x-9,y+5,18,4,'#8a6a42');
    if (!t) { rect(x-5,y,10,5,buildMode?'#f0cf7c':'#709a50'); ctx.restore(); return; }
    if (selected) {
      const s = statsFor(t);
      ctx.strokeStyle = '#fff3b066'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x,y,s.range,0,Math.PI*2); ctx.stroke();
    }
    drawTower(t,x,y,drag&&drag.from===i&&drag.moved?.45:1);
    pixelText(`L${t.level}`,x,y+17,'#5e3f1f',7,'center');
    ctx.restore();
  }

  function drawTower(t,x,y,alpha=1) {
    ctx.save(); ctx.globalAlpha = alpha;
    const cat = t.path==='catapult';
    const treb = t.path==='trebuchet';
    // Stone base + wooden throwing frame.
    rect(x-9,y-5,18,11,treb?'#6b5540':cat?'#826342':'#8e8170');
    rect(x-7,y-9,14,5,'#b09a7d');
    rect(x-6,y-13,3,7,'#6b4427'); rect(x+3,y-13,3,7,'#6b4427');
    ctx.strokeStyle = treb?'#5b341d':'#6f4728'; ctx.lineWidth = treb?3:2; ctx.beginPath(); ctx.moveTo(x,y-8); const len=treb?12:cat?10:8; const a=t.aim||Math.PI; ctx.lineTo(x+Math.cos(a)*len,y-8+Math.sin(a)*len*.45); ctx.stroke();
    if (treb) rect(x-3,y-18,6,5,'#564638'); else if(cat) rect(x-3,y-16,6,4,'#6f5a43'); else rect(x-2,y-15,4,3,'#75634d');
    if (t.pulse>0) rect(x-2,y-3,4,4,'#fff1b8');
    ctx.restore();
  }

  function drawEnemy(e) {
    const x=Math.round(e.x), y=Math.round(e.y+Math.sin(e.bob)*1), hit=e.hit>0;
    if(e.type==='scout'){
      rect(x-5,y-6,10,12,hit?'#fff':'#d8a83d'); rect(x-3,y-10,6,5,'#7b3f23'); rect(x-7,y+5,4,3,'#5b3924'); rect(x+3,y+5,4,3,'#5b3924');
    } else if(e.type==='knight'){
      rect(x-8,y-8,16,16,hit?'#fff':'#8c9298'); rect(x-5,y-12,10,5,'#b9bec2'); rect(x-11,y-5,5,11,'#62676b'); rect(x+7,y-4,5,9,'#5a381f');
    } else if(e.type==='ogre'){
      rect(x-13,y-13,26,26,hit?'#fff':'#657c39'); rect(x-9,y-18,18,7,'#879a4a'); rect(x-17,y-5,6,15,'#4f6430'); rect(x+11,y-5,6,15,'#4f6430'); rect(x-5,y+8,10,7,'#6a3f25');
    } else {
      rect(x-6,y-7,12,14,hit?'#fff':'#9b5b36'); rect(x-4,y-11,8,5,'#6b321f'); rect(x-9,y-3,4,8,'#7c432b'); rect(x+5,y-3,4,8,'#7c432b');
    }
    const bw=e.boss?30:18; rect(x-bw/2,y-(e.boss?24:16),bw,3,'#5e2f28'); rect(x-bw/2,y-(e.boss?24:16),bw*Math.max(0,e.hp/e.maxHp),3,e.boss?'#b35d35':'#477c32');
    if(focusTarget===e&&focusTimer>0){ctx.strokeStyle='#ffe985';ctx.lineWidth=2;ctx.strokeRect(x-12,y-12,24,24)}
    if(e.slow>0) rect(x-3,y+11,6,3,'#6d4b2d');
  }

  function drawProjectiles() {
    for(const p of projectiles){
      const size=p.kind==='trebuchet'?7:p.kind==='catapult'?5:4;
      ctx.fillStyle=p.kind==='trebuchet'?'#4f4033':p.kind==='catapult'?'#63513e':'#76644d';
      ctx.fillRect(Math.round(p.x-size/2),Math.round(p.y-size/2),size,size);
      if(p.kind!=='stone'){ctx.fillStyle='#d9bd83';ctx.fillRect(Math.round(p.x)-1,Math.round(p.y)+size/2,2,2)}
    }
  }

  function drawFx() {
    for(const p of particles){
      const alpha=Math.max(0,Math.min(1,p.life/.45));
      ctx.globalAlpha=alpha;
      if(p.type==='impact'){
        ctx.strokeStyle='#6d4a2c';ctx.lineWidth=2;const s=18*(1-alpha);ctx.strokeRect(p.x-s,p.y-s,s*2,s*2);
      } else if(p.type==='merge'){
        ctx.strokeStyle='#f7d66c';const s=22*p.life/.55;ctx.strokeRect(p.x-s,p.y-s,s*2,s*2);
      } else rect(p.x,p.y,3,3,p.color||'#d1b37c');
      ctx.globalAlpha=1;
    }
    for(const f of floaters) pixelText(f.text,f.x,f.y,f.color,7,'center');
    if(mudPulse>0){ctx.strokeStyle='#704a29';ctx.lineWidth=3;const r=(1-mudPulse/.8)*260;ctx.beginPath();ctx.arc(W/2,H/2,r,0,Math.PI*2);ctx.stroke()}
  }

  function draw() {
    // Hard reset the canvas state every frame so battle can never inherit a dimmed alpha/filter state.
    ctx.setTransform(1,0,0,1,0,0);
    ctx.globalAlpha=1;
    ctx.globalCompositeOperation='source-over';
    ctx.clearRect(0,0,W,H);
    ctx.save();
    if(shake>0){ctx.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);shake=Math.max(0,shake-.35)}
    drawMap();
    fieldPads.forEach((_,i)=>drawFoundation(i));
    enemies.forEach(drawEnemy);
    drawProjectiles();
    drawFx();
    if(drag&&drag.moved&&dragPos&&pads[drag.from]){
      drawTower(pads[drag.from],dragPos.x,dragPos.y,.8);
      const to=padAt(dragPos.x,dragPos.y,24);
      if(to!==null&&to!==drag.from&&sameTower(pads[drag.from],pads[to])){ctx.strokeStyle='#f7df76';ctx.lineWidth=2;ctx.strokeRect(fieldPads[to][0]-14,fieldPads[to][1]-11,28,22)}
    }
    ctx.restore();
  }

  function loop(now) {
    const frame=Math.min(.05,(now-lastTime)/1000); lastTime=now;
    if(hitStop>0) hitStop-=frame;
    else { accumulator+=frame*speed; while(accumulator>=FIXED){update(FIXED);accumulator-=FIXED;} }
    enemies.forEach(e=>e.hit=Math.max(0,e.hit-frame));
    draw();
    requestAnimationFrame(loop);
  }

  setInfo('Build Phase','Enemies enter from the RIGHT. Defend the CASTLE on the LEFT.');
  updateHud();
  requestAnimationFrame(loop);
})();