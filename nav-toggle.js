const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('primary-navigation');
const navContainer = document.querySelector('.nav');

if (navToggle && navMenu && navContainer) {
  navContainer.classList.add('has-toggle');
  const mobileQuery = window.matchMedia('(max-width: 960px)');
  const menuLinks = navMenu.querySelectorAll('a');

  const setMenuState = (isOpen) => {
    navMenu.classList.toggle('is-open', isOpen);
    navMenu.setAttribute('aria-hidden', String(!isOpen));
    if (isOpen) {
      navMenu.removeAttribute('inert');
    } else {
      navMenu.setAttribute('inert', '');
    }
    menuLinks.forEach((link) => {
      if (isOpen) {
        link.removeAttribute('tabindex');
      } else {
        link.setAttribute('tabindex', '-1');
      }
    });
  };

  const syncMenuWithViewport = () => {
    if (mobileQuery.matches) {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      setMenuState(expanded);
    } else {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
      navMenu.removeAttribute('aria-hidden');
      navMenu.removeAttribute('inert');
      menuLinks.forEach((link) => link.removeAttribute('tabindex'));
    }
  };

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    const nextState = !expanded;

    navToggle.setAttribute('aria-expanded', String(nextState));
    setMenuState(nextState);
  });

  syncMenuWithViewport();
  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener('change', syncMenuWithViewport);
  } else if (mobileQuery.addListener) {
    mobileQuery.addListener(syncMenuWithViewport);
  }
}
