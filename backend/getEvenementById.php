<?php

require_once 'helper.php';
require_once './mysql/evenement.php';

if(!array_key_exists('id_evenement', $_REQUEST)) sendError('Vous devez selectioner un évènement');

$user_login = $_SESSION['id_organisateur'];
$id_evenement = $_REQUEST['id_evenement'];

if(! evenement::isEvenementOrga($id_evenement, $user_login)) sendError("Vous n'avez pas cet évènement");

$res = evenement::getEvenementById($id_evenement);

sendMessage($res);