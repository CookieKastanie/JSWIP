class MenuScores extends Menu{
  constructor(app) {
    super(app);

    this.scores = true;


	var STableau = new Array();
  var SOrdre = 0;

 for (var i in this.app.joueurs)
 {
   const j = this.app.joueurs[i];
   var o = {ordre:0, place:0, pseudo:"", kill:0, mort:0, score:0, couleur:"", x:0 };

   o.pseudo = j.getPseudo();
   o.kill = j.getScores().kill;
   o.mort = j.getScores().mort;
   o.score = o.kill*2-o.mort*0.5;
   o.couleur = j.couleur;
   o.x = j.getX();

   STableau.push(o);
 }

 for (var i = 0; i < STableau.length; i++)
 {
   for (var j = 0; j < STableau.length; j++)
   {
     if(STableau[i].score < STableau[j].score) STableau[i].place = STableau[i].place +1;
   }
 }

 for (var i =0; i< STableau.length; i++)
 {
   for ( var j =0; j< STableau.length; j++)
   {
     if((STableau[j].place == i) )
     {
       STableau[j].ordre=SOrdre;
       SOrdre++;
     }
   }
 }


	const CSSstyle = document.createElement("style");
	const table = document.createElement("table");
    table.id = "Score";

    this.zone.appendChild(table);
    this.zone.appendChild(CSSstyle);

    CSSstyle.innerHTML = "#menu { position:absolute; top:5vh; user-select:none;} ";
  	CSSstyle.innerHTML += "#Score {display: inline-block; list-style-type: none; object-fit: contain; font-family: 'FredokaOne-Regular'; font-size: 1.3vw; color: rgba(255,255,255,1); border-collapse:collapse;}";
    CSSstyle.innerHTML += ".SPaire{background-color:rgba(128,128,128,.06);}";
    CSSstyle.innerHTML += ".SImpair{background-color:rgba(64,64,64,.06);}";
    CSSstyle.innerHTML += "#SOr{background-color:rgba(215,170,25,.15);}";
    CSSstyle.innerHTML += "#SAr{background-color:rgba(140,185,190,.15);}";
    CSSstyle.innerHTML += "#SBr{background-color:rgba(211,133,55,.15);}";
    CSSstyle.innerHTML += "#SScore{font-size:1.8vw;}";
    CSSstyle.innerHTML += ".SPlace{padding-left:1.5vw;padding-right:0.5vw;color:rgba(255,255,255,.5);}";
    CSSstyle.innerHTML += ".SPseudo{padding-left:1.5vw; padding-right:1.5vw; text-align:left;}";
    CSSstyle.innerHTML += ".SKill{padding-left:1.5vw; padding-right:1.5vw;}";
    CSSstyle.innerHTML += ".SMort{padding-left:1.5vw; padding-right:1.5vw;}";

    (function(){
      const tr = document.createElement("tr");
      table.appendChild(tr);
      tr.style.color = "rgba(255,255,255,1)";
      tr.style.backgroundColor= "rgba(0,0,0,0)";
      tr.innerHTML = "<td class='SPlace'></td><td class='SPseudo' id='SScore'>Scores</td><td class='SKill'>Détruits</td><td class='SMort'>Morts</td>";
    })();

    for (var i =0; i< STableau.length; i++)
    {

      var oo = {ordre:0, place:0, pseudo:"", kill:0, mort:0, score:0, couleur:"", x:0 };

      for (var j = 0; j < STableau.length; j++) {  if (STableau[j].ordre == i) oo = STableau[j];}


      const tr = document.createElement("tr");
      table.appendChild(tr);

       if ( (oo.place%2) && (oo.place >2)) tr.className='SPaire'; else tr.className='SImpair' ;
       if (oo.place==0) tr.id='SOr';
       if (oo.place==1) tr.id='SAr';
       if (oo.place==2) tr.id='SBr';

       (oo.x > 20000 )? tr.style.opacity= "0.3":"";

      tr.innerHTML = "<td class='SPlace' >"+ (oo.place+1) +".</td>"
                   +"<td class='SPseudo' style='color:rgba("+oo.couleur+",1);'>"+ oo.pseudo +"</td>"
                   + "<td class='SKill'>"+ oo.kill +"</td>"
                   + "<td class='SMort'>"+ oo.mort +"</td>";




    }

    CSSstyle.innerHTML += "#menu{left:"+( window.innerWidth/2-table.offsetWidth/2)+"px;}";


  }
}
