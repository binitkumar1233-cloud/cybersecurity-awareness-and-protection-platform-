
(function(){
  const rows=[
    {ctl:'Access control policy',st:'good',owner:'Security'},
    {ctl:'MFA enabled (critical apps)',st:'warn',owner:'IT'},
    {ctl:'Quarterly access review',st:'warn',owner:'IT'},
    {ctl:'Backups & restore tested',st:'good',owner:'Ops'},
    {ctl:'Vendor risk assessment',st:'bad',owner:'Legal'},
  ];
  const tbody=document.querySelector('#matrix tbody');
  tbody.innerHTML = rows.map(r=>`<tr><td>${r.ctl}</td><td><span class='tag ${r.st}'>${r.st.toUpperCase()}</span></td><td>${r.owner}</td></tr>`).join("");
})();
