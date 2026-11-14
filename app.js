const STORAGE_KEY = 'the-show-man-state-v2';

const jokes = [
  { topic: 'tech', setup: 'Pourquoi les ordinateurs n’aiment-ils pas la plage ?', punchline: 'Parce qu’ils ont peur des virus… et du sable dans le clavier !' },
  { topic: 'tech', setup: 'J’ai demandé à mon robot de me préparer un café.', punchline: 'Il m’a répondu : « Erreur 404 : sommeil introuvable. »' },
  { topic: 'tech', setup: 'J’ai demandé à une IA si elle avait de l’humour.', punchline: 'Elle m’a répondu : « Oui, mais je préfère ne pas vous le faire subir. »' },
  { topic: 'tech', setup: 'Mon ordinateur m’a dit qu’il avait besoin d’une pause.', punchline: 'Je lui ai répondu : « D’accord, prends un cookie. »' },
  { topic: 'daily', setup: 'Mon réveil et moi, on a une relation très toxique.', punchline: 'Il crie tous les matins et je lui tape dessus.' },
  { topic: 'daily', setup: 'Pourquoi les plongeurs plongent-ils toujours en arrière ?', punchline: 'Parce que sinon ils tombent dans le bateau.' },
  { topic: 'daily', setup: 'Mon portefeuille fait beaucoup de sport.', punchline: 'Il court toujours après l’argent.' },
  { topic: 'daily', setup: 'Pourquoi le café a-t-il porté plainte ?', punchline: 'Il en avait marre de se faire déca-féiner.' },
  { topic: 'dev', setup: 'Pourquoi les développeurs préfèrent-ils le mode sombre ?', punchline: 'Parce que la lumière attire les bugs !' },
  { topic: 'dev', setup: 'Un SQL entre dans un bar et voit deux tables.', punchline: 'Il demande : « Je peux me joindre à vous ? »' },
  { topic: 'dev', setup: 'Il y a 10 types de personnes dans le monde.', punchline: 'Celles qui comprennent le binaire, et celles qui ne comprennent pas.' },
  { topic: 'dev', setup: 'Pourquoi les développeurs détestent-ils la nature ?', punchline: 'Il y a trop de bugs et aucun bouton Ctrl+Z !' },
  { topic: 'dad', setup: 'Quel est le comble pour un électricien ?', punchline: 'De ne pas être au courant.' },
  { topic: 'dad', setup: 'Que dit un zéro quand il croise un huit ?', punchline: '« Jolie ceinture ! »' },
  { topic: 'dad', setup: 'Comment appelle-t-on un chien qui fait de la magie ?', punchline: 'Un Labracadabrador !' },
  { topic: 'dad', setup: 'Quel est le sport préféré des insectes ?', punchline: 'Le cricket. Ils ont même leur propre équipe !' },
  { topic: 'absurd', setup: 'Pourquoi les livres ont-ils toujours froid ?', punchline: 'Parce qu’ils ont une couverture, mais pas de couverture chauffante.' },
  { topic: 'absurd', setup: 'J’ai acheté un livre sur l’anti-gravité.', punchline: 'Impossible de le poser !' },
  { topic: 'absurd', setup: 'Pourquoi le calendrier est-il stressé ?', punchline: 'Parce que ses jours sont comptés.' },
  { topic: 'absurd', setup: 'La vie d’une chaussette célibataire, c’est dur.', punchline: 'Elle finit toujours par perdre sa moitié au lavage.' },
  { topic: 'absurd', setup: 'Pourquoi les fantômes sont-ils de mauvais menteurs ?', punchline: 'Parce qu’on voit à travers eux.' },
  { topic: 'absurd', setup: 'Quelle est la dernière chose qui traverse l’esprit d’une mouche quand elle frappe un pare-brise ?', punchline: 'Son derrière.' }
];

