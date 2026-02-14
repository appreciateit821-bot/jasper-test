/* ============================================
   JASPER PORTFOLIO - Main Page + Shared Utils
   ============================================ */

// --- Shared: Particle System ---
function createParticles(container, count) {
    if (!container) return;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        container.appendChild(particle);
    }
}

// --- Shared: Page Transition ---
function navigateTo(url) {
    const transition = document.querySelector('.page-transition');
    if (transition) {
        transition.classList.add('active');
        setTimeout(() => { window.location.href = url; }, 500);
    } else {
        window.location.href = url;
    }
}

// --- Shared: Scroll Reveal ---
function initScrollReveal() {
    const selector = '.reveal, .reveal-left, .reveal-right, .writing-paragraph';

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observe existing elements
    document.querySelectorAll(selector).forEach(el => io.observe(el));

    // Watch for dynamically added elements (e.g. painting.js gallery)
    new MutationObserver((mutations) => {
        mutations.forEach(m => {
            m.addedNodes.forEach(node => {
                if (node.nodeType !== 1) return;
                if (node.matches && node.matches(selector)) io.observe(node);
                if (node.querySelectorAll) {
                    node.querySelectorAll(selector).forEach(el => io.observe(el));
                }
            });
        });
    }).observe(document.body, { childList: true, subtree: true });
}

// --- Main Page Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const particleContainer = document.getElementById('particle-container');
    createParticles(particleContainer, 50);

    // Only run main page logic if on page-main
    if (!document.body.classList.contains('page-main')) {
        initScrollReveal();
        return;
    }

    const menuItems = document.querySelectorAll('.menu-item');
    const gemOverlays = document.querySelectorAll('.gem-overlay');

    // Menu hover: project image onto gemstone faces
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const previewUrl = item.dataset.preview;
            if (previewUrl) {
                gemOverlays.forEach(overlay => {
                    overlay.style.backgroundImage = `url(${previewUrl})`;
                    overlay.style.opacity = '1';
                });
            }
        });

        item.addEventListener('mouseleave', () => {
            gemOverlays.forEach(overlay => {
                overlay.style.opacity = '0';
            });
        });

        // Click: fade out then navigate
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const href = item.getAttribute('href');

            anime.timeline({ easing: 'easeInOutQuad' })
                .add({
                    targets: '.gemstone-container',
                    opacity: [1, 0],
                    scale: [1, 0.8],
                    duration: 400,
                })
                .add({
                    targets: '.menu-item',
                    opacity: [1, 0],
                    translateY: [0, -20],
                    duration: 300,
                    delay: anime.stagger(60),
                    complete: () => navigateTo(href)
                }, '-=300');
        });
    });
});
