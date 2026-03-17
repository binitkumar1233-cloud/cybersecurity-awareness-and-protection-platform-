
(function(){
  const host=document.getElementById('timeline');
  const btns=document.querySelectorAll('[data-f]');
  const data=[
    {t:'09:10',txt:'User login from new device',lvl:'warn'},
    {t:'09:14',txt:'Failed MFA attempt',lvl:'warn'},
    {t:'09:30',txt:'Suspicious IP blocked',lvl:'bad'},
    {t:'10:02',txt:'Password changed',lvl:'ok'},
    {t:'11:47',txt:'Privilege escalated',lvl:'warn'},
    {t:'12:15',txt:'Policy updated',lvl:'ok'},
    {t:'14:22',txt:'Multiple failed logins',lvl:'bad'}
  ];
  function render(f){
    host.innerHTML='';
    data.filter(d=>!f||f==='all'||d.lvl===f).forEach((d,i)=>{
      const row=document.createElement('div'); row.className='event';
      row.innerHTML = `<div class='dot ${d.lvl}'></div><div><strong>${d.t}</strong> — ${d.txt}</div>`;
      host.appendChild(row);
      if(i<data.length-1){ const line=document.createElement('div'); line.className='line'; line.style.height='12px'; host.appendChild(line); }
    });
  }
  btns.forEach(b=> b.addEventListener('click', ()=>render(b.dataset.f)));
  render('all');
})();
