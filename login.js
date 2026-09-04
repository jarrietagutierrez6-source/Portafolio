const menuButton = document.querySelector('#menuButton');
const navLinks = document.querySelector('#navLinks');
menuButton.addEventListener('click', () => { const open = navLinks.classList.toggle('is-open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.querySelector('.sr-only').textContent = open ? 'Cerrar menú' : 'Abrir menú'; });
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { navLinks.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.querySelector('.sr-only').textContent = 'Abrir menú'; }));
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach((button) => button.addEventListener('click', () => { filterButtons.forEach((item) => item.classList.remove('active')); button.classList.add('active'); const filter = button.dataset.filter; projectCards.forEach((card) => { card.hidden = filter !== 'Todos' && card.dataset.type !== filter; }); }));
const form = document.querySelector('#contactForm');
form.addEventListener('submit', (event) => { event.preventDefault(); 
    const fields = [{ input: document.querySelector('#name'), 
        error: document.querySelector('#nameError'), 
        message: 'Escribe tu nombre.' }, 
        { input: document.querySelector('#email'), 
            error: document.querySelector('#emailError'),
             message: 'Escribe un correo válido.', 
             valid: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) }, 
             { input: document.querySelector('#message'), 
                error: document.querySelector('#messageError'), 
                message: 'Cuéntame brevemente tu idea.' }]; 
                let valid = true; 
                fields.forEach(({ input, error, message, valid: customValid }) => { const okay = input.value.trim() && (!customValid || customValid(input.value.trim()));
                     input.classList.toggle('error', !okay);
                      error.textContent = okay ? '' : message; if (!okay) valid = false; });
                       if (valid) { document.querySelector('#formStatus')
                        .textContent = '¡Gracias! Tu mensaje está listo para enviarse.'; form.reset(); } })
