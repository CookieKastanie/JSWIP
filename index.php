<?php

function lireDossier($chemin, $exept = array()){
    $list = array();
    $index = 0;

    if ($dossier = opendir($chemin)){
        while ($f = readdir($dossier)){
            if ($f != "." && $f != ".." && !in_array($f, $exept) && $f[0] != '.'){
                $list[$index++] = $f;
            }
        }

        closedir($dossier);
    }

    return $list;
  }


    function displayList($list) {
        foreach($list as $e) {
            echo '<a class="list-group-item" href="'.$e.'" target="_blank">'.ucfirst($e).'</a>';
        }
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
          a {color: white;}
          a:hover {color: white;}

          .list-group {
            margin-bottom: 20px;
          }

          h1 {
              font-size: 3em;
              margin: 20px 0;
          }

          .g1 .list-group-item {
            background: rgba(168, 102, 255, 0.2);
            border-color: rgba(168, 102, 255, 0.5);
          }

          .g2 .list-group-item {
            background: rgba(133, 251, 119, 0.2);
            border-color: rgba(133, 251, 119, 0.5);
          }

          .g3 .list-group-item {
            background: rgba(101, 248, 255, 0.2);
            border-color: rgba(101, 248, 255, 0.5);
          }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>CookieKastanie</h1>

            <div class="list-group g1">
                <?php
                    $group1 = array('texel', 'couleurs', 'CS-PDF', 'MachineDeTuring');
                    displayList($group1);
                ?>
            </div>

            <div class="list-group g2">
                <?php
                    $group2 = array('AMC', 'gameOfLife', 'mostu', 'balles', 'snake', 'p_test_1', '2dRaycast');
                    echo '<a class="list-group-item" href="https://ljdmdv.letoutchaud.fr" target="_blank" >LJDMDV</a>';
                    displayList($group2);
                ?>
            </div>

            <div class="list-group g3">
                <?php
                    $group3 = array('rope', 'splines', 'WIPCE', 'trails', 'mandelbrot', 'bubulles', 'noise');
                    displayList($group3);
                ?>
            </div>

            <div class="list-group">
                <?php
                    $list = lireDossier("./", array("index.php", "favicon.ico", "CV", "Tests", "WIPGL", "Site16mb", "404", "bot_manager", "flex", ...$group1, ...$group2, ...$group3));
                    sort($list);

                    displayList($list);
                ?>

            </div>
        </div>
    </body>
</html>
