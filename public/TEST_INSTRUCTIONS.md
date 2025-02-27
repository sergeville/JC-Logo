# Logo Voting Page - Testing Instructions

## Setting Up the Test Environment

1. Open your terminal and navigate to the project directory
2. Install required Python packages (if not already installed):
   ```bash
   pip3 install smtplib
   ```

3. Go to the public folder and start the Python server:
   ```bash
   cd public
   python3 server.py
   ```

4. Open your browser and go to: `http://localhost:8000`

## Testing Steps

### 1. Basic Page Functionality
- [ ] Verify all 5 logos (A through E) are visible
- [ ] Check that the language toggle (FR/EN) is present in the top-right corner
- [ ] Confirm the page title is visible

### 2. Language Toggle Testing
- [ ] Click the FR/EN button in the top-right corner
- [ ] Verify these elements change language:
  - Page title
  - "Select" buttons under each logo
  - Submit button
  - Modal texts (after triggering it)

### 3. Logo Selection Testing
- [ ] Click on each logo and verify:
  - The card highlights with a green border
  - The radio button gets selected
  - Only one logo can be selected at a time

### 4. Form Submission Testing
1. Select any logo and click "Submit Vote" / "Soumettre Vote"
2. In the modal that appears, test these scenarios:

#### Valid Input Testing:
- [ ] Enter a valid name and email
- [ ] Click "Confirm" / "Confirmer"
- [ ] Verify confirmation message appears

#### Invalid Input Testing:
- [ ] Try submitting without a name
- [ ] Try these invalid email formats:
  - No @ symbol (e.g., "testmail.com")
  - No domain (e.g., "test@")
  - Invalid domain (e.g., "test@test")
- [ ] Verify error messages appear in the current language

#### Modal Interaction Testing:
- [ ] Click outside the modal - should close
- [ ] Click "Cancel" / "Annuler" - should close
- [ ] After closing, form should reset

### 5. Email Confirmation Testing
After submitting with valid information:
- [ ] Check your email inbox
- [ ] Verify the email:
  - Subject shows correct logo letter
  - Contains both English and French text
  - Reply-to address is correct
  - All text is properly formatted

## Common Issues & Troubleshooting

1. If the page doesn't load:
   - Verify the server is running (terminal should show "Serving HTTP on :: port 8000")
   - Check you're using the correct URL (http://localhost:8000)

2. If email isn't received:
   - Check spam/junk folder
   - Verify the email address was entered correctly
   - Contact administrator for email server status

## Reporting Issues

If you find any bugs or issues:
1. Take a screenshot if possible
2. Note the exact steps to reproduce
3. Record any error messages
4. Note which browser you're using
5. Contact the development team with these details

## Browser Compatibility

Test in these browsers if possible:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Mobile Testing

Test responsive design by:
- [ ] Using different screen sizes
- [ ] Testing on actual mobile devices
- [ ] Verifying all interactions work on touch screens 