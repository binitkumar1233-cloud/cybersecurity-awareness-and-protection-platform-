
(function(){
  const c = document.getElementById('net'); const ctx = c.getContext('2d');
  let data = Array.from({length:100}, ()=>0);
  function draw(){ const W=c.width, H=c.height; ctx.clearRect(0,0,W,H); ctx.globalAlpha=.6; ctx.strokeStyle='rgba(255,255,255,.15)'; ctx.beginPath(); ctx.moveTo(30,10); ctx.lineTo(30,H-20); ctx.lineTo(W-10,H-20); ctx.stroke(); ctx.globalAlpha=1; ctx.beginPath(); const max=Math.max(40,...data), sx=(W-50)/(data.length-1), sy=(H-40)/max; data.forEach((v,i)=>{ const x=30+i*sx, y=(H-20)-v*sy; if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y); }); ctx.lineWidth=2; ctx.strokeStyle='#0FF0FC'; ctx.shadowColor='rgba(147,51,234,.6)'; ctx.shadowBlur=8; ctx.stroke(); ctx.shadowBlur=0; }
  function tick(){ const last=data[data.length-1]||10; const next=Math.max(0, Math.min(140, last+(Math.random()*18-9))) + (Math.random()<0.06 ? 60 : 0); data.push(next); if(data.length>100) data.shift(); draw(); }
  draw(); setInterval(tick, 900);
  const log = document.getElementById('log'); const msgs=["New device login","Failed MFA attempt","Suspicious IP blocked","Policy update","Multiple failed logins","New API token created"]; const levels=["GOOD","WARN","ALERT"];
  function addEvent(){ const m=msgs[Math.floor(Math.random()*msgs.length)], lv=levels[Math.floor(Math.random()*levels.length)]; const div=document.createElement('div'); div.className='card'; div.innerHTML=`<strong>${m}</strong> <span class='btn' style='margin-left:6px'>${lv}</span> <div style='color:#9BB0D1; font-size:12px'>${new Date().toLocaleTimeString()}</div>`; log.prepend(div); while(log.children.length>40){ log.lastChild.remove(); } }
  for(let i=0;i<6;i++) addEvent(); setInterval(addEvent, 1500);
})();
