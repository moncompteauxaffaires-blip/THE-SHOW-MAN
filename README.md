# THE-SHOW-MAN of cat ship a ton

https://moncompteauxaffaires-blip.github.io/THE-SHOW-MAN


// Les réactions font apparaître des emojis qui flottent à l'écran
function addFloatingReaction(emoji) {
    const float = document.createElement('div');
    float.textContent = emoji;
    float.style.cssText = `
        position: fixed;
        font-size: 3rem;
        pointer-events: none;
        animation: floatUp 2s ease-out forwards;
    `;
    float.style.left = Math.random() * window.innerWidth + 'px';
    float.style.top = window.innerHeight + 'px';
    document.body.appendChild(float);
    setTimeout(() => float.remove(), 2000);
}

// Dans addReaction():
if (type === 'laugh') {
    state.laugh += 1;
    addFloatingReaction('😂');


@keyframes floatUp {
    to {
        transform: translateY(-100vh) scale(0);
        opacity: 0;
    }
}

const levels = [
    { name: "Débutant", scoreRequired: 0 },
    { name: "Comédien", scoreRequired: 100 },
    { name: "Star", scoreRequired: 500 },
    { name: "Légende", scoreRequired: 1000 }
];

function getCurrentLevel() {
    return levels.filter(l => l.scoreRequired <= state.score).pop();
}

// Afficher dans l'interface
function updateLevel() {
    const level = getCurrentLevel();
    document.getElementById('level').textContent = level.name;
    document.getElementById('levelProgress').style.width = 
        (state.score % 500 / 500 * 100) + '%';
}


// Minigame: Appuyer au bon moment
function startTimingGame() {
    const game = document.createElement('div');
    game.className = 'mini-game';
    game.innerHTML = `
        <div class="timing-bar">
            <div class="timing-target" id="target"></div>
        </div>
        <button id="clickBtn">CLIQUEZ ICI!</button>
    `;
    document.body.appendChild(game);
    
    let success = false;
    document.getElementById('clickBtn').addEventListener('click', () => {
        const target = document.getElementById('target');
        if (target.offsetLeft > 100 && target.offsetLeft < 150) {
            success = true;
            state.score += 50;
            addFloatingReaction('🎯');
        }
    });
}



const achievements = [
    { id: 'first-story', title: '🎬 Première Histoire', condition: () => state.storyIndex >= 1 },
    { id: 'popular', title: '⭐ Très Populaire', condition: () => state.popularity >= 80 },
    { id: 'comedian', title: '🎭 Vrai Comédien', condition: () => state.score >= 500 },
    { id: 'audience-king', title: '👑 Roi du Public', condition: () => state.audience >= 100 }
];

function checkAchievements() {
    achievements.forEach(ach => {
        if (ach.condition() && !state.unlockedAchievements?.includes(ach.id)) {
            unlockAchievement(ach);
        }
    });
}

function unlockAchievement(ach) {
    state.unlockedAchievements = state.unlockedAchievements || [];
    state.unlockedAchievements.push(ach.id);
    
    const notify = document.createElement('div');
    notify.className = 'achievement-popup';
    notify.innerHTML = `🏆 ${ach.title}`;
    document.body.appendChild(notify);
    setTimeout(() => notify.remove(), 3000);
}





const soundEffects = {
    laugh: new Audio('data:audio/wav;base64,...'), // Risée du public
    applause: new Audio('data:audio/wav;base64,...'), // Applaudissements
    success: new Audio('data:audio/wav;base64,...') // Succès
};

function playSound(type) {
    soundEffects[type]?.play().catch(() => {}); // Ignorer les erreurs
}






function saveHighScore() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({
        score: state.score,
        popularity: state.popularity,
        date: new Date().toLocaleDateString('fr-FR')
    });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard.slice(0, 10)));
}

function displayLeaderboard() {
    const lb = JSON.parse(localStorage.getItem('leaderboard')) || [];
    return lb.map((entry, i) => 
        `${i+1}. ${entry.score} pts (${entry.date})`
    ).join('\n');
}





const skins = [
    { name: 'Bart Original', bg: '#1a1a2e', accent: '#ffd166' },
    { name: 'Neon', bg: '#0a0e27', accent: '#00ff41' },
    { name: 'Sunset', bg: '#2d1b00', accent: '#ff6b35' }
];

function applySkin(skinIndex) {
    const skin = skins[skinIndex];
    document.documentElement.style.setProperty('--bg-primary', skin.bg);
    document.documentElement.style.setProperty('--accent', skin.accent);
    localStorage.setItem('selectedSkin', skinIndex);
}










 
