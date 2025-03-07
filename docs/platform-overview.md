# JLC Logo Voting Platform Overview

## Table of Contents
1. [Introduction](#introduction)
2. [Main Components](#main-components)
3. [Voting Process](#voting-process)
4. [Technical Architecture](#technical-architecture)
5. [Security Features](#security-features)
6. [Data Management](#data-management)
7. [Additional Features](#additional-features)

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
   - Server-side security (.htaccess)
   - Protected data directories
   - Secure email handling

3. **Access Control**
   - Administrative interfaces protected
   - Vote verification system
   - Audit logging

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

## Related Documentation
- [Vote Verification Process](vote-verification-process.md)
- [Email System Guide](emailjs-guide.md)
- [Logo Owners Management](logo-owners-management.md)
- [Admin Votes Guide](admin-votes-guide.md) 