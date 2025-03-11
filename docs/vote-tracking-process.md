# Processus d'Enregistrement des Votes et Suivi

## Points d'Enregistrement 📝

### 1. Vote Initial
- **Quand** : Immédiatement après que l'utilisateur clique sur "Confirmer" sur la page de vote
- **Données enregistrées** :
  ```json
  {
    "action": "vote",
    "timestamp": "[horodatage actuel]",
    "logo": "[logo sélectionné]",
    "details": "Initial vote"
  }
  ```

### 2. Confirmation par Email
- **Quand** : Après réception de l'email "Je confirme mon vote pour le Logo"
- **Données enregistrées** :
  ```json
  {
    "action": "email_confirmation",
    "timestamp": "[horodatage de réception]",
    "details": "Vote confirmed via email"
  }
  ```

### 3. Demande de Modification
- **Quand** : À la réception d'un email de demande de modification
- **Données enregistrées** :
  ```json
  {
    "action": "modification_request",
    "timestamp": "[horodatage de la demande]",
    "details": "User requested to change vote via email"
  }
  ```

### 4. Modification du Vote
- **Quand** : Après validation de la modification par l'administrateur
- **Données enregistrées** :
  ```json
  {
    "action": "modified",
    "timestamp": "[horodatage de modification]",
    "previousLogo": "[ancien choix]",
    "newLogo": "[nouveau choix]",
    "details": "Vote changed from [ancien] to [nouveau]"
  }
  ```

### 5. Annulation
- **Quand** : À la réception et validation d'une demande d'annulation
- **Données enregistrées** :
  ```json
  {
    "action": "cancelled",
    "timestamp": "[horodatage d'annulation]",
    "details": "Vote cancelled upon user request"
  }
  ```

## Mise à Jour des Métadonnées 📊

### Statistiques Automatiques
Les métadonnées sont mises à jour automatiquement à chaque action :
- Nombre total de votes
- Votes actifs
- Votes annulés
- Votes modifiés
- Statistiques par logo

### Suivi des Votes par Logo 🎨
```json
"logoStats": {
  "A": {
    "count": 3,
    "percentage": "18.75%",
    "voters": [
      {
        "email": "user1@example.com",
        "timestamp": "2024-03-14T10:30:00Z",
        "status": "active"
      },
      {
        "email": "user2@example.com",
        "timestamp": "2024-03-14T11:30:00Z",
        "status": "active"
      },
      {
        "email": "user3@example.com",
        "timestamp": "2024-03-14T12:30:00Z",
        "status": "active"
      }
    ]
  },
  "B": {
    "count": 2,
    "percentage": "12.5%",
    "voters": [/* liste des votants */]
  },
  "C": {
    "count": 4,
    "percentage": "25%",
    "voters": [/* liste des votants */]
  },
  "D": {
    "count": 2,
    "percentage": "12.5%",
    "voters": [/* liste des votants */]
  },
  "E": {
    "count": 3,
    "percentage": "18.75%",
    "voters": [/* liste des votants */]
  },
  "F": {
    "count": 2,
    "percentage": "12.5%",
    "voters": [/* liste des votants */]
  }
}
```

#### Détails du Suivi
- **Count** : Nombre actuel de votes pour chaque logo
- **Percentage** : Pourcentage des votes totaux
- **Voters** : Liste détaillée des votants avec horodatage
- **Status** : État du vote (actif, annulé, modifié)

#### Mise à Jour
- Actualisation en temps réel à chaque nouveau vote
- Recalcul automatique des pourcentages
- Historique conservé des modifications
- Validation des doublons

### Exemple de Mise à Jour
```json
"metadata": {
  "totalVotes": "[nombre mis à jour]",
  "activeVotes": "[nombre mis à jour]",
  "cancelledVotes": "[nombre mis à jour]",
  "modifiedVotes": "[nombre mis à jour]",
  "lastUpdate": "[horodatage actuel]",
  "logoStats": {
    "A": "[nombre mis à jour]",
    // ... autres logos
  }
}
```

## Sécurité et Intégrité 🔒

### Sauvegarde Automatique
- Backup toutes les heures
- Copie complète du fichier JSON
- Horodatage des sauvegardes

### Validation des Données
- Vérification de l'intégrité à chaque modification
- Format JSON validé
- Cohérence des données vérifiée

### Audit Trail
- Chaque modification est tracée
- Horodatage précis
- Détails de l'action conservés

## Processus de Récupération 🔄

### En Cas d'Erreur
1. Détection automatique des incohérences
2. Restauration depuis la dernière sauvegarde valide
3. Notification à l'administrateur

### Maintenance
- Nettoyage des données temporaires
- Optimisation du fichier
- Vérification de l'intégrité

## Notes Importantes ⚠️

1. Toutes les heures sont en UTC
2. Les sauvegardes sont conservées pendant toute la durée du vote
3. Les modifications nécessitent une double validation
4. Un log séparé des erreurs est maintenu 