# JLC Logo Voting System

A bilingual (French/English) web application for collecting and managing votes for Jardins du Lac Campion's new logo designs.

## Features

- 🖼 Display of 6 logo options (A through F)
- 🌐 Bilingual support (French/English) with easy switching
- 📧 Email integration with EmailJS
- 📊 Vote tracking through email submissions
- 🔒 Double opt-in voting system (email confirmation required)
- 📱 Responsive design for all devices

## Project Structure

```
jc-logo/
├── images/                     # Logo images directory
│   ├── logo-a.png
│   ├── logo-b.png
│   ├── logo-c.png
│   ├── logo-d.png
│   ├── logo-e.png
│   └── logo-f.png
├── index.html                  # Main web interface
├── emailjs_template.html       # Email template for EmailJS
├── emailjs_template_example.html # Example email template
├── emailjs-guide.md            # EmailJS setup guide (French)
├── emailjs-guide-en.md         # EmailJS setup guide (English)
├── generated_emails/           # Directory for email templates
├── .env.local                  # Environment configuration
└── private/                    # Directory for private files
```

## Technical Stack

- Frontend: HTML, CSS, JavaScript (Vanilla)
- Email Service: EmailJS
- Hosting: GitHub Pages
- Version Control: Git

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/sergeville/JC-Logo.git
   cd jc-logo
   ```

2. Configure EmailJS:
   - Create an account on [EmailJS](https://www.emailjs.com/)
   - Set up an email service (Outlook recommended)
   - Create an email template based on `emailjs_template.html`
   - Update the EmailJS credentials in `index.html`:
     ```javascript
     emailjs.init("YOUR_PUBLIC_KEY");
     // Update service_id and template_id in the sendEmail function
     ```

3. Access the application:
   - Open `index.html` in a web browser, or
   - Visit the hosted version at [https://sergeville.github.io/JC-Logo/](https://sergeville.github.io/JC-Logo/)

## Email Template Structure

The application uses a bilingual email template with:
- Logo selection display
- French section (first)
- English section (second)
- Confirmation buttons for both languages
- Customizable subject and body variables

## Browser Compatibility

Tested and working on:
- Chrome
- Firefox
- Safari
- Edge

## Version Information

- v1.0.0: Stable release with all production tests successful
- v0.2.0: Email voting functionality with bilingual templates
- v0.1.1.1: Fixed email configuration and enhanced security

## License

See LICENSE file for details 