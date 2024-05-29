<?php

function creation_presence($connexion, $statut_emargement, $heure_emargement, $id_evenement){
    $query = "INSERT INTO presence (statut_emargement, heure_emargement, id_evenement) VALUES (:statut_em, :heure_em, :id_ev)";
    $statement = $connexion->prepare($query);

    $statement->bindParam(":statut_em", $statut_emargement);
    $statement->bindParam(":heure_em", $heure_emargement);
    $statement->bindParam(":id_ev",$id_evenement);

    $success = $statement->execute();
    if($success){
        return $connexion->lastInsertId();
    }
    else{
        return NULL;
    }
}