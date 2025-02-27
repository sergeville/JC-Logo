from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from urllib.parse import parse_qs
import ssl

# Email configuration
SMTP_SERVER = "smtp-mail.outlook.com"
SMTP_PORT = 587
SENDER_EMAIL = "sergevi@hotmail.com"
SENDER_PASSWORD = os.getenv('EMAIL_PASSWORD', "fosmam-0cEzwe-kezroq")  # Use environment variable in production

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
            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
                server.set_debuglevel(1)  # Enable SMTP debug output
                print("Starting TLS connection...")
                server.starttls(context=ssl.create_default_context())
                print(f"Logging in as {SENDER_EMAIL}...")
                server.login(SENDER_EMAIL, SENDER_PASSWORD)
                print("SMTP connection verified successfully!")
                return True
        except Exception as e:
            print(f"SMTP verification failed: {str(e)}")
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
            msg['Subject'] = f"Logo vote - {vote_data['selectedLogo']} / Vote du logo - {vote_data['selectedLogo']}"
            msg['From'] = SENDER_EMAIL
            msg['To'] = vote_data['email']

            # Create HTML content
            html = f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="margin-bottom: 30px;">
                <h2>Thank you for your vote!</h2>
                <p>Hello {vote_data['name']},</p>
                <p>We have received your vote for Logo {vote_data['selectedLogo']}.</p>
                <p><strong>Important:</strong> To confirm your vote, please reply to this email. If we don't receive your reply, your vote will not be counted.</p>
                <p>Best regards,<br>The JLC Team</p>
              </div>
              <hr style="border: 1px solid #eee; margin: 20px 0;">
              <div>
                <h2>Merci pour votre vote !</h2>
                <p>Bonjour {vote_data['name']},</p>
                <p>Nous avons bien reçu votre vote pour le Logo {vote_data['selectedLogo']}.</p>
                <p><strong>Important :</strong> Pour confirmer votre vote, veuillez répondre à cet email. Sans votre réponse, votre vote ne sera pas comptabilisé.</p>
                <p>Cordialement,<br>L'équipe JLC</p>
              </div>
            </div>
            """

            text = f"""Thank you for your vote!\n\nHello {vote_data['name']},\n\nWe have received your vote for Logo {vote_data['selectedLogo']}.\n\nIMPORTANT: To confirm your vote, please reply to this email. If we don't receive your reply, your vote will not be counted.\n\nBest regards,\nThe JLC Team\n\n---\n\nMerci pour votre vote !\n\nBonjour {vote_data['name']},\n\nNous avons bien reçu votre vote pour le Logo {vote_data['selectedLogo']}.\n\nIMPORTANT : Pour confirmer votre vote, veuillez répondre à cet email. Sans votre réponse, votre vote ne sera pas comptabilisé.\n\nCordialement,\nL'équipe JLC"""

            part1 = MIMEText(text, 'plain')
            part2 = MIMEText(html, 'html')

            msg.attach(part1)
            msg.attach(part2)

            print(f"\nAttempting to send email to {vote_data['email']}...")
            print(f"Connecting to SMTP server {SMTP_SERVER}:{SMTP_PORT}")
            
            # Create SMTP connection with detailed logging
            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
                server.set_debuglevel(1)  # Enable SMTP debug output
                print("Starting TLS connection...")
                server.starttls(context=ssl.create_default_context())
                print(f"Logging in as {SENDER_EMAIL}...")
                server.login(SENDER_EMAIL, SENDER_PASSWORD)
                print("Sending email...")
                server.send_message(msg)
                print("Email sent successfully!")

        except smtplib.SMTPAuthenticationError as e:
            print(f"SMTP Authentication Error: {str(e)}")
            raise Exception("Failed to authenticate with email server. Please check credentials.")
        except smtplib.SMTPException as e:
            print(f"SMTP Error: {str(e)}")
            raise Exception(f"SMTP Error: {str(e)}")
        except Exception as e:
            print(f"Unexpected error while sending email: {str(e)}")
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