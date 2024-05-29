<?php

require_once 'helper.php';
require_once './mysql/evenement.php';
require_once './mysql/projet.php';

$user_login = $_SESSION['id_organisateur'];

$projets = projet::getProjets($user_login);
$projetsAvecEvenements = [];

foreach ($projets as $projet) {
    $id_projet = $projet['id_projet'];
    $evenements = evenement::getEvenementsProjet($id_projet);
    $projet['evenements'] = $evenements;
    $projetsAvecEvenements[] = $projet;
}

sendMessage($projetsAvecEvenements);

?>