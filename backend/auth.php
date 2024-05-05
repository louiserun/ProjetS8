<?php
    // Démarrer ou restaurer une session
    session_start(['cookie_samesite' => 'Lax']);
    require_once('mysqlConnect.php');

    function authenticate (){
        global $connexion;
        // vérifie que la variable $_POST contient des champs username et password
        if (array_key_exists('username', $_POST) && array_key_exists('password', $_POST)) {
            // Les champs "username" et "password" sont présents dans $_POST
            try {
                // Préparation de la requête pour vérifier le couple (username, password)
                $query = "SELECT * FROM organisateur WHERE username = :username AND password = :password";
                $statement = $connexion->prepare($query);
                $statement->bindParam(':username', $_POST['username']);
                $statement->bindParam(':password', $_POST['password']);
                $statement->execute();

                // Vérification si le couple (username, password) existe dans la base de données
                $result = $statement->fetch(PDO::FETCH_ASSOC);
            
                if ($result) {
                    // Le couple (username, password) existe dans la base de données
                    // Placer des informations d'identification dans $_SESSION
                    $_SESSION['id_organisateur'] = $result['id_organisateur']; // Supposons que 'id' soit l'identifiant de l'utilisateur dans la base de données
                    $_SESSION['username'] = $_POST['username']; // Stocker le username de l'utilisateur dans la session
                    // Retourner true pour indiquer que l'identification s'est bien passée
                    return true;
                } else {
                    // Le couple (username, password) n'existe pas dans la base de données
                    return false;
                }
            }catch(PDOException $e) {
                // En cas d'erreur lors de la connexion
                return false;
            }
        } else {
            // L'un ou les deux champs ne sont pas présents dans $_POST
            return false;
        }
    }

    function isAuthenticated() {
        // Vérifier si les clés d'authentification existent dans $_SESSION
        if (isset($_SESSION['id_organisateur']) && isset($_SESSION['username'])) {
            // Les clés d'authentification existent
            return true;
        } else {
            // Les clés d'authentification n'existent pas
            return false;
        }
    }
?>