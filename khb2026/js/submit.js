document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.submitform');
  Array.from(form.elements).forEach(el => {
    if (!el.name) return;
    const saved = sessionStorage.getItem(el.name);
    if (saved !== null) {
      if (el.type === 'checkbox') {
        el.checked = saved === el.value;
      } else {
        el.value = saved;
      }
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    fd.forEach((value, key) => {
      sessionStorage.setItem(key, value);
    });
    window.location.href = 'confirm.html';
  });
});
