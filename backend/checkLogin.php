<?php

    require_once 'auth.php';
    require_once 'helper.php';

    // Vérifier que la requête est bien un POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendError('Invalid request method');
    }

    // Vérifier que les champs login et password sont présents dans $_POST
    if (!isset($_POST['username']) || !isset($_POST['password'])) {
        sendError('Missing login or password');
    }

    if(authenticate()){
        sendMessage('vous êtes connecté');
    }
    else {
        sendError('mot de passe ou identifiant incorrect');
    }


?>