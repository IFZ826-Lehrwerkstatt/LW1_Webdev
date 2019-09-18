var word;
var arrChar = [];
var arrUsedLetters = [];
var arrUnderL = [];
var wordToCompare;
var check = true;
var char;
var counter = 0;
var elem;



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
  document.getElementById('getWord').innerHTML = "";
  arrUnderL = [];
  arrChar = [];


  /*Dictionary wird geladen*/
  var modul = $(this).val();
  var keys = Object.keys(hangman_dictionary[modul]);
  word = keys[Math.floor(Math.random() * keys.length)].toUpperCase();
  console.log(word);
  var description = hangman_dictionary[modul][word];
  $('#hint').text(description);
  console.log("Word: " + word);

  chooseWord();
});





//Funktion - Gibt das Wort mit Underlines aus
function chooseWord() {
  for(var x = 0; x < word.length; x++) {
    arrUnderL.push('_');
    arrChar.push(word[x]);
  }
  //Wort wird mit Leerzeichen als Trennzeichen ausgegeben
  document.getElementById('getWord').innerHTML = arrUnderL.join(' ');
}



//Funktion - Klick auf Buchstabe holt Buchstabe in Variable
window.onload = function(e) {
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

  if($(elem).hasClass('disable')) {
  }

  else {
    console.log("arrChar.length: " + arrChar.length);
    for(var x = 0; x < arrChar.length; x++) {
      if(arrChar[x] == char) {
        arrUnderL[x] = char;
      }
    }
    console.log("arrChar: " + arrChar);
    console.log("char: " + char);
    document.getElementById('getWord').innerHTML = arrUnderL.join(' ');

    elem.classList.add('disable');
  }
}
