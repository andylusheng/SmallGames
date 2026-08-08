(() => {
  'use strict';

  const canvas=document.getElementById('battle'),ctx=canvas.getContext('2d');
  const waveEl=document.getElementById('wave'),hpEl=document.getElementById('hp'),goldEl=document.getElementById('gold');
  const phaseLabel=document.getElementById('phaseLabel'),phaseText=document.getElementById('phaseText'),wavePreview=document.getElementById('wavePreview');
  const bossHud=document.getElementById('bossHud'),bossFill=document.getElementById('bossFill'),bossPct=document.getElementById('bossPct'),warning=document.getElementById('warning');
  const inspectTitle=document.getElementById('inspectTitle'),message=document.getElementById('message'),startBtn=document.getElementById('startWave'),buyBtn=document.getElementById('buy'),speedBtn=document.getElementById('speed'),empBtn=document.getElementById('emp');
  const specialize=document.getElementById('specialize'),rapidBtn=document.getElementById('rapidBtn'),blastBtn=document.getElementById('blastBtn'),toast=document.getElementById('toast'),gameOver=document.getElementById('gameOver');

  canvas.width=480;canvas.height=270;ctx.imageSmoothingEnabled=false;
  const W=480,H=270,FIXED=1/60,STORE='merge-defense-pixel-2',PAD_COUNT=8;

  // Conventional tower-defense flow: enemies enter from the left and the base is on the right.
  const path=[[-18,78],[122,78],[122,135],[265,135],[265,82],[390,82],[390,150],[456,150]];
  const fieldPads=[[65,42],[72,116],[165,102],[205,174],[240,100],[315,45],[345,120],[430,110]];
  const grassBits=[[22,28],[58,205],[101,32],[147,209],[186,45],[224,218],[285,205],[322,24],[363,212],[421,35],[449,220],[28,178],[177,232],[308,178]];

  let save={bestWave:0,totalKills:0};
  try{save={...save,...JSON.parse(localStorage.getItem(STORE)||'{}')}}catch{}

  let pads=Array(PAD_COUNT).fill(null),selectedPad=null,buildMode=false,drag=null,dragPos=null;
  let phase='prep',wave=1,hp=20,gold=60,kills=0,speed=1,empUsed=false,focusTarget=null,focusTimer=0;
  let enemies=[],projectiles=[],particles=[],floaters=[],spawnQueue=[],spawnCooldown=0,shake=0,hitStop=0,bossIntro=0,empPulse=0,lastTime=performance.now(),accumulator=0,audio=null;

  function persist(){save.bestWave=Math.max(save.bestWave||0,wave);localStorage.setItem(STORE,JSON.stringify(save));}
  function tower(level=1,path='core'){return{level,path,cool:0,aim:0,pulse:0}}
  function sameTower(a,b){return!!a&&!!b&&a.level===b.level&&a.path===b.path}
  function statsFor(t){let damage=7+t.level*4.5,rate=Math.max(.25,.78-t.level*.07),range=94,splash=0;if(t.path==='rapid'){damage*=.58;rate*=.43;range=106}if(t.path==='blast'){damage*=1.45;rate*=1.25;range=88;splash=40}return{damage,rate,range,splash}}

  function sound(kind){
    try{
      audio=audio||new(window.AudioContext||window.webkitAudioContext)();
      const m={buy:[320,.05,'square'],merge:[620,.12,'square'],rapid:[820,.03,'square'],core:[500,.04,'square'],blast:[110,.1,'sawtooth'],hit:[170,.025,'square'],kill:[420,.05,'square'],base:[85,.13,'sawtooth'],wave:[540,.12,'square'],boss:[68,.28,'sawtooth'],emp:[180,.25,'square'],focus:[980,.05,'square'],error:[145,.07,'square']};
      const [f,d,type]=m[kind]||[420,.05,'square'],o=audio.createOscillator(),g=audio.createGain(),n=audio.currentTime;
      o.type=type;o.frequency.value=f;g.gain.setValueAtTime(kind==='boss'?.06:.03,n);g.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(g);g.connect(audio.destination);o.start(n);o.stop(n+d);
    }catch{}
  }
  function vibrate(p){try{navigator.vibrate?.(p)}catch{}}
  function showToast(text){toast.textContent=text;toast.classList.remove('show');void toast.offsetWidth;toast.classList.add('show')}
  function setInfo(title,text){inspectTitle.textContent=title;message.textContent=text}

  function wavePlan(n){
    if(n===1)return['drone','drone','drone','drone'];
    if(n===2)return['drone','runner','drone','runner','drone'];
    if(n===3)return['drone','tank','drone','runner','tank'];
    if(n===4)return['runner','drone','tank','runner','drone','tank','drone'];
    if(n===5)return['drone','runner','tank','drone','boss'];
    if(n===6)return['runner','runner','runner','runner','drone','runner','runner'];
    if(n===7)return['tank','tank','drone','tank','runner','tank'];
    if(n===8)return['drone','runner','tank','drone','runner','tank','drone','runner','tank'];
    if(n===9)return['runner','tank','runner','tank','drone','runner','tank','runner','tank','drone'];
    if(n===10)return['tank','runner','tank','drone','runner','tank','boss'];
    const c=Math.min(18,6+n),o=[];for(let i=0;i<c;i++){const r=Math.random();o.push(n%5===0&&i===c-1?'boss':r<.22?'tank':r<.48?'runner':'drone')}return o;
  }
  function previewText(n){const c={};wavePlan(n).forEach(x=>c[x]=(c[x]||0)+1);const l={drone:'DRONE',runner:'RUNNER',tank:'TANK',boss:'TITAN'};return Object.entries(c).map(([k,v])=>`${l[k]} ×${v}`).join(' · ')}

  function updateHud(){
    waveEl.textContent=wave;hpEl.textContent=hp;goldEl.textContent=gold;
    buyBtn.disabled=phase!=='prep'||gold<20||!pads.some(x=>!x);
    startBtn.disabled=phase!=='prep'||!pads.some(Boolean);
    startBtn.textContent=phase==='prep'?`Start Wave ${wave}`:'Wave Running';
    speedBtn.textContent=`${speed}×`;
    empBtn.disabled=phase!=='battle'||empUsed;empBtn.textContent=empUsed?'EMP Used':'EMP';
    wavePreview.textContent=phase==='prep'?`NEXT · ${previewText(wave)}`:`LEFT · ${spawnQueue.length+enemies.filter(e=>!e.dead).length}`;
    refreshSpecialize();
  }
  function refreshSpecialize(){
    const t=selectedPad!==null?pads[selectedPad]:null;
    specialize.classList.toggle('show',phase==='prep'&&!!t&&t.level>=3&&t.path==='core');
    if(t){const s=statsFor(t);setInfo(`${t.path.toUpperCase()} · LEVEL ${t.level}`,`DMG ${Math.round(s.damage)} · RANGE ${s.range}px · ${t.path==='rapid'?'fast laser':t.path==='blast'?'splash cannon':'balanced cannon'}`)}
  }

  buyBtn.onclick=()=>{if(phase!=='prep'||gold<20)return;buildMode=!buildMode;selectedPad=null;setInfo(buildMode?'Choose Build Pad':'Build Cancelled',buildMode?'Tap a glowing empty pad beside the road.':'Buy Core when ready.');updateHud()};
  startBtn.onclick=()=>startWave();
  speedBtn.onclick=()=>{speed=speed===1?2:1;updateHud()};
  rapidBtn.onclick=()=>choosePath('rapid');blastBtn.onclick=()=>choosePath('blast');
  empBtn.onclick=()=>{if(phase!=='battle'||empUsed)return;empUsed=true;empPulse=.8;enemies.forEach(e=>{if(!e.dead)e.slow=Math.max(e.slow||0,2.6)});sound('emp');vibrate([30,25,30]);showToast('EMP PULSE');setInfo('EMP Deployed','All active enemies slowed for 2.6 seconds.');updateHud()};

  function choosePath(pathName){if(selectedPad===null)return;const t=pads[selectedPad];if(!t||t.level<3||t.path!=='core')return;t.path=pathName;sound('merge');showToast(pathName==='rapid'?'RAPID ONLINE':'BLAST ONLINE');refreshSpecialize()}
  function startWave(){
    if(phase!=='prep'||!pads.some(Boolean))return;
    buildMode=false;selectedPad=null;focusTarget=null;focusTimer=0;empUsed=false;phase='battle';phaseLabel.classList.add('battle');phaseText.textContent=`WAVE ${wave}`;
    spawnQueue=wavePlan(wave);spawnCooldown=.1;enemies=[];projectiles=[];bossHud.classList.remove('show');
    if(spawnQueue.includes('boss')){bossIntro=1.35;warning.classList.add('show');sound('boss');setTimeout(()=>warning.classList.remove('show'),1150)}else sound('wave');
    setInfo(`Wave ${wave}`,'Enemies move LEFT → RIGHT. Tap an enemy to Focus Fire; EMP slows the whole wave once.');updateHud();
  }

  function pos(e){const r=canvas.getBoundingClientRect();return{x:(e.clientX-r.left)/r.width*W,y:(e.clientY-r.top)/r.height*H}}
  function padAt(x,y,r=18){let best=null,bd=r;fieldPads.forEach(([px,py],i)=>{const d=Math.hypot(x-px,y-py);if(d<bd){best=i;bd=d}});return best}
  function enemyAt(x,y){let best=null,bd=20;for(const e of enemies){if(e.dead)continue;const d=Math.hypot(x-e.x,y-e.y);if(d<bd){best=e;bd=d}}return best}

  canvas.addEventListener('pointerdown',e=>{
    const p=pos(e);
    if(phase==='battle'){
      const en=enemyAt(p.x,p.y);
      if(en){focusTarget=en;focusTimer=3;sound('focus');showToast('FOCUS FIRE');setInfo('Target Marked','Towers that can reach this enemy prioritize it for 3 seconds.');return}
      const pi=padAt(p.x,p.y);if(pi!==null&&pads[pi]){selectedPad=pi;refreshSpecialize()}return;
    }
    const pi=padAt(p.x,p.y);if(pi===null)return;
    if(buildMode){if(pads[pi]){sound('error');setInfo('Pad Occupied','Choose an empty glowing pad.');return}gold-=20;pads[pi]=tower();selectedPad=pi;buildMode=false;sound('buy');showToast('CORE DEPLOYED');updateHud();return}
    if(!pads[pi]){selectedPad=null;setInfo('Build Phase','Enemies enter on the LEFT and attack the BASE on the RIGHT.');return}
    selectedPad=pi;drag={from:pi,startX:p.x,startY:p.y,moved:false};dragPos=p;canvas.setPointerCapture?.(e.pointerId);refreshSpecialize();
  });
  canvas.addEventListener('pointermove',e=>{if(!drag||phase!=='prep')return;dragPos=pos(e);if(!drag.moved&&Math.hypot(dragPos.x-drag.startX,dragPos.y-drag.startY)>8)drag.moved=true});
  canvas.addEventListener('pointerup',e=>{
    if(!drag||phase!=='prep')return;
    const p=pos(e),from=drag.from,moved=drag.moved,to=padAt(p.x,p.y,24);drag=null;dragPos=null;
    if(!moved){selectedPad=from;refreshSpecialize();return}
    if(to===null||to===from){setInfo('Move Cancelled','Drop on an empty pad or a matching tower.');return}
    if(!pads[to]){pads[to]=pads[from];pads[from]=null;selectedPad=to;setInfo('Tower Moved','Selected tower range is shown on the battlefield.');refreshSpecialize();return}
    if(sameTower(pads[from],pads[to])){const old=pads[to];pads[to]=tower(old.level+1,old.path);pads[from]=null;gold+=4+old.level;selectedPad=to;particles.push({type:'merge',x:fieldPads[to][0],y:fieldPads[to][1],life:.55});sound('merge');showToast(`LEVEL ${old.level+1}!`);updateHud();return}
    sound('error');setInfo('Cannot Merge','Only the same level and specialization can merge.');
  });
  canvas.addEventListener('pointercancel',()=>{drag=null;dragPos=null});

  function enemyData(type){const b=26+wave*9;if(type==='runner')return{hp:b*.7,speed:54,reward:7,size:8};if(type==='tank')return{hp:b*2.1,speed:23,reward:12,size:12,armor:.16};if(type==='boss')return{hp:b*7.4,speed:15,reward:45,size:18,armor:.2,boss:true};return{hp:b,speed:34,reward:6,size:9}}
  function makeEnemy(type){const d=enemyData(type);return{type,...d,maxHp:d.hp,pathIndex:0,x:path[0][0],y:path[0][1],hit:0,bob:Math.random()*6.28,dead:false,slow:0}}
  function spawnEnemy(){const type=spawnQueue.shift();if(!type)return;const e=makeEnemy(type);enemies.push(e);if(e.boss)bossHud.classList.add('show');updateHud()}
  function moveEnemy(e,dt){
    if(e.dead)return;
    const next=path[Math.min(e.pathIndex+1,path.length-1)],dx=next[0]-e.x,dy=next[1]-e.y,d=Math.hypot(dx,dy);
    if(d<3){if(e.pathIndex>=path.length-2){damageBase(e);return}e.pathIndex++;return}
    const m=e.slow>0?.42:1;if(e.slow>0)e.slow-=dt;const s=e.speed*m*dt;e.x+=dx/d*s;e.y+=dy/d*s;e.bob+=dt*5;
  }
  function damageBase(e){e.dead=true;hp--;shake=Math.max(shake,4);sound('base');floaters.push({x:448,y:132,text:'BASE -1',life:.8,color:'#fb7185'});if(hp<=0)endGame();updateHud()}
  function progress(e){return e.pathIndex+e.x/W}
  function targetForTower(px,py,r){
    if(focusTarget&&!focusTarget.dead&&focusTimer>0&&Math.hypot(focusTarget.x-px,focusTarget.y-py)<=r)return focusTarget;
    let best=null,bp=-Infinity;
    for(const e of enemies){if(e.dead)continue;if(Math.hypot(e.x-px,e.y-py)<=r){const p=progress(e);if(p>bp){best=e;bp=p}}}
    return best;
  }
  function fireTowers(dt){
    pads.forEach((t,i)=>{
      if(!t)return;t.cool-=dt;t.pulse=Math.max(0,(t.pulse||0)-dt);if(t.cool>0)return;
      const[px,py]=fieldPads[i],s=statsFor(t),target=targetForTower(px,py,s.range);if(!target)return;
      t.cool=s.rate;t.aim=Math.atan2(target.y-py,target.x-px);t.pulse=.1;const kind=t.path==='rapid'?'rapid':t.path==='blast'?'blast':'core';
      projectiles.push({x:px,y:py,target,damage:s.damage,splash:s.splash,kind,life:1.3});sound(kind);particles.push({type:'muzzle',x:px,y:py,life:.12,color:kind==='blast'?'#f59e0b':kind==='rapid'?'#22d3ee':'#60a5fa'});
    });
  }
  function hitEnemy(e,dmg,color){if(!e||e.dead)return;const real=dmg*(1-(e.armor||0));e.hp-=real;e.hit=.1;floaters.push({x:e.x,y:e.y-12,text:`-${Math.round(real)}`,life:.5,color});if(e.hp<=0)killEnemy(e)}
  function killEnemy(e){
    if(e.dead)return;e.dead=true;gold+=e.reward;kills++;save.totalKills=(save.totalKills||0)+1;sound('kill');
    for(let i=0;i<10;i++)particles.push({type:'spark',x:e.x,y:e.y,vx:(Math.random()-.5)*80,vy:(Math.random()-.5)*80,life:.4+Math.random()*.2,color:e.type==='runner'?'#facc15':e.type==='tank'?'#fb7185':e.boss?'#e879f9':'#a78bfa'});
    floaters.push({x:e.x,y:e.y,text:`+${e.reward}g`,life:.65,color:'#fbbf24'});if(focusTarget===e){focusTarget=null;focusTimer=0}
    if(e.boss){bossHud.classList.remove('show');shake=7;hitStop=.07;showToast('BOSS DOWN!')}updateHud();
  }
  function updateProjectiles(dt){
    for(const p of projectiles){
      if(!p.target||p.target.dead){p.dead=true;continue}
      const dx=p.target.x-p.x,dy=p.target.y-p.y,d=Math.hypot(dx,dy),spd=p.kind==='blast'?190:330;p.life-=dt;
      if(d<6||p.life<=0){const h=p.target,c=p.kind==='blast'?'#f59e0b':p.kind==='rapid'?'#22d3ee':'#60a5fa';hitEnemy(h,p.damage,c);if(p.splash){for(const e of enemies)if(e!==h&&!e.dead&&Math.hypot(e.x-h.x,e.y-h.y)<p.splash)hitEnemy(e,p.damage*.5,c);particles.push({type:'ring',x:h.x,y:h.y,life:.25,color:'#f59e0b'});shake=Math.max(shake,3);hitStop=.03}p.dead=true;continue}
      p.x+=dx/d*spd*dt;p.y+=dy/d*spd*dt;
    }
    projectiles=projectiles.filter(p=>!p.dead);
  }
  function updateFx(dt){particles.forEach(p=>{p.life-=dt;if(p.vx!==undefined){p.x+=p.vx*dt;p.y+=p.vy*dt}});particles=particles.filter(p=>p.life>0);floaters.forEach(f=>{f.life-=dt;f.y-=18*dt});floaters=floaters.filter(f=>f.life>0);if(empPulse>0)empPulse-=dt}
  function waveClear(){phase='prep';phaseLabel.classList.remove('battle');phaseText.textContent='PREP';const reward=12+wave*3;gold+=reward;persist();showToast(`WAVE CLEAR +${reward}g`);wave++;empUsed=false;focusTarget=null;focusTimer=0;projectiles=[];setInfo('Preparation',`Wave cleared. +${reward}g. Merge or reposition towers, then start the next wave.`);updateHud()}
  function endGame(){phase='over';persist();document.getElementById('finalWave').textContent=wave;document.getElementById('finalKills').textContent=kills;document.getElementById('bestWave').textContent=save.bestWave;document.getElementById('overText').textContent=`The base fell on wave ${wave}. Merge earlier and save EMP for dense waves.`;gameOver.classList.add('show')}
  document.getElementById('again').onclick=()=>{pads=Array(PAD_COUNT).fill(null);selectedPad=null;buildMode=false;phase='prep';wave=1;hp=20;gold=60;kills=0;speed=1;enemies=[];projectiles=[];particles=[];floaters=[];gameOver.classList.remove('show');phaseLabel.classList.remove('battle');phaseText.textContent='PREP';setInfo('Build Phase','Enemies enter from the LEFT. Defend the BASE on the RIGHT.');updateHud()};

  function update(dt){
    updateFx(dt);
    if(phase!=='battle')return;
    if(bossIntro>0){bossIntro-=dt;return}
    if(focusTimer>0){focusTimer-=dt;if(focusTimer<=0)focusTarget=null}
    spawnCooldown-=dt;if(spawnQueue.length&&spawnCooldown<=0){spawnEnemy();spawnCooldown=.62}
    for(const e of enemies)moveEnemy(e,dt);fireTowers(dt);updateProjectiles(dt);enemies=enemies.filter(e=>!e.dead);
    if(phase==='battle'&&!spawnQueue.length&&!enemies.length)waveClear();
    const boss=enemies.find(e=>e.boss&&!e.dead);if(boss){const p=Math.max(0,boss.hp/boss.maxHp);bossFill.style.width=`${p*100}%`;bossPct.textContent=`${Math.ceil(p*100)}%`}
  }

  function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}
  function pixelText(text,x,y,color='#fff',size=8,align='left'){ctx.save();ctx.fillStyle=color;ctx.font=`bold ${size}px monospace`;ctx.textAlign=align;ctx.textBaseline='middle';ctx.fillText(text,Math.round(x),Math.round(y));ctx.restore()}
  function arrow(x,y){ctx.fillStyle='#f7d889';ctx.beginPath();ctx.moveTo(x-5,y-4);ctx.lineTo(x+5,y);ctx.lineTo(x-5,y+4);ctx.closePath();ctx.fill()}
  function drawMap(){
    rect(0,0,W,H,'#46784d');
    for(let y=0;y<H;y+=16)for(let x=0;x<W;x+=16)if(((x+y)/16)%2===0)rect(x,y,16,16,'#4d8153');
    grassBits.forEach(([x,y],i)=>{rect(x,y,3,3,i%2?'#2f633c':'#356d42');if(i%3===0)rect(x+4,y+2,2,4,'#5d955e')});
    ctx.save();ctx.lineCap='square';ctx.lineJoin='miter';ctx.strokeStyle='#5b3d29';ctx.lineWidth=36;ctx.beginPath();ctx.moveTo(path[0][0],path[0][1]);for(let i=1;i<path.length;i++)ctx.lineTo(path[i][0],path[i][1]);ctx.stroke();ctx.strokeStyle='#b78a5c';ctx.lineWidth=24;ctx.stroke();ctx.setLineDash([8,8]);ctx.strokeStyle='#ead4a1';ctx.lineWidth=2;ctx.stroke();ctx.restore();
    arrow(58,78);arrow(182,135);arrow(328,82);arrow(425,150);
    drawSpawn(10,78);drawBase(456,150);
    pixelText('SPAWN',12,52,'#fee2e2',7,'left');pixelText('BASE',456,178,'#d1fae5',7,'center');
  }
  function drawSpawn(x,y){rect(x-9,y-13,18,26,'#7f1d1d');rect(x-6,y-10,12,20,'#ef4444');rect(x-3,y-7,6,14,'#2b0b0b');rect(x+9,y-16,3,32,'#fecaca')}
  function drawBase(x,y){rect(x-13,y-13,26,26,'#0f2d38');rect(x-10,y-10,20,20,'#22d3ee');rect(x-7,y-7,14,14,'#083344');rect(x-4,y-4,8,8,'#a7f3d0');rect(x-15,y+13,30,4,'#16353d')}
  function drawPad(i){
    const[x,y]=fieldPads[i],t=pads[i],sel=selectedPad===i;ctx.save();ctx.strokeStyle=sel?'#fde047':t?'#4ade80':buildMode?'#67e8f9':'#5b8b67';ctx.lineWidth=2;ctx.setLineDash(t?[]:[3,3]);ctx.strokeRect(x-11,y-9,22,18);ctx.setLineDash([]);
    if(!t){rect(x-5,y-2,10,4,buildMode?'#155e75':'#3d6e4a');ctx.restore();return}
    if(sel){const s=statsFor(t);ctx.strokeStyle=phase==='battle'?'#fef08a99':'#ffffff88';ctx.lineWidth=1;ctx.beginPath();ctx.arc(x,y,s.range,0,Math.PI*2);ctx.stroke()}
    drawTower(t,x,y,drag&&drag.from===i&&drag.moved?.45:1);pixelText(`L${t.level}`,x,y+14,'#fef08a',7,'center');ctx.restore();
  }
  function drawTower(t,x,y,a=1){ctx.save();ctx.globalAlpha=a;const rapid=t.path==='rapid',blast=t.path==='blast';rect(x-7,y-5,14,10,blast?'#9a3412':rapid?'#0e7490':'#1d4ed8');rect(x-5,y-8,10,6,blast?'#fb923c':rapid?'#22d3ee':'#60a5fa');rect(x-3,y-11,6,4,'#f8fafc');const ang=t.aim||0,cx=Math.round(x+Math.cos(ang)*7),cy=Math.round(y+Math.sin(ang)*7);ctx.strokeStyle=blast?'#fed7aa':rapid?'#a5f3fc':'#dbeafe';ctx.lineWidth=blast?4:2;ctx.beginPath();ctx.moveTo(x,y-4);ctx.lineTo(cx,cy);ctx.stroke();if(t.pulse>0)rect(x-2,y-2,4,4,'#fff');ctx.restore()}
  function drawEnemy(e){
    const x=Math.round(e.x),y=Math.round(e.y+Math.sin(e.bob)*1),hit=e.hit>0;
    if(e.type==='runner'){rect(x-6,y-5,12,10,hit?'#fff':'#facc15');rect(x-4,y-7,8,3,'#854d0e');rect(x-8,y+4,4,3,'#fde68a');rect(x+4,y+4,4,3,'#fde68a')}
    else if(e.type==='tank'){rect(x-9,y-7,18,14,hit?'#fff':'#be123c');rect(x-6,y-10,12,5,'#fb7185');rect(x-12,y+5,24,4,'#881337');rect(x-2,y-13,4,5,'#fecdd3')}
    else if(e.type==='boss'){rect(x-14,y-13,28,26,hit?'#fff':'#7e22ce');rect(x-10,y-17,20,6,'#e879f9');rect(x-18,y-6,5,14,'#c026d3');rect(x+13,y-6,5,14,'#c026d3');rect(x-4,y-5,8,8,'#f0abfc')}
    else{rect(x-7,y-6,14,12,hit?'#fff':'#8b5cf6');rect(x-4,y-9,8,4,'#c4b5fd');rect(x-9,y-2,3,6,'#6d28d9');rect(x+6,y-2,3,6,'#6d28d9')}
    const bw=e.boss?30:18;rect(x-bw/2,y-(e.boss?23:15),bw,3,'#3f1d2e');rect(x-bw/2,y-(e.boss?23:15),bw*Math.max(0,e.hp/e.maxHp),3,e.boss?'#e879f9':'#4ade80');
    if(focusTarget===e&&focusTimer>0){ctx.strokeStyle='#fef08a';ctx.lineWidth=2;ctx.strokeRect(x-12,y-12,24,24)}
    if(e.slow>0){rect(x-2,y-19,4,4,'#67e8f9')}
  }
  function drawFx(){
    for(const p of projectiles){ctx.fillStyle=p.kind==='blast'?'#fb923c':p.kind==='rapid'?'#22d3ee':'#93c5fd';ctx.fillRect(Math.round(p.x)-2,Math.round(p.y)-2,p.kind==='blast'?5:3,p.kind==='blast'?5:3)}
    for(const p of particles){const a=Math.max(0,p.life/.5);ctx.globalAlpha=Math.min(1,a);if(p.type==='ring'){ctx.strokeStyle=p.color;ctx.lineWidth=2;ctx.strokeRect(p.x-16*(1-a),p.y-16*(1-a),32*(1-a),32*(1-a))}else if(p.type==='merge'){ctx.strokeStyle='#fde047';ctx.strokeRect(p.x-20*a,p.y-20*a,40*a,40*a)}else rect(p.x,p.y,3,3,p.color||'#fff');ctx.globalAlpha=1}
    for(const f of floaters)pixelText(f.text,f.x,f.y,f.color,7,'center');
    if(empPulse>0){ctx.strokeStyle='#67e8f9';ctx.lineWidth=3;const r=(1-empPulse/.8)*300;ctx.beginPath();ctx.arc(W/2,H/2,r,0,Math.PI*2);ctx.stroke()}
  }
  function draw(){
    ctx.save();if(shake>0){ctx.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);shake=Math.max(0,shake-.35)}
    drawMap();fieldPads.forEach((_,i)=>drawPad(i));enemies.forEach(drawEnemy);drawFx();
    if(drag&&drag.moved&&dragPos&&pads[drag.from]){drawTower(pads[drag.from],dragPos.x,dragPos.y,.8);const to=padAt(dragPos.x,dragPos.y,24);if(to!==null&&to!==drag.from&&sameTower(pads[drag.from],pads[to])){ctx.strokeStyle='#fde047';ctx.lineWidth=2;ctx.strokeRect(fieldPads[to][0]-13,fieldPads[to][1]-11,26,22)}}
    ctx.restore();
  }

  function loop(now){
    const frame=Math.min(.05,(now-lastTime)/1000);lastTime=now;
    if(hitStop>0)hitStop-=frame;else{accumulator+=frame*speed;while(accumulator>=FIXED){update(FIXED);accumulator-=FIXED}}
    enemies.forEach(e=>e.hit=Math.max(0,e.hit-frame));draw();requestAnimationFrame(loop);
  }

  setInfo('Build Phase','Enemies enter from the LEFT. Defend the BASE on the RIGHT.');updateHud();requestAnimationFrame(loop);
})();