# ProjetS8

UTILISATION DE L'APPLICATION :

Les différentes pages:

- Connexion : entrer username et password de connexion pour accéder à l'application en tant qu'organisateur.

- Accueil : pour visualiser les évènements crées à venir/ passés de l'organisateur.
    Deux boutons : 
        (1)Feuille de présence: pour visualiser l'ensemble des participants et leurs statut d'emargement pour l'évènement en question.
        (2)Generer QRcode: pour visualiser le QR code de l'évènement qui sera donné aux participant pour pouvoir émarger.

- Evènement : pour création d'un évènement
    Il faut entrer un nom d'évènement, une date de début et une date de fin, un lieu puis un fichier excel avec tous les participants (Nom et Prénom).
    Format du fichier excel : 
        Première ligne : colonne 1 ou 2 "Nom" et colonne 1 ou 2 "Prenom"
        le reste des lignes contient tous les couple Nom/Prenom des participants à l'évènement.
        -> voir le fichier test.xlsx pour exemple

- Lien du QR code : Mène vers une page pour l'émargement (pour les participants). Les participants auront alors juste besoin d'entrer leur Nom et leur Prenom pour changer dans la base de donnée dans présence, leur statut d'emargement (de 0 à 1 si emargmeent effectué avec succès).


- Projet (non réaliser encore) : visualisation des différents projet crées et possibilité de visualiser les différents évènements appartenant à un même projet.



BACK :

---Requetes BDD---

evenement.php :
    getEvenements($user_login)
    getEvenementsProjet($id_projet)
    getEvenementById($id_evenement)
    isEvenementOrga($id_evenement, $user_login)
    evenement_exist($connexion, $nomevenement)
    ajout_evenement($PDO, $nomEv, $lieu, $date_deb, $date_fin, $heure_deb, $heure_fin, $id_projet)

organisateur.php :
    getUsernameOrga()
    getNomPrenomOrga($user_login)

participant.php :
    isPres($id_evenement, $nom_participant, $prenom_participant)
    creation_participant($connexion, $nom_participant, $prenom_participant, $id_presence)
    recuperer_participant_pres($PDO, $id_presence)

presence.php :
    function creation_presence($connexion, $statut_emargement, $heure_emargement, $id_evenement)
    function recuperer_presences($PDO, $id_ev)

projet.php :

    getProjets($user_login)
    getIdProjets($user_login)



---Logique appelée par le front---

pour l'authentification : checkLogin.php

pour création d'évènement : creaEv.php

pour confirmation de présence : confirmPres.php

pour générer_qr_code : getEvenementById.php

pour visualiser listeemargement : listem.php

pour visualiser Projet et évènements sur la page d'accueil : getEvenementsProjet.php