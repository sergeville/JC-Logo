from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import ssl
from dotenv import load_dotenv

# Load environment variables from .env.local
load_dotenv('.env.local')

# Email configuration from environment variables
SMTP_SERVER = os.getenv('SMTP_SERVER')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
SENDER_EMAIL = os.getenv('SENDER_EMAIL')
SENDER_PASSWORD = os.getenv('EMAIL_PASSWORD')

# Data file path
DATA_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'private', 'data.json')

class VoteHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        print(f"\nReceived POST request to {self.path}")
        
        if self.path == '/api/submit-vote':
            try:
                # Print request information for debugging
                print("Headers:", self.headers)
                
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                print("Raw POST data:", post_data.decode('utf-8'))
                
                vote_data = json.loads(post_data.decode('utf-8'))
                print("Parsed vote data:", vote_data)
                
                # Validate required fields
                required_fields = ['name', 'email', 'selectedLogo']
                missing_fields = [field for field in required_fields if not vote_data.get(field)]
                if missing_fields:
                    print(f"Missing required fields: {missing_fields}")
                    self.send_error_response(400, f"Missing required fields: {missing_fields}")
                    return

                # First verify SMTP connection before processing
                if not self.verify_smtp_connection():
                    self.send_error_response(500, "Could not connect to email server. Please try again later.")
                    return
                
                self.send_email(vote_data)
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
                self.send_header('Access-Control-Allow-Headers', 'Content-Type')
                self.end_headers()
                response_data = {'message': 'Vote submitted and email sent', 'status': 'success'}
                self.wfile.write(json.dumps(response_data).encode())
                print("Successfully processed vote and sent email")
                
            except json.JSONDecodeError as e:
                print(f"Error decoding JSON: {str(e)}")
                self.send_error_response(400, f"Invalid JSON format: {str(e)}")
            except Exception as e:
                print(f"Error processing vote: {str(e)}")
                self.send_error_response(500, str(e))
        else:
            # For all other POST requests, call the parent class handler
            super().do_POST()

    def verify_smtp_connection(self):
        """Verify SMTP connection before attempting to send email"""
        try:
            print(f"\nVerifying SMTP connection to {SMTP_SERVER}:{SMTP_PORT}...")
            print(f"Using email: {SENDER_EMAIL}")
            
            if not SENDER_PASSWORD:
                print("ERROR: No email password configured!")
                return False
                
            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
                server.set_debuglevel(1)  # Enable SMTP debug output
                print("Starting TLS connection...")
                server.starttls(context=ssl.create_default_context())
                print(f"Logging in as {SENDER_EMAIL}...")
                server.login(SENDER_EMAIL, SENDER_PASSWORD)
                print("SMTP connection verified successfully!")
                return True
        except smtplib.SMTPAuthenticationError as e:
            print(f"SMTP Authentication Error: {str(e)}")
            print("Please check your email and App Password")
            return False
        except Exception as e:
            print(f"SMTP verification failed: {str(e)}")
            print(f"Error type: {type(e).__name__}")
            return False

    def do_OPTIONS(self):
        # Pre-flight request. Reply successfully:
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Max-Age', '86400')
        self.end_headers()

    def send_email(self, vote_data):
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f"Logo vote - JLC / Vote du logo - JLC"
            msg['From'] = SENDER_EMAIL
            msg['To'] = vote_data['email']

            # Create HTML content with inline styles (for email client compatibility)
            html = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>JLC Logo Vote</title>
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Logo Selection Card -->
                    <div style="background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 30px; border: 2px solid #2c5530;">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <img src="cid:logo_{vote_data['selectedLogo']}" alt="Selected Logo" style="max-width: 200px; height: auto;">
                        </div>
                        <div style="background: #2c5530; color: white; text-align: center; padding: 10px; border-radius: 4px; margin: 10px 0;">
                            <strong>Option {vote_data['selectedLogo']}</strong>
                        </div>
                    </div>

                    <!-- English Version -->
                    <div style="margin-bottom: 30px;">
                        <h1 style="color: #2c5530; text-align: center; margin-bottom: 20px; font-size: calc(1.5rem + 1vw);">Thank You for Your Vote!</h1>
                        <p style="color: #333; font-size: 16px; line-height: 1.5;">Hello {vote_data['name']},</p>
                        <p style="color: #333; font-size: 16px; line-height: 1.5;">We have received your vote for Logo {vote_data['selectedLogo']}.</p>
                        
                        <div style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #2c5530; border-radius: 4px;">
                            <p style="color: #2c5530; font-weight: bold; margin: 0;">Important:</p>
                            <p style="margin: 10px 0 0 0;">To confirm your vote, please reply to this email. Your vote will only be counted after we receive your reply.</p>
                        </div>

                        <div style="text-align: center; margin-top: 20px;">
                            <a href="mailto:{SENDER_EMAIL}?subject=RE: Logo vote - JLC - Confirmation&body=I confirm my vote for Logo {vote_data['selectedLogo']}" 
                               style="display: inline-block; padding: 12px 24px; background-color: #2c5530; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
                                Confirm My Vote
                            </a>
                        </div>
                    </div>

                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

                    <!-- French Version -->
                    <div>
                        <h1 style="color: #2c5530; text-align: center; margin-bottom: 20px; font-size: calc(1.5rem + 1vw);">Merci pour Votre Vote !</h1>
                        <p style="color: #333; font-size: 16px; line-height: 1.5;">Bonjour {vote_data['name']},</p>
                        <p style="color: #333; font-size: 16px; line-height: 1.5;">Nous avons bien reçu votre vote pour le Logo {vote_data['selectedLogo']}.</p>
                        
                        <div style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #2c5530; border-radius: 4px;">
                            <p style="color: #2c5530; font-weight: bold; margin: 0;">Important :</p>
                            <p style="margin: 10px 0 0 0;">Pour confirmer votre vote, veuillez répondre à cet email. Votre vote ne sera comptabilisé qu'après réception de votre réponse.</p>
                        </div>

                        <div style="text-align: center; margin-top: 20px;">
                            <a href="mailto:{SENDER_EMAIL}?subject=RE: Vote du logo - JLC - Confirmation&body=Je confirme mon vote pour le Logo {vote_data['selectedLogo']}" 
                               style="display: inline-block; padding: 12px 24px; background-color: #2c5530; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
                                Confirmer Mon Vote
                            </a>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666;">
                        <p style="font-size: 14px;">© 2024 Les Jardins du Lac Campion. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """

            # Plain text version
            text = f"""
