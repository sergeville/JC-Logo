# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1.1] - 2024-02-27

### Fixed
- Updated API endpoint port from 3000 to 8000
- Enhanced SMTP error logging and debugging
- Improved email authentication handling
- Added better error messages for email sending failures

### Security
- Moved server.py to private folder
- Added secure file permissions
- Improved environment variable handling
- Enhanced email configuration security

## [1.0.1] - 2024-02-27

### Security
- Moved server.py to private folder for enhanced security
- Set secure file permissions for sensitive files

## [1.0.0] - 2024-02-27

### Added
- Initial project setup with bilingual voting system
- Frontend UI with 5 logo options
- Email confirmation system using Outlook SMTP
- Data storage in JSON format
- Language toggle (French/English)
- User information collection modal
- Vote validation system
- Environment variable configuration

### Changed
- Moved data.json to private folder for better security
- Updated server.py to use environment variables from .env.local
- Implemented Python virtual environment for dependency management

### Security
- Added .env.local for sensitive configuration
- Moved data storage to private directory
- Implemented email confirmation for vote validation
- Added input validation for user submissions

### Dependencies
- Added python-dotenv for environment variable management
- Set up virtual environment for Python dependencies

## [0.1.0] - 2024-02-25

### Added
- Basic project structure
- Logo files and initial HTML template
- Simple HTTP server implementation
- Basic vote submission functionality 