(function() {
    'use strict';
    
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    const colors = [
        '#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff',
        '#ff6bff', '#ff9f43', '#00d2d3', '#f368e0',
        '#ffd700', '#ff4757', '#2ed573', '#1e90ff'
    ];
    
    function createConfetti(count) {
        count = count || 120;
        
        const existing = container.querySelectorAll('.confetti-piece');
        if (existing.length > 400) {
            existing.forEach(el => el.remove());
        }
        
        for (let i = 0; i < count; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = 6 + Math.random() * 12;
            const left = Math.random() * 100;
            const delay = Math.random() * 1.2;
            const duration = 2 + Math.random() * 3;
            const shape = Math.random();
            
            piece.style.left = left + '%';
            piece.style.backgroundColor = color;
            piece.style.color = color;
            piece.style.width = size + 'px';
            piece.style.height = size + 'px';
            piece.style.animationDuration = duration + 's';
            piece.style.animationDelay = delay + 's';
            
            if (shape < 0.3) {
                piece.classList.add('circle');
            } else if (shape < 0.6) {
                piece.classList.add('rect');
            } else {
                piece.classList.add('triangle');
            }
            
            const rotation = Math.random() * 360;
            piece.style.transform = `rotate(${rotation}deg)`;
            
            container.appendChild(piece);
            
            setTimeout(() => {
                piece.remove();
            }, (duration + delay) * 1000 + 100);
        }
    }
    
    window.fireConfetti = function(count) {
        createConfetti(count || 150);
    };
    
    document.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('fireBtn');
        if (btn) {
            btn.addEventListener('click', () => {
                window.fireConfetti(200);
            });
        }
    });
    
})();