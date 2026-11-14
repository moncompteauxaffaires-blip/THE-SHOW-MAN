const STORAGE_KEY = 'the-show-man-state-v1';

const jokes = [
  {
    setup: 'Pourquoi les ordinateurs n’aiment-ils pas la plage ?',
    punchline: 'Parce qu’ils ont peur des virus… et du sable dans le clavier !'
  },
  {
    setup: 'J’ai demandé à mon robot de me préparer un café.',
    punchline: 'Il m’a répondu : « Erreur 404 : sommeil introuvable. »'
  },
  {
    setup: 'Mon réveil et moi, on a une relation très toxique.',
    punchline: 'Il crie tous les matins et je lui tape dessus.'
  },
  {
    setup: 'Pourquoi les développeurs préfèrent-ils le mode sombre ?',
    punchline: 'Parce que la lumière attire les bugs !'
  },
  {
    setup: 'Quel est le comble pour un électricien ?',
    punchline: 'De ne pas être au courant.'
  },
  {
    setup: 'Que dit un zéro quand il croise un huit ?',
    punchline: '« Jolie ceinture ! »'
  },
  {
    setup: 'Pourquoi les plongeurs plongent-ils toujours en arrière ?',
    punchline: 'Parce que sinon ils tombent dans le bateau.'
  },
  {
    setup: 'J’ai commencé un régime à base de notifications.',
    punchline: 'J’ai déjà perdu le fil de la conversation.'
  },
  {
    setup: 'Comment appelle-t-on un chien qui fait de la magie ?',
    punchline: 'Un Labracadabrador !'
  },
  {
    setup: 'Pourquoi les livres ont-ils toujours froid ?',
    punchline: 'Parce qu’ils ont une couverture, mais pas de couverture chauffante.'
  },
  {
    setup: 'Un SQL entre dans un bar et voit deux tables.',
    punchline: 'Il demande : « Je peux me joindre à vous ? »'
  },
  {
    setup: 'J’ai voulu raconter une blague sur le papier.',
    punchline: 'Mais elle était trop tirée par les cheveux.'
  },
  {
    setup: 'Quel est le sport préféré des insectes ?',
    punchline: 'Le cricket. Ils ont même leur propre équipe !'
  },
  {
    setup: 'Mon ordinateur m’a dit qu’il avait besoin d’une pause.',
    punchline: 'Je lui ai répondu : « D’accord, prends un cookie. »'
  },
  {
    setup: 'Pourquoi les fantômes sont-ils de mauvais menteurs ?',
    punchline: 'Parce qu’on voit à travers eux.'
  },
  {
    setup: 'J’ai acheté un livre sur l’anti-gravité.',
    punchline: 'Impossible de le poser !'
  },
  {
    setup: 'Pourquoi le calendrier est-il stressé ?',
    punchline: 'Parce que ses jours sont comptés.'
  },
  {
    setup: 'Que fait un poussin de deux cents kilos ?',
    punchline: 'PIOU PIOU… et il réserve une très grande omelette !'
  },
  {
    setup: 'Pourquoi le café a-t-il porté plainte ?',
    punchline: 'Il en avait marre de se faire déca-féiner.'
  },
  {
    setup: 'La vie d’une chaussette célibataire, c’est dur.',
    punchline: 'Elle finit toujours par perdre sa moitié au lavage.'
  },
  {
    setup: 'J’ai demandé à une IA si elle avait de l’humour.',
    punchline: 'Elle m’a répondu : « Oui, mais je préfère ne pas vous le faire subir. »'
  },
  {
    setup: 'Pourquoi les escargots n’aiment-ils pas les courses ?',
    punchline: 'Ils trouvent que ça va trop vite.'
  },
  {
    setup: 'Mon portefeuille fait beaucoup de sport.',
    punchline: 'Il court toujours après l’argent.'
  },
  {
    setup: 'Quelle est la dernière chose qui traverse l’esprit d’une mouche quand elle frappe un pare-brise ?',
    punchline: 'Son derrière.'
  }
];

const reactionMeta = {
  laugh: { countId: 'laughCount', label: 'Rire', points: 12 },
  applause: { countId: 'applauseCount', label: 'Applaudissements', points: 10 },
  bravo: { countId: 'bravoCount', label: 'Bravo', points: 8 },
  encore: { countId: 'encoreCount', label: 'Encore', points: 6 }
};

const defaultState = {
  storyCount: 0,
  totalScore: 0,
  audience: 128,
  popularity: 0,
  reactions: { laugh: 0, applause: 0, bravo: 0, encore: 0 },
  history: [],
  comments: [],
  usedJokes: []
};

