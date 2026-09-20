# 🚀 Guide Complet de Déploiement cPanel
**Écosystème Numérique ISSR Sainte Joséphine Bakhita — Yaoundé, Mvolyé**

Ce guide vous accompagne pas à pas pour déployer l'intégralité de l'écosystème sur un hébergement web administré avec **cPanel**.

---

## 🏛️ Architecture du Déploiement sur cPanel

L'architecture est structurée autour de votre nom de domaine principal et de deux sous-domaines dédiés aux APIs :

```
                                  [ VOTRE DOMAINE ]
                               (ex: issr-bakhita.org)
                                          │
            ┌─────────────────────────────┼─────────────────────────────┐
            ▼                             ▼                             ▼
   [ Site Web & Portails ]       [ API Scolarité & Auth ]       [ API CMS & Contenus ]
      issr-bakhita.org            api-school.issr-bakhita.org     api-cms.issr-bakhita.org
    Dossier: public_html/            Dossier: api-school/            Dossier: api-cms/
   Export Next.js + .htaccess       NestJS (Setup Node.js)       FastAPI (Setup Python)
```

---

## ⚡ Étape 0 : Générer les Archives en 1 Commande Locale

Un script d'automatisation [package-cpanel.sh](file:///home/likali/Public/issr-bakhita/package-cpanel.sh) a été préparé à la racine du projet.

Exécutez simplement la commande suivante sur votre machine en remplaçant par vos vrais domaines :

```bash
./package-cpanel.sh "https://issr-bakhita.org" "https://api-cms.issr-bakhita.org" "https://api-school.issr-bakhita.org"
```

Le script génère automatiquement 3 fichiers prêts pour cPanel dans le dossier `cpanel-bundles/` :
1. **`public_html.zip`** : Tout le site Next.js pré-compilé avec son fichier `.htaccess` de routage et de sécurité.
2. **`school-service.zip`** : Le microservice NestJS compilé (`dist/`) avec `app.js` et `package.json`.
3. **`cms-service.zip`** : Le microservice FastAPI Python avec `passenger_wsgi.py` et `requirements.txt`.

---

## 🌐 Étape 1 : Créer les Sous-Domaines dans cPanel

1. Connectez-vous à votre tableau de bord **cPanel**.
2. Dans la section **Domaines** (Domains), cliquez sur **Domaines** ou **Sous-domaines**.
3. Créez les deux sous-domaines suivants :
   - **Sous-domaine 1** : `api-school`
     - Domaine : `issr-bakhita.org`
     - Racine du document (Document Root) : `api-school`
   - **Sous-domaine 2** : `api-cms`
     - Domaine : `issr-bakhita.org`
     - Racine du document (Document Root) : `api-cms`

---

## 🖥️ Étape 2 : Déployer le Site Web & Portails (`public_html`)

Le site web vitrine et les portails d'administration bénéficient d'un **export statique optimisé** :
- **0 Mo de RAM consommée** sur le serveur.
- Temps de chargement instantané servi directement par Apache / LiteSpeed.
- Aucune dépendance à un processus Node.js pour les visiteurs.

### Procédure :
1. Dans cPanel, ouvrez le **Gestionnaire de Fichiers** (File Manager).
2. Rendez-vous dans le dossier **`public_html`**.
3. *(Si le dossier contient des fichiers par défaut comme index.php ou cgi-bin inutiles, vous pouvez les supprimer ou les archiver).*
4. Cliquez sur **Charger** (Upload) en haut et téléversez **`cpanel-bundles/public_html.zip`**.
5. De retour dans le gestionnaire, sélectionnez `public_html.zip` et cliquez sur **Extraire** (Extract).
6. Vérifiez la présence du fichier **`.htaccess`** (si masqué, activez *Afficher les fichiers masqués / Show Hidden Files* dans les paramètres de la roue crantée en haut à droite).
7. 🎉 **Votre site web est immédiatement visible à l'adresse de votre domaine !**

---

## 🔒 Étape 3 : Déployer le Service NestJS (`api-school`)

