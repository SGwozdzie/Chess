//GŁÓWNA FUNKCJA GRY
const playFigure = function () {
  if (flag === false) {
    //sprawdzenie pola, przy pustym powrót
    selectedFigure = selectFigure(this);
    if (selectedFigure == null) return;
    //przypisanie figury, miejsca itp.
    selectedFigureSide = getSide(selectedFigure);
    selectedFigureName = getName(selectedFigure);
    const n = boards.indexOf(this);
    //dostępne ruchy wybraje figury
    danger = false;
    showFigureMoves(selectedFigure, n);
  } else if (flag === true) {
    moveFigure(this);
  }
};

const boards = [...document.querySelectorAll('div div')];

boards.forEach((board, i) => {
  // dodanie zagrożonych pól
  dangerZone(board, i);
  // obsługa kliknięcia
  board.addEventListener('click', playFigure);
});

openText(1);
