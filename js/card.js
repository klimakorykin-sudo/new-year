// ========================================
//   3D ОТКРЫТКА + ВСПЛЫВАЮЩЕЕ СООБЩЕНИЕ
// ========================================

(function() {
    'use strict';
    
    const card = document.getElementById('card');
    const cardBtn = document.getElementById('cardBtn');
    if (!card) return;
    
    let isFlipped = false;
    let messageShown = false;  // Чтобы сообщение не дублировалось
    
    // ===== ФУНКЦИЯ ПОКАЗА ВСПЛЫВАЮЩЕГО СООБЩЕНИЯ =====
    function showCardMessage() {
        // Удаляем старое сообщение, если есть
        const existing = document.querySelector('.card-toast');
        if (existing) existing.remove();
        
        const toast = document.createElement('div');
        toast.className = 'card-toast';
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: rgba(10,14,39,0.95);
            backdrop-filter: blur(25px);
            border: 2px solid rgba(255,215,0,0.2);
            border-radius: 30px;
            padding: 35px 40px;
            z-index: 99999;
            text-align: center;
            font-family: 'Caveat', cursive;
            color: #fff;
            max-width: 420px;
            width: 90%;
            box-shadow: 0 50px 100px rgba(0,0,0,0.8);
            opacity: 0;
            transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        `;
        toast.innerHTML = `
            <div style="font-size:4rem; margin-bottom:5px;">😊</div>
            <div style="font-size:2.2rem; color:#ffd700; line-height:1.3;">
                Ты улыбнулась —
            </div>
            <div style="font-size:1.8rem; color:#fff; margin:5px 0;">
                и мир стал <span style="color:#ff6b6b;">лучше</span>!
            </div>
            <div style="font-size:1.5rem; color:rgba(255,215,0,0.6); margin-top:8px;">
                Улыбайся почаще, <span style="color:#ffd700;">Анечка</span>!!! 💖
            </div>
            <div style="margin-top:12px; font-size:0.8rem; color:rgba(255,255,255,0.2);">
                ~ ты — самое тёплое, что есть в этом мире ~
            </div>
            <button class="close-card-toast" style="
                margin-top:15px;
                padding:10px 35px;
                background: rgba(255,215,0,0.08);
                border: 1px solid rgba(255,215,0,0.12);
                border-radius: 50px;
                color: #ffd700;
                font-family: 'Caveat', cursive;
                font-size: 1.2rem;
                cursor: pointer;
                transition: all 0.3s;
            ">💫 Закрыть</button>
        `;
        document.body.appendChild(toast);
        
        // Анимация появления
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        // Закрытие по кнопке
        const closeBtn = toast.querySelector('.close-card-toast');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                toast.style.opacity = '0';
                toast.style.transform = 'translate(-50%, -50%) scale(0.8)';
                setTimeout(() => toast.remove(), 500);
            });
        }
        
        // Закрытие по клику вне
        toast.addEventListener('click', function(e) {
            if (e.target === this) {
                toast.style.opacity = '0';
                toast.style.transform = 'translate(-50%, -50%) scale(0.8)';
                setTimeout(() => toast.remove(), 500);
            }
        });
        
        // Закрытие по ESC
        const escHandler = function(e) {
            if (e.key === 'Escape') {
                toast.style.opacity = '0';
                toast.style.transform = 'translate(-50%, -50%) scale(0.8)';
                setTimeout(() => toast.remove(), 500);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
        
        // Автоматическое закрытие через 8 секунд
        setTimeout(() => {
            if (document.body.contains(toast)) {
                toast.style.opacity = '0';
                toast.style.transform = 'translate(-50%, -50%) scale(0.8)';
                setTimeout(() => toast.remove(), 500);
            }
        }, 8000);
        
        // Салют при открытии
        if (window.fireConfetti) {
            window.fireConfetti(100);
            setTimeout(() => {
                if (window.fireConfetti) window.fireConfetti(60);
            }, 500);
        }
    }
    
    // ===== ФУНКЦИЯ ПЕРЕВОРОТА =====
    function flipCard() {
        isFlipped = !isFlipped;
        card.classList.toggle('flipped');
        
        if (isFlipped) {
            // Открыли открытку — показываем сообщение
            setTimeout(() => {
                showCardMessage();
            }, 500);
        }
    }
    
    // ===== СОБЫТИЯ =====
    card.addEventListener('click', flipCard);
    
    if (cardBtn) {
        cardBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            flipCard();
        });
    }
    
    // ===== СБРОС (закрыть открытку) =====
    window.resetCard = function() {
        if (isFlipped) {
            card.classList.remove('flipped');
            isFlipped = false;
            // Удаляем сообщение, если оно есть
            const existing = document.querySelector('.card-toast');
            if (existing) existing.remove();
        }
    };
    
    console.log('💌 Открытка готова! При открытии — улыбка и тепло!');
    
})();