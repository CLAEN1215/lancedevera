document.addEventListener('DOMContentLoaded', () => {
    const typedHeaders = document.querySelectorAll('.typed-header');
    
    if (typedHeaders.length === 0) return;

    // Store original text and clear it
    typedHeaders.forEach(header => {
        const text = header.textContent || header.getAttribute('data-text') || '';
        header.setAttribute('data-text', text.trim());
        header.textContent = '';
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const typeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const header = entry.target;
                
                // Ensure we only type once
                if (!header.classList.contains('typed')) {
                    header.classList.add('typed');
                    typeText(header);
                    observer.unobserve(header);
                }
            }
        });
    }, observerOptions);

    typedHeaders.forEach(header => {
        typeObserver.observe(header);
    });

    function typeText(element) {
        const text = element.getAttribute('data-text');
        if (!text) return;
        
        let index = 0;
        
        // Typing speed: 50ms per character
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typeInterval);
                element.classList.add('typing-cursor');
            }
        }, 50);
    }
});
