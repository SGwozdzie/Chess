//ODLICZANIE DO KOŃCA
const timerFunc = (time) => {
  const whiteT = document.querySelector('.whiteTimer');
  const blackT = document.querySelector('.blackTimer');
  const number = time;
  let timeW = number;
  let timeB = number;

  return () => {
    const timer = setInterval(() => {
      if (side == true) {
        timeW--;
        if (timeW % 60 < 10)
          whiteT.textContent = `${Math.ceil((timeW - 59) / 60)}:0${timeW % 60}`;
        else if (timeW == 0) {
          endOfGame('black');
          clearInterval(timer);
        } else {
          whiteT.textContent = `${Math.ceil((timeW - 59) / 60)}:${timeW % 60}`;
        }
      } else {
        timeB--;
        if (timeB % 60 < 10)
          blackT.textContent = `${Math.ceil((timeB - 59) / 60)}:0${timeB % 60}`;
        else if (timeB == 0) {
          endOfGame('white');
          clearInterval(timer);
        } else {
          blackT.textContent = `${Math.ceil((timeB - 59) / 60)}:${timeB % 60}`;
        }
      }
    }, 1000);
    if (timeB == 0) endOfGame('white');
  };
};

//WPROWADZANIE CZASU
const test = () => {
  return 300;
};
const gameTime = test();

//TEKST POCZĄTKOWY
openText = (e) => {
  if (side == true)
    setTimeout(() => (h.textContent = 'Ruch białych'), e * 1000);
  else setTimeout(() => (h.textContent = 'Ruch czarnych'), e * 1000);
};

//CZYSZCZENIE
const clearFigure = (e) => {
  selectedFigure = null;
  e.classList.remove('selected');
  boards.forEach((board) => {
    board.classList.remove('highlight');
  });
  // openText(1);
};

//POBRANIE NAZWY
const getName = (e) => {
  const figureSpecifics = [...e.classList];
  const figureName = figureSpecifics.find(
    (e) =>
      e == 'pawn' ||
      e == 'knight' ||
      e == 'queen' ||
      e == 'rook' ||
      e == 'king' ||
      e == 'bishop'
  );
  return figureName;
};

//POBRANIE STRONY
const getSide = (e) => {
  const figureSpecifics = [...e.classList];
  const figureSide = figureSpecifics.find(
    (element) => element == 'black' || element == 'white'
  );
  return figureSide;
};

//FUNKCJA WYBORU FIGURY
const selectFigure = (e) => {
  const selectedFigure = e.querySelector('img');
  //sprawdzanie pustego pola
  if (selectedFigure == null) {
    //zwracam napis i ruch od początku
    h.textContent = 'Wybierz figurę';
    return openText(1);
  }
  //sprawdzanie stronnictwa
  figureSide = getSide(selectedFigure);
  if (
    (side == true && figureSide == 'black') ||
    (side == false && figureSide == 'white')
  ) {
    h.textContent = 'To nie twoja figura!';
    return openText(1);
  }
  //wybrano figurę
  //pokazuje wybraną figurę
  selectedFigure.classList.add('selected');
  flag = !flag;
  return selectedFigure;
};

//FUNKCJA RUCHU FIGURY
const moveFigure = (e) => {
  const figureOnArea = e.querySelector('img');
  //odklikanie
  if (figureOnArea === selectedFigure) {
    clearFigure(selectedFigure);
    flag = !flag;
    return openText(0.2);
  }
  //sprawdzenie ruchu
  if (!e.classList.contains('highlight')) {
    h.textContent = 'Niemożliwy ruch';
    return openText(0.4);
  }
  //sprawdzanie pustego pola
  if (figureOnArea !== null) {
    //sprawdzanie stronnictwa
    figureOnAreaSide = getSide(figureOnArea);
    // if (selectedFigureSide == figureOnAreaSide) {
    //   h.textContent = 'To twoja figura!';
    //   return openText(1);
    // } else {
    //zbicie figury
    h.textContent = 'Zbicie!';
    //figure do cmentarza
    if (figureOnAreaSide == 'black') whiteG.appendChild(figureOnArea);
    else blackG.appendChild(figureOnArea);
  }
  //przejście figury
  const figureJustMoved = moveToPlace(e, selectedFigure);
  clearFigure(selectedFigure);
  //RENDER DANGER ZONE
  boards.forEach((board) => {
    //czyszczenie starych
    board.classList.remove('dangerZoneBlack');
    board.classList.remove('dangerZoneWhite');
  });
  boards.forEach((board, i) => {
    //dodanie nowych
    dangerZone(board, i);
  });
  check !=
    boards.every((board) => {
      //sprawdzanie szacha
      return !checkmate(board, figureJustMoved);
    });
  // console.log(figureJustMoved);
  side = !side;
  flag = !flag;
  if (check == false && win == false) openText(0.4);
  else if (check == true && win == false) openText(0.4);
};

