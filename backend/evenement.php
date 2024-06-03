<?php

require_once "./mysqlConnect.php";

function evenement_exist($connexion, $nomevenement){

    $query = "SELECT COUNT(*) AS ev_count FROM evenement WHERE nom_evenement = :nom_ev";
    $statement = $connexion->prepare($query);
    $statement->bindParam(':nom_ev', $nomevenement);
    $statement->execute();

    $result = $statement->fetch(PDO::FETCH_ASSOC);
    return $result['ev_count'] > 0;
}

function ajout_evenement($PDO, $nomEv, $lieu, $date_deb, $date_fin, $heure_deb, $heure_fin, $id_projet){

    $query = "INSERT INTO evenement (nom_evenement, lieu, date_debut, date_fin, heure_debut, heure_fin, id_projet) VALUES (:nomev, :lieu, :date_deb, :date_fin, :heure_deb, :heure_fin, :id_projet)";
    $statement = $PDO->prepare($query);
    $statement->bindParam(":nomev", $nomEv);
    $statement->bindParam(":lieu", $lieu);
    $statement->bindParam(":date_deb", $date_deb);
    $statement->bindParam(":date_fin", $date_fin);
    $statement->bindParam(":heure_deb",$heure_deb);
    $statement->bindParam(":heure_fin",$heure_fin);
    $statement->bindParam(":id_projet", $id_projet);
    $success = $statement->execute();
    if($success){
        return $PDO->lastInsertId();
    }
    else{
        return NULL;
    }
}