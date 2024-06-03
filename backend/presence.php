<?php
require_once "./participant.php";
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

function recuperer_presences($PDO, $id_ev){
    $query = "SELECT * FROM presence WHERE id_evenement = :id_ev";
    $statement = $PDO->prepare($query);
    $statement->bindParam(':id_ev', $id_ev);
    $statement->execute();

    $participants_afficher = array();
    $participant_aff = array();
    while($row = $statement->fetch(PDO::FETCH_ASSOC)){
        
        $statutem = $row["statut_emargement"];
        $heureem = $row["heure_emargement"];
        $idpres = $row["id_presence"];
        $participant = recuperer_participant_pres($PDO, $idpres);
        $participant_aff["emargement"] = $statutem;
        $participant_aff["dateEmargement"] = $heureem;
        $participant_aff["nom"] = $participant["nom_participant"];
        $participant_aff["prenom"] = $participant["prenom_participant"];

        $participants_afficher[] =$participant_aff;
    }
    
    return $participants_afficher;
}