//PRZEMIESZCZENIE FIGURY
const moveToPlace = (place, selectedFigure) => {
  if (castlingInAction == true && place == boards[7])
    castling(place, selectedFigure, 1);
  else if (castlingInAction == true && place == boards[63])
    castling(place, selectedFigure, 2);
  else {
    place.appendChild(selectedFigure);
    selectedFigure.dataset.moves++;
    return [selectedFigure, selectedFigure.dataset.place];
  }
};

//FUNKCJA WPROWADZENIA ZAGROŻONYCH PÓL
const dangerZone = (tile, n) => {
  selectedFigure = tile.children.item('');
  if (selectedFigure == null) return;
  selectedFigureSide = getSide(selectedFigure);
  selectedFigureName = getName(selectedFigure);
  selectedFigure.dataset.place = n;
  danger = true;
  showFigureMoves(selectedFigure, n);
  clearFigure(tile);
};

//PODKREŚLANIE PÓL
const highlight = (tileIndex) => {
  // console.log(tile);
  if (danger == false) boards[tileIndex].classList.add('highlight');
  else if (danger == true) {
    // console.log(selectedFigureSide);
    currentSide = title(selectedFigureSide);
    boards[tileIndex].classList.add(`dangerZone${currentSide}`);
  }
};

const title = (word) => {
  return word.charAt(0).toUpperCase() + selectedFigureSide.slice(1);
};

//DLA KRÓLA, WYKLUCZANIE ZAGROŻONYCH RUCHÓW
const checkMove = (side) => {
  if (side == 'white') currentSide = 'Black';
  else if (side == 'black') currentSide = 'White';
  if (boards[m].classList.contains(`dangerZone${currentSide}`)) return true;
  return false;
};

//SPRAWDZENIE SZACHA
const checkmate = (tile, figureJustMoved) => {
  const figure = tile.children.item('');
  if (figure == null) return;
  if (getName(figure) == 'king') {
    if (getSide(figure) == 'white') currentSide = 'Black';
    else currentSide = 'White';
    if (tile.classList.contains(`dangerZone${currentSide}`)) {
      if (getSide(figure) == getSide(figureJustMoved[0])) {
        return moveBack(figureJustMoved);
      }
      h.textContent = 'Szach';
      figure.dataset.checkmate++;
      if (figure.dataset.checkmate >= '2') {
        console.log('Szach mat');
        endOfGame(currentSide);
      }
      return (check = true);
    } else {
      figure.dataset.checkmate = 0;
      return (check = false);
    }
  }
};

//SPRAWDZANIE ROSZADY
const checkCastling = (kingSide) => {
  if (kingSide == 'white') {
    if (boards[62].classList.contains('dangerZoneBlack')) return;
    const first = boards[61].children.item('');
    const second = boards[62].children.item('');
    const rook = boards[63].children.item('');
    if (
      rook.dataset.moves == 0 &&
      first == null &&
      second == null &&
      check == false
    ) {
      highlight(63);
      return (castlingInAction = true);
    }
  } else if (kingSide == 'black') {
    if (boards[6].classList.contains('dangerZoneWhite')) return;
    const first = boards[5].children.item('');
    const second = boards[6].children.item('');
    const rook = boards[7].children.item('');
    if (
      rook.dataset.moves == 0 &&
      first == null &&
      second == null &&
      check == false
    ) {
      highlight(7);
      return (castlingInAction = true);
    }
  }
};

//FUNKCJA ROSZADY
const castling = (rookPlace, king, option) => {
  castlingInAction = false;
  let rook = '';
  switch (option) {
    case 1:
      rook = document.querySelectorAll('.rook.black');
      moveToPlace(boards[5], rook[0]);
      moveToPlace(boards[6], king);
      break;
    case 2:
      rook = document.querySelectorAll('.rook.white');
      moveToPlace(boards[61], rook[1]);
      moveToPlace(boards[62], king);
      break;
  }
  // console.log(rookPlace);
  // moveToPlace(rookPlace, king);
};

//COFANIE RUCHU SZACHOWANEGO
const moveBack = (e) => {
  moveToPlace(boards[e[1]], e[0]);
  e[0].dataset.moves -= 2;
  side = !side;
  return (h.textContent = 'Szach!');
};

//KONIEC GRY
const endOfGame = (side) => {
  win = true;
  h.textContent = `Wygrała drużyna ${side == 'white' ? 'biała' : 'czarna'}`;
  boards.forEach((board) => {
    // koniec gry
    board.removeEventListener('click', playFigure);
  });
};
//side = true - biały
