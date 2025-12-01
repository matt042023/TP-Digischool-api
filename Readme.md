# TP Digischool API

API REST pour la gestion des **classes** et **matières** d’un établissement scolaire.

---

## Table des matières

- [Technologies](#technologies)  
- [Installation](#installation)  
- [Configuration](#configuration)  
- [Lancement du serveur](#lancement-du-serveur)  
- [Documentation API](#documentation-api)  
- [JSDOC](#jsdoc)
- [Structure du projet](#structure-du-projet)  
- [Contributeurs](#contributeurs)  

---

## Technologies

- Node.js  
- Express.js  
- MongoDB & Mongoose  
- Swagger (Documentation interactive)  
- JSDoc (Documentation du code)  
- Nodemon (rechargement automatique)  
- Jest (tests unitaires si présents)  

---

## Installation

1. Cloner le projet :  
```bash
git clone https://github.com/matt042023/TP-Digischool-api.git
cd TP-Digischool-api
```

2. Installer les dépendances :
```bash
npm install
```
## Configuration

3. Créer la base de données MongoDB et configurer l’URL de connexion dans .env si nécessaire :
```bash
MONGODB_URI=mongodb://localhost:27017/digischool
PORT=3000
```
## Lancement du serveur

En mode développement avec rechargement automatique :
```bash
npm run dev
```
Ou en production : 
```bash
npm start
```
Le serveur écoute sur le port défini dans .env ou par défaut 3000.

## Documentation API
Swagger UI

Toutes les routes de l’API sont documentées et testables via Swagger :

http://localhost:3000/api-docs

## JSDoc

La documentation du code peut être générée avec JSDoc :
```bash
npm run doc
```
La documentation HTML sera générée dans le dossier docs/.

## Structure du projet

TP-Digischool-api/
│
├─ src/
│  ├─ controllers/   # Logique des routes
│  ├─ models/        # Schémas Mongoose
│  ├─ repositories/  # Accès aux données
│  ├─ routes/        # Définition des endpoints
│  ├─ services/      # Logique métier
│  ├─ scripts/       # Scripts de seed ou utilitaires
│  └─ index.js       # Point d’entrée du serveur
│
├─ docs/             # Documentation JSDoc générée
├─ jsdoc.json        # Configuration JSDoc
├─ package.json
└─ README.md

## Contributeurs

Matthieu
Daris
Robin