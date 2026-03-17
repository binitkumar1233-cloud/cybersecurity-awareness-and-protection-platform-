
(function(){
  const preview=document.getElementById('preview');
  function tableFrom(rows){
    if(!rows.length){ preview.innerHTML='<tr><td>No data</td></tr>'; return; }
    const keys=Object.keys(rows[0]);
    preview.innerHTML = `<tr>${keys.map(k=>`<th>${k}</th>`).join('')}</tr>` + rows.map(r=>`<tr>${keys.map(k=>`<td>${r[k]}</td>`).join('')}</tr>`).join('');
  }
  function downloadCSV(name, rows){
    const keys = Object.keys(rows[0] || {});
    const csv = [keys.join(',')].concat(rows.map(r=>keys.map(k=>JSON.stringify(r[k]??'')).join(','))).join('\n');
    const blob = new Blob([csv], {type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  }
  function genUsers(){
    const items = JSON.parse(localStorage.getItem('sym_site_users')||'[]');
    return items.length ? items : [{name:'Alice',email:'alice@example.com',role:'Admin'}];
  }
  function genEvents(){
    const now = new Date();
    const rows = [];
    const msgs = ["New device login","Failed MFA attempt","Suspicious IP blocked","Policy update","Multiple failed logins","New API token created"];
    for(let i=0;i<20;i++){
      rows.push({time:new Date(now - i*60000).toISOString(), event: msgs[Math.floor(Math.random()*msgs.length)], level: ['GOOD','WARN','ALERT'][Math.floor(Math.random()*3)]});
    }
    return rows;
  }
  function genCompliance(){
    return [
      {control:'Access control policy', status:'GOOD', owner:'Security'},
      {control:'MFA enabled (critical apps)', status:'WARN', owner:'IT'},
      {control:'Vendor risk assessment', status:'ALERT', owner:'Legal'}
    ];
  }
  document.getElementById('exportUsers').addEventListener('click', ()=>{ const rows = genUsers(); tableFrom(rows); if(rows.length) downloadCSV('users.csv', rows); });
  document.getElementById('exportEvents').addEventListener('click', ()=>{ const rows = genEvents(); tableFrom(rows); downloadCSV('events_24h.csv', rows); });
  document.getElementById('exportCompliance').addEventListener('click', ()=>{ const rows = genCompliance(); tableFrom(rows); downloadCSV('compliance.csv', rows); });
})();
