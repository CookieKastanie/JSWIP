<?php

function lireDossier($chemin, $exept = array()){
  $liste = array();
  $index = 0;

  if ($dossier = opendir($chemin)){
    while ($f = readdir($dossier)){
      if ($f != "." && $f != ".." && !in_array($f, $exept) && $f[0] != '.'){
        $liste[$index++] = $f;
      }
    }

    closedir($dossier);
  }

  return $liste;
}

function readCurrentDir(){
  return lireDossier("./", array("index.php", "favicon.ico"));
}

?>
