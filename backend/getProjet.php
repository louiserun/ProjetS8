<?php

require_once 'helper.php';
require_once './mysql/projet.php';

$user_login = $_SESSION['id_organisateur'];

$res = projet::getprojets($user_login);
    
sendMessage($res);

?>