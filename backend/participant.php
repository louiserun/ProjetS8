<?php

function creation_participant($connexion, $nom_participant, $prenom_participant, $id_presence){
    $query = "INSERT INTO participant (nom_participant, prenom_participant, id_presence) VALUES (:nom_part, :prenom_part, :id_pres)";
    $statement = $connexion->prepare($query);

    $statement->bindParam(":nom_part", $nom_participant);
    $statement->bindParam(":prenom_part", $prenom_participant);
    $statement->bindParam(":id_pres", $id_presence);

    $success = $statement->execute();
    
    if($success){
        return $connexion->lastInsertId();
    }
    else{
        return NULL;
    }
}