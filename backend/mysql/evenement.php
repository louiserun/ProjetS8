<?php

require_once 'mysqlConnect.php';

class evenement {
    public static function getEvenements($user_login){
        global $connexion;

        $query = "SELECT * FROM evenement e
        JOIN projet p ON e.id_projet = p.id_projet 
        JOIN organisateur o ON o.id_organisateur = p.id_organisateur
        WHERE o.id_organisateur = :user_login";

        $statement = $connexion->prepare($query);
        $statement->bindParam(':user_login', $user_login, PDO::PARAM_STR);
        $statement->execute();
        $resultats = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $resultats;
    }

    public static function getEvenementsProjet($id_projet){
        global $connexion;

        $query = "SELECT * FROM evenement e
        WHERE e.id_projet = :id_projet";

        $statement = $connexion->prepare($query);
        $statement->bindParam(':id_projet', $id_projet, PDO::PARAM_STR);
        $statement->execute();
        $resultats = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $resultats;
    }

}
?>