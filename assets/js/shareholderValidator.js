// Shareholder validation functionality
class ShareholderValidator {
    constructor() {
        this.shareholders = null;
        this.lastFetchTime = null;
        this.CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache
    }

    async loadShareholders() {
        try {
            // Check if we have cached data that's still valid
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
            
            return this.shareholders;
        } catch (error) {
            console.error('Error loading shareholders:', error);
            throw new Error(translations[currentLanguage].shareholderLoadError);
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
            
            return shareholder;
        } catch (error) {
            console.error('Shareholder validation error:', error);
            throw error;
        }
    }
}

// Create a single instance for the application
const shareholderValidator = new ShareholderValidator(); 