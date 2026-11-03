document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('lanyard-container');
    const card = document.querySelector('.badge-card') || document.querySelector('.badge');
    const cord = document.querySelector('.lanyard-cord');
    const zoomBtn = document.getElementById('badge-zoom-btn') || document.getElementById('lanyard-zoom-btn');
    const zoomText = document.getElementById('badge-zoom-text') || document.getElementById('lanyard-zoom-text');
    const flipBtn = document.getElementById('badge-flip-btn') || document.getElementById('lanyard-flip-btn');
    
    if (!container || !card) return;

    // 1. MOUSE TILT EFFECT WITH INERTIA
    let mouseX = 0;
    let mouseY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        
        // Calculate mouse position relative to the center of the container
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Normalize values between -1 and 1
        const normalizedX = Math.max(-1, Math.min(1, x / (rect.width / 2)));
        const normalizedY = Math.max(-1, Math.min(1, y / (rect.height / 2)));
        
        const maxRotation = 22;
        mouseX = normalizedX * maxRotation;
        mouseY = -normalizedY * maxRotation; // Invert Y axis
    });

    container.addEventListener('mouseleave', () => {
        mouseX = 0;
        mouseY = 0;
    });

    function updateTransform() {
        // Smooth interpolation for fluid motion
        currentRotX += (mouseY - currentRotX) * 0.1;
        currentRotY += (mouseX - currentRotY) * 0.1;

        const scale = card.classList.contains('zoomed') ? ' scale(1.08)' : '';
        if (card.classList.contains('flipped')) {
            card.style.transform = `rotateY(180deg) rotateX(${-currentRotX}deg) rotateY(${currentRotY}deg)${scale}`;
        } else {
            card.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)${scale}`;
        }
        
        // Lanyard cord movement
        if (cord) {
            cord.style.transform = `translate(${currentRotY * 0.4}px, ${-currentRotX * 0.3}px)`;
        }
        
        requestAnimationFrame(updateTransform);
    }
    
    updateTransform();

    // 2. ZOOM TOGGLE ACTION
    let isZoomed = false;
    if (zoomBtn) {
        zoomBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isZoomed = !isZoomed;
            card.classList.toggle('zoomed', isZoomed);
            zoomBtn.classList.toggle('active', isZoomed);
            if (zoomText) {
                zoomText.textContent = isZoomed ? 'Reset Size' : 'Zoom Badge';
            }
        });
    }

    // 3. FLIP BUTTON ACTION
    if (flipBtn) {
        flipBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.toggle('flipped');
        });
    }

    // 4. INITIAL SWING ANIMATION
    setTimeout(() => {
        card.classList.add('swing');
        setTimeout(() => {
            card.classList.remove('swing');
        }, 2000);
    }, 3300);

    // 5. CLICK CARD TO FLIP
    card.addEventListener('click', (e) => {
        // Prevent trigger if clicking control buttons
        if (e.target.closest('.badge-control-btn')) return;
        card.classList.toggle('flipped');
    });
});
