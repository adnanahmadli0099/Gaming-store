(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  toggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open navigation');
  }));
  document.getElementById('year').textContent = new Date().getFullYear();

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    status.className = 'form-status';
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    if (!name || !email || !message) {
      status.textContent = 'Please complete your name, email address, and message.';
      status.classList.add('error');
      (!name ? form.elements.name : !email ? form.elements.email : form.elements.message).focus();
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      status.classList.add('error');
      form.elements.email.focus();
      return;
    }
    status.textContent = 'Form validation successful. This demo does not send or store your enquiry. Connect a form endpoint before launch.';
    status.classList.add('success');
  });
  document.getElementById('privacyLink')?.addEventListener('click', e => {
    e.preventDefault();
    const toast = document.getElementById('toast');
    toast.textContent = 'Add a real privacy policy URL before publishing.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  });
})();