<?php

require_once 'mysqlConnect.php';

class participant {
    public static function isPres($id_evenement, $nom_participant, $prenom_participant){
        global $connexion;

        $query = "SELECT COUNT(*) AS count 
        FROM participant p 
        JOIN presence pr ON p.id_presence = pr.id_presence 
        JOIN evenement e ON pr.id_evenement = e.id_evenement 
        WHERE e.id_evenement = :id_evenement
        AND p.nom_participant=:nom_participant
        AND p.prenom_participant=:prenom_participant";

        $statement = $connexion->prepare($query);
        $statement->bindParam(':nom_participant', $nom_participant, PDO::PARAM_STR);
        $statement->bindParam(':prenom_participant', $prenom_participant, PDO::PARAM_STR);
        $statement->bindParam(':id_evenement', $id_evenement, PDO::PARAM_STR);
        $statement->execute();
        $resultats = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $resultats ;
        }
}
?>