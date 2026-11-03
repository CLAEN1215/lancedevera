(function() {
  'use strict';
  const root = document.documentElement;

  // STRICT AM/PM RULE: AM (00:00-11:59 UTC+8) = Light, PM (12:00-23:59 UTC+8) = Dark
  function getAmPmDefault() {
    try {
      const now = new Date();
      const utc8Hour = (now.getUTCHours() + 8) % 24;
      return (utc8Hour >= 12) ? 'dark' : 'light';
    } catch(e) {
      return 'dark';
    }
  }

  function applyTheme(theme) {
    const isDark = (theme === 'dark');
    root.classList.toggle('dark', isDark);

    const bg = document.getElementById('techBackground');
    if (bg) {
      bg.src = isDark ? 'assets/images/tech-background.svg' : 'assets/images/tech-background-light.svg';
    }
  }

  // Strictly follow AM/PM Philippine time (UTC+8)
  const initialTheme = getAmPmDefault();
  applyTheme(initialTheme);

  window.toggleTheme = function() {
    const currentIsDark = root.classList.contains('dark');
    applyTheme(currentIsDark ? 'light' : 'dark');
  };

  window.toggleMenu = function() {
    const menu = document.getElementById('menu');
    const bg = document.getElementById('mobileMenuBackground');
    const openBtn = document.getElementById('openMenu');
    const closeBtn = document.getElementById('closeMenu');
    if (menu) menu.classList.toggle('open');
    if (bg) bg.classList.toggle('open');
    if (openBtn) openBtn.classList.toggle('hidden');
    if (closeBtn) closeBtn.classList.toggle('hidden');
  };

  window.closeMenu = function() {
    const menu = document.getElementById('menu');
    const bg = document.getElementById('mobileMenuBackground');
    const openBtn = document.getElementById('openMenu');
    const closeBtn = document.getElementById('closeMenu');
    if (menu) menu.classList.remove('open');
    if (bg) bg.classList.remove('open');
    if (openBtn) openBtn.classList.remove('hidden');
    if (closeBtn) closeBtn.classList.add('hidden');
  };

  const list = document.querySelectorAll('#postsList > a');
  if (list && list.length) {
    let page = 1, size = 5, total = Math.ceil(list.length / size);
    function render() {
      list.forEach((x, i) => x.style.display = (i >= (page - 1) * size && i < page * size) ? 'block' : 'none');
      const pn = document.getElementById('pageNumbers');
      if (pn) {
        pn.innerHTML = '';
        for (let i = 1; i <= total; i++) {
          const b = document.createElement('button');
          b.textContent = i;
          b.className = 'w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ' + (i === page ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900' : 'text-neutral-600 dark:text-neutral-400');
          b.onclick = () => { page = i; render(); };
          pn.appendChild(b);
        }
      }
      const prev = document.getElementById('prevPage');
      const next = document.getElementById('nextPage');
      if (prev) prev.disabled = page === 1;
      if (next) next.disabled = page === total;
    }
    window.changePage = n => { page = Math.max(1, Math.min(total, page + n)); render(); };
    render();
  }
})();
