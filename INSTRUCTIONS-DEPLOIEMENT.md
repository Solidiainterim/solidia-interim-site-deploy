# Mettre ce dépôt en ligne (déploiement automatique OVH)

Ce dossier est une version allégée du site : uniquement les fichiers qui doivent être publiés en ligne (HTML, CSS, JS, images, `contact-handler.php`). Il ne contient ni le code Python, ni les documents internes — ceux-là restent dans le dépôt de sauvegarde complet livré précédemment.

## Étape 1 — Créer un dépôt vide sur GitHub

1. Aller sur https://github.com/new
2. Nom suggéré : `solidia-interim-site-deploy`
3. **Visibilité recommandée : Public.** Ce dépôt ne contient que ce qu'un visiteur du site peut déjà voir dans son navigateur (rien de confidentiel) — le choix Public évite une étape technique supplémentaire (clé SSH) pour que le déploiement automatique fonctionne. Vous pouvez choisir Privé si vous préférez, il faudra juste une étape en plus décrite à la fin de ce document.
4. **Ne cochez aucune case** ("Add a README", etc.) — le dépôt doit être vide.
5. Copier l'URL affichée (`https://github.com/votre-compte/solidia-interim-site-deploy.git`)

## Étape 2 — Pousser ce dossier dessus

Ouvrir un terminal dans ce dossier (celui qui contient `index.html`) et lancer :

```
git remote add origin https://github.com/votre-compte/solidia-interim-site-deploy.git
git branch -M main
git push -u origin main
```

## Étape 3 — Me donner l'URL

Une fois poussé, donnez-moi l'URL du dépôt (`https://github.com/votre-compte/solidia-interim-site-deploy.git`) — je configure ensuite OVH pour qu'il se synchronise automatiquement dessus. À partir de là, chaque `git push` sur ce dépôt republiera le site en ligne sans autre intervention.

## Si vous avez choisi "Privé"

Une fois le dépôt créé en privé, dites-le-moi : je récupérerai depuis OVH une clé SSH publique à ajouter dans les réglages du dépôt GitHub (Settings → Deploy keys → Add deploy key), puis on utilisera l'adresse SSH (`git@github.com:votre-compte/solidia-interim-site-deploy.git`) à la place de l'adresse HTTPS pour la connexion à OVH. Rien de confidentiel n'est échangé dans cette étape — une clé publique n'est pas un mot de passe.
