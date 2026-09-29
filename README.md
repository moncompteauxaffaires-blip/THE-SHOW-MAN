# THE-SHOW-MAN of cat ship a ton
 DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>THE SHOW MAN - Bart le Comédien</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="header-content">
                <h1>🎭 THE SHOW MAN 🎭</h1>
                <p class="subtitle">Avec Bart - Le Maître du Rire</p>
            </div>
        </header>

    <div class="bart-stats">
        <div class="stat-card">
            <span class="stat-label">Popularité</span>
            <div class="stat-value" id="popularity">0%</div>
        </div>
        <div class="stat-card">
            <span class="stat-label">Score Total</span>
            <div class="stat-value" id="totalScore">0</div>
        </div>
        <div class="stat-card">
            <span class="stat-label">Histoires Racontées</span>
            <div class="stat-value" id="storyCount">0</div>
        </div>
        <div class="stat-card">
            <span class="stat-label">Public en Ligne</span>
            <div class="stat-value" id="audience">0</div>
        </div>
    </div>

    <main class="main-content">
        <div class="stage">
            <div class="microphone-section">
                <div class="microphone">🎤</div>
                <h2>Bart le Comédien</h2>
                <button class="btn btn-generate" id="generateBtn">
                    🎙️ Générer une Histoire
                </button>
            </div>

            <div class="story-display" id="storyDisplay">
                <p id="storyText" class="story-text">
                    Cliquez sur "Générer une Histoire" pour commencer le spectacle...
                </p>
                <span class="story-number" id="storyNumber"></span>
            </div>

            <div class="audience-reactions">
                <div class="reaction-buttons">
                    <button class="reaction-btn" id="laughBtn" title="Rire">
                        😂 Rire
                        <span class="count" id="laughCount">0</span>
                    </button>
                    <button class="reaction-btn" id="applauseBtn" title="Applaudir">
                        👏 Applaudir
                        <span class="count" id="applauseCount">0</span>
                    </button>
                    <button class="reaction-btn" id="bravo" title="Bravo">
                        🌟 Bravo
                        <span class="count" id="bravoCount">0</span>
                    </button>
                    <button class="reaction-btn" id="encoreBtn" title="Encore">
                        🔥 Encore!
                        <span class="count" id="encoreCount">0</span>
                    </button>
                </div>

                <div class="comments-section">
                    <h3>💬 Commentaires du Public</h3>
                    <div class="comment-input">
                        <input
                            type="text"
                            id="commentInput"
                            placeholder="Laissez un commentaire..."
                            maxlength="100"
                        />
                        <button class="btn btn-comment" id="commentBtn">Commenter</button>
                    </div>
                    <div class="comments-list" id="commentsList"></div>
                </div>
            </div>
        </div>

        <aside class="sidebar">
            <div class="sidebar-section">
                <h3>📊 Historique des Histoires</h3>
                <div class="stories-history" id="storiesHistory"></div>
            </div>

            <div class="sidebar-section">
                <button class="btn btn-reset" id="resetBtn">🔄 Réinitialiser</button>
                <button class="btn btn-export" id="exportBtn">💾 Exporter Données</button>
            </div>
        </aside>
    </main>

    <footer class="footer">
        <p>🎭 THE SHOW MAN - Où Bart fait rire le public depuis 2024 🎤</p>
    </footer>
</div>

<script src="app.js"></script>
</body>
</html>

* { 
* margin: 0; 
* padding: 0; 
* box-sizing: border-box; 
* }

body { 
font-family: Arial, sans-serif; 
background: linear-gradient(135deg, #1a1a2e, #16213e, #0f172a); 
color: #f8f9fa; 
min-height: 100vh; 
}

.container { 
max-width: 1200px; 
margin: 0 auto; 
padding: 24px; 
}

.header { 
background: rgba(255, 255, 255, 0.05); 
border: 1px solid rgba(255, 255, 255, 0.1); 
border-radius: 20px; 
padding: 30px 20px; 
text-align: center; 
margin-bottom: 24px; 
backdrop-filter: blur(10px); 
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25); 
}

.header h1 { 
font-size: clamp(2rem, 4vw, 3.5rem); 
margin-bottom: 8px; 
color: #ffd166; 
text-shadow: 2px 2px 10px rgba(0,0,0,0.4); 
}

.subtitle { 
font-size: 1.2rem; 
color: #f2f2f2; 
letter-spacing: 1px; 
}

