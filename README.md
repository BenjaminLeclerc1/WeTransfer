# Documentation du site de partage de fichiers

## 1. Utilisation

Clonez le dépôt et lancez le projet avec Docker :

git clone https://github.com/BenjaminLeclerc1/WeTransfer.git

cd WeTransfer/my-app

docker-compose up --build
## 2. Fonctionnalités
Pages utilisables

Lien pour l'interface BDD : http://localhost:8081/db/mydatabase/

username : root

password : root

Page d'accueil : http://localhost:8080/

Sur cette page, les utilisateurs peuvent :

Se connecter (login)

S'inscrire (register)

### Après connexion :
Une fois connecté, l’utilisateur accède à une interface avec :

Un bouton Option donnant accès au formulaire d’upload des fichiers.

La liste des fichiers que l'utilisateur a téléchargés dans la base de données.

Un bouton de déconnexion pour se déconnecter du site.

### Page des fichiers téléchargés (accessible uniquement après connexion) : http://localhost:8080/filelist

Cette page permet de visualiser les fichiers enregistrés dans la base de données avec les actions suivantes :

Bouton "Supprimer" : Supprime le fichier de la base de données.

Bouton "Obtenir le lien de téléchargement" : Crée un lien de partage temporaire pour le fichier. Ce lien est accessible à toute personne qui le possède, sans besoin de connexion.

Attention : ce lien est valide uniquement pendant 1 jour, après quoi il expire et il faudra en générer un nouveau pour permettre le téléchargement.

## 3. Routes de l’API

| Méthode | Route                   | Description                                        |
|---------|--------------------------|----------------------------------------------------|
| `GET`   | `/files/:fileId/download`| Télécharge le fichier si le lien de partage est valide |
| `GET`   | `/files/:fileId/share`   | Crée un lien de partage temporaire (1 minute)      |
| `DELETE`| `/files/:id`             | Supprime un fichier de la base de données          |
| `GET`   | `/files/myfiles`         | Récupère les fichiers de l’utilisateur connecté    |
| `POST`  | `/files/upload`          | Télécharge un fichier dans la base de données      |
| `POST`  | `/users/login`           | Connecte un utilisateur                            |
| `POST`  | `/users/register`        | Crée un compte utilisateur                         |
| `POST`  | `/users/logout`          | Déconnecte l’utilisateur                           |
