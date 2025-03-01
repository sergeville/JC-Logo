# Documentation du Processus de Vérification des Votes

## Vue d'ensemble
Ce document explique le processus de vérification des votes pour les Jardins Lac Campion. Le système vérifie les votes soumis en fonction des actionnaires et des propriétaires de logos.

## Structure des Données

### Actionnaires (actionnaires.json)
```json
{
  "actionnaires": [
    {
      "id": 1,
      "nom": "Exemple Nom",
      "email": "exemple@email.com",
      "parts": 2,
      "date_adhesion": "2022-01-01",
      "actif": true,
      "action": "A-1",
      "telephone": "123-456-7890"
    }
  ]
}
```

### Propriétaires de Logos (logo-owners.json)
```json
{
  "logo_owners": [
    {
      "email": "exemple@email.com",
      "logo": "A",
      "date_added": "2024-03-01"
    }
  ]
}
```

## Processus de Vérification

### 1. Initialisation
```javascript
// Écouteur d'événement pour le bouton de vérification
document.getElementById('verifyBtn').addEventListener('click', function() {
    // Détermine le format actif (Simple ou Logo)
    const activeTab = document.querySelector('.tab.active').getAttribute('data-tab');
    const withLogo = activeTab === 'format2';
```

### 2. Récupération des Données
- Charge les données depuis les deux sources :
  - Liste des actionnaires
  - Liste des propriétaires de logos
- Récupère les entrées du formulaire selon le format choisi

### 3. Validation des Entrées
Pour chaque ligne soumise, le système vérifie :

#### Format Simple
- Format : email (un par ligne)
- Vérifie si l'email appartient à un actionnaire actif

#### Format avec Logo
- Format : email,logo (exemple: exemple@email.com,A)
- Vérifie :
  1. Format correct (email,logo)
  2. Email appartient à un actionnaire actif
  3. Logos soumis sont valides (A-F)
  4. L'email est propriétaire des logos soumis

### 4. Traitement des Votes
```javascript
lines.forEach(line => {
    // Parse l'entrée
    if (withLogo) {
        const parts = line.split(',');
        email = parts[0].trim();
        submittedLogos = parts[1].trim().toUpperCase().split(/[\s,]+/);
    }

    // Vérifie les duplicatas
    const isDuplicate = verifiedEmails.has(email);

    // Vérifie l'actionnaire
    const matchingActionnaire = actionnaires.find(a => 
        a.email.toLowerCase() === email.toLowerCase()
    );

    // Vérifie les logos possédés
    const ownedLogos = logoOwners
        .filter(owner => owner.email.toLowerCase() === email.toLowerCase())
        .map(owner => owner.logo);
```

### 5. Résultats de la Vérification
Le système affiche :

#### Tableau des Résultats
- Email et informations de l'actionnaire
- Statut du vote
- Logos soumis (si applicable)
- Détails/Messages d'erreur

#### Récapitulatif
```javascript
summaryDiv.innerHTML = `
    <p><strong>Récapitulatif:</strong></p>
    <p>Total d'entrées vérifiées: <strong>${lines.length}</strong></p>
    <p>Emails valides: <strong>${validCount}</strong></p>
    <p>Emails invalides: <strong>${invalidCount}</strong></p>
    <p>Emails en double: <strong>${duplicateCount}</strong></p>
`;
```

#### Statistiques des Logos
- Nombre de votes par logo
- Pourcentage pour chaque logo
- Affichage visuel des résultats

## Statuts Possibles

| Statut | Description |
|--------|-------------|
| Valide | Email actif et logos autorisés |
| Non autorisé | Email valide mais logos non possédés |
| Inactif | Actionnaire inactif |
| Non trouvé | Email non présent dans la liste |
| Format invalide | Format d'entrée incorrect |
| Duplicate | Vote en double |

## Messages d'Erreur

- Format invalide : "Format attendu: email,logo"
- Logos non autorisés : "Logos non autorisés: [liste des logos]"
- Email non trouvé : "Email non présent dans la liste des actionnaires"
- Actionnaire inactif : "Actionnaire inactif depuis [date]"

## Exemple d'Utilisation

### Format Simple
```
exemple@email.com
autre@email.com
```

### Format avec Logo
```
exemple@email.com,A
autre@email.com,B,C
```

## Notes Importantes

1. Les votes sont sensibles à la casse pour les logos (convertis en majuscules)
2. Les emails ne sont pas sensibles à la casse
3. Les logos multiples peuvent être séparés par des virgules ou des espaces
4. Un email ne peut voter qu'une seule fois
5. Un actionnaire peut posséder plusieurs logos
6. Seuls les logos A à F sont valides 

## Validation des Actionnaires

### 1. Vérification Initiale
Avant qu'un vote soit accepté, le système vérifie :
- L'existence de l'email dans `actionnaires.json`
- Le statut actif de l'actionnaire
- La correspondance entre l'email et le nom

### 2. Processus de Validation
```javascript
async function validateActionnaire(email) {
    // Chargement des données actionnaires
    const response = await fetch('data/actionnaires.json');
    const data = await response.json();
    
    // Vérification de l'actionnaire
    const actionnaire = data.actionnaires.find(a => 
        a.email.toLowerCase() === email.toLowerCase() && 
        a.actif === true
    );
    
    if (!actionnaire) {
        throw new Error('Email non trouvé ou compte inactif');
    }
    
    return actionnaire;
}
```

### 3. Messages de Statut
| Type | Message |
|------|---------|
| Succès | "Vote enregistré pour [Nom de l'actionnaire]" |
| Erreur | "Email non trouvé ou compte inactif" |
| Système | "Erreur de validation de l'actionnaire" |

## Processus de Vote

### 1. Soumission du Vote
1. L'utilisateur sélectionne un logo (A-F)
2. Remplit le formulaire avec :
   - Nom
   - Email

### 2. Validation
1. Vérification de l'email dans la base des actionnaires
2. Vérification du statut actif
3. Confirmation du vote par email

### 3. Enregistrement
- Stockage local du vote
- Envoi d'une confirmation par email
- Mise à jour du statut dans l'interface

## Format des Données

### Actionnaires (actionnaires.json)
```json
{
  "actionnaires": [
    {
      "id": 1,
      "nom": "Nom Actionnaire",
      "email": "email@example.com",
      "actif": true,
      "parts": 10,
      "date_adhesion": "2024-01-01"
    }
  ]
}
```

### Votes (Stockage Local)
```javascript
localStorage.setItem('jlcLogoVoted', 'true');
localStorage.setItem('jlcLogoVotedDate', date);
localStorage.setItem('jlcLogoVotedFor', logo);
```

## Sécurité et Validation
1. **Validation Email**
   - Format valide
   - Existence dans la base
   - Statut actif vérifié

2. **Protection Contre les Doubles Votes**
   - Vérification du localStorage
   - Une seule soumission par appareil

3. **Confirmation**
   - Email de confirmation envoyé
   - Enregistrement du vote
   - Message de succès affiché 