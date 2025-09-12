let submitted = false;

document.addEventListener('DOMContentLoaded', () => {
  const mapping = {
    k4_5: ['entry.1298998029'],
    k4_4: ['entry.37830618'],
    k4_3: ['entry.422144799'],
    k4_2: ['entry.1260825403'],
    k4_1: ['entry.1814188013'],
    k3_5: ['entry.2056770193'],
    k3_3: ['entry.1656815498'],
    k3_1: ['entry.34338146'],
    k2_5: ['entry.1969961142'],
    k2_3: ['entry.720810145'],
    k2_1: ['entry.198909606'],
    k1_5: ['entry.2099041445'],
    k1_3: ['entry.631048486'],
    k1_1: ['entry.700615604'],
    teamname: ['entry.1986237800']
  };

  Object.keys(mapping).forEach(id => {
    const keys = mapping[id];
    const texts = keys.map(key => sessionStorage.getItem(key) || '');
    const element = document.getElementById(id);
    element.textContent = texts.join('　　').trim();
  });

  const form = document.getElementById('finalForm');
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = sessionStorage.getItem(key);
    form.appendChild(input);
  }

  form.addEventListener('submit', () => {
    sessionStorage.clear();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'submit.html';
  });
});