const reactions = {
  laugh: { id: 'laughCount', points: 12, mood: 8, label: 'Le public éclate de rire !' },
  applause: { id: 'applauseCount', points: 10, mood: 6, label: 'La salle applaudit à tout rompre !' },
  bravo: { id: 'bravoCount', points: 8, mood: 4, label: 'Un tonnerre de bravos !' },
  encore: { id: 'encoreCount', points: 6, mood: 3, label: 'Le public en redemande !' }
};

const initialState = {
  storyCount: 0,
  totalScore: 0,
  audience: 128,
  mood: 65,
  reactions: { laugh: 0, applause: 0, bravo: 0, encore: 0 },
  history: [],
  comments: [],
  usedJokes: []
};

const $ = (id) => document.getElementById(id);
let state = loadState();
let busy = false;
let soundEnabled = false;
let audioContext = null;
let speechToken = 0;

function cloneInitialState() {
  return JSON.parse(JSON.stringify(initialState));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== 'object') return cloneInitialState();
    const defaults = cloneInitialState();
    return {
      ...defaults,
      ...saved,
      reactions: { ...defaults.reactions, ...(saved.reactions || {}) },
      history: Array.isArray(saved.history) ? saved.history.slice(-30) : [],
      comments: Array.isArray(saved.comments) ? saved.comments.slice(-30) : [],
      usedJokes: Array.isArray(saved.usedJokes) ? saved.usedJokes : []
    };
  } catch (error) {
    console.warn('Impossible de lire la sauvegarde locale.', error);
    return cloneInitialState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Impossible de sauvegarder les données.', error);
  }
}

function getJoke() {
  const topic = $('topicSelect').value;
  const pool = topic === 'all' ? jokes : jokes.filter((joke) => joke.topic === topic);
  let available = pool.filter((joke) => !state.usedJokes.includes(jokes.indexOf(joke)));
  if (!available.length) {
    state.usedJokes = state.usedJokes.filter((index) => !pool.some((joke) => jokes.indexOf(joke) === index));
    available = pool;
  }
  const joke = available[Math.floor(Math.random() * available.length)];
  state.usedJokes.push(jokes.indexOf(joke));
  return joke;
}

function render() {
  const total = Object.values(state.reactions).reduce((sum, count) => sum + count, 0);
  const positive = state.reactions.laugh + state.reactions.applause + state.reactions.bravo;
  const popularity = total ? Math.round((positive / total) * 100) : 0;
  $('popularity').textContent = `${popularity}%`;
  $('totalScore').textContent = state.totalScore.toLocaleString('fr-FR');
  $('storyCount').textContent = state.storyCount.toLocaleString('fr-FR');
  $('audience').textContent = state.audience.toLocaleString('fr-FR');
  $('showNumber').textContent = String(Math.max(1, state.storyCount + 1)).padStart(2, '0');
  Object.entries(reactions).forEach(([key, reaction]) => {
    $(reaction.id).textContent = state.reactions[key];
  });
  const meter = $('moodMeter');
  meter.style.width = `${state.mood}%`;
  meter.parentElement.setAttribute('aria-valuenow', String(state.mood));
  $('moodText').textContent = state.mood >= 75 ? '🔥 Salle en feu !' : state.mood >= 45 ? '😊 Salle bien chaude' : '🧊 Ambiance glaciale';
  renderHistory();
  renderComments();
}

function renderHistory() {
  const container = $('storiesHistory');
  container.replaceChildren();
  if (!state.history.length) {
    const empty = document.createElement('p');
    empty.className = 'history-empty';
    empty.textContent = 'Les meilleurs moments du spectacle apparaîtront ici.';
    container.appendChild(empty);
    return;
  }
  [...state.history].reverse().forEach((story) => {
    const item = document.createElement('article');
    item.className = 'history-item';
    const label = document.createElement('strong');
    label.textContent = `SHOW #${String(story.number).padStart(2, '0')}`;
    const text = document.createElement('span');
    text.textContent = `${story.setup} ${story.punchline}`;
    item.append(label, text);
    container.appendChild(item);
  });
}

