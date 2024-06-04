<?php

// Autoriser les requêtes Cross-Origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type:application/json;charset=utf8');

// Inclure le fichier cache_functions.php
include 'cache_function.php';

// Vérifiez que la méthode HTTP est POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Méthode non autorisée
    exit();
}

// Vérifiez si les données sont envoyées via multipart/form-data
if (empty($_POST)) {
    http_response_code(400); // Requête incorrecte
    $response = ['status' => 'error', 'message' => 'No data received'];
    echo json_encode($response);
    exit();
}

// Récupérez les données POST
$data = $_POST;

// Vérifiez que les données nécessaires sont présentes
if (!isset($data['token'])) {
    http_response_code(400); // Requête incorrecte
    $response = ['status' => 'error', 'message' => 'Missing token'];
    echo json_encode($response);
    exit();
}

// Vérifiez la validité du token
if (!isTokenValid($data['token'])) {
    http_response_code(401); // Non autorisé
    $response = ['status' => 'error', 'message' => 'Invalid token'];
    echo json_encode($response);
    exit();
}

// Si le token est valide, continuez avec le traitement
// Stockez le token dans la session
storeTokenInSession($data['token']);

// Réponse JSON
$response = ['status' => 'ok'];
header('Content-Type: application/json');
echo json_encode($response);

?>
