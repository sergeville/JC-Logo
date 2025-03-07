// Initialize EmailJS when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log("Initializing EmailJS...");
        emailjs.init("RANkKyaSwWOz7AwVc");
        console.log("EmailJS initialized successfully");
        
        if (typeof emailjs.send === 'function') {
            console.log("emailjs.send function is available");
        } else {
            console.error("ERROR: emailjs.send function is not available");
        }
    } catch (error) {
        console.error("Error initializing EmailJS:", error);
    }
});

// Function to send vote email
async function sendVoteEmail(name, email, selectedLogo) {
    try {
        console.log("Starting email sending procedure");
        
        const templateParams = {
            to_email: 'jardinscampion@outlook.com',
            from_name: name,
            from_email: email,
            selected_logo: selectedLogo,
            reply_to: email,
            subject: `Vote de logo: Option ${selectedLogo} par ${name}`,
            voter_email: email,
            selected_logo_lowercase: selectedLogo.toLowerCase(),
            current_date: new Date().toLocaleDateString(),
            confirm_subject_en: "RE: Logo vote - JLC - Confirmation",
            confirm_subject_fr: "RE: Vote du logo - JLC - Confirmation",
            confirm_body_en: `I confirm my vote for Logo ${selectedLogo}`,
            confirm_body_fr: `Je confirme mon vote pour le Logo ${selectedLogo}`
        };
        
        console.log("Email template parameters:", templateParams);
        
        if (typeof emailjs === 'undefined') {
            throw new Error("EmailJS library is not loaded properly. Check internet connection and scripts.");
        }
        
        const response = await emailjs.send(
            'service_6klyoje',
            'template_tohss4v',
            templateParams
        );
        
        console.log("Email sent successfully!", response);
        return response;
        
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
} 