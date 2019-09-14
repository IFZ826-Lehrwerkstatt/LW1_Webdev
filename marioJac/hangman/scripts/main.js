
/*Funktion um die Anzahl Underlines auszugeben*/



/*Funktion um die Anzahl Underlines auszugeben*/

var word;
var arrChar = [];
var arrUsedLetters = [];
var arrUnderL = [];
var wordToCompare;
var check = true;

var chooseWord = function() {

  //Wort wird aus Array geholt
  var words = ["ATTRIBUT"];
  var rand = Math.floor(Math.random()*words.length);
  word = words[rand];

  //Die einzelnen Buchstabenm sowie die nötige Anzahl Underlines werden in je ein Array gepusht
  for(var x = 0; x < word.length; x++) {
    arrUnderL.push('_');
    arrChar.push(word[x]);


  }

  //Wort wird mit Leerzeichen als Trennzeichen ausgegeben
  document.getElementById('getWord').innerHTML = arrUnderL.join(' ');
}

window.onload = chooseWord;

//Funktion um die Buchstaben im Wort abzuchecken

var checkChar = function() {
  check = true;
  document.getElementById('try').innerHTML = "";
  //Mehr als ein Buchstabe eingegeben?
  var char = document.getElementById('inputLetter').value.toUpperCase();


  console.log(usedLetters);
  console.log("Bitte");

  if(char.length > 1) {
    document.getElementById('try').innerHTML = "Nur 1 Buchstabe eingeben!";
  }

  else {
    if(!char.match(/[A-Za-z]/)) {
      document.getElementById('try').innerHTML = "Nur Buchstaben eingeben!";
    }
    else {
      console.log("Hiiilfe");
      console.log("Length: " + arrUsedLetters.length);
      for(var x = 0; x <= arrUsedLetters.length; x++) {
        if(arrUsedLetters[x] == char) {
          console.log("Figg di");
          document.getElementById('try').innerHTML = "Buchstabe bereits gecheckt!";

          check = false;
        }

      }

      if(check) {
        check = true;
        console.log(char);
        arrUsedLetters.push(char);
        document.getElementById('usedLetters').innerHTML = arrUsedLetters.join(' ');

        for(var x = 0; x < arrChar.length; x++) {
          if(arrChar[x] == char) {
            arrUnderL[x] = char;
          }
          else {
            //document.getElementById('try').innerHTML = "Buchstabe kommt nicht vor!";
          }

        }

        document.getElementById('getWord').innerHTML = arrUnderL.join(' ');
      }


    }





  }
}






document.getElementById('check').onclick = checkChar;

//Funktion um die Buchstaben im Wort abzuchecken

var checkChar = function() {
  check = true;
  document.getElementById('try').innerHTML = "";
  //Mehr als ein Buchstabe eingegeben?
  var char = document.getElementById('inputLetter').value.toUpperCase();


  console.log(usedLetters);
  console.log("Bitte");

  if(char.length > 1) {
    document.getElementById('try').innerHTML = "Nur 1 Buchstabe eingeben!";
  }

  else {
    if(!char.match(/[A-Za-z]/)) {
      document.getElementById('try').innerHTML = "Nur Buchstaben eingeben!";
    }
    else {
      console.log("Hiiilfe");
      console.log("Length: " + arrUsedLetters.length);
      for(var x = 0; x <= arrUsedLetters.length; x++) {
        if(arrUsedLetters[x] == char) {
          console.log("Figg di");
          document.getElementById('try').innerHTML = "Buchstabe bereits gecheckt!";

          check = false;
        }

      }

      if(check) {
        check = true;
        console.log(char);
        arrUsedLetters.push(char);
        document.getElementById('usedLetters').innerHTML = arrUsedLetters.join(' ');

        for(var x = 0; x < arrChar.length; x++) {
          if(arrChar[x] == char) {
            arrUnderL[x] = char;
          }
          else {
            //document.getElementById('try').innerHTML = "Buchstabe kommt nicht vor!";
          }

        }

        document.getElementById('getWord').innerHTML = arrUnderL.join(' ');
      }


    }





  }
}






document.getElementById('check').onclick = checkChar;
