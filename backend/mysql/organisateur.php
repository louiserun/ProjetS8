<?php

require_once 'mysqlConnect.php';

<<<<<<< HEAD
class organisateur {
=======
class courses {
>>>>>>> 7971643181352f486ab036b53bb5f8e1c4a31632
    public static function getUsernameOrga(){
        global $connexion;

        $query = "SELECT * FROM organisateur WHERE username = :username";

        $statement = $connexion->prepare($query);
        $statement->bindParam(':username', $organisateur_username, PDO::PARAM_STR);
        $statement->execute();
        $resultats = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $resultats;
    }
<<<<<<< HEAD

    public static function getNomPrenomOrga($user_login){
        global $connexion;

        $query = "SELECT nom, prenom FROM organisateur WHERE id_organisateur = :user_login";

        $statement = $connexion->prepare($query);
        $statement->bindParam(':user_login', $user_login, PDO::PARAM_STR);
        $statement->execute();
        $resultats = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $resultats;
    }

=======
>>>>>>> 7971643181352f486ab036b53bb5f8e1c4a31632
}
?>