function renderComments() {
  const container = $('commentsList');
  container.replaceChildren();
  state.comments.slice(-8).reverse().forEach((comment) => {
    const item = document.createElement('div');
    item.className = 'comment-item';
    item.textContent = comment.text;
    container.appendChild(item);
  });
}

function showSpeech(text) {
  const bubble = $('speechBubble');
  bubble.textContent = text;
  bubble.classList.add('visible');
  window.clearTimeout(showSpeech.timer);
  showSpeech.timer = window.setTimeout(() => bubble.classList.remove('visible'), 3200);
}

function speak(text, token) {
  if (!soundEnabled || !('speechSynthesis' in window)) return Promise.resolve();
  window.speechSynthesis.cancel();
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.96;
    utterance.pitch = 1.05;
    utterance.onend = resolve;
    utterance.onerror = resolve;
    window.speechSynthesis.speak(utterance);
    // Avoid waiting indefinitely if a browser does not fire speech events.
    window.setTimeout(() => {
      if (token === speechToken) resolve();
    }, Math.min(8000, Math.max(1800, text.length * 75)));
  });
}

function sound(type = 'laugh') {
  if (!soundEnabled) return;
  try {
    audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === 'suspended') audioContext.resume();
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type === 'boo' ? 'sawtooth' : 'sine';
    oscillator.frequency.setValueAtTime(type === 'boo' ? 110 : type === 'rimshot' ? 190 : 380, now);
    oscillator.frequency.exponentialRampToValueAtTime(type === 'boo' ? 82 : 220, now + 0.22);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.11, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.3);
  } catch (error) {
    console.warn('Audio indisponible dans ce navigateur.', error);
  }
}

function animateReaction(emoji, className = 'is-bounce') {
  const stage = document.querySelector('.stage-card');
  stage.classList.remove('is-bounce', 'is-tomato');
  stage.classList.add(className);
  window.setTimeout(() => stage.classList.remove(className), 600);
  if (emoji) {
    const particle = document.createElement('span');
    particle.className = 'fx-emoji';
    particle.textContent = emoji;
    particle.style.left = `${20 + Math.random() * 60}%`;
    $('fxLayer').appendChild(particle);
    window.setTimeout(() => particle.remove(), 1800);
  }
}

async function perform(setup, punchline, number) {
  if (busy) return;
  busy = true;
  const token = ++speechToken;
  const button = $('generateBtn');
  const stage = document.querySelector('.stage-card');
  button.disabled = true;
  button.querySelector('strong').textContent = 'Bart raconte…';
  $('storyNumber').textContent = `SHOW #${String(number).padStart(2, '0')}`;
  $('storyText').textContent = setup;
  showSpeech(setup);
  stage.classList.add('is-talking');
  await speak(setup, token);
  if (token !== speechToken) return;
  if (!soundEnabled) await new Promise((resolve) => window.setTimeout(resolve, 750));
  $('storyText').textContent = punchline;
  showSpeech(punchline);
  await speak(punchline, token);
  if (token !== speechToken) return;
  if (!soundEnabled) await new Promise((resolve) => window.setTimeout(resolve, 650));
  stage.classList.remove('is-talking');
  sound('rimshot');
  animateReaction('😂');
  button.disabled = false;
  button.querySelector('strong').textContent = 'Lancer une blague';
  busy = false;
}

function generateStory() {
  if (busy) return;
  const joke = getJoke();
  const number = state.storyCount + 1;
  state.storyCount = number;
  state.totalScore += 15;
  state.audience = Math.max(20, state.audience + Math.floor(Math.random() * 17) - 5);
  state.history.push({ number, setup: joke.setup, punchline: joke.punchline });
  state.history = state.history.slice(-30);
  saveState();
  render();
  perform(joke.setup, joke.punchline, number);
}

