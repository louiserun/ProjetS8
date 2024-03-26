<?php

require_once 'mysqlConnect.php';

class courses {
    public static function getUsernameOrga(){
        global $connexion;

        $query = "SELECT * FROM organisateur WHERE username = :username";

        $statement = $connexion->prepare($query);
        $statement->bindParam(':username', $organisateur_username, PDO::PARAM_STR);
        $statement->execute();
        $resultats = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $resultats;
    }
}
?>