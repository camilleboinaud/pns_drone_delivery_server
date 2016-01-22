# pns_drone_delivery_server

Dans le dossier pns_drone_delivery_server/

Première étape (à réaliser une seule fois) :
    - install grunt client en global :
      sudo npm install -g grunt-cli

lancer la commande :
      sudo npm install
cette commande installe toute les dépendences necessaire à node pour lancer
le serveur.

ensuite on utilise Grunt pour gérer le serveur.

grunt serve

Lance le serveur http, si une modification à lieu dans un fichier javascript
grunt stop automatiquement le serveur et le relance en prennant en compte
les nouvelles modifications.
