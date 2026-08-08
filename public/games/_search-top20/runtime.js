(() => {
  'use strict';
  const cfg = window.ZP_GAME || { slug: 'game', title: 'ZeroPlay Game', mode: 'snake' };
  const root = document.getElementById('app') || document.body.appendChild(document.createElement('div'));
  root.id = 'app';
  const KEY = `zp:${cfg.slug}:best`;
  let best = Number(localStorage.getItem(KEY) || 0) || 0;
  let currentScore = 0;
  let cleanup = () => {};
  let ended = false;

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  root.innerHTML = `
    <div class="zp-shell">
      <header class="zp-hud">
        <div class="zp-title-wrap"><span class="zp-dot"></span><div><strong>${esc(cfg.title)}</strong><small id="help">Ready</small></div></div>
        <div class="zp-stats"><div><span>Score</span><b id="score">0</b></div><div><span id="best-label">Best</span><b id="best">${best}</b></div><button id="restart" aria-label="Restart">↻</button></div>
      </header>
      <main id="stage" class="zp-stage" aria-label="${esc(cfg.title)} game area"></main>
      <div id="toast" class="zp-toast" aria-live="polite"></div>
      <div id="end" class="zp-end" hidden><div class="zp-end-card"><small id="end-kicker">RUN COMPLETE</small><h2 id="end-title">Game Over</h2><p id="end-copy"></p><button id="play-again">Play Again</button></div></div>
    </div>`;
  const stage = document.getElementById('stage');
  const scoreEl = document.getElementById('score');
  const bestEl = document.getElementById('best');
  const helpEl = document.getElementById('help');
  const toastEl = document.getElementById('toast');
  const endEl = document.getElementById('end');
  const endTitle = document.getElementById('end-title');
  const endCopy = document.getElementById('end-copy');
  const endKicker = document.getElementById('end-kicker');
  const restartBtn = document.getElementById('restart');
  const againBtn = document.getElementById('play-again');

  function emit(event, data = {}) {
    try { parent.postMessage({ type: 'zeroplay-game-event', event, slug: cfg.slug, ...data }, '*'); } catch (_) {}
  }
  function setHelp(text) { helpEl.textContent = text; }
  function setScore(value, {save = true} = {}) {
    currentScore = Math.max(0, Math.floor(Number(value) || 0));
    scoreEl.textContent = currentScore.toLocaleString();
    if (save && currentScore > best) {
      best = currentScore;
      localStorage.setItem(KEY, String(best));
      bestEl.textContent = best.toLocaleString();
      bestEl.classList.remove('pop'); void bestEl.offsetWidth; bestEl.classList.add('pop');
    }
  }
  function setBestLabel(label) { document.getElementById('best-label').textContent = label; }
  function setBestDisplay(value) { bestEl.textContent = String(value); }
  let toastTimer = 0;
  function toast(text, tone = 'good') {
    clearTimeout(toastTimer);
    toastEl.textContent = text;
    toastEl.dataset.tone = tone;
    toastEl.classList.add('show');
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 900);
  }
  function finish(title, copy, {kicker = 'RUN COMPLETE', score = currentScore, success = false} = {}) {
    if (ended) return;
    ended = true;
    setScore(score);
    endKicker.textContent = kicker;
    endTitle.textContent = title;
    endCopy.textContent = copy;
    endEl.hidden = false;
    endEl.dataset.success = success ? 'true' : 'false';
    emit('game_end', { score: currentScore, success });
  }
  function resetShell() {
    cleanup(); cleanup = () => {};
    ended = false;
    endEl.hidden = true;
    stage.innerHTML = '';
    stage.className = 'zp-stage';
    setScore(0, {save:false});
    setBestLabel('Best');
    best = Number(localStorage.getItem(KEY) || 0) || 0;
    setBestDisplay(best.toLocaleString());
  }
  function restart() {
    emit('game_restart_internal');
    resetShell();
    const init = MODES[cfg.mode] || MODES.snake;
    cleanup = init() || (() => {});
  }
  restartBtn.addEventListener('click', restart);
  againBtn.addEventListener('click', restart);

  function canvasBox() {
    stage.classList.add('canvas-stage');
    const canvas = document.createElement('canvas');
    canvas.width = 720; canvas.height = 720;
    canvas.className = 'zp-canvas';
    stage.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    return {canvas, ctx, W:720, H:720};
  }
  function addMobilePad(buttons) {
    const pad = document.createElement('div');
    pad.className = 'zp-pad';
    for (const [label, action, cls=''] of buttons) {
      const b = document.createElement('button'); b.textContent = label; b.className = cls; b.dataset.action = action;
      pad.appendChild(b);
    }
    stage.appendChild(pad);
    return pad;
  }
  function onTap(target, fn) {
    const h = (e) => { e.preventDefault(); fn(e); };
    target.addEventListener('pointerdown', h, {passive:false});
    return () => target.removeEventListener('pointerdown', h);
  }
  function rand(n) { return Math.floor(Math.random() * n); }
  function shuffle(a) { for (let i=a.length-1;i>0;i--){const j=rand(i+1);[a[i],a[j]]=[a[j],a[i]];} return a; }
  function clamp(v,a,b){return Math.max(a,Math.min(b,v));}

  function initSnake() {
    setHelp('Swipe or use arrow keys · collect energy · avoid your trail');
    const {canvas,ctx,W,H}=canvasBox();
    const N=20,S=W/N;
    let snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}], dir={x:1,y:0}, next={x:1,y:0}, food={x:14,y:10}, points=0, acc=0, last=performance.now();
    function spawn(){do{food={x:rand(N),y:rand(N)}}while(snake.some(p=>p.x===food.x&&p.y===food.y));}
    function steer(x,y){ if(x===-dir.x&&y===-dir.y)return; next={x,y}; }
    const key=(e)=>{const m={ArrowUp:[0,-1],w:[0,-1],W:[0,-1],ArrowDown:[0,1],s:[0,1],S:[0,1],ArrowLeft:[-1,0],a:[-1,0],A:[-1,0],ArrowRight:[1,0],d:[1,0],D:[1,0]}[e.key]; if(m){e.preventDefault();steer(...m)}};
    addEventListener('keydown',key,{passive:false});
    let sx=0,sy=0;
    const down=(e)=>{sx=e.clientX;sy=e.clientY}; const up=(e)=>{const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<18)return;if(Math.abs(dx)>Math.abs(dy))steer(Math.sign(dx),0);else steer(0,Math.sign(dy));};
    canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointerup',up);
    function step(){dir=next;const h={x:snake[0].x+dir.x,y:snake[0].y+dir.y};if(h.x<0||h.x>=N||h.y<0||h.y>=N||snake.some(p=>p.x===h.x&&p.y===h.y)){finish('Trail Broken',`You collected ${points} energy nodes.`,{score:points*10});return;}snake.unshift(h);if(h.x===food.x&&h.y===food.y){points++;setScore(points*10);toast(`+10 · length ${snake.length}`);spawn();}else snake.pop();}
    function draw(){ctx.fillStyle='#06111f';ctx.fillRect(0,0,W,H);ctx.strokeStyle='rgba(255,255,255,.035)';for(let i=0;i<=N;i++){ctx.beginPath();ctx.moveTo(i*S,0);ctx.lineTo(i*S,H);ctx.stroke();ctx.beginPath();ctx.moveTo(0,i*S);ctx.lineTo(W,i*S);ctx.stroke();}
      ctx.shadowBlur=18;ctx.shadowColor='#38bdf8';snake.forEach((p,i)=>{ctx.fillStyle=i===0?'#e0f2fe':'#22d3ee';ctx.beginPath();ctx.roundRect(p.x*S+4,p.y*S+4,S-8,S-8,10);ctx.fill();});ctx.shadowColor='#f472b6';ctx.fillStyle='#fb7185';ctx.beginPath();ctx.arc(food.x*S+S/2,food.y*S+S/2,S*.28,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;}
    function loop(now){if(ended)return;const dt=Math.min(50,now-last);last=now;acc+=dt;const speed=Math.max(75,145-points*3);if(acc>=speed){acc-=speed;step();}draw();requestAnimationFrame(loop);}requestAnimationFrame(loop);
    return()=>{removeEventListener('keydown',key);canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointerup',up)};
  }

  function initJumper(theme='pulse') {
    const pulse=theme==='pulse';
    setHelp(pulse?'Tap / Space · clear neon hazards · speed increases':'Tap / Space · jump stone obstacles · chase distance');
    const {canvas,ctx,W,H}=canvasBox();
    const ground=585; let y=ground-52,vy=0,score=0,speed=pulse?290:250,last=performance.now(),spawn=0, obstacles=[],alive=true;
    const jump=()=>{if(y>=ground-54){vy=pulse?-670:-620;toast(pulse?'PULSE!':'HOP!')}};
    const key=e=>{if(e.code==='Space'||e.code==='ArrowUp'){e.preventDefault();jump()}};addEventListener('keydown',key,{passive:false});const off=onTap(canvas,jump);
    function makeObstacle(){const tall=Math.random()<.32; obstacles.push({x:W+40,w:pulse?(tall?38:52):(tall?45:62),h:pulse?(tall?120:64):(tall?92:52),kind:rand(3)});}
    function loop(now){if(ended||!alive)return;const dt=Math.min(.035,(now-last)/1000);last=now;vy+=1650*dt;y+=vy*dt;if(y>ground-52){y=ground-52;vy=0;}speed+=dt*(pulse?8:5);score+=speed*dt/40;setScore(score);spawn-=dt;if(spawn<=0){makeObstacle();spawn=clamp(1.25-(speed-250)/650,.52,1.25)+Math.random()*.45;}obstacles.forEach(o=>o.x-=speed*dt);obstacles=obstacles.filter(o=>o.x>-100);
      const px=150,py=y,pw=48,ph=52;for(const o of obstacles){if(px<o.x+o.w&&px+pw>o.x&&py+ph>ground-o.h&&py<ground){alive=false;finish(pulse?'Signal Lost':'Fossil Run Ended',`Distance ${Math.floor(score)} · speed ${Math.floor(speed)}.`,{score});break;}}
      ctx.fillStyle=pulse?'#050816':'#fff7df';ctx.fillRect(0,0,W,H);if(pulse){ctx.strokeStyle='rgba(59,130,246,.15)';for(let yy=60;yy<ground;yy+=60){ctx.beginPath();ctx.moveTo(0,yy);ctx.lineTo(W,yy);ctx.stroke();}}else{ctx.fillStyle='#f8d59b';ctx.beginPath();ctx.arc(570,120,60,0,Math.PI*2);ctx.fill();ctx.fillStyle='#f0c98a';for(let i=0;i<8;i++){ctx.beginPath();ctx.moveTo(i*120,ground);ctx.lineTo(i*120+80,430);ctx.lineTo(i*120+170,ground);ctx.fill();}}
      ctx.fillStyle=pulse?'#111827':'#8b5a2b';ctx.fillRect(0,ground,W,H-ground);ctx.fillStyle=pulse?'#22d3ee':'#4d7c0f';ctx.shadowBlur=pulse?20:0;ctx.shadowColor='#22d3ee';ctx.beginPath();ctx.roundRect(px,py,pw,ph,pulse?8:16);ctx.fill();ctx.shadowBlur=0;
      obstacles.forEach(o=>{ctx.fillStyle=pulse?['#fb7185','#a78bfa','#f59e0b'][o.kind]:['#a16207','#92400e','#78716c'][o.kind];ctx.beginPath();ctx.roundRect(o.x,ground-o.h,o.w,o.h,pulse?6:12);ctx.fill();});requestAnimationFrame(loop);}requestAnimationFrame(loop);
    return()=>{removeEventListener('keydown',key);off()};
  }

  function initSudoku(){
    setHelp('Fill every row, column and 3×3 box with 1–9 exactly once'); stage.classList.add('dom-stage');
    const puzzle='530070000600195000098000060800060003400803001700020006060000280000419005000080079';
    const solution='534678912672195348198342567859761423426853791713924856961537284287419635345286179';
    let values=puzzle.split(''),selected=-1, mistakes=0;
    stage.innerHTML=`<div class="sudoku-wrap"><div class="sudoku-board" id="sudoku"></div><div class="num-pad" id="nums">${[1,2,3,4,5,6,7,8,9].map(n=>`<button>${n}</button>`).join('')}<button class="erase">⌫</button></div></div>`;
    const board=stage.querySelector('#sudoku');
    function render(){board.innerHTML=values.map((v,i)=>`<button class="s-cell ${puzzle[i]!=='0'?'given':''} ${i===selected?'selected':''} ${v!=='0'&&v!==solution[i]?'wrong':''}" data-i="${i}" ${puzzle[i]!=='0'?'disabled':''}>${v==='0'?'':v}</button>`).join('');setScore(values.filter((v,i)=>v===solution[i]).length,{save:false});}
    board.addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(!b)return;selected=+b.dataset.i;render()});
    stage.querySelector('#nums').addEventListener('click',e=>{if(selected<0||puzzle[selected]!=='0')return;const t=e.target.closest('button');if(!t)return;const v=t.classList.contains('erase')?'0':t.textContent.trim();values[selected]=v;if(v!=='0'&&v!==solution[selected]){mistakes++;toast('Conflict','bad')}else if(v!== '0')toast('Correct');render();if(values.join('')===solution){setScore(81);finish('Grid Complete',`Solved with ${mistakes} conflict${mistakes===1?'':'s'}.`,{kicker:'PUZZLE SOLVED',score:81,success:true});}});
    render();return()=>{};
  }

  const SUITS=['♠','♥','♦','♣']; const RED=new Set(['♥','♦']);
  const rankName=r=>r===1?'A':r===11?'J':r===12?'Q':r===13?'K':String(r);
  function deck52(){return SUITS.flatMap(s=>Array.from({length:13},(_,i)=>({s,r:i+1,id:`${s}${i+1}-${Math.random()}`})));}
  function cardHtml(c,extra=''){return `<button class="card ${RED.has(c.s)?'red':''} ${extra}" data-card="${esc(c.id)}"><span>${rankName(c.r)}</span><i>${c.s}</i></button>`;}

  function initAurora(){
    setHelp('Build alternating descending lanes · move A→K by suit to foundations');stage.classList.add('dom-stage');
    let deck=shuffle(deck52()), cols=Array.from({length:7},()=>[]), stock=[], waste=[], foundations=Object.fromEntries(SUITS.map(s=>[s,[]])), selected=null;
    for(let c=0;c<7;c++)for(let i=0;i<=c;i++)cols[c].push(deck.pop());stock=deck;
    function legalToCol(c,target){const top=target.at(-1);return !top?c.r===13:top.r===c.r+1&&RED.has(top.s)!==RED.has(c.s)}
    function take(sel){if(sel.type==='waste')return waste.pop();if(sel.type==='col')return cols[sel.i].pop();return null;}
    function peek(sel){if(sel.type==='waste')return waste.at(-1);if(sel.type==='col')return cols[sel.i].at(-1);return null;}
    function scoreNow(){return SUITS.reduce((n,s)=>n+foundations[s].length,0)}
    function render(){stage.innerHTML=`<div class="card-game"><div class="card-top"><button class="stock" data-act="stock">${stock.length?'✦':'↺'}<small>${stock.length}</small></button><div class="waste" data-zone="waste">${waste.length?cardHtml(waste.at(-1),selected?.type==='waste'?'picked':''):'<div class="slot">Waste</div>'}</div><div class="foundations">${SUITS.map(s=>`<button class="foundation" data-found="${s}">${foundations[s].length?`${rankName(foundations[s].at(-1).r)} ${s}`:s}</button>`).join('')}</div></div><div class="tableau">${cols.map((col,i)=>`<div class="lane" data-col="${i}">${col.map((c,j)=>cardHtml(c,j===col.length-1&&selected?.type==='col'&&selected.i===i?'picked':'')).join('')}</div>`).join('')}</div><div class="game-note">Tap a top card, then a destination lane or matching foundation.</div></div>`;setScore(scoreNow(),{save:false});}
    stage.addEventListener('click',e=>{const stockBtn=e.target.closest('[data-act="stock"]');if(stockBtn){if(!stock.length&&waste.length){stock=waste.reverse();waste=[];}else if(stock.length)waste.push(stock.pop());selected=null;render();return;}
      const found=e.target.closest('[data-found]');if(found&&selected){const c=peek(selected),s=found.dataset.found, f=foundations[s];if(c&&c.s===s&&c.r===(f.at(-1)?.r||0)+1){take(selected);f.push(c);selected=null;toast('Foundation +1');render();if(scoreNow()===52)finish('Aurora Cleared','All four foundations reached King.',{score:52,success:true});}else toast('Not a legal foundation move','bad');return;}
      const lane=e.target.closest('[data-col]');const wasteZone=e.target.closest('[data-zone="waste"]');if(wasteZone&&waste.length){selected={type:'waste'};render();return;}if(lane){const i=+lane.dataset.col;if(selected){const c=peek(selected);if(c&&legalToCol(c,cols[i])&&!(selected.type==='col'&&selected.i===i)){take(selected);cols[i].push(c);selected=null;toast('Moved');render();}else{toast('That card cannot go there','bad');selected=null;render();}}else if(cols[i].length){selected={type:'col',i};render();}}});render();return()=>{};
  }

  function initCascade(){
    setHelp('Build descending same-suit runs · clear K→A sequences');stage.classList.add('dom-stage');
    let cards=[];['♠','♥'].forEach(s=>{for(let k=0;k<2;k++)for(let r=1;r<=13;r++)cards.push({s,r,id:`${s}${r}-${k}`})});shuffle(cards);
    let cols=Array.from({length:8},()=>[]),stock=[],cleared=0,selected=-1;for(let i=0;i<40;i++)cols[i%8].push(cards.pop());stock=cards;
    function legal(c,col){const t=col.at(-1);return !t?c.r===13:t.r===c.r+1;}
    function collapse(i){const col=cols[i];if(col.length<13)return;const run=col.slice(-13);const s=run[0].s;if(run.every((c,j)=>c.s===s&&c.r===13-j)){col.splice(-13);cleared++;toast('Sequence cleared!');}}
    function render(){stage.innerHTML=`<div class="card-game cascade"><div class="card-top"><button class="stock wide" data-deal ${!stock.length?'disabled':''}>Deal row <small>${stock.length}</small></button><div class="clear-meter">Cleared <b>${cleared}/4</b></div></div><div class="tableau eight">${cols.map((col,i)=>`<div class="lane" data-col="${i}">${col.map((c,j)=>cardHtml(c,j===col.length-1&&selected===i?'picked':'')).join('')}</div>`).join('')}</div></div>`;setScore(cleared*100,{save:false});}
    stage.addEventListener('click',e=>{if(e.target.closest('[data-deal]')){if(stock.length>=8){for(let i=0;i<8;i++){cols[i].push(stock.pop());collapse(i);}selected=-1;render();}return;}const lane=e.target.closest('[data-col]');if(!lane)return;const i=+lane.dataset.col;if(selected>=0){const c=cols[selected].at(-1);if(c&&legal(c,cols[i])&&selected!==i){cols[selected].pop();cols[i].push(c);selected=-1;collapse(i);render();if(cleared===4)finish('Cascade Cleared','Four complete K-to-A runs removed.',{score:400,success:true});}else{toast('Build one rank lower','bad');selected=-1;render();}}else if(cols[i].length){selected=i;render();}});render();return()=>{};
  }

  function initMaze(){
    setHelp('Collect every spark · avoid roaming sentinels');const {canvas,ctx,W,H}=canvasBox();
    const raw=['###############','#.............#','#.###.###.###.#','#.#.........#.#','#.#.##.#.##.#.#','#.....#.#.....#','###.#.....#.###','#...#.###.#...#','#.#.........#.#','#.#.##.#.##.#.#','#.....#.#.....#','#.###.....###.#','#.............#','#.............#','###############'];
    const rows=raw.map(r=>r.slice(0,15));const N=15,S=W/N;let p={x:1,y:1},dir={x:0,y:0},dots=new Set(),en=[{x:13,y:13,c:'#fb7185'},{x:13,y:1,c:'#a78bfa'}],score=0,last=0,acc=0,enemyAcc=0;
    for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(rows[y][x]==='.')dots.add(`${x},${y}`);
    function wall(x,y){return x<0||y<0||x>=N||y>=N||rows[y][x]==='#';}
    function steer(x,y){if(!wall(p.x+x,p.y+y))dir={x,y};}
    const key=e=>{const m={ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1],ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0]}[e.key];if(m){e.preventDefault();steer(...m)}};addEventListener('keydown',key,{passive:false});
    let sx=0,sy=0;const down=e=>{sx=e.clientX;sy=e.clientY};const up=e=>{const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<12)return;Math.abs(dx)>Math.abs(dy)?steer(Math.sign(dx),0):steer(0,Math.sign(dy));};canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointerup',up);
    function moveEnemy(g){const opts=[[1,0],[-1,0],[0,1],[0,-1]].map(([x,y])=>({x:g.x+x,y:g.y+y,d:Math.abs(g.x+x-p.x)+Math.abs(g.y+y-p.y)})).filter(q=>!wall(q.x,q.y));opts.sort((a,b)=>a.d-b.d+(Math.random()-.5)*2);if(opts[0]){g.x=opts[0].x;g.y=opts[0].y;}}
    function step(){const nx=p.x+dir.x,ny=p.y+dir.y;if(!wall(nx,ny)){p.x=nx;p.y=ny;}const k=`${p.x},${p.y}`;if(dots.delete(k)){score+=10;setScore(score);if(dots.size===0){finish('Maze Swept','Every spark was collected.',{score,success:true});return;}}if(en.some(g=>g.x===p.x&&g.y===p.y))finish('Caught by a Sentinel',`You cleared ${score/10} sparks.`,{score});}
    function draw(){ctx.fillStyle='#050816';ctx.fillRect(0,0,W,H);for(let y=0;y<N;y++)for(let x=0;x<N;x++){if(rows[y][x]==='#'){ctx.fillStyle='#172554';ctx.fillRect(x*S,y*S,S,S);ctx.strokeStyle='#1d4ed8';ctx.strokeRect(x*S+2,y*S+2,S-4,S-4);}else if(dots.has(`${x},${y}`)){ctx.fillStyle='#fde68a';ctx.beginPath();ctx.arc(x*S+S/2,y*S+S/2,4,0,Math.PI*2);ctx.fill();}}ctx.fillStyle='#22d3ee';ctx.beginPath();ctx.arc(p.x*S+S/2,p.y*S+S/2,S*.31,.35,Math.PI*2-.35);ctx.lineTo(p.x*S+S/2,p.y*S+S/2);ctx.fill();en.forEach(g=>{ctx.fillStyle=g.c;ctx.beginPath();ctx.roundRect(g.x*S+10,g.y*S+9,S-20,S-18,12);ctx.fill();});}
    function loop(t){if(ended)return;if(!last)last=t;const dt=t-last;last=t;acc+=dt;enemyAcc+=dt;if(acc>130){acc=0;step();}if(enemyAcc>320){enemyAcc=0;en.forEach(moveEnemy);if(en.some(g=>g.x===p.x&&g.y===p.y))finish('Caught by a Sentinel',`You cleared ${score/10} sparks.`,{score});}draw();requestAnimationFrame(loop);}requestAnimationFrame(loop);return()=>{removeEventListener('keydown',key);canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointerup',up)};
  }

  function initGridThree(){
    setHelp('Make a line of three before the computer');stage.classList.add('dom-stage');let b=Array(9).fill(''),turn=true,wins=0;
    stage.innerHTML='<div class="grid3" id="grid3"></div><p class="subtle">You are ● · computer is ◆</p>';const grid=stage.querySelector('#grid3');
    const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];const win=s=>lines.some(l=>l.every(i=>b[i]===s));
    function render(){grid.innerHTML=b.map((v,i)=>`<button data-i="${i}" class="g3 ${v==='X'?'x':v?'o':''}">${v==='X'?'●':v==='O'?'◆':''}</button>`).join('');}
    function ai(){if(ended)return;let open=b.map((v,i)=>v?'':i).filter(v=>v!=='');const tryMark=(m)=>{for(const i of open){b[i]=m;if(win(m)){b[i]='';return i}b[i]='';}return-1};let i=tryMark('O');if(i<0)i=tryMark('X');if(i<0&&b[4]==='')i=4;if(i<0)i=open[rand(open.length)];if(i===undefined)return;b[i]='O';render();if(win('O'))finish('Computer Wins','Block the immediate line earlier next round.',{score:wins*10});else if(b.every(Boolean))finish('Draw','The 3×3 grid filled without a winner.',{score:wins*10,success:true});else turn=true;}
    grid.addEventListener('click',e=>{const t=e.target.closest('[data-i]');if(!t||!turn||ended)return;const i=+t.dataset.i;if(b[i])return;b[i]='X';turn=false;render();if(win('X')){wins++;setScore(wins*10);finish('Three in a Row!',`You completed a line in ${b.filter(Boolean).length} total moves.`,{score:wins*10,success:true});}else if(b.every(Boolean))finish('Draw','The 3×3 grid filled without a winner.',{score:wins*10,success:true});else setTimeout(ai,260);});render();return()=>{};
  }

  function init4096(){
    setHelp('Swipe / arrows · merge equal values · reach 4096');stage.classList.add('dom-stage');let grid=Array(16).fill(0),score=0;
    const wrap=document.createElement('div');wrap.className='merge-wrap';wrap.innerHTML='<div class="merge-grid" id="mgrid"></div>';stage.appendChild(wrap);const el=wrap.querySelector('#mgrid');
    function add(){const empty=grid.map((v,i)=>v?null:i).filter(v=>v!==null);if(empty.length)grid[empty[rand(empty.length)]]=Math.random()<.9?2:4;}
    add();add();
    function compress(arr){let a=arr.filter(Boolean),out=[];for(let i=0;i<a.length;i++){if(a[i]===a[i+1]){const v=a[i]*2;out.push(v);score+=v;i++;if(v===4096)toast('4096 reached!');}else out.push(a[i]);}while(out.length<4)out.push(0);return out;}
    function move(dir){let old=grid.join(','),g=grid.slice();for(let r=0;r<4;r++){let idx=dir==='left'||dir==='right'?[0,1,2,3].map(c=>r*4+c):[0,1,2,3].map(rr=>rr*4+r);let vals=idx.map(i=>g[i]);if(dir==='right'||dir==='down')vals.reverse();vals=compress(vals);if(dir==='right'||dir==='down')vals.reverse();idx.forEach((i,k)=>grid[i]=vals[k]);}if(grid.join(',')!==old){add();setScore(score);render();if(grid.includes(4096))finish('Fusion Complete','You forged the 4096 tile.',{score,success:true});else if(!canMove())finish('No Moves Left',`Final score ${score}.`,{score});}}
    function canMove(){if(grid.includes(0))return true;for(let y=0;y<4;y++)for(let x=0;x<4;x++){const i=y*4+x;if(x<3&&grid[i]===grid[i+1])return true;if(y<3&&grid[i]===grid[i+4])return true;}return false;}
    function render(){el.innerHTML=grid.map(v=>`<div class="tile t${Math.min(v,4096)}">${v||''}</div>`).join('');}
    const key=e=>{const d={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'}[e.key];if(d){e.preventDefault();move(d)}};addEventListener('keydown',key,{passive:false});let sx=0,sy=0;const down=e=>{sx=e.clientX;sy=e.clientY};const up=e=>{const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<20)return;move(Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up'));};el.addEventListener('pointerdown',down);el.addEventListener('pointerup',up);render();return()=>{removeEventListener('keydown',key);};
  }

  function initOpenCell(){
    setHelp('Use 4 holding cells · alternate colors downward · build foundations A→K');stage.classList.add('dom-stage');let d=shuffle(deck52()),cols=Array.from({length:8},()=>[]),cells=Array(4).fill(null),found=Object.fromEntries(SUITS.map(s=>[s,[]])),sel=null;d.forEach((c,i)=>cols[i%8].push(c));
    const peek=()=>sel?.type==='col'?cols[sel.i].at(-1):sel?.type==='cell'?cells[sel.i]:null;const take=()=>{if(sel.type==='col')return cols[sel.i].pop();const c=cells[sel.i];cells[sel.i]=null;return c};
    function autoOne(){for(let i=0;i<4;i++){const c=cells[i],f=c&&found[c.s];if(c&&c.r===(f.at(-1)?.r||0)+1){found[c.s].push(c);cells[i]=null;return true;}}for(let i=0;i<8;i++){const c=cols[i].at(-1),f=c&&found[c.s];if(c&&c.r===(f.at(-1)?.r||0)+1){found[c.s].push(cols[i].pop());return true;}}return false;}
    function scoreNow(){return SUITS.reduce((n,s)=>n+found[s].length,0)}
    function render(){stage.innerHTML=`<div class="card-game freecell"><div class="card-top"><div class="cell-row">${cells.map((c,i)=>`<button class="hold" data-cell="${i}">${c?`${rankName(c.r)} ${c.s}`:'FREE'}</button>`).join('')}</div><button data-auto class="auto">Auto</button><div class="foundations">${SUITS.map(s=>`<button class="foundation" data-found="${s}">${found[s].length?`${rankName(found[s].at(-1).r)} ${s}`:s}</button>`).join('')}</div></div><div class="tableau eight">${cols.map((col,i)=>`<div class="lane" data-col="${i}">${col.map((c,j)=>cardHtml(c,j===col.length-1&&sel?.type==='col'&&sel.i===i?'picked':'')).join('')}</div>`).join('')}</div></div>`;setScore(scoreNow(),{save:false});}
    stage.addEventListener('click',e=>{if(e.target.closest('[data-auto]')){let moved=false;while(autoOne())moved=true;if(moved){toast('Safe cards moved');render();if(scoreNow()===52)finish('All Cells Open','Every card reached its foundation.',{score:52,success:true});}return;}const f=e.target.closest('[data-found]');if(f&&sel){const c=peek(),stack=found[f.dataset.found];if(c&&c.s===f.dataset.found&&c.r===(stack.at(-1)?.r||0)+1){stack.push(take());sel=null;render();if(scoreNow()===52)finish('All Cells Open','Every card reached its foundation.',{score:52,success:true});}else toast('Foundation needs next rank','bad');return;}const hold=e.target.closest('[data-cell]');if(hold){const i=+hold.dataset.cell;if(sel&&cells[i]===null){cells[i]=take();sel=null;render();}else if(!sel&&cells[i]){sel={type:'cell',i};render();}return;}const lane=e.target.closest('[data-col]');if(lane){const i=+lane.dataset.col;if(sel){const c=peek(),t=cols[i].at(-1);if(c&&(!t||t.r===c.r+1&&RED.has(t.s)!==RED.has(c.s))){cols[i].push(take());sel=null;render();}else{toast('Alternate colors, descending','bad');sel=null;render();}}else if(cols[i].length){sel={type:'col',i};render();}}});render();return()=>{};
  }

  function initStack(){
    setHelp('Move · rotate · clear full rows · avoid the ceiling');const {canvas,ctx,W,H}=canvasBox();const COLS=10,ROWS=20,S=30,OX=(W-COLS*S)/2,OY=55;let board=Array.from({length:ROWS},()=>Array(COLS).fill(0)),piece=null,last=performance.now(),drop=0,score=0,lines=0;
    const shapes=[[[1,1,1,1]],[[1,1],[1,1]],[[0,1,0],[1,1,1]],[[1,0,0],[1,1,1]],[[0,0,1],[1,1,1]],[[0,1,1],[1,1,0]],[[1,1,0],[0,1,1]]];
    function spawn(){piece={m:shapes[rand(shapes.length)].map(r=>r.slice()),x:3,y:0,c:1+rand(6)};if(hit(piece,0,0,piece.m))finish('Stack Reached the Top',`Cleared ${lines} lines.`,{score});}
    function hit(p,dx,dy,m){for(let y=0;y<m.length;y++)for(let x=0;x<m[y].length;x++)if(m[y][x]){const nx=p.x+x+dx,ny=p.y+y+dy;if(nx<0||nx>=COLS||ny>=ROWS||(ny>=0&&board[ny][nx]))return true;}return false;}
    function lock(){piece.m.forEach((r,y)=>r.forEach((v,x)=>{if(v&&piece.y+y>=0)board[piece.y+y][piece.x+x]=piece.c}));let cleared=0;for(let y=ROWS-1;y>=0;y--)if(board[y].every(Boolean)){board.splice(y,1);board.unshift(Array(COLS).fill(0));cleared++;y++;}if(cleared){lines+=cleared;score+=[0,100,300,500,800][cleared];setScore(score);toast(`${cleared} line${cleared>1?'s':''} cleared`);}spawn();}
    function rotate(){const m=piece.m[0].map((_,i)=>piece.m.map(r=>r[i]).reverse());if(!hit(piece,0,0,m))piece.m=m;}
    function action(a){if(ended)return;if(a==='left'&&!hit(piece,-1,0,piece.m))piece.x--;if(a==='right'&&!hit(piece,1,0,piece.m))piece.x++;if(a==='rotate')rotate();if(a==='down'){if(!hit(piece,0,1,piece.m))piece.y++;else lock();}if(a==='drop'){while(!hit(piece,0,1,piece.m))piece.y++;lock();}}
    const key=e=>{const a={ArrowLeft:'left',ArrowRight:'right',ArrowDown:'down',ArrowUp:'rotate',' ':'drop'}[e.key];if(a){e.preventDefault();action(a)}};addEventListener('keydown',key,{passive:false});const pad=addMobilePad([['◀','left'],['↻','rotate'],['▼','down'],['▶','right'],['DROP','drop','wide']]);pad.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(b)action(b.dataset.action)});spawn();
    function draw(){ctx.fillStyle='#050816';ctx.fillRect(0,0,W,H);ctx.fillStyle='#0f172a';ctx.fillRect(OX-8,OY-8,COLS*S+16,ROWS*S+16);const colors=['','#22d3ee','#a78bfa','#fb7185','#fbbf24','#34d399','#60a5fa'];for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++)if(board[y][x]){ctx.fillStyle=colors[board[y][x]];ctx.fillRect(OX+x*S+2,OY+y*S+2,S-4,S-4);}if(piece)piece.m.forEach((r,y)=>r.forEach((v,x)=>{if(v){ctx.fillStyle=colors[piece.c];ctx.fillRect(OX+(piece.x+x)*S+2,OY+(piece.y+y)*S+2,S-4,S-4);}}));ctx.fillStyle='#94a3b8';ctx.font='700 18px system-ui';ctx.fillText(`LINES ${lines}`,24,34);}
    function loop(t){if(ended)return;const dt=t-last;last=t;drop+=dt;if(drop>Math.max(130,650-lines*18)){drop=0;action('down')}draw();requestAnimationFrame(loop)}requestAnimationFrame(loop);return()=>removeEventListener('keydown',key);
  }

  function initVoid(){
    setHelp('Move between lanes · avoid blocked segments · survive the void');const {canvas,ctx,W,H}=canvasBox();let lane=1,obs=[],score=0,speed=280,last=performance.now(),spawn=0;
    function move(d){lane=clamp(lane+d,0,2);}
    const key=e=>{if(e.key==='ArrowLeft'||e.key==='a'){e.preventDefault();move(-1)}if(e.key==='ArrowRight'||e.key==='d'){e.preventDefault();move(1)}};addEventListener('keydown',key,{passive:false});const pad=addMobilePad([['◀','left'],['▶','right']]);pad.addEventListener('click',e=>{const a=e.target.closest('[data-action]')?.dataset.action;if(a)move(a==='left'?-1:1)});
    function loop(t){if(ended)return;const dt=Math.min(.04,(t-last)/1000);last=t;speed+=dt*9;score+=dt*10;setScore(score);spawn-=dt;if(spawn<=0){const blocked=rand(3);obs.push({lane:blocked,y:-80,h:110});if(Math.random()<.2)obs.push({lane:(blocked+1)%3,y:-190,h:80});spawn=clamp(.9-(speed-280)/900,.38,.9)+Math.random()*.25;}obs.forEach(o=>o.y+=speed*dt);obs=obs.filter(o=>o.y<H+100);if(obs.some(o=>o.lane===lane&&o.y+o.h>H-150&&o.y<H-80)){finish('Lost to the Void',`Distance ${Math.floor(score)}.`,{score});}
      ctx.fillStyle='#030712';ctx.fillRect(0,0,W,H);for(let i=0;i<3;i++){const x=150+i*210;ctx.strokeStyle='rgba(96,165,250,.25)';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(360+(x-360)*.25,50);ctx.lineTo(x,H);ctx.stroke();}obs.forEach(o=>{const x=150+o.lane*210;const scale=.5+o.y/H*.5;ctx.fillStyle='#f43f5e';ctx.fillRect(x-65*scale,o.y,130*scale,o.h);});const px=150+lane*210;ctx.shadowBlur=24;ctx.shadowColor='#22d3ee';ctx.fillStyle='#67e8f9';ctx.beginPath();ctx.moveTo(px,H-145);ctx.lineTo(px-34,H-80);ctx.lineTo(px+34,H-80);ctx.closePath();ctx.fill();ctx.shadowBlur=0;requestAnimationFrame(loop);}requestAnimationFrame(loop);return()=>removeEventListener('keydown',key);
  }

  function initSlope(){
    setHelp('Steer left / right · stay on the track · avoid barriers');const {canvas,ctx,W,H}=canvasBox();let x=0,vel=0,barriers=[],score=0,speed=250,last=performance.now(),spawn=0,left=false,right=false;
    const keyd=e=>{if(['ArrowLeft','a','ArrowRight','d'].includes(e.key))e.preventDefault();if(e.key==='ArrowLeft'||e.key==='a')left=true;if(e.key==='ArrowRight'||e.key==='d')right=true};const keyu=e=>{if(e.key==='ArrowLeft'||e.key==='a')left=false;if(e.key==='ArrowRight'||e.key==='d')right=false};addEventListener('keydown',keyd,{passive:false});addEventListener('keyup',keyu);let pointer=null;canvas.addEventListener('pointerdown',e=>{pointer=e.pointerId;canvas.setPointerCapture(pointer)});canvas.addEventListener('pointermove',e=>{if(pointer===e.pointerId){const r=canvas.getBoundingClientRect();x=clamp(((e.clientX-r.left)/r.width-.5)*2,-1,1)}});canvas.addEventListener('pointerup',()=>pointer=null);
    function loop(t){if(ended)return;const dt=Math.min(.04,(t-last)/1000);last=t;if(left)vel-=2.8*dt;if(right)vel+=2.8*dt;vel*=Math.pow(.18,dt);x=clamp(x+vel,-1.08,1.08);speed+=dt*7;score+=dt*12;setScore(score);spawn-=dt;if(spawn<=0){barriers.push({x:(Math.random()*1.6-.8),y:-80,w:.26+Math.random()*.16});spawn=.55+Math.random()*.4;}barriers.forEach(b=>b.y+=speed*dt);barriers=barriers.filter(b=>b.y<H+80);if(Math.abs(x)>1.01){finish('Off the Slope',`Distance ${Math.floor(score)}.`,{score});}for(const b of barriers){if(b.y>H-170&&b.y<H-80&&Math.abs(x-b.x)<b.w){finish('Barrier Hit',`Distance ${Math.floor(score)}.`,{score});break;}}
      ctx.fillStyle='#030712';ctx.fillRect(0,0,W,H);const grad=ctx.createLinearGradient(0,0,0,H);grad.addColorStop(0,'#172554');grad.addColorStop(1,'#020617');ctx.fillStyle=grad;ctx.beginPath();ctx.moveTo(300,0);ctx.lineTo(60,H);ctx.lineTo(660,H);ctx.lineTo(420,0);ctx.closePath();ctx.fill();ctx.strokeStyle='rgba(34,211,238,.3)';for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(360+i*25,0);ctx.lineTo(360+i*120,H);ctx.stroke();}barriers.forEach(b=>{const yy=b.y,scale=.3+yy/H*.8,bx=360+b.x*260*scale;ctx.fillStyle='#fb7185';ctx.fillRect(bx-48*scale,yy,96*scale,45*scale);});const px=360+x*260;ctx.shadowBlur=30;ctx.shadowColor='#22d3ee';ctx.fillStyle='#e0f2fe';ctx.beginPath();ctx.arc(px,H-115,34,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;requestAnimationFrame(loop);}requestAnimationFrame(loop);return()=>{removeEventListener('keydown',keyd);removeEventListener('keyup',keyu)};
  }

  function initDraughts(){
    setHelp('Diagonal moves · jumps capture · reach the far edge to crown');stage.classList.add('dom-stage');let board=Array(64).fill(null),selected=-1,player='r';
    for(let y=0;y<3;y++)for(let x=0;x<8;x++)if((x+y)%2===1)board[y*8+x]={c:'b',k:false};for(let y=5;y<8;y++)for(let x=0;x<8;x++)if((x+y)%2===1)board[y*8+x]={c:'r',k:false};
    function moves(i,captureOnly=false){const p=board[i];if(!p)return[];const x=i%8,y=Math.floor(i/8),dirs=p.k?[[1,1],[-1,1],[1,-1],[-1,-1]]:(p.c==='r'?[[1,-1],[-1,-1]]:[[1,1],[-1,1]]);let out=[];for(const[dX,dY]of dirs){const nx=x+dX,ny=y+dY;if(nx<0||nx>7||ny<0||ny>7)continue;const ni=ny*8+nx;if(!board[ni]&&!captureOnly)out.push({to:ni});else if(board[ni]&&board[ni].c!==p.c){const jx=x+dX*2,jy=y+dY*2;if(jx>=0&&jx<8&&jy>=0&&jy<8&&!board[jy*8+jx])out.push({to:jy*8+jx,cap:ni});}}return out;}
    function allMoves(c){let caps=[],norm=[];board.forEach((p,i)=>{if(p?.c===c){for(const m of moves(i)){(m.cap?caps:norm).push({from:i,...m})}}});return caps.length?caps:norm;}
    function doMove(m){const p=board[m.from];board[m.from]=null;board[m.to]=p;if(m.cap)board[m.cap]=null;const y=Math.floor(m.to/8);if((p.c==='r'&&y===0)||(p.c==='b'&&y===7)){p.k=true;toast('CROWNED!');}}
    function counts(){return board.reduce((a,p)=>{if(p)a[p.c]++;return a},{r:0,b:0});}
    function render(){const legal=selected>=0?allMoves('r').filter(m=>m.from===selected):[];stage.innerHTML=`<div class="draughts" id="draughts">${board.map((p,i)=>`<button data-i="${i}" class="sq ${(i+Math.floor(i/8))%2?'dark':'light'} ${selected===i?'selected':''} ${legal.some(m=>m.to===i)?'legal':''}">${p?`<span class="piece ${p.c} ${p.k?'king':''}">${p.k?'★':''}</span>`:''}</button>`).join('')}</div><div class="game-note">You: ${counts().r} · Rival: ${counts().b}</div>`;setScore((12-counts().b)*10,{save:false});}
    function check(){const c=counts();if(!c.b||!allMoves('b').length){finish('Crown Victory','The rival has no pieces or legal moves.',{score:120,success:true});return true}if(!c.r||!allMoves('r').length){finish('Board Lost','You have no pieces or legal moves.',{score:(12-c.b)*10});return true}return false;}
    stage.addEventListener('click',e=>{const t=e.target.closest('[data-i]');if(!t||player!=='r'||ended)return;const i=+t.dataset.i;if(selected>=0){const m=allMoves('r').find(m=>m.from===selected&&m.to===i);if(m){doMove(m);selected=-1;render();if(check())return;player='b';setTimeout(ai,350);return;}}if(board[i]?.c==='r'){selected=i;render();}});
    function ai(){const ms=allMoves('b');if(!ms.length){check();return;}doMove(ms[rand(ms.length)]);player='r';render();check();}render();return()=>{};
  }

  function initTrick(mode){
    const hearts=mode==='hearts';setHelp(hearts?'Follow suit · avoid penalty hearts and the queen':'Follow suit · star suit is trump · win tricks');stage.classList.add('dom-stage');
    const suitNames=['☾','♥','♦','★'];let deck=[];suitNames.forEach(s=>{for(let r=2;r<=14;r++)deck.push({s,r,id:`${s}${r}-${Math.random()}`})});shuffle(deck);let hands=Array.from({length:4},()=>[]);deck.forEach((c,i)=>hands[i%4].push(c));hands.forEach(h=>h.sort((a,b)=>suitNames.indexOf(a.s)-suitNames.indexOf(b.s)||a.r-b.r));let leader=0,turn=0,trick=[],taken=[0,0,0,0],penalty=[0,0,0,0],round=0,busy=false;
    function legalHand(pi){const h=hands[pi];if(!trick.length)return h;const lead=trick[0].card.s;const same=h.filter(c=>c.s===lead);return same.length?same:h;}
    function winner(){const lead=trick[0].card.s;let candidates=trick;if(!hearts&&trick.some(t=>t.card.s==='★'))candidates=trick.filter(t=>t.card.s==='★');else candidates=trick.filter(t=>t.card.s===lead);return candidates.reduce((a,b)=>b.card.r>a.card.r?b:a).pi;}
    function trickPenalty(){if(!hearts)return 0;return trick.reduce((n,t)=>n+(t.card.s==='♥'?1:0)+(t.card.s==='★'&&t.card.r===12?13:0),0);}
    function cardFace(c){return `<span>${c.r===14?'A':c.r===13?'K':c.r===12?'Q':c.r===11?'J':c.r}</span><i>${c.s}</i>`;}
    function render(){stage.innerHTML=`<div class="trick-game"><div class="opponents"><span>North ${hearts?penalty[2]+'p':taken[2]+'t'}</span><span>West ${hearts?penalty[1]+'p':taken[1]+'t'}</span><span>East ${hearts?penalty[3]+'p':taken[3]+'t'}</span></div><div class="trick-pile">${trick.map(t=>`<div class="trick-card p${t.pi}">${cardFace(t.card)}</div>`).join('')}</div><div class="hand">${hands[0].map(c=>`<button data-card="${esc(c.id)}" class="hand-card ${RED.has(c.s)?'red':''} ${turn===0&&legalHand(0).includes(c)?'legal':''}">${cardFace(c)}</button>`).join('')}</div><div class="game-note">${hearts?`Your penalties: ${penalty[0]}`:`Your tricks: ${taken[0]}`} · Trick ${Math.min(round+1,13)}/13</div></div>`;setScore(hearts?Math.max(0,100-penalty[0]):taken[0]*10,{save:true});}
    function play(pi,c){hands[pi].splice(hands[pi].indexOf(c),1);trick.push({pi,card:c});turn=(pi+1)%4;render();if(trick.length===4){busy=true;setTimeout(resolve,520);}else setTimeout(advance,260);}
    function advance(){if(ended||busy)return;if(turn===0){render();return;}const legal=legalHand(turn);let c;if(hearts){c=legal.slice().sort((a,b)=>a.r-b.r)[0];}else{c=legal.slice().sort((a,b)=>a.r-b.r)[Math.random()<.4?legal.length-1:0];}play(turn,c);}
    function resolve(){const w=winner();taken[w]++;if(hearts)penalty[w]+=trickPenalty();round++;toast(w===0?'You took the trick':'Rival took the trick',w===0&&!hearts?'good':'neutral');trick=[];leader=w;turn=w;busy=false;if(round>=13){if(hearts){const low=Math.min(...penalty);finish(penalty[0]===low?'Low Score Wins':'Hand Complete',`Penalty scores: You ${penalty[0]}, West ${penalty[1]}, North ${penalty[2]}, East ${penalty[3]}.`,{score:Math.max(0,100-penalty[0]),success:penalty[0]===low});}else{const hi=Math.max(...taken);finish(taken[0]===hi?'Trick Leader':'Hand Complete',`Tricks: You ${taken[0]}, West ${taken[1]}, North ${taken[2]}, East ${taken[3]}.`,{score:taken[0]*10,success:taken[0]===hi});}return;}render();setTimeout(advance,300);}
    stage.addEventListener('click',e=>{const b=e.target.closest('[data-card]');if(!b||turn!==0||busy||ended)return;const c=hands[0].find(c=>c.id===b.dataset.card);if(!c)return;if(!legalHand(0).includes(c)){toast('Follow the led suit','bad');return;}play(0,c);});render();if(turn!==0)setTimeout(advance,400);return()=>{};
  }

  function initWordHunt(){
    setHelp('Drag a straight line across hidden words');stage.classList.add('dom-stage');const words=['NEON','PIXEL','QUEST','SPARK','ORBIT','SHIFT','NOVA','GRID'];const N=10;let g=Array.from({length:N},()=>Array(N).fill('')),found=new Set();const dirs=[[1,0],[0,1],[1,1],[-1,1]];
    for(const w of words){let placed=false;for(let tries=0;tries<300&&!placed;tries++){const [dx,dy]=dirs[rand(dirs.length)],x=rand(N),y=rand(N),ex=x+dx*(w.length-1),ey=y+dy*(w.length-1);if(ex<0||ex>=N||ey<0||ey>=N)continue;let ok=true;for(let k=0;k<w.length;k++){const c=g[y+dy*k][x+dx*k];if(c&&c!==w[k])ok=false;}if(ok){for(let k=0;k<w.length;k++)g[y+dy*k][x+dx*k]=w[k];placed=true;}}}for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(!g[y][x])g[y][x]=String.fromCharCode(65+rand(26));let start=-1;
    stage.innerHTML=`<div class="word-layout"><div class="word-grid" id="wordgrid">${g.flatMap((r,y)=>r.map((c,x)=>`<button data-i="${y*N+x}">${c}</button>`)).join('')}</div><div class="word-list" id="wordlist"></div></div>`;const grid=stage.querySelector('#wordgrid'),list=stage.querySelector('#wordlist');
    function renderList(){list.innerHTML=words.map(w=>`<span class="${found.has(w)?'found':''}">${w}</span>`).join('');setScore(found.size*100,{save:true});}renderList();
    grid.addEventListener('pointerdown',e=>{const b=e.target.closest('[data-i]');if(!b)return;start=+b.dataset.i;b.classList.add('selecting')});grid.addEventListener('pointerup',e=>{const b=e.target.closest('[data-i]');if(!b||start<0)return;const end=+b.dataset.i,sx=start%N,sy=Math.floor(start/N),ex=end%N,ey=Math.floor(end/N),dx=Math.sign(ex-sx),dy=Math.sign(ey-sy),adx=Math.abs(ex-sx),ady=Math.abs(ey-sy);grid.querySelectorAll('.selecting').forEach(n=>n.classList.remove('selecting'));start=-1;if(!(sx===ex||sy===ey||adx===ady)){toast('Select a straight line','bad');return;}let str='',cells=[];const len=Math.max(adx,ady)+1;for(let k=0;k<len;k++){const x=sx+dx*k,y=sy+dy*k;str+=g[y][x];cells.push(y*N+x);}const match=words.find(w=>!found.has(w)&&(w===str||w===str.split('').reverse().join('')));if(match){found.add(match);cells.forEach(i=>grid.querySelector(`[data-i="${i}"]`).classList.add('hit'));toast(`${match} found`);renderList();if(found.size===words.length)finish('All Words Found',`${words.length} hidden words cleared.`,{score:words.length*100,success:true});}else toast('Not on the list','bad');});return()=>{};
  }

  function initDice(){
    setHelp('Roll up to 3× · hold dice · score one category each round');stage.classList.add('dom-stage');let dice=[1,1,1,1,1],held=[false,false,false,false,false],rolls=0,used={},total=0,round=1;
    const cats=['Ones','Twos','Threes','Fours','Fives','Sixes','3 of a Kind','4 of a Kind','Full House','Small Straight','Large Straight','Five Match','Chance'];
    function calc(cat){const counts=Array(7).fill(0);dice.forEach(v=>counts[v]++);const sum=dice.reduce((a,b)=>a+b,0),uniq=[...new Set(dice)].sort();if(['Ones','Twos','Threes','Fours','Fives','Sixes'].includes(cat)){const n=cats.indexOf(cat)+1;return counts[n]*n;}if(cat==='3 of a Kind')return counts.some(n=>n>=3)?sum:0;if(cat==='4 of a Kind')return counts.some(n=>n>=4)?sum:0;if(cat==='Full House')return counts.includes(3)&&counts.includes(2)?25:0;if(cat==='Small Straight'){const s=uniq.join('');return ['1234','2345','3456'].some(x=>s.includes(x))?30:0;}if(cat==='Large Straight')return uniq.join('')==='12345'||uniq.join('')==='23456'?40:0;if(cat==='Five Match')return counts.includes(5)?50:0;return sum;}
    function render(){stage.innerHTML=`<div class="dice-game"><div class="dice-row">${dice.map((v,i)=>`<button data-die="${i}" class="die ${held[i]?'held':''}">${['','⚀','⚁','⚂','⚃','⚄','⚅'][v]}<small>${held[i]?'HELD':''}</small></button>`).join('')}</div><button class="roll-btn" data-roll ${rolls>=3?'disabled':''}>${rolls?'ROLL AGAIN':'ROLL DICE'} <span>${3-rolls} left</span></button><div class="scorecard">${cats.map(c=>`<button data-cat="${c}" ${used[c]!==undefined||rolls===0?'disabled':''}><span>${c}</span><b>${used[c]!==undefined?used[c]:rolls?calc(c):'—'}</b></button>`).join('')}</div><div class="game-note">Round ${round}/13 · Total ${total}</div></div>`;setScore(total);}
    stage.addEventListener('click',e=>{const die=e.target.closest('[data-die]');if(die&&rolls>0){const i=+die.dataset.die;held[i]=!held[i];render();return;}if(e.target.closest('[data-roll]')){if(rolls>=3)return;dice=dice.map((v,i)=>held[i]?v:1+rand(6));rolls++;toast(`Roll ${rolls}`,'neutral');render();return;}const cat=e.target.closest('[data-cat]');if(cat&&rolls>0&&used[cat.dataset.cat]===undefined){const c=cat.dataset.cat,pts=calc(c);used[c]=pts;total+=pts;round++;setScore(total);toast(`${c}: +${pts}`);if(round>13){finish('Scorecard Complete',`Final score ${total}.`,{score:total,success:true});return;}rolls=0;held.fill(false);render();}});render();return()=>{};
  }

  function initDrift(){
    setHelp('Steer + throttle · keep controlled slides inside the circuit');const {canvas,ctx,W,H}=canvasBox();let car={x:360,y:555,a:-Math.PI/2,vx:0,vy:0},keys=new Set(),score=0,chain=0,time=60,last=performance.now();
    const kd=e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','a','d','w','s'].includes(e.key)){e.preventDefault();keys.add(e.key)}};const ku=e=>keys.delete(e.key);addEventListener('keydown',kd,{passive:false});addEventListener('keyup',ku);const pad=addMobilePad([['◀','left'],['▲','up'],['▶','right'],['▼','down']]);pad.addEventListener('pointerdown',e=>{const a=e.target.closest('[data-action]')?.dataset.action;if(a)keys.add({left:'ArrowLeft',right:'ArrowRight',up:'ArrowUp',down:'ArrowDown'}[a])});pad.addEventListener('pointerup',()=>{keys.clear()});
    function onTrack(x,y){const dx=(x-360)/290,dy=(y-360)/230,outer=dx*dx+dy*dy;const ix=(x-360)/150,iy=(y-360)/95,inner=ix*ix+iy*iy;return outer<1&&inner>1;}
    function loop(t){if(ended)return;const dt=Math.min(.035,(t-last)/1000);last=t;time-=dt;if(time<=0){finish('Drift Session Complete',`Score ${Math.floor(score)} · best chain ${Math.floor(chain)}.`,{score,success:true});return;}const steer=(keys.has('ArrowLeft')||keys.has('a')?-1:0)+(keys.has('ArrowRight')||keys.has('d')?1:0);const throttle=(keys.has('ArrowUp')||keys.has('w')?1:0)-((keys.has('ArrowDown')||keys.has('s'))?.5:0);const speed=Math.hypot(car.vx,car.vy);car.a+=steer*dt*(1.7+speed*.004);car.vx+=Math.cos(car.a)*throttle*240*dt;car.vy+=Math.sin(car.a)*throttle*240*dt;car.vx*=Math.pow(.72,dt);car.vy*=Math.pow(.72,dt);const forward={x:Math.cos(car.a),y:Math.sin(car.a)},lateral=Math.abs(car.vx*(-forward.y)+car.vy*forward.x);const aligned=car.vx*forward.x+car.vy*forward.y;car.vx=forward.x*aligned*.985+car.vx*.015;car.vy=forward.y*aligned*.985+car.vy*.015;car.x+=car.vx*dt;car.y+=car.vy*dt;if(onTrack(car.x,car.y)&&lateral>18&&speed>65){chain+=lateral*dt;score+=lateral*dt*.65;setScore(score);}else chain=Math.max(0,chain-dt*30);if(!onTrack(car.x,car.y)){car.vx*=.92;car.vy*=.92;}
      ctx.fillStyle='#030712';ctx.fillRect(0,0,W,H);ctx.fillStyle='#1e293b';ctx.beginPath();ctx.ellipse(360,360,300,240,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#052e2b';ctx.beginPath();ctx.ellipse(360,360,150,95,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#38bdf8';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(360,360,225,165,0,0,Math.PI*2);ctx.stroke();ctx.save();ctx.translate(car.x,car.y);ctx.rotate(car.a);ctx.shadowBlur=18;ctx.shadowColor='#fb7185';ctx.fillStyle='#fb7185';ctx.beginPath();ctx.roundRect(-24,-13,48,26,8);ctx.fill();ctx.fillStyle='#0f172a';ctx.fillRect(5,-10,12,20);ctx.restore();ctx.shadowBlur=0;ctx.fillStyle='#e2e8f0';ctx.font='700 18px system-ui';ctx.fillText(`${Math.ceil(time)}s`,24,34);ctx.fillText(`DRIFT ${Math.floor(chain)}`,560,34);requestAnimationFrame(loop);}requestAnimationFrame(loop);return()=>{removeEventListener('keydown',kd);removeEventListener('keyup',ku)};
  }

  function initOrbs(){
    setHelp('Aim · match 3+ colors · keep the field above the danger line');const {canvas,ctx,W,H}=canvasBox();const C=10,R=12,S=54,OX=(W-C*S)/2,OY=40,colors=['#22d3ee','#fb7185','#fbbf24','#a78bfa','#34d399'];let grid=Array.from({length:R},()=>Array(C).fill(-1)),next=rand(colors.length),shot=null,score=0,miss=0,aim={x:360,y:200};for(let y=0;y<5;y++)for(let x=0;x<C;x++)grid[y][x]=rand(colors.length);
    function nearest(x,y){return {c:clamp(Math.round((x-OX-S/2)/S),0,C-1),r:clamp(Math.round((y-OY-S/2)/S),0,R-1)}}
    function cluster(r,c,color,seen=new Set()){const k=`${r},${c}`;if(r<0||r>=R||c<0||c>=C||seen.has(k)||grid[r][c]!==color)return seen;seen.add(k);[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1]].forEach(([dr,dc])=>cluster(r+dr,c+dc,color,seen));return seen;}
    function attach(r,c,color){if(grid[r][c]!==-1){for(let rr=r;rr<R;rr++){if(grid[rr][c]===-1){r=rr;break;}}}grid[r][c]=color;const group=cluster(r,c,color);if(group.size>=3){group.forEach(k=>{const[rr,cc]=k.split(',').map(Number);grid[rr][cc]=-1});score+=group.size*20;setScore(score);miss=0;toast(`${group.size} orbs cleared`);if(grid.flat().every(v=>v<0)){finish('Field Cleared','Every orb cluster is gone.',{score,success:true});return;}}else{miss++;if(miss>=5){for(let y=R-1;y>0;y--)grid[y]=grid[y-1].slice();grid[0]=Array.from({length:C},()=>rand(colors.length));miss=0;toast('Field dropped','bad');}}if(grid[R-2].some(v=>v>=0))finish('Danger Line Reached',`Final score ${score}.`,{score});next=rand(colors.length);}
    function fire(x,y){if(shot||ended)return;const sx=360,sy=650,dx=x-sx,dy=Math.min(-40,y-sy),len=Math.hypot(dx,dy);shot={x:sx,y:sy,vx:dx/len*520,vy:dy/len*520,color:next};}
    canvas.addEventListener('pointermove',e=>{const r=canvas.getBoundingClientRect();aim.x=(e.clientX-r.left)/r.width*W;aim.y=(e.clientY-r.top)/r.height*H});canvas.addEventListener('pointerdown',e=>{const r=canvas.getBoundingClientRect();fire((e.clientX-r.left)/r.width*W,(e.clientY-r.top)/r.height*H)});
    let last=performance.now();function loop(t){if(ended)return;const dt=Math.min(.035,(t-last)/1000);last=t;if(shot){shot.x+=shot.vx*dt;shot.y+=shot.vy*dt;if(shot.x<OX+S/2||shot.x>OX+C*S-S/2){shot.vx*=-1;shot.x=clamp(shot.x,OX+S/2,OX+C*S-S/2);}let hit=false;const pos=nearest(shot.x,shot.y);if(shot.y<OY+S/2)hit=true;else for(let r=0;r<R&&!hit;r++)for(let c=0;c<C;c++)if(grid[r][c]>=0){const cx=OX+c*S+S/2,cy=OY+r*S+S/2;if(Math.hypot(cx-shot.x,cy-shot.y)<S*.8){hit=true;break;}}if(hit){attach(pos.r,pos.c,shot.color);shot=null;}}
      ctx.fillStyle='#050816';ctx.fillRect(0,0,W,H);ctx.strokeStyle='rgba(251,113,133,.45)';ctx.setLineDash([10,10]);ctx.beginPath();ctx.moveTo(OX,H-120);ctx.lineTo(OX+C*S,H-120);ctx.stroke();ctx.setLineDash([]);for(let r=0;r<R;r++)for(let c=0;c<C;c++)if(grid[r][c]>=0){ctx.fillStyle=colors[grid[r][c]];ctx.shadowBlur=12;ctx.shadowColor=colors[grid[r][c]];ctx.beginPath();ctx.arc(OX+c*S+S/2,OY+r*S+S/2,S*.42,0,Math.PI*2);ctx.fill();}ctx.shadowBlur=0;ctx.strokeStyle='rgba(255,255,255,.25)';ctx.beginPath();ctx.moveTo(360,650);ctx.lineTo(aim.x,aim.y);ctx.stroke();ctx.fillStyle=colors[next];ctx.beginPath();ctx.arc(360,650,24,0,Math.PI*2);ctx.fill();if(shot){ctx.fillStyle=colors[shot.color];ctx.beginPath();ctx.arc(shot.x,shot.y,22,0,Math.PI*2);ctx.fill();}requestAnimationFrame(loop)}requestAnimationFrame(loop);return()=>{};
  }

  const MODES={
    snake:initSnake,
    jumper:()=>initJumper('pulse'),
    sudoku:initSudoku,
    aurora:initAurora,
    cascade:initCascade,
    maze:initMaze,
    grid3:initGridThree,
    merge4096:init4096,
    freecell:initOpenCell,
    stack:initStack,
    fossil:()=>initJumper('fossil'),
    void:initVoid,
    slope:initSlope,
    draughts:initDraughts,
    hearts:()=>initTrick('hearts'),
    spades:()=>initTrick('spades'),
    wordhunt:initWordHunt,
    dice:initDice,
    drift:initDrift,
    orbs:initOrbs,
  };

  emit('runtime_ready');
  restart();
})();