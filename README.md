# JLC Logo Voting Platform Overview

## Table of Contents
1. [Introduction](#introduction)
2. [Main Components](#main-components)
3. [Voting Process](#voting-process)
4. [Technical Architecture](#technical-architecture)
5. [Security Features](#security-features)
6. [Vote Tracking System](#vote-tracking-system)
7. [Data Management](#data-management)
8. [Additional Features](#additional-features)
9. [Maintenance Guide](#maintenance-guide)
10. [Dependencies](#dependencies)
11. [Support](#support)

## Introduction
The JLC Logo Voting Platform is a web-based application designed for Jardins du Lac Campion shareholders to vote on logo designs. The platform supports bilingual interaction (French/English) and implements various security measures to ensure vote integrity.

## Main Components

### Main Interface (`index.html`)
- Grid display of 6 logos (A through F)
- Each logo card contains:
  - Logo image
  - Letter designation (A-F)
  - Selection radio button
- Language toggle (French/English)
- Mobile-responsive design
- Submit button for vote confirmation

### User Input Modal
- Collects voter information:
  - Name
  - Email
- Real-time validation
- Bilingual form labels and messages

## Voting Process

1. **Logo Selection**
   - User views all 6 logos
   - Selects one logo via radio button
   - Submits selection

2. **User Verification**
   - User provides name and email
   - System validates:
     - Email format
     - Previous votes (localStorage check)
     - Shareholder status

3. **Email Confirmation**
   - System sends confirmation email
   - Email includes:
     - Selected logo
     - Voter information
     - Confirmation request
   - Bilingual email template

4. **Vote Recording**
   - Vote recorded after email confirmation
   - Updates vote statistics
   - Prevents duplicate voting

## Technical Architecture

### Core Files
```
jc-logo/
├── index.html              # Main voting interface
├── assets/
│   ├── css/styles.css     # UI styling
│   └── js/
│       ├── main.js        # Core voting logic
│       ├── translations.js # Language support
│       ├── emailHandler.js # Email functionality
│       └── shareholderValidator.js # Validation logic
├── docs/                  # Documentation
└── data/                 # Data storage
```

### Key Technologies
- HTML5/CSS3 for responsive interface
- Vanilla JavaScript for functionality
- EmailJS for email handling
- Local storage for vote tracking

## Security Features

1. **Vote Integrity**
   - One vote per device (localStorage)
   - Email confirmation required
   - Shareholder validation

2. **Data Protection**
   - Server-side security via Apache configuration (.htaccess)
     - Directory listing prevention
     - Security headers (XSS, clickjacking protection)
     - Sensitive file access control
     - HTTPS enforcement
     - Custom error handling
   - Protected data directories
   - Secure email handling

3. **Access Control**
   - Administrative interfaces protected
   - Vote verification system
   - Audit logging

For detailed Apache security configuration, see [Platform Overview](docs/platform-overview.md#apache-security-configuration-htaccess).

## Vote Tracking System

### Real-time Vote Statistics
- Suivi détaillé des votes par logo (A à F)
  - Nombre de votes par logo
  - Pourcentage du total des votes
  - Liste des votants avec horodatage
- Mise à jour automatique des statistiques
- Interface de visualisation des données

### Vote Status System
- **Pending**: Vote en attente de confirmation par email
  - Créé lorsqu'un utilisateur soumet son vote initial
  - Reste en attente jusqu'à la confirmation par email
  - N'est pas compté dans les statistiques finales
- **Confirmed**: Vote confirmé et comptabilisé
  - L'utilisateur a cliqué sur le lien de confirmation dans l'email
  - Vote inclus dans les statistiques officielles
- **Modified**: Vote qui a été changé
  - Garde l'historique de la modification
  - Nouveau choix comptabilisé
- **Cancelled**: Vote annulé
  - Retiré des statistiques
  - Conservé dans l'historique

### Vote Management Features
- Système de confirmation par email
- Processus de modification de vote
  - Demande de modification
  - Validation par email
  - Historique des modifications
- Système d'annulation de vote
  - Demande d'annulation
  - Confirmation par email
  - Mise à jour des statistiques

### Data Security
- Sauvegarde automatique des données
- Historique des modifications
- Vérification des doublons
- Protection contre les votes non autorisés

## Data Management

### Data Storage Files
- `votes.json`: Suivi détaillé des votes
  ```json
  {
    "logo_A": {
      "count": 10,
      "percentage": 25,
      "voters": [
        {
          "email": "example@email.com",
          "timestamp": "2024-03-10T14:30:00Z",
          "status": "confirmed"
        }
      ]
    }
  }
  ```
- `actionnaires.json`: Base de données des actionnaires
- `vote-history.json`: Historique des modifications

### Administrative Tools
- Interface de suivi des votes en temps réel
- Gestion des modifications de vote
- Système de sauvegarde automatique
- Génération de rapports statistiques

## Additional Features

### Multilingual Support
```javascript
const translations = {
    en: {
        pageTitle: "Choose a Logo for Jardins du Lac Campion",
        // ... other English translations
    },
    fr: {
        pageTitle: "Choisissez un logo pour les Jardins du Lac Campion",
        // ... other French translations
    }
}
```

### Vote Management
- Vote cancellation system
- Vote verification interface
- Statistical reporting
- Error handling and logging

### User Experience
- Responsive design for all devices
- Intuitive interface
- Clear feedback messages
- Bilingual support throughout

## Maintenance Guide

### Adding New Features

1. **CSS Changes**
   - Add new styles to `assets/css/styles.css`
   - Group related styles together
   - Use existing color variables

2. **Adding New Translations**
   ```javascript
   // In translations.js
   const translations = {
     en: {
       newFeature: "English text",
       // ... existing translations
     },
     fr: {
       newFeature: "French text",
       // ... existing translations
     }
   };
   ```

3. **Email Template Changes**
   - Update `emailHandler.js` for new template parameters
   - Test with EmailJS console
   - Update email templates in EmailJS dashboard

4. **New UI Components**
   - Add HTML structure to `index.html`
   - Add corresponding styles to `styles.css`
   - Add necessary JavaScript in `main.js`
   - Update translations if needed

### Testing

Before deploying changes:
1. Test in both languages
2. Verify email functionality
3. Test on multiple devices/browsers
4. Check form validation
5. Verify security measures

### Deployment

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "feat: Description of your changes"
   ```

3. Push and create a pull request:
   ```bash
   git push -u origin feature/your-feature-name
   ```

4. Create pull request on GitHub:
   - Go to: https://github.com/sergeville/JC-Logo
   - Click "Pull requests"
   - Click "New pull request"
   - Select your feature branch
   - Add description of changes
   - Request review

## Dependencies

- EmailJS for email functionality
- Modern browser with CSS Grid support
- Apache server for .htaccess support

## Support

For issues or questions:
- Create an issue on GitHub
- Contact: jardinscampion@outlook.com 

graph TD
    A[User Visits Site] --> B[Views Logos A-F]
    B --> C[Selects One Logo]
    C --> D[Enters Name & Email]
    D --> E[System Validates Email]
    E --> F[Sends Confirmation Email]
    F --> G[User Confirms via Email]
    G --> H[Vote Counted] 