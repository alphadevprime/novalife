# 🌍 Projet : Simulation de Monde Ouvert & Vie Réelle (Multijoueur)

## 1. Vue d'ensemble du projet
Un jeu de simulation de vie en ligne 2D (inspiré des jeux de rôle et bac à sable) où les joueurs explorent un monde persistant, choisissent un métier, gèrent des commerces, interagissent en temps réel et vivent une expérience économique et sociale proche de la vie réelle. Le monde est enrichi par une **IA générative** pour rendre les interactions avec les PNJ (Personnages Non-Joueurs) et la génération de contenu dynamiques et imprévisibles.

---

## 2. Architecture Technique
* **Backend :** Node.js avec Express et Socket.io (gestion du temps réel, des déplacements et du chat).
* **Base de Données Principale :** MySQL (stockage persistant des utilisateurs, comptes, inventaires, commerces et historiques).
* **Moteur / Cache Temps Réel :** Redis (gestion des positions en direct et des sessions).
* **Intelligence Artificielle (IA Générative) :** Intégration d'une API de LLM (ex: DeepSeek ou OpenAI) pour dynamiser les dialogues des PNJ, les quêtes et les événements du monde.

---

## 3. Schéma de Base de Données (MySQL)

Voici la structure de base pour stocker les données essentielles du jeu :

### Table `users` (Comptes utilisateurs)
| Colonne | Type | Description |
| :--- | :--- | :--- |
| `id` | INT (PK, Auto-incrément) | Identifiant unique du compte |
| `username` | VARCHAR(50) | Nom d'utilisateur unique |
| `email` | VARCHAR(100) | Adresse e-mail |
| `password_hash` | VARCHAR(255) | Mot de passe sécurisé (bcrypt) |
| `created_at` | TIMESTAMP | Date de création du compte |

### Table `characters` (Personnages en jeu)
| Colonne | Type | Description |
| :--- | :--- | :--- |
| `id` | INT (PK, Auto-incrément) | Identifiant unique du personnage |
| `user_id` | INT (FK -> users.id) | Propriétaire du personnage |
| `name` | VARCHAR(50) | Nom du personnage en jeu |
| `money` | DECIMAL(10, 2) | Solde bancaire (Monnaie du jeu) |
| `pos_x` | FLOAT | Position X actuelle sur la carte |
| `pos_y` | FLOAT | Position Y actuelle sur la carte |

### Table `inventories` (Inventaires des objets)
| Colonne | Type | Description |
| :--- | :--- | :--- |
| `id` | INT (PK, Auto-incrément) | ID de la ligne d'inventaire |
| `character_id` | INT (FK -> characters.id) | Personnage possesseur |
| `item_name` | VARCHAR(100) | Nom de l'objet (ex: "Café", "Bois") |
| `quantity` | INT | Quantité possédée |

### Table `businesses` (Commerces des joueurs)
| Colonne | Type | Description |
| :--- | :--- | :--- |
| `id` | INT (PK, Auto-incrément) | ID du commerce |
| `owner_id` | INT (FK -> characters.id) | Personnage propriétaire |
| `business_name` | VARCHAR(100) | Nom du commerce (ex: "O'TiR Bar") |
| `balance` | DECIMAL(10, 2) | Trésorerie du commerce |

---

## 4. Rôle de l'IA Générative dans le Jeu
L'IA intervient pour briser la monotonie des jeux traditionnels :
1. **Dialogue dynamique avec les PNJ :** Les marchands ou habitants non-joueurs ont une personnalité générée par l'IA et réagissent aux choix du joueur en temps réel.
2. **Génération de quêtes et d'événements :** Le serveur Node.js peut interroger l'IA pour créer des mini-scénarios ou des événements aléatoires dans le monde (ex: une pénurie de matières premières, un festival).
3. **Journal de bord personnalisé :** Résumé automatique de la journée ou des actions du joueur généré sous forme de récit textuel.

---

## 5. Feuille de route (Roadmap de développement)
- [ ] **Étape 1 :** Initialisation du serveur Node.js + Connexion MySQL et création des tables.
- [ ] **Étape 2 :** Mise en place de Socket.io pour la connexion des joueurs et la synchronisation des déplacements.
- [ ] **Étape 3 :** Intégration de l'inventaire et du système monétaire (achats/ventes).
- [ ] **Étape 4 :** Connexion d'une API d'IA générative pour dialoguer avec un PNJ test.
- [ ] **Étape 5 :** Développement de l'interface client (Frontend).