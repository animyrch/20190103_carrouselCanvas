//quand on clique sur suivant, la vitesse est 10 (avec fade-in si possible) pendant un total de 400 (pour atteindre le prochaine image), après 0

//quand on clique sur précédent, la vitesse est -10 (avec fade-in si possible) pendant un total de 400

//quand on clique sur piff, c'est comme suivant mais on choisit l'image suivant de façon alétoire

//quand on clique sur auto, la vitesse est 10 pendant 400, 0 pendant 2 second, 10 pendant 400, etc.

//les fonctions utilisées par click events
let slideImage = () =>{runAnimation = true;};
let stopInterval= ()=>{
  if(autoRunning){clearTimeout(slideImageInterval);}
};
let autoRunning = false;

let clickOnPrevious = () => {
  stopInterval();
  showTests("test 1 - clique sur précédent");
  clickEvent = "previous";
  slideImage();
};
let clickOnNext = () => {
  stopInterval();
  showTests("test 2 - clique sur suivant");
  clickEvent = "next";
  slideImage();
};
let clickOnAuto = () => {
  showTests("test 3 - clique sur auto");
  clickEvent = "next";
  if(autoRunning){
    clearTimeout(slideImageInterval);
    autoRunning=false;
  }else{
    slideImageInterval = setInterval(slideImage, 1500);
    autoRunning = true;
  }
};
let clickOnRandom = () => {
  stopInterval();
  showTests("test 4 - clique sur piff");
  clickEvent = "random";
  slideImage();
};

let clickOnKeyboardFindKey = (charfield) => {
  charfield.onkeydown=function(evt){
    var keyCode = (evt.which?evt.which:(evt.keyCode?evt.keyCode:0))
    showTests(keyCode);
  }
};

// let reactToKeyboard = () =>{
//   if ( event.which == 39 ) {
//     event.preventDefault();
//     clickOnNext();
//   }
//   if ( event.which == 37 ) {
//     event.preventDefault();
//     clickOnPrevious();
//   }
//   if ( event.which == 32 ) {
//     event.preventDefault();
//     clickOnAuto();
//   }
// };
