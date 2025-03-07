# JC Logo Vote Application

A web application for voting on the Jardins du Lac Campion logo. This application allows users to select their preferred logo design and submit their vote along with their contact information.

## Project Structure

```
jc-logo/
├── index.html              # Main HTML file
├── .htaccess              # Apache server configuration for security
├── assets/
│   ├── css/
│   │   └── styles.css     # All application styles
│   └── js/
│       ├── translations.js # Language translations (EN/FR)
│       ├── emailHandler.js # Email functionality
│       └── main.js        # Core application logic
```

## Features

- Logo selection with visual feedback
- Bilingual support (English/French)
- Form validation
- Email confirmation
- Mobile responsive design
- Security measures against multiple votes

## Technical Details

### CSS Organization (`assets/css/styles.css`)
- Layout styles (grid, flexbox)
- Component styles (cards, buttons, modal)
- Responsive design rules
- Animation and transition effects

### JavaScript Modules

#### 1. Translations (`assets/js/translations.js`)
- Contains all text strings in English and French
- Used by the language toggle functionality

#### 2. Email Handler (`assets/js/emailHandler.js`)
- EmailJS initialization and configuration
- Email sending functionality
- Email validation utilities

#### 3. Main Application (`assets/js/main.js`)
- Core application logic
- Event handlers
- UI state management
- Form submission handling

## Security

The `.htaccess` file implements several security measures:
- Restricts direct access to files
- Allows access only to necessary resources
- Prevents directory listing
- Adds security headers

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