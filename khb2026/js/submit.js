document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.submitform');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    fd.forEach((value, key) => {
      sessionStorage.setItem(key, value);
    });
    window.location.href = 'confirm.html';
  });
});
