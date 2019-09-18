var word;
var arrChar = [];
var arrUsedLetters = [];
var arrUnderL = [];
var wordToCompare;
var check = true;
var char;
var counter = 0;
var elem;

//Funktion - Gibt das Wort mit Underlines aus
window.addEventListener('load', function() {

  //Wort wird aus Array geholt
  var words = ["DATEN"];
  var rand = Math.floor(Math.random()*words.length);
  word = words[rand];

  //Die einzelnen Buchstaben sowie die nötige Anzahl Underlines werden in je ein Array gepusht
  for(var x = 0; x < word.length; x++) {
    arrUnderL.push('_');
    arrChar.push(word[x]);
  }
  //Wort wird mit Leerzeichen als Trennzeichen ausgegeben
  document.getElementById('getWord').innerHTML = arrUnderL.join(' ');
});

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
  check = true;
  var usedLetters = document.getElementById('usedLetters').innerHTML;;

  if($(elem).hasClass('disable')) {
  }

  else {

    if(usedLetters.includes(char)) {
      console.log("contains");

    }
    else {
      console.log("arrUsedLetters.length: " + arrUsedLetters.length);
      for(var x = 0; x <= arrUsedLetters.length; x++) {
        if(arrUsedLetters[x] == char) {
          check = false;
          console.log(check);
        }

        else {
          arrUsedLetters.push(char);
        }

        if(check) {


          document.getElementById('usedLetters').innerHTML = arrUsedLetters.join(' ');
          console.log("arrChar.length: " + arrChar.length);
          for(var x = 0; x < arrChar.length; x++) {
            if(arrChar[x] == char) {
              arrUnderL[x] = char;
            }
          }
          document.getElementById('getWord').innerHTML = arrUnderL.join(' ');
        }


      }
      usedLetters = document.getElementById('usedLetters').innerHTML;
      console.log(usedLetters);
    }
  }
  elem.classList.add('disable');
}

//document.getElementById('check').onclick = checkChar;

//Funktion um die Buchstaben im Wort abzuchecken


//get Char on keyPressed


/*window.addEventListener('keypress',
function(event) {
var x = event.which || event.keyCode;
var buchst = String.fromCharCode(x);
document.getElementById("charOut").innerHTML = buchst;
})*/


//document.getElementById('check').onclick = checkChar;
