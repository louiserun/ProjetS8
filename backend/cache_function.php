<?php
session_start();

function storeTokenInSession($token) {
    $_SESSION['token'] = $token;
    error_log("token: $token");
}

function isTokenValid($token) {
    error_log("Token reçu: $token");
    // Vérifiez si le token est présent dans la session
    if (isset($_SESSION['token']) && $_SESSION['token'] === $token) {
        return true; // Token valide
    } else {
        error_log("Token attendu: " . $_SESSION['token']);
        return false; // Token non valide
    }
}
?>
