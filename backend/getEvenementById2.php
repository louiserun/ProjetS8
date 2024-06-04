<?php

require_once 'helper2.php';
require_once './mysql/evenement.php';

if(!array_key_exists('id_evenement', $_REQUEST)) sendError(' ');

$id_evenement = $_REQUEST['id_evenement'];

$res = evenement::getEvenementById($id_evenement);

sendMessage($res);