<?php
require_once "./evenement.php";
require_once "./participant.php";
require_once "./presence.php";
require_once "./helper.php";

//verification nom evenement existant
// if(empty(($_POST['nom_ev']))){
//     sendError("Pas de nom pour le nouvel evenement");
// }

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
$participants = $_POST['participant_tab'];

$id_ev = ajout_evenement($connexion, $nomEv, $lieu, $date_deb, $date_fin, $heure_deb, $heure_fin, 0);

if($id_ev == NULL){
    sendError("Echec de l'ajout de l'évènement");
}
$participant_tab = explode(",",$participants);

if($participant_tab==NULL){
    sendError("Erreur lors de la lecture de la liste des participants.");
}


if($participant_tab[0] === "Prenom" && $participant_tab[1] === "Nom"){
    $iprenom = 2;
    $inom = 3;
}
else if($participant_tab[1] === "Prenom" && $participant_tab[0] === "Nom")
{
    $iprenom = 3;
    $inom = 2;
}
else{
    sendError("Problème dans les indices de la première ligne prenom, nom.");
}


$nbelementstab = count($participant_tab);
while($iprenom < $nbelementstab && $inom < $nbelementstab){
    $prenompart = $participant_tab[$iprenom];
    $nompart = $participant_tab[$inom];
    $id_presence = creation_presence($connexion, 0, "00:00:00",$id_ev);
    if($id_presence==NULL){
        sendError("Echec de la création d'une présence.");
    }
    $id_participant = creation_participant($connexion, $nompart, $prenompart,$id_presence);

    $iprenom += 2;
    $inom += 2;
}

$data['id_ev'] = $id_ev;
sendMessage($data);
