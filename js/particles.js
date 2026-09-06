// ========================================
//     ДОПОЛНИТЕЛЬНЫЕ ЧАСТИЦЫ (particles.js)
// ========================================

(function() {
    'use strict';
    
    // Создаём звёздный фон
    function createStars() {
        const container = document.getElementById('snow-container');
        if (!container) return;
        
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.style.cssText = `
                position: fixed;
                width: ${2 + Math.random() * 4}px;
                height: ${2 + Math.random() * 4}px;
                background: rgba(255,255,255,${0.2 + Math.random() * 0.8});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                z-index: 0;
                box-shadow: 0 0 ${5 + Math.random() * 15}px rgba(255,255,255,0.3);
                animation: twinkle ${2 + Math.random() * 4}s ease-in-out infinite alternate;
            `;
            container.appendChild(star);
        }
        
        // Добавляем анимацию мерцания
        const style = document.createElement('style');
        style.textContent = `
            @keyframes twinkle {
                0% { opacity: 0.2; transform: scale(0.5); }
                100% { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Запускаем при загрузке
    document.addEventListener('DOMContentLoaded', createStars);
    
    // ===== САЛЮТ (дополнительный) =====
    function createFirework(x, y) {
        const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bff', '#ff9f43'];
        const container = document.getElementById('confetti-container');
        if (!container) return;
        
        for (let i = 0; i < 30; i++) {
            const spark = document.createElement('div');
            const size = 4 + Math.random() * 8;
            const angle = Math.random() * 2 * Math.PI;
            const speed = 50 + Math.random() * 150;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            spark.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                z-index: 1000;
                pointer-events: none;
                box-shadow: 0 0 10px ${color};
                transition: all ${0.5 + Math.random() * 0.5}s cubic-bezier(0, 0.5, 0.5, 1);
                opacity: 1;
            `;
            
            container.appendChild(spark);
            
            // Анимируем
            requestAnimationFrame(() => {
                spark.style.transform = `translate(${Math.cos(angle) * speed}px, ${Math.sin(angle) * speed}px)`;
                spark.style.opacity = '0';
                spark.style.width = '2px';
                spark.style.height = '2px';
            });
            
            setTimeout(() => spark.remove(), 1200);
        }
    }
    
    // Добавляем салют по двойному клику
    document.addEventListener('dblclick', (e) => {
        createFirework(e.clientX, e.clientY);
    });
    
    console.log('✨ Двойной клик — салют! ✨');
    
})();