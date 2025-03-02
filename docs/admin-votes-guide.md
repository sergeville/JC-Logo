# Guide d'Administration des Votes

## Vue d'ensemble
La page d'administration des votes (`admin-votes.html`) permet aux administrateurs de :
- Voir tous les votes soumis
- Annuler des votes spécifiques
- Envoyer des notifications automatiques

## Interface Utilisateur

### Tableau des Votes
Affiche pour chaque vote :
- Email de l'actionnaire
- Nom de l'actionnaire
- Date du vote
- Logo voté
- Bouton d'annulation

### Messages d'État
- Messages de succès (vert)
- Messages d'erreur (rouge)
- Disparition automatique

## Fonctionnalités

### 1. Annulation d'un Vote
Lorsqu'un administrateur annule un vote :

1. **Confirmation**
   - Boîte de dialogue de confirmation
   - Affiche le nom de l'actionnaire

2. **Suppression des Données**
   - Supprime le vote de la liste
   - Efface les données du localStorage
   - Permet à l'utilisateur de voter à nouveau

3. **Notifications par Email**
   
   a) Email à l'Administrateur (jardinscampion@outlook.com) :
   ```
   Sujet: Annulation de Vote
   Message:
   Le vote de [Nom] a été annulé par l'administrateur.
   Email: [email]
   Logo voté: [logo]
   Date d'annulation: [date]
   ```

   b) Email à l'Utilisateur :
   ```
   Sujet: Votre vote a été annulé
   Message:
   Bonjour [Nom],
   Votre vote pour le logo [logo] a été annulé par l'administrateur.
   Vous pouvez maintenant soumettre un nouveau vote sur la page de vote.
   Si vous avez des questions, veuillez contacter jardinscampion@outlook.com.
   Date d'annulation: [date]
   ```

### 2. Gestion des Erreurs
- Validation des données
- Messages d'erreur explicites
- Journalisation des erreurs dans la console

## Configuration EmailJS

### Prérequis
1. Compte EmailJS actif
2. Service ID configuré
3. Template ID pour chaque type d'email
4. Clé publique EmailJS

### Templates Requis
1. **Template Administrateur**
   - Variables : nom, email, logo, date

2. **Template Utilisateur**
   - Variables : nom, logo, date

## Sécurité
- Accès restreint aux administrateurs
- Validation des données
- Confirmation avant action
- Journalisation des actions

## Notes Importantes
1. Les deux emails sont envoyés simultanément
2. L'annulation est irréversible
3. L'utilisateur peut voter à nouveau immédiatement
4. Les données sont synchronisées en temps réel 