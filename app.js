/* ══════════════════════════════════════════════════════
   MUSEO ITINERANTE CUIDARTE CHILE — app.js
══════════════════════════════════════════════════════ */

// ─── SCROLL PROGRESS BAR ─────────────────────────────
const scrollBar = document.getElementById('scroll-bar');
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    scrollBar.style.width = (window.scrollY / docH * 100) + '%';

    // Navbar shrink
    navbar.classList.toggle('scrolled', window.scrollY > 80);

    // Active nav link
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
});

// ─── HAMBURGER MENU ───────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
    });
});

// ─── SCROLL REVEAL ────────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Stagger para grids: retrasa según posición
            const siblings = entry.target.parentElement
                ? [...entry.target.parentElement.querySelectorAll('.reveal')]
                : [];
            const idx = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = (idx * 0.08) + 's';
            entry.target.classList.add('visible');
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ─── CONTADOR ANIMADO ────────────────────────────────
const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.cifra-num').forEach(el => {
            const target = +el.dataset.target;
            const step   = target / 60; // 60 frames aprox 1s
            let current  = 0;
            const tick = () => {
                current = Math.min(current + step, target);
                el.textContent = Math.floor(current);
                if (current < target) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
        counterObs.unobserve(entry.target);
    });
}, { threshold: 0.4 });

const cifrasSec = document.querySelector('.cifras');
if (cifrasSec) counterObs.observe(cifrasSec);

// ─── GALERÍA — MODAL LIGHTBOX ────────────────────────
const modalImg   = document.getElementById('modal-img');
const modalSrc   = document.getElementById('modal-src');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.galeria-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        modalSrc.src = img.src;
        modalSrc.alt = img.alt;
        modalImg.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    modalImg.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { modalSrc.src = ''; }, 300);
}

modalClose.addEventListener('click', closeModal);
modalImg.addEventListener('click', (e) => { if (e.target === modalImg) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// ─── FORMULARIO ──────────────────────────────────────
const form = document.getElementById('form-contacto');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('.btn-submit');
        const original = btn.innerHTML;

        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Enviando...';
        btn.disabled = true;

        // Simulación de envío (reemplazar con fetch real)
        setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Mensaje enviado!';
            btn.style.background = '#27ae60';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 3000);
        }, 1500);
    });
}

// ─── SMOOTH SCROLL PARA LINKS INTERNOS ───────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