function react(type) {
  const reaction = reactions[type];
  if (!reaction) return;
  state.reactions[type] += 1;
  state.totalScore += reaction.points;
  state.mood = Math.min(100, state.mood + reaction.mood);
  state.audience = Math.max(20, state.audience + 2);
  saveState();
  render();
  showSpeech(reaction.label);
  sound('laugh');
  animateReaction(type === 'applause' ? '👏' : type === 'bravo' ? '🌟' : type === 'encore' ? '🔥' : '😂');
}

function submitJoke(event) {
  event.preventDefault();
  if (busy) return;
  const input = $('userJokeInput');
  const joke = input.value.trim();
  if (joke.length < 5) {
    input.setCustomValidity('Écrivez une blague d’au moins 5 caractères.');
    input.reportValidity();
    return;
  }
  input.setCustomValidity('');
  input.value = '';
  $('characterCount').textContent = '0 / 240';
  const number = state.storyCount + 1;
  state.storyCount = number;
  state.totalScore += 5;
  state.history.push({ number, setup: 'Blague du public :', punchline: joke });
  state.history = state.history.slice(-30);
  saveState();
  render();
  perform('Voici une blague envoyée par le public…', joke, number);
  window.setTimeout(() => {
    if (joke.length > 35 && /[?!…]/.test(joke)) react('laugh');
    else {
      state.mood = Math.max(0, state.mood - 3);
      saveState();
      render();
    }
  }, 1800);
}

function submitComment(event) {
  event.preventDefault();
  const input = $('commentInput');
  const text = input.value.trim();
  if (!text) return;
  state.comments.push({ text, at: new Date().toISOString() });
  state.comments = state.comments.slice(-30);
  input.value = '';
  saveState();
  renderComments();
  showSpeech('Merci pour votre petit mot ! 💛');
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  $('audioToggle').setAttribute('aria-pressed', String(soundEnabled));
  $('audioIcon').textContent = soundEnabled ? '🔊' : '🔇';
  $('audioLabel').textContent = soundEnabled ? 'Son activé' : 'Son coupé';
  if (!soundEnabled && 'speechSynthesis' in window) window.speechSynthesis.cancel();
  if (soundEnabled) {
    sound('rimshot');
    showSpeech('Le son est activé. Place au spectacle !');
  }
}

function exportData() {
  const payload = { app: 'THE SHOW MAN', exportedAt: new Date().toISOString(), ...state };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `the-show-man-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showSpeech('Vos données sont prêtes à être téléchargées.');
}

function resetGame() {
  if (!window.confirm('Recommencer le spectacle à zéro ? Cette action effacera le score, les histoires et les commentaires enregistrés sur cet appareil.')) return;
  speechToken += 1;
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  state = cloneInitialState();
  try { localStorage.removeItem(STORAGE_KEY); } catch (error) { console.warn(error); }
  $('storyText').textContent = 'Cliquez sur « Lancer une blague » pour commencer le spectacle…';
  $('storyNumber').textContent = '';
  document.querySelector('.stage-card').classList.remove('is-talking', 'is-bounce', 'is-tomato');
  busy = false;
  $('generateBtn').disabled = false;
  $('generateBtn').querySelector('strong').textContent = 'Lancer une blague';
  render();
  showSpeech('Nouvelle soirée, nouvelle chance de rire !');
}

$('generateBtn').addEventListener('click', generateStory);
$('laughBtn').addEventListener('click', () => react('laugh'));
$('applauseBtn').addEventListener('click', () => react('applause'));
$('bravo').addEventListener('click', () => react('bravo'));
$('encoreBtn').addEventListener('click', () => react('encore'));
$('audioToggle').addEventListener('click', toggleSound);
$('jokeForm').addEventListener('submit', submitJoke);
$('userJokeInput').addEventListener('input', (event) => {
  $('characterCount').textContent = `${event.target.value.length} / 240`;
  event.target.setCustomValidity('');
});
$('commentForm').addEventListener('submit', submitComment);
$('resetBtn').addEventListener('click', resetGame);
$('exportBtn').addEventListener('click', exportData);
$('year').textContent = new Date().getFullYear();
render();
