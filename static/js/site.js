(function () {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'light' || storedTheme === 'dark') root.dataset.theme = storedTheme;

  if (toggle) {
    const activeTheme = () => root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    toggle.setAttribute('aria-label', `Switch to ${activeTheme() === 'dark' ? 'light' : 'dark'} theme`);
    toggle.addEventListener('click', () => {
      const current = activeTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      localStorage.setItem('theme', next);
      toggle.setAttribute('aria-label', `Switch to ${current} theme`);
    });
  }

  const article = document.getElementById('article');
  const bar = document.getElementById('reading-progress-bar');
  if (article && bar) {
    const updateProgress = () => {
      const end = article.getBoundingClientRect().bottom + scrollY - innerHeight;
      const start = article.getBoundingClientRect().top + scrollY;
      const amount = end <= start ? 1 : Math.max(0, Math.min(1, (scrollY - start) / (end - start)));
      bar.style.width = `${Math.round(amount * 100)}%`;
    };
    addEventListener('scroll', updateProgress, { passive: true });
    addEventListener('resize', updateProgress);
    updateProgress();

    document.addEventListener('keydown', (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.target.closest('a, input, textarea, select, button, [contenteditable="true"]')) return;
      const direction = event.key === 'ArrowLeft' ? 'prev' : event.key === 'ArrowRight' ? 'next' : null;
      const link = direction && document.querySelector(`.article-neighbors a[rel="${direction}"]`);
      if (link) location.href = link.href;
    });
  }

  const copy = document.querySelector('[data-copy-url]');
  if (copy && navigator.clipboard) {
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(location.href);
        copy.textContent = 'Link copied';
        setTimeout(() => { copy.textContent = 'Copy link'; }, 1800);
      } catch (_) {
        copy.textContent = 'Could not copy';
      }
    });
  }
}());
