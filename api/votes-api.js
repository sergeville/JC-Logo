const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Chemin vers le fichier JSON de stockage des votes
const VOTES_FILE = path.join(__dirname, '../data/votes.json');

// Middleware pour s'assurer que le fichier de votes existe
async function ensureVotesFile(req, res, next) {
    try {
        await fs.access(VOTES_FILE);
    } catch {
        // Si le fichier n'existe pas, créer un fichier vide avec la structure de base
        const initialData = {
            votes: [],
            metadata: {
                totalVotes: 0,
                activeVotes: 0,
                modifiedVotes: 0,
                cancelledVotes: 0,
                lastUpdate: new Date().toISOString()
            },
            logoStats: {
                A: { count: 0, percentage: "0%", voters: [] },
                B: { count: 0, percentage: "0%", voters: [] },
                C: { count: 0, percentage: "0%", voters: [] },
                D: { count: 0, percentage: "0%", voters: [] },
                E: { count: 0, percentage: "0%", voters: [] },
                F: { count: 0, percentage: "0%", voters: [] }
            }
        };
        await fs.mkdir(path.dirname(VOTES_FILE), { recursive: true });
        await fs.writeFile(VOTES_FILE, JSON.stringify(initialData, null, 2));
    }
    next();
}

// Obtenir les statistiques des votes
router.get('/stats', ensureVotesFile, async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile(VOTES_FILE, 'utf8'));
        console.log('Données envoyées au dashboard:', JSON.stringify(data, null, 2));
        res.json(data);
    } catch (error) {
        console.error('Erreur lors de la lecture des statistiques:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
    }
});

// Obtenir les détails d'un vote spécifique
router.get('/vote/:id', ensureVotesFile, async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile(VOTES_FILE, 'utf8'));
        const vote = data.votes.find(v => v.id === req.params.id);
        
        if (!vote) {
            return res.status(404).json({ error: 'Vote non trouvé' });
        }
        
        res.json(vote);
    } catch (error) {
        console.error('Erreur lors de la lecture du vote:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération du vote' });
    }
});

// Filtrer les votes par statut
router.get('/filter/:status', ensureVotesFile, async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile(VOTES_FILE, 'utf8'));
        const status = req.params.status.toLowerCase();
        
        if (status === 'all') {
            return res.json(data.votes);
        }
        
        const filteredVotes = data.votes.filter(vote => vote.status.toLowerCase() === status);
        res.json(filteredVotes);
    } catch (error) {
        console.error('Erreur lors du filtrage des votes:', error);
        res.status(500).json({ error: 'Erreur lors du filtrage des votes' });
    }
});

// Mettre à jour les statistiques
async function updateStats() {
    try {
        const data = JSON.parse(await fs.readFile(VOTES_FILE, 'utf8'));
        const votes = data.votes;
        
        // Réinitialiser les statistiques
        Object.keys(data.logoStats).forEach(logo => {
            data.logoStats[logo] = { count: 0, percentage: "0%", voters: [] };
        });
        
        // Calculer les nouvelles statistiques
        let totalVotes = votes.length;
        let activeVotes = 0;
        let modifiedVotes = 0;
        let cancelledVotes = 0;
        
        votes.forEach(vote => {
            if (vote.status === 'active') {
                activeVotes++;
                data.logoStats[vote.selectedLogo].count++;
                data.logoStats[vote.selectedLogo].voters.push({
                    email: vote.email,
                    timestamp: vote.timestamp
                });
            } else if (vote.status === 'modified') {
                modifiedVotes++;
                data.logoStats[vote.selectedLogo].count++;
                data.logoStats[vote.selectedLogo].voters.push({
                    email: vote.email,
                    timestamp: vote.timestamp
                });
            } else if (vote.status === 'cancelled') {
                cancelledVotes++;
            }
        });
        
        // Calculer les pourcentages
        Object.keys(data.logoStats).forEach(logo => {
            const validVotes = activeVotes + modifiedVotes;
            const percentage = validVotes > 0 
                ? ((data.logoStats[logo].count / validVotes) * 100).toFixed(1)
                : "0.0";
            data.logoStats[logo].percentage = `${percentage}%`;
        });
        
        // Mettre à jour les métadonnées
        data.metadata = {
            totalVotes,
            activeVotes,
            modifiedVotes,
            cancelledVotes,
            lastUpdate: new Date().toISOString()
        };
        
        // Sauvegarder les modifications
        await fs.writeFile(VOTES_FILE, JSON.stringify(data, null, 2));
        
    } catch (error) {
        console.error('Erreur lors de la mise à jour des statistiques:', error);
        throw error;
    }
}

// Créer un nouveau vote (Vote Initial)
router.post('/create', ensureVotesFile, async (req, res) => {
    try {
        const { email, selectedLogo } = req.body;
        console.log('Nouveau vote reçu:', { email, selectedLogo });
        
        // Validation de base
        if (!email || !selectedLogo) {
            console.log('Validation échouée: email ou logo manquant');
            return res.status(400).json({ error: 'Email et logo sont requis' });
        }
        
        // Validation du logo
        if (!['A', 'B', 'C', 'D', 'E', 'F'].includes(selectedLogo)) {
            console.log('Validation échouée: logo invalide');
            return res.status(400).json({ error: 'Logo invalide' });
        }

        const data = JSON.parse(await fs.readFile(VOTES_FILE, 'utf8'));
        
        // Vérifier si l'email existe déjà
        const existingVote = data.votes.find(v => v.email === email);
        if (existingVote) {
            console.log('Vote rejeté: email déjà utilisé');
            return res.status(400).json({ error: 'Cet email a déjà voté' });
        }

        // Créer le nouveau vote
        const newVote = {
            id: Date.now().toString(),
            email,
            selectedLogo,
            timestamp: new Date().toISOString(),
            status: 'pending',
            history: [{
                action: 'vote',
                timestamp: new Date().toISOString(),
                details: 'Vote initial en attente de confirmation'
            }]
        };

        // Ajouter le vote
        data.votes.push(newVote);
        
        // Mettre à jour les statistiques
        await fs.writeFile(VOTES_FILE, JSON.stringify(data, null, 2));
        await updateStats();
        
        console.log('Vote initial enregistré:', newVote);
        res.status(201).json(newVote);
    } catch (error) {
        console.error('Erreur lors de la création du vote:', error);
        res.status(500).json({ error: 'Erreur lors de la création du vote' });
    }
});

