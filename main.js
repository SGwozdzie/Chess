const timer = timerFunc(gameTime);

const startGame = (gameTime) => {
  if (active == true) {
    document.querySelector('header').classList.add('blur');
    document.querySelector('main').classList.add('blur');
    document.querySelector('aside button').addEventListener('click', () => {
      active = false;
      startGame();
    });
  }
  if (active == false) {
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('header').classList.remove('blur');
    document.querySelector('main').classList.remove('blur');
    timer();
  }
};

startGame();
