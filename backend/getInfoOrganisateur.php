<?php
// getCourses.php

require_once 'helper.php';
require_once './mysql/organisateur.php';

$user_login = $_SESSION['id_organisateur'];

$res = organisateur::getNomPrenomOrga($user_login);

sendMessage($res);

?>