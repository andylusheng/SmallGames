(()=>{
  const KEY='zeroplay-color-puzzle-audio';
  let audioOn=localStorage.getItem(KEY)!=='0';
  let ctx=null;
  const colors=['#ff5f67','#ffc94a','#52d273','#4da3ff','#9a6cff','#ff934d'];
  function ensureAudio(){if(!audioOn)return null;try{ctx ||= new (window.AudioContext||window.webkitAudioContext)();if(ctx.state==='suspended')ctx.resume();return ctx}catch{return null}}
  function tone(freq=440,dur=.07,type='sine',gain=.035){const c=ensureAudio();if(!c)return;const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(gain,c.currentTime);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+dur);o.connect(g).connect(c.destination);o.start();o.stop(c.currentTime+dur)}
  function sfx(kind){if(kind==='tap')tone(420,.045,'triangle',.025);else if(kind==='good'){tone(650,.07,'sine',.04);setTimeout(()=>tone(880,.08,'sine',.035),55)}else if(kind==='clear'){tone(520,.08,'triangle',.04);setTimeout(()=>tone(780,.09,'triangle',.04),55);setTimeout(()=>tone(1040,.11,'sine',.035),110)}else if(kind==='bad')tone(150,.12,'sawtooth',.025);else if(kind==='win'){[520,660,790,1040].forEach((f,i)=>setTimeout(()=>tone(f,.12,'sine',.04),i*75))}}
  function toggleAudio(){audioOn=!audioOn;localStorage.setItem(KEY,audioOn?'1':'0');return audioOn}
  function toast(text){let el=document.querySelector('.toast');if(!el){el=document.createElement('div');el.className='toast';document.body.appendChild(el)}el.textContent=text;el.classList.add('show');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('show'),900)}
  function confetti(x=innerWidth/2,y=innerHeight/2,n=28){for(let i=0;i<n;i++){const p=document.createElement('i');p.className='spark';p.style.left=x+'px';p.style.top=y+'px';p.style.background=colors[i%colors.length];const a=Math.random()*Math.PI*2,d=45+Math.random()*110;p.style.setProperty('--dx',Math.cos(a)*d+'px');p.style.setProperty('--dy',Math.sin(a)*d+'px');document.body.appendChild(p);setTimeout(()=>p.remove(),850)}}
  function emit(type,detail={}){try{parent.postMessage({source:'zeroplay-game',type,...detail},'*')}catch{}}
  function store(key,fallback=0){const value=localStorage.getItem(key);return value===null?fallback:(Number.isFinite(+value)?+value:value)}
  function save(key,value){localStorage.setItem(key,String(value))}
  function vibrate(ms=18){try{navigator.vibrate?.(ms)}catch{}}
  window.ZP={colors,sfx,toggleAudio,get audioOn(){return audioOn},toast,confetti,emit,store,save,vibrate};
  let firstInput=false;
  function markInput(){ensureAudio();if(!firstInput){firstInput=true;emit('first_input')}}
  addEventListener('pointerdown',markInput,{once:true});
  addEventListener('keydown',markInput,{once:true});
  emit('runtime_ready');
})();

