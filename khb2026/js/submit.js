import { FORM_IDS } from './formIds.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.submitform');
  Object.entries(FORM_IDS).forEach(([id, entry]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.name = entry;
    const saved = sessionStorage.getItem(entry);
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
