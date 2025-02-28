# Terttwi 🐦 - Serveur GraphQL

## Description
Terttwi est une plateforme sociale qui te permet d'exprimer tes pensées et d'interagir grâce aux likes et aux commentaires.

## Installation

1. **Cloner le dépôt**
   ```sh
   git clone https://github.com/Louisrca/terttwi-graphql-project.git
   cd graphql-server
   ```

2. **Installer les dépendances**
   ```sh
   npm install
   ```

## Configuration

Créer un fichier `.env` à la racine du projet et ajouter les variables d'environnement requises :

```env
PORT=4000
DATABASE_URL="file:./dev.db"
JWT_SECRET="ton_secret_jwt"
```

## Générer le Code GraphQL
Avant de démarrer le serveur, il faut générer le code GraphQL :
```sh
npm run generate
```

## Démarrer le Serveur

```sh
npm run dev
```
Le serveur tournera sur `http://localhost:4000`.

## Technologies utilisées
- Node.js
- Apollo Server (GraphQL)
- SQLite
- L'ORM Prisma
- JWT pour l'authentification

## Fonctionnalités principales
- Création de posts
- Ajout de commentaires
- Like sur posts et commentaires
- Authentification JWT