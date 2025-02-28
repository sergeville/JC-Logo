# Guide d'utilisation d'EmailJS pour JC Logo Vote

## Introduction

EmailJS est un service qui permet d'envoyer des emails directement depuis le JavaScript côté client, sans avoir besoin d'un serveur backend. Ce document explique comment configurer EmailJS pour le système de vote de logo des Jardins Campion.

## Étape 1: Créer un compte EmailJS

1. Visitez [EmailJS.com](https://www.emailjs.com/) et cliquez sur "Sign Up Free"
2. Inscrivez-vous avec votre email et un mot de passe
3. Vérifiez votre email pour confirmer votre compte

## Étape 2: Connecter un service d'email

1. Dans le tableau de bord EmailJS, cliquez sur "Email Services" dans le menu de gauche
2. Cliquez sur "Add New Service"
3. Sélectionnez "Outlook" (puisque vous utilisez jardinscampion@outlook.com)
4. Suivez les instructions pour vous connecter à votre compte Outlook:
   - Vous devrez entrer l'adresse email jardinscampion@outlook.com
   - Vous devrez entrer le mot de passe de cette adresse
   - Si l'authentification à deux facteurs est activée, vous devrez la compléter
5. Donnez un nom au service (par exemple: "Jardins Campion")
6. Une fois créé, notez le "Service ID" qui ressemble à `service_xxxxxxx`

## Étape 3: Créer un modèle d'email

1. Dans le tableau de bord, cliquez sur "Email Templates" dans le menu de gauche
2. Cliquez sur "Create New Template"
3. Donnez un nom à votre modèle (ex: "Vote Logo")
4. Configurez les champs suivants:
   - **To email**: {{to_email}} (sera remplacé par jardinscampion@outlook.com)
   - **From name**: {{from_name}} (sera remplacé par le nom du votant)
   - **From email**: {{from_email}} (sera remplacé par l'email du votant)
   - **Subject**: {{subject}} (sera remplacé par "Vote de logo: Option X par Nom")
   - **Reply-To**: {{reply_to}} (sera remplacé par l'email du votant)

5. Dans le corps de l'email, créez un modèle comme celui-ci:

```html
<p>Bonjour,</p>

<p>Un nouveau vote a été soumis pour le logo des Jardins Campion.</p>

<p><strong>Détails du vote:</strong></p>
<ul>
  <li>Nom du votant: {{from_name}}</li>
  <li>Email du votant: {{from_email}}</li>
  <li>Logo sélectionné: {{selected_logo}}</li>
</ul>

<p>Pour toute question, vous pouvez répondre directement à cet email pour contacter le votant.</p>

<p>Cordialement,<br>
Système de vote JC Logo</p>
```

6. Cliquez sur "Save" et notez le "Template ID" qui ressemble à `template_xxxxxxx`

## Étape 4: Obtenir votre clé publique

1. Dans le tableau de bord, cliquez sur "Account" puis "API Keys"
2. Copiez votre "Public Key" qui ressemble à `pMXXXXXXXXXXXXXXXXX`

## Étape 5: Mettre à jour le code HTML avec vos identifiants

Ouvrez votre fichier `index.html` et mettez à jour les sections suivantes:

1. Remplacez la clé publique dans la fonction d'initialisation:
```javascript
(function() {
    // Remplacer par votre clé publique EmailJS réelle
    emailjs.init("pMXXXXXXXXXXXXXXXXX"); // ← Remplacer par votre clé publique
})();
```

2. Remplacez les identifiants dans la fonction d'envoi d'email:
```javascript
await emailjs.send(
    'service_xxxxxx',  // ← Remplacer par votre Service ID réel
    'template_xxxxxx', // ← Remplacer par votre Template ID réel
    templateParams
);
```

## Étape 6: Tester l'envoi d'emails

1. Après avoir mis à jour le code avec vos identifiants, publiez les modifications sur GitHub
2. Visitez votre site et testez le système de vote:
   - Sélectionnez un logo
   - Cliquez sur "Soumettre Vote"
   - Remplissez le formulaire avec votre nom et email
   - Cliquez sur "Confirmer"
   - Vérifiez que vous recevez le message de succès

3. Vérifiez la boîte de réception de jardinscampion@outlook.com pour confirmer la réception de l'email

## Limites et considérations

- Le compte gratuit d'EmailJS permet d'envoyer **200 emails par mois**
- Si vous avez besoin d'envoyer plus d'emails, vous devrez passer à un forfait payant
- Les emails peuvent parfois être marqués comme spam, vérifiez votre dossier spam si vous ne les recevez pas

## Support et dépannage

Si vous rencontrez des erreurs:

1. Vérifiez que les identifiants (Service ID, Template ID, Public Key) sont correctement copiés
2. Assurez-vous que les noms des variables dans le template correspondent exactement à ceux dans le code
3. Consultez la console du navigateur (F12) pour voir les messages d'erreur
4. Vérifiez le tableau de bord EmailJS pour voir les logs d'envoi d'emails

Pour obtenir de l'aide supplémentaire, consultez [la documentation officielle d'EmailJS](https://www.emailjs.com/docs/). 