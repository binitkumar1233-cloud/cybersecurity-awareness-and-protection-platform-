
(function(){
  const c = document.getElementById('graph'); const ctx = c.getContext('2d');
  const W = c.width, H = c.height;
  const nodes = Array.from({length:14}, (_,i)=>({ id:i, x: 80+Math.random()*(W-160), y: 80+Math.random()*(H-160), r: 10+Math.random()*8, type: i<5?'host':'svc', health: Math.random()<.8?'ok':(Math.random()<.6?'warn':'alert') }));
  const links = []; for(let i=0;i<nodes.length-1;i++){ links.push([i, Math.floor(Math.random()*nodes.length)]); }
  function draw(){
    ctx.clearRect(0,0,W,H);
    ctx.globalAlpha=.6; ctx.strokeStyle='rgba(255,255,255,.15)'; ctx.lineWidth=1.2;
    links.forEach(([a,b])=>{ ctx.beginPath(); ctx.moveTo(nodes[a].x,nodes[a].y); ctx.lineTo(nodes[b].x,nodes[b].y); ctx.stroke(); });
    ctx.globalAlpha=1;
    nodes.forEach(n=>{
      ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
      ctx.fillStyle = n.type==='host' ? '#0FF0FC' : '#7C3AED';
      ctx.fill();
      ctx.lineWidth=3;
      ctx.strokeStyle = n.health==='ok' ? '#10B981' : (n.health==='warn' ? '#F59E0B' : '#EF4444');
      ctx.stroke();
    });
  }
  function tick(){
    nodes.forEach(n=>{ n.x += Math.random()*2-1; n.y += Math.random()*2-1; });
    draw();
  }
  draw(); setInterval(tick, 300);
})();