.bart-stats { 
display: grid; 
grid-template-columns: repeat(4, minmax(180px, 1fr)); 
gap: 16px; 
margin-bottom: 24px; 
}

.stat-card { 
background: rgba(255, 255, 255, 0.06); 
border: 1px solid rgba(255, 255, 255, 0.1); 
border-radius: 16px; 
padding: 20px; 
text-align: center; 
box-shadow: 0 8px 18px rgba(0,0,0,0.15); 
}

.stat-label { 
display: block; 
color: #d4d4d4; 
font-size: 0.9rem; 
margin-bottom: 8px; 
}

.stat-value { 
font-size: clamp(1.5rem, 2vw, 2.25rem); 
font-weight: bold; 
color: #7ef9c6; 
}

.main-content { 
display: grid; 
grid-template-columns: 2fr 1fr; 
gap: 24px; 
}

.stage { 
background: rgba(255,255,255,0.04); 
border: 1px solid rgba(255,255,255,0.08); 
border-radius: 20px; 
padding: 24px; 
box-shadow: 0 12px 28px rgba(0,0,0,0.2); 
}

.microphone-section { 
display: flex; 
flex-direction: column; 
align-items: center; 
text-align: center; 
margin-bottom: 24px; 
}

.microphone { 
width: 110px; 
height: 110px; 
border-radius: 50%; 
display: flex; 
align-items: center; 
justify-content: center; 
font-size: 4rem; 
background: radial-gradient(circle at 30% 30%, #f1f5f9, #94a3b8 55%, #475569); 
box-shadow: 0 0 30px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(0,0,0,0.3); 
margin-bottom: 14px; 
animation: pulse 1.5s infinite ease-in-out; 
}

@keyframes pulse { 
0%, 100% { transform: scale(1); } 
50% { transform: scale(1.06); } 
}

.microphone-section h2 { 
font-size: 2rem; 
margin-bottom: 16px; 
color: #ffd166; 
}

.btn { 
border: none; 
border-radius: 16px; 
padding: 14px 20px; 
font-size: 1rem; 
font-weight: 700; 
cursor: pointer; 
transition: transform 0.2s ease, opacity 0.2s ease; 
}

.btn:hover { 
transform: translateY(-2px); 
opacity: 0.95; 
}

.btn-generate { 
background: linear-gradient(135deg, #f59e0b, #f97316); 
color: white; 
}

.btn-reset { 
background: linear-gradient(135deg, #ef4444, #dc2626); 
color: white; 
width: 100%; 
margin-bottom: 12px; 
}

.btn-export { 
background: linear-gradient(135deg, #10b981, #059669); 
color: white; 
width: 100%; 
}

.btn-comment { 
background: linear-gradient(135deg, #60a5fa, #2563eb); 
color: white; 
}

.story-display { 
background: linear-gradient(135deg, rgba(251,191,36,0.12), rgba(45,212,191,0.08)); 
border: 1px solid rgba(255,255,255,0.1); 
border-radius: 18px; 
padding: 22px; 
position: relative; 
min-height: 180px; 
margin-bottom: 20px; 
}

.story-text { 
font-size: clamp(1.1rem, 2vw, 1.6rem); 
line-height: 1.7; 
color: #f5f5f5; 
margin-bottom: 16px; 
}

.story-number { 
position: absolute; 
right: 18px; 
bottom: 14px; 
font-weight: 700; 
color: #fbbf24; 
}

.audience-reactions { 
display: flex; 
flex-direction: column; 
gap: 18px; 
}

.reaction-buttons { 
display: grid; 
grid-template-columns: repeat(4, minmax(120px, 1fr)); 
gap: 12px; 
}

.reaction-btn { 
display: flex; 
align-items: center; 
justify-content: center; 
gap: 10px; 
background: rgba(255,255,255,0.05); 
border: 1px solid rgba(255,255,255,0.1); 
border-radius: 12px; 
padding: 14px 10px; 
color: white; 
font-weight: 700; 
cursor: pointer; 
transition: 0.2s ease; 
}

.reaction-btn:hover { 
background: rgba(255,255,255,0.1); 
transform: translateY(-2px); 
}

.count { 
background: rgba(255,255,255,0.15); 
border-radius: 999px; 
padding: 4px 8px; 
min-width: 28px; 
text-align: center; 
}

.comments-section { 
background: rgba(255,255,255,0.04); 
border: 1px solid rgba(255,255,255,0.08); 
border-radius: 16px; 
padding: 16px; 
}

.comments-section h3 { 
margin-bottom: 12px; 
color: #7ef9c6; 
}

.comment-input { 
display: flex; 
gap: 10px; 
margin-bottom: 14px; 
}

.comment-input input { 
flex: 1; 
border: 1px solid rgba(255,255,255,0.1); 
border-radius: 12px; 
padding: 12px 14px; 
background: rgba(15,23,42,0.6); 
color: white; 
font-size: 1rem; 
}

.comments-list { 
display: flex; 
flex-direction: column; 
gap: 10px; 
max-height: 220px; 
overflow-y: auto; 
}

.comment-item { 
background: rgba(255,255,255,0.06); 
border-left: 4px solid #7ef9c6; 
border-radius: 10px; 
padding: 10px 12px; 
color: #e5e7eb; 
}

.sidebar { 
display: flex; 
flex-direction: column; 
gap: 20px; 
}

.sidebar-section { 
background: rgba(255,255,255,0.04); 
border: 1px solid rgba(255,255,255,0.08); 
border-radius: 18px; 
padding: 18px; 
box-shadow: 0 10px 24px rgba(0,0,0,0.14); 
}

.sidebar-section h3 { 
margin-bottom: 14px; 
color: #ffd166; 
}

.stories-history { 
display: flex; 
flex-direction: column; 
gap: 10px; 
max-height: 420px; 
overflow-y: auto; 
}

.history-item { 
background: rgba(255,255,255,0.04); 
border-radius: 10px; 
padding: 10px 12px; 
color: #e2e8f0; 
line-height: 1.5; 
border-left: 4px solid #f59e0b; 
}

.footer { 
text-align: center; 
margin-top: 24px; 
padding: 20px; 
color: #d4d4d4; 
}

@media (max-width: 900px) { 
.main-content { 
grid-template-columns: 1fr; 
}

.bart-stats {
    grid-template-columns: repeat(2, minmax(140px, 1fr));
}
}

@media (max-width: 560px) { 
.container { 
padding: 14px; 
}

.bart-stats,
.reaction-buttons {
    grid-template-columns: 1fr;
}

.comment-input {
    flex-direction: column;
}
}


const storyTemplates = [ 
"Bart prend le micro et dit : 'Le matin, mon réveil a un caractère de juge. Il me regarde comme si j'avais volé la lune !' Le public éclate de rire et applaudit à fond.", 
"Bart raconte : 'J'ai essayé de faire du sport, mais mon tapis de course a plus de personnalité que moi. Il refuse de bouger quand je lui demande d'aller vite !' Le public hurle de rire.", 
"Bart lance : 'Mon café est si fort qu'il me donne l'impression d'être un chef d'entreprise en charge de 50 salariés... qui se battent avec des croissants !' Tout le monde applaudit.", 
"Bart dit : 'J'ai un chat qui a plus de timing que moi. Il me regarde comme un amateur quand je veux faire une blague !' Le public tombe en riant.", 
"Bart raconte : 'J'ai essayé de parler doucement pour être classe. Résultat : le public a pensé que j'avais perdu mon micro !' Tout le monde se marre.", 
"Bart déclare : 'J'ai demandé à mon ordinateur d'être plus intelligent. Il m'a répondu : 'Pas possible, je suis juste un PC, pas un comédien !' Le public est aux anges.", 
"Bart dit : 'Je suis tellement drôle que même les pauses café me demandent un sketch !' Le public applaudit pour l'idée.", 
"Bart raconte : 'Mon voisin a un chien qui aboie comme un micro. Chaque matin, il fait plus de spectacle que moi !' Le public rit à gorge déployée.", 
"Bart lance : 'J'ai essayé de faire croire que je suis sérieux. Le public a préféré ma version comique !' Tout le monde éclate de rire.", 
"Bart conclut : 'J'aime la vie parce qu'elle me donne des anecdotes parfaites pour le rire. Même mon réveil est devenu mon meilleur fan !'" 
];

const state = { 
score: 0, 
popularity: 0, 
audience: 24, 
stories: [], 
storyIndex: 0, 
laugh: 0, 
applause: 0, 
bravo: 0, 
encore: 0, 
comments: [] 
};

const storyDisplay = document.getElementById('storyText'); 
const storyNumber = document.getElementById('storyNumber'); 
const popularityEl = document.getElementById('popularity'); 
const totalScoreEl = document.getElementById('totalScore'); 
const storyCountEl = document.getElementById('storyCount'); 
const audienceEl = document.getElementById('audience'); 
const storiesHistory = document.getElementById('storiesHistory'); 
const commentsList = document.getElementById('commentsList');

const reactionMap = { 
laughBtn: 'laugh', 
applauseBtn: 'applause', 
bravo: 'bravo', 
encoreBtn: 'encore' 
};

function randomStory() { 
const story = storyTemplates[Math.floor(Math.random() * storyTemplates.length)]; 
state.storyIndex += 1;

const fullStory = `${story} \n\nLe public est conquis !`;
state.stories.unshift({
    id: state.storyIndex,
    text: fullStory
});

storyDisplay.textContent = fullStory;
storyNumber.textContent = `Histoire #${state.storyIndex}`;
storyCountEl.textContent = state.storyIndex;
updateHistory();
updateStats();
}

function updateStats() { 
const totalVotes = state.laugh + state.applause + state.bravo + state.encore; 
const popularity = totalVotes = 0 ? 0 : Math.min(100, Math.round(((state.laugh * 1.2 + state.applause * 1.5 + state.bravo * 2 + state.encore * 2.5) / (totalVotes * 2.5)) * 100)); 
state.popularity = popularity; 
state.score = state.laugh * 10 + state.applause * 15 + state.bravo * 20 + state.encore * 25; 
state.audience = 24 + totalVotes + Math.min(30, state.storyIndex * 4);

popularityEl.textContent = `${state.popularity}%`;
totalScoreEl.textContent = state.score;
audienceEl.textContent = state.audience;
}

function updateHistory() { 
storiesHistory.innerHTML = '';

state.stories.slice(0, 8).forEach((story) => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.textContent = `#${story.id} - ${story.text.substring(0, 90)}...`;
    storiesHistory.appendChild(item);
});
}

function updateComments() { 
commentsList.innerHTML = '';

state.comments.slice(0, 8).forEach((comment) => {
    const item = document.createElement('div');
    item.className = 'comment-item';
    item.textContent = comment;
    commentsList.appendChild(item);
});
}

function addReaction(type) { 
if (type = 'laugh') state.laugh += 1; 
if (type = 'applause') state.applause += 1; 
if (type = 'bravo') state.bravo += 1; 
if (type === 'encore') state.encore += 1;

document.getElementById('laughCount').textContent = state.laugh;
document.getElementById('applauseCount').textContent = state.applause;
document.getElementById('bravoCount').textContent = state.bravo;
document.getElementById('encoreCount').textContent = state.encore;

updateStats();
}

function addComment() { 
const input = document.getElementById('commentInput'); 
const value = input.value.trim();

if (!value) return;

state.comments.unshift(`"${value}"`);
input.value = '';
updateComments();
}

function resetState() { 
state.score = 0; 
state.popularity = 0; 
state.audience = 24; 
state.storyIndex = 0; 
state.laugh = 0; 
state.applause = 0; 
state.bravo = 0; 
state.encore = 0; 
state.stories = []; 
state.comments = [];

storyDisplay.textContent = 'Cliquez sur "Générer une Histoire" pour commencer le spectacle...';
storyNumber.textContent = '';
storyCountEl.textContent = '0';
document.getElementById('laughCount').textContent = '0';
document.getElementById('applauseCount').textContent = '0';
document.getElementById('bravoCount').textContent = '0';
document.getElementById('encoreCount').textContent = '0';

updateHistory();
updateComments();
updateStats();
}

function exportData() { 
const data = JSON.stringify({ 
score: state.score, 
popularity: state.popularity, 
stories: state.stories, 
comments: state.comments, 
reactions: { 
laugh: state.laugh, 
applause: state.applause, 
bravo: state.bravo, 
encore: state.encore 
} 
}, null, 2);

const blob = new Blob([data], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'the-show-man-data.json';
a.click();
URL.revokeObjectURL(url);
}

function init() { 
updateHistory(); 
updateComments(); 
updateStats();

document.getElementById('generateBtn').addEventListener('click', randomStory);
document.getElementById('commentBtn').addEventListener('click', addComment);
document.getElementById('resetBtn').addEventListener('click', resetState);
document.getElementById('exportBtn').addEventListener('click', exportData);

document.getElementById('commentInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') addComment();
});

Object.entries(reactionMap).forEach(([id, key]) => {
    document.getElementById(id).addEventListener('click', () => addReaction(key));
});
}

init();
