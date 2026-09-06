(function() {
    'use strict';
    
    const container = document.getElementById('snow-container');
    if (!container) return;
    
    const snowflakes = ['❄', '❅', '❆', '✦'];
    const colors = ['#ffffff', '#e8f0fe', '#d4e4f7', '#f0f8ff'];
    const sizes = ['size-1', 'size-2', 'size-3'];
    
    const count = Math.min(60, Math.floor(window.innerWidth / 14));
    
    function createSnowflake() {
        const el = document.createElement('div');
        el.className = 'snowflake';
        
        const emoji = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = 8 + Math.random() * 8;
        const opacity = 0.4 + Math.random() * 0.6;
        
        el.textContent = emoji;
        el.style.color = color;
        el.style.left = left + '%';
        el.style.animationDuration = duration + 's';
        el.style.animationDelay = delay + 's';
        el.style.opacity = opacity;
        el.classList.add(size);
        
        if (Math.random() > 0.7) {
            el.classList.add('glowing');
        }
        
        container.appendChild(el);
        
        setTimeout(() => {
            el.remove();
            createSnowflake();
        }, (duration + delay) * 1000 + 100);
    }
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => createSnowflake(), i * 100);
    }
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            container.innerHTML = '';
            const newCount = Math.min(60, Math.floor(window.innerWidth / 14));
            for (let i = 0; i < newCount; i++) {
                setTimeout(() => createSnowflake(), i * 100);
            }
        }, 500);
    });
    
})();