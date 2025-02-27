# JLC Logo Voting System

A bilingual (French/English) web application for collecting and managing votes for JLC's new logo designs.

## Features

- 🖼 Display of 5 logo options with descriptions
- 🌐 Bilingual support (French/English)
- 📧 Email confirmation system
- 📊 Vote tracking and statistics
- 🔒 Double opt-in voting system (email confirmation required)

## Project Structure

```
jc-logo/
├── public/
│   ├── index.html      # Main web interface
│   └── logos/          # Logo images directory
│       ├── Logo1.png
│       ├── Logo2.png
│       ├── Logo3.png
│       ├── Logo4.png
│       └── Logo6.png
├── private/            # Secure directory for sensitive files
│   ├── server.py       # Python server implementation
│   └── data.json       # Data storage
└── .env.local          # Environment configuration
```

## Technical Stack

- Frontend: HTML, CSS, JavaScript (Vanilla)
- Backend: Python (HTTP Server)
- Data Storage: JSON
- Email: SMTP (Outlook)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd jc-logo
   ```

2. Configure email settings:
   - Create `.env.local` file with the following settings:
     ```
     SMTP_SERVER="smtp-mail.outlook.com"
     SMTP_PORT=587
     SENDER_EMAIL="your-email@outlook.com"
     EMAIL_PASSWORD="your-app-password"
     ```

3. Start the server:
   ```bash
   python3 private/server.py
   ```

4. Access the application:
   - Open a web browser
   - Navigate to `http://localhost:8000/public/index.html`

## Data Structure

The application uses a JSON-based data structure (`data.json`) to store:
- Logo information and descriptions
- User data
- Voting records
- Statistics

## Security Features

- Email confirmation required for vote validation
- No duplicate votes (email-based verification)
- Secure password handling through environment variables

## Browser Compatibility

Tested and working on:
- Chrome
- Firefox
- Safari
- Edge

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

[License Type] - See LICENSE file for details 