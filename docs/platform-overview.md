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

### Apache Security Configuration (.htaccess)

The platform implements comprehensive security measures through Apache configuration:

1. **Directory Protection**
   ```apache
   # Prevent directory listing
   Options -Indexes
   ```
   Prevents unauthorized browsing of directory contents.

2. **Security Headers**
   ```apache
   <IfModule mod_headers.c>
       Header set X-XSS-Protection "1; mode=block"
       Header set X-Frame-Options "SAMEORIGIN"
       Header set X-Content-Type-Options "nosniff"
       Header set Referrer-Policy "strict-origin-when-cross-origin"
       Header set Content-Security-Policy "default-src 'self' https://cdn.jsdelivr.net https://sergeville.github.io; script-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' https://sergeville.github.io data:;"
   </IfModule>
   ```
   - XSS Protection: Blocks cross-site scripting attacks
   - Frame Protection: Prevents clickjacking attempts
   - Content Type Protection: Prevents MIME type sniffing
   - Referrer Policy: Controls information in referrer header
   - Content Security Policy: Restricts resource loading to trusted sources

3. **Sensitive File Protection**
   ```apache
   <FilesMatch "^(logo-owners\.json|actionnaires\.json|\.env\.local)$">
       Order Allow,Deny
       Deny from all
   </FilesMatch>
   ```
   Blocks direct access to sensitive configuration and data files.

4. **Resource Access Control**
   ```apache
   <FilesMatch "\.(html|css|js|png|jpg|jpeg|gif|ico)$">
       Order Allow,Deny
       Allow from all
   </FilesMatch>
   ```
   Explicitly allows access to necessary web resources.

5. **HTTPS Enforcement**
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```
   Forces all traffic to use secure HTTPS connection.

6. **Error Handling**
   ```apache
   ErrorDocument 403 /error/403.html
   ErrorDocument 404 /error/404.html
   ErrorDocument 500 /error/500.html
   ```
   Custom error pages for better user experience and security.

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