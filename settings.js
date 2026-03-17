
(function(){
  const org = document.getElementById('org');
  const domain = document.getElementById('domain');
  const ws = document.getElementById('ws');
  const rest = document.getElementById('rest');
  const mask = document.getElementById('mask');
  const min = document.getElementById('min');
  const key = 'sym_settings';
  try{
    const s = JSON.parse(localStorage.getItem(key)||'{}');
    org.value = s.org||''; domain.value = s.domain||''; ws.value = s.ws||''; rest.value = s.rest||'';
    mask.checked = s.mask!==false; min.checked = s.min!==false;
  }catch(_){}
  document.getElementById('save').addEventListener('click', ()=>{
    const obj = { org: org.value.trim(), domain: domain.value.trim(), ws: ws.value.trim(), rest: rest.value.trim(), mask: mask.checked, min: min.checked };
    localStorage.setItem(key, JSON.stringify(obj));
    alert('Saved ✅');
  });
})();
