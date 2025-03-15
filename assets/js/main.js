// Global variables
let currentLanguage = 'fr';

// Language toggle functionality
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'fr' : 'en';
    document.getElementById('langToggle').textContent = currentLanguage === 'en' ? 'FR' : 'EN';
    updateUILanguage();
}

// Update all UI elements with current language
function updateUILanguage() {
    document.getElementById('pageTitle').textContent = translations[currentLanguage].pageTitle;
    document.getElementById('submitButton').textContent = translations[currentLanguage].submitButton;
    
    const validationMessage = document.getElementById('validationMessage');
    if (validationMessage.style.display === 'block') {
        validationMessage.textContent = translations[currentLanguage].validationMessage;
    }
    
    // Update all "Select this" texts
    for (let letter of ['A', 'B', 'C', 'D', 'E', 'F']) {
        document.getElementById('selectText' + letter).textContent = translations[currentLanguage].selectText;
    }
    
    document.documentElement.lang = currentLanguage;
    
    // Update modal texts
    document.getElementById('modalTitle').textContent = translations[currentLanguage].modalTitle;
    document.getElementById('nameLabel').textContent = translations[currentLanguage].nameLabel;
    document.getElementById('emailLabel').textContent = translations[currentLanguage].emailLabel;
    document.getElementById('cancelButton').textContent = translations[currentLanguage].cancelButton;
    document.getElementById('confirmButton').textContent = translations[currentLanguage].confirmButton;
    
    const emailError = document.getElementById('emailError');
    if (emailError.style.display === 'block') {
        emailError.textContent = translations[currentLanguage].invalidEmail;
    }
}

// Form submission handler
function handleSubmit(event) {
    event.preventDefault();
    
    if (localStorage.getItem('jlcLogoVoted') === 'true') {
        alert(translations[currentLanguage].alreadyVoted);
        return;
    }
    
    const formData = new FormData(event.target);
    const selectedValue = formData.get('logo-selection');
    const validationMessage = document.getElementById('validationMessage');
    
    if (selectedValue) {
        validationMessage.style.display = 'none';
        document.getElementById('userInfoModal').style.display = 'flex';
        window.selectedLogo = selectedValue;
    } else {
        validationMessage.textContent = translations[currentLanguage].validationMessage;
        validationMessage.style.display = 'block';
    }
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Card selection highlighting
    const radioButtons = document.querySelectorAll('input[type="radio"][name="logo-selection"]');
    
    function updateCardHighlighting() {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('selected');
        });
        
        radioButtons.forEach(radio => {
            if (radio.checked) {
                const cardId = 'card-' + radio.value;
                document.getElementById(cardId).classList.add('selected');
            }
        });
    }
    
    radioButtons.forEach(radio => {
        radio.addEventListener('change', updateCardHighlighting);
    });
    
    // Email validation on input
    document.getElementById('email').addEventListener('input', function(event) {
        const emailInput = event.target;
        const emailError = document.getElementById('emailError');
        
        if (emailInput.value.length > 0) {
            if (!isValidEmail(emailInput.value)) {
                emailInput.classList.add('error');
                emailError.textContent = translations[currentLanguage].invalidEmail;
                emailError.style.display = 'block';
            } else {
                emailInput.classList.remove('error');
                emailError.style.display = 'none';
            }
        } else {
            emailInput.classList.remove('error');
            emailError.style.display = 'none';
        }
    });
    
    // User info form submission
    document.getElementById('userInfoForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        
        if (localStorage.getItem('jlcLogoVoted') === 'true') {
            document.getElementById('userInfoModal').style.display = 'none';
            alert(translations[currentLanguage].alreadyVoted);
            return;
        }
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const selectedLogo = window.selectedLogo;
        
        if (!isValidEmail(email)) {
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            emailInput.classList.add('error');
            emailError.textContent = translations[currentLanguage].invalidEmail;
            emailError.style.display = 'block';
            return;
        }
        
        try {
            document.getElementById('confirmButton').disabled = true;
            
            // Validate shareholder before sending email
            /* Temporarily disabled shareholder validation
            try {
                await shareholderValidator.validateShareholder(email);
            } catch (validationError) {
                alert(translations[currentLanguage].unauthorizedVote);
                return;
            }
            */
            
            await sendVoteEmail(name, email, selectedLogo);
            
            localStorage.setItem('jlcLogoVoted', 'true');
            localStorage.setItem('jlcLogoVotedDate', new Date().toString());
            localStorage.setItem('jlcLogoVotedFor', selectedLogo);
            
            document.getElementById('userInfoModal').style.display = 'none';
            alert(translations[currentLanguage].finalThankYou.replace('{name}', name));
            
            document.getElementById('voteForm').reset();
            document.getElementById('userInfoForm').reset();
            document.querySelectorAll('.card').forEach(card => {
                card.classList.remove('selected');
            });
            
        } catch (error) {
            console.error("Error in form submission:", error);
            let errorDetails = "";
            if (error.name) errorDetails += `\nType: ${error.name}`;
            if (error.message) errorDetails += `\nMessage: ${error.message}`;
            if (error.text) errorDetails += `\nTexte: ${error.text}`;
            if (error.status) errorDetails += `\nStatut: ${error.status}`;
            
            if (!navigator.onLine) {
                errorDetails += "\nYou appear to be offline. Check your internet connection.";
            }
            
            alert(translations[currentLanguage].emailError + errorDetails);
        } finally {
            document.getElementById('confirmButton').disabled = false;
        }
    });
    
    // Modal cancel button
    document.getElementById('cancelButton').addEventListener('click', function() {
        document.getElementById('userInfoModal').style.display = 'none';
        document.getElementById('userInfoForm').reset();
    });
    
    // Close modal when clicking outside
    document.getElementById('userInfoModal').addEventListener('click', function(event) {
        if (event.target === this) {
            this.style.display = 'none';
            document.getElementById('userInfoForm').reset();
        }
    });
}); 