
(function(){
  const KEY='sym_site_vault';
  const label=document.getElementById('label'), uname=document.getElementById('uname'), pwd=document.getElementById('pwd');
  const eye=document.getElementById('eye'), list=document.getElementById('vaultList'), saveBtn=document.getElementById('save');
  function load(){ try{return JSON.parse(localStorage.getItem(KEY)||'[]');}catch(_){return [];} }
  function save(items){ localStorage.setItem(KEY, JSON.stringify(items)); }
  function render(){ const items=load(); list.innerHTML=''; items.forEach((it,i)=>{ const div=document.createElement('div'); div.className='vault-item'; div.innerHTML=`<div><strong>${it.label}</strong></div><div>👤 ${String(it.uname).replace(/(.{2}).+(@)/,'$1•••$2')}</div><div>🔑 ${"•".repeat(12)}</div><div style='display:flex; gap:8px; margin-top:8px'><button class='btn' data-a='reveal' data-i='${i}'>Reveal</button><button class='btn' data-a='copy' data-i='${i}'>Copy</button><button class='btn' data-a='del' data-i='${i}'>Delete</button></div>`; list.appendChild(div); }); }
  eye.addEventListener('click', ()=>{ pwd.type = pwd.type==='password' ? 'text':'password'; pwd.classList.toggle('blur', pwd.type==='password'); });
  saveBtn.addEventListener('click', ()=>{ if(!label.value || !uname.value || !pwd.value){ alert('Fill all fields'); return; } const items=load(); items.push({label:label.value, uname:uname.value, pwd:pwd.value}); save(items); label.value=''; uname.value=''; pwd.value=''; render(); });
  list.addEventListener('click', async (e)=>{ const btn=e.target.closest('button'); if(!btn) return; const i=parseInt(btn.dataset.i,10); const items=load(); const it=items[i]; if(btn.dataset.a==='del'){ items.splice(i,1); save(items); render(); } if(btn.dataset.a==='reveal'){ alert('Password: '+it.pwd); } if(btn.dataset.a==='copy'){ try{ await navigator.clipboard.writeText(it.pwd); btn.textContent='Copied!'; setTimeout(()=>btn.textContent='Copy',1000);}catch(_){ alert('Copy failed'); } } });
  render();
})();
