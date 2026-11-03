document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle') || document.querySelector('.music-toggle');
    
    if (!bgMusic || !musicToggle) return;

    // 2. Load mute state from localStorage ('portfolio-music-muted')
    // 3. Default: muted (paused)
    const isMuted = localStorage.getItem('portfolio-music-muted') !== 'false'; // default true if not set
    
    if (isMuted) {
        bgMusic.pause();
        updateButtonIcon(true);
    } else {
        // Attempt to play if not muted (might be blocked by browser autoplay policy)
        playMusic();
    }

    // 4. On toggle click
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            playMusic();
        } else {
            bgMusic.pause();
            localStorage.setItem('portfolio-music-muted', 'true');
            updateButtonIcon(true);
        }
    });

    function playMusic() {
        // 5. Handle autoplay restrictions: wrap play() in try-catch
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                localStorage.setItem('portfolio-music-muted', 'false');
                updateButtonIcon(false);
            }).catch(error => {
                console.warn('Autoplay prevented by browser. User interaction needed.', error);
                // Keep UI in muted state if play failed
                localStorage.setItem('portfolio-music-muted', 'true');
                updateButtonIcon(true);
            });
        }
    }

    // 6. Update visual state of the toggle button
    function updateButtonIcon(muted) {
        if (muted) {
            musicToggle.textContent = '🔇';
            musicToggle.classList.add('muted');
        } else {
            musicToggle.textContent = '🔊';
            musicToggle.classList.remove('muted');
        }
    }
});
