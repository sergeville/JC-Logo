# EmailJS Guide for JC Logo Vote

## Introduction

EmailJS is a service that allows you to send emails directly from client-side JavaScript without needing a backend server. This document explains how to set up EmailJS for the Jardins Campion logo voting system.

## Step 1: Create an EmailJS Account

1. Visit [EmailJS.com](https://www.emailjs.com/) and click "Sign Up Free"
2. Register with your email and password
3. Check your email to confirm your account

## Step 2: Connect an Email Service

1. In the EmailJS dashboard, click on "Email Services" in the left menu
2. Click "Add New Service"
3. Select "Outlook" (since you're using jardinscampion@outlook.com)
4. Follow the instructions to connect to your Outlook account:
   - You'll need to enter the email address jardinscampion@outlook.com
   - You'll need to enter the password for this address
   - If two-factor authentication is enabled, you'll need to complete that
5. Give the service a name (e.g., "Jardins Campion")
6. Once created, note the "Service ID" which looks like `service_6klyoje`

## Step 3: Create an Email Template

1. In the dashboard, click on "Email Templates" in the left menu
2. Click "Create New Template"
3. Give your template a name (e.g., "Logo Vote")
4. Configure the following fields:
   - **To email**: {{to_email}} (will be replaced with jardinscampion@outlook.com)
   - **From name**: {{from_name}} (will be replaced with the voter's name)
   - **From email**: {{from_email}} (will be replaced with the voter's email)
   - **Subject**: {{subject}} (will be replaced with "Logo Vote: Option X by Name")
   - **Reply-To**: {{reply_to}} (will be replaced with the voter's email)

5. In the email body, create a template like this:

```html
<p>Hello,</p>

<p>A new vote has been submitted for the Jardins Campion logo.</p>

<p><strong>Vote details:</strong></p>
<ul>
  <li>Voter name: {{from_name}}</li>
  <li>Voter email: {{from_email}}</li>
  <li>Selected logo: {{selected_logo}}</li>
</ul>

<p>For any questions, you can reply directly to this email to contact the voter.</p>

<p>Best regards,<br>
JC Logo Voting System</p>
```

6. Click "Save" and note the "Template ID" which looks like `template_xxxxxxx`

## Step 4: Get Your Public Key

1. In the dashboard, click on "Account" then "API Keys"
2. Copy your "Public Key" which looks like `pMXXXXXXXXXXXXXXXXX`

## Step 5: Update the HTML Code with Your IDs

Open your `index.html` file and update the following sections:

1. Replace the public key in the initialization function:
```javascript
(function() {
    // Replace with your actual EmailJS public key
    emailjs.init("pMXXXXXXXXXXXXXXXXX"); // ← Replace with your public key
})();
```

2. Replace the IDs in the email sending function:
```javascript
await emailjs.send(
    'service_xxxxxx',  // ← Replace with your actual Service ID
    'template_xxxxxx', // ← Replace with your actual Template ID
    templateParams
);
```

## Step 6: Test Email Sending

1. After updating the code with your IDs, publish the changes to GitHub
2. Visit your site and test the voting system:
   - Select a logo
   - Click "Submit Vote"
   - Fill out the form with your name and email
   - Click "Confirm"
   - Verify that you receive the success message

3. Check the inbox of jardinscampion@outlook.com to confirm receipt of the email

## Step 7: Using a Custom HTML Template for Confirmation Emails

If you want to use a more elaborate HTML template like `confirmation_email_Serge_Villeneuve_C_20250227_124707.html`, follow these steps:

1. **Create a new EmailJS template:**
   - In the EmailJS dashboard, click on "Email Templates" then "Create New Template"
   - Give it a name like "Logo Vote Confirmation"
   - Configure the same fields as before (To email, From name, etc.)

2. **Customize the HTML content:**
   - In the content editor, delete all the default HTML
   - Copy and paste the content from the `emailjs_template_example.html` file (or your own HTML)
   - Make sure all variables are properly formatted with double curly braces: `{{variable_name}}`

3. **Add the necessary dynamic variables:**
   - `{{from_name}}` - Voter's name
   - `{{from_email}}` - Voter's email
   - `{{selected_logo}}` - Letter of the chosen logo (A, B, C, D, or E)
   - `{{selected_logo_lowercase}}` - Lowercase letter of the logo for the image URL
   - `{{confirm_subject_en}}` and `{{confirm_subject_fr}}` - Confirmation subjects
   - `{{confirm_body_en}}` and `{{confirm_body_fr}}` - Confirmation messages

4. **Update the JavaScript code in index.html:**
   - Make sure all necessary parameters are included in the `templateParams` object:

```javascript
const templateParams = {
    to_email: 'jardinscampion@outlook.com',
    from_name: name,
    from_email: email,
    selected_logo: selectedLogo,
    reply_to: email,
    subject: `Logo Vote: Option ${selectedLogo} by ${name}`,
    // Additional variables for the confirmation template
    selected_logo_lowercase: selectedLogo.toLowerCase(),
    confirm_subject_en: "RE: Logo vote - JLC - Confirmation",
    confirm_subject_fr: "RE: Vote du logo - JLC - Confirmation",
    confirm_body_en: `I confirm my vote for Logo ${selectedLogo}`,
    confirm_body_fr: `Je confirme mon vote pour le Logo ${selectedLogo}`
};
```

5. **Use the new template:**
   - Replace the template ID in the send function:
```javascript
await emailjs.send(
    'service_xxxxxx',           // Your Service ID
    'template_your_new_id',     // ID of the new confirmation template
    templateParams
);
```

## Limitations and Considerations

- The free EmailJS account allows you to send **200 emails per month**
- If you need to send more emails, you'll need to upgrade to a paid plan
- Emails can sometimes be marked as spam, check your spam folder if you don't receive them

## Support and Troubleshooting

If you encounter errors:

1. Verify that the IDs (Service ID, Template ID, Public Key) are correctly copied
2. Make sure the variable names in the template exactly match those in the code
3. Check the browser console (F12) to see error messages
4. Check the EmailJS dashboard to see email sending logs

For additional help, consult [the official EmailJS documentation](https://www.emailjs.com/docs/). 