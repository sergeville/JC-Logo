# JLC Logo Voting Platform Overview

## Table of Contents
1. [Introduction](#introduction)
2. [Main Components](#main-components)
3. [Voting Process](#voting-process)
4. [Technical Architecture](#technical-architecture)
5. [Security Features](#security-features)
6. [Data Management](#data-management)
7. [Additional Features](#additional-features)
8. [Maintenance Guide](#maintenance-guide)
9. [Dependencies](#dependencies)
10. [Support](#support)

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

## Data Management

### Data Storage Files
- `logo-owners.json`: Logo ownership records
- `votes.json`: Vote tracking
- `actionnaires.json`: Shareholder database

### Administrative Tools
- Vote verification interface
- Logo ownership management
- Data export/import functionality
- Statistical reporting

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