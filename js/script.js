{
function playGame(playerInput){
  clearMessages();

  const rock = 1;
  const paper = 2;
  const scissors = 3;

  function getMoveName(argMoveId){
    if(argMoveId == rock){
      return 'kamień';
    } else if(argMoveId == paper){
      return 'papier';
    } else if(argMoveId == scissors){
      return 'nożyce';
    } else {
      printMessage('Nie znam ruchu o id ' + argMoveId + '.');
      return 'nieznany ruch';
    }
  }

  function displayResult(argComputerMove, argPlayerMove){
    printMessage('Zagrałem ' + argComputerMove + ', a Ty ' + argPlayerMove);

    if( argComputerMove == 'kamień' && argPlayerMove == 'papier'){
      printMessage('Ty wygrywasz!');
    } else {
      printMessage('Tym razem przegrywasz :(');
    }
  }

  let randomNumber = Math.floor(Math.random() * 3 + 1);

  console.log('Wylosowana liczba to: ' + randomNumber);

  let argComputerMove = getMoveName(randomNumber);

  printMessage('Mój ruch to: ' + argComputerMove);

  //ruch gracza
  //let playerInput = prompt('Wybierz swój ruch! 1: kamień, 2: papier, 3: nożyce.');

  console.log('Gracz wpisał: ' + playerInput);

  let argPlayerMove = getMoveName (playerInput) 

  printMessage('Twój ruch to: ' + argPlayerMove);

  //mechanizm gry

  function displayResult(argComputerMove, argPlayerMove){
    printMessage('Zagrałem ' + argComputerMove + ', a Ty ' + argPlayerMove);
  }
  if( argComputerMove == 'kamień' && argPlayerMove == 'papier'){
    printMessage('Ty wygrywasz!');
  } else if (argComputerMove == 'kamień' && argPlayerMove == 'nożyce'){
    printMessage('Przegrywasz!');
  } else if (argComputerMove == 'kamień' && argPlayerMove == 'kamień'){
    printMessage('Remis!');
  } else if (argComputerMove == 'papier' && argPlayerMove == 'kamień'){
    printMessage('Przegrywasz!');
  } else if (argComputerMove == 'papier' && argPlayerMove == 'papier'){
    printMessage('Remis!');
  } else if (argComputerMove == 'papier' && argPlayerMove == 'nożyce'){
    printMessage('Ty wygrywasz!');
  } else if (argComputerMove == 'nożyce' && argPlayerMove == 'nożyce'){
    printMessage('Remis!');
  } else if (argComputerMove == 'nożyce' && argPlayerMove == 'papier'){
    printMessage('Przegrywasz!');
  } else if (argComputerMove == 'nożyce' && argPlayerMove == 'kamień'){
    printMessage('Ty wygrywasz!');
  } 
}

document.getElementById('play-paper').addEventListener('click', function () { playGame(paper) });
document.getElementById('play-rock').addEventListener('click', function () { playGame(rock) });
document.getElementById('play-scissors').addEventListener('click', function () { playGame(scissors) });
}