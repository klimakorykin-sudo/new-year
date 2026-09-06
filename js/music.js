// ========================================
//   НОВОГОДНИЙ МУЗЫКАЛЬНЫЙ ПЛЕЕР
// ========================================

(function() {
    'use strict';

    // ===== ПУТЬ К МУЗЫКЕ =====
    const MUSIC_PATH = 'assets/music/';
    
    // ===== СПИСОК ПЕСЕН =====
    const playlist = [
        { src: MUSIC_PATH + 'last-christmas.mp3', name: 'Last Christmas' },
        { src: MUSIC_PATH + 'jingle-bells.mp3', name: 'Jingle Bells' },
        { src: MUSIC_PATH + 'silent-night.mp3', name: 'Silent Night' }
    ];

    let currentTrack = 0;
    let isPlaying = false;
    let isMuted = false;
    
    // ===== СОЗДАЁМ АУДИО ЭЛЕМЕНТ =====
    const audio = new Audio();
    audio.loop = false;
    audio.volume = 0.3;

    // ===== СОЗДАЁМ КНОПКУ УПРАВЛЕНИЯ =====
    function createMusicButton() {
        const container = document.createElement('div');
        container.id = 'music-control';
        container.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 99999;
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(10, 14, 39, 0.85);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 215, 0, 0.12);
            border-radius: 50px;
            padding: 10px 18px 10px 14px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            transition: all 0.3s ease;
            cursor: pointer;
        `;

        // Кнопка play/pause
        const playBtn = document.createElement('span');
        playBtn.id = 'music-play-btn';
        playBtn.textContent = '🔊';
        playBtn.style.cssText = `
            font-size: 1.6rem;
            line-height: 1;
            transition: transform 0.2s;
        `;

        // Название трека
        const trackName = document.createElement('span');
        trackName.id = 'music-track-name';
        trackName.textContent = 'Last Christmas';
        trackName.style.cssText = `
            font-family: 'Caveat', cursive;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.6);
            max-width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        `;

        // Кнопка следующего трека
        const nextBtn = document.createElement('span');
        nextBtn.id = 'music-next-btn';
        nextBtn.textContent = '⏭';
        nextBtn.style.cssText = `
            font-size: 1.2rem;
            line-height: 1;
            opacity: 0.5;
            transition: all 0.3s;
            cursor: pointer;
        `;
        nextBtn.onmouseover = () => nextBtn.style.opacity = '1';
        nextBtn.onmouseout = () => nextBtn.style.opacity = '0.5';

        container.appendChild(playBtn);
        container.appendChild(trackName);
        container.appendChild(nextBtn);
        document.body.appendChild(container);

        // ===== СОБЫТИЯ =====
        playBtn.addEventListener('click', toggleMusic);
        nextBtn.addEventListener('click', nextTrack);
        container.addEventListener('mouseenter', () => {
            container.style.borderColor = 'rgba(255, 215, 0, 0.25)';
        });
        container.addEventListener('mouseleave', () => {
            container.style.borderColor = 'rgba(255, 215, 0, 0.12)';
        });

        // ===== СОБЫТИЯ АУДИО =====
        audio.addEventListener('ended', function() {
            // Автоматически переключаем на следующий трек
            nextTrack();
        });

        audio.addEventListener('error', function(e) {
            console.log('❌ Ошибка воспроизведения:', e);
            // Пробуем следующий трек
            setTimeout(nextTrack, 2000);
        });

        return container;
    }

    // ===== ЗАГРУЗИТЬ ТРЕК =====
    function loadTrack(index) {
        const track = playlist[index];
        if (!track) return;
        
        audio.src = track.src;
        audio.load();
        
        const nameEl = document.getElementById('music-track-name');
        if (nameEl) nameEl.textContent = track.name;
        
        console.log('🎵 Загружено:', track.name);
    }

    // ===== ВКЛЮЧИТЬ/ВЫКЛЮЧИТЬ =====
    function toggleMusic() {
        const btn = document.getElementById('music-play-btn');
        if (!btn) return;

        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            btn.textContent = '🔇';
            btn.style.opacity = '0.5';
            console.log('🔇 Музыка выключена');
        } else {
            // Если аудио не загружено — загружаем
            if (!audio.src) {
                loadTrack(currentTrack);
            }
            audio.play().then(() => {
                isPlaying = true;
                btn.textContent = '🔊';
                btn.style.opacity = '1';
                console.log('🔊 Музыка включена');
            }).catch(err => {
                console.log('⚠️ Не удалось запустить музыку:', err);
                btn.textContent = '🔇';
                // Показываем подсказку
                showMusicHint();
            });
        }
    }

    // ===== СЛЕДУЮЩИЙ ТРЕК =====
    function nextTrack() {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
        
        // Если музыка была включена — продолжаем играть
        if (isPlaying) {
            audio.play().catch(() => {});
        }
    }

    // ===== ПОДСКАЗКА (если музыка не играет) =====
    function showMusicHint() {
        const existing = document.querySelector('.music-hint');
        if (existing) return;

        const hint = document.createElement('div');
        hint.className = 'music-hint';
        hint.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            z-index: 99998;
            background: rgba(10, 14, 39, 0.9);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 215, 0, 0.1);
            border-radius: 16px;
            padding: 14px 20px;
            font-family: 'Caveat', cursive;
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.6);
            max-width: 250px;
            animation: fadeUp 0.5s ease;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
            text-align: center;
        `;
        hint.innerHTML = `
            🎄 Нажми на <span style="color:#ffd700;">🔊</span> в правом нижнем углу, чтобы включить музыку!<br>
            <span style="font-size:0.8rem; opacity:0.4;">~ браузер просит твоего разрешения ~</span>
        `;
        document.body.appendChild(hint);

        setTimeout(() => {
            hint.style.opacity = '0';
            hint.style.transition = 'opacity 0.5s';
            setTimeout(() => hint.remove(), 600);
        }, 6000);
    }

    // ===== ПРИ КЛИКЕ ПО СТРАНИЦЕ — АВТОЗАПУСК (если музыка включена) =====
    document.addEventListener('click', function firstClick() {
        if (isPlaying && audio.paused) {
            audio.play().catch(() => {});
        }
        document.removeEventListener('click', firstClick);
    }, { once: true });

    // ===== ЗАПУСК =====
    createMusicButton();
    loadTrack(0);
    
    console.log('🎵 Новогодний плеер запущен!');
    console.log('📀 Плейлист:', playlist.map(t => t.name).join(', '));

})();