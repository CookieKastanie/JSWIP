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
?>

<!DOCTYPE html>
<html lang="fr" dir="ltr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Le merdier de CookieKastanie.">
        <title>CookieKastanie</title>
        <link rel="stylesheet" href="https://bootswatch.com/4/darkly/bootstrap.min.css">
        <style media="screen">
          a{color: white;}
          a:hover{color: white;}
        </style>
    </head>
    <body>
        <div class="container">
            <h2>CookieKastanie</h2>
            <div class="list-group">
                <?php

                $liste = lireDossier("./", array("index.php", "favicon.ico", "CV", "Tests", "WIPGL", "Site16mb", "404"));
                sort($liste);

                foreach ($liste as $e) {
                    echo "<a class=\"list-group-item\" href=\"$e\">$e</a>";
                }

                ?>

            </div>
        </div>
    </body>
</html>
