<?php

if (isset ($_SERVER['HTTP_ORIGIN'])) {
  header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type:application/json;charset=utf8');


/**
 * la fonction permettant d'envoyer un message JSON au frontend
 * @param $data
 */
function sendMessage ($data) {
  echo json_encode ([ 'status' => 'ok',
                      'data'   => $data ]);
  die;
}


/**
 * la fonction permettant d'envoyer un message d'erreur au frontend
 * @param $reason
 */
function sendError ($reason) {
  echo json_encode (['status' => 'error',
                     'data'   => ['reason' => $reason] ]);
  die;
}