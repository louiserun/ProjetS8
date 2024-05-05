<?php
// Inclure le fichier de connexion
require_once('mysqlConnect.php');
if(isset($_POST['login'])) {
    $login = $_POST['login'];
    try{
        // Préparation de la requête pour récupérer tous les user
        $query = "SELECT * FROM user";
        $statement = $connexion->prepare($query);
        $statement->execute();
    
        // Récupération de tous les utilisateurs sous forme de tableau associatif
        $user = $statement->fetchAll(PDO::FETCH_ASSOC);
        
        // Affichage du champ "login"
        echo "<h2>Champ 'login' soumis :</h2>";
        echo "<p>Login : $login</p>";

        // Affichage des utilisateurs
        if (count($user) > 0) {
            echo "<h2>Liste des utilisateurs :</h2>";
            echo "<ul>";
            foreach ($user as $user) {
                echo "<li>{$user['login']} - {$user['pwd']} - {$user['role']}</li>";
            }
            echo "</ul>";
        } else {
            echo "Aucun utilisateur trouvé.";
        }
    } catch(PDOException $e) {
        // En cas d'erreur lors de la connexion
        echo "Erreur de connexion à la base de données : " . $e->getMessage();
    }
}else{
    echo "Veuillez soumettre le champ 'login' via POST.";
}
?>