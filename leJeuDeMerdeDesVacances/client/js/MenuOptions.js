class MenuOptions extends Menu {
  constructor(app) {
    super(app);
    this.options = true;

	const CSSstyle 			 = document.createElement("style");
	const menu				 = document.createElement("div");
		const textMenu		 = document.createElement("text");
		const menuMus		 = document.createElement("div");
			const textMus	 = document.createElement("text");
			const checkMus	 = document.createElement("input"); checkMus.type = "checkbox";
			const lblMus	 = document.createElement("label"); lblMus.htmlFor = "OptMusChk";
			const volumeMus	 = document.createElement("input"); volumeMus.type = "range";
		const menuBru		 = document.createElement("div");
			const textBru	 = document.createElement("text");
			const checkBru	 = document.createElement("input"); checkBru.type = "checkbox";
			const lblBru	 = document.createElement("label"); lblBru.htmlFor = "OptBruChk";
			const volumeBru	 = document.createElement("input"); volumeBru.type = "range";
      const menuPar		 = document.createElement("div");
  			const textPar	 = document.createElement("text");
  			const nombrePar	 = document.createElement("input"); nombrePar.type = "range";
		const textHB		 = document.createElement("text");
		const checkHB 		 = document.createElement("input");	checkHB.type = "checkbox";
		const lblHB			 = document.createElement("label"); lblHB.htmlFor = "OptHBChk";
		const changMus 		 = document.createElement("input"); changMus.type = "button";
		const Deconnection	 = document.createElement("input"); Deconnection.type = "button";


	this.zone.appendChild(CSSstyle);
	this.zone.appendChild(menu);
		menu.appendChild(textMenu);
		menu.appendChild(menuMus);
			menuMus.appendChild(textMus);
			menuMus.appendChild(checkMus);
			menuMus.appendChild(lblMus);
			menuMus.appendChild(volumeMus);
		menu.appendChild(menuBru);
			menuBru.appendChild(textBru);
			menuBru.appendChild(checkBru);
			menuBru.appendChild(lblBru);
			menuBru.appendChild(volumeBru);
    menu.appendChild(menuPar);
  			menuPar.appendChild(textPar);
  			menuPar.appendChild(nombrePar);
		menu.appendChild(textHB);
		menu.appendChild(checkHB);
		menu.appendChild(lblHB);
		menu.appendChild(changMus);
		menu.appendChild(Deconnection);

	menu.id 				= "OptMenu";
		textMenu.id 		= "OptMenuTxt";
		menuMus.id 			= "OptMusMenu";
			textMus.id 		= "OptMusTxt";
			checkMus.id 	= "OptMusChk";
      lblMus.id 		= "OptMusLbl";
			volumeMus.id 	= "OptMusVol";
		menuBru.id 			= "OptBruMenu";
			textBru.id 		= "OptBruTxt";
			checkBru.id 	= "OptBruChk";
      lblBru.id 		= "OptBruLbl";
			volumeBru.id 	= "OptBruVol";
    menuPar.id 			= "OptParMenu";
      textPar.id 		= "OptParTxt";
      nombrePar.id 	= "OptParNmb";
		textHB.id 			= "OptHBTxt";
		checkHB.id 			= "OptHBChk";
		lblHB.id 			  = "OptHBLbl";
		changMus.id 		= "OptChgMus";
		Deconnection.id 	= "OptDeco";

	textMenu.innerHTML = "Options";
	textMus.innerHTML = "Volume de la musique";
	textBru.innerHTML = "Volume des effets";
	textHB.innerHTML = "Afficher les hit-boxs";
  textPar.innerHTML = "Nombre de particules";


	changMus.value = "Changer de musique";
	Deconnection.value = "Quitter";
  

    volumeMus.max = "1";
    volumeMus.min = "0";
    volumeMus.step = "0.01";
    volumeMus.value = app.saveVolumeMusiques;


    volumeBru.max = "1";
    volumeBru.min = "0";
    volumeBru.step = "0.01";
    volumeBru.value = app.saveVolumeBruitages;

    nombrePar.max = "1";
    nombrePar.min = "0";
    nombrePar.step = "0.5";
    nombrePar.value = app.nbParticules;

    nombrePar.style.marginLeft='0vw';
    nombrePar.style.width='35vw';

	if(app.musMute) {
		checkMus.checked = true;
		volumeMus.disabled = true;
		volumeMus.style.opacity="0.5";
	}



	if(app.bruMute) {
		checkBru.checked = true;
		volumeBru.disabled = true;
		volumeBru.style.opacity="0.5;";
	}

	if(app.drawHitBox) {
		checkHB.checked = true;
	}

	checkMus.onclick = () =>
	{
		if(app.musMute)
		{
			app.musMute = false;
			volumeMus.disabled = false;
			volumeMus.style.opacity="1";
			app.setVolumeMusique(volumeMus.value);
		}
		else
		{
			app.musMute = true;
			volumeMus.disabled = true;
			volumeMus.style.opacity ="0.5";
			app.setVolumeMusique(0);
		}


	}


	checkBru.onclick = () =>
	{
		if(app.bruMute)
		{
			app.bruMute = false;
			volumeBru.disabled = false;
			volumeBru.style.opacity="1";
			app.setVolumeBruitages(volumeMus.value);
		}
		else
		{
			app.bruMute = true;
			volumeBru.disabled = true;
			volumeBru.style.opacity ="0.5";
			app.setVolumeBruitages(0);
		}


	}


	checkHB.onclick = () =>
	{
		app.drawHitBox?app.drawHitBox = false:app.drawHitBox = true;


	}

    volumeMus.onmousemove = () => {
		app.saveVolumeMusiques = volumeMus.value;
		app.setVolumeMusique(volumeMus.value);
    }
    volumeMus.ontouchend = () => {volumeMus.onmousemove();}
    volumeMus.onclick = () => {volumeMus.onmousemove();}


    volumeBru.onmousemove = () => {
		app.saveVolumeBruitages = volumeBru.value;
		app.setVolumeBruitages(volumeBru.value);
    }
    volumeBru.ontouchend = () => {volumeBru.onmousemove();}
    volumeBru.onclick = () => {volumeBru.onmousemove();}

    nombrePar.onmousemove = () => {
		app.nbParticules = nombrePar.value;
    }
    nombrePar.ontouchend = () => {nombrePar.onmousemove();}
    nombrePar.onclick = () => {nombrePar.onmousemove();}


	changMus.onclick = () =>
	{
		app.musiqueRandom();
	}

	Deconnection.onclick = () =>
	{
		location.reload();
	}


  }
}
