let ART='';
const W=465,H=720;
const colors={purple:'#8a43e8',yellow:'#f1ab13',blue:'#168de2',green:'#42b936',gray:'#68758a'};
const busDest={purple:[92,300],yellow:[185,300],blue:[278,300],green:[374,300]};
const ruleDots={purple:[349,435],yellow:[372,435],green:[394,435],blue:[394,458]};
const waitDots=[[349,458],[372,458],[394,458],[417,458]];
const columns=[
  {color:'purple',x:68,ys:[515,543,571,599]},
  {color:'purple',x:110,ys:[515,543,571,599]},
  {color:'yellow',x:153,ys:[515,543,571,599]},
  {color:'yellow',x:199,ys:[515,543,571,599]},
  {color:'blue',x:248,ys:[515,543,571,599]},
  {color:'blue',x:294,ys:[515,543,571,599]},
  {color:'green',x:339,ys:[515,543,571,599]},
  {color:'gray',x:385,ys:[515,543,571,599]}
];
const sequence=['purple','yellow','blue','green','yellow','blue','green','purple'];
let state;
const $=s=>document.querySelector(s);
const dynamic=$('#dynamic');
function init(level=42){
  state={level,moves:24,front:columns.map(()=>0),removed:columns.map(()=>[false,false,false,false]),waiting:[],waitLimit:3,seq:0,boarded:0,target:16,combo:0,caps:{purple:12,yellow:8,blue:6,green:10},locked:false,first:false,hud:false};
  $('#runtimeHud').classList.remove('on');
  $('#winOverlay').classList.remove('show');$('#loseOverlay').classList.remove('show');
  render();post('runtime_ready',{level});
}
function currentNeed(){
  for(let n=0;n<sequence.length;n++){
    const c=sequence[(state.seq+n)%sequence.length];
    if(hasFrontColor(c)||state.waiting.some(x=>x.color===c))return c;
  }
  return 'purple';
}
function hasFrontColor(c){return columns.some((col,i)=>col.color===c&&state.front[i]<col.ys.length)}
function render(){
  dynamic.innerHTML='';
  renderActiveRing();renderWaiting();renderHits();
  if(state.hud){
    $('#movesValue').textContent=state.moves;
    $('#capPurple').textContent=state.caps.purple+'/12';
    $('#capYellow').textContent=state.caps.yellow+'/12';
    $('#capBlue').textContent=state.caps.blue+'/12';
    $('#capGreen').textContent=state.caps.green+'/12';
    $('#runtimeHud').classList.add('on');
  }
}
function renderActiveRing(){
  if(!state.first)return;
  const need=currentNeed(),p=ruleDots[need];if(!p)return;
  const r=document.createElement('i');r.className='active-ring';r.style.left=p[0]/W*100+'%';r.style.top=p[1]/H*100+'%';r.style.color=colors[need];dynamic.appendChild(r);
}
function renderWaiting(){
  state.waiting.forEach((p,i)=>{if(!waitDots[i])return;const d=document.createElement('i');d.className='wait-dot';d.style.left=waitDots[i][0]/W*100+'%';d.style.top=waitDots[i][1]/H*100+'%';d.style.background=colors[p.color]||colors.gray;dynamic.appendChild(d)})
}
function renderHits(){
  columns.forEach((col,ci)=>{
    for(let ri=0;ri<state.front[ci];ri++)addPatch(col.x,col.ys[ri]);
    const ri=state.front[ci];if(ri>=col.ys.length)return;
    const h=document.createElement('button');h.className='hit';h.style.left=col.x/W*100+'%';h.style.top=col.ys[ri]/H*100+'%';h.setAttribute('aria-label','Select front passenger');h.onclick=()=>tap(ci,ri,col);dynamic.appendChild(h);
  });
}
function addPatch(x,y){const p=document.createElement('i');p.className='floor-patch';p.style.left=x/W*100+'%';p.style.top=y/H*100+'%';dynamic.appendChild(p)}
function tap(ci,ri,col){
  if(state.locked||state.moves<=0)return;
  state.hud=true;state.moves--;
  if(!state.first){state.first=true;post('first_input',{level:state.level,color:col.color})}
  if(col.color==='gray'){moveWaiting(ci,ri,col);return}
  const need=currentNeed();
  if(col.color===need)board(ci,ri,col);else moveWaiting(ci,ri,col);
}
function board(ci,ri,col){
  state.front[ci]++;state.removed[ci][ri]=true;
  animatePerson(col.x,col.ys[ri],busDest[col.color],()=>{
    if(state.caps[col.color]>=12){state.caps[col.color]=0;toast(col.color.toUpperCase()+' BUS DEPARTED');burst(busDest[col.color][0],busDest[col.color][1],12)}
    state.caps[col.color]++;
    state.boarded++;state.combo++;state.seq=(state.seq+1)%sequence.length;
    sfx(state.combo>1?'combo':'match');if(state.combo>1)showCombo();
    autoWaiting();render();checkEnd();
  });
}
function moveWaiting(ci,ri,col){
  if(state.waiting.length>=state.waitLimit){lose();return}
  state.front[ci]++;state.removed[ci][ri]=true;state.combo=0;
  const dest=waitDots[Math.min(state.waiting.length,waitDots.length-1)];
  animatePerson(col.x,col.ys[ri],dest,()=>{state.waiting.push({color:col.color});sfx('wait');toast('WAITING SLOT USED');render();checkEnd()});
}
function autoWaiting(){
  let guard=0;
  while(guard++<6&&state.waiting.length){
    const need=currentNeed(),i=state.waiting.findIndex(p=>p.color===need);if(i<0||need==='gray')break;
    const p=state.waiting.splice(i,1)[0];
    if(state.caps[p.color]>=12)state.caps[p.color]=0;
    state.caps[p.color]++;state.boarded++;state.seq=(state.seq+1)%sequence.length;
  }
}
function animatePerson(x,y,dest,done){
  const stage=$('#stage'),r=stage.getBoundingClientRect(),fly=document.createElement('div');fly.className='fly';fly.style.left=x/W*100+'%';fly.style.top=y/H*100+'%';
  const cropW=42,cropH=54,x0=x-cropW/2,y0=y-cropH/2,im=document.createElement('img');im.src=ART;im.style.width=W/cropW*100+'%';im.style.height=H/cropH*100+'%';im.style.left=-x0/cropW*100+'%';im.style.top=-y0/cropH*100+'%';fly.appendChild(im);stage.appendChild(fly);
  const tx=(dest[0]-x)/W*r.width,ty=(dest[1]-y)/H*r.height;
  const a=fly.animate([{transform:'translate(-50%,-50%) scale(1)'},{transform:`translate(calc(-50% + ${tx*.48}px),calc(-50% + ${ty*.32-24}px)) scale(1.08)`,offset:.5},{transform:`translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px)) scale(.55)`}],{duration:500,easing:'cubic-bezier(.2,.8,.2,1)'});
  a.onfinish=()=>{fly.remove();done&&done()};
}
function checkEnd(){
  if(state.boarded>=state.target){state.locked=true;setTimeout(win,350);return}
  if(state.moves<=0){lose();return}
  if(state.waiting.length>=state.waitLimit&&!hasFrontColor(currentNeed()))lose();
}
function win(){sfx('win');confetti();$('#winText').textContent=state.boarded+' passengers boarded';$('#winOverlay').classList.add('show');post('game_end',{result:'win',level:state.level,boarded:state.boarded,moves:state.moves})}
function lose(){if(state.locked)return;state.locked=true;sfx('fail');$('#loseOverlay').classList.add('show');post('game_end',{result:'fail',level:state.level,boarded:state.boarded,moves:state.moves})}
function useShuffle(){if(state.locked)return;const fronts=columns.filter((c,i)=>state.front[i]<c.ys.length&&c.color!=='gray');if(!fronts.length)return;const c=fronts[Math.floor(Math.random()*fronts.length)].color;const idx=sequence.indexOf(c);state.seq=idx<0?state.seq:idx;state.combo=0;sfx('tool');toast('QUEUE ORDER SHUFFLED');render()}
function useExtraSlot(){if(state.locked)return;state.waitLimit=Math.min(4,state.waitLimit+1);sfx('tool');toast('EXTRA WAITING SLOT +1');render()}
function useRefresh(){if(state.locked)return;const fronts=columns.filter((c,i)=>state.front[i]<c.ys.length&&c.color!=='gray');if(fronts.length){const c=fronts[0].color;const idx=sequence.indexOf(c);if(idx>=0)state.seq=idx}state.combo=0;sfx('tool');toast('PASSENGERS REFRESHED');render()}
function showCombo(){const e=$('#combo');e.textContent='COMBO ×'+Math.min(9,state.combo);e.classList.add('show');clearTimeout(showCombo.t);showCombo.t=setTimeout(()=>e.classList.remove('show'),600)}
function toast(msg){const e=$('#toast');e.textContent=msg;e.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('show'),850)}
function burst(x,y,n){const r=$('#stage').getBoundingClientRect();for(let i=0;i<n;i++){const p=document.createElement('i');p.className='particle';p.style.left=x/W*r.width+'px';p.style.top=y/H*r.height+'px';p.style.background=['#fff','#ffd43b','#ff67ad','#60e8ff'][i%4];p.style.animationDuration=.55+Math.random()*.5+'s';p.style.transform=`translateX(${Math.random()*55-28}px)`;$('#confetti').appendChild(p);setTimeout(()=>p.remove(),1200)}}
function confetti(){const r=$('#stage').getBoundingClientRect();for(let i=0;i<45;i++){const p=document.createElement('i');p.className='particle';p.style.left=Math.random()*r.width+'px';p.style.top='-18px';p.style.background=['#ffd43b','#8a43e8','#168de2','#42b936','#ff6688'][i%5];p.style.animationDuration=.8+Math.random()*.8+'s';p.style.animationDelay=Math.random()*.3+'s';$('#confetti').appendChild(p);setTimeout(()=>p.remove(),1900)}}
let audio;
function sfx(type){try{audio=audio||new(window.AudioContext||window.webkitAudioContext)();const o=audio.createOscillator(),g=audio.createGain(),now=audio.currentTime,f={match:620,combo:780,wait:280,tool:480,fail:145,win:880}[type]||500;o.connect(g);g.connect(audio.destination);o.frequency.setValueAtTime(f,now);if(type==='win')o.frequency.exponentialRampToValueAtTime(1300,now+.25);g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(.06,now+.012);g.gain.exponentialRampToValueAtTime(.0001,now+.21);o.start();o.stop(now+.23)}catch(e){}}
function post(event,data={}){try{parent.postMessage({source:'zeroplay-game',event,...data},'*')}catch(e){}}
async function loadArt(){const files=Array.from({length:10},(_,i)=>`assets/prototype-${i}.txt`);const parts=await Promise.all(files.map(async f=>{const r=await fetch(f,{cache:'force-cache'});if(!r.ok)throw new Error('Missing '+f);return(await r.text()).trim()}));ART='data:image/webp;base64,'+parts.join('');$('#art').src=ART;await $('#art').decode().catch(()=>{})}
async function boot(){try{await loadArt();init(42)}catch(err){console.error(err);toast('Game art failed to load')}}
$('#shuffleHit').onclick=useShuffle;$('#slotHit').onclick=useExtraSlot;$('#refreshHit').onclick=useRefresh;$('#retryButton').onclick=()=>init(state.level);$('#nextButton').onclick=()=>init(state.level+1);
boot();
