
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#symx-contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    // Simple required-field validation
    if (!data.name || !data.email || !data.message) {
      alert('Please fill out Name, Email, and Message.');
      return;
    }
    // Simulate submission
    const out = document.querySelector('#symx-contact-output');
    if (out) {
      out.innerText = 'Thanks, ' + data.name + '! Your message has been recorded locally. (Add backend to send emails.)';
    } else {
      alert('Thanks! Your message has been recorded locally.');
    }
    form.reset();
  })
});
