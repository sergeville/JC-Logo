// Shareholder validation functionality
class ShareholderValidator {
    constructor() {
        // Données de test intégrées directement dans le code
        this.testData = {
            "actionnaires": [
                {
                    "id": 1,
                    "nom": "Test Actif 1",
                    "email": "test1@example.com",
                    "parts": 2,
                    "date_adhesion": "2024-03-10",
                    "actif": true,
                    "action": "A-1",
                    "telephone": "555-0001"
                },
                {
                    "id": 2,
                    "nom": "Test Actif 2",
                    "email": "test2@example.com",
                    "parts": 4,
                    "date_adhesion": "2024-03-10",
                    "actif": true,
                    "action": "A-2",
                    "telephone": "555-0002"
                },
                {
                    "id": 3,
                    "nom": "Test Inactif",
                    "email": "inactif@example.com",
                    "parts": 0,
                    "date_adhesion": "2024-03-10",
                    "actif": false,
                    "action": "A-3",
                    "telephone": "555-0003"
                },
                {
                    "id": 4,
                    "nom": "Test Actif 3",
                    "email": "test3@example.com",
                    "parts": 6,
                    "date_adhesion": "2024-03-10",
                    "actif": true,
                    "action": "A-4",
                    "telephone": "555-0004"
                }
            ]
        };
        this.shareholders = null;
        this.lastFetchTime = null;
        this.CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache
        this.isTestMode = true; // Toujours en mode test
    }

    async loadShareholders() {
        try {
            // En mode test, utiliser les données intégrées
            if (this.isTestMode) {
                console.log('Using embedded test data');
                this.shareholders = this.testData.actionnaires;
                return this.shareholders;
            }

            // Si on a des données en cache valides
            if (this.shareholders && this.lastFetchTime && 
                (Date.now() - this.lastFetchTime < this.CACHE_DURATION)) {
                return this.shareholders;
            }

            const response = await fetch('data/actionnaires.json');
            if (!response.ok) {
                throw new Error(translations[currentLanguage].shareholderLoadError);
            }
            
            const data = await response.json();
            this.shareholders = data.actionnaires;
            this.lastFetchTime = Date.now();
            
            console.log('Loaded shareholders:', this.shareholders);
            return this.shareholders;
        } catch (error) {
            console.error('Error loading shareholders:', error);
            // En cas d'erreur, utiliser les données de test comme fallback
            console.log('Using test data as fallback');
            this.shareholders = this.testData.actionnaires;
            return this.shareholders;
        }
    }

    async validateShareholder(email) {
        try {
            const shareholders = await this.loadShareholders();
            const shareholder = shareholders.find(s => 
                s.email.toLowerCase() === email.toLowerCase() && s.actif === true
            );
            
            if (!shareholder) {
                throw new Error(translations[currentLanguage].invalidShareholderEmail);
            }
            
            console.log('Validated shareholder:', shareholder);
            return shareholder;
        } catch (error) {
            console.error('Shareholder validation error:', error);
            throw error;
        }
    }

    // Méthode pour basculer entre le mode test et production
    toggleTestMode() {
        this.isTestMode = !this.isTestMode;
        this.shareholders = null; // Reset cache
        this.lastFetchTime = null;
        console.log('Test mode:', this.isTestMode ? 'ON' : 'OFF');
    }
}

// Create a single instance for the application
const shareholderValidator = new ShareholderValidator(); 