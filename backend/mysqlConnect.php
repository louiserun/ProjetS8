
<?php
// Inclure les paramètres de connexion
require_once('config.php');
try {
    // Connexion à la base de données MySQL avec PDO
    $connexion = new PDO("mysql:host=$mysqlHost;dbname=$mysqlDatabase", $mysqlLogin, $mysqlPassword);
    // Configuration des options de PDO
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    // En cas d'erreur lors de la connexion
}
?>

