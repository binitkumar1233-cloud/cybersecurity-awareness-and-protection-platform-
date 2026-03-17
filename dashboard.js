
(function(){
  const sessionsEl = document.getElementById('kpiSessions');
  const trendEl = document.getElementById('kpiTrend');
  let sessions = 42, last = 40;
  function tickKpi(){
    last = sessions;
    sessions = Math.max(20, Math.min(120, sessions + Math.floor(Math.random()*7-3)));
    const delta = sessions - last;
    sessionsEl.textContent = sessions;
    const pct = (delta/Math.max(1,last)*100).toFixed(1);
    trendEl.textContent = (delta>=0?'+':'') + pct + '%';
  }
  tickKpi(); setInterval(tickKpi, 1400);

  const dc = document.getElementById('donut').getContext('2d');
  function donut(ok, attn, crit){
    const total = ok+attn+crit; if(total<=0) return;
    const parts = [{v:ok,color:'#10B981'},{v:attn,color:'#F59E0B'},{v:crit,color:'#EF4444'}];
    const cx=90, cy=90, r=70, ir=40; let start = -Math.PI/2; dc.clearRect(0,0,260,180);
    parts.forEach(p=>{ const ang=(p.v/total)*Math.PI*2; dc.beginPath(); dc.moveTo(cx,cy); dc.arc(cx,cy,r,start,start+ang); dc.closePath(); dc.fillStyle=p.color; dc.globalAlpha=.9; dc.fill(); start+=ang; });
    dc.globalCompositeOperation='destination-out'; dc.beginPath(); dc.arc(cx,cy,ir,0,Math.PI*2); dc.fill(); dc.globalCompositeOperation='source-over';
  }
  function tickDonut(){ donut(80+Math.floor(Math.random()*10), 12+Math.floor(Math.random()*6), 3+Math.floor(Math.random()*4)); }
  tickDonut(); setInterval(tickDonut, 2200);

  const tc = document.getElementById('threats').getContext('2d');
  let data = Array.from({length:50}, ()=>Math.random()*20+10);
  function drawLine(){
    tc.clearRect(0,0,260,180); tc.globalAlpha=.5; tc.strokeStyle='rgba(255,255,255,.15)'; tc.beginPath(); tc.moveTo(20,10); tc.lineTo(20,160); tc.lineTo(240,160); tc.stroke(); tc.globalAlpha=1;
    tc.beginPath(); const max=Math.max(40,...data), sx=(220)/(data.length-1), sy=(140)/max;
    data.forEach((v,i)=>{ const x=20+i*sx, y=160 - v*sy; if(i===0) tc.moveTo(x,y); else tc.lineTo(x,y); });
    tc.lineWidth=2; tc.strokeStyle='#0FF0FC'; tc.shadowColor='rgba(147,51,234,.6)'; tc.shadowBlur=8; tc.stroke(); tc.shadowBlur=0;
  }
  function tickLine(){ const last=data[data.length-1]; const next=Math.max(2, Math.min(60, last+(Math.random()*8-4))) + (Math.random()<.08?14:0); data.push(next); if(data.length>50) data.shift(); drawLine(); }
  drawLine(); setInterval(tickLine, 900);

  const feed = document.getElementById('liveFeed');
  const msgs = ["New device login","Failed MFA attempt","Suspicious IP blocked","Policy update","Multiple failed logins","New API token created","Unusual location login","Firewall rule changed"];
  const levels = ["good","warn","alert"];
  function addEvent(){ const m=msgs[Math.floor(Math.random()*msgs.length)], lv=levels[Math.floor(Math.random()*levels.length)]; const row=document.createElement('div'); row.className='item'; row.innerHTML=`<span>${m}</span><span class='badge ${lv}'>${lv.toUpperCase()}</span>`; feed.prepend(row); while(feed.children.length>60){ feed.lastChild.remove(); } }
  for(let i=0;i<8;i++) addEvent(); setInterval(addEvent, 1500);
})();
