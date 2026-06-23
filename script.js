// ── Navbar + scroll-to-top ────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('sticky', window.scrollY > 20);
    document.getElementById('scrollUpBtn').classList.toggle('show', window.scrollY > 500);
});

document.getElementById('scrollUpBtn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Mobile menu ───────────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const menu      = document.getElementById('menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

document.addEventListener('click', (e) => {
    if (menu.classList.contains('active') &&
        !menu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ── Typed.js ──────────────────────────────────────────────────────────────────
new Typed('.typing', {
    strings: ['Software Developer', 'Frontend Developer', 'Backend Developer', 'React Developer', 'Full-Stack Developer'],
    typeSpeed: 70, backSpeed: 40, backDelay: 1800, loop: true
});

new Typed('.typing-2', {
    strings: ['Software Developer', 'Frontend Developer', 'Backend Developer', 'Full-Stack Developer'],
    typeSpeed: 70, backSpeed: 40, backDelay: 1800, loop: true
});

// ── Animated number counters ──────────────────────────────────────────────────
function animateCount(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step     = Math.ceil(duration / target);
    let current    = 0;
    const timer = setInterval(() => {
        current++;
        el.textContent = current;
        if (current >= target) clearInterval(timer);
    }, step);
}

const countEls = document.querySelectorAll('.count');
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

countEls.forEach(el => countObserver.observe(el));

// ── Scroll fade-in ────────────────────────────────────────────────────────────
const fadeEls = document.querySelectorAll(
    '.project-card, .skill-category, .about-content, .contact-content, .section-header, .stats-row'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObserver.observe(el));

// ── 3D tilt on about image ────────────────────────────────────────────────────
const imgTilt = document.getElementById('imgTilt');

if (imgTilt) {
    imgTilt.addEventListener('mousemove', (e) => {
        const rect    = imgTilt.getBoundingClientRect();
        const x       = e.clientX - rect.left;
        const y       = e.clientY - rect.top;
        const centerX = rect.width  / 2;
        const centerY = rect.height / 2;
        const rotX    = ((y - centerY) / centerY) * -12;
        const rotY    = ((x - centerX) / centerX) *  12;

        imgTilt.style.transition  = 'transform 0.08s ease';
        imgTilt.style.transform   = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
        imgTilt.style.animation   = 'none'; /* pause float while tilting */
    });

    imgTilt.addEventListener('mouseleave', () => {
        imgTilt.style.transition  = 'transform 0.5s ease';
        imgTilt.style.transform   = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
        /* resume float animation */
        setTimeout(() => { imgTilt.style.animation = 'float-gentle 6s ease-in-out infinite'; }, 500);
    });
}

// ── Active nav link on scroll ─────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.menu-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active-link'));
            const match = document.querySelector(`.menu-link[href="#${entry.target.id}"]`);
            if (match) match.classList.add('active-link');
        }
    });
}, { threshold: 0.5 });

sections.forEach(s => navObserver.observe(s));
