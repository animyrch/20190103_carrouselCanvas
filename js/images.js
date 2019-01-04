var imagesContainerArray = []; //variable global pour contenir nos objects image
let subjectOfPictures = [
  "Jolie tag sur mur",
  "Voitures sur un pont sur une rivière",
  "Bâtiment Chalmerg",
  "New York centre-ville",
  "Washington Grateciels",
  "Tour Eiffel au soir"
];
let numberOfPictures = subjectOfPictures.length;

class Picture {
  constructor(src, titre, formFactor = "landscape") {
    this._src = src;
    this._formFactor = formFactor;
    this._titre = titre;
  }
}


for(let i = 1; i<=numberOfPictures; i++){
  let imgAddress = "";
  imgAddress += "src/";
  imgAddress += i;
  imgAddress += ".jpg";

  let picture = new Picture(imgAddress,subjectOfPictures[i-1]);

  imagesContainerArray.push(picture);
}
