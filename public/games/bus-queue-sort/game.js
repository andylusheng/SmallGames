let ART='';
const LOGW=465,LOGH=720;
const colors={
  purple:{base:'#8b49e9',light:'#bd78ff',dark:'#5d239f'},
  yellow:{base:'#f4b216',light:'#ffd75b',dark:'#b87800'},
  blue:{base:'#178fe3',light:'#55c0ff',dark:'#075fa8'},
  green:{base:'#36bc3d',light:'#75e35f',dark:'#208329'},
  gray:{base:'#52637e',light:'#8797ad',dark:'#334056'}
};
const busPos={purple:[96,265],yellow:[202,265],blue:[288,265],green:[381,265]};
const capInit={purple:4,yellow:2,blue:1,green:3};
const rulePos={purple:[350,433],yellow:[373,433],green:[395,433],blue:[350,456]};
const waitSlots=[[373,456],[395,456],[418,456],[418,433],[326,456]];
const queueXs=[70,110,155,200,245,295,340,390];
const queueYs=[516,548,580,610];
const baseColumns=[
  ['purple','purple','purple','purple'],
  ['purple','purple','purple','purple'],
  ['yellow','yellow','yellow','yellow'],
  ['yellow','yellow','yellow','yellow'],
  ['blue','blue','blue','blue'],
  ['vip','blue','blue','blue'],
  ['green','green','green','green'],
  ['gray','gray','gray','gray']
];
const sequences=[
 ['purple','yellow','blue','green'],['yellow','blue','green','purple'],['blue','green','purple','yellow'],['green','purple','yellow','blue'],
 ['purple','blue','yellow','green'],['yellow','green','blue','purple'],['blue','purple','green','yellow'],['green','yellow','purple','blue']
];
const levels=Array.from({length:30},(_,i)=>({
  label:42+i,
  moves:24+Math.min(8,Math.floor(i/4)),
  wait:i<8?5:i<18?4:3,
  sequence:sequences[i%sequences.length],
  target:24+Math.min(8,Math.floor(i/3))
}));
let state;
const $=s=>document.querySelector(s), dynamic=$('#dynamic');
const clone=v=>JSON.parse(JSON.stringify(v));

