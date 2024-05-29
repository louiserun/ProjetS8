<?php

if(isset($_FILES['file'])){
    $file = $_FILES['file'];

    if($file['error'] === UPLOAD_ERR_OK){

        $uploadDir = '../upload/';
        $uploadFile = $uploadDir . basename($file['name']);
        if(move_uploaded_file($file['tmp_name'], $uploadFile)){
            $mess['message'] = "Upload Reussi";
            sendMessage($mess);
        }
        else{
            sendError("Failed to move uploaded file.");
        }
    }
    else{
        sendError("File upload error.");
    }
}
else{
    sendError("No file uploaded");
}
// $myFile = fopen("../test.csv","rb");

// if(!$myFile){
//     exit("Ouverture du fichier impossible");
// }

// while(!feof($myFile)){

//     $str = fgets($myFile);
//     $elements = explode(",", $str);
//     print_r($elements);
//     foreach($elements as $element){
//         echo ($element);
//         echo("\n");
//     }
// }


// if(!fclose($myFile)){
//     exit("Fermeture du fichier echouee.");
// }