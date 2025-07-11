# Présentation PowerPoint - Projet Djerba
## Système de Gestion Touristique

---

## Slide 1: Page de Titre
**Système de Gestion Touristique Djerba**
- Plateforme de réservation et gestion touristique
- Frontend: Angular + Backend: Spring Boot
- Projet de développement web complet

---

## Slide 2: Agenda
1. Contexte et objectifs
2. Architecture technique
3. Fonctionnalités principales
4. Interface utilisateur
5. Diagramme de classes
6. Démonstration

---

## Slide 3: Contexte et Objectifs
**Objectif**: Créer une plateforme complète de gestion touristique pour Djerba
- **Public cible**: Touristes et administrateurs
- **Besoins**: Réservation d'hôtels, découverte d'activités, restaurants et sites
- **Solution**: Application web full-stack avec interface admin

---

## Slide 4: Architecture Générale
**Architecture 3-Tiers**
- **Frontend**: Angular 18 (Interface utilisateur)
- **Backend**: Spring Boot (API REST)
- **Base de données**: MySQL/PostgreSQL
- **Communication**: API RESTful + JWT Authentication

---

## Slide 5: Technologies Utilisées
**Frontend**
- Angular 18, TypeScript, HTML5/CSS3
- Bootstrap pour le responsive design

**Backend**
- Spring Boot, Spring Security, Spring Data JPA
- JWT pour l'authentification
- Gradle pour la gestion des dépendances

**Base de données**
- JPA/Hibernate ORM
- Relations complexes entre entités

---

## Slide 6: Structure du Projet
```
Djerba/
├── FrontEnd/ (Angular)
│   ├── src/app/
│   └── angular.json
├── BackEnd/ (Spring Boot)
│   ├── src/main/java/
│   └── pom.xml
└── README.md
```

---

## Slide 7: Modèle de Données
**Entités principales**:
- User (Utilisateurs)
- Product (Classe abstraite)
- Hotel, Restaurant, Activity, Site (Héritent de Product)
- Booking (Réservations)
- Review, Rating (Évaluations)

---

## Slide 8: Système d'Authentification
**JWT (JSON Web Token)**
- Inscription/Connexion sécurisée
- Gestion des rôles (CUSTOMER, ADMIN)
- Token de réinitialisation de mot de passe
- Protection des endpoints sensibles

**Fonctionnalités**:
- Inscription utilisateur
- Connexion/Déconnexion
- Gestion de profil
- Réinitialisation mot de passe

---

## Slide 9: Gestion des Utilisateurs
**Entité User**:
- Informations personnelles (nom, prénom, email)
- Nationalité et photo de profil
- Système de rôles (Customer/Admin)
- Relations avec Reviews, Ratings, Bookings

**Validation**:
- Email unique
- Contraintes de taille sur les champs
- Validation côté client et serveur

---

## Slide 10: Affichage des Hôtels
**Fonctionnalités d'affichage**:
- Liste complète des hôtels
- Filtrage par étoiles, prix, disponibilité
- Détails complets (amenités, photos, localisation)
- Système de notation et avis

**Caractéristiques des hôtels**:
- Classification par étoiles (1-5)
- Gestion des places disponibles
- Tarifs avec réductions par âge
- Photos et descriptions détaillées

---

## Slide 11: Système de Réservation
**Processus de réservation**:
1. Sélection des dates
2. Choix du nombre de personnes par catégorie
3. Calcul automatique du prix avec réductions
4. Confirmation de réservation

**Gestion des réservations**:
- Statuts: PENDING, CONFIRMED, CANCELLED, COMPLETED
- Historique des réservations
- Réductions automatiques (bébés, enfants, ados)

---

## Slide 12: CRUD Administration
**Panel d'administration complet**:
- Gestion des hôtels (Create, Read, Update, Delete)
- Gestion des restaurants
- Gestion des activités
- Gestion des sites touristiques

**Fonctionnalités admin**:
- Interface dédiée pour chaque type de produit
- Upload de photos multiples
- Gestion des prix et disponibilités
- Modération des avis et notes

---

## Slide 13: Gestion des Activités
**Entité Activity**:
- Hérite de la classe Product
- Même structure que les autres produits
- Gestion via interface d'administration