function personSVG(type,id){
  const vip=type==='vip', wild=type==='gray';
  const c=colors[vip?'yellow':type];
  const gid='g'+id;
  return `<svg viewBox="0 0 32 44" aria-hidden="true">
  <defs>
    <radialGradient id="${gid}h" cx="34%" cy="20%" r="76%"><stop offset="0" stop-color="${c.light}"/><stop offset=".42" stop-color="${c.base}"/><stop offset="1" stop-color="${c.dark}"/></radialGradient>
    <linearGradient id="${gid}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.light}"/><stop offset=".28" stop-color="${c.base}"/><stop offset="1" stop-color="${c.dark}"/></linearGradient>
    <filter id="${gid}s" x="-40%" y="-40%" width="180%" height="190%"><feDropShadow dx="0" dy="2.1" stdDeviation="1.4" flood-color="#3c2a20" flood-opacity=".34"/></filter>
  </defs>
  <g filter="url(#${gid}s)">
    <ellipse cx="16" cy="41.4" rx="10.5" ry="2.4" fill="#5b4031" opacity=".25"/>
    <rect x="10" y="28" width="5.2" height="12.2" rx="2.4" fill="${c.dark}"/><rect x="17" y="28" width="5.2" height="12.2" rx="2.4" fill="${c.dark}"/>
    <rect x="10.7" y="28" width="3.7" height="10.6" rx="1.8" fill="${c.base}"/><rect x="17.7" y="28" width="3.7" height="10.6" rx="1.8" fill="${c.base}"/>
    <ellipse cx="7.3" cy="23.6" rx="4.5" ry="7.1" fill="${c.dark}"/><ellipse cx="24.7" cy="23.6" rx="4.5" ry="7.1" fill="${c.dark}"/>
    <ellipse cx="7.7" cy="22.9" rx="3.4" ry="6.2" fill="url(#${gid}b)"/><ellipse cx="24.3" cy="22.9" rx="3.4" ry="6.2" fill="url(#${gid}b)"/>
    <rect x="8.2" y="14.5" width="15.6" height="20" rx="7.5" fill="${vip?'#e9910b':c.dark}"/>
    <rect x="9.2" y="15.3" width="13.6" height="18.3" rx="6.6" fill="${vip?'#f5a812':`url(#${gid}b)`}"/>
    <circle cx="16" cy="9.9" r="10.1" fill="${c.dark}"/><circle cx="16" cy="9.4" r="9.1" fill="url(#${gid}h)"/>
    <ellipse cx="12.4" cy="5.5" rx="3.5" ry="2.7" fill="#fff" opacity=".24"/>
    <ellipse cx="12.1" cy="18.3" rx="3.0" ry="2.2" fill="#fff" opacity=".16"/>
    ${vip?'<rect x="9.5" y="18.6" width="13" height="8.5" rx="3.5" fill="#f3a20d"/><text x="16" y="24.8" text-anchor="middle" font-size="6.6" font-weight="900" font-family="Arial,sans-serif" fill="#9b5900">VIP</text>':''}
    ${wild?'<path d="M12 19h8M16 15v8" stroke="#dce7f4" stroke-width="1.2" stroke-linecap="round" opacity=".72"/>':''}
  </g></svg>`;
}

function makeLevelColumns(level){
  const cols=clone(baseColumns);
  const shift=(level-1)%4;
  const map=['purple','yellow','blue','green'];
  for(let c=0;c<cols.length;c++){
    for(let r=0;r<cols[c].length;r++){
      if(cols[c][r]==='gray'||cols[c][r]==='vip') continue;
      const idx=map.indexOf(cols[c][r]);
      cols[c][r]=map[(idx+shift)%4];
    }
  }
  if(level<4){cols[7]=['green','blue','yellow','purple'];cols[5][0]='yellow';}
  if(level>=10){cols[7][0]='gray';cols[5][0]='vip';}
  return cols;
}

function init(levelIndex=1){
  const cfg=levels[(levelIndex-1)%levels.length];
  state={
    index:levelIndex,label:cfg.label,moves:cfg.moves,waitLimit:cfg.wait,sequence:cfg.sequence.slice(),seqIndex:0,
    columns:makeLevelColumns(levelIndex),front:Array(8).fill(0),waiting:[],capacities:{...capInit},boarded:0,target:cfg.target,
    combo:0,lastColor:null,shuffleUses:3,slotUses:2,refreshUses:2,locked:false,firstInputSent:false
  };
  $('#winOverlay').classList.remove('show');$('#loseOverlay').classList.remove('show');
  render();post('runtime_ready',{level:state.label});
}

function activeFronts(){return state.columns.map((col,i)=>col[state.front[i]]).filter(Boolean)}
function normalizeColor(type){return type==='vip'?'yellow':type==='gray'?null:type}
function currentNeed(){
  const fronts=activeFronts().map(normalizeColor).filter(Boolean);
  const waiting=state.waiting.map(p=>normalizeColor(p.type)).filter(Boolean);
  const avail=new Set(fronts.concat(waiting));
  if(!avail.size)return state.sequence[state.seqIndex%state.sequence.length];
  for(let i=0;i<state.sequence.length;i++){
    const c=state.sequence[(state.seqIndex+i)%state.sequence.length];
    if(avail.has(c)){state.seqIndex+=i;return c;}
  }
  return [...avail][0];
}
function peekNeed(){const old=state.seqIndex;const n=currentNeed();state.seqIndex=old;return n}

function render(){
  dynamic.innerHTML='';
  $('#levelLabel').textContent='LEVEL '+state.label;$('#movesLabel').textContent=state.moves;
  Object.keys(state.capacities).forEach(c=>$('#cap-'+c).textContent=state.capacities[c]+'/12');
  $('#shuffleCount').textContent=state.shuffleUses;$('#slotCount').textContent=state.slotUses;$('#refreshCount').textContent=state.refreshUses;
  renderRule();renderWaiting();renderQueue();renderTutorial();
}
function renderTutorial(){
  if(state.firstInputSent||state.index!==1)return;
  const a=document.createElement('div');a.className='tutorial-arrow';
  a.innerHTML=`<svg viewBox="0 0 42 58"><path d="M17 3h8v31h10L21 54 7 34h10z" fill="#8b49e9" stroke="#fff" stroke-width="5" stroke-linejoin="round"/><path d="M20 6h3v29" stroke="#c997ff" stroke-width="2.2" stroke-linecap="round" opacity=".75"/></svg>`;
  dynamic.appendChild(a);
}

function renderRule(){
  const need=peekNeed();const [x,y]=rulePos[need]||rulePos.purple;
  const g=document.createElement('div');g.className='rule-glow';g.style.left=x/LOGW*100+'%';g.style.top=y/LOGH*100+'%';g.style.color=colors[need].base;dynamic.appendChild(g);
}
function renderWaiting(){
  state.waiting.forEach((p,i)=>{const [x,y]=waitSlots[i]||waitSlots[waitSlots.length-1];const d=document.createElement('div');d.className='wait-dot';d.style.left=x/LOGW*100+'%';d.style.top=y/LOGH*100+'%';d.style.background=colors[normalizeColor(p.type)||'gray'].base;dynamic.appendChild(d)})
}
function renderQueue(){
  state.columns.forEach((col,ci)=>{
    const fi=state.front[ci];
    for(let ri=fi;ri<col.length;ri++){
      const slot=ri-fi;if(slot>=queueYs.length)continue;
      const type=col[ri],x=queueXs[ci],y=queueYs[slot];
      const d=document.createElement('div');d.className='person'+(ri===fi?' front':'');d.style.left=x/LOGW*100+'%';d.style.top=y/LOGH*100+'%';d.innerHTML=personSVG(type,`${ci}_${ri}_${state.index}`);dynamic.appendChild(d);
      if(ri===fi){const h=document.createElement('button');h.className='front-hit';h.style.left=x/LOGW*100+'%';h.style.top=y/LOGH*100+'%';h.setAttribute('aria-label','Move front passenger');h.onclick=()=>tapPassenger(ci,ri,type,x,y);dynamic.appendChild(h)}
    }
  })
}

function tapPassenger(ci,ri,type,x,y){
  if(state.locked||state.moves<=0)return;
  state.moves--;$('#movesLabel').textContent=state.moves;
  if(!state.firstInputSent){state.firstInputSent=true;post('first_input',{level:state.label,color:type})}
  const need=currentNeed();const c=normalizeColor(type);
  if(type==='gray'||c===need) board(ci,ri,type,x,y,need); else moveToWaiting(ci,ri,type,x,y);
  if(state.moves<=0&&!state.locked&&state.boarded<state.target)setTimeout(lose,420);
}
function board(ci,ri,type,x,y,need){
  state.front[ci]++;
  const c=type==='gray'?need:normalizeColor(type);
  animatePerson(type,x,y,busPos[c][0],busPos[c][1],()=>{
    state.capacities[c]++;
    state.boarded+=type==='vip'?2:1;
    state.seqIndex++;
    if(state.lastColor===c)state.combo++;else state.combo=1;
    state.lastColor=c;
    sfx(state.combo>=2?'combo':'match');if(state.combo>=2)showCombo();
    if(state.capacities[c]>=12)busFull(c);
    autoBoardWaiting();checkWin();render();
  })
}
function moveToWaiting(ci,ri,type,x,y){
  if(state.waiting.length>=state.waitLimit){sfx('fail');lose();return;}
  state.front[ci]++;
  const slot=waitSlots[state.waiting.length]||waitSlots[waitSlots.length-1];
  animatePerson(type,x,y,slot[0],slot[1],()=>{state.waiting.push({type});state.combo=0;state.lastColor=null;sfx('wait');toast('Waiting slot used');render()})
}
function autoBoardWaiting(){
  let guard=0;
  while(state.waiting.length&&guard++<8){
    const need=currentNeed();
    let idx=state.waiting.findIndex(p=>p.type==='gray'||normalizeColor(p.type)===need);
    if(idx<0)break;
    const p=state.waiting.splice(idx,1)[0];const c=p.type==='gray'?need:normalizeColor(p.type);
    state.capacities[c]++;state.boarded+=p.type==='vip'?2:1;state.seqIndex++;
    if(state.capacities[c]>=12)busFull(c);
  }
}
function animatePerson(type,sx,sy,dx,dy,done){
  const fly=document.createElement('div');fly.className='fly';fly.style.left=sx/LOGW*100+'%';fly.style.top=sy/LOGH*100+'%';fly.innerHTML=personSVG(type,'fly_'+Date.now());$('#stage').appendChild(fly);
  const start=performance.now(),dur=520;const cx=(sx+dx)/2+(dx>sx?16:-16),cy=Math.min(sy,dy)-70;
  function frame(now){const t=Math.min(1,(now-start)/dur),e=1-Math.pow(1-t,3),u=1-e;
    const x=u*u*sx+2*u*e*cx+e*e*dx,y=u*u*sy+2*u*e*cy+e*e*dy,scale=1-.36*e;
    fly.style.left=x/LOGW*100+'%';fly.style.top=y/LOGH*100+'%';fly.style.transform=`translate(-50%,-50%) scale(${scale}) rotate(${(e-.5)*8}deg)`;
    if(t<1)requestAnimationFrame(frame);else{fly.remove();done&&done()}
  }requestAnimationFrame(frame)
}
function busFull(c){
  state.capacities[c]=0;toast(c.toUpperCase()+' BUS DEPARTED');sfx('bus');
  const [x,y]=busPos[c],f=document.createElement('div');f.className='bus-flash show';f.style.left=x/LOGW*100+'%';f.style.top=y/LOGH*100+'%';$('#stage').appendChild(f);setTimeout(()=>f.remove(),650);burst(x,y,14)
}
function checkWin(){if(state.boarded>=state.target&&!state.locked){state.locked=true;setTimeout(()=>{sfx('win');confetti();$('#winText').textContent=`${state.boarded} passengers sorted · ${state.moves} moves left`;$('#winOverlay').classList.add('show');post('game_end',{result:'win',level:state.label,boarded:state.boarded,moves:state.moves});localStorage.setItem('busQueueLevel',String(Math.min(30,state.index+1)))},500)}}
function lose(){if(state.locked)return;state.locked=true;$('#loseOverlay').classList.add('show');post('game_end',{result:'fail',level:state.label,boarded:state.boarded})}
function restartLevel(){init(state.index)}function nextLevel(){init(Math.min(30,state.index+1))}

function useShuffle(){if(state.locked||state.shuffleUses<=0)return;state.shuffleUses--;for(let i=0;i<state.columns.length;i++){const fi=state.front[i];const tail=state.columns[i].slice(fi);tail.sort(()=>Math.random()-.5);state.columns[i].splice(fi,tail.length,...tail)}state.combo=0;state.lastColor=null;sfx('tool');toast('Queues shuffled');render()}
function useExtraSlot(){if(state.locked||state.slotUses<=0)return;state.slotUses--;state.waitLimit=Math.min(5,state.waitLimit+1);sfx('tool');toast('Waiting capacity +1');render()}
function useRefresh(){if(state.locked||state.refreshUses<=0)return;state.refreshUses--;const fronts=activeFronts().map(normalizeColor).filter(Boolean);if(fronts.length){state.sequence[state.seqIndex%state.sequence.length]=fronts[Math.floor(Math.random()*fronts.length)]}state.combo=0;state.lastColor=null;sfx('tool');toast('Platform rule refreshed');render()}

function showCombo(){const c=$('#combo');c.textContent=state.combo>=4?'PERFECT ×'+state.combo:'COMBO ×'+state.combo;c.classList.add('show');clearTimeout(showCombo.t);showCombo.t=setTimeout(()=>c.classList.remove('show'),650)}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),900)}
function burst(x,y,n){const r=$('#stage').getBoundingClientRect();for(let i=0;i<n;i++){const p=document.createElement('div');p.className='particle';p.style.left=x/LOGW*r.width+(Math.random()*40-20)+'px';p.style.top=y/LOGH*r.height+'px';p.style.background=['#fff','#ffd34d','#ff65aa','#5be7ff'][i%4];p.style.animationDuration=.55+Math.random()*.5+'s';$('#confetti').appendChild(p);setTimeout(()=>p.remove(),1300)}}
function confetti(){const r=$('#stage').getBoundingClientRect();for(let i=0;i<55;i++){const p=document.createElement('div');p.className='particle';p.style.left=Math.random()*r.width+'px';p.style.top='-20px';p.style.background=['#ffd34d','#8b49e9','#178fe3','#36bc3d','#ff6688'][i%5];p.style.animationDuration=.85+Math.random()*.8+'s';p.style.animationDelay=Math.random()*.28+'s';$('#confetti').appendChild(p);setTimeout(()=>p.remove(),1900)}}
let audio;
function sfx(type){try{audio=audio||new(window.AudioContext||window.webkitAudioContext)();const o=audio.createOscillator(),g=audio.createGain();o.connect(g);g.connect(audio.destination);const n=audio.currentTime,f={match:610,combo:760,wait:270,tool:470,fail:145,win:860,bus:390}[type]||500;o.frequency.setValueAtTime(f,n);if(type==='win')o.frequency.exponentialRampToValueAtTime(1320,n+.28);if(type==='combo')o.frequency.exponentialRampToValueAtTime(1040,n+.12);if(type==='bus')o.frequency.exponentialRampToValueAtTime(220,n+.26);g.gain.setValueAtTime(.0001,n);g.gain.exponentialRampToValueAtTime(.075,n+.015);g.gain.exponentialRampToValueAtTime(.0001,n+.24);o.start(n);o.stop(n+.26)}catch(e){}}
function post(event,data={}){try{parent.postMessage({source:'zeroplay-game',event,...data},'*')}catch(e){}}
async function loadArt(){const files=Array.from({length:10},(_,i)=>`assets/prototype-${i}.txt`),parts=await Promise.all(files.map(async f=>{const r=await fetch(f,{cache:'force-cache'});if(!r.ok)throw new Error('Missing '+f);return(await r.text()).trim()}));ART='data:image/webp;base64,'+parts.join('');$('#art').src=ART;await $('#art').decode().catch(()=>{})}
async function loadPatch(){const files=Array.from({length:6},(_,i)=>`assets/art-${i}.txt`),parts=await Promise.all(files.map(async f=>{const r=await fetch(f,{cache:'force-cache'});if(!r.ok)throw new Error('Missing '+f);return(await r.text()).trim()}));$('#queueFloor').src='data:image/png;base64,'+parts.join('');await $('#queueFloor').decode().catch(()=>{})}
async function boot(){try{await Promise.all([loadArt(),loadPatch()]);const saved=Math.max(1,parseInt(localStorage.getItem('busQueueLevel')||'1',10)||1);init(Math.min(saved,30))}catch(err){console.error(err);toast('Game art failed to load')}}
boot();
