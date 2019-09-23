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
    "M101": {
      "Datentyp": "eine Komponente der Variablendeklaration",
      "Response": "Gegenteil von REQUEST?",
      "Element": "Wie nennt man folgende HTML Begriffe in Fachsprache: <a>, <body>, <h1>?",
      "href": "Wo ist der link im <a> Element abgelegt?",
      "Atom": "Ein sehr bekannter Texteditor für HTML/CSS",
      "Selektor": "Wie nennt man den Start eines CSS Objekts?",
      "Padding": "Wie bezeichnet man den Innenabstand in CSS?",
      "Margin": "Wie bezeichnet man den Aussenabstand in CSS?"},
    "M104": {
      "Datentyp": "eine Komponente der Variablendeklaration",
      "beziehungen": "Was wird im ERM Modell dargestellt? Tipp: keine Attribute / Daten, das gesuchte Wort ist in der Mehrzahl.",
      "kardinalitaet": "Wie heisst der Überbegriff folgender Bezeichnungen: 1:1, 1:n, n:m",
      "entity": "Für was steht das 'E' im Wort ERD/ERM?",
      "relation": "Für was steht das 'R' im Wort ERD/ERM?",
      "model": "Für was steht das 'M' im Wort ERM?",
      "foreign": "Englisches Wort für 'Fremd'?",
      "primaerschlüssel": "Kein Hausschlüssel sondern?",
      "spalte": "Teil einer Tabelle der von oben nach unten gelesen wird",
      "zeile": "Teil einer Tabelle der von links nach rechts gelesen wird"},
    "M105": {
      "normalform": "es gibt mehrere Formen wie heissen diese?",
      "root": "Welcher MYSQL Befehl um sich als Admin anzumelden?",
      "help": "Befehl um Hilfeanzeige zu erhalten",
      "drop": "Befehl um Datenbank zu löschen",
      "group": "Überbegriff für Gruppierung",
      "select": "am häufigsten verweneter MYSQL Befehl",
      "datenbank": "Wie nennt man eine Sammlung vieler Daten"},
    "M133": {
      "Datentyp": "eine Komponente der Variablendeklaration",
      "preprocessor": "Für was stehen die beiden P in 'PHP'?",
      "hypertext": "Für was steht das H in 'PHP'?",
      "owasp": "Wie nennt man die bekannteste Schwachstellen Rangliste? (nur der Name)",
      "injection": "Die am häufigsten vorkommende Schwachstelle? (basiert auf nicht Validierung der Formulare)",
      "programmierschnittstelle": "Was ist eine API?",
      "array": "Wie nennt man eine Liste in PHP?",
      "blackbox": "Wie nennt man den Test, bei dem die Testperson keinerlei Informationen erhält?",
      "whitebox": "Wie nennt man den Test, bei dem der Testperson alle Informationen zur Verfügugn gestellt werden? (ink. Quellcode)"},
    "M152": {
      "Grafik": "eine visuelle Darstellung im Web",
      "serifen": "Es gibt Schriftarten mit und ohne ???",
      "grafik": "Visuelle Darstellung im Web",
      "font": "Englischer Begriff für 'Schriftart'?",
      "bitmap": "bmp ausgeschrieben?"},
    "M226A": {
      "Klasse": "Bauplan für gleichartige Objekte",
      "Objekt": "Ausprägung bzw. Instanz einer Klasse",
      "Konstruktor": "Klassenfunktion zum Erstellen eines Objekts",
      "klasse": "wird auch als 'Bauplan' für Objekte der OOP bezeichnet",
      "aggregation": "Bei einer ???: das Objekt ist von der Klasse unabhängigt und lebt weiter selbst wenn die Klasse nicht mehr existieren sollte",
      "komposition": "Bei der ??? ist die Klasse zwingend notwendig, damit das Objekt / die Klasse überhaupt leben kann",
      "assoziation": "Bei einer ??? besteht eine Verbindung zwischen zwei Objekten / Klasse & Objekt",
      "unified": "Wofür steht das 'U' bei UML?",
      "modeling": "Wofür steht das 'M' bei UML?",
      "language": "Wofür steht das 'L' bei UML?",
      "konstruktor": "wird  beim Erzeugen bzw. Auflösen von Objekten und Variablen aufgerufen",
      "setter": "Eine Methode zum setzen z.B eines Textes",
      "getter": "Eine Methode zum etwas erhalten z.B ein Text"},
    "M307": {
      "document": "Für was steht das 'D' in DOM?",
      "object": "Für was steht das 'O' in DOM?",
      "model": "Für was steht das 'M' in DOM?",
      "debugging": " Fehler oder Probleme in einem Computerprogramm finden und beheben"},
    "M403": {
      "Rückgabetyp": "Bestandteil Funktionskopf",
      "Datentyp": "eine Komponente der Variablendeklaration",
      "gleitkommazahl": "Was ist ein double? Tipp: es ist eine Zahl ;)",
      "ganzzahl": "Was ist ein double? Tipp: es ist eine Zahl ;)",
      "boolean": "Wie heisst der Datentyp für true/false?",
      "byte": "1 ??? Hat 8 Bits",
      "Variablenname": "eine Komponente Variablendeklaration",
      "Parameterliste": "Bestandteil vom Funktionskopf",
      "Rückgabetyp": "Bestandteil Funktionskopf"}
};



$('.btnModul').on('click', function(){
  document.getElementById('img').src = "img/7.jpg";
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
        if(window.location.href == "http://localhost/LW1_Webdev/project/") {

          window.location.assign("http://localhost/LW1_Webdev//project/start.html");
        }
        document.getElementById('img').src = "img/win.png";
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
        winsInARow = 0;
        $('.char').addClass('disable');
      }
    }


    document.getElementById('getWord').innerHTML = arrUnderL.join(' ');

    elem.classList.add('disable');
  }
}
