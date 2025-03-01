# Guide d'utilisation de l'outil de vérification des votes

Ce document explique comment utiliser l'outil de vérification des votes pour les Jardins du Lac Campion.

## Introduction

L'outil de vérification des votes (`verification_votes.html`) vous permet de :

- Vérifier si les emails des votants correspondent à des actionnaires enregistrés
- Associer les votes aux logos (A, B, C, D, E, F)
- Visualiser la distribution des votes par logo
- Détecter les votes en double
- Distinguer les votes valides et invalides

## Prérequis

- Le fichier `verification_votes.html` doit être dans le même répertoire que `actionnaires.json`
- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Les données des actionnaires doivent être à jour dans `actionnaires.json`

## Mode d'emploi

### 1. Ouverture de l'outil

Ouvrez le fichier `verification_votes.html` dans votre navigateur web.

### 2. Choix du format d'entrée

Deux modes sont disponibles via les onglets en haut :

- **Format Simple** : Pour vérifier uniquement les emails des votants
- **Format avec Logo** : Pour vérifier les emails et associer les votes aux logos

### 3. Mode "Format Simple"

1. Copiez-collez la liste d'emails des votants (un par ligne) dans la zone de texte
2. Cliquez sur "Vérifier les votes"

Exemple de format :
```
actionnaire1@exemple.com
actionnaire2@exemple.com
actionnaire3@exemple.com
```

### 4. Mode "Format avec Logo"

1. Copiez-collez les votes au format `email,logo` (un par ligne) dans la zone de texte
2. Cliquez sur "Vérifier les votes"

Exemple de format :
```
actionnaire1@exemple.com,A
actionnaire2@exemple.com,B
actionnaire3@exemple.com,C
```

### 5. Interprétation des résultats

#### Statistiques par logo

Si vous utilisez le mode "Format avec Logo", vous verrez en haut des résultats une rangée de cartes présentant :
- Le nombre absolu de votes pour chaque logo (A-F)
- Le pourcentage que représente chaque logo par rapport au total des votes valides

#### Récapitulatif

Le récapitulatif vous montre :
- Total d'entrées vérifiées
- Emails valides (actionnaires actifs)
- Emails invalides (non-actionnaires ou actionnaires inactifs)
- Emails en double

#### Tableau détaillé

Le tableau présente pour chaque entrée :
- Email du votant
- Statut (Valide, Inactif, Non trouvé, ou Format invalide)
- Nom de l'actionnaire (si trouvé)
- Logo choisi (uniquement en mode "Format avec Logo")
- Détails supplémentaires

## Explications des statuts

- **Valide** : L'email correspond à un actionnaire actif
- **Inactif** : L'email correspond à un actionnaire marqué comme inactif dans la base de données
- **Non trouvé** : L'email ne correspond à aucun actionnaire dans la base de données
- **Format invalide** : Le format de l'entrée ne respecte pas les attentes (uniquement en mode "Format avec Logo")

## Codes couleur

- **Vert** : Entrée valide
- **Rouge** : Entrée invalide
- **Jaune** : Email en double (déjà traité précédemment)

## Gestion des emails en double

Lorsqu'un même email apparaît plusieurs fois dans la liste des votes, l'outil applique les règles suivantes :

1. **Détection** : Tous les emails en double sont détectés et clairement identifiés par un fond jaune dans le tableau des résultats.

2. **Comptabilisation** : Seule la première occurrence d'un email est comptabilisée dans les statistiques des votes. Les occurrences suivantes sont ignorées pour le calcul des pourcentages par logo.

3. **Affichage dans le récapitulatif** : Le nombre total d'emails en double détectés est affiché dans le récapitulatif.

4. **Validation** : La règle de validation s'applique normalement à chaque entrée, même aux doublons. Ainsi, un email d'actionnaire valide qui apparaît en double sera toujours marqué comme "Valide" mais ne sera compté qu'une seule fois.

Cette approche permet de :
- Identifier facilement les tentatives de votes multiples
- Maintenir l'intégrité des résultats statistiques
- Conserver toutes les données pour analyse

Si un actionnaire souhaite modifier son vote, il devra contacter l'administrateur directement, car le système ne prend en compte que la première occurrence d'un email.

## Remarques importantes

1. Seuls les votes des actionnaires actifs sont comptabilisés dans les statistiques par logo
2. Si un email apparaît plusieurs fois, seule la première occurrence est prise en compte
3. Les logos valides sont uniquement A, B, C, D, E et F (toute autre valeur sera marquée comme "Invalide")

## Que faire en cas de problème ?

- Vérifiez que le fichier `actionnaires.json` est présent et correctement formaté
- Assurez-vous que le format des données respecte les exemples fournis
- Consultez la console du navigateur (F12) pour voir les éventuelles erreurs techniques

## Modification de la liste des actionnaires

Pour modifier la liste des actionnaires, éditez le fichier `actionnaires.json` en respectant le format existant. Chaque actionnaire doit avoir :
- Un id unique
- Un nom
- Une adresse email
- Un nombre de parts
- Une date d'adhésion
- Un statut actif (true/false) 