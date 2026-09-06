(function() {
    'use strict';
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
    
    function getNewYear() {
        const now = new Date();
        let year = now.getFullYear();
        if (now.getMonth() === 11 && now.getDate() > 1) {
            year++;
        } else if (now.getMonth() === 0 && now.getDate() === 1) {
            year++;
        }
        return new Date(year, 11, 31, 23, 59, 59);
    }
    
    let targetDate = getNewYear();
    
    function updateTimer() {
        const now = new Date();
        const diff = targetDate - now;
        
        if (diff <= 0) {
            daysEl.textContent = '🎉';
            hoursEl.textContent = '🎉';
            minutesEl.textContent = '🎉';
            secondsEl.textContent = '🎉';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
    
    setInterval(() => {
        targetDate = getNewYear();
    }, 60000);
    
})();