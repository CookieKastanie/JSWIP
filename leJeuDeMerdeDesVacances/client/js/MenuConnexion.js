class MenuConnexion extends Menu {
  constructor(app) {
    super(app);

    //////////////////////////////////////////////////////
    menuDecor(this.app.textures, this.app.ctx);
    //////////////////////////////////////////////////////

    app.changerMusique("menu0.mp3", "loop");
    app.setVolumeMusique(0.2);
    app.setVolumeBruitages(0.2);

		//const div = this.zone;
		const CSSstyle = document.createElement("style");
    const CSSstyle2 = document.createElement("style");
		const menu = document.createElement("div");
    const imgLJDMDV = document.createElement("div");
    const txtSp = document.createElement("text");
    const txtMp = document.createElement("text");
    const txtTuto = document.createElement("text");
    const txtMenu = document.createElement("div");
			const formulaire = document.createElement("form");
				const pseudo = document.createElement("input");
				const ip = document.createElement("input");
				const bouton = document.createElement("input");

      this.zone.appendChild(CSSstyle);
      this.zone.appendChild(CSSstyle2);
  		this.zone.appendChild(menu);
        menu.appendChild(imgLJDMDV);
        menu.appendChild(txtSp);
        menu.appendChild(txtMp);
        menu.appendChild(txtTuto);
  			menu.appendChild(formulaire);
          formulaire.appendChild(pseudo);
  				formulaire.appendChild(ip);
  				formulaire.appendChild(bouton);



  	//this.zone.id		  = "mainPanel";
  		menu.id 			  = "ConxMenu";
        imgLJDMDV.id  = "ConxImage";
        txtSp.id      = "ConxSp";
        txtMp.id      = "ConxMp";
        txtTuto.id      = "ConxTuto";
  			formulaire.id = "ConxForm";
          pseudo.id 	= "ConxPseudo";
  				ip.id 		  = "ConxIP";
  				bouton.id 	= "ConxMulti";

    txtSp.innerHTML ="Mode Solo";
    txtMp.innerHTML ="Multijoueur";



  	pseudo.placeholder = "Pseudo";
    pseudo.type = "text";
    pseudo.maxLength = "20";
    pseudo.style.display ='none';

  	ip.placeholder = "ip (xxx.xxx.xxx.xxx)";
      ip.type = "text";
      ip.value     = "serveur-dev";
      ip.style.display ='none';

    bouton.type    = 'submit';
      bouton.value = "";
      bouton.style.display ='none';


      txtTuto.style.display ='none';

      imgLJDMDV.style.opacity  = '1';
      imgLJDMDV.style.backgroundPosition = '50% 82%';
      imgLJDMDV.style.backgroundSize= "42%";




      txtTuto.innerHTML = "Entrainement";


    CSSstyle.innerHTML =  "body {background-color: rgba(0,2,11,1);}"
  	                   + "#menu {width:100%; height:100%;  user-select:none;} "
  	                   + "#ConxMenu {background-color: rgba(255,255,255,0.2); width:40vw; height:40vw; left:7vw; padding:0;  border-radius :5vw; color:rgba(255,255,255,1); font-family: 'FredokaOne-Regular'; font-size:2.5vw; text-align:center; }"
                       + "#ConxMenu {top: 50%; -webkit-transform: translateY(-50%); -moz-transform: translateY(-50%);  -ms-transform: translateY(-50%); -o-transform: translateY(-50%);  transform: translateY(-50%);}"
                       + "#ConxImage{width:100%; height:100%; background-image:url('Logo.png'); background-size:70%; background-repeat:no-repeat; background-position: 50% 30%;  image-rendering: crisp-edges; opacity:0.1; left:0;}"
                       + "#ConxMenu input[type='text']{width:80%; height:5vw; border:none; border-bottom: 0.45vw solid rgba(255,132,20,1); text-align:center; position:absolute; color:rgba(255,255,255,1); background-color:rgba(0,0,0,0); cursor:url(curseur.cur),pointer; font-family: 'FredokaOne-Regular'; font-size:2vw; border-radius :1vw 1vw 0 0;}"
                       + "#ConxMenu input[type='text']:focus {outline: none; background-color:rgba(255,255,255,0.05);} #ConxMenu input[type='text']:hover{background-color:rgba(255,255,255,0.1);}"
                       + "#ConxSp{position:absolute; top:5vw; height:5vw; width:80%; left:00%; line-height:5vw; border-radius :0 5vw 0 0; background-color:rgba(255,132,20,1); color:rgba(255,255,255,1);} #ConxSp:hover{background-color:rgba(255,90,10,1);}"
                       + "#ConxMp{position:absolute; top:10vw; height:5vw; width:80%; left:20%; line-height:5vw; border-radius :0 0 0 5vw; background-color:rgba(255,132,20,1) ;color:rgba(255,255,255,1);} #ConxMp:hover{background-color:rgba(255,90,10,1);}"
                       + "#ConxTuto{position: absolute; color:rgba(255,255,255,0.2); top:59%; left:11%; width:80%; height:5vw; background-color:rgba(255,255,255,.05);  border-radius :1vw; line-height:5vw; font-size:2vw;} #ConxTuto:hover{background-color:rgba(255,255,255,0.2);}"
                       + "#ConxPseudo {top:40%; left:10%;}"
  	                   + "#ConxIP {top:57%; left:10%;}"
                       + "#ConxMenu input[type='submit'], #ConxMenu input[type='button'] {width:70%; top:78%; left:15%;  height:6.75vw; margin:0; font-size:2.2vw; position: absolute; border:none; background-color:rgba(255,132,20,1); color:rgba(255,255,255,1); cursor:url(curseur.cur),pointer; font-family: 'FredokaOne-Regular'; border-radius :2vw;}"
                       + "#ConxMenu input[type='submit']:focus, #ConxMenu input[type='button']:focus{outline: none;}"
                       + "#ConxMenu input[type='submit']:hover, #ConxMenu input[type='button']:hover{background-color : rgba(255,90,10,1);}";


  	formulaire.action = "javascript:;"


    txtTuto.onclick = () =>{

      if (app.jeuTuto)
      {
        txtSp.onclick();
      }
      else
      {
      app.jeuTuto = true;
      bouton.value = "Aller au Stand de tir";
      CSSstyle2.innerHTML += "#ConxTuto{ color:rgba(255,255,255,.8); background-color:rgba(255,132,20,.3); } #ConxTuto:hover{background-color:rgba(255,90,10,.3);}";
      }

    }


    txtSp.onclick = () => {
      bouton.value = "Jouer";
      bouton.style.display ='';
      pseudo.style.display ='';
      ip.style.display ='none';
      txtMenu.style.display ='none';
      txtTuto.style.display ='';
      imgLJDMDV.style = '';

      txtSp.style.top      = '';
      txtMp.style.top      = '';
      imgLJDMDV.style.opacity  = '';

      app.jeuLocal = true;
      app.jeuTuto = false;

    CSSstyle2.innerHTML = "#ConxSp{background-color:rgba(255,132,20,1); color:rgba(255,255,255,1);} #ConxSp:hover{background-color:rgba(255,90,10,1);}"
                        + "#ConxMp{background-color:rgba(255,255,255,.2); color:rgba(255,255,255,.4);} #ConxMp:hover{background-color:rgba(255,255,255,.5);}"
                        + "";
    }

    txtMp.onclick = () => {
        bouton.value = "Se connecter";
        bouton.style.display ='';
        pseudo.style.display ='';
        ip.style.display ='';
        txtMenu.style.display ='none';
        txtTuto.style.display ='none';
            imgLJDMDV.style = '';

        txtSp.style.top      = '';
        txtMp.style.top      = '';
        imgLJDMDV.style.opacity  = '';

      app.jeuLocal = false;
      app.jeuTuto = false;
      CSSstyle2.innerHTML = "#ConxMp{background-color:rgba(255,132,20,1); color:rgba(255,255,255,1);} #ConxMp:hover{background-color:rgba(255,90,10,1);}"
                          + "#ConxSp{background-color:rgba(255,255,255,.2); color:rgba(255,255,255,.4);} #ConxSp:hover{background-color:rgba(255,255,255,.5);}";
    }

/*    btnSolo.onclick = () => {
      app.jeuLocal = true;
      formulaire.onsubmit();
    }

    btnTuto.onclick = () => {
      app.jeuTuto = true;
      app.jeuLocal = true;

      formulaire.onsubmit();
    }*/

    pseudo.onfocus = () => {
      app.canvasFocus = false;
    }
    ip.onfocus = pseudo.onfocus;

    pseudo.onblur = () => {
      app.canvasFocus = true;
    }
    ip.onblur = pseudo.onblur;


    formulaire.onsubmit = () => {
      //////////////////////////////////////////////////////
      stopAnimationMenu();
      //////////////////////////////////////////////////////


      setTimeout(() => {
        app.canvasFocus = true;

        this.clear();

        const info = document.createElement("p");
        info.innerHTML = "Connexion en cours...";
        info.id = "info";
        CSSstyle.innerHTML = "#info {object-fit: contain; font-family: 'FredokaOne-Regular'; font-size: 30px; color: #fff;} #menu { position:absolute; top:0; left:0; width: 100%; height: 100%;} ";
        this.zone.appendChild(CSSstyle);
        this.zone.appendChild(info);
        this.app.init(ip.value, pseudo.value);
      }, 10);
    }
  }
}
