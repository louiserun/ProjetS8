<?php

require_once 'helper.php';
require_once './mysql/evenement.php';

$user_login = $_SESSION['id_organisateur'];

$res = evenement::getEvenements($user_login);
    
sendMessage($res);

?>