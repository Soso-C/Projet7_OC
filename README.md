# Projet 7 - Créez un réseau social d’entreprise

Ceci est mon dernier projet de formation avec Openclassrooms, le but de ce projet est de créer un réseau social interne d'une entreprise qui se nomme : Groupomania.

## Les fonctionnalitées de l'application :

### Les utilisateurs pourront :

- Créer un compte
- Se connecter
- Créer un post contenant une image et du texte ou bien supprimer un post si ils sont propriétaire du post
- Commenter un post ou bien supprimer le commentaire si ils sont propriétaire du commentaire
- Modifier son profil ainsi que la possibilité de supprimer son compte

### L'application est aussi configurée pour un compte Admin ou celui-ci pourra :

- Supprimer n'importe quel post
- Supprimer n'importe quel commentaire


## Compétences évaluées du projet :

- Authentifier un utilisateur et maintenir sa session
- Personnaliser le contenu envoyé à un client web
- Gérer un stockage de données à l'aide de SQL
- Implémenter un stockage de données sécurisé en utilisant SQL

### Backend :

Le backend a été réalisé avec Node.js, Express.js et MySQL comme base de données

#### Packages utilisé :

nodemon / mysql / express / bcrypt / jsonwebtoken / multer / dotenv / helmet / express-rate-limit / yup

### Frontend :

Le frontend a été réalisé avec le framework React.js

#### Packages utilisé :

react-router-dom / yup / axios / Material UI

# Comment installer l'application Groupomania ?

## Step 1 Installer la base de donnée :

Pour installer la base de donnée dirigez vous dans le dossier : backend/SQL_DB et vous trouverez 3 fichiers SQL a exécuter pour installer les tables.

## Step 2 Backend :

#### Pour pouvoir installer les packages dirigez vous dans le dossier /backend depuis votre terminal et executer cette commande :

```
npm install
```

Ceci installera tous les packages utilisé pour le bon fonctionnement de notre server.

#### Modifier le nom du fichier .env_test par .env :

Dans celui-ci remplir les variables de connection à votre base de données ainsi que la variable SECRETTOKEN par une longue chaine de caractères sécurisée.

#### Une fois les variables /.env/ configurées, executer cette commande dans le dossier /backend depuis votre terminal pour lancer le serveur :

```
nodemon index.js
```

Ou si problème avec nodemon :

```
node index.js
```

## Step 3 Frontend :

#### Pour pouvoir installer les packages dirigez vous dans le dossier /projet7_oc depuis votre terminal et executer cette commande :

```
npm install
```

Ceci installera tous les packages utilisé pour le bon fonctionnement de notre frontend.

#### Une fois les packages installés, executer cette commande dans le dossier /projet7_oc depuis votre terminal pour lancer le site :

```
npm start
```

#### N'oubliez pas de lancer le serveur backend avec votre frontend pour pouvoir faire fonctionner le site web.
