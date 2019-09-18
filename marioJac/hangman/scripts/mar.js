<<<<<<< HEAD


=======
>>>>>>> ba6bb4cef5f13e4b4d2c923e17bba54461c4e58d
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
  /*HIER DAS DICTIONARY LADEN*/
<<<<<<< HEAD
  var modul = $(this).val();
  var keys = Object.keys(hangman_dictionary[modul]);
  var word2Guess = keys[Math.floor(Math.random() * keys.length)];
  var description = hangman_dictionary[modul][word2Guess];
  $('#hint').text(description);
=======
  var modul = $(this).text();
  var keys = Object.keys(hangman_dictionary[modul]);
  var word2Guess = hangman_dictionary[modul][Math.random() * keys.length];
  var description = hangman_dictionary[modul][word2Guess];
>>>>>>> ba6bb4cef5f13e4b4d2c923e17bba54461c4e58d
});



word = "Attribut";
for (var i=0; i < word.length; i++){
  console.log(word[i]);
}

var findMe = function(word, eingabe){
  var index = word.indexOf(eingabe, index);
  var zaehler = 0;
  while (index >= 0){
    console.log("'"+eingabe + "'" + " gefunden an Pos:" +index);
    index = word.indexOf(eingabe, index+1);
    zaehler++;
  }
  return zaehler;
}

var word = "Attribut";
if (findMe(word, "z")==0){
  console.log("z wurde nicht gefunden.")
}
findMe(word, "t");
