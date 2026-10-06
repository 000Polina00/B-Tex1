/* В-Тех — АКС БПЛА: интерактив шапки и всплывающее уведомление */
(function () {
  'use strict';

  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('navLinks');
  var toast = document.getElementById('toast');
  var toastTimer = null;

  function closeNav() {
    if (!nav || !nav.classList.contains('open')) return;
    nav.classList.remove('open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Открыть меню');
    }
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('#navLinks a'), function (link) {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('click', function (event) {
    if (!nav || !toggle) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    closeNav();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeNav();
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('show');
    }, 4500);
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-toast]'), function (element) {
    element.addEventListener('click', function () {
      showToast(element.getAttribute('data-toast'));
    });
  });
})();
