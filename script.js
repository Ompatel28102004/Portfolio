document.addEventListener('DOMContentLoaded', function() {

    // --- THEME TOGGLE (DAY / NIGHT) ---
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            const next = current === 'light' ? 'dark' : 'light';
            root.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    // --- SCROLL PROGRESS BAR ---
    const progressBar = document.getElementById('progress-bar');
    const calculateProgress = () => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        if (scrollableHeight > 0) {
            const progressPercentage = (scrolled / scrollableHeight) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
    };
    window.addEventListener('scroll', calculateProgress);

    // --- NAVBAR SCROLL EFFECT ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- HAMBURGER MENU TOGGLE ---
    const hamburger = document.getElementById('hamburger-icon');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            }
        });
    });

    // --- ANIMATED HERO TITLE ---
    const animatedTitle = document.querySelector('.animated-title');
    const text = animatedTitle.textContent;
    animatedTitle.textContent = ''; // Clear original text
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char; // Handle spaces
        span.style.animationDelay = `${index * 50}ms`;
        span.style.transform = `translateY(30px)`; // Initial position for animation
        animatedTitle.appendChild(span);
    });

    // --- TYPING TEXT ANIMATION ---
    const typingTextElement = document.getElementById('typing-text');
    const textToType = "Machine Learning Engineer | Full Stack Developer | Edge-AI Enthusiast";
    let typeIndex = 0;
    function type() {
        if (typeIndex < textToType.length) {
            typingTextElement.textContent += textToType.charAt(typeIndex);
            typeIndex++;
            setTimeout(type, 80); // Typing speed
        }
    }
    setTimeout(type, text.length * 50 + 500); // Start typing after title animation

    // --- SCROLL REVEAL ANIMATION (with Staggering) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const itemsToStagger = entry.target.querySelectorAll('.timeline-item, .skill-card, .project-card');
                itemsToStagger.forEach((item, index) => {
                    item.style.animationDelay = `${index * 150}ms`;
                });
            }
        });
    }, {
        threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- BACK TO TOP BUTTON ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});