document.addEventListener('DOMContentLoaded', () => {
    // 0. THEME TOGGLE SWITCHER (LIGHT / DARK MODE)
    const themeBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('ldv_portfolio_theme');
    
    // Default or stored preference
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeBtn) themeBtn.textContent = '🌙';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            themeBtn.textContent = isLight ? '🌙' : '☀️';
            localStorage.setItem('ldv_portfolio_theme', isLight ? 'light' : 'dark');
        });
    }

    // 1. PRELOADER
    const preloaderLines = document.querySelectorAll('.preloader-line');
    const preloader = document.getElementById('preloader');
    
    if (preloader && preloaderLines.length > 0) {
        const delays = [0, 800, 1600, 2200];
        
        preloaderLines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.add('visible');
            }, delays[index] || (2200 + index * 500));
        });

        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 2800);

        setTimeout(() => {
            preloader.style.display = 'none';
        }, 3300);
    }

    // 2. SIDEBAR NAVIGATION
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length > 0 && navLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.4
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('data-section') === currentId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Mobile sidebar close on link click
            if (window.innerWidth <= 768) {
                const sidebar = document.getElementById('sidebar');
                const overlay = document.getElementById('sidebar-overlay');
                if (sidebar) sidebar.classList.remove('open');
                if (overlay) overlay.classList.remove('active');
            }
        });
    });

    const hamburger = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            if (overlay) overlay.classList.toggle('active');
        });
    }

    if (overlay && sidebar) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

    // 3. BACK TO TOP BUTTON
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. TOP SCROLL PROGRESS BAR
    const scrollBar = document.getElementById('scroll-progress');
    if (scrollBar) {
        window.addEventListener('scroll', () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                const pct = (window.scrollY / totalScroll) * 100;
                scrollBar.style.width = Math.min(100, Math.max(0, pct)) + '%';
            }
        }, { passive: true });
    }

    // 6. FAMILY DUAL-PHOTO INTERACTIVE SWITCHER
    const familyCard = document.getElementById('family-flip-card');
    const familyInner = document.getElementById('family-flip-inner');
    const familyCaption = document.getElementById('family-caption');
    const tabPhoto1 = document.getElementById('tab-photo-1') || document.querySelector('.photo-tab-btn[data-target="front"]');
    const tabPhoto2 = document.getElementById('tab-photo-2') || document.querySelector('.photo-tab-btn[data-target="back"]');
    let isFamilyFlipped = false;

    if (familyCard && familyInner) {
        function setPhotoState(flipped) {
            isFamilyFlipped = flipped;
            familyInner.classList.toggle('is-flipped', isFamilyFlipped);
            
            // Update Tab Active States
            if (tabPhoto1 && tabPhoto2) {
                tabPhoto1.classList.toggle('active', !isFamilyFlipped);
                tabPhoto2.classList.toggle('active', isFamilyFlipped);
            }

            // Update Dynamic Caption
            if (familyCaption) {
                familyCaption.textContent = isFamilyFlipped 
                    ? 'Mom, Dad & Me — Mapandan, Pangasinan' 
                    : 'Mom, Dad & Me — Toy Story Land, Disneyland';
            }
        }

        function toggleFamilyFlip() {
            setPhotoState(!isFamilyFlipped);
        }

        familyCard.addEventListener('click', toggleFamilyFlip);
        familyCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFamilyFlip();
            }
        });

        if (tabPhoto1) {
            tabPhoto1.addEventListener('click', (e) => {
                e.stopPropagation();
                setPhotoState(false);
            });
        }

        if (tabPhoto2) {
            tabPhoto2.addEventListener('click', (e) => {
                e.stopPropagation();
                setPhotoState(true);
            });
        }
    }
});
