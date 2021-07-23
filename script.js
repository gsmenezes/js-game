//Dados Iniciais
let square = {
  a1: "",
  a2: "",
  a3: "",
  b1: "",
  b2: "",
  b3: "",
  c1: "",
  c2: "",
  c3: "",
};

let player = "";
let warning = "";
let playing = false;
reset();

//Eventos
document.querySelector(".reset").addEventListener("click", reset);
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("click", itemClick);
}); // vai percorrer cada um dos itens

//Funções
function reset() {
  warning = "";

  let random = Math.floor(Math.random() * 2); // vai gerar um número aleatório entre 0 e 1 (random), e vai arredondar para baixo (floor)
  player = random === 0 ? "X" : "O";

  for (let i in square) {
    square[i] = ""; // limpa todo o tabuleiro
  }

  playing = true;

  renderSquare();
  renderInfo();
}

function renderSquare() {
  // vai preencher o que precisa sempre que a tela renderizar
  for (let i in square) {
    let item = document.querySelector(`div[data-item=${i}]`);
    item.innerHTML = square[i];
  }

  checkGame();
}

function renderInfo() {
  document.querySelector(".vez").innerHTML = player;
  document.querySelector(".resultado").innerHTML = warning;
}

function itemClick(e) {
  // mostra o item (O ou X) nos devidos espaços
  let item = e.target.getAttribute("data-item");
  if (playing && square[item] === "") {
    square[item] = player;
    renderSquare();
    togglePlayer();
  }
}

function togglePlayer() {
  // alterna a vez dos jogadores
  if (player === "X") {
    player = "O";
  } else {
    player = "X";
  }
  renderInfo();
}

function checkGame() {
  if (checkWinnerFor("X")) {
    warning = "O 'X' venceu!";
    playing = false;
  } else if (checkWinnerFor("O")) {
    warning = "O 'O' venceu!";
    playing = false;
  } else if (isFull()) {
    warning = "Deu empate..";
    playing = false;
  }
}

function checkWinnerFor(player) {
  let pos = [
    "a1,a2,a3",
    "b1,b2,b3",
    "c1,c2,c3",

    "a1,b1,c1",
    "a2,b2,c2",
    "a3,b3,c3",

    "a1,b2,c3",
    "a3,b2,c1",
  ];

  for (let w in pos) {
    let pArray = pos[w].split(",");
    //função que rodamos no array com o objetivo de verificar se é true ou false
    let hasWon = pArray.every((option) => {
      square[option] === player;
    });
    if (hasWon) {
      return true;
    }
  }
  return false;
}

function isFull() {
  for (let i in square) {
    if (square[i] === "") {
      return false;
    }
  }
  return true;
}
