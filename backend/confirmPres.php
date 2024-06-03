<?php

require_once 'helper2.php';
require_once '../backend/mysql/participant.php';

if (!isset($_REQUEST['id_evenement']) || !isset($_REQUEST['nom_participant']) || !isset($_REQUEST['prenom_participant'])) {
    sendError('Il manque des informations.');
}

$id_evenement = $_REQUEST['id_evenement'];
$nom = $_REQUEST['nom_participant'];
$prenom = $_REQUEST['prenom_participant'];

$res = participant::isPres($id_evenement, $nom, $prenom);

sendMessage($res);
