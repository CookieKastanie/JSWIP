	var phrase = "";

	var playAnimation = true;

function menuDecor(textures,ctx)
{


	const listPhrases = [
		"100% Gluten-free vegan meat",
		"Deux pour le prix d'un !!",
		"12 différents vaisseaux !",
		"Devant un PC chacun",
		"Salade Tomate Oignon",
		"-30% avec le code \"Fromage\"",
		"Un mars et ça repart",
		"Moitié prix?! C'est pas possible!",
		"Nutella? T'es là !",
		"CHINA",
		"Spaaaaaaaaaaace",
		"WILLSOOOON !",
		"Oui nide tou builde eu WOUAAAAUL",
		"Si ju vais bien c'est Juvamine",
		"Le joueur français !!!",
		"AH !",
		"BWEKFAST",
		"\"Toujours un succès\"",
		"\"Buvez de l'eau, c'est important\"",
		"De la poudre de perlimpinpin",
		"LEEROOOOOOOY JENKIIIINNNS",
		"Je sais nager... mais pas dans l'eau",
		"We'll bang, okay ?",
		"C'est pas faux",
		"C'est trivial",
		"I said hey ! What's going on",
		"Catcha !",
		"Ah, ha, ha, ha, stayin' alive !!"
	];

	phrase = listPhrases[Math.floor(Math.random()*listPhrases.length)];

	const CanvW = 1920;
	const CanvH = 1080;

	const Etoile	 = new Array;
	const Vaisseau   = new Array;
	const System 	 = new Array;
	const Particules = new Array;
	const Nuage = new Array;

	var i		 = 0;
	var j		 = 0;
	var Espace	 = [new Array(),new Array(),new Array(),new Array(),new Array(),new Array()];
	var Vaissal	 = [0,0,0,0,0,0];
	var Planete = [0,0,0,0,0,0];
	var Trainee = new Array;
	var Ciel = new Array;



	for(i = 1; i<8;i++)
	{
		const o = textures.getObjet(i==1?"default.png":"vaisseau"+i+".png");
		Vaisseau.push(o);
	}/* Textures des vaisseaux .................. */

	for (i = 0; i<4; i++)
	{
		const o = textures.getObjet("particule"+(i+1)+".png");
		Particules.push(o);
	}/* Textures des particules ...............*/

	for (i = 0; i<5; i++)
	{
		const o = textures.getObjet("nebuleuse"+(i+1)+".png");
		Nuage.push(o);
	}/* Textures des nébuleuses ...............*/


	for(i = 0; i<6;i++)
	{
		const o = textures.getObjet("etoile"+(i+1)+".png");
		Etoile.push(o);
	}/* Textures des étoiles ....................*/



	System.push(textures.getObjet("terre.png"));
	System.push(textures.getObjet("jupiter.png"));
	System.push(textures.getObjet("neptune.png"));
	/* Textures des planètes................*/

	for (j =0; j<6; j++)
	{
		for (i = 0; i < (Math.random()+0.3)*(60/(j+1)); i++)
		{
			var e = [Math.random()*CanvW, Math.random()*CanvH]; Espace[j].push(e);
		}
	}/* Nombre et positionnement des étoiles ....*/

	for(i=0; i< 30; i++){
		const o = [Math.random()*(CanvW+400)-200, Math.random()*(CanvH+200)-100, Math.floor(Math.random()*4.99), Math.random()*2*Math.PI];
		Ciel.push(o);
	}/* Nombre et positionnement des nébuleuses ....*/

	Planete[0] = -400;
	Planete[1] = CanvH/2 + PoM()*(Math.random()*CanvH/2);
	Planete[2] = Planete[0];
	Planete[3] = Planete[1];
	Planete[4] = Math.floor(Math.random()*(System.length-0.01));
	Planete[5] = (Math.random()*3+2);
	Planete[6] = PoM()*(Math.random());
	/* La planète*/

	NewVaissal();

	k_requestAnimationFrame(menuDecorUpdate);

	function NewVaissal()
	{
		Vaissal[4] = Math.floor(Math.random()*6.99);
		Vaissal[5] = Math.floor(Math.random()*4.99);

		switch(Math.floor(Math.random()*3.99))
		{
			case 1:	 Vaissal[0] = -100; 					Vaissal[1] = Math.random()*CanvH+100; 	Vaissal[2] = Math.random()*CanvW/100+5; 			Vaissal[3] = (PoM())*(Math.random()*CanvH/100+5);	break;
			case 2:  Vaissal[0] = CanvW+100; 				Vaissal[1] = Math.random()*CanvH+100; 	Vaissal[2] = - Math.random()*CanvW/100+5;			Vaissal[3] = (PoM())*(Math.random()*CanvH/100+5);	break;
			case 3:  Vaissal[0] = Math.random()*CanvW+100; 	Vaissal[1] = -100; 						Vaissal[2] = (PoM())*(Math.random()*CanvW/100+5);	Vaissal[3] = Math.random()*CanvH/100+5;				break;
			default: Vaissal[0] = Math.random()*CanvW+100; 	Vaissal[1] = CanvH+100; 				Vaissal[2] = (PoM())*(Math.random()*CanvW/100+5);	Vaissal[3] = - Math.random()*CanvH/100+5;
		}
	}



	function menuDecorUpdate(){

		ctx.fillStyle = "rgba(0,8,17,1)";
		ctx.fillRect(0, 0, CanvW, CanvH);

		for (var l in Ciel)
		{
			Ciel[l][0] += 0.3+0.01*l;
			if (Ciel[l][0] > CanvW +200) Ciel[l][0] = -300;

			ctx.save();
			ctx.translate(Ciel[l][0], Ciel[l][1]);
			ctx.rotate(Ciel[l][3]);
			ctx.drawImage(Nuage[Ciel[l][2]], -200, -200);
			ctx.restore();

		}


		for (i = 0; i<6; i++)
		{
			for (var l in Espace[i])
			{
				Espace[i][l][0] += 0.2*(i+2);
				if (Espace[i][l][0] > CanvW +20) Espace[i][l][0] -= CanvW+80;
				ctx.drawImage(Etoile[i], Espace[i][l][0], Espace[i][l][1]);
			}
		}

		Planete[0] += Planete[5];
		Planete[1] += Planete[6];
		if ((Planete[0] > CanvW+400)||(Planete[1] > CanvH+400)||(Planete < -400))
		{
			Planete[0] = Planete[2];
			Planete[1] = Planete[3];
		}


		ctx.drawImage(System[Planete[4]], Planete[0], Planete[1]);


		ctx.fillStyle = "rgba(255,255,255,1)";
		ctx.textAlign = "center";
		ctx.font = "50px FredokaOne-Regular";
		ctx.fillText(phrase, 3*CanvW/4, (CanvH/2)-30);

		ctx.fillStyle = "rgba(255,132,20,1)";
		ctx.font = "35px FredokaOne-Regular";
		ctx.fillText("A = Propulsion", 		3*CanvW/4, (CanvH/2)+30);
		ctx.fillText("Z = Frein", 			3*CanvW/4, (CanvH/2)+70);
		ctx.fillText("E = Bouclier", 	3*CanvW/4, (CanvH/2)+110);
		ctx.fillText("F11 = Plein écran", 	3*CanvW/4, (CanvH/2)+150);
		ctx.fillText("Ech = Options en jeu",	3*CanvW/4, (CanvH/2)+190);
		ctx.fillText("S = Affiche les scores", 	3*CanvW/4, (CanvH/2)+230);
		ctx.fillText("O = Musique on/off", 	3*CanvW/4, (CanvH/2)+270);

		ctx.fillStyle = "rgba(255,255,255,0.3)";
		ctx.textAlign = "right";
		ctx.font = "30px FredokaOne-Regular";
		ctx.fillText("Version en développement", CanvW - 10, 40);

		ctx.font = "20px FredokaOne-Regular";
		ctx.fillText("Programmation par Jérémy A | Interfaces par Djeson PV | Graphismes par Kalvin PV", CanvW - 20, CanvH-20);

		Vaissal[0] += Vaissal[2];  Vaissal[1] += Vaissal[3];
		if ((Vaissal[0] > CanvW+120 )||(Vaissal[0] < -120 )||(Vaissal[1] > CanvH+120 )||(Vaissal[1] < -120 )) NewVaissal();



		Trainee.push([Vaissal[0], Vaissal[1], 10 + Math.floor(Math.random()*20)]);

		for (var i in Trainee)
		{
			ctx.drawImage(Particules[Math.floor(Math.random()*3.99)],Trainee[i][0], Trainee[i][1]);

			Trainee[i][0] += (Math.random()*2 - 1)*(Trainee[i][2]/2);
			Trainee[i][1] += (Math.random()*2 - 1)*(Trainee[i][2]/2);

			Trainee[i][2]--;

			if (Trainee[i][2] < 0)
			{
				Trainee.splice(i,1);
			}

		}


		ctx.save();
		ctx.translate(Vaissal[0], Vaissal[1]);
		ctx.rotate(Math.atan2(Vaissal[3], Vaissal[2]) + Math.PI/2);
		ctx.drawImage(Vaisseau[Vaissal[4]], Vaissal[5]*Vaisseau[0].height, 0, Vaisseau[0].height, Vaisseau[0].height, -Vaisseau[0].height/2, -Vaisseau[0].height/2, Vaisseau[0].height, Vaisseau[0].height);


		ctx.restore();

		if(playAnimation) { k_requestAnimationFrame(menuDecorUpdate)};

	};


}


function PoM(){if(Math.random() < 0.5){return -1;}else{ return 1;}}




function stopAnimationMenu() { playAnimation = false; }
