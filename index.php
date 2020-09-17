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
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    </head>
    <body>
        <div class="container">
            <h2>CookieKastanie</h2>
            <div class="list-group">
                <?php

                $liste = lireDossier("./", array("index.php", "favicon.ico",  "CV", "Tests"));

                foreach ($liste as $e) {
                    echo "<a class=\"list-group-item\" href=\"$e\">$e</a>";
                }

                ?>

            </div>
        </div>
    </body>
</html>
