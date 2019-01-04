function showTests(string){ //fonction globale pour afficher les tests
  console.log(string);
}

var runAnimation = false; //ce variable permet d'activer ou d'arrêter les animations
var clickEvent = ""; //ce variable va définir le type d'animation avec des parameters comme suivant, précédent, etc.
var imageCounter = 0; //ce variable pour me retrouver pendant les basculements entre les photos
var slideImageInterval;
var imageTracker = [0, 1, 2, 3, 4, 5]; //à être utilisé par séléction au piff
$( document ).ready(function() {

  /* =============== LES VARIABLES =============== */
  // Les variables de canvas
  let canvas = document.getElementById("myCanvas");
  if(!canvas)
  {
      alert("Impossible de récupérer le canvas");
      return;
  }

  let context = canvas.getContext("2d");
  if(!context)
  {
      alert("Impossible de récupérer le context");
      return;
  }
  context.canvas.width  = window.innerWidth/2;
  context.canvas.height = window.innerHeight/1.5;
  var img = new Image();   // Crée un nouvel élément img
  console.log("testing imagesContainerArray " + imagesContainerArray);
  console.log("testing imagesContainerArray elements" + imagesContainerArray[0]._src);

  img.src = imagesContainerArray[imageCounter]._src; // définit le chemin de la source de l'image par défaut

  let wholeBody = document.body //capture del'ensemble de la page pour les events de keyup

  //les variables de eventListener et d'animation
  var vitesse = 0; //vitesse de déclarage pour les images
  let slideOutLimit = (canvas.width*2);
  let posX = 0;
  let posY = 0;
  let listenerForPrevious = $("#slider-previous");
  let listenerForAuto = $("#slider-auto");
  let listenerForNext = $("#slider-next");
  let listenerForRandom = $("#slider-random");
  let listenerTitre = $('#titre_image');

  /* =============== LES FONCTIONS =============== */


  function animate(){ //on capture l'event pour déterminer ce qu'on va desinner
    if(runAnimation){

        vitesse = 60;
        context.clearRect(0, 0, canvas.width, canvas.height); //je nettoie le myCanvas
        posX += vitesse;//je redessine avec position x -1

        // console.log("test 5 - slideoutlimit test " + slideOutLimit);
        // console.log("test 6 - posX test " + posX);
        context.drawImage(img, posX, 0, img.width,    img.height,     // source rectangle
                       0, 0, canvas.width, canvas.height); // destination rectangle
        //

        if(posX >= slideOutLimit){
          posX = 0;

          if(clickEvent=="next"){
            imageCounter = (imageCounter==5 ? 0 : imageCounter+1);
          }
          if(clickEvent=="previous"){
            imageCounter = (imageCounter==0 ? 5 : imageCounter-1);
          }
          if(clickEvent=="random"){

            let randomNumber = Math.floor(Math.random() * 6); //entre 0 et 5
            imageCounter = randomNumber;
            var index = imageTracker.indexOf(imageCounter);
            imageTracker.splice(index, 1);
            if(imageTracker==""){imageTracker = [0, 1, 2, 3, 4, 5];}
            console.log("testing imageTracker utilisé par pif" + imageTracker);
          }


          runAnimation = false;
          img.src = imagesContainerArray[imageCounter]._src;
          // showTests("testing current counter for imagesContainerArray object " + imageCounter)

          // showTests("testing if I can access the correct picture titles "+ imagesContainerArray[imageCounter]._titre);
          listenerTitre.html(imagesContainerArray[imageCounter]._titre);
          // showTests("testing if I can access listenerTitre à chaque action "+listenerTitre.html());
      }


    }
  }



  /* =============== CODE PRINCIPAL =============== */
  //
  //gestion des clicks sur les touches de l'écran
  img.addEventListener('load', function() { //je définie les actions à réaliser sur img une fois que img est chargé
    context.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                   0, 0, canvas.width, canvas.height); // destination rectangle
   listenerTitre.html(imagesContainerArray[imageCounter]._titre);
   listenerForPrevious.click(clickOnPrevious);
   listenerForNext.click(clickOnNext);
   listenerForAuto.click(clickOnAuto);
   listenerForRandom.click(clickOnRandom);
  }, false);



  // let pressedKey = clickOnKeyboardFindKey(wholeBody); //pour trouver sur quelle touche on appuie
  //gestion des clicks sur les touches du clavier
  //
  $(wholeBody).keyup(function(event) {
    if ( event.which == 39 ) {
      event.preventDefault();
      clickOnNext();
    }
    if ( event.which == 37 ) {
      event.preventDefault();
      clickOnPrevious();
    }
    if ( event.which == 32 ) {
      event.preventDefault();
      clickOnAuto();
    }
  });

  //declenchement du dessin
  let myInterval = setInterval(animate, 1000/60); //Notre boucle de rafraîchissement.

});
