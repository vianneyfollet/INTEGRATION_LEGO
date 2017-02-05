
$(function() {

	/***Descendre le menu en mobile***/

	$("header .fa-bars").click(function() {
		$("header nav").slideToggle();
	});





	/***Slider***/


	var slider = function(elem, speed){

		var autoSlideInterval;
		var nbImages;
		var animateSlide = true;
		var count = 0;

		var $this = prototype = { 

			initialize: function(){ 
				this.addElements();
				this.imagesAdapt();
				this.addDots();
				this.barProgress();
				this.autoSlide();
				this.clickRight();
				this.clickLeft();
				this.clickDot();
			},

			addElements : function() { // --> On ajoute tous les éléments du slider dans le DOM
				$(elem).append('<div class="bar"><div class="progress"></div></div><span class="slideleft"></span><div class="images"></div><span class="slideright"></span><div class="dots"></div>');
				$(elem + " .images").append($(elem + " img"));
			},

			imagesAdapt: function() { // --> On adapte la taille de la div contenant les images en fonction du nombre d'images
				nbImages = $(elem + " .images img").length;
				$(elem + " .images").css("width", ((nbImages * 100) + "%"));
				$(elem + " img").css("width", ((100 / nbImages) + "%"));
			},

			addDots: function() { // --> On ajoute des dots en fonction du nombre d'images
				$(elem + " .images img").each(function(i) {
					$(elem + " .dots").append("<div class='dot " + i+ "'></div>")
				});
				$(elem + " .dot").eq(0).addClass("dotactive");
			},

			barProgress: function() { // --> On stoppe l'animation de la barre de chargement si elle est en cours, on la remet à zero puis on la (re)lance
				$(elem + " .bar .progress").stop();
				$(elem + " .bar .progress").css("width","0px");
				$(elem + " .bar .progress").animate({width: "100%"},speed)
			},

			slide : function(direction) { // --> On crée le mouvement du slider 
				animateSlide = false;
				$this.autoSlide();
				$this.barProgress();
				$(elem + " .dot").removeClass("dotactive"); // --> On initialise tous les dots
				if (direction == "left") { 		// --> On incrémente ou décrémente un compteur (en fonction du mouvement droite ou gauche) pour lequel chaque nombre correspond à une image 
					if(count == 0) {			  
						count = nbImages-1
					}else {
						count --;
					}
				} else {
					if(count == (nbImages-1)) {
						count = 0
					}else {
						count ++;
					}
				}
				$(elem + " .dot").eq(count).addClass("dotactive"); // --> On ajoute une classe au dot qui correspond à l'image en cours
				if (direction == "left") { // --> On crée une animation de balayement à doite ou à gauche puis on change la position des images pour avoir un slider infini
					$(elem + " .images").animate({marginLeft:0},500,function(){
						animateSlide = true;
						$(this).css({marginLeft:"-100%"}).find("img:first").before($(this).find("img:last"))
					})
					
				} else {
					$(elem + " .images").animate({marginLeft:"-200%"},500,function(){
						animateSlide= true;
						$(this).css({marginLeft:"-100%"}).find("img:last").after($(this).find("img:first"));
					})
				}
			},

			autoSlide : function() { // On stope le setInterval du slider s'il est en cours puis on le (re)lance
				clearInterval(autoSlideInterval);
				autoSlideInterval = setInterval($this.slide, speed);
			},

			clickRight: function() { // On crée un évènement click pour la flèche droite du slider
				$(elem + " .slideright").click(function() {
					if (animateSlide) {
						$this.slide("right");
					}
				});
			},

			clickLeft: function() { // On crée un évènement click pour la flèche gauche du slider
				$(elem + " .slideleft").click(function() {
					if (animateSlide) {
						$this.slide("left");
					}
				});
			},

			clickDot: function() { // On crée un évènement click pour les dots
				$(elem + " .dot").click(function() {
					var dotPosition = Number($(this).attr("class").replace("dot ", ""));
					var valMove = dotPosition - count;
					if(Math.sign(valMove) == -1) {
						for(var i = 0; i > valMove; i--) {
							$this.slide("left");
						}
					}else if(Math.sign(valMove) == 1) {
						for(var i = 0; i < valMove; i++) {
							$this.slide("right");
						}
					}
				})
			}
		}
		return $this.initialize();
	}

	slider("#carousel .slider", 4000);





	/***Resize iframe***/

	var resizeIframe = function(elem){

		var sizeWidth;
		var sizeHeight;
		var sizeCoef;

		var $this = prototype = { 

			initialize: function(){ 
				this.calcCoef();
				this.resizeInit();
				this.resizeAuto();
			},

			calcCoef : function() { // --> On calcule un coefficient avec la largeur et la hauteur de base puis on adapte la largeur à son parent
				sizeWidth = $(elem).css("width").replace("px", "");
				sizeHeight = $(elem).css("height").replace("px", "");
				sizeCoef = sizeHeight / sizeWidth;
				$(elem).css("width", "100%");
			},

			resizeInit : function() { // --> On calcule la hauteur par rapport à la largeur grâce au coefficient sizeCoef
				sizeWidth = $(elem).css("width");
				sizeWidth = sizeWidth.replace("px", "");
				sizeHeight = sizeWidth * sizeCoef;
				$(elem).css("height", (sizeHeight + "px"));
			},

			resizeAuto : function() {
				$(window).resize(function() {
					$this.resizeInit();
				})	
			}

		}
		return $this.initialize();
	}

	resizeIframe("iframe");





	/***Validation formulaire***/

	var emailRegex = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$');
	var nameRegex = new RegExp('^[A-Za-zÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝáàâäãåçéèêëíìîïñóòôöõúùûüýÿ]{3,16}$');

	$("footer form").submit(function(event) {
		var verif = ["","",""];
		$("footer form > input:not(:last-child)").css("border", "2px solid #ebebeb");
		$("footer form textarea").css("border", "2px solid #ebebeb");
		(nameRegex.test($("footer form input[name='nom']").val())) ? verif.push("v") : $("footer form input[name='nom']").css("border", "2px solid #D01012");
		(emailRegex.test($("footer form input[name='email']").val())) ? verif.push("v") : $("footer form input[name='email']").css("border", "2px solid #D01012");
		($("footer form textarea").val() != "") ? verif.push("v") : $("footer form textarea").css("border", "2px solid #D01012");
		(verif.join("") == "vvv")	?  alert("Message envoyé !") : event.preventDefault();
	})
});





