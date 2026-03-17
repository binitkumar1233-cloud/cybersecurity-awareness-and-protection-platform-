
(function(){
  const KEY = 'sym_site_users';
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const roleEl = document.getElementById('role');
  const addBtn = document.getElementById('addUser');
  const tbody = document.querySelector('#userTable tbody');
  function load(){ try{return JSON.parse(localStorage.getItem(KEY)||'[]');}catch(_){return [];} }
  function save(v){ localStorage.setItem(KEY, JSON.stringify(v)); }
  function mask(email){
    const parts = String(email).split('@'); if(parts.length<2) return email;
    const user = parts[0]; const dom = parts[1].split('.');
    const maskedUser = (user.slice(0,2) + '•••');
    const maskedDom = dom[0].slice(0,1) + '••' + (dom.length>1?'.'+dom.slice(1).join('.'):'');
    return maskedUser + '@' + maskedDom;
  }
  function render(){
    const items = load(); tbody.innerHTML='';
    items.forEach((u,i)=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${u.name||"-"}</td><td class='email-mask'>${mask(u.email||"")}</td><td><select data-i='${i}' class='role-select'>${["Viewer","Analyst","Admin","Owner"].map(r=>`<option ${u.role===r?"selected":""}>${r}</option>`).join("")}</select></td><td><button class='btn' data-a='reset' data-i='${i}'>Reset MFA</button> <button class='btn' data-a='del' data-i='${i}'>Delete</button></td>`;
      tbody.appendChild(tr);
    });
  }
  addBtn.addEventListener('click', ()=>{
    const name = nameEl.value.trim(), email = emailEl.value.trim(), role = roleEl.value;
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ alert('Enter a valid email'); return; }
    const items = load(); items.push({name,email,role}); save(items);
    nameEl.value=''; emailEl.value=''; render();
  });
  tbody.addEventListener('change', (e)=>{
    const sel = e.target.closest('select'); if(!sel) return;
    const i = parseInt(sel.dataset.i,10); const items = load(); items[i].role = sel.value; save(items);
  });
  tbody.addEventListener('click', (e)=>{
    const btn = e.target.closest('button'); if(!btn) return;
    const i = parseInt(btn.dataset.i,10); const items = load();
    if(btn.dataset.a==='del'){ items.splice(i,1); save(items); render(); }
    if(btn.dataset.a==='reset'){ alert('MFA reset link sent to '+ (items[i] && items[i].email)); }
  });
  render();
})();
