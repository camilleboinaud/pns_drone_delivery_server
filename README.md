PNS Drone Delivery Server
=========================

Drone Delivery Server est la partie serveur permettant la communication avec le drone.
Il basé sur la technologie Node.js et expose une interface HTTP respectant au mieux les principes
RESTs.

## Installation de Node.js

**Node.js**:
  - Depuis les pacquets Ubuntu:
```
sudo apt-get install nodejs
```
  - Depuis le repository nodesource:
```
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_5.x | sudo bash -
sudo apt-get install nodejs
sudo apt-get upgrade
sudo apt-get update
```

## Mise en place du serveur

* **Client Grunt**: Install grunt en global (utilisable sur tous les
projets node).
```
sudo npm install -g grunt-cli
```

* **Dépendances NPM**: Install les dépendances necessaires au projet vie le
fichier package.json
```
npm install
```

## Utilisation

Il est possible de d'initialiser la variable d'environnement PORT afin de définir
le port sur lequel le serveur écoutera les requêtes.
```
PORT=???? (n° désiré)
```

**Lancement du serveur** avec grunt. Cette commande permet également de relancer
automatiquement le serveur en cas de modification d'un fichier nécessaire  à son
fonctionnement.
```
grunt serve
```

## Membres

* **Rémy Dupanloup**:(mailto:remy.dupanloup@etu.unice.fr)
* **Clément Forneris**:(mailto:clement.forneris@etu.unice.fr)
* **Camille Boinaud**:(mailto:camille.boinaud@etu.unice.fr)
* **Pierre Leca**:(mailto:pierre.leca@etu.unice.fr)
