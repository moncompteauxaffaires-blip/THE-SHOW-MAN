(() => {
  'use strict';

  const STORAGE_KEY = 'the-show-man-save-v1';
  const stories = [
    'J’ai voulu devenir influenceur… mais même mon miroir m’a laissé en vu.',
    'Mon réveil sonne tellement tôt que même mes rêves demandent un jour de congé.',
    'J’ai acheté un livre sur la confiance en soi. Il est encore dans le panier, il n’ose pas passer commande.',
    'À la salle, je ne soulève pas des poids : je soulève surtout les attentes de mes proches.',
    'Mon téléphone connaît mieux ma vie que moi. La preuve : il me propose des souvenirs que j’avais oubliés.',
    'J’ai commencé un régime. Pour l’instant, je fais surtout le deuil des frites.',
    'Le GPS m’a dit de faire demi-tour. Enfin quelqu’un qui comprend ma stratégie de vie.',
    'Je voulais économiser de l’argent, alors j’ai acheté un portefeuille plus petit.'
  ];
  const commentSamples = [
    'Le public adore !', 'Encore une !', 'Quel talent sur scène !',
    'Je n’étais pas prêt pour cette chute 😂', 'Bart est en feu ce soir !'
  ];

  const initialState = {
    popularity: 0,
    totalScore: 0,
    storyCount: 0,
    audience: 25,
    currentStory: '',
    history: [],
    reactions: { laugh: 0, applause: 0, bravo: 0, encore: 0 },
    comments: []
  };

  let state = loadState();
  const $ = (id) => document.getElementById(id);

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return saved ? { ...initialState, ...saved, reactions: { ...initialState.reactions, ...saved.reactions } } : { ...initialState };
    } catch (_) {
      return { ...initialState };
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function render() {
    $('popularity').textContent = `${Math.min(100, state.popularity)}%`;
    $('totalScore').textContent = state.totalScore;
    $('storyCount').textContent = state.storyCount;
    $('audience').textContent = state.audience;
    $('storyText').textContent = state.currentStory || 'Cliquez sur « Générer une Histoire » pour commencer le spectacle...';
    $('storyNumber').textContent = state.storyCount ? `Sketch #${state.storyCount}` : '';

    Object.entries(state.reactions).forEach(([name, value]) => {
      const node = $(`${name}Count`);
      if (node) node.textContent = value;
    });

    $('storiesHistory').innerHTML = state.history.length
      ? state.history.map((story, index) => `<div class="history-item"><strong>#${state.history.length - index}</strong> ${escapeHtml(story)}</div>`).join('')
      : '<p>Aucun sketch joué pour le moment.</p>';
    $('commentsList').innerHTML = state.comments.length
      ? state.comments.map((comment) => `<div class="comment-item">${escapeHtml(comment)}</div>`).join('')
      : '<p>Les premiers commentaires apparaîtront ici.</p>';
  }

  function generateStory() {
    const story = stories[Math.floor(Math.random() * stories.length)];
    state.currentStory = story;
    state.storyCount += 1;
    state.history.unshift(story);
    state.history = state.history.slice(0, 20);
    state.totalScore += 10;
    state.popularity = Math.min(100, state.popularity + 2);
    state.audience += Math.floor(Math.random() * 8) + 1;
    state.comments.unshift(commentSamples[Math.floor(Math.random() * commentSamples.length)]);
    state.comments = state.comments.slice(0, 12);
    saveState();
    render();
  }

  function react(type, points) {
    if (!state.currentStory) return;
    state.reactions[type] += 1;
    state.totalScore += points;
    state.popularity = Math.min(100, state.popularity + 1);
    if (type === 'encore') state.audience += 3;
    saveState();
    render();
  }

  function addComment() {
    const input = $('commentInput');
    const value = input.value.trim();
    if (!value) return;
    state.comments.unshift(`Spectateur : ${value}`);
    state.comments = state.comments.slice(0, 12);
    input.value = '';
    saveState();
    render();
  }

  function reset() {
    if (!window.confirm('Réinitialiser toute la progression ?')) return;
    state = { ...initialState, reactions: { ...initialState.reactions } };
    saveState();
    render();
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'the-show-man-progression.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  $('generateBtn').addEventListener('click', generateStory);
  $('laughBtn').addEventListener('click', () => react('laugh', 5));
  $('applauseBtn').addEventListener('click', () => react('applause', 4));
  $('bravo').addEventListener('click', () => react('bravo', 7));
  $('encoreBtn').addEventListener('click', () => react('encore', 10));
  $('commentBtn').addEventListener('click', addComment);
  $('commentInput').addEventListener('keydown', (event) => { if (event.key === 'Enter') addComment(); });
  $('resetBtn').addEventListener('click', reset);
  $('exportBtn').addEventListener('click', exportData);

  render();
})();
