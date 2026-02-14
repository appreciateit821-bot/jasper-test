/* ============================================
   JASPER PORTFOLIO - About Page
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Stat counter animation
    const statCards = document.querySelectorAll('.stat-number');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statCards.forEach(card => statObserver.observe(card));

    function animateNumber(el) {
        const text = el.textContent;
        const hasPlus = text.includes('+');
        const num = parseInt(text);
        if (isNaN(num)) return;

        const duration = 1500;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * num);
            el.textContent = current + (hasPlus ? '+' : '');
            if (progress < 1) requestAnimationFrame(update);
        }

        el.textContent = '0' + (hasPlus ? '+' : '');
        requestAnimationFrame(update);
    }
});
