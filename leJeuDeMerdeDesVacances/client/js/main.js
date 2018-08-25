(function(){
  const canvas = document.getElementsByTagName("canvas")[0];
  const app = new Application(canvas);

  Math.dist = (a, b) => {
    return Math.sqrt(Math.pow((b.getX() - a.getX()), 2) + Math.pow((b.getY() - a.getY()), 2));
  }

  window.onload = function(){
    app.chargement();
  }

  window.onerror = function(messageOrEvent, source, noligne, nocolonne, erreur){
    alert("Une erreur est survenue :(");
    location.reload();
    console.log("Message/Event: "+ messageOrEvent +" | Source: "+ source +" | Num ligne: "+ noligne +" | Num colonne: "+ nocolonne +" | Erreur"+ erreur);
  }
})();
