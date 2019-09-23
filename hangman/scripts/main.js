var word;
var arrChar = [];
var arrUsedLetters = [];
var arrUnderL = [];
var check = true;
var char;
var counter = 7;
var elem;
var winsInARow = 0;


var hangman_dictionary = {

    "M101": { "Datentyp": "eine Komponente der Variablendeklaration",
      "Rückgabetyp": "Bestandteil Funktionskopf"},
    "M104": { "Datentyp": "eine Komponente der Variablendeklaration",
      "Rückgabetyp": "Bestandteil Funktionskopf"},
    "M105": { "Grafik": "eine visuelle Darstellung im Web",
      "Rückgabetyp": "Bestandteil Funktionskopf"},
    "M133": { "Datentyp": "eine Komponente der Variablendeklaration",
      "Rückgabetyp": "Bestandteil Funktionskopf"},
    "M152": { "Grafik": "eine visuelle Darstellung im Web",
      "Rückgabetyp": "Bestandteil Funktionskopf"},
    "M226A": { "Klasse": "Bauplan für gleichartige Objekte",
      "Objekt": "Ausprägung bzw. Instanz einer Klasse",
      "Konstruktor": "Klassenfunktion zum Erstellen eines Objekts"},
    "M307": { "Grafik": "eine visuelle Darstellung im Web",
      "Rückgabetyp": "Bestandteil Funktionskopf"},
    "M403": { "Datentyp": "eine Komponente der Variablendeklaration",
      "Variablenname": "eine Komponente Variablendeklaration",
      "Parameterliste": "Bestandteil vom Funktionskopf",
      "Rückgabetyp": "Bestandteil Funktionskopf"
  }
};



$('.btnModul').on('click', function(){
  document.getElementById('versuche').innerHTML = counter;
  document.getElementById('getWord').innerHTML = "";
  $('.char').removeClass('disable');

  counter = 7;
  arrUnderL = [];
  arrChar = [];


  /*Dictionary wird geladen*/
  var modul = $(this).val();
  var keys = Object.keys(hangman_dictionary[modul]);
  word = keys[Math.floor(Math.random() * keys.length)]
  wordUpper = word.toUpperCase();
  var description = hangman_dictionary[modul][word];
  $('#hint').text(description);
  chooseWord();
});





//Funktion - Gibt das Wort mit Underlines aus
function chooseWord() {
  for(var x = 0; x < word.length; x++) {
    arrUnderL.push('_');
    arrChar.push(wordUpper[x]);
  }
  //Wort wird mit Leerzeichen als Trennzeichen ausgegeben
  document.getElementById('getWord').innerHTML = arrUnderL.join(' ');
}



//Funktion - Klick auf Buchstabe holt Buchstabe in Variable
window.onload = function(e) {
  document.getElementById('img').src = "img/7.jpg";
    var myFunction = function() {
    elem = event.target;
    char = elem.innerHTML;
    //wieso auch immer, in "char" hat es ewig viele Leerzeichen. Damit werden sie entfernt
    char = char.replace(/\s/g, "");
  }
  var clickDivs = document.getElementsByClassName('char');
  for(var x=0; x<clickDivs.length; x++) {
    clickDivs[x].addEventListener('click', myFunction);
    clickDivs[x].addEventListener('click', checkChar);
  }
}

//Funktion - um die Buchstaben im Wort abzuchecken

var checkChar = function() {



  var check = false;

  if($(elem).hasClass('disable')) {
  }

  else {

    for(var x = 0; x < arrChar.length; x++) {
      if(arrChar[x] == char) {
        arrUnderL[x] = char;
        check = true;
      }
      if(!arrUnderL.includes("_")) {
        winsInARow++;
        if(window.location.href == "http://localhost/LW1_Webdev/hangman/") {

          window.location.assign("http://localhost/LW1_Webdev//hangman/start.html");
        }

        document.getElementById('versuche').innerHTML = "<span>Du hast " + winsInARow + " Mal in Folge gewonnen!</span> <br> Gewinne so viele Spiele wie möglich nacheinander und wähle ein neues Modul..";
        $('.char').addClass('disable');

      }

    }
    if(!check) {
      counter--;
      document.getElementById('img').src = "img/" + counter + ".png";
      document.getElementById('versuche').innerHTML = counter;
      if(counter == 0) {
        document.getElementById('versuche').innerHTML = "<span>Du bist tot!</span> <br> Wenn du weiterspielen möchtest, erneut ein Modul wählen.";
        $('.char').addClass('disable');
      }
    }


    document.getElementById('getWord').innerHTML = arrUnderL.join(' ');

    elem.classList.add('disable');
  }
}
