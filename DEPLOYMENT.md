# 🚀 Guide de Déploiement Gratuit (0 FCFA) : Vercel + Render
**ISSR Sainte Joséphine Bakhita — Yaoundé, Mvolyé**

Ce guide détaille pas à pas comment déployer gratuitement en production l'ensemble de l'écosystème :
- **Frontend Vitrine & Portails** : [Vercel](https://vercel.com) *(Next.js 15)*
- **Microservice CMS** : [Render](https://render.com) *(FastAPI Python)*
- **Microservice Scolarité & Admissions** : [Render](https://render.com) *(NestJS Node.js)*

---

## 📋 Prérequis (5 minutes)
1. Un compte gratuit sur [GitHub](https://github.com) avec le code du projet poussé sur votre dépôt (`git push`).
2. Un compte gratuit sur [Render.com](https://render.com) (connexion directe avec GitHub).
3. Un compte gratuit sur [Vercel.com](https://vercel.com) (connexion directe avec GitHub).

---

## ⚡ Étape 1 : Déployer les 2 Microservices sur Render (1 Clic)

Grâce au fichier `render.yaml` pré-configuré à la racine du projet, Render déploie automatiquement les deux services en une seule fois :

1. Connectez-vous sur votre tableau de bord [Render.com](https://dashboard.render.com).
2. Cliquez sur le bouton bleu **« New + »** en haut à droite, puis choisissez **« Blueprint »**.
3. Sélectionnez votre dépôt GitHub `issr-bakhita`.
4. Render détecte automatiquement le fichier `render.yaml` et affiche :
   - **Service 1** : `issr-bakhita-cms` (Python FastAPI)
   - **Service 2** : `issr-bakhita-school` (Node.js NestJS)
5. Cliquez sur **« Apply »**.
6. Render compile et démarre vos deux microservices. Une fois terminé, notez vos deux URLs gratuites sécurisées :
   - CMS API : `https://issr-bakhita-cms.onrender.com`
   - School API : `https://issr-bakhita-school.onrender.com`

---

## 🌐 Étape 2 : Déployer le Site Web sur Vercel

1. Connectez-vous sur votre tableau de bord [Vercel.com](https://vercel.com).
2. Cliquez sur **« Add New... »** > **« Project »**.
3. Importez votre dépôt GitHub `issr-bakhita`.
4. Dans les paramètres du projet avant de déployer :
   - **Framework Preset** : Next.js (sélectionné par défaut).
   - **Root Directory** : Cliquez sur *Edit* et sélectionnez le dossier **`apps/web`**.
   - **Environment Variables** : Déroulez la section et ajoutez les 2 variables obtenues à l'Étape 1 :
     - `NEXT_PUBLIC_CMS_API_URL` = `https://issr-bakhita-cms.onrender.com`
     - `NEXT_PUBLIC_SCHOOL_API_URL` = `https://issr-bakhita-school.onrender.com`
5. Cliquez sur le bouton **« Deploy »**.
6. En moins de 60 secondes, votre site est en ligne avec certificat SSL HTTPS mondial !

---

## 🔗 Étape 3 : Associer votre Nom de Domaine Personnalisé (Optionnel)

Pour associer votre nom de domaine officiel (ex. `issr-bakhita.org` ou `bakhita.ucac-icy.net`) :

1. Rendez-vous dans les paramètres de votre projet Vercel : **Settings > Domains**.
2. Saisissez votre domaine (ex. `issr-bakhita.org`).
3. Vercel vous donnera deux enregistrements DNS simples (un `CNAME` et un `A Record`) à coller chez votre bureau d'enregistrement.
4. Le certificat SSL Let's Encrypt sera généré et renouvelé automatiquement et gratuitement à vie.

---

## 🔄 Mise à Jour Continue Automatique (CI/CD)

- Chaque fois que vous apportez une modification et faites un `git push` sur GitHub :
  - **Vercel** redéploie le frontend automatiquement.
  - **Render** redéploie les microservices FastAPI et NestJS automatiquement.
- **Zéro commande manuelle à taper sur un serveur, zéro frais d'hébergement.**
