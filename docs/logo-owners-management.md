# Gestion des Propriétaires de Logo

## Interface Visuelle

### 1. En-tête
- Titre principal en vert : "Gestion des Propriétaires de Logo"

### 2. Section "Ajouter un propriétaire de logo"
Carte blanche avec :
- **Email** : Champ de saisie texte (gauche)
- **Logo** : Menu déroulant avec "Choisir un logo..." (droite)
- Boutons :
  - `Ajouter` (bleu)
  - `Annuler` (gris)

### 3. Section "Liste des propriétaires de logo"
Tableau avec 4 colonnes :
| Colonne | Description |
|---------|-------------|
| Email | Adresse email du propriétaire |
| Logo | Badge(s) bleu(s) avec lettre(s) |
| Date d'ajout | Format AAAA-MM-JJ |
| Actions | Bouton(s) rouge(s) de suppression |

#### Exemple de Données Actuelles :
```
Email                        Logo      Date d'ajout   Actions
bozo_braz@hotmail.com       [A]       2024-03-01     [🗑 A]
Yvesgoulet42@gmail.com      [B] [C]   2025-03-01     [🗑 B] [🗑 C]
seguinbrigitte8@gmail.com   [D]       2025-03-01     [🗑 D]
Jovanne5@outlook.com        [E] [F]   2025-03-01     [🗑 E] [🗑 F]
```

### 4. Boutons d'Import/Export
En bas de page :
- `Exporter (JSON)` : Bouton vert
- `Importer (JSON)` : Bouton bleu clair

## Fonctionnalités

### Ajout d'un Propriétaire
1. Saisir l'email du propriétaire
2. Sélectionner un logo disponible (A-F)
3. Cliquer sur "Ajouter"
   - Le logo est ajouté avec la date du jour
   - Un badge bleu apparaît dans le tableau

### Suppression d'un Logo
1. Localiser le propriétaire dans le tableau
2. Cliquer sur le bouton rouge avec l'icône poubelle
3. Confirmer la suppression dans la boîte de dialogue

### Import/Export de Données
- **Export** : Télécharge un fichier JSON avec toutes les attributions
- **Import** : Permet de charger un fichier JSON de propriétaires

## Validation
- Un logo ne peut être attribué qu'à un seul propriétaire
- L'email doit être valide
- Confirmation requise avant suppression

## Format des Données
```json
{
  "logo_owners": [
    {
      "email": "bozo_braz@hotmail.com",
      "logo": "A",
      "date_added": "2024-03-01"
    },
    {
      "email": "Yvesgoulet42@gmail.com",
      "logo": "B",
      "date_added": "2025-03-01"
    }
  ]
}
```

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

## Style et Apparence
- Thème Bootstrap 5.3.0
- Icônes Bootstrap
- Couleurs personnalisées :
  - Vert principal : #2c5530
  - Fond de page : #f5f5f5
  - Cartes : fond blanc avec ombre légère 