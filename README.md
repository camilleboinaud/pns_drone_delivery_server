PNS Drone Delivery Server
=========================

Drone Delivery Server est la partie serveur permettant la communication avec le drone.
Il basé sur la technologie Node.js et expose une interface HTTP respectant au mieux les principes
RESTs.

## Installation de Node.js & MongoDB

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

**MongoDB**:
  - Depuis les pacquets Ubuntu:
```
sudo apt-get install mongodb
mongod
```

  - Depuis le site officiel:
https://www.mongodb.org/downloads#production
```
wget https://fastdl.mongodb.org/linux/(archive-version)
tar -xvzf (archive-version).jar
./(path to folder)/bin/mongod
```

## Mise en place du serveur

* **Client Grunt**: Install grunt en global (utilisable sur tous les
projets node).
```
sudo npm install -g grunt-cli
```

* **Dépendances Npm**: Install les dépendances nécessaires au projet via le
fichier package.json
```
npm install
```

## Utilisation

Il est possible de d'initialiser la variable d'environnement PORT afin de définir
le port sur lequel le serveur écoutera les requêtes Http.
```
PORT=???? (n° désiré)
```

**Lancement du serveur** avec grunt. Cette commande permet également de relancer
automatiquement le serveur en cas de modification d'un fichier nécessaire à son
fonctionnement.
```
grunt serve
```

Une version de ce serveur est également déployé à l'url suivante:</br>
http://ec2-52-49-153-103.eu-west-1.compute.amazonaws.com:8080/

## Membres

* **Rémy Dupanloup**: remy.dupanloup@etu.unice.fr
* **Clément Forneris**: clement.forneris@etu.unice.fr
* **Camille Boinaud**: camille.boinaud@etu.unice.fr
* **Pierre Leca**: pierre.leca@etu.unice.fr
