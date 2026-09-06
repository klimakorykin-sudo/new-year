(function() {
    'use strict';
    
    console.log('🎄 С НОВЫМ ГОДОМ, АНЯ! 🎄');
    console.log('❤️ Этот проект сделан специально для тебя! ❤️');
    
    const resetBtn = document.getElementById('resetBtn');
    
    function showNotification(text) {
        const existing = document.querySelector('.notification-toast');
        if (existing) existing.remove();
        
        const toast = document.createElement('div');
        toast.className = 'notification-toast';
        toast.textContent = text;
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(10px);
            color: #fff;
            padding: 10px 28px;
            border-radius: 50px;
            border: 1px solid rgba(255,215,0,0.15);
            font-family: 'Caveat', cursive;
            font-size: 1.1rem;
            z-index: 99999;
            animation: fadeInUp 0.5s ease;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            text-align: center;
            max-width: 90%;
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s ease';
            setTimeout(() => toast.remove(), 600);
        }, 2800);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            const container = document.getElementById('confetti-container');
            if (container) container.innerHTML = '';
            if (window.resetCard) window.resetCard();
            showNotification('🍃 Тишина... но волшебство остаётся ✨');
        });
    }
    
    setTimeout(() => {
        showNotification('🎄 Привет, Анечка! Ты — самое тёплое чудо этого года!..Ээээ, нет... Всего мира! 💖');
    }, 1500);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Space') {
            e.preventDefault();
            if (window.fireConfetti) {
                window.fireConfetti(150);
                showNotification('🌟 Звёзды танцуют для тебя! ✨');
            }
        }
        if (e.key === 'c' || e.key === 'C') {
            if (window.resetCard) window.resetCard();
        }
        if (e.key === 'o' || e.key === 'O') {
            const card = document.getElementById('card');
            if (card && !card.classList.contains('flipped')) {
                card.click();
                showNotification('💖 Открываю сердце для тебя...');
            }
        }
        if (e.key === 's' || e.key === 'S') {
            const santaBtn = document.getElementById('santaBtn');
            if (santaBtn) santaBtn.click();
        }
        if (e.key === 'Escape') {
            const msg = document.getElementById('santaMessage');
            if (msg && msg.classList.contains('show')) {
                msg.classList.remove('show');
            }
        }
    });
    
    document.addEventListener('dblclick', (e) => {
        if (e.target.closest('.btn') || e.target.closest('.card') || e.target.closest('.advent-door')) {
            return;
        }
        if (window.fireConfetti) {
            window.fireConfetti(80);
            showNotification('✨ Ты коснулась — и зажглись звёзды! ✨');
        }
    });
    
    setTimeout(() => {
        if (window.fireConfetti) window.fireConfetti(30);
    }, 2500);
    
    console.log('⌨️ УПРАВЛЕНИЕ: ПРОБЕЛ — салют, O — открыть открытку, C — закрыть, S — Дед Мороз');
    
})();