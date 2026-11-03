document.addEventListener('DOMContentLoaded', () => {
    const proofLinks = document.querySelectorAll('.proof-link');
    const modal = document.getElementById('proof-modal');
    let modalImg = null;
    let modalCaption = null;
    let modalClose = null;
    
    if (modal) {
        modalImg = document.getElementById('proof-modal-img');
        modalCaption = document.getElementById('proof-modal-caption');
        modalClose = document.querySelector('.proof-modal-close');
    }

    // 1. HOVER PREVIEW (Desktop)
    proofLinks.forEach(link => {
        let previewEl = null;

        link.addEventListener('mouseenter', (e) => {
            if (window.innerWidth < 768) return; // Skip hover on mobile
            
            const timelineItem = link.closest('.timeline-item');
            if (!timelineItem) return;
            
            const proofSrc = timelineItem.getAttribute('data-proof-src');
            
            previewEl = document.createElement('div');
            previewEl.className = 'proof-preview';
            
            if (proofSrc && proofSrc !== '#') {
                const img = document.createElement('img');
                img.src = proofSrc;
                img.onerror = () => {
                    previewEl.innerHTML = '<p class="proof-pending">📄 Certificate [Pending Upload]</p>';
                };
                previewEl.appendChild(img);
            } else {
                previewEl.innerHTML = '<p class="proof-pending">📄 Certificate [Pending Upload]</p>';
            }
            
            document.body.appendChild(previewEl);
            
            // Position near the link
            const rect = link.getBoundingClientRect();
            previewEl.style.top = `${rect.top + window.scrollY - 10}px`;
            previewEl.style.left = `${rect.right + window.scrollX + 15}px`;
        });

        link.addEventListener('mouseleave', () => {
            if (previewEl && previewEl.parentNode) {
                previewEl.parentNode.removeChild(previewEl);
                previewEl = null;
            }
        });

        // 2. CLICK MODAL (Mobile + Desktop fallback)
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (window.innerWidth < 768 && modal) {
                const timelineItem = link.closest('.timeline-item');
                const proofSrc = timelineItem ? timelineItem.getAttribute('data-proof-src') : null;
                const title = timelineItem ? timelineItem.querySelector('h3')?.textContent : 'Achievement';
                
                if (proofSrc && proofSrc !== '#' && modalImg) {
                    modalImg.src = proofSrc;
                    
                    // 3. IMAGE ERROR HANDLING
                    modalImg.onerror = () => {
                        modalImg.style.display = 'none';
                        if (modalCaption) {
                            modalCaption.innerHTML = `<span class="proof-pending">📄 Certificate [Pending Upload]<br>${title}</span>`;
                        }
                    };
                    modalImg.onload = () => {
                        modalImg.style.display = 'block';
                    };
                } else if (modalImg) {
                     modalImg.style.display = 'none';
                }
                
                if (modalCaption && (!proofSrc || proofSrc === '#')) {
                    modalCaption.innerHTML = `<span class="proof-pending">📄 Certificate [Pending Upload]<br>${title}</span>`;
                } else if (modalCaption) {
                    modalCaption.textContent = title;
                }
                
                modal.classList.add('active');
            }
        });
    });

    if (modal) {
        const closeModal = () => {
            modal.classList.remove('active');
            if (modalImg) {
                modalImg.src = '';
                modalImg.style.display = 'block';
            }
        };

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});