const $ = (id) => document.getElementById(id);
let state = loadState();
let isGenerating = false;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== 'object') {
      return structuredClone(defaultState);
    }

    const next = structuredClone(defaultState);
    return {
      ...next,
      ...saved,
      reactions: {
        ...next.reactions,
        ...(saved.reactions || {})
      },
      history: Array.isArray(saved.history) ? saved.history : [],
      comments: Array.isArray(saved.comments) ? saved.comments : [],
      usedJokes: Array.isArray(saved.usedJokes) ? saved.usedJokes : []
    };
  } catch (error) {
    console.warn('Données locales illisibles, remise à zéro.', error);
    return structuredClone(defaultState);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Impossible de sauvegarder l’état local.', error);
  }
}

function pickJoke() {
  let available = jokes
    .map((_, index) => index)
    .filter((index) => !state.usedJokes.includes(index));

  if (!available.length) {
    state.usedJokes = [];
    available = jokes.map((_, index) => index);
  }

  const index = available[Math.floor(Math.random() * available.length)];
  state.usedJokes.push(index);
  return jokes[index];
}

function updatePopularity() {
  const totalReactions = Object.values(state.reactions).reduce((sum, value) => sum + value, 0);
  const positiveScore = state.reactions.laugh + state.reactions.applause + state.reactions.bravo;
  state.popularity = totalReactions === 0 ? 0 : Math.round((positiveScore / totalReactions) * 100);
}

function renderStats() {
  $('storyCount').textContent = state.storyCount;
  $('totalScore').textContent = state.totalScore;
  $('audience').textContent = state.audience;
  $('popularity').textContent = `${state.popularity}%`;

  Object.entries(reactionMeta).forEach(([key, meta]) => {
    $(meta.countId).textContent = state.reactions[key];
  });
}

function renderHistory() {
  const list = $('storiesHistory');
  list.innerHTML = '';

  if (!state.history.length) {
    const empty = document.createElement('div');
    empty.className = 'history-item';
    empty.textContent = 'Les histoires du spectacle apparaîtront ici.';
    list.appendChild(empty);
    return;
  }

  [...state.history].reverse().forEach((story) => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.textContent = `#${story.number} — ${story.setup} ${story.punchline}`;
    list.appendChild(item);
  });
}

function renderComments() {
  const list = $('commentsList');
  list.innerHTML = '';

  if (!state.comments.length) {
    const empty = document.createElement('div');
    empty.className = 'comment-item';
    empty.textContent = 'Soyez le premier à commenter !';
    list.appendChild(empty);
    return;
  }

  [...state.comments].reverse().forEach((comment) => {
    const item = document.createElement('div');
    item.className = 'comment-item';
    item.textContent = comment.text;
    list.appendChild(item);
  });
}

function render() {
  updatePopularity();
  renderStats();
  renderHistory();
  renderComments();
}

function generateStory() {
  if (isGenerating) return;

  isGenerating = true;
  const joke = pickJoke();
  const number = state.storyCount + 1;

  state.storyCount = number;
  state.audience = Math.max(25, state.audience + Math.floor(Math.random() * 20) - 5);
  state.history.push({
    number,
    setup: joke.setup,
    punchline: joke.punchline
  });
  state.totalScore += 15;

  $('storyText').textContent = joke.setup;
  $('storyNumber').textContent = `#${number}`;
  $('generateBtn').disabled = true;
  $('generateBtn').textContent = '🎙️ Bart raconte…';

  setTimeout(() => {
    $('storyText').textContent = `${joke.setup} ${joke.punchline}`;
    $('generateBtn').disabled = false;
    $('generateBtn').textContent = '🎙️ Générer une Histoire';
    isGenerating = false;
    saveState();
    render();
  }, 1100);
}

function addReaction(type) {
  if (!reactionMeta[type]) return;

  state.reactions[type] += 1;
  state.totalScore += reactionMeta[type].points;
  state.audience = Math.max(20, state.audience + 3);
  saveState();
  render();
}

function addComment() {
  const input = $('commentInput');
  const text = input.value.trim();

  if (!text) {
    input.focus();
    return;
  }

  state.comments.push({ text });
  state.comments = state.comments.slice(-20);
  input.value = '';
  saveState();
  renderComments();
}

function resetGame() {
  const confirmed = window.confirm('Réinitialiser le spectacle ?');
  if (!confirmed) return;

  state = structuredClone(defaultState);
  localStorage.removeItem(STORAGE_KEY);
  $('storyText').textContent = 'Cliquez sur "Générer une Histoire" pour commencer le spectacle...';
  $('storyNumber').textContent = '';
  render();
}

function exportData() {
  const payload = {
    app: 'THE SHOW MAN',
    exportedAt: new Date().toISOString(),
    ...state
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `the-show-man-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

$('generateBtn').addEventListener('click', generateStory);
$('laughBtn').addEventListener('click', () => addReaction('laugh'));
$('applauseBtn').addEventListener('click', () => addReaction('applause'));
$('bravo').addEventListener('click', () => addReaction('bravo'));
$('encoreBtn').addEventListener('click', () => addReaction('encore'));
$('commentBtn').addEventListener('click', addComment);
$('commentInput').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addComment();
  }
});
$('resetBtn').addEventListener('click', resetGame);
$('exportBtn').addEventListener('click', exportData);

render();
