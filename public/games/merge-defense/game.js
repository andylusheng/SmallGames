(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const c = $('battle');
  const x = c.getContext('2d');
  const waveEl = $('wave');
  const hpEl = $('hp');
  const goldEl = $('gold');
  const phaseLabel = $('phaseLabel');
  const phaseText = $('phaseText');
  const wavePreview = $('wavePreview');
  const bossHud = $('bossHud');
  const bossFill = $('bossFill');
  const bossPct = $('bossPct');
  const warning = $('warning');
  const inspectTitle = $('inspectTitle');
  const message = $('message');
  const startBtn = $('startWave');
  const buyBtn = $('buy');
  const speedBtn = $('speed');
  const mudBtn = $('mud');
  const specialize = $('specialize');
  const catapultBtn = $('catapultBtn');
  const trebuchetBtn = $('trebuchetBtn');
  const toast = $('toast');
  const gameOver = $('gameOver');

  const W = 480;
  const H = 270;
  const FIXED = 1 / 60;
  const COST = 20;
  const STORE = 'merge-defense-medieval-3';

  c.width = W;
  c.height = H;
  x.imageSmoothingEnabled = false;

  // Right-side enemy camp -> winding road -> left-side castle.
  const route = [
    [500,58],[468,60],[442,69],[419,87],[400,108],[381,128],[357,140],[331,142],
    [305,135],[283,120],[265,99],[247,80],[225,68],[202,66],[181,75],[165,92],
    [154,114],[145,137],[129,155],[107,164],[80,160],[52,151],[24,150]
  ];
  const fieldPads = [[438,34],[421,133],[354,100],[318,176],[259,126],[222,35],[172,172],[92,113]];

  let save = { bestWave: 0, totalKills: 0 };
  try { save = { ...save, ...JSON.parse(localStorage.getItem(STORE) || '{}') }; } catch {}

  let pads = Array(8).fill(null);
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
  let shots = [];
  let fx = [];
  let floats = [];
  let spawnQueue = [];
  let spawnCooldown = 0;
  let shake = 0;
  let hitStop = 0;
  let bossIntro = 0;
  let mudPulse = 0;
  let last = performance.now();
  let acc = 0;
  let audio = null;

  const info = (a,b) => { inspectTitle.textContent = a; message.textContent = b; };
  const toastMsg = t => { toast.textContent = t; toast.classList.remove('show'); void toast.offsetWidth; toast.classList.add('show'); };

  function sound(k) {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const map = {
        buy:[310,.05], merge:[560,.12], stone:[190,.06], catapult:[130,.1], trebuchet:[82,.15],
        hit:[120,.035], kill:[390,.05], base:[74,.14], wave:[450,.11], boss:[62,.28],
        mud:[155,.18], focus:[760,.05], error:[130,.07]
      };
      const [f,d] = map[k] || [320,.05];
      const o = audio.createOscillator();
      const g = audio.createGain();
      const n = audio.currentTime;
      o.frequency.value = f;
      o.type = 'square';
      g.gain.setValueAtTime(k === 'boss' ? .06 : .028,n);
      g.gain.exponentialRampToValueAtTime(.001,n+d);
      o.connect(g); g.connect(audio.destination); o.start(n); o.stop(n+d);
    } catch {}
  }

  function tower(level=1,path='stone') { return { level, path, cool:0, aim:Math.PI, pulse:0 }; }
  function same(a,b) { return !!a && !!b && a.level === b.level && a.path === b.path; }

  function stats(t) {
    let damage = 8 + t.level * 5;
    let rate = Math.max(.42,.95 - t.level * .06);
    let range = 96 + Math.min(18,(t.level-1)*4);
    let splash = 12;
    let arc = 26;
    let duration = .48;
    if (t.path === 'catapult') { damage *= 1.45; rate *= 1.12; range += 16; splash = 36; arc = 34; duration = .62; }
    if (t.path === 'trebuchet') { damage *= 2.15; rate *= 1.72; range += 28; splash = 54; arc = 48; duration = .82; }
    return { damage,rate,range,splash,arc,duration };
  }

  function wavePlan(n) {
    if (n === 1) return ['raider','raider','raider','raider'];
    if (n === 2) return ['raider','scout','raider','scout','raider'];
    if (n === 3) return ['raider','knight','raider','scout','knight'];
    if (n === 4) return ['scout','raider','knight','scout','raider','knight','raider'];
    if (n === 5) return ['raider','scout','knight','raider','ogre'];
    const out = [];
    const cnt = Math.min(18,6+n);
    for (let i=0;i<cnt;i++) {
      const r = Math.random();
      out.push(n%5===0 && i===cnt-1 ? 'ogre' : r<.22 ? 'knight' : r<.48 ? 'scout' : 'raider');
    }
    return out;
  }

  function preview(n) {
    const q = {};
    wavePlan(n).forEach(v => q[v] = (q[v] || 0) + 1);
    const labels = { raider:'RAIDER', scout:'SCOUT', knight:'KNIGHT', ogre:'OGRE' };
    return Object.entries(q).map(([k,v]) => `${labels[k]} ×${v}`).join(' · ');
  }

  function refresh() {
    const t = selectedPad !== null ? pads[selectedPad] : null;
    specialize.classList.toggle('show',phase==='prep' && !!t && t.level>=3 && t.path==='stone');
    if (t) {
      const s = stats(t);
      const role = t.path === 'catapult' ? 'SPLASH' : t.path === 'trebuchet' ? 'HEAVY SPLASH' : t.level >= 3 ? 'READY TO SPECIALIZE' : 'STONE THROWER';
      info(`${t.path.toUpperCase()} · LEVEL ${t.level}`,`${role} · DMG ${Math.round(s.damage)} · RANGE ${Math.round(s.range)}`);
    }
  }

  function hud() {
    if (buildMode && (phase!=='prep' || gold<COST || !pads.some(v=>!v))) buildMode = false;
    waveEl.textContent = wave;
    hpEl.textContent = hp;
    goldEl.textContent = gold;
    buyBtn.disabled = phase!=='prep' || gold<COST || !pads.some(v=>!v);
    buyBtn.textContent = buildMode ? 'BUILD MODE · ON' : `BUILD STONE TOWER · ${COST}G`;
    startBtn.disabled = phase!=='prep' || !pads.some(Boolean);
    startBtn.textContent = phase==='prep' ? `START WAVE ${wave}` : 'WAVE RUNNING';
    speedBtn.textContent = `${speed}×`;
    mudBtn.disabled = phase!=='battle' || mudUsed;
    mudBtn.textContent = mudUsed ? 'MUD USED' : 'MUD TRAP';
    wavePreview.textContent = phase==='prep' ? `NEXT · ${preview(wave)}` : `LEFT · ${spawnQueue.length + enemies.filter(e=>!e.dead).length}`;
    refresh();
  }

  buyBtn.onclick = () => {
    if (buyBtn.disabled) return;
    buildMode = !buildMode;
    selectedPad = null;
    info(buildMode ? 'Continuous Build Mode' : 'Build Mode Off',buildMode ? 'Tap several glowing foundations. Build Mode stays on until you stop or run out of gold.' : 'Select towers to inspect, move or merge.');
    hud();
  };
  startBtn.onclick = () => startWave();
  speedBtn.onclick = () => { speed = speed === 1 ? 2 : 1; hud(); };
  catapultBtn.onclick = () => choosePath('catapult');
  trebuchetBtn.onclick = () => choosePath('trebuchet');
  mudBtn.onclick = () => {
    if (mudBtn.disabled) return;
    mudUsed = true;
    mudPulse = .8;
    enemies.forEach(e => { if (!e.dead) e.slow = Math.max(e.slow || 0,2.5); });
    sound('mud'); toastMsg('MUD TRAP!'); info('Road Muddied','All active enemies slowed for 2.5 seconds.'); hud();
  };

  function choosePath(p) {
    if (selectedPad === null) return;
    const t = pads[selectedPad];
    if (!t || t.level < 3 || t.path !== 'stone') return;
    t.path = p;
    sound('merge'); toastMsg(p === 'catapult' ? 'CATAPULT BUILT' : 'TREBUCHET BUILT'); refresh();
  }

  function startWave() {
    if (phase !== 'prep' || !pads.some(Boolean)) return;
    buildMode = false;
    selectedPad = null;
    focusTarget = null;
    focusTimer = 0;
    mudUsed = false;
    phase = 'battle';
    // Use a unique state class. Never reuse the .battle container class here.
    phaseLabel.classList.add('is-battle');
    phaseText.textContent = `WAVE ${wave}`;
    spawnQueue = wavePlan(wave);
    spawnCooldown = .1;
    enemies = [];
    shots = [];
    bossHud.classList.remove('show');
    if (spawnQueue.includes('ogre')) {
      bossIntro = 1.1; warning.classList.add('show'); sound('boss'); setTimeout(()=>warning.classList.remove('show'),950);
    } else sound('wave');
    info(`Wave ${wave}`,'Enemies march RIGHT → LEFT along the winding road. Click an enemy for Focus Fire.');
    hud();
  }

  function pos(e) { const r=c.getBoundingClientRect(); return { x:(e.clientX-r.left)/r.width*W, y:(e.clientY-r.top)/r.height*H }; }
  function padAt(px,py,r=18) { let b=null,d=r; fieldPads.forEach(([x0,y0],i)=>{const q=Math.hypot(px-x0,py-y0);if(q<d){d=q;b=i;}}); return b; }
  function enemyAt(px,py) { let b=null,d=20; for(const e of enemies){if(e.dead)continue;const q=Math.hypot(px-e.x,py-e.y);if(q<d){d=q;b=e;}} return b; }

  c.addEventListener('pointerdown',e=>{
    const p = pos(e);
    if (phase === 'battle') {
      const target = enemyAt(p.x,p.y);
      if (target) { focusTarget=target; focusTimer=3; sound('focus'); toastMsg('FOCUS FIRE'); info('Target Marked','Towers in range prioritize this enemy for 3 seconds.'); return; }
      const i = padAt(p.x,p.y);
      if (i!==null && pads[i]) { selectedPad=i; refresh(); }
      return;
    }
    const i = padAt(p.x,p.y);
    if (i === null) return;
    if (buildMode) {
      if (pads[i]) { sound('error'); info('Foundation Occupied','Choose another glowing foundation.'); return; }
      gold -= COST;
      pads[i] = tower();
      selectedPad = null;
      sound('buy'); toastMsg('STONE TOWER BUILT');
      if (gold<COST || !pads.some(v=>!v)) { buildMode=false; info('Build Complete','No more affordable empty foundations.'); }
      else info('Continuous Build Mode',`Tower built. ${gold} gold left — tap another foundation.`);
      hud(); return;
    }
    if (!pads[i]) { selectedPad=null; info('Build Phase','Press BUILD STONE TOWER once, then place several towers without pressing it again.'); return; }
    selectedPad=i;
    drag={from:i,x:p.x,y:p.y,moved:false};
    dragPos=p;
    c.setPointerCapture?.(e.pointerId);
    refresh();
  });

  c.addEventListener('pointermove',e=>{ if(!drag||phase!=='prep')return; dragPos=pos(e); if(!drag.moved&&Math.hypot(dragPos.x-drag.x,dragPos.y-drag.y)>8)drag.moved=true; });
  c.addEventListener('pointerup',e=>{
    if(!drag||phase!=='prep')return;
    const p=pos(e),from=drag.from,moved=drag.moved,to=padAt(p.x,p.y,24);
    drag=null; dragPos=null;
    if(!moved){selectedPad=from;refresh();return;}
    if(to===null||to===from){info('Move Cancelled','Drop on an empty foundation or matching tower.');return;}
    if(!pads[to]){pads[to]=pads[from];pads[from]=null;selectedPad=to;info('Tower Moved','Selected tower range is shown.');refresh();return;}
    if(same(pads[from],pads[to])){
      const old=pads[to];
      pads[to]=tower(old.level+1,old.path);
      pads[from]=null;
      gold+=4+old.level;
      selectedPad=to;
      fx.push({type:'merge',x:fieldPads[to][0],y:fieldPads[to][1],life:.7});
      sound('merge');toastMsg(`LEVEL ${old.level+1}!`);hud();return;
    }
    sound('error');info('Cannot Merge','Only the same level and type can merge.');
  });
  c.addEventListener('pointercancel',()=>{drag=null;dragPos=null;});

  function enemyData(type) {
    const b=26+wave*9;
    if(type==='scout')return{hp:b*.7,speed:54,reward:7};
    if(type==='knight')return{hp:b*2.15,speed:22,reward:12,armor:.18};
    if(type==='ogre')return{hp:b*7.6,speed:14,reward:45,armor:.2,boss:true};
    return{hp:b,speed:34,reward:6};
  }
  function makeEnemy(type){const d=enemyData(type);return{type,...d,maxHp:d.hp,pathIndex:0,x:route[0][0],y:route[0][1],hit:0,bob:Math.random()*6.28,dead:false,slow:0};}
  function spawn(){const type=spawnQueue.shift();if(!type)return;const e=makeEnemy(type);enemies.push(e);if(e.boss)bossHud.classList.add('show');hud();}

  function move(e,dt){
    if(e.dead)return;
    const n=route[Math.min(e.pathIndex+1,route.length-1)],dx=n[0]-e.x,dy=n[1]-e.y,d=Math.hypot(dx,dy);
    if(d<3){
      if(e.pathIndex>=route.length-2){e.dead=true;hp--;shake=4;sound('base');floats.push({x:30,y:142,text:'CASTLE -1',life:.8,color:'#7f1d1d'});if(hp<=0)endGame();hud();return;}
      e.pathIndex++;return;
    }
    const s=e.speed*(e.slow>0?.42:1)*dt;
    if(e.slow>0)e.slow-=dt;
    e.x+=dx/d*s;e.y+=dy/d*s;e.bob+=dt*5;
  }

  function target(px,py,r){
    if(focusTarget&&!focusTarget.dead&&focusTimer>0&&Math.hypot(focusTarget.x-px,focusTarget.y-py)<=r)return focusTarget;
    let best=null,progress=-1;
    for(const e of enemies){if(e.dead)continue;if(Math.hypot(e.x-px,e.y-py)<=r&&e.pathIndex>progress){best=e;progress=e.pathIndex;}}
    return best;
  }

  function fire(dt){
    pads.forEach((t,i)=>{
      if(!t)return;
      t.cool-=dt;t.pulse=Math.max(0,t.pulse-dt);
      if(t.cool>0)return;
      const[px,py]=fieldPads[i],s=stats(t),e=target(px,py,s.range);
      if(!e)return;
      t.cool=s.rate;t.aim=Math.atan2(e.y-py,e.x-px);t.pulse=.12;
      shots.push({sx:px,sy:py-9,x:px,y:py-9,target:e,tx:e.x,ty:e.y,t:0,...s,kind:t.path,dead:false});
      sound(t.path==='stone'?'stone':t.path);
    });
  }

  function hit(e,dmg,color){if(!e||e.dead)return;const real=dmg*(1-(e.armor||0));e.hp-=real;e.hit=.1;floats.push({x:e.x,y:e.y-13,text:`-${Math.round(real)}`,life:.5,color});if(e.hp<=0)kill(e);}
  function kill(e){
    if(e.dead)return;
    e.dead=true;gold+=e.reward;kills++;save.totalKills=(save.totalKills||0)+1;sound('kill');
    for(let i=0;i<8;i++)fx.push({type:'dust',x:e.x,y:e.y,vx:(Math.random()-.5)*70,vy:(Math.random()-.5)*55,life:.35+Math.random()*.25,color:'#b68c55'});
    floats.push({x:e.x,y:e.y,text:`+${e.reward}g`,life:.65,color:'#5b3708'});
    if(focusTarget===e){focusTarget=null;focusTimer=0;}
    if(e.boss){bossHud.classList.remove('show');shake=7;hitStop=.07;toastMsg('OGRE DOWN!');}
    hud();
  }

  function updateShots(dt){
    for(const p of shots){
      if(p.dead)continue;
      if(p.target&&!p.target.dead){p.tx=p.target.x;p.ty=p.target.y;}
      p.t+=dt/p.duration;
      const q=Math.min(1,p.t);
      p.x=p.sx+(p.tx-p.sx)*q;
      p.y=p.sy+(p.ty-p.sy)*q-Math.sin(q*Math.PI)*p.arc;
      if(q>=1){
        if(p.target&&!p.target.dead)hit(p.target,p.damage,'#7f1d1d');
        for(const e of enemies){if(e.dead||e===p.target)continue;if(Math.hypot(e.x-p.tx,e.y-p.ty)<p.splash)hit(e,p.damage*(p.kind==='stone'?.22:.48),'#9a3412');}
        fx.push({type:'impact',x:p.tx,y:p.ty,life:.34});
        for(let i=0;i<6;i++)fx.push({type:'dust',x:p.tx,y:p.ty,vx:(Math.random()-.5)*80,vy:-10-Math.random()*55,life:.3,color:'#c6a36a'});
        if(p.kind!=='stone'){shake=Math.max(shake,p.kind==='trebuchet'?5:3);hitStop=p.kind==='trebuchet'?.04:.02;}
        sound('hit');p.dead=true;
      }
    }
    shots=shots.filter(p=>!p.dead);
  }

  function updateFx(dt){
    fx.forEach(p=>{p.life-=dt;if(p.vx!==undefined){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=85*dt;}});
    fx=fx.filter(p=>p.life>0);
    floats.forEach(f=>{f.life-=dt;f.y-=18*dt;});
    floats=floats.filter(f=>f.life>0);
    if(mudPulse>0)mudPulse-=dt;
  }

  function persist(){save.bestWave=Math.max(save.bestWave||0,wave);localStorage.setItem(STORE,JSON.stringify(save));}
  function clearWave(){
    phase='prep';phaseLabel.classList.remove('is-battle');phaseText.textContent='PREP';
    const reward=12+wave*3;gold+=reward;persist();toastMsg(`WAVE CLEAR +${reward}g`);wave++;mudUsed=false;focusTarget=null;focusTimer=0;shots=[];
    info('Preparation',`Wave cleared. +${reward}g. Turn on Build Mode and place several towers quickly.`);hud();
  }
  function endGame(){phase='over';persist();$('finalWave').textContent=wave;$('finalKills').textContent=kills;$('bestWave').textContent=save.bestWave;$('overText').textContent=`The castle fell on wave ${wave}.`;gameOver.classList.add('show');}
  $('again').onclick=()=>{
    pads=Array(8).fill(null);selectedPad=null;buildMode=false;phase='prep';wave=1;hp=20;gold=60;kills=0;speed=1;enemies=[];shots=[];fx=[];floats=[];
    gameOver.classList.remove('show');phaseLabel.classList.remove('is-battle');phaseText.textContent='PREP';info('Build Phase','Press BUILD STONE TOWER once, then place several towers.');hud();
  };

  function update(dt){
    updateFx(dt);
    if(phase!=='battle')return;
    if(bossIntro>0){bossIntro-=dt;return;}
    if(focusTimer>0){focusTimer-=dt;if(focusTimer<=0)focusTarget=null;}
    spawnCooldown-=dt;
    if(spawnQueue.length&&spawnCooldown<=0){spawn();spawnCooldown=.62;}
    enemies.forEach(e=>move(e,dt));
    fire(dt);updateShots(dt);
    enemies=enemies.filter(e=>!e.dead);
    if(!spawnQueue.length&&!enemies.length)clearWave();
    const b=enemies.find(e=>e.boss&&!e.dead);
    if(b){const p=Math.max(0,b.hp/b.maxHp);bossFill.style.width=`${p*100}%`;bossPct.textContent=`${Math.ceil(p*100)}%`;}
  }

  const rect=(a,b,w,h,col)=>{x.fillStyle=col;x.fillRect(Math.round(a),Math.round(b),Math.round(w),Math.round(h));};
  function text(t,a,b,col='#fff',s=8,align='left'){x.save();x.fillStyle=col;x.font=`bold ${s}px monospace`;x.textAlign=align;x.textBaseline='middle';x.fillText(t,Math.round(a),Math.round(b));x.restore();}

  function castle(a,b){
    rect(a-17,b-18,34,31,'#77736a');rect(a-14,b-23,7,7,'#928d81');rect(a-3,b-23,7,7,'#928d81');rect(a+8,b-23,7,7,'#928d81');
    rect(a-10,b+2,20,14,'#514a41');rect(a-4,b+5,8,11,'#261d18');rect(a-12,b-11,6,8,'#c9e5f5');rect(a+6,b-11,6,8,'#c9e5f5');rect(a-20,b+16,40,5,'#4a4137');
  }
  function camp(a,b){rect(a-14,b-10,28,21,'#804326');rect(a-10,b-15,20,6,'#aa6538');rect(a-2,b-9,4,14,'#21150e');rect(a+13,b-20,3,32,'#4f2b19');rect(a+16,b-20,13,9,'#c74431');}
  function road(){x.save();x.lineCap='round';x.lineJoin='round';x.strokeStyle='#76502c';x.lineWidth=38;x.beginPath();x.moveTo(route[0][0],route[0][1]);for(let i=1;i<route.length;i++)x.lineTo(route[i][0],route[i][1]);x.stroke();x.strokeStyle='#dfb97b';x.lineWidth=27;x.stroke();x.setLineDash([7,8]);x.strokeStyle='#fff0bf';x.lineWidth=2;x.stroke();x.restore();}
  function map(){
    rect(0,0,W,H,'#93cf6b');
    for(let y=0;y<H;y+=16)for(let q=0;q<W;q+=16)if(((q+y)/16)%2===0)rect(q,y,16,16,'#9bd574');
    road();camp(470,58);castle(28,150);
    text('ENEMY CAMP',442,27,'#5b1f16',8,'center');text('CASTLE',31,187,'#2d271e',8,'center');
  }

  function levelBadge(level,a,b,path){
    const color=path==='trebuchet'?'#a53f25':path==='catapult'?'#b96d19':'#5c451e';
    rect(a-10,b+14,20,10,'#23170d');rect(a-8,b+16,16,6,color);text(`L${level}`,a,b+19,'#fff7df',7,'center');
  }

  function foundation(i){
    const[a,b]=fieldPads[i],t=pads[i],sel=selectedPad===i;
    x.save();
    x.strokeStyle=sel?'#ffe66d':t?'#8a6235':buildMode?'#fff5a8':'#6e9a52';
    x.lineWidth=2;x.setLineDash(t?[]:[3,3]);x.strokeRect(a-13,b-10,26,20);x.setLineDash([]);rect(a-10,b+6,20,5,'#9a7749');
    if(!t){rect(a-6,b,12,6,buildMode?'#f6d77f':'#7cac5b');x.restore();return;}
    if(sel){const s=stats(t);x.strokeStyle='#fff5b099';x.lineWidth=1;x.beginPath();x.arc(a,b,s.range,0,Math.PI*2);x.stroke();}
    drawTower(t,a,b,drag&&drag.from===i&&drag.moved?.45:1);
    levelBadge(t.level,a,b,t.path);
    x.restore();
  }

  function drawStoneTower(t,a,b){
    const lv=t.level;
    const h=lv===1?12:lv===2?17:22;
    const w=lv===1?15:lv===2?20:24;
    const baseY=b+6;
    const stone=lv===1?'#9b927f':lv===2?'#8e897d':'#7c7973';
    rect(a-w/2,baseY-h,w,h,stone);
    rect(a-w/2-2,baseY-4,w+4,4,'#685842');
    if(lv===1){rect(a-w/2,baseY-h-4,5,5,'#b5aa93');rect(a+w/2-5,baseY-h-4,5,5,'#b5aa93');}
    else if(lv===2){rect(a-w/2,baseY-h-5,5,6,'#b8ae99');rect(a-2,baseY-h-5,4,6,'#b8ae99');rect(a+w/2-5,baseY-h-5,5,6,'#b8ae99');rect(a-3,baseY-h+5,6,7,'#3d342c');}
    else {rect(a-w/2,baseY-h-6,5,7,'#c3b9a6');rect(a-3,baseY-h-6,6,7,'#c3b9a6');rect(a+w/2-5,baseY-h-6,5,7,'#c3b9a6');rect(a-5,baseY-h+6,10,9,'#352d27');rect(a+w/2+2,baseY-h-9,2,13,'#5b3a20');rect(a+w/2+4,baseY-h-9,8,5,'#d3a42a');}
    x.strokeStyle='#5f3c21';x.lineWidth=lv>=3?3:2;x.beginPath();x.moveTo(a,baseY-h+2);const len=8+lv*2,ang=t.aim||Math.PI;x.lineTo(a+Math.cos(ang)*len,baseY-h+2+Math.sin(ang)*len*.45);x.stroke();
    rect(a-2,baseY-h-4-(lv>=3?2:0),4,4,'#6e5d49');
  }

  function drawCatapult(t,a,b){
    const scale=1+Math.min(3,t.level-3)*.08;
    const w=26*scale;
    rect(a-w/2,b-4,w,9,'#8b5c2c');rect(a-w/2+3,b-8,w-6,5,'#b57a3f');
    rect(a-w/2+2,b+4,6,6,'#3b2a1d');rect(a+w/2-8,b+4,6,6,'#3b2a1d');
    rect(a-w/2+4,b+5,4,4,'#d6b06b');rect(a+w/2-8,b+5,4,4,'#d6b06b');
    x.strokeStyle='#5d351b';x.lineWidth=3;x.beginPath();x.moveTo(a-2,b-7);const ang=t.aim||Math.PI,len=16+Math.min(4,t.level)*2;x.lineTo(a+Math.cos(ang)*len,b-10+Math.sin(ang)*len*.5);x.stroke();
    rect(a+Math.cos(ang)*len-3,b-12+Math.sin(ang)*len*.5,7,6,'#604a35');
    rect(a-3,b-13,6,5,'#c99245');
  }

  function drawTrebuchet(t,a,b){
    const extra=Math.min(4,t.level-3);
    rect(a-14,b+3,28,7,'#7a4b26');rect(a-12,b+8,6,4,'#3a291c');rect(a+6,b+8,6,4,'#3a291c');
    rect(a-10,b-18-extra,4,23+extra,'#8a5a2c');rect(a+6,b-18-extra,4,23+extra,'#8a5a2c');
    x.strokeStyle='#a8753a';x.lineWidth=3;x.beginPath();x.moveTo(a-8,b+3);x.lineTo(a,b-13-extra);x.lineTo(a+8,b+3);x.stroke();
    const ang=t.aim||Math.PI,len=23+extra*2;x.strokeStyle='#513019';x.lineWidth=4;x.beginPath();x.moveTo(a,b-14-extra);x.lineTo(a+Math.cos(ang)*len,b-14-extra+Math.sin(ang)*len*.45);x.stroke();
    rect(a-Math.cos(ang)*7-4,b-11-extra-Math.sin(ang)*3,8,9,'#5b4634');
    rect(a+8,b-23-extra,2,12,'#5b351b');rect(a+10,b-23-extra,9,5,'#b63f2d');
  }

  function drawTower(t,a,b,alpha=1){
    x.save();x.globalAlpha=alpha;
    if(t.path==='catapult')drawCatapult(t,a,b);
    else if(t.path==='trebuchet')drawTrebuchet(t,a,b);
    else drawStoneTower(t,a,b);
    if(t.pulse>0){x.strokeStyle='#fff0a8';x.lineWidth=2;x.strokeRect(a-14,b-25,28,34);}
    x.restore();
  }

  function drawEnemy(e){
    const a=Math.round(e.x),b=Math.round(e.y+Math.sin(e.bob)),white=e.hit>0?'#fff':null;
    if(e.type==='scout'){rect(a-5,b-6,10,12,white||'#d8a83d');rect(a-3,b-10,6,5,'#7b3f23');}
    else if(e.type==='knight'){rect(a-8,b-8,16,16,white||'#8c9298');rect(a-5,b-12,10,5,'#d5d9dd');}
    else if(e.type==='ogre'){rect(a-13,b-13,26,26,white||'#657c39');rect(a-9,b-18,18,7,'#879a4a');}
    else{rect(a-6,b-7,12,14,white||'#9b5b36');rect(a-4,b-11,8,5,'#6b321f');}
    const bw=e.boss?30:18;rect(a-bw/2,b-(e.boss?24:16),bw,3,'#5e2f28');rect(a-bw/2,b-(e.boss?24:16),bw*Math.max(0,e.hp/e.maxHp),3,e.boss?'#b35d35':'#477c32');
    if(focusTarget===e&&focusTimer>0){x.strokeStyle='#ffe985';x.lineWidth=2;x.strokeRect(a-12,b-12,24,24);}
    if(e.slow>0)rect(a-4,b+11,8,3,'#6d4b2d');
  }

  function drawFx(){
    for(const p of fx){x.save();const a=Math.max(0,Math.min(1,p.life/.45));x.globalAlpha=a;if(p.type==='impact'){x.strokeStyle='#6d4a2c';x.lineWidth=2;const s=18*(1-a);x.strokeRect(p.x-s,p.y-s,s*2,s*2);}else if(p.type==='merge'){x.strokeStyle='#fff18c';x.lineWidth=3;const s=26*(1-p.life/.7);x.strokeRect(p.x-s,p.y-s,s*2,s*2);text('UP!',p.x,p.y-22,'#5b3708',9,'center');}else rect(p.x,p.y,3,3,p.color||'#d1b37c');x.restore();}
    for(const f of floats)text(f.text,f.x,f.y,f.color,8,'center');
    if(mudPulse>0){x.strokeStyle='#704a29';x.lineWidth=3;const r=(1-mudPulse/.8)*260;x.beginPath();x.arc(W/2,H/2,r,0,Math.PI*2);x.stroke();}
  }

  function draw(){
    x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.globalCompositeOperation='source-over';x.filter='none';x.clearRect(0,0,W,H);
    x.save();
    if(shake>0){x.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);shake=Math.max(0,shake-.35);}
    map();fieldPads.forEach((_,i)=>foundation(i));enemies.forEach(drawEnemy);
    for(const p of shots){const s=p.kind==='trebuchet'?7:p.kind==='catapult'?5:4;rect(p.x-s/2,p.y-s/2,s,s,p.kind==='trebuchet'?'#4f4033':p.kind==='catapult'?'#63513e':'#76644d');}
    drawFx();
    if(drag&&drag.moved&&dragPos&&pads[drag.from])drawTower(pads[drag.from],dragPos.x,dragPos.y,.8);
    x.restore();x.globalAlpha=1;x.filter='none';
  }

  function loop(now){
    const frame=Math.min(.05,(now-last)/1000);last=now;
    if(hitStop>0)hitStop-=frame;
    else{acc+=frame*speed;while(acc>=FIXED){update(FIXED);acc-=FIXED;}}
    enemies.forEach(e=>e.hit=Math.max(0,e.hit-frame));
    draw();requestAnimationFrame(loop);
  }

  info('Build Phase','Press BUILD STONE TOWER once, then place several towers. Enemies enter from the RIGHT; defend the CASTLE on the LEFT.');
  hud();requestAnimationFrame(loop);
})();