**Fonctionnalités**:
- Création d'activités touristiques
- Description et photos
- Localisation et contact
- Système de notation

---

## Slide 14: Gestion des Sites Touristiques
**Entité Site**:
- Sites historiques et touristiques de Djerba
- Informations détaillées et photos
- Localisation précise
- Avis et recommandations

**Administration**:
- CRUD complet depuis le panel admin
- Gestion des informations touristiques
- Upload de photos multiples

---

## Slide 15: Gestion des Restaurants
**Entité Restaurant**:
- Type de cuisine
- Menu détaillé avec prix
- Calcul automatique du prix moyen
- Photos et descriptions

**Fonctionnalités spéciales**:
- Gestion des menus (MenuItem)
- Calcul automatique du prix moyen des plats
- Classification par type de cuisine

---

## Slide 16: Vue des Produits
**Catalogue unifié**:
- Affichage de tous les produits (hôtels, restaurants, activités, sites)
- Filtrage par type et critères
- Recherche textuelle
- Tri par note, prix, popularité

**Interface utilisateur**:
- Cards responsive pour chaque produit
- Photos, descriptions, notes
- Boutons d'action contextuels

---

## Slide 17: Interface Client
**Expérience utilisateur optimisée**:
- Design responsive (mobile-first)
- Navigation intuitive
- Processus de réservation simplifié
- Profil utilisateur personnalisé

**Fonctionnalités**:
- Historique des réservations
- Avis et notes données
- Favoris et recommandations

---

## Slide 18: Panel d'Administration
**Interface de gestion complète**:
- Dashboard avec statistiques
- Gestion de tous les produits
- Modération des avis
- Gestion des utilisateurs et réservations

**Accès sécurisé**:
- Authentification admin requise
- Permissions granulaires
- Logs d'activité

---

## Slide 19: Diagramme de Classes UML
[Le diagramme de classes généré précédemment sera inséré ici]

**Relations principales**:
- Product (classe abstraite) → Hotel, Restaurant, Activity, Site
- User → Booking, Review, Rating
- Hotel → Booking
- Restaurant → MenuItem

---

## Slide 20: Relations entre Entités
**Héritage**:
- Product → Hotel, Restaurant, Activity, Site

**Associations**:
- User (1) → (N) Booking, Review, Rating
- Hotel (1) → (N) Booking
- Restaurant (1) → (N) MenuItem

**Enums**:
- Role: CUSTOMER, ADMIN
- BookingStatus: PENDING, CONFIRMED, CANCELLED, COMPLETED

---

## Slide 21: API REST et Endpoints
**Endpoints principaux**:
- `/api/auth/*` - Authentification
- `/api/users/*` - Gestion utilisateurs
- `/api/hotels/*` - Gestion hôtels
- `/api/restaurants/*` - Gestion restaurants
- `/api/activities/*` - Gestion activités
- `/api/sites/*` - Gestion sites
- `/api/bookings/*` - Gestion réservations

**Méthodes HTTP**: GET, POST, PUT, DELETE pour CRUD complet

---

## Slide 22: Sécurité et Authentification
**Sécurité mise en place**:
- JWT Token-based authentication
- Protection CORS configurée
- Validation des données d'entrée
- Gestion des rôles et permissions

**Configuration Spring Security**:
- Endpoints publics et protégés
- Middleware de validation JWT
- Gestion des erreurs d'authentification

---

## Slide 23: Fonctionnalités Réalisées
✅ **Complétées**:
- Système d'authentification JWT
- CRUD complet pour tous les produits
- Système de réservation d'hôtels
- Panel d'administration
- Interface utilisateur responsive
- API REST complète

**Architecture solide et extensible**

---

## Slide 24: Perspectives d'Évolution
**Améliorations futures**:
- Système de paiement en ligne
- Notifications en temps réel
- Application mobile (React Native)
- Géolocalisation avancée
- Recommandations AI
- Système de chat client-admin

---

## Slide 25: Questions et Démonstration
**Démonstration live**:
- Interface utilisateur
- Processus de réservation
- Panel d'administration
- API endpoints

**Questions & Réponses**

---

## Notes pour la présentation:
- Préparer des captures d'écran de l'interface
- Démonstration en live du système
- Expliquer les choix techniques
- Montrer le code source des parties importantes
- Préparer des données de test pour la démo
