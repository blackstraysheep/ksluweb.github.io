let submitted = false;

document.addEventListener('DOMContentLoaded', () => {
  const mapping = {
    k4_5: ['entry.1298998029','entry.111238642'],
    k4_4: ['entry.37830618','entry.523410493'],
    k4_3: ['entry.422144799','entry.80474428'],
    k4_2: ['entry.1260825403','entry.1709474016'],
    k4_1: ['entry.1814188013','entry.983752623'],
    k3_5: ['entry.2056770193','entry.2123697627'],
    k3_3: ['entry.1656815498','entry.1255780163'],
    k3_1: ['entry.34338146','entry.1649419061'],
    k2_5: ['entry.1969961142','entry.225174723'],
    k2_3: ['entry.720810145','entry.299656637'],
    k2_1: ['entry.198909606','entry.336062147'],
    k1_5: ['entry.2099041445','entry.754038290'],
    k1_3: ['entry.631048486','entry.1731782796'],
    k1_1: ['entry.700615604','entry.504831758'],
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
