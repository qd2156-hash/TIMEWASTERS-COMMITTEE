/* app.js - site interactions for Timewasters portal */

/* === Particle background ===
   Canvas-based lightweight particle system that responds to mouse
*/
(function(){
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.left = 0;
  canvas.style.top = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = 1;
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let DPR = window.devicePixelRatio || 1;
  function resize(){
    canvas.width = innerWidth * DPR;
    canvas.height = innerHeight * DPR;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.scale(DPR, DPR);
  }
  resize();
  window.addEventListener('resize', resize);

  // create particles
  const particles = [];
  const colors = ['rgba(255,70,70,0.12)','rgba(255,155,46,0.12)','rgba(255,213,74,0.12)','rgba(95,208,255,0.08)'];
  function spawn(x,y){
    const p = {x,y,vx:(Math.random()-0.5)*0.6, vy:(Math.random()-0.5)*0.6, r:6+Math.random()*8, life: 80+Math.random()*100, c:colors[Math.floor(Math.random()*colors.length)]};
    particles.push(p);
    if(particles.length>300) particles.shift();
  }
  // spawn a subtle field
  setInterval(()=> spawn(Math.random()*innerWidth, Math.random()*innerHeight), 180);

  // mouse trail
  let mx=-1000,my=-1000;
  document.addEventListener('mousemove', (e)=> { mx=e.clientX; my=e.clientY; for(let i=0;i<2;i++) spawn(mx+ (Math.random()-0.5)*40, my + (Math.random()-0.5)*40); });

  function draw(){
    ctx.clearRect(0,0,innerWidth, innerHeight);
    for(let i=particles.length-1;i>=0;i--){
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      ctx.beginPath();
      ctx.fillStyle = p.c;
      ctx.arc(p.x, p.y, Math.max(0.2, p.r * (p.life/180)), 0, Math.PI*2);
      ctx.fill();
      if(p.life<0) particles.splice(i,1);
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* === Access control to rebel page (client-side) ===
   - If user enters the correct password, redirect to rebel.html
*/
(function(){
  const accessForm = document.querySelector('.access');
  if(!accessForm) return;
  const input = accessForm.querySelector('input');
  const btn = accessForm.querySelector('button');

  btn.addEventListener('click', ()=> {
    const val = (input.value || '').trim();
    // default demo password
    const PASS = 'WAKE2149';
    if(val === PASS){
      window.location.href = 'rebel.html';
    } else {
      input.value = '';
      input.placeholder = 'ACCESS DENIED';
      input.style.borderColor = 'rgba(255,100,100,0.6)';
      setTimeout(()=> { input.placeholder = 'Enter access code'; input.style.borderColor=''; }, 1800);
    }
  });

  input.addEventListener('keypress', (e)=> {
    if(e.key === 'Enter') btn.click();
  });
})();

/* === Small interactive demo: citizen score simulator on citizens.html === */
(function(){
  if(!document.querySelector('#simulateScore')) return;
  const btn = document.querySelector('#simulateScore');
  const out = document.querySelector('#scoreOut');
  let score = 42;
  btn.addEventListener('click', ()=> {
    // simulate increase
    score += Math.floor(Math.random()*18)+2;
    if(score>100) score = 100;
    out.textContent = score;
    out.style.transition = 'transform .18s';
    out.style.transform = 'scale(1.08)';
    setTimeout(()=> out.style.transform = 'scale(1)', 180);
  });
})();
