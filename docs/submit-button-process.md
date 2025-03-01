# Documentation du Système de Gestion des Propriétaires de Logo

## Page de Gestion des Propriétaires de Logo
La page de gestion des propriétaires de logo permet aux administrateurs de :
- Ajouter de nouveaux propriétaires de logo
- Visualiser la liste complète des propriétaires
- Gérer les attributions de logos (A à F)
- Exporter et importer les données au format JSON

### Interface Principale
L'interface comprend deux sections principales :
1. **Formulaire d'Ajout**
   - Champ Email pour identifier le propriétaire
   - Menu déroulant pour sélectionner le logo (A-F)
   - Boutons "Ajouter" et "Annuler"

2. **Liste des Propriétaires**
   - Tableau avec colonnes : Email, Logo, Date d'ajout, Actions
   - Boutons de suppression pour chaque logo attribué
   - Affichage visuel des logos par couleur et lettre

### Fonctionnalités d'Import/Export
- Bouton "Exporter (JSON)" : Sauvegarde des données
- Bouton "Importer (JSON)" : Restauration des données

# Documentation du Bouton de Soumission

## Vue d'ensemble
Le bouton de soumission dans l'interface principale permet aux actionnaires de soumettre leurs votes pour les logos. Cette documentation explique le processus complet, de la soumission à la validation.

## Localisation du Bouton
Le bouton de soumission se trouve sur la page principale (`index.html`) et est identifié comme suit :
```html
<button type="submit" class="btn btn-primary">Soumettre</button>
```

## Fonctionnalités Principales

### 1. Déclenchement
- Le bouton est activé une fois que l'utilisateur a rempli les champs requis
- La soumission peut se faire dans deux formats différents (Simple ou Logo)

### 2. Validation des Entrées
Le système vérifie automatiquement :
- La présence d'un email valide
- Le format correct selon le mode choisi
- La correspondance avec la liste des actionnaires
- Les autorisations pour les logos (si applicable)

### 3. Processus de Soumission
1. **Capture des Données**
   - Récupération des valeurs du formulaire
   - Vérification du format sélectionné

2. **Vérifications Préliminaires**
   - Format d'email valide
   - Champs requis remplis
   - Format approprié selon le mode

3. **Traitement**
   - Validation contre la base de données des actionnaires
   - Vérification des autorisations de logos
   - Enregistrement du vote

### 4. Retour d'Information
Le système fournit un retour immédiat :
- Message de succès si la soumission est valide
- Message d'erreur détaillé en cas de problème
- Mise à jour du tableau des résultats

## Messages de Statut

| Type | Message |
|------|---------|
| Succès | "Vote enregistré avec succès" |
| Erreur Format | "Format invalide. Veuillez vérifier votre saisie" |
| Non Autorisé | "Vous n'êtes pas autorisé à voter pour ce(s) logo(s)" |
| Erreur Système | "Une erreur est survenue. Veuillez réessayer" |

## Sécurité
- Validation côté client et serveur
- Vérification des doublons
- Protection contre les soumissions multiples
- Validation des autorisations

## Exemples d'Utilisation

### Format Simple
```
exemple@email.com
```

### Format Logo
```
exemple@email.com,A
```

## Notes Importantes
1. Un seul vote par email est autorisé
2. La soumission est définitive
3. Une confirmation est requise avant l'envoi
4. Les erreurs sont clairement indiquées à l'utilisateur

## Dépannage
Si le bouton ne répond pas :
1. Vérifier que tous les champs requis sont remplis
2. S'assurer que le format correspond au mode sélectionné
3. Vérifier la connexion internet
4. Effacer le cache du navigateur si nécessaire 