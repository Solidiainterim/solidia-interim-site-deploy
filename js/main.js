// Solidia Interim — script principal (site vitrine statique)
document.addEventListener('DOMContentLoaded', function () {

  // --- Navigation mobile ---
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  var mobileClose = document.querySelector('.mobile-nav-close');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (mobileClose && mobileNav) {
    mobileClose.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- En-tête : ombre au scroll ---
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) {
        header.style.boxShadow = '0 6px 20px rgba(34,39,31,.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Marquage du lien de navigation actif ---
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Formulaire de contact : message de confirmation après envoi réel (contact-handler.php) ---
  var form = document.querySelector('#contact-form');
  if (form) {
    var feedback = form.querySelector('.form-feedback');
    var statut = new URLSearchParams(window.location.search).get('envoi');
    if (feedback && statut) {
      if (statut === 'ok') {
        feedback.textContent = 'Merci ! Votre demande a bien été envoyée. Nous revenons vers vous rapidement.';
        feedback.style.color = 'var(--brand-green-dark)';
      } else {
        feedback.textContent = 'Un problème est survenu lors de l\'envoi. Merci de réessayer ou de nous écrire directement à contact@solidia-interim.fr.';
        feedback.style.color = '#9a3b12';
      }
      feedback.style.display = 'block';
      feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (statut === 'ok') { form.reset(); }
      // Nettoie l'URL pour ne pas garder ?envoi=... si l'utilisateur recharge la page
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  // --- Année dynamique dans le footer ---
  document.querySelectorAll('.current-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});
