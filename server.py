from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Permet les requêtes cross-origin

# Chemin vers le fichier JSON
ACTIONNAIRES_FILE = 'actionnaires.json'

def read_actionnaires():
    if os.path.exists(ACTIONNAIRES_FILE):
        with open(ACTIONNAIRES_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"actionnaires": [], "meta": {"totalActionnaires": 0, "totalActifs": 0, "totalParts": 0}}

def write_actionnaires(data):
    with open(ACTIONNAIRES_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

@app.route('/')
def serve_html():
    return send_from_directory('.', 'gestion_actionnaires.html')

@app.route('/actionnaires.json', methods=['GET'])
def get_actionnaires():
    return jsonify(read_actionnaires())

@app.route('/actionnaires.json', methods=['PUT'])
def update_actionnaires():
    data = request.get_json()
    write_actionnaires(data)
    return jsonify({"success": True})

if __name__ == '__main__':
    app.run(debug=True, port=5000) 