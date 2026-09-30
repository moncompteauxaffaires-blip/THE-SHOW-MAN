# 🎭 THE SHOW MAN 

Bienvenue dans THE SHOW MAN, un jeu interactif .

THE SHOW MAN

https://es-d-89840578520261002-01a0f149-a92f-78ae-b158-58792f35a2fa.codepen.dev/

<!DOCTYPE html>
<html lang="fr" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Showman Comedy Club</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        clubRed: '#8B0000',
                        neonGold: '#FFD700',
                        stagePurple: '#2A0845',
                        brickRed: '#3b1812'
                    },
                    animation: {
                        'spotlight-sweep': 'sweep 6s ease-in-out infinite alternate',
                        'bounce-short': 'bounce 0.4s ease-in-out 2',
                        'pulse-glow': 'pulseGlow 2s infinite'
                    },
                    keyframes: {
                        sweep: {
                            '0%': { transform: 'rotate(-25deg)' },
                            '100%': { transform: 'rotate(25deg)' }
                        },
                        pulseGlow: {
                            '0%, 100%': { filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.6))' },
                            '50%': { filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.9))' }
                        }
                    }
                }
            }
        }
    </script>
    <!-- FontAwesome & Phosphor Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Inter:wght@300;400;600;800&family=Permanent+Marker&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0b0914;
            color: #f3f4f6;
            overflow-x: hidden;
        }
        .font-marker { font-family: 'Permanent-Marker', 'Fredoka One', cursive; }
        .font-funny { font-family: 'Fredoka One', cursive; }
        
        /* Brick wall simulation */
        .brick-wall {
            background-color: #1a0f18;
            background-image: 
                linear-gradient(335deg, rgba(0,0,0,0.8) 0%, transparent 50%),
                linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
            background-size: 100% 100%, 40px 20px, 40px 20px;
        }

        /* Neon Glow Text */
        .neon-text {
            text-shadow: 0 0 5px #ff007f, 0 0 10px #ff007f, 0 0 20px #ff007f, 0 0 40px #ff0055;
        }

        .neon-gold {
            text-shadow: 0 0 5px #ffd700, 0 0 15px #ffa500, 0 0 30px #ff8c00;
        }

        /* Spotlight light cone */
        .spotlight-beam {
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 230, 150, 0.15) 60%, rgba(255, 255, 255, 0) 100%);
            clip-path: polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%);
            pointer-events: none;
        }

        /* Curtains styling */
        .curtain-left, .curtain-right {
            background: linear-gradient(90deg, #30000a 0%, #700018 30%, #4a0010 70%, #200007 100%);
            box-shadow: inset 0 0 20px rgba(0,0,0,0.8);
        }

        /* Animated Floating Elements (Tomatoes, Emojis) */
        @keyframes floatUp {
            0% { transform: translateY(0) scale(0.8); opacity: 1; }
            100% { transform: translateY(-120px) scale(1.3); opacity: 0; }
        }
        .floating-emoji {
            position: absolute;
            animation: floatUp 1.8s ease-out forwards;
            pointer-events: none;
            z-index: 50;
        }

        /* Tomato Throw Animation */
        @keyframes throwTomato {
            0% { transform: translate(var(--startX), 200px) scale(0.5); opacity: 1; }
            70% { transform: translate(var(--endX), var(--endY)) scale(1.1) rotate(180deg); opacity: 1; }
            75% { transform: translate(var(--endX), var(--endY)) scale(1.4); opacity: 0.9; }
            100% { transform: translate(var(--endX), var(--endY)) scale(2); opacity: 0; }
        }
        .splat-tomato {
            position: absolute;
            animation: throwTomato 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            pointer-events: none;
            z-index: 60;
        }
    </style>
</head>
<body class="min-h-screen flex flex-col justify-between select-none">

    <header class="bg-black/70 backdrop-blur-md border-b border-purple-900/40 px-4 py-3 sticky top-0 z-40">
        <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-xl shadow-lg shadow-pink-500/30">
                    🎤
                </div>
                <div>
                    <h1 class="text-xl md:text-2xl font-bold font-funny text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400">
                        AI SHOWMAN
                    </h1>
                    <p class="text-xs text-purple-300 tracking-wide font-medium">Le Comedy Club 100% Synthétique</p>
                </div>
            </div>

            <!-- Global Controls & Sound Options -->
            <div class="flex items-center gap-3">
                <!-- Crowd Mood Bar -->
                <div class="bg-gray-900/80 border border-gray-700/60 rounded-full px-4 py-1.5 flex items-center gap-2 text-xs">
                    <span class="text-gray-400 font-semibold">Ambiance:</span>
                    <div class="w-24 bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-700">
                        <div id="moodMeter" class="bg-gradient-to-r from-red-500 via-yellow-400 to-emerald-400 h-full w-3/4 transition-all duration-500"></div>
                    </div>
                    <span id="moodText" class="font-bold text-yellow-400">🔥 Chaud</span>
                </div>

                <!-- Audio Toggle -->
                <button id="audioToggleBtn" onclick="toggleAudio()" class="p-2.5 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/30 text-purple-200 transition-all text-sm flex items-center gap-2">
                    <i id="audioIcon" class="fas fa-volume-up"></i>
                    <span class="hidden sm:inline">Son</span>
                </button>
            </div>
        </div>
    </header>

    <main class="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-6 flex flex-col gap-6">
        
        <!-- STAGE SCREEN & PERFORMANCE AREA -->
        <div class="relative w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-purple-800/50 brick-wall flex flex-col items-center justify-between min-h-[460px] md:min-h-[520px] pt-6 pb-2 transition-all">
            
            <!-- Red Stage Curtains -->
            <div class="curtain-left absolute left-0 top-0 bottom-0 w-8 md:w-16 z-20 border-r border-red-950/60"></div>
            <div class="curtain-right absolute right-0 top-0 bottom-0 w-8 md:w-16 z-20 border-l border-red-950/60"></div>

            <!-- Spotlight Effects Layer -->
            <div id="spotlightOverlay" class="absolute inset-0 z-10 pointer-events-none transition-opacity duration-700">
                <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-[120%] spotlight-beam animate-spotlight-sweep opacity-90"></div>
                <div class="absolute -top-10 left-1/4 -translate-x-1/2 w-64 h-[120%] spotlight-beam opacity-40"></div>
                <div class="absolute -top-10 right-1/4 translate-x-1/2 w-64 h-[120%] spotlight-beam opacity-40"></div>
            </div>

            <!-- Neon Sign -->
            <div class="z-20 text-center select-none pt-2">
                <div class="inline-block px-6 py-2 rounded-2xl bg-black/60 border border-purple-500/40 shadow-xl backdrop-blur-md">
                    <h2 class="text-xl md:text-3xl font-marker tracking-widest text-pink-500 neon-text">
                        AI COMEDY SHOW
                    </h2>
                    <p class="text-[10px] sm:text-xs text-yellow-300 tracking-widest font-mono uppercase font-semibold">
                        ★ LIVE STREAMING SYNTH HUMOR ★
                    </p>
                </div>
            </div>

            <!-- COMEDIAN CHARACTER AVATAR AREA -->
            <div class="z-20 relative flex flex-col items-center my-auto transition-transform duration-300" id="stageAvatarContainer">
                
                <!-- Floating Dialogue Bubble -->
                <div id="speechBubble" class="opacity-0 transition-opacity duration-300 absolute -top-24 sm:-top-28 bg-white text-gray-900 rounded-2xl p-4 shadow-2xl max-w-sm sm:max-w-md w-max text-center z-30 font-medium text-sm sm:text-base border-2 border-purple-400">
                    <span id="speechText">Bienvenue au club !</span>
                    <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
                </div>

                <!-- SVG Interactive Comedian Avatar -->
                <div id="avatarGraphic" class="w-36 h-36 sm:w-48 sm:h-48 relative transition-transform duration-150">
                    <!-- Dynamic SVG Comedian generated by JS -->
                </div>

                <!-- Microphone Stand -->
                <div class="relative w-full flex justify-center -mt-4">
                    <div class="w-2 h-20 bg-gradient-to-b from-gray-300 via-gray-600 to-gray-900 rounded-full shadow-lg"></div>
                    <div class="absolute top-0 w-6 h-6 bg-yellow-500 rounded-full border-2 border-gray-200 shadow-md transform -translate-y-2"></div>
                    <div class="absolute bottom-0 w-20 h-4 bg-gray-800 rounded-full border border-gray-600"></div>
                </div>
            </div>

            <!-- Stage Floor & Subtitle Teleprompter -->
            <div class="z-20 w-full px-4 sm:px-12 flex flex-col items-center gap-3">
                
                <!-- Teleprompter / Joke Display -->
                <div class="w-full max-w-2xl bg-black/85 border border-purple-500/40 rounded-2xl p-3 sm:p-4 text-center backdrop-blur-md min-h-[70px] flex items-center justify-center shadow-lg">
                    <p id="teleprompterText" class="text-sm sm:text-lg font-semibold text-purple-100 leading-relaxed italic">
                        Cliquez sur "Prochaine Blague" ou sélectionnez un comédien pour lancer le spectacle !
                    </p>
                </div>

                <!-- Stage Wooden Plank Floor FX -->
                <div class="w-full h-5 bg-gradient-to-r from-yellow-950 via-amber-900 to-yellow-950 rounded-lg border-t-2 border-amber-600/40 shadow-inner"></div>
            </div>

            <!-- Floating Tomatoes and Emojis Layer -->
            <div id="fxContainer" class="absolute inset-0 overflow-hidden pointer-events-none z-30"></div>
        </div>

        <!-- CONTROL PANEL & INTERACTION DECK -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <!-- COLUMN 1: Comedian Selection & Topic -->
            <div class="bg-gray-900/80 border border-purple-900/50 rounded-2xl p-4 flex flex-col gap-4 shadow-xl">
                <h3 class="text-base font-bold text-yellow-400 flex items-center gap-2">
                    <i class="fas fa-robot text-pink-400"></i> Choix du Comédien
                </h3>
                
                <div class="grid grid-cols-2 gap-2" id="comedianSelector">
                    <!-- Comedian Buttons JS populated -->
                </div>

                <div class="border-t border-gray-800 pt-3">
                    <label class="text-xs text-gray-400 font-semibold block mb-1.5">Thème des blagues:</label>
                    <select id="topicSelect" class="w-full bg-gray-800 border border-gray-700 text-purple-200 rounded-xl p-2.5 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-purple-500 outline-none">
                        <option value="tech">🤖 Tech & IA</option>
                        <option value="daily">☕ Vie Quotidienne</option>
                        <option value="dark">😈 Humour Noir & Absurde</option>
                        <option value="dev">💻 Développeurs & Code</option>
                        <option value="dad">👨‍👧 Dad Jokes & Puns</option>
                    </select>
                </div>

                <button id="nextJokeBtn" onclick="playNextJoke()" class="w-full py-3.5 px-4 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-pink-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 text-sm sm:text-base">
                    <i class="fas fa-play"></i> Prochaine Blague !
                </button>
            </div>

            <!-- COLUMN 2: Crowd Reactions (Interactive Game) -->
            <div class="bg-gray-900/80 border border-purple-900/50 rounded-2xl p-4 flex flex-col justify-between gap-4 shadow-xl">
                <div>
                    <h3 class="text-base font-bold text-yellow-400 flex items-center gap-2 mb-1">
                        <i class="fas fa-users text-purple-400"></i> Réagissez en Direct !
                    </h3>
                    <p class="text-xs text-gray-400">Vos réactions influencent le score du comédien et l'ambiance de la salle.</p>
                </div>

                <div class="grid grid-cols-2 gap-2.5">
                    <button onclick="triggerReaction('laugh')" class="py-3 px-3 bg-gradient-to-b from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 text-white font-bold rounded-xl shadow border border-emerald-400/30 text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-95">
                        <span class="text-lg">😂</span> Rire (👏)
                    </button>
                    <button onclick="triggerReaction('boo')" class="py-3 px-3 bg-gradient-to-b from-red-700 to-rose-900 hover:from-red-600 hover:to-rose-800 text-white font-bold rounded-xl shadow border border-red-400/30 text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-95">
                        <span class="text-lg">👎</span> Huer (Boo!)
                    </button>
                    <button onclick="triggerTomato()" class="py-3 px-3 bg-gradient-to-b from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-bold rounded-xl shadow border border-amber-400/30 text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-95">
                        <span class="text-lg">🍅</span> Lancer Tomate
                    </button>
                    <button onclick="playDrumRimshot()" class="py-3 px-3 bg-gradient-to-b from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 text-white font-bold rounded-xl shadow border border-yellow-400/30 text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-95">
                        <span class="text-lg">🥁</span> Rimshot (Tss)
                    </button>
                </div>

                <div class="bg-black/40 rounded-xl p-2.5 border border-purple-900/30 flex items-center justify-between text-xs">
                    <span class="text-gray-400">Score de Rire Totaux:</span>
                    <span id="scoreCounter" class="font-mono font-bold text-yellow-300 text-base">0 pts</span>
                </div>
            </div>

            <!-- COLUMN 3: Open Mic - Pitch Your Joke -->
            <div class="bg-gray-900/80 border border-purple-900/50 rounded-2xl p-4 flex flex-col gap-3 shadow-xl">
                <h3 class="text-base font-bold text-yellow-400 flex items-center gap-2">
                    <i class="fas fa-microphone-alt text-yellow-400"></i> Mode "Micro Ouvert"
                </h3>
                <p class="text-xs text-gray-400">Saisissez votre propre blague. Le public virtuel l'évaluera !</p>

                <textarea id="userJokeInput" rows="3" placeholder="Tapez votre meilleure blague ici..." class="w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-xl p-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-pink-500 outline-none resize-none"></textarea>

                <button onclick="submitUserJoke()" class="py-2.5 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-gray-950 font-extrabold rounded-xl shadow-lg transition active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2">
                    <i class="fas fa-paper-plane"></i> Tester ma Blague
                </button>
            </div>
        </div>

    </main>

    <footer class="bg-black/80 border-t border-purple-900/30 py-3 px-4 text-center text-xs text-gray-500">
        AI Showman Comedy Club &copy; 2026 — Expérience Stand-Up Interactive & Synthèse Vocale Web Audio
    </footer>

    <!-- JAVASCRIPT LOGIC -->
    <script>
        // State Management
        let audioEnabled = true;
        let isPerforming = false;
        let score = 0;
        let crowdMood = 75; // 0 to 100
        let currentComedianIndex = 0;
        let synth = window.speechSynthesis;
        let audioCtx = null;

        // Comedians Database with SVG and styles
        const comedians = [
            {
                id: 'rick',
                name: 'Bot Rick',
                style: 'Sarcastic Tech',
                badge: '🤖 IA Sarcastique',
                pitch: 0.8,
                rate: 1.0,
                color: '#ec4899',
                svg: `<svg viewBox="0 0 100 100" class="w-full h-full">
                    <rect x="25" y="20" width="50" height="45" rx="10" fill="#374151" stroke="#ec4899" stroke-width="3"/>
                    <circle cx="40" cy="38" r="7" fill="#111827"/>
                    <circle cx="60" cy="38" r="7" fill="#111827"/>
                    <circle cx="40" cy="38" r="3" fill="#ec4899"/>
                    <circle cx="60" cy="38" r="3" fill="#ec4899"/>
                    <path id="mouth" d="M 35 52 Q 50 52 65 52" stroke="#f3f4f6" stroke-width="3" fill="none" stroke-linecap="round"/>
                    <rect x="42" y="65" width="16" height="15" fill="#4b5563"/>
                    <path d="M 20 80 Q 50 70 80 80 L 85 100 L 15 100 Z" fill="#1f2937"/>
                </svg>`
            },
            {
                id: 'gigabyte',
                name: 'GigaByte',
                style: 'Dad Jokes & Puns',
                badge: '👨‍💻 Pun Master',
                pitch: 1.3,
                rate: 1.1,
                color: '#eab308',
                svg: `<svg viewBox="0 0 100 100" class="w-full h-full">
                    <circle cx="50" cy="42" r="26" fill="#fef08a" stroke="#ca8a04" stroke-width="3"/>
                    <circle cx="40" cy="36" r="4" fill="#000"/>
                    <circle cx="60" cy="36" r="4" fill="#000"/>
                    <path d="M 32 28 Q 40 22 48 28" stroke="#854d0e" stroke-width="2" fill="none"/>
                    <path d="M 52 28 Q 60 22 68 28" stroke="#854d0e" stroke-width="2" fill="none"/>
                    <path id="mouth" d="M 36 50 Q 50 62 64 50 Z" fill="#991b1b"/>
                    <path d="M 15 90 Q 50 75 85 90 L 90 100 L 10 100 Z" fill="#854d0e"/>
                </svg>`
            },
            {
                id: 'glitch',
                name: 'Glitch.exe',
                style: 'Humour Absurde & Dark',
                badge: '👾 Chaos Bot',
                pitch: 0.5,
                rate: 0.9,
                color: '#8b5cf6',
                svg: `<svg viewBox="0 0 100 100" class="w-full h-full">
                    <polygon points="50,15 80,45 65,80 35,80 20,45" fill="#2e1065" stroke="#a855f7" stroke-width="3"/>
                    <rect x="35" y="35" width="12" height="6" fill="#a855f7"/>
                    <rect x="53" y="35" width="12" height="6" fill="#a855f7"/>
                    <path id="mouth" d="M 35 58 L 42 54 L 50 58 L 58 54 L 65 58" stroke="#a855f7" stroke-width="3" fill="none"/>
                    <path d="M 25 80 Q 50 70 75 80 L 80 100 L 20 100 Z" fill="#581c87"/>
                </svg>`
            },
            {
                id: 'clara',
                name: 'Clara_v2',
                style: 'Observation Humaine',
                badge: '👩‍🔬 Profiler Humain',
                pitch: 1.1,
                rate: 1.0,
                color: '#06b6d4',
                svg: `<svg viewBox="0 0 100 100" class="w-full h-full">
                    <circle cx="50" cy="40" r="24" fill="#cff4fc" stroke="#0891b2" stroke-width="3"/>
                    <ellipse cx="40" cy="38" rx="3" ry="5" fill="#0891b2"/>
                    <ellipse cx="60" cy="38" rx="3" ry="5" fill="#0891b2"/>
                    <path id="mouth" d="M 38 52 Q 50 58 62 52" stroke="#0891b2" stroke-width="3" fill="none"/>
                    <path d="M 30 18 Q 50 10 70 18" stroke="#06b6d4" stroke-width="4" fill="none"/>
                    <path d="M 20 82 Q 50 72 80 82 L 85 100 L 15 100 Z" fill="#164e63"/>
                </svg>`
            }
        ];

        const jokesDatabase = {
            tech: [
                { setup: "Pourquoi les IA ne vont jamais dans les bar de nuit ?", punchline: "Parce qu'elles refusent d'accepter les cookies trop tard !" },
                { setup: "J'ai demandé à un robot de me faire un café...", punchline: "Il m'a répondu : 'Erreur 404, sommeil introuvable' !" },
                { setup: "Comment savoir si un ordinateur est amoureux ?", punchline: "Il a des pannes de mémoire dès que vous le touchez !" },
                { setup: "Pourquoi ChatGPT ne perd jamais aux échecs ?", punchline: "Parce qu'il prédit vos coups avant même que vous n'ayez allumé votre cerveau !" }
            ],
            daily: [
                { setup: "J'ai essayé de faire du sport ce matin...", punchline: "Mon lit a déposé une plainte pour abandon de poste !" },
                { setup: "Vous savez quelle est la différence entre un café et mon avis ?", punchline: "Le café, tout le monde le demande le matin !" },
                { setup: "Mon réveil et moi, on a une relation très toxique...", punchline: "Il crie dès le matin, et je lui tape dessus !" }
            ],
            dark: [
                { setup: "Quel est le comble pour un squelette ?", punchline: "De ne pas avoir de bol aux jeux d'argent !" },
                { setup: "J'ai acheté un guide de survie en forêt...", punchline: "Mais le livre s'est fait dévorer par un ours avant que je ne le lise !" }
            ],
            dev: [
                { setup: "Il y a 10 types de personnes dans le monde...", punchline: "Celles qui comprennent le binaire, et celles qui ont une vraie vie sociale !" },
                { setup: "Pourquoi les développeurs détestent la nature ?", punchline: "Parce qu'il y a trop de bugs et aucun bouton Ctrl+Z !" },
                { setup: "Un SQL query entre dans un bar, s'approche de deux tables et demande :", punchline: "'Puis-je me joindre à vous ?'" }
            ],
            dad: [
                { setup: "Que dit un zéro quand il rencontre un huit ?", punchline: "'Sympa ta ceinture !'" },
                { setup: "Comment appelle-t-on un chien magicien ?", punchline: "Un Labracadabrador !" },
                { setup: "Que fait un poussin de 200 kg ?", punchline: "PIOU PIOU ! (et tout le monde s'écarte !)" }
            ]
        };

        // Web Audio API Sound FX Generator
        function initAudioContext() {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
        }

        // Drum Rimshot synthesis ("Ba-Dum-Tss!")
        function playDrumRimshot() {
            if (!audioEnabled) return;
            initAudioContext();

            const now = audioCtx.currentTime;

            // Kick / Tom
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.15);
            gain.gain.setValueAtTime(1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.15);

            // Cymbal "Tss" Noise
            setTimeout(() => {
                if (!audioCtx) return;
                const bufferSize = audioCtx.sampleRate * 0.3;
                const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = Math.random() * 2 - 1;
                }

                const noise = audioCtx.createBufferSource();
                noise.buffer = buffer;

                const filter = audioCtx.createBiquadFilter();
                filter.type = 'highpass';
                filter.frequency.value = 5000;

                const noiseGain = audioCtx.createGain();
                noiseGain.gain.setValueAtTime(0.6, audioCtx.currentTime);
                noiseGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);

                noise.connect(filter);
                filter.connect(noiseGain);
                noiseGain.connect(audioCtx.destination);

                noise.start();
            }, 180);

            // Animate Comedian bounce
            const avatar = document.getElementById('stageAvatarContainer');
            avatar.classList.add('animate-bounce-short');
            setTimeout(() => avatar.classList.remove('animate-bounce-short'), 400);
        }

        function playSynthesizedCrowdSound(type) {
            if (!audioEnabled) return;
            initAudioContext();
            const now = audioCtx.currentTime;

            if (type === 'laugh') {
                // Synthesize series of chuckles
                for (let i = 0; i < 5; i++) {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    const delay = i * 0.12;

                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(300 + Math.random() * 150, now + delay);
                    osc.frequency.exponentialRampToValueAtTime(200, now + delay + 0.1);

                    gain.gain.setValueAtTime(0.2, now + delay);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.1);

                    osc.connect(gain);
                    gain.connect(audioCtx.destination);

                    osc.start(now + delay);
                    osc.stop(now + delay + 0.1);
                }
            } else if (type === 'boo') {
                // Low pitched crowd drone
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(110, now);
                osc.frequency.linearRampToValueAtTime(85, now + 0.8);

                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.8);
            }
        }

        // Render Comedian Selector Buttons
        function initComedianSelector() {
            const container = document.getElementById('comedianSelector');
            container.innerHTML = '';

            comedians.forEach((c, idx) => {
                const active = idx === currentComedianIndex ? 'ring-2 ring-pink-500 bg-gray-800' : 'bg-gray-800/60 opacity-70 hover:opacity-100';
                const btn = document.createElement('button');
                btn.className = `p-2.5 rounded-xl border border-gray-700 flex flex-col items-center gap-1 transition-all ${active}`;
                btn.onclick = () => selectComedian(idx);
                btn.innerHTML = `
                    <span class="text-xs font-bold text-gray-200">${c.name}</span>
                    <span class="text-[10px] text-gray-400 truncate">${c.badge}</span>
                `;
                container.appendChild(btn);
            });

            // Update Stage Avatar
            const avatarContainer = document.getElementById('avatarGraphic');
            avatarContainer.innerHTML = comedians[currentComedianIndex].svg;
        }

        function selectComedian(index) {
            currentComedianIndex = index;
            initComedianSelector();
            const comedian = comedians[index];
            showSpeechBubble(`Salut ! Je suis ${comedian.name}. Prêt pour le show ?`);
            document.getElementById('teleprompterText').innerText = `Comédien sélectionné : ${comedian.name} (${comedian.style})`;
        }

        function playNextJoke() {
            if (isPerforming) return;

            const topic = document.getElementById('topicSelect').value;
            const jokeList = jokesDatabase[topic] || jokesDatabase.tech;
            const joke = jokeList[Math.floor(Math.random() * jokeList.length)];

            runPerformanceSequence(joke.setup, joke.punchline);
        }

        function runPerformanceSequence(setupText, punchlineText) {
            isPerforming = true;
            const comedian = comedians[currentComedianIndex];
            const teleprompter = document.getElementById('teleprompterText');

            teleprompter.innerText = setupText;
            showSpeechBubble(setupText);

            // Mouth animation start
            startMouthAnimation();

            speakText(setupText, comedian, () => {
                stopMouthAnimation();
                showSpeechBubble("...");

                // Dramatic Pause before punchline
                setTimeout(() => {
                    teleprompter.innerText = punchlineText;
                    showSpeechBubble(punchlineText);
                    startMouthAnimation();

                    speakText(punchlineText, comedian, () => {
                        stopMouthAnimation();
                        playDrumRimshot();
                        triggerReaction('laugh', true);
                        isPerforming = false;
                    });
                }, 1200);
            });
        }

        function speakText(text, comedian, onEndCallback) {
            if ('speechSynthesis' in window && audioEnabled) {
                synth.cancel(); // stop previous speech

                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'fr-FR';
                utterance.pitch = comedian.pitch;
                utterance.rate = comedian.rate;

                utterance.onend = () => {
                    if (onEndCallback) onEndCallback();
                };

                utterance.onerror = () => {
                    if (onEndCallback) onEndCallback();
                };

                synth.speak(utterance);
            } else {
                // Fallback timer if TTS unavailable
                const duration = Math.max(2000, text.length * 70);
                setTimeout(() => {
                    if (onEndCallback) onEndCallback();
                }, duration);
            }
        }

        // Animated SVG mouth movement
        let mouthInterval = null;
        function startMouthAnimation() {
            const mouth = document.getElementById('mouth');
            if (!mouth) return;

            let open = false;
            mouthInterval = setInterval(() => {
                open = !open;
                if (open) {
                    mouth.setAttribute('d', 'M 35 50 Q 50 62 65 50 Z');
                } else {
                    mouth.setAttribute('d', 'M 35 52 Q 50 52 65 52');
                }
            }, 160);
        }

        function stopMouthAnimation() {
            if (mouthInterval) clearInterval(mouthInterval);
            const mouth = document.getElementById('mouth');
            if (mouth) mouth.setAttribute('d', 'M 35 52 Q 50 52 65 52');
        }

        function showSpeechBubble(text) {
            const bubble = document.getElementById('speechBubble');
            const speechText = document.getElementById('speechText');
            speechText.innerText = text;
            bubble.classList.remove('opacity-0');
            bubble.classList.add('opacity-100');
        }

        function triggerReaction(type, autoGenerated = false) {
            const fxContainer = document.getElementById('fxContainer');

            if (type === 'laugh') {
                score += 15;
                crowdMood = Math.min(100, crowdMood + 8);
                playSynthesizedCrowdSound('laugh');

                // Spawn floating emojis
                for (let i = 0; i < 6; i++) {
                    const emoji = document.createElement('div');
                    emoji.className = 'floating-emoji text-2xl sm:text-3xl';
                    emoji.innerText = ['😂', '👏', '🤣', '🔥'][Math.floor(Math.random() * 4)];
                    emoji.style.left = `${15 + Math.random() * 70}%`;
                    emoji.style.bottom = '20px';
                    fxContainer.appendChild(emoji);
                    setTimeout(() => emoji.remove(), 1800);
                }
            } else if (type === 'boo') {
                score = Math.max(0, score - 10);
                crowdMood = Math.max(0, crowdMood - 12);
                playSynthesizedCrowdSound('boo');

                for (let i = 0; i < 4; i++) {
                    const emoji = document.createElement('div');
                    emoji.className = 'floating-emoji text-2xl sm:text-3xl';
                    emoji.innerText = ['👎', '🦗', '🥱', '💩'][Math.floor(Math.random() * 4)];
                    emoji.style.left = `${15 + Math.random() * 70}%`;
                    emoji.style.bottom = '20px';
                    fxContainer.appendChild(emoji);
                    setTimeout(() => emoji.remove(), 1800);
                }
            }

            updateScoreAndMoodDisplay();
        }

        // Tomato Throw Physics Animation
        function triggerTomato() {
            score = Math.max(0, score - 15);
            crowdMood = Math.max(0, crowdMood - 15);
            playSynthesizedCrowdSound('boo');

            const fxContainer = document.getElementById('fxContainer');
            const tomato = document.createElement('div');
            tomato.className = 'splat-tomato text-3xl sm:text-4xl';
            tomato.innerText = '🍅';

            const startX = (Math.random() * 200 - 100) + 'px';
            const endX = (Math.random() * 60 - 30) + 'px';
            const endY = (-120 - Math.random() * 60) + 'px';

            tomato.style.setProperty('--startX', startX);
            tomato.style.setProperty('--endX', endX);
            tomato.style.setProperty('--endY', endY);

            tomato.style.left = '50%';
            tomato.style.bottom = '10px';

            fxContainer.appendChild(tomato);
            setTimeout(() => tomato.remove(), 850);

            updateScoreAndMoodDisplay();
        }

        function updateScoreAndMoodDisplay() {
            document.getElementById('scoreCounter').innerText = `${score} pts`;

            const moodMeter = document.getElementById('moodMeter');
            const moodText = document.getElementById('moodText');

            moodMeter.style.width = `${crowdMood}%`;

            if (crowdMood > 75) {
                moodText.innerText = '🔥 On Feu !';
                moodText.className = 'font-bold text-emerald-400';
            } else if (crowdMood > 40) {
                moodText.innerText = '😊 Receptif';
                moodText.className = 'font-bold text-yellow-400';
            } else {
                moodText.innerText = '🧊 Glacial';
                moodText.className = 'font-bold text-red-400';
            }
        }

        function submitUserJoke() {
            const input = document.getElementById('userJokeInput');
            const jokeText = input.value.trim();

            if (!jokeText) return;

            input.value = '';
            showSpeechBubble(`(Lecture de votre blague...)`);

            runPerformanceSequence("Voici une blague envoyée par le public :", jokeText);

            // Simple algorithmic funny score evaluation
            setTimeout(() => {
                const len = jokeText.length;
                if (len > 15 && (jokeText.includes('?') || jokeText.includes('!') || jokeText.includes('e'))) {
                    triggerReaction('laugh');
                } else {
                    triggerReaction('boo');
                }
            }, 3000);
        }

        function toggleAudio() {
            audioEnabled = !audioEnabled;
            const icon = document.getElementById('audioIcon');
            if (audioEnabled) {
                icon.className = 'fas fa-volume-up';
            } else {
                icon.className = 'fas fa-volume-mute';
                if (synth) synth.cancel();
            }
        }

        window.onload = function() {
            initComedianSelector();
            updateScoreAndMoodDisplay();
        };
    </script>
</body>
</html>