// Confirmer un vote par email
router.post('/confirm/:id', ensureVotesFile, async (req, res) => {
    try {
        const voteId = req.params.id;
        const data = JSON.parse(await fs.readFile(VOTES_FILE, 'utf8'));
        
        const voteIndex = data.votes.findIndex(v => v.id === voteId);
        if (voteIndex === -1) {
            return res.status(404).json({ error: 'Vote non trouvé' });
        }

        const vote = data.votes[voteIndex];
        if (vote.status !== 'pending') {
            return res.status(400).json({ error: 'Ce vote ne peut pas être confirmé' });
        }

        vote.status = 'active';
        vote.history.push({
            action: 'email_confirmation',
            timestamp: new Date().toISOString(),
            details: 'Vote confirmé par email'
        });

        await fs.writeFile(VOTES_FILE, JSON.stringify(data, null, 2));
        await updateStats();

        res.json(vote);
    } catch (error) {
        console.error('Erreur lors de la confirmation du vote:', error);
        res.status(500).json({ error: 'Erreur lors de la confirmation' });
    }
});

// Demander une modification de vote
router.post('/request-modification/:id', ensureVotesFile, async (req, res) => {
    try {
        const voteId = req.params.id;
        const { reason } = req.body;
        
        const data = JSON.parse(await fs.readFile(VOTES_FILE, 'utf8'));
        const voteIndex = data.votes.findIndex(v => v.id === voteId);
        
        if (voteIndex === -1) {
            return res.status(404).json({ error: 'Vote non trouvé' });
        }

        const vote = data.votes[voteIndex];
        if (vote.status !== 'active') {
            return res.status(400).json({ error: 'Ce vote ne peut pas être modifié' });
        }

        vote.status = 'modification_requested';
        vote.history.push({
            action: 'modification_request',
            timestamp: new Date().toISOString(),
            details: `Demande de modification: ${reason}`
        });

        await fs.writeFile(VOTES_FILE, JSON.stringify(data, null, 2));
        await updateStats();

        res.json(vote);
    } catch (error) {
        console.error('Erreur lors de la demande de modification:', error);
        res.status(500).json({ error: 'Erreur lors de la demande de modification' });
    }
});

// Modifier un vote
router.put('/modify/:id', ensureVotesFile, async (req, res) => {
    try {
        const voteId = req.params.id;
        const { newLogo } = req.body;
        
        if (!['A', 'B', 'C', 'D', 'E', 'F'].includes(newLogo)) {
            return res.status(400).json({ error: 'Logo invalide' });
        }

        const data = JSON.parse(await fs.readFile(VOTES_FILE, 'utf8'));
        const voteIndex = data.votes.findIndex(v => v.id === voteId);
        
        if (voteIndex === -1) {
            return res.status(404).json({ error: 'Vote non trouvé' });
        }

        const vote = data.votes[voteIndex];
        if (vote.status !== 'modification_requested') {
            return res.status(400).json({ error: 'Ce vote ne peut pas être modifié' });
        }

        const oldLogo = vote.selectedLogo;
        vote.selectedLogo = newLogo;
        vote.status = 'modified';
        vote.history.push({
            action: 'modified',
            timestamp: new Date().toISOString(),
            details: `Vote modifié de ${oldLogo} vers ${newLogo}`
        });

        await fs.writeFile(VOTES_FILE, JSON.stringify(data, null, 2));
        await updateStats();

        res.json(vote);
    } catch (error) {
        console.error('Erreur lors de la modification du vote:', error);
        res.status(500).json({ error: 'Erreur lors de la modification' });
    }
});

// Annuler un vote
router.post('/cancel/:id', ensureVotesFile, async (req, res) => {
    try {
        const voteId = req.params.id;
        const { reason } = req.body;
        
        const data = JSON.parse(await fs.readFile(VOTES_FILE, 'utf8'));
        const voteIndex = data.votes.findIndex(v => v.id === voteId);
        
        if (voteIndex === -1) {
            return res.status(404).json({ error: 'Vote non trouvé' });
        }

        const vote = data.votes[voteIndex];
        if (!['active', 'modified'].includes(vote.status)) {
            return res.status(400).json({ error: 'Ce vote ne peut pas être annulé' });
        }

        vote.status = 'cancelled';
        vote.history.push({
            action: 'cancelled',
            timestamp: new Date().toISOString(),
            details: `Vote annulé: ${reason}`
        });

        await fs.writeFile(VOTES_FILE, JSON.stringify(data, null, 2));
        await updateStats();

        res.json(vote);
    } catch (error) {
        console.error('Erreur lors de l\'annulation du vote:', error);
        res.status(500).json({ error: 'Erreur lors de l\'annulation' });
    }
});

// Exporter le router et la fonction de mise à jour
module.exports = {
    router,
    updateStats
}; 