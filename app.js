THE-SHOW-MAN of cat ship a ton
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
