// ========================================
//   АДВЕНТ-КАЛЕНДАРЬ (25 ДЕК - 1 ЯНВ)
//   + ДЕД МОРОЗ
// ========================================

(function() {
    'use strict';
    
    const container = document.getElementById('adventCalendar');
    if (!container) return;
    
    // ===== НАСТРОЙКИ: с 25 декабря по 31 декабря =====
    const START_DAY = 25;
    const END_DAY = 31;
    
    // ===== СЮРПРИЗЫ НА КАЖДЫЙ ДЕНЬ =====
    const surprises = {
        25: {
            emoji: '🎄',
            text: 'Ёлочка зажглась!',
            surprise: 'Сегодня Рождество! Пусть в твоём сердце будет тепло ✨'
        },
        26: {
            emoji: '⭐',
            text: 'Звезда сияет!',
            surprise: 'Ты — звезда, которая освещает этот мир 🌟'
        },
        27: {
            emoji: '❄️',
            text: 'Снег идёт...',
            surprise: 'Каждая снежинка — это моё тепло для тебя ❄️'
        },
        28: {
            emoji: '🎁',
            text: 'Подарок ждёт!',
            surprise: 'Говорят, лучший подарок — это внимание. Но я думаю, лучший подарок — это ТЫ, Аня! Само твоё существование! 🎁'
        },
        29: {
            emoji: '🕯️',
            text: 'Свет в окне...',
            surprise: 'Я всегда буду ждать тебя с теплом 🕯️'
        },
        30: {
            emoji: '✨',
            text: 'Чудеса близко!',
            surprise: 'Завтра будет день, полный волшебства ✨'
        },
        31: {
            emoji: '🎆',
            text: 'Новый год!',
            surprise: 'Ты — главное чудо этого года! С НОВЫМ ГОДОМ, АНЯ! ❤️🎆'
        }
    };
    
    // ===== ОПРЕДЕЛЯЕМ ТЕКУЩУЮ ДАТУ =====
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const isDecember = currentMonth === 11;
    
    // ===== СОЗДАЁМ КАЛЕНДАРЬ =====
    function buildCalendar() {
        container.innerHTML = '';
        
        for (let day = START_DAY; day <= END_DAY; day++) {
            const door = document.createElement('div');
            door.className = 'advent-door';
            door.dataset.day = day;
            
            const num = document.createElement('span');
            num.className = 'number';
            num.textContent = day;
            
            const emoji = document.createElement('span');
            emoji.className = 'emoji';
            
            door.appendChild(num);
            door.appendChild(emoji);
            
            const isOpen = localStorage.getItem('advent_' + day) === 'true';
            const isToday = isDecember && day === currentDay;
            const isFuture = isDecember && day > currentDay;
            const isNotDecember = !isDecember;
            
            if (isOpen) {
                door.classList.add('opened');
                const surprise = surprises[day];
                if (surprise) {
                    emoji.textContent = surprise.emoji;
                }
            } else if (isToday) {
                door.classList.add('today');
            } else if (isFuture || isNotDecember) {
                door.classList.add('locked');
            }
            
            door.addEventListener('click', function(e) {
                e.stopPropagation();
                
                if (this.classList.contains('locked')) {
                    showFloatingMessage('❄️', 'Этот день ещё не наступил... Подожди немного 🕯️');
                    return;
                }
                
                const dayNum = parseInt(this.dataset.day);
                if (isDecember && dayNum < currentDay && !this.classList.contains('opened')) {
                    showFloatingMessage('⏳', 'Этот день уже прошёл... Но следующий будет ещё лучше! ✨');
                    return;
                }
                
                if (this.classList.contains('opened')) {
                    const surprise = surprises[dayNum];
                    if (surprise) {
                        showFloatingMessage('🔮', surprise.surprise);
                    } else {
                        showFloatingMessage('🔮', 'Ты уже открыла этот день! ✨');
                    }
                    return;
                }
                
                const surprise = surprises[dayNum];
                
                if (surprise) {
                    this.classList.add('opened');
                    const emojiEl = this.querySelector('.emoji');
                    emojiEl.textContent = surprise.emoji;
                    
                    localStorage.setItem('advent_' + dayNum, 'true');
                    
                    showFloatingMessage(surprise.emoji, surprise.surprise);
                    
                    if (window.fireConfetti) {
                        window.fireConfetti(50);
                    }
                    
                    if (dayNum === 31) {
                        setTimeout(() => {
                            if (window.fireConfetti) {
                                window.fireConfetti(300);
                                showFloatingMessage('🎆', 'С НОВЫМ ГОДОМ, АНЯ! ТЫ — САМАЯ ЛУЧШАЯ! 🎆');
                            }
                        }, 800);
                    }
                }
            });
            
            container.appendChild(door);
        }
    }
    
    // ===== ВСПЛЫВАЮЩЕЕ СООБЩЕНИЕ =====
    function showFloatingMessage(emoji, text) {
        const existing = document.querySelector('.advent-toast');
        if (existing) existing.remove();
        
        const toast = document.createElement('div');
        toast.className = 'advent-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 120px;
            left: 50%;
            transform: translateX(-50%) scale(0.9);
            background: rgba(10,14,39,0.94);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,215,0,0.12);
            border-radius: 24px;
            padding: 22px 32px;
            z-index: 99999;
            text-align: center;
            font-family: 'Caveat', cursive;
            color: #fff;
            max-width: 340px;
            width: 90%;
            box-shadow: 0 30px 80px rgba(0,0,0,0.7);
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        `;
        toast.innerHTML = `
            <div style="font-size:3.2rem; margin-bottom:4px;">${emoji}</div>
            <div style="font-size:1.4rem; color:#ffd700; line-height:1.3;">${text}</div>
        `;
        document.body.appendChild(toast);
        
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) scale(1)';
        });
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) scale(0.8)';
            setTimeout(() => toast.remove(), 500);
        }, 3500);
    }
    
    // ===== ДЕД МОРОЗ =====
    const santaBtn = document.getElementById('santaBtn');
    const santaMessage = document.getElementById('santaMessage');
    const closeSanta = document.getElementById('closeSanta');
    
    if (santaBtn) {
        santaBtn.addEventListener('click', function() {
            santaMessage.classList.add('show');
            if (window.fireConfetti) {
                window.fireConfetti(60);
            }
        });
    }
    
    if (closeSanta) {
        closeSanta.addEventListener('click', function() {
            santaMessage.classList.remove('show');
        });
    }
    
    if (santaMessage) {
        santaMessage.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    }
    
    // ===== СБРОС КАЛЕНДАРЯ =====
    window.resetAdvent = function() {
        for (let day = START_DAY; day <= END_DAY; day++) {
            localStorage.removeItem('advent_' + day);
        }
        buildCalendar();
        showFloatingMessage('🔄', 'Календарь обновлён! ✨');
    };
    
    // ===== ЗАПУСК =====
    buildCalendar();
    
    if (isDecember && currentDay >= START_DAY && currentDay <= END_DAY) {
        setTimeout(() => {
            const surprise = surprises[currentDay];
            if (surprise && !localStorage.getItem('advent_' + currentDay)) {
                showFloatingMessage('🎄', 'Сегодня можно открыть окошко! Нажми на ' + currentDay);
            }
        }, 2000);
    } else if (isDecember && currentDay < START_DAY) {
        setTimeout(() => {
            showFloatingMessage('🕯️', 'Скоро начнётся! С 25 декабря ✨');
        }, 2000);
    } else if (isDecember && currentDay > END_DAY) {
        setTimeout(() => {
            showFloatingMessage('🎆', 'Новый год наступил! С праздником, Аня! 🎄');
        }, 2000);
    }
    
    console.log('🎄 АДВЕНТ-КАЛЕНДАРЬ: 25 декабря — 31 декабря');
    console.log('📅 Сегодня:', currentDay + '.' + (currentMonth + 1) + '.' + currentYear);
    
})();