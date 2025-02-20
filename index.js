let dangerBox = 0;
let openedBoxes = 0;
let gameOver = false;
let attempts = 0;

let messageBox = document.getElementById('messageBox');
let numberBox = document.getElementById('numberBox');

function displayMessage(message) {
    if (messageBox) {
        messageBox.innerText = message;
    }
}

function displayNumber(number) {
  if (numberBox) {
      numberBox.innerText = number;
  }
}

function startGame() {
    gameOver = false;
    attempts = 0;
    displayNumber(attempts + " / 25");
    for (let i = 1; i <= 25; i++) {
        let box = document.getElementById(`griditem${i}`);
        if (box) {
            box.style.backgroundColor = 'lightgray';
            box.style.backgroundImage = ''; 
            box.onclick = () => checkBox(i);
        }
    }
    dangerBox = Math.floor(Math.random() * 25) + 1;
    openedBoxes = 0;
    displayMessage("Avoid the bomb!");
}

function checkBox(boxNumber) {
  if (gameOver) return;

  let box = document.getElementById(`griditem${boxNumber}`);
  if (!box) return;

  attempts++;
  displayNumber(attempts + " / 25");

  if (boxNumber === dangerBox) {
      gameOver = true;
      box.style.backgroundImage = 'url("img/mine.webp")';
      box.style.backgroundSize = 'contain'; 
      box.style.backgroundPosition = 'center';
      box.classList.add('pop-in'); 
      displayMessage("💥 Game Over!");
      disableAllBoxes();
      setTimeout(startGame, 2000);
  } else {
      if (box.style.backgroundImage === '') {
          box.style.backgroundImage = 'url("img/diamant.webp")'; 
          box.style.backgroundSize = 'contain'; 
          box.style.backgroundPosition = 'center'; 
          box.classList.add('pop-in'); 
          openedBoxes++;
          box.onclick = null;
      }

      if (openedBoxes === 24) {
          gameOver = true;
          displayMessage("🎉 Winner!");
          disableAllBoxes();
          setTimeout(startGame, 3000);
      }
  }
}

function disableAllBoxes() {
    for (let i = 1; i <= 25; i++) {
        let box = document.getElementById(`griditem${i}`);
        if (box) {
            box.onclick = null;
        }
    }
}

document.addEventListener("DOMContentLoaded", startGame);