document.addEventListener('DOMContentLoaded', () => {
    // Scroll-triggered animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 1. Generic animate-on-scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => animateObserver.observe(el));

    // Helper function for staggered animations
    const observeStaggered = (elements, baseDelay = 100) => {
        const staggerObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(elements).indexOf(entry.target);
                    if (index !== -1) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, (index % 10) * baseDelay);
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);

        elements.forEach(el => staggerObserver.observe(el));
    };

    // 4. TIMELINE CARDS
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        observeStaggered(timelineItems, 150);
    }

    // 5. SKILL TAGS
    const skillTags = document.querySelectorAll('.skill-tag');
    if (skillTags.length > 0) {
        observeStaggered(skillTags, 50);
    }

    // 6. PROJECT CARDS & JOB CARDS
    const projectCards = document.querySelectorAll('.project-card, .job-card');
    if (projectCards.length > 0) {
        observeStaggered(projectCards, 100);
    }

    // 7. VISION CARDS
    const visionCards = document.querySelectorAll('.vision-card');
    if (visionCards.length > 0) {
        observeStaggered(visionCards, 150);
    }
});
