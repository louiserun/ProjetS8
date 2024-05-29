<?php
require_once "./evenement.php";
require_once "./participant.php";
require_once "./presence.php";
require_once "./helper.php";

//verification nom evenement existant
if(empty(($_POST['nom_ev']))){
    sendError("Pas de nom pour le nouvel evenement");
}

// //verification qu'aucun évènement existant n'a le meme nom
// if(evenement_exist($connexion, $_POST['nom_ev'])){
//     sendError("Un évènement du même nom existe déjà.");
// }

// print_r("coucou");

$nomEv = $_POST['nom_ev'];
$lieu = $_POST['lieu'];
$date_deb = $_POST['date_deb'];
$date_fin = $_POST['date_fin'];
$heure_deb = $_POST['heure_deb'];
$heure_fin = $_POST['heure_fin'];
$id_projet = $_POST['id_projet'];
$participants_json = $_POST['participants_tab'];

$id_ev = ajout_evenement($connexion, $nomEv, $lieu, $date_deb, $date_fin, $heure_deb, $heure_fin, $id_projet);

if($id_ev == NULL){
    sendError("Echec de l'ajout de l'évènement");
}

$participants_array = json_decode($participants_json, true);

if($participants_array==NULL){
    sendError("Erreur lors de la lecture de la liste des participants en format Json");
}

foreach($participants_array as $participant){
    print_r("coucou2");
    $id_presence = creation_presence($connexion, 0, "00:00:00",$id_ev);
    if($id_presence==NULL){
        sendError("Echec de la création d'une présence.");
    }
    else{
        print_r("presence créée");
    }
    $id_participant = creation_participant($connexion, $participant['nom'], $participant['prenom'],$id_presence);
    if($id_participant==NULL){
        sendError("Echec de la creation d'un participant.");
    }
}

$data['id_ev'] = $id_ev;
sendMessage($data);