Thank You for Your Vote!

Hello {vote_data['name']},

We have received your vote for Logo {vote_data['selectedLogo']}.

IMPORTANT: To confirm your vote, please reply to this email. Your vote will only be counted after we receive your reply.

To confirm by email, write to: {SENDER_EMAIL}
Subject: RE: Logo vote - JLC - Confirmation
Message: I confirm my vote for Logo {vote_data['selectedLogo']}

Best regards,
The JLC Team

---

Merci pour Votre Vote !

Bonjour {vote_data['name']},

Nous avons bien reçu votre vote pour le Logo {vote_data['selectedLogo']}.

IMPORTANT : Pour confirmer votre vote, veuillez répondre à cet email. Votre vote ne sera comptabilisé qu'après réception de votre réponse.

Pour confirmer par email, écrivez à : {SENDER_EMAIL}
Sujet : RE: Vote du logo - JLC - Confirmation
Message : Je confirme mon vote pour le Logo {vote_data['selectedLogo']}

Cordialement,
L'équipe JLC

© 2024 Les Jardins du Lac Campion. Tous droits réservés.
            """

            # Attach parts
            part1 = MIMEText(text, 'plain')
            part2 = MIMEText(html, 'html')
            msg.attach(part1)
            msg.attach(part2)

            # Send email
            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
                server.starttls(context=ssl.create_default_context())
                server.login(SENDER_EMAIL, SENDER_PASSWORD)
                server.send_message(msg)

        except Exception as e:
            print(f"Error sending email: {str(e)}")
            raise Exception(f"Failed to send email: {str(e)}")

    def send_error_response(self, status_code, message):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        error_data = {'error': message, 'status': 'error'}
        self.wfile.write(json.dumps(error_data).encode())

def run_server():
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, VoteHandler)
    print('Server running on port 8000...')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server() 