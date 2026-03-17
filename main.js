
(function(){
  const sel = document.getElementById('theme');
  const saved = localStorage.getItem('sym_theme') || 'default';
  if(saved!=='default') document.documentElement.setAttribute('data-theme', saved);
  if(sel){ sel.value = saved; sel.addEventListener('change', ()=>{
    const v = sel.value;
    if(v==='default'){ document.documentElement.removeAttribute('data-theme'); }
    else{ document.documentElement.setAttribute('data-theme', v); }
    localStorage.setItem('sym_theme', v);
  }); }
})();
