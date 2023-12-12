const usernamesArray = []; // Array to store usernames
const userScoresArray = []; // Array to store user scores

function logon() {
  const usernameInput = document.getElementById('username');
  username = usernameInput.value.trim();

  if (username !== '') {
    document.getElementById('logon-container').style.display = 'none';
    document.querySelector('.grid-container').style.display = 'grid';
    // console.log('User logged in:', username);
    document.getElementById('username-display').textContent = `Welcome ${username} hope you enjoy the game`; // Update the displayed username
     }
}

const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let username = ""; // Variable to store current username

document.querySelector(".score").textContent = score;


fetch("http://localhost:5090/api/games")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });



function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      
      </div>

      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function updateScore(username, points) {
  const userIndex = userScoresArray.findIndex(user => user.username === username);

  if (userIndex !== -1) {
    // User found in the array, update the score
    userScoresArray[userIndex].score += points;
  } else {
    // User not found, add a new entry to the array
    userScoresArray.push({ username, score: points });
  }

  console.log('User Scores Array:', userScoresArray); // Log the array (modify as needed)
  document.querySelector('.score').textContent = userScoresArray[userIndex].score; // Update the displayed score
}

function restart() {
  document.getElementById('logon-container').style.display = 'block';
  document.querySelector('.grid-container').style.display = 'none';
  document.getElementById('username-display').textContent = ''; // Clear displayed username
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  usernamesArray.length = 0; // Clear the usernames array
  userScoresArray.length = 0; // Clear the user scores array
  generateCards();
}

document.querySelector('.grid-container').style.display = 'none';