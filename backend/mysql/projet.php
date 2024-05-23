<?php

require_once 'mysqlConnect.php';

class projet {
    public static function getProjets($user_login){
        global $connexion;

        $query = "SELECT * FROM projet p
        JOIN organisateur o ON o.id_organisateur = p.id_organisateur
        WHERE o.id_organisateur = :user_login";

        $statement = $connexion->prepare($query);
        $statement->bindParam(':user_login', $user_login, PDO::PARAM_STR);
        $statement->execute();
        $resultats = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $resultats;
    }

}
?>