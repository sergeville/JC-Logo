const express = require('express');
const path = require('path');
const { router: votesRouter } = require('./api/votes-api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers statiques du dashboard
app.use(express.static(path.join(__dirname, 'docs')));

// Routes de l'API
app.use('/api/votes', votesRouter);

// Route principale pour le dashboard
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs/dashboard-votes.html'));
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ error: 'Route non trouvée' });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erreur interne du serveur' });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log(`Dashboard accessible sur http://localhost:${PORT}`);
}); 