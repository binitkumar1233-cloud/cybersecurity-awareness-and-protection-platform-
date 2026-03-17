
document.addEventListener('click', (e)=>{
  if(e.target && e.target.id==='mark1'){ localStorage.setItem('sym_lesson1','done'); alert('Marked as read ✅'); }
  if(e.target && e.target.id==='mark2'){ localStorage.setItem('sym_lesson2','done'); alert('Marked as read ✅'); }
});
