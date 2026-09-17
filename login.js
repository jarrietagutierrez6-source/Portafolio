const menuButton = document.querySelector('#menuButton');
const navLinks = document.querySelector('#navLinks');
menuButton.addEventListener('click', () => { const open = navLinks.classList.toggle('is-open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.querySelector('.sr-only').textContent = open ? 'Cerrar menú' : 'Abrir menú'; });
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { navLinks.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.querySelector('.sr-only').textContent = 'Abrir menú'; }));
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach((button) => button.addEventListener('click', () => { filterButtons.forEach((item) => item.classList.remove('active')); button.classList.add('active'); const filter = button.dataset.filter; projectCards.forEach((card) => { card.hidden = filter !== 'Todos' && card.dataset.type !== filter; }); }));
const form = document.querySelector('#contactForm');
form.addEventListener('submit', (event) => { event.preventDefault(); const fields = [{ input: document.querySelector('#name'), error: document.querySelector('#nameError'), message: 'Escribe tu nombre.' }, { input: document.querySelector('#email'), error: document.querySelector('#emailError'), message: 'Escribe un correo válido.', valid: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) }, { input: document.querySelector('#message'), error: document.querySelector('#messageError'), message: 'Cuéntame brevemente tu idea.' }]; let valid = true; fields.forEach(({ input, error, message, valid: customValid }) => { const okay = input.value.trim() && (!customValid || customValid(input.value.trim())); input.classList.toggle('error', !okay); error.textContent = okay ? '' : message; if (!okay) valid = false; }); if (valid) { document.querySelector('#formStatus').textContent = '¡Gracias! Tu mensaje está listo para enviarse.'; form.reset(); } })

/* ============================================================
   FORMULARIO DE INSCRIPCIÓN
   ============================================================ */

// 1) Botón de ver / ocultar contraseña
const passwordInput = document.querySelector('#password');
const togglePassword = document.querySelector('#togglePassword');
togglePassword.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  togglePassword.textContent = isHidden ? 'Ocultar' : 'Ver';
  togglePassword.setAttribute('aria-pressed', String(isHidden));
  togglePassword.setAttribute('aria-label', isHidden ? 'Ocultar contraseña' : 'Mostrar contraseña');
});

// 2) Contador de caracteres del textarea
const aboutInput = document.querySelector('#about');
const aboutCount = document.querySelector('#aboutCount');
aboutInput.addEventListener('input', () => {
  aboutCount.textContent = String(aboutInput.value.length);
});

// 3) Validación al enviar
const signupForm = document.querySelector('#signupForm');
signupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const checks = [
    {
      input: document.querySelector('#fullName'),
      error: document.querySelector('#fullNameError'),
      message: 'Escribe tu nombre completo (mínimo 3 letras).',
      valid: (value) => value.length >= 3,
    },
    {
      input: document.querySelector('#userEmail'),
      error: document.querySelector('#userEmailError'),
      message: 'Escribe un correo válido.',
      valid: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    },
    {
      input: document.querySelector('#password'),
      error: document.querySelector('#passwordError'),
      message: 'La contraseña debe tener al menos 6 caracteres.',
      valid: (value) => value.length >= 6,
    },
    {
      input: document.querySelector('#area'),
      error: document.querySelector('#areaError'),
      message: 'Selecciona un área de interés.',
      valid: (value) => value !== '',
    },
  ];

  let isValid = true;

  checks.forEach(({ input, error, message, valid }) => {
    const okay = valid(input.value.trim());
    input.classList.toggle('error', !okay);
    error.textContent = okay ? '' : message;
    if (!okay) isValid = false;
  });

  // El checkbox de términos se valida aparte
  const terms = document.querySelector('#terms');
  const termsError = document.querySelector('#termsError');
  if (!terms.checked) {
    termsError.textContent = 'Debes aceptar para continuar.';
    isValid = false;
  } else {
    termsError.textContent = '';
  }

  const status = document.querySelector('#signupStatus');
  if (isValid) {
    status.textContent = '¡Registro completado! (ejercicio de práctica).';
    signupForm.reset();
    aboutCount.textContent = '0';
    passwordInput.type = 'password';
    togglePassword.textContent = 'Ver';
  } else {
    status.textContent = 'Revisa los campos marcados en rojo.';
  }
});

