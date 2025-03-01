# Documentation de la Gestion des Propriétaires de Logo

## Vue d'ensemble
La page de gestion des propriétaires de logo (`logo-owners.html`) est une interface administrative permettant de gérer les attributions des logos aux différents propriétaires.

## Interface Utilisateur

### En-tête
- Titre principal : "Gestion des Propriétaires de Logo"
- Style : Texte vert (#2c5530), centré

### Formulaire d'Ajout
Le formulaire est présenté dans une carte avec en-tête "Ajouter un propriétaire de logo"

#### Champs de Saisie
1. **Email**
   - Type : input email
   - Validation : format email requis
   - Largeur : 8 colonnes

2. **Logo**
   - Type : menu déroulant (select)
   - Options : A, B, C, D, E, F
   - Largeur : 4 colonnes
   - Texte par défaut : "Choisir un logo..."

#### Boutons
- **Ajouter** : Bouton primaire (bleu)
- **Annuler** : Bouton secondaire (gris)

### Liste des Propriétaires
Tableau responsive avec les colonnes :
- Email
- Logo (badges bleus)
- Date d'ajout
- Actions (boutons de suppression rouges)

### Boutons d'Import/Export
Situés en bas de page :
- **Exporter (JSON)** : Bouton vert
- **Importer (JSON)** : Bouton bleu clair

## Fonctionnalités

### 1. Ajout d'un Propriétaire
```javascript
// Validation avant ajout
- Vérifie si l'email est valide
- Vérifie si le logo n'est pas déjà attribué
- Ajoute la date du jour automatiquement
```

### 2. Suppression d'un Logo
- Bouton avec icône poubelle pour chaque logo
- Demande de confirmation avant suppression
- Suppression immédiate après confirmation

### 3. Import/Export
#### Export
- Format : JSON
- Inclut :
  - Liste des propriétaires
  - Métadonnées (nombre total, date de modification)
- Téléchargement automatique du fichier

#### Import
- Accepte uniquement les fichiers .json
- Validation du format
- Message de confirmation avec nombre de propriétaires importés

## Stockage des Données

### LocalStorage
- Clé : 'logo_owners_data'
- Structure :
```json
{
  "logo_owners": [
    {
      "email": "exemple@email.com",
      "logo": "A",
      "date_added": "2024-03-01"
    }
  ],
  "meta": {
    "total_owners": 1,
    "last_modified": "2024-03-01"
  }
}
```

### Chargement Initial
1. Tente de charger depuis localStorage
2. Si absent, essaie de charger depuis `data/logo-owners.json`
3. Si échec, initialise avec un tableau vide

## Validation et Sécurité
- Vérification des doublons de logos
- Validation du format email
- Confirmation avant suppression
- Validation du format JSON à l'import

## Style et Apparence
- Thème Bootstrap 5.3.0
- Icônes Bootstrap
- Couleurs personnalisées :
  - Vert principal : #2c5530
  - Fond de page : #f5f5f5
  - Cartes : fond blanc avec ombre légère 