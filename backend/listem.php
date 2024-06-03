<?php
require_once "./helper.php";
require_once "./presence.php";


$id_ev = $_POST['id_ev'];

$participants_afficher = recuperer_presences($connexion, $id_ev);

sendMessage($participants_afficher);