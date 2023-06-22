//COFANIE RUCHU PO KTÓRYM ZACHODZI SZACH

//SPRAWDZANIE BLOKADY
const checkBlock = (e) => {
  if (e == 'white') {
    const b = boards[m].children.item('');
    if (b == null) return false;
    else if (b.classList.contains('white'))
      boards[m].classList.remove('highlight');
    return true;
  }
  if (e == 'black') {
    const b = boards[m].children.item('');
    if (b == null) return false;
    else if (b.classList.contains('black'))
      boards[m].classList.remove('highlight');
    return true;
  }
};

//SPRAWDZANIE KRÓLA
const blockByYours = (e) => {
  const b = boards[m].children.item('');
  if (b == null) return false;
  if (b.classList.contains(`${e}`)) return true;
  return false;
};

//SPRAWDZANIE PIONKA
const BlockByOther = (e) => {
  const b = boards[m].children.item('');
  if (b == null || b.classList.contains(`${e}`)) return false;
  return true;
};

//FUNKCJA DOSTĘPNYCH RUCHÓW
const showFigureMoves = (e, n) => {
  const selectedFigurePlaceX = (n % 8) + 1;
  const selectedFigurePlaceY = Math.floor(n / 8 + 1);
  let x = selectedFigurePlaceX - 1;
  let y = selectedFigurePlaceY - 1;
  let blocked = false;
  switch (selectedFigureName) {
    //ruch pionka
    case 'pawn':
      for (let i = 0; i < 3; i++) {
        if (selectedFigureSide == 'black') {
          if (x == 0) m = (y + 1) * 8 + x;
          else if (x < 9) m = (y + 1) * 8 + (x - 1);
          if (
            (x == selectedFigurePlaceX &&
              checkBlock(selectedFigureSide) == false &&
              danger == false) ||
            (x !== selectedFigurePlaceX &&
              BlockByOther(selectedFigureSide) == true) ||
            (x !== selectedFigurePlaceX &&
              danger == true &&
              checkBlock(selectedFigureSide) == false)
          )
            highlight(m);
          x++;
        } else {
          if (x == 0) m = (y - 1) * 8 + x;
          else if (x < 9) m = (y - 1) * 8 + (x - 1);
          if (
            (x == selectedFigurePlaceX &&
              checkBlock(selectedFigureSide) == false &&
              danger == false) ||
            (x !== selectedFigurePlaceX &&
              BlockByOther(selectedFigureSide) == true) ||
            (x !== selectedFigurePlaceX &&
              danger == true &&
              checkBlock(selectedFigureSide) == false)
          )
            highlight(m);
          x++;
        }
      }
      x = selectedFigurePlaceX - 1;
      y = selectedFigurePlaceY - 1;
      //pierwszy ruch pionka
      if (selectedFigure.dataset.moves == 0 && selectedFigureSide == 'black') {
        m = (y + 1) * 8 + x;
        if (checkBlock(selectedFigureSide)) break;
        m = (y + 2) * 8 + x;
        if (blockByYours(selectedFigureSide)) break;
        highlight(m);
      } else if (
        selectedFigure.dataset.moves == 0 &&
        selectedFigureSide == 'white'
      ) {
        m = (y - 1) * 8 + x;
        if (checkBlock(selectedFigureSide)) break;
        m = (y - 2) * 8 + x;
        if (blockByYours(selectedFigureSide)) break;
        highlight(m);
      }
      if (danger == false)
        h.textContent = `Wybrano ${
          selectedFigureSide == 'white' ? 'białego' : 'czarnego'
        } pionka z miejsca X${selectedFigurePlaceX}, Y${selectedFigurePlaceY}`;
      break;
    //ruch króla
    case 'king':
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (y == 0) {
            if (x == 0) m = y * 8 + x;
            else if (x < 9) m = y * 8 + (x - 1);
          } else if (y < 9) {
            if (x == 0) m = (y - 1) * 8 + x;
            else if (x < 9) m = (y - 1) * 8 + (x - 1);
          }
          if (
            (blockByYours(selectedFigureSide) ||
              checkMove(selectedFigureSide)) == false
          ) {
            highlight(m);
          }
          x++;
        }
        x = selectedFigurePlaceX - 1;
        y++;
      }
      boards[n].classList.remove('highlight');
      if (selectedFigure.dataset.moves == 0 && danger == false)
        checkCastling(selectedFigureSide);
      if (danger == false)
        h.textContent = `Wybrano ${
          selectedFigureSide == 'white' ? 'białego' : 'czarnego'
        } króla z miejsca X${selectedFigurePlaceX}, Y${selectedFigurePlaceY}`;
      break;
    //ruch konia
    case 'knight':
      if (y >= 1) {
        if (x >= 2) {
          m = (y - 1) * 8 + (x - 2);
          if (blockByYours(selectedFigureSide) == false) highlight(m);
        }
        if (x <= 5) {
          m = (y - 1) * 8 + (x + 2);
          if (blockByYours(selectedFigureSide) == false) highlight(m);
        }
      }
      if (y >= 2) {
        if (x >= 1) {
          m = (y - 2) * 8 + (x - 1);
          if (blockByYours(selectedFigureSide) == false) highlight(m);
        }
        if (x <= 6) {
          m = (y - 2) * 8 + (x + 1);
          if (blockByYours(selectedFigureSide) == false) highlight(m);
        }
      }
      if (y <= 5) {
        if (x >= 1) {
          m = (y + 2) * 8 + (x - 1);
          if (blockByYours(selectedFigureSide) == false) highlight(m);
        }
        if (x <= 6) {
          m = (y + 2) * 8 + (x + 1);
          if (blockByYours(selectedFigureSide) == false) highlight(m);
        }
      }
      if (y <= 6) {
        if (x >= 2) {
          m = (y + 1) * 8 + (x - 2);

          if (blockByYours(selectedFigureSide) == false) highlight(m);
        }

        if (x <= 5) {
          m = (y + 1) * 8 + (x + 2);
          if (blockByYours(selectedFigureSide) == false) highlight(m);
        }
      }
      if (danger == false)
        h.textContent = `Wybrano ${
          selectedFigureSide == 'white' ? 'białego' : 'czarnego'
        } konia z miejsca X${selectedFigurePlaceX}, Y${selectedFigurePlaceY}`;
      break;
    //ruch wieży
    case 'rook':
      for (let i = 0; i < 7; i++) {
        if (y > 6 || blocked == true) break;
        m = (y + 1) * 8 + x;
        highlight(m);
        blocked = checkBlock(selectedFigureSide);
        y++;
      }
      blocked = false;
      y = selectedFigurePlaceY - 1;
      for (let i = 0; i < 7; i++) {
        if (y < 1 || blocked == true) break;
        m = (y - 1) * 8 + x;
        highlight(m);
        blocked = checkBlock(selectedFigureSide);
        y--;
      }
      blocked = false;
      y = selectedFigurePlaceY - 1;
      for (let i = 0; i < 7; i++) {
        if (x > 6 || blocked == true) break;
        m = y * 8 + (x + 1);
        highlight(m);
        blocked = checkBlock(selectedFigureSide);
        x++;
      }
      blocked = false;
      x = selectedFigurePlaceX - 1;
      for (let i = 0; i < 7; i++) {
        if (x < 1 || blocked == true) break;
        m = y * 8 + (x - 1);
        highlight(m);
        blocked = checkBlock(selectedFigureSide);
        x--;
      }
      if (danger == false)
        h.textContent = `Wybrano ${
          selectedFigureSide == 'white' ? 'białą' : 'czarną'
        } wieżę z miejsca X${selectedFigurePlaceX}, Y${selectedFigurePlaceY}`;
      break;
    //ruch gońca
    case 'bishop':
      for (let i = 0; i < 7; i++) {
        if (y < 1 || x < 1 || blocked == true) break;
        m = (y - 1) * 8 + (x - 1);
        highlight(m);
        blocked = checkBlock(selectedFigureSide);
        y--;
        x--;
      }
      blocked = false;
      x = selectedFigurePlaceX - 1;
      y = selectedFigurePlaceY - 1;
      for (let i = 0; i < 7; i++) {
        if (y < 1 || x > 6 || blocked == true) break;
        m = (y - 1) * 8 + (x + 1);
        highlight(m);
        blocked = checkBlock(selectedFigureSide);
        y--;
        x++;
      }
      blocked = false;
      x = selectedFigurePlaceX - 1;
      y = selectedFigurePlaceY - 1;
      for (let i = 0; i < 7; i++) {
        if (y > 6 || x < 1 || blocked == true) break;
        m = (y + 1) * 8 + (x - 1);
        highlight(m);
        blocked = checkBlock(selectedFigureSide);
        y++;
        x--;
      }
      blocked = false;
      x = selectedFigurePlaceX - 1;
      y = selectedFigurePlaceY - 1;
      for (let i = 0; i < 7; i++) {
        if (y > 6 || x > 6 || blocked == true) break;
        m = (y + 1) * 8 + (x + 1);
        highlight(m);
        blocked = checkBlock(selectedFigureSide);
        y++;
        x++;
      }
      if (danger == false)
        h.textContent = `Wybrano ${
          selectedFigureSide == 'white' ? 'białego' : 'czarnego'
        } gońca z miejsca X${selectedFigurePlaceX}, Y${selectedFigurePlaceY}`;
      break;
    //ruch królowej
    case 'queen':
      for (let i = 0; i < 7; i++) {
        if (y < 1 || x < 1 || blocked == true) break;
        m = (y - 1) * 8 + (x - 1);
        highlight(m);
        blocked = checkBlock(selectedFigureSide);
        y--;
        x--;
      }
      blocked = false;
      x = selectedFigurePlaceX - 1;
      y = selectedFigurePlaceY - 1;
      for (let i = 0; i < 7; i++) {
        if (y < 1 || x > 6 || blocked == true) break;
        m = (y - 1) * 8 + (x + 1);
        highlight(m);
        blocked = checkBlock(selectedFigureSide);
        y--;
        x++;
      }
      blocked = false;
      x = selectedFigurePlaceX - 1;
      y = selectedFigurePlaceY - 1;
      for (let i = 0; i < 7; i++) {
        if (y > 6 || x < 1 || blocked == true) break;
        m = (y + 1) * 8 + (x - 1);
        highlight(m);
        blocked = checkBlock(selectedFigureSide);
        y++;
        x--;
      }
      blocked = false;
      x = selectedFigurePlaceX - 1;
      y = selectedFigurePlaceY - 1;
      for (let i = 0; i < 7; i++) {
        if (y > 6 || x > 6 || blocked == true) break;
        m = (y + 1) * 8 + (x + 1);
        highlight(m);
        blocked = checkBlock(selectedFigureSide);
        y++;
        x++;
      }
      blocked = false;
      x = selectedFigurePlaceX - 1;
      y = selectedFigurePlaceY - 1;
      for (let i = 0; i < 7; i++) {
        if (y > 6 || blocked == true) break;
        m = (y + 1) * 8 + x;
        highlight(m);
        blocked = checkBlock(selectedFigureSide);
        y++;
      }
      blocked = false;
      y = selectedFigurePlaceY - 1;
      for (let i = 0; i < 7; i++) {
        if (y < 1 || blocked == true) break;
        m = (y - 1) * 8 + x;
        highlight(m);
        blocked = checkBlock(selectedFigureSide);
        y--;
      }
      blocked = false;
      y = selectedFigurePlaceY - 1;
      for (let i = 0; i < 7; i++) {
        if (x > 6 || blocked == true) break;
        m = y * 8 + (x + 1);
        highlight(m);
        blocked = checkBlock(selectedFigureSide);
        x++;
      }
      blocked = false;
      x = selectedFigurePlaceX - 1;
      for (let i = 0; i < 7; i++) {
        if (x < 1 || blocked == true) break;
        m = y * 8 + (x - 1);
        highlight(m);
        blocked = checkBlock(selectedFigureSide);
        x--;
      }
      if (danger == false)
        h.textContent = `Wybrano ${
          selectedFigureSide == 'white' ? 'białą' : 'czarną'
        } królową z miejsca X${selectedFigurePlaceX}, Y${selectedFigurePlaceY}`;
      break;
  }
};
