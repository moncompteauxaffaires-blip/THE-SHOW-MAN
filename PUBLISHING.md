# 📱 Guide de Publication - THE SHOW MAN

## 🌐 Web (GitHub Pages) - ACTIF

**Statut** : ✅ En ligne  
**URL** : https://moncompteauxaffaires-blip.github.io/THE-SHOW-MAN

### Configuration requise :
1. Repo doit être **PUBLIC** ✅
2. GitHub Pages activé dans Settings → Pages
3. Deploy from branch : **main**
4. Folder : **/root**

---

## 🎮 Android / F-Droid

### Étape 1 : Créer la Keystore (une seule fois)

```bash
# Windows
keytool -genkey -v -keystore the-show-man.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias the-show-man

# macOS/Linux
keytool -genkey -v -keystore the-show-man.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias the-show-man
```

Remplis les infos :
- Mot de passe : [Crée un mot fort]
- Prénom/Nom : Bart Le Comedien
- Organisation : THE SHOW MAN
- Ville : [Ta ville]
- Pays : FR

**Résultat** : `the-show-man.keystore` ✅

### Étape 2 : Builder l'APK Signé

**Via Android Studio** :
1. Build → Generate Signed Bundle / APK
2. APK → Next
3. Keystore Path : Sélectionne `the-show-man.keystore`
4. Alias : `the-show-man`
5. Release → Finish

**Résultat** : `app/release/app-release.apk` ✅

### Étape 3 : Uploader sur GitHub Releases

```bash
# Crée une release
# Releases → Create a new release
# Tag: v1.0
# Title: THE SHOW MAN v1.0
# Upload: app-release.apk
```

**URL Finale** :
```
https://github.com/moncompteauxaffaires-blip/THE-SHOW-MAN/releases/download/v1.0/app-release.apk
```

### Étape 4 : Publier sur F-Droid

1. Va sur https://f-droid.org/
2. **Contribute** → **Submit an App**
3. Remplis le formulaire :
   - Package ID : `com.moncompteauxaffairesblip.theshowman`
   - GitHub URL : https://github.com/moncompteauxaffaires-blip/THE-SHOW-MAN
   - APK URL : Ton lien GitHub Release
4. Valide la soumission
5. Attends la review (3-7 jours)

**URL Finale** :
```
https://f-droid.org/packages/com.moncompteauxaffairesblip.theshowman
```

---

## 📊 Récapitulatif des Plateformes

| Plateforme | Coût | Statut | URL |
|-----------|------|--------|-----|
| **Web** | 🆓 Gratuit | ✅ Actif | https://moncompteauxaffaires-blip.github.io/THE-SHOW-MAN |
| **GitHub Releases** | 🆓 Gratuit | ⏳ À faire | https://github.com/.../releases |
| **F-Droid** | 🆓 Gratuit | ⏳ À faire | https://f-droid.org/packages/... |

---

## ⚠️ Points Importants

- Ne JAMAIS commit la keystore sur GitHub
- Keystore est dans `.gitignore` ✅
- Garde ton mot de passe de keystore en sécurité
- À chaque version, utilise le même alias et keystore

---

## 🚀 Prochaines étapes

1. [ ] Rendre le repo PUBLIC
2. [ ] Activer GitHub Pages
3. [ ] Créer la Keystore
4. [ ] Builder l'APK signé
5. [ ] Uploader sur GitHub Releases
6. [ ] Soumettre à F-Droid

Questions ? Besoin d'aide avec une étape spécifique ?
