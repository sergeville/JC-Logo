import os
import csv
from datetime import datetime

def generate_invitation_email(template_path, output_dir, user_name, logo_urls):
    # Read the template
    with open(template_path, 'r', encoding='utf-8') as file:
        template = file.read()
    
    # Replace placeholders
    email_content = template.replace('USER_NAME', user_name)
    
    # Replace logo URLs
    for letter in ['A', 'B', 'C', 'D', 'E']:
        email_content = email_content.replace(f'LOGO_{letter}_URL', logo_urls[letter])
    
    # Create output filename
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f'invitation_email_{user_name.replace(" ", "_")}_{timestamp}.html'
    output_path = os.path.join(output_dir, filename)
    
    # Save the personalized email
    with open(output_path, 'w', encoding='utf-8') as file:
        file.write(email_content)
    
    return output_path

def generate_confirmation_email(template_path, output_dir, user_name, logo_letter, logo_image_url):
    # Read the template
    with open(template_path, 'r', encoding='utf-8') as file:
        template = file.read()
    
    # Replace placeholders
    email_content = template.replace('USER_NAME', user_name)
    email_content = email_content.replace('LOGO_LETTER', logo_letter)
    email_content = email_content.replace('LOGO_IMAGE_URL', logo_image_url)
    
    # Create output filename
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f'confirmation_email_{user_name.replace(" ", "_")}_{logo_letter}_{timestamp}.html'
    output_path = os.path.join(output_dir, filename)
    
    # Save the personalized email
    with open(output_path, 'w', encoding='utf-8') as file:
        file.write(email_content)
    
    return output_path

def main():
    # Create output directory if it doesn't exist
    output_dir = 'generated_emails'
    os.makedirs(output_dir, exist_ok=True)
    
    # Ask which type of email to generate
    email_type = input("Which type of email do you want to generate? (1 for invitation, 2 for confirmation): ")
    
    if email_type == "1":
        # Generate invitation email
        template_path = 'private/vote_invitation_template.html'
        user_name = input("Enter user's name: ")
        
        # Get logo URLs
        logo_urls = {}
        for letter in ['A', 'B', 'C', 'D', 'E']:
            logo_urls[letter] = input(f"Enter URL for Logo {letter}: ")
        
        output_path = generate_invitation_email(template_path, output_dir, user_name, logo_urls)
        print(f"\nInvitation email template generated successfully at: {output_path}")
        
    elif email_type == "2":
        # Generate confirmation email
        template_path = 'private/email_template.html'
        user_name = input("Enter user's name: ")
        logo_letter = input("Enter logo letter (A/B/C/D/E): ").upper()
        logo_image_url = input("Enter logo image URL: ")
        
        output_path = generate_confirmation_email(template_path, output_dir, user_name, logo_letter, logo_image_url)
        print(f"\nConfirmation email template generated successfully at: {output_path}")
    
    else:
        print("Invalid option selected.")
        return
    
    print("You can now open this file and copy its contents into your Mac Mail app.")

if __name__ == '__main__':
    main() 