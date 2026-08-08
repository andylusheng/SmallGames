(() => {
  'use strict';
  const canvas = document.getElementById('battle');
  const ctx = canvas.getContext('2d');
  const tray = document.getElementById('tray');
  const waveEl = document.getElementById('wave');
  const hpEl = document.getElementById('hp');
  const goldEl = document.getElementById('gold');
  const phaseLabel = document.getElementById('phaseLabel');
  const phaseText = document.getElementById('phaseText');
  const bossHud = document.getElementById('bossHud');
  const bossFill = document.getElementById('bossFill');
  const bossPct = document.getElementById('bossPct');
  const warning = document.getElementById('warning');
  const message = document.getElementById('message');
  const startBtn = document.getElementById('startWave');
  const buyBtn = document.getElementById('buy');
  const speedBtn = document.getElementById('speed');
  const specialize = document.getElementById('specialize');
  const rapidBtn = document.getElementById('rapidBtn');
  const blastBtn = document.getElementById('blastBtn');
  const toast = document.getElementById('toast');
  const gameOver = document.getElementById('gameOver');

  const STORE = 'merge-defense-rebuild-1';
  const SLOT_COUNT = 10;
  const ASSET_PATH = './assets/';
  const assetNames = ['drone','runner','tank','boss','tower-core','tower-rapid','tower-blast','base'];
  const assets = {};
  for (const name of assetNames) {
    const img = new Image();
    img.src = `${ASSET_PATH}${name}.svg`;
    assets[name] = img;
  }

  let save = { bestWave: 0, totalKills: 0 };
  try { save = { ...save, ...JSON.parse(localStorage.getItem(STORE) || '{}') }; } catch {}

  let towers = Array(SLOT_COUNT).fill(null);
  let selected = null;
  let dragging = null;
  let dragGhost = null;
  let phase = 'prep';
  let wave = 1;
  let hp = 20;
  let gold = 60;
  let kills = 0;
  let speed = 1;
  let enemies = [];
  let projectiles = [];
  let particles = [];
  let floaters = [];
  let spawnQueue = [];
  let spawnCooldown = 0;
  let waveTotal = 0;
  let shake = 0;
  let hitStop = 0;
  let bossIntro = 0;
  let lastTime = performance.now();
  let accumulator = 0;
  let audio = null;
  const FIXED = 1 / 60;

  const path = [
    {x: 1.05, y: .20}, {x: .77, y: .20}, {x: .68, y: .36},
    {x: .46, y: .36}, {x: .37, y: .58}, {x: .19, y: .58}, {x: .10, y: .72}
  ];
  const towerPoints = [
    [.84,.50],[.78,.09],[.64,.60],[.58,.23],[.48,.72],
    [.38,.17],[.29,.48],[.22,.78],[.18,.30],[.72,.78]
  ];
  const decor = [[.90,.76,18],[.86,.69,9],[.54,.10,12],[.31,.14,8],[.43,.86,15],[.07,.34,10],[.57,.82,8]];

  function persist(){
    save.bestWave = Math.max(save.bestWave || 0, wave);
    localStorage.setItem(STORE, JSON.stringify(save));
  }
  function tower(level=1,path='core'){ return { level, path }; }
  function towerSprite(t){ return t.path === 'rapid' ? 'tower-rapid' : t.path === 'blast' ? 'tower-blast' : 'tower-core'; }
  function sameTower(a,b){ return !!a && !!b && a.level === b.level && a.path === b.path; }
  function statsFor(t){
    let damage = 7 + t.level * 4.5;
    let rate = Math.max(.26, .78 - t.level * .07);
    let range = .25;
    let splash = 0;
    if (t.path === 'rapid') { damage *= .58; rate *= .43; range = .27; }
    if (t.path === 'blast') { damage *= 1.45; rate *= 1.25; range = .24; splash = .085; }
    return {damage,rate,range,splash};
  }

  function sound(kind){
    try{
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const now = audio.currentTime;
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      const map = {
        buy:[340,.05,'triangle'], merge:[620,.12,'triangle'], rapid:[760,.035,'square'],
        blast:[120,.11,'sawtooth'], hit:[180,.025,'square'], kill:[420,.06,'triangle'],
        coin:[880,.045,'sine'], base:[95,.13,'sawtooth'], wave:[520,.12,'triangle'], boss:[72,.28,'sawtooth']
      };
      const [f,d,type] = map[kind] || [420,.05,'sine'];
      osc.type = type;
      osc.frequency.value = f;
      gain.gain.setValueAtTime(kind === 'boss' ? .07 : .035, now);
      gain.gain.exponentialRampToValueAtTime(.001, now+d);
      osc.connect(gain); gain.connect(audio.destination); osc.start(now); osc.stop(now+d);
      if(kind === 'merge'){
        const o2=audio.createOscillator(),g2=audio.createGain();
        o2.type='sine'; o2.frequency.value=f*1.5;
        g2.gain.setValueAtTime(.02,now+.04); g2.gain.exponentialRampToValueAtTime(.001,now+d+.06);
        o2.connect(g2); g2.connect(audio.destination); o2.start(now+.04); o2.stop(now+d+.06);
      }
    }catch{}
  }
  function vibrate(p){ try{ navigator.vibrate?.(p); }catch{} }
  function showToast(text){
    toast.textContent=text;
    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');
  }
  function setMessage(text){ message.textContent=text; }
  function updateHud(){
    waveEl.textContent=wave;
    hpEl.textContent=hp;
    goldEl.textContent=gold;
    buyBtn.disabled=phase!=='prep'||gold<20;
    startBtn.disabled=phase!=='prep';
    startBtn.textContent=phase==='prep'?`Start Wave ${wave}`:'Wave Running';
  }

  function renderTray(){
    tray.innerHTML='';
    towers.forEach((t,i)=>{
      const el=document.createElement('button');
      el.className='tower-slot'+(t?'':' empty')+(selected===i?' selected':'');
      el.dataset.index=i;
      if(t){
        const img=document.createElement('img');
        img.src=`${ASSET_PATH}${towerSprite(t)}.svg`;
        img.alt='';
        el.appendChild(img);
        const pathTag=document.createElement('span');
        pathTag.className='path';
        pathTag.textContent=t.path.toUpperCase();
        el.appendChild(pathTag);
        const lvl=document.createElement('span');
        lvl.className='level';
        lvl.textContent=`L${t.level}`;
        el.appendChild(lvl);
      }
      el.addEventListener('pointerdown', e=>onSlotDown(e,i));
      el.addEventListener('click', ()=>selectSlot(i));
      tray.appendChild(el);
    });
    const t = selected!==null ? towers[selected] : null;
    specialize.classList.toggle('show', phase==='prep' && !!t && t.level>=3 && t.path==='core');
    updateHud();
  }

  function selectSlot(i){
    if(phase!=='prep')return;
    selected = towers[i] ? i : null;
    renderTray();
  }
  function onSlotDown(e,i){
    if(phase!=='prep'||!towers[i])return;
    dragging={from:i,startX:e.clientX,startY:e.clientY,moved:false};
    e.currentTarget.setPointerCapture?.(e.pointerId);
    document.addEventListener('pointermove',onDragMove);
    document.addEventListener('pointerup',onDragEnd,{once:true});
  }
  function onDragMove(e){
    if(!dragging)return;
    const dx=e.clientX-dragging.startX,dy=e.clientY-dragging.startY;
    if(!dragging.moved && Math.hypot(dx,dy)>8){
      dragging.moved=true;
      createGhost(dragging.from,e.clientX,e.clientY);
      tray.children[dragging.from]?.classList.add('dragging');
    }
    if(dragging.moved && dragGhost){
      dragGhost.style.left=e.clientX+'px';
      dragGhost.style.top=e.clientY+'px';
      highlightMergeTarget(e.clientX,e.clientY);
    }
  }
  function createGhost(i,x,y){
    const t=towers[i];
    dragGhost=document.createElement('img');
    dragGhost.src=`${ASSET_PATH}${towerSprite(t)}.svg`;
    Object.assign(dragGhost.style,{position:'fixed',width:'64px',height:'64px',zIndex:50,pointerEvents:'none',transform:'translate(-50%,-50%)',filter:'drop-shadow(0 14px 16px #0009)'});
    dragGhost.style.left=x+'px';
    dragGhost.style.top=y+'px';
    document.body.appendChild(dragGhost);
  }
  function slotAt(x,y){
    const el=document.elementFromPoint(x,y)?.closest?.('.tower-slot');
    return el?Number(el.dataset.index):null;
  }
  function highlightMergeTarget(x,y){
    [...tray.children].forEach(el=>el.classList.remove('merge-target'));
    const idx=slotAt(x,y);
    if(idx!==null&&idx!==dragging.from&&sameTower(towers[idx],towers[dragging.from])) tray.children[idx].classList.add('merge-target');
  }
  function onDragEnd(e){
    document.removeEventListener('pointermove',onDragMove);
    [...tray.children].forEach(el=>el.classList.remove('merge-target','dragging'));
    if(dragGhost){dragGhost.remove();dragGhost=null;}
    if(!dragging)return;
    const from=dragging.from,moved=dragging.moved,to=slotAt(e.clientX,e.clientY);
    dragging=null;
    if(!moved){selected=from;renderTray();return;}
    if(to===null||to===from){renderTray();return;}
    if(!towers[to]){towers[to]=towers[from];towers[from]=null;selected=to;renderTray();return;}
    if(sameTower(towers[from],towers[to])) mergeTowers(from,to);
    else {setMessage('Only equal level and path towers can merge.');renderTray();}
  }
  function mergeTowers(from,to){
    const old=towers[to];
    towers[to]=tower(old.level+1,old.path);
    towers[from]=null;
    gold+=4+old.level;
    selected=to;
    renderTray();
    const el=tray.children[to];
    el?.classList.add('merge-pop');
    sound('merge');
    vibrate(24);
    showToast(`LEVEL ${old.level+1}!`);
    setMessage(`Tower fused to level ${old.level+1}. +${4+old.level}g merge bonus.`);
    setTimeout(()=>el?.classList.remove('merge-pop'),450);
  }
  function choosePath(pathName){
    if(selected===null)return;
    const t=towers[selected];
    if(!t||t.level<3||t.path!=='core')return;
    t.path=pathName;
    sound('merge');
    vibrate(28);
    showToast(pathName==='rapid'?'RAPID ONLINE':'BLAST ONLINE');
    setMessage(pathName==='rapid'?'Rapid tower specialized: laser fire rate increased.':'Blast tower specialized: shells now deal splash damage.');
    renderTray();
  }

  rapidBtn.onclick=()=>choosePath('rapid');
  blastBtn.onclick=()=>choosePath('blast');
  buyBtn.onclick=()=>{
    if(phase!=='prep'||gold<20)return;
    const i=towers.indexOf(null);
    if(i<0){setMessage('Tray full. Merge equal towers to create space.');return;}
    gold-=20;
    towers[i]=tower(1);
    selected=i;
    sound('buy');
    renderTray();
  };
  speedBtn.onclick=()=>{speed=speed===1?2:1;speedBtn.textContent=`${speed}×`;};

  function wavePlan(n){
    if(n===1)return ['drone','drone','drone','drone'];
    if(n===2)return ['drone','runner','drone','runner','drone'];
    if(n===3)return ['drone','tank','drone','runner','tank'];
    if(n===4)return ['runner','drone','tank','runner','drone','tank','drone'];
    if(n===5)return ['drone','runner','tank','drone','boss'];
    if(n===6)return ['runner','runner','runner','runner','drone','runner','runner'];
    if(n===7)return ['tank','tank','drone','tank','runner','tank'];
    if(n===8)return ['drone','runner','tank','drone','runner','tank','drone','runner','tank'];
    if(n===9)return ['runner','tank','runner','tank','drone','runner','tank','runner','tank','drone'];
    if(n===10)return ['tank','runner','tank','drone','runner','tank','boss'];
    const count=Math.min(18,6+n),out=[];
    for(let i=0;i<count;i++){
      const r=Math.random();
      out.push(n%5===0&&i===count-1?'boss':r<.22?'tank':r<.48?'runner':'drone');
    }
    return out;
  }
  function enemyData(type){
    const base=26+wave*9;
    if(type==='runner')return {hp:base*.7,speed:.125,reward:7,size:.054};
    if(type==='tank')return {hp:base*2.1,speed:.052,reward:12,size:.073,armor:.16};
    if(type==='boss')return {hp:base*7.4,speed:.035,reward:45,size:.115,armor:.2,boss:true};
    return {hp:base,speed:.078,reward:6,size:.056};
  }
  function makeEnemy(type){
    const d=enemyData(type);
    return {type,...d,maxHp:d.hp,pathIndex:0,x:path[0].x,y:path[0].y,hit:0,bob:Math.random()*6.28,dead:false};
  }
  function startWave(){
    if(phase!=='prep')return;
    selected=null;
    renderTray();
    phase='battle';
    phaseLabel.classList.add('battle');
    phaseText.textContent=`WAVE ${wave}`;
    spawnQueue=wavePlan(wave);
    waveTotal=spawnQueue.length;
    spawnCooldown=.2;
    enemies=[];
    projectiles=[];
    bossHud.classList.remove('show');
    updateHud();
    if(spawnQueue.includes('boss')){
      bossIntro=1.55;
      warning.classList.add('show');
      sound('boss');
      vibrate([60,50,60]);
      setTimeout(()=>warning.classList.remove('show'),1300);
    }else sound('wave');
    setMessage(wave%5===0?`Boss wave ${wave}. Hold the outpost.`:`Wave ${wave} started.`);
  }
  startBtn.onclick=startWave;

  function spawnEnemy(){
    const type=spawnQueue.shift();
    if(!type)return;
    const e=makeEnemy(type);
    enemies.push(e);
    if(e.boss)bossHud.classList.add('show');
  }
  function moveEnemy(e,dt){
    if(e.dead)return;
    const next=path[Math.min(e.pathIndex+1,path.length-1)];
    const dx=next.x-e.x,dy=next.y-e.y,dist=Math.hypot(dx,dy);
    if(dist<.008){
      if(e.pathIndex>=path.length-2){damageBase(e);return;}
      e.pathIndex++;
      return;
    }
    const step=e.speed*dt;
    e.x+=dx/dist*step;
    e.y+=dy/dist*step;
    e.bob+=dt*5;
  }
  function damageBase(e){
    e.dead=true;
    hp--;
    hpEl.textContent=hp;
    shake=Math.max(shake,.25);
    sound('base');
    vibrate(35);
    floaters.push({x:.105,y:.67,text:'BASE -1',life:.8,color:'#fb7185'});
    if(hp<=0)endGame();
  }
  function progressOnPath(e){return e.pathIndex+(1-e.x);}
  function targetForTower(px,py,range){
    let best=null,bestP=-Infinity;
    for(const e of enemies){
      if(e.dead)continue;
      const d=Math.hypot(e.x-px,e.y-py);
      if(d<=range){
        const p=progressOnPath(e);
        if(p>bestP){best=e;bestP=p;}
      }
    }
    return best;
  }
  function fireTowers(dt){
    towers.forEach((t,i)=>{
      if(!t)return;
      t.cool=(t.cool||Math.random()*.2)-dt;
      if(t.cool>0)return;
      const [px,py]=towerPoints[i],s=statsFor(t),target=targetForTower(px,py,s.range);
      if(!target)return;
      t.cool=s.rate;
      const kind=t.path==='rapid'?'rapid':t.path==='blast'?'blast':'core';
      projectiles.push({x:px,y:py,target,damage:s.damage,splash:s.splash,kind,life:1.4});
      sound(kind==='blast'?'blast':'rapid');
      particles.push({type:'muzzle',x:px,y:py,life:.16,color:kind==='blast'?'#fb923c':kind==='rapid'?'#22d3ee':'#60a5fa'});
    });
  }
  function hitEnemy(e,damage,color){
    if(!e||e.dead)return;
    const real=damage*(1-(e.armor||0));
    e.hp-=real;
    e.hit=.11;
    sound('hit');
    floaters.push({x:e.x,y:e.y-.05,text:`-${Math.round(real)}`,life:.55,color});
    if(e.hp<=0)killEnemy(e);
  }
  function killEnemy(e){
    if(e.dead)return;
    e.dead=true;
    gold+=e.reward;
    kills++;
    save.totalKills=(save.totalKills||0)+1;
    sound('kill');
    for(let i=0;i<14;i++)particles.push({type:'spark',x:e.x,y:e.y,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,life:.5+Math.random()*.3,color:e.boss?'#e879f9':e.type==='runner'?'#fbbf24':e.type==='tank'?'#fb7185':'#8b5cf6'});
    floaters.push({x:e.x,y:e.y,text:`+${e.reward}g`,life:.7,color:'#fbbf24'});
    if(e.boss){
      shake=.6;
      hitStop=.07;
      bossHud.classList.remove('show');
      showToast('BOSS DOWN!');
      vibrate([80,40,90]);
    }
    updateHud();
  }
  function updateProjectiles(dt){
    for(const p of projectiles){
      if(!p.target||p.target.dead){p.dead=true;continue;}
      const dx=p.target.x-p.x,dy=p.target.y-p.y,d=Math.hypot(dx,dy),spd=p.kind==='blast'?.48:.82;
      p.life-=dt;
      if(d<.025||p.life<=0){
        const hit=p.target;
        const col=p.kind==='blast'?'#fb923c':p.kind==='rapid'?'#22d3ee':'#60a5fa';
        hitEnemy(hit,p.damage,col);
        if(p.splash){
          for(const e of enemies)if(e!==hit&&!e.dead&&Math.hypot(e.x-hit.x,e.y-hit.y)<p.splash)hitEnemy(e,p.damage*.5,col);
          particles.push({type:'ring',x:hit.x,y:hit.y,life:.28,color:'#fb923c'});
          shake=Math.max(shake,.16);
          hitStop=.035;
        }
        p.dead=true;
        continue;
      }
      p.x+=dx/d*spd*dt;
      p.y+=dy/d*spd*dt;
    }
    projectiles=projectiles.filter(p=>!p.dead);
  }
  function updateFx(dt){
    particles.forEach(p=>{
      p.life-=dt;
      if(p.vx!==undefined){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=.08*dt;}
    });
    particles=particles.filter(p=>p.life>0);
    floaters.forEach(f=>{f.life-=dt;f.y-=.035*dt;});
    floaters=floaters.filter(f=>f.life>0);
  }
  function waveClear(){
    phase='prep';
    phaseLabel.classList.remove('battle');
    phaseText.textContent='PREP';
    const reward=12+wave*4;
    gold+=reward;
    save.bestWave=Math.max(save.bestWave||0,wave);
    persist();
    showToast(`WAVE ${wave} CLEAR`);
    sound('wave');
    vibrate(25);
    wave++;
    bossHud.classList.remove('show');
    setMessage(`Wave cleared. +${reward}g. Merge and upgrade before wave ${wave}.`);
    renderTray();
    updateHud();
  }
  function endGame(){
    phase='over';
    persist();
    document.getElementById('overText').textContent='The outpost fell. Stronger merges and earlier specialization will carry you deeper.';
    document.getElementById('finalWave').textContent=wave;
    document.getElementById('finalKills').textContent=kills;
    document.getElementById('bestWave').textContent=save.bestWave||wave;
    gameOver.classList.add('show');
  }
  function reset(){
    towers=Array(SLOT_COUNT).fill(null);
    selected=null;
    phase='prep';wave=1;hp=20;gold=60;kills=0;speed=1;
    enemies=[];projectiles=[];particles=[];floaters=[];spawnQueue=[];
    shake=0;hitStop=0;bossIntro=0;
    bossHud.classList.remove('show');
    warning.classList.remove('show');
    gameOver.classList.remove('show');
    phaseLabel.classList.remove('battle');
    phaseText.textContent='PREP';
    speedBtn.textContent='1×';
    setMessage('Build your squad, merge equal towers, then start the wave.');
    renderTray();
    updateHud();
  }
  document.getElementById('again').onclick=reset;

  function update(dt){
    if(phase!=='battle'){updateFx(dt);return;}
    if(bossIntro>0){bossIntro-=dt;updateFx(dt);return;}
    if(hitStop>0){hitStop-=dt;updateFx(dt);return;}
    spawnCooldown-=dt;
    if(spawnQueue.length&&spawnCooldown<=0){spawnEnemy();spawnCooldown=.62;}
    enemies.forEach(e=>moveEnemy(e,dt));
    enemies=enemies.filter(e=>!e.dead);
    fireTowers(dt);
    updateProjectiles(dt);
    updateFx(dt);
    if(shake>0)shake=Math.max(0,shake-dt);
    const boss=enemies.find(e=>e.boss&&!e.dead);
    if(boss){
      const pct=Math.max(0,boss.hp/boss.maxHp);
      bossFill.style.width=`${pct*100}%`;
      bossPct.textContent=`${Math.ceil(pct*100)}%`;
      bossHud.classList.add('show');
    }
    if(!spawnQueue.length&&!enemies.length&&!projectiles.length)waveClear();
  }

  function mapPoint(p,w,h){return{x:p.x*w,y:p.y*h};}
  function drawPath(w,h){
    const pts=path.map(p=>mapPoint(p,w,h));
    ctx.save();
    ctx.lineCap='round';ctx.lineJoin='round';
    ctx.strokeStyle='#03101a';ctx.lineWidth=h*.16;
    ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.stroke();
    ctx.strokeStyle='#1e4052';ctx.lineWidth=h*.115;ctx.stroke();
    ctx.setLineDash([14,13]);ctx.strokeStyle='#67e8f955';ctx.lineWidth=2.2;ctx.stroke();ctx.setLineDash([]);
    ctx.restore();
  }
  function drawBackground(w,h){
    const g=ctx.createLinearGradient(0,0,0,h);
    g.addColorStop(0,'#183b4d');g.addColorStop(.55,'#102b36');g.addColorStop(1,'#0b202a');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
    ctx.globalAlpha=.16;ctx.strokeStyle='#67e8f9';ctx.lineWidth=1;
    for(let y=28;y<h;y+=34){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
    for(let x=30;x<w;x+=46){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
    ctx.globalAlpha=1;
    for(const [nx,ny,r] of decor){
      const x=nx*w,y=ny*h;
      ctx.fillStyle='#123943';ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#1f5961';ctx.beginPath();ctx.arc(x-r*.2,y-r*.25,r*.55,0,Math.PI*2);ctx.fill();
    }
    for(const [nx,ny] of [[.93,.45],[.52,.88],[.27,.08]]){
      const x=nx*w,y=ny*h;
      ctx.fillStyle='#22d3ee33';ctx.beginPath();ctx.moveTo(x,y-13);ctx.lineTo(x+9,y+8);ctx.lineTo(x-8,y+8);ctx.closePath();ctx.fill();
      ctx.strokeStyle='#67e8f988';ctx.stroke();
    }
  }
  function drawImageCentered(img,x,y,size,alpha=1,rotation=0){
    if(!img.complete)return;
    ctx.save();ctx.translate(x,y);ctx.rotate(rotation);ctx.globalAlpha=alpha;ctx.drawImage(img,-size/2,-size/2,size,size);ctx.restore();
  }
  function drawBattle(){
    const w=canvas.width,h=canvas.height;
    ctx.clearRect(0,0,w,h);
    const sx=shake>0?(Math.random()-.5)*8:0,sy=shake>0?(Math.random()-.5)*6:0;
    ctx.save();ctx.translate(sx,sy);
    drawBackground(w,h);drawPath(w,h);
    drawImageCentered(assets.base,.078*w,.72*h,.19*h);
    towers.forEach((t,i)=>{
      if(!t)return;
      const [nx,ny]=towerPoints[i],size=.115*h+(Math.min(5,t.level)-1)*2;
      drawImageCentered(assets[towerSprite(t)],nx*w,ny*h,size);
      ctx.fillStyle='#07111ddd';ctx.beginPath();ctx.roundRect(nx*w-16,ny*h+size*.33,32,13,7);ctx.fill();
      ctx.fillStyle='#fde68a';ctx.font='900 10px Inter,Arial';ctx.textAlign='center';ctx.fillText(`L${t.level}`,nx*w,ny*h+size*.33+10);ctx.textAlign='left';
    });
    for(const e of enemies){
      const size=e.size*h*(1+Math.sin(e.bob)*.035),img=assets[e.type];
      drawImageCentered(img,e.x*w,e.y*h,size,e.hit>0?.55:1,Math.sin(e.bob*.7)*.03);
      if(e.hit>0)e.hit=Math.max(0,e.hit-FIXED);
      const bw=size*.78,bx=e.x*w-bw/2,by=e.y*h-size*.64;
      ctx.fillStyle='#041017cc';ctx.fillRect(bx,by,bw,5);
      ctx.fillStyle=e.hp/e.maxHp>.45?'#34d399':'#fb7185';ctx.fillRect(bx,by,bw*Math.max(0,e.hp/e.maxHp),5);
    }
    for(const p of projectiles){
      const x=p.x*w,y=p.y*h;
      if(p.kind==='rapid'){
        ctx.strokeStyle='#67e8f9';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x-12,y);ctx.lineTo(x+8,y);ctx.stroke();ctx.shadowBlur=12;ctx.shadowColor='#22d3ee';
      }else if(p.kind==='blast'){
        ctx.fillStyle='#fb923c';ctx.beginPath();ctx.arc(x,y,7,0,6.28);ctx.fill();ctx.shadowBlur=14;ctx.shadowColor='#f97316';
      }else{
        ctx.fillStyle='#60a5fa';ctx.beginPath();ctx.arc(x,y,5,0,6.28);ctx.fill();ctx.shadowBlur=10;ctx.shadowColor='#60a5fa';
      }
      ctx.shadowBlur=0;
    }
    for(const p of particles){
      const x=p.x*w,y=p.y*h,life=Math.max(0,p.life);
      ctx.globalAlpha=Math.min(1,life*4);
      if(p.type==='ring'){
        ctx.strokeStyle=p.color;ctx.lineWidth=5;ctx.beginPath();ctx.arc(x,y,(1-life/.28)*42,0,6.28);ctx.stroke();
      }else if(p.type==='muzzle'){
        ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(x,y,12*life/.16,0,6.28);ctx.fill();
      }else{
        ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(x,y,4,0,6.28);ctx.fill();
      }
      ctx.globalAlpha=1;
    }
    for(const f of floaters){
      ctx.globalAlpha=Math.min(1,f.life*2);ctx.fillStyle=f.color;ctx.font='950 16px Inter,Arial';ctx.textAlign='center';ctx.fillText(f.text,f.x*w,f.y*h);ctx.textAlign='left';ctx.globalAlpha=1;
    }
    ctx.restore();
  }

  function frame(now){
    const raw=Math.min(.08,(now-lastTime)/1000);
    lastTime=now;
    accumulator+=raw*speed;
    while(accumulator>=FIXED){update(FIXED);accumulator-=FIXED;}
    drawBattle();
    requestAnimationFrame(frame);
  }

  renderTray();
  updateHud();
  requestAnimationFrame(frame);
})();