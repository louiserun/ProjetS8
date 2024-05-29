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

    public static function getEvenementById($id_evenement){
        global $connexion;

        $query = "SELECT * FROM evenement e
        WHERE e.id_evenement = :id_evenement";

        $statement = $connexion->prepare($query);
        $statement->bindParam(':id_evenement', $id_evenement, PDO::PARAM_STR);
        $statement->execute();
        $resultats = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $resultats;
    }

    public static function isEvenementOrga($id_evenement, $user_login){
        global $connexion;
        
        $query = "SELECT COUNT(*) AS count 
                FROM projet p 
                JOIN organisateur o ON p.id_organisateur = o.id_organisateur 
                JOIN evenement e ON e.id_projet = p.id_projet 
                WHERE e.id_evenement = :id_evenement 
                AND o.id_organisateur=:user_login";

        $statement = $connexion->prepare($query);
        $statement->bindParam(':id_evenement', $id_evenement, PDO::PARAM_STR);
        $statement->bindParam(':user_login', $user_login, PDO::PARAM_STR);
        $statement->execute();
        $resultats = $statement->fetchAll(PDO::FETCH_ASSOC);
        
        if ($resultats && isset($resultats[0]['count'])) {
            // Retournez uniquement la valeur de la clé "count"
            return $resultats[0]['count'] > 0;
        } else {
            // Retournez une valeur par défaut ou lancez une exception si aucun résultat n'a été trouvé
            return false;
        }
    }
    
}
?>