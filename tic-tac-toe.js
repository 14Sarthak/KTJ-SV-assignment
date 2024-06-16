let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-button");

let turn_x = true;
let indicator = document.querySelector(".turn");
let cnt = 0;
let modal = document.querySelector("#modal");
let confirmReset = document.querySelector(".yes");
let cancelReset = document.querySelector(".no");
let playerXWins = parseInt(localStorage.getItem("playerXWins")) || 0;
let playerOWins = parseInt(localStorage.getItem("playerOWins")) || 0;

const playerXWinsDisplay = document.querySelector("#player-x-wins");
const playerOWinsDisplay = document.querySelector("#player-o-wins");
const resetScoresButton = document.querySelector("#reset-scores");
let playerX = document.querySelector("#player-x-score");
let playerO = document.querySelector("#player-o-score");



playerXWinsDisplay.innerText = playerXWins;
playerOWinsDisplay.innerText = playerOWins;

const win_comb = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn_x === true) {
      box.innerText = "X";
      turn_x = false;
      indicator.innerText = "Turn : Player O";
    } else {
      box.innerText = "O";
      turn_x = true;
      indicator.innerText = "Turn : Player X";
    }

    box.disabled = true;
    cnt++;

    let isWinner = checkWinner();

    if (!isWinner && cnt === 9) {
      gameDraw();
    }
  });
});



const gameDraw = () => {
  indicator.innerText = 'Game is Draw';
  disableBoxes();
  setTimeout(resetGame, 5000);
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    indicator.innerText = "Turn : Player X";
  }
  cnt = 0; 
};

const checkWinner = () => {
  for (let pattern of win_comb) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        indicator.innerText = `Congratulations! Winner is Player ${pos1} `;
        if (pos1 === "X") {
          playerXWins++;
          localStorage.setItem('playerXWins', playerXWins);
          playerXWinsDisplay.innerText = playerXWins;
        } else {
          playerOWins++;
          localStorage.setItem('playerOWins', playerOWins);
          playerOWinsDisplay.innerText = playerOWins;
        }
        disableBoxes();
        highlightPlayer();
        setTimeout(resetGame, 5000);
        return true;
      }
    }
  }
  return false;
};

const highlightPlayer = () => {
  playerX.style.color = "white";
  playerO.style.color = "white";

  if (playerXWins > playerOWins) {
    playerX.style.fontWeight = "bold";
    playerX.style.color = "grey";
  } else if (playerXWins < playerOWins) {
    playerO.style.fontWeight = "bold";
    playerO.style.color = "#000000";
  }
};

const resetGame = () => {
  turn_x = true;
  enableBoxes();
  highlightPlayer(); 
}

resetbtn.addEventListener("click", () => {
  modal.style.display = "flex"; 
});

confirmReset.addEventListener("click", () => {
  modal.style.display = "none";
  resetGame();
});

cancelReset.addEventListener("click", () => {
  modal.style.display = "none";
});

resetScoresButton.addEventListener("click", () => {
  playerXWins = 0;
  playerOWins = 0;
  localStorage.setItem('playerXWins', 0);
  localStorage.setItem('playerOWins', 0);
  playerXWinsDisplay.innerText = playerXWins;
  playerOWinsDisplay.innerText = playerOWins;
  playerX.style.color = "white";
  playerO.style.color = "white";
});

