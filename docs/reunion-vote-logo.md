# Réunion - Organisation du Vote Logo JC

## Liste des Participants au Vote 👥

### Actionnaires (16) :
1. lmanning55@hotmail.com
2. andreemeloche@gmail.com
3. fran_boucher@hotmail.com
4. reneenev@hotmail.com
5. bozo_braz@hotmail.com
6. carolessaumur@gmail.com
7. Yvesgoulet42@gmail.com
8. lynelgroulx@hotmail.com
9. Helpel1963@gmail.com
10. mlum444@gmail.com
11. facettekim@gmail.com
12. Christianv1964@gmail.com
13. seguinbrigitte8@gmail.com
14. ghotte2@gmail.com
15. linebelec@outlook.com
16. Jovanne5@outlook.com

### Propriétaires des Logos :
- Logo A : bozo_braz@hotmail.com
- Logo B : Yvesgoulet42@gmail.com
- Logo C : Yvesgoulet42@gmail.com
- Logo D : seguinbrigitte8@gmail.com
- Logo E : Jovanne5@outlook.com
- Logo F : Jovanne5@outlook.com

## 1. Calendrier du Vote 📅

### À définir :
- [ ] Date de début du vote
- [ ] Date de fin du vote
- [ ] Date d'annonce des résultats
- [ ] Horaires de disponibilité pour support technique

### Considérations :
- Durée suffisante pour permettre à tous de voter
- Éviter les périodes de vacances/congés
- Prévoir du temps pour la résolution des problèmes techniques

## 2. Processus de Vote 🗳️

### Validation du processus :
- [ ] Revoir le processus de vote étape par étape
- [ ] Tester le système avant le lancement
- [ ] Définir la procédure de confirmation des votes
- [ ] Valider le processus de modification/annulation des votes

### Documentation à finaliser :
- Instructions de vote (FR/EN)
- Procédure de modification/annulation
- FAQ pour les problèmes courants

## 3. Communication 📧

### Éléments à valider :
- [ ] Template d'email bilingue
- [ ] Texte des rappels
- [ ] Canal pour questions et support
- [ ] Processus de suivi des votes

### Points à considérer :
- Fréquence des rappels
- Gestion des non-réponses
- Support multilingue

## 4. Aspects Techniques 💻

### À vérifier :
- [ ] Test de la plateforme de vote
- [ ] Système de vérification des votes
- [ ] Processus de sauvegarde des données
- [ ] Sécurité et confidentialité
- [ ] Structure de données pour le suivi des votes

### Documentation technique :
- Procédure de backup
- Plan de contingence
- Logs et audit trail
- Structure JSON de suivi (`/vote-tracking.json`)
  - Suivi individuel des votes
  - Historique des modifications
  - Statistiques en temps réel
  - Audit trail complet
  - Métriques de participation

### Structure de Suivi des Votes :
```json
{
  "votes": [
    {
      "id": "vote_001",
      "email": "user@example.com",
      "selectedLogo": "A",
      "status": "active",
      "timestamp": "2024-03-14T10:30:00Z",
      "history": [/* historique complet des actions */]
    }
  ],
  "metadata": {
    "totalVotes": 1,
    "activeVotes": 1,
    "logoStats": {/* statistiques par logo */}
  }
}
```

## 5. Gestion des Résultats 📊

### À définir :
- [ ] Format de présentation des résultats
- [ ] Méthode de communication des résultats
- [ ] Processus de validation finale
- [ ] Plan post-vote

## 6. Rôles et Responsabilités 👥

### À assigner :
- [ ] Administrateur(s) du vote
- [ ] Support technique
- [ ] Validation des résultats
- [ ] Communication

## 7. Questions en Suspens ❓

### Points à clarifier :
- Gestion des votes tardifs
- Processus de contestation
- Critères de validation des votes
- Gestion des cas particuliers

## 8. Prochaines Étapes 📋

### Actions immédiates :
1. Finaliser le calendrier
2. Valider la documentation
3. Tester le système
4. Préparer la communication

### Documentation disponible :
- Template Email (`/emailTemplates/email_template.html`)
- Gestion des Modifications (`/VoteFeatureCancelChangeVote.md`)
- Vérification des Votes (`/verification_votes.html`)
- Gestion des Actionnaires (`/gestion_actionnaires.html`)

## Notes Additionnelles 📝

- Prévoir une période de questions avant le lancement
- Établir un processus de feedback
- Documenter toutes les décisions prises
- Prévoir un plan B pour chaque aspect critique

---

**Rappel** : Tous les documents et templates sont disponibles dans le dépôt GitHub :
https://github.com/sergeville/JC-Logo.git 