1. Dans le **Gestionnaire de Fichiers** de cPanel :
   - Ouvrez le dossier `api-school/`.
   - Téléversez le fichier **`cpanel-bundles/school-service.zip`** et extrayez son contenu.
2. Revenez à l'accueil cPanel et cherchez **Setup Node.js App** (dans la section *Logiciels / Software*).
3. Cliquez sur **Create Application** :
   - **Node.js version** : Sélectionnez **20.x** ou **22.x**.
   - **Application mode** : `Production`.
   - **Application root** : `api-school`.
   - **Application URL** : Sélectionnez `api-school.issr-bakhita.org`.
   - **Application startup file** : `app.js`.
4. Cliquez sur **Create** (en haut à droite).
5. Une fois l'application créée :
   - Descendez à la section **Detected configuration files**.
   - Cliquez sur le bouton bleu **Run NPM Install** pour installer les dépendances de production.
   - Cliquez ensuite sur **Restart**.
6. Testez dans votre navigateur : rendez-vous sur `https://api-school.issr-bakhita.org/api/school/health` (ou `/api/school/auth/roles`). L'API répond en JSON !

---

## 🐍 Étape 4 : Déployer le Service FastAPI CMS (`api-cms`)

1. Dans le **Gestionnaire de Fichiers** de cPanel :
   - Ouvrez le dossier `api-cms/`.
   - Téléversez le fichier **`cpanel-bundles/cms-service.zip`** et extrayez son contenu.
2. Revenez à l'accueil cPanel et cherchez **Setup Python App** (dans la section *Logiciels / Software*).
3. Cliquez sur **Create Application** :
   - **Python version** : Sélectionnez **3.10**, **3.11** ou **3.12**.
   - **Application root** : `api-cms`.
   - **Application URL** : Sélectionnez `api-cms.issr-bakhita.org`.
   - **Application startup file** : `passenger_wsgi.py`.
   - **Application Entry point** : `application`.
4. Cliquez sur **Create**.
5. Une fois l'application créée :
   - Dans la section **Configuration files**, écrivez `requirements.txt` dans le champ puis cliquez sur **Add**.
   - Cliquez ensuite sur **Run Pip Install**. cPanel va installer automatiquement FastAPI, uvicorn, pydantic et a2wsgi dans l'environnement virtuel dédié.
   - Cliquez sur **Restart**.
6. Testez dans votre navigateur : rendez-vous sur `https://api-cms.issr-bakhita.org/docs` pour voir la documentation Swagger interactive de l'institut !

---

## 🛡️ Étape 5 : Activer le Certificat SSL Gratuit (HTTPS)

1. Dans cPanel, cherchez **SSL/TLS Status** (ou **Let's Encrypt SSL**).
2. Cochez votre domaine principal ainsi que les deux sous-domaines `api-school` et `api-cms`.
3. Cliquez sur **Run AutoSSL**.
4. En quelques minutes, un certificat officiel SSL Let's Encrypt est installé et sera renouvelé gratuitement à vie.

---

## 💡 Solution Alternative : Hébergement Mutualisé Basique (Sans Node/Python)

Si votre hébergement cPanel actuel est un hébergement mutualisé standard ne disposant pas de *Setup Node.js App* ou *Setup Python App* :
- Déployez le **Frontend** dans `public_html/` de votre cPanel comme indiqué à l'Étape 2.
- Laissez les deux microservices tourner gratuitement sur **Render** (via le fichier [render.yaml](file:///home/likali/Public/issr-bakhita/render.yaml) déjà configuré).
- Lors de l'exécution du script de packaging, fournissez les URLs Render :
  ```bash
  ./package-cpanel.sh "https://issr-bakhita.org" "https://issr-bakhita-cms.onrender.com" "https://issr-bakhita-school.onrender.com"
  ```
- **Résultat** : Votre site s'affiche fièrement sur votre propre nom de domaine cPanel (`issr-bakhita.org`) et communique en toute transparence avec les APIs sans que personne ne s'en rende compte !
