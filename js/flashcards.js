// js/flashcards.js

const flashcardContainer = document.getElementById("flashcard-container");
const nextFlashcardButton = document.getElementById("next-flashcard");
const correctBtn = document.getElementById("correct-btn");
const wrongBtn = document.getElementById("wrong-btn");
const resetBtn = document.getElementById("reset-game");
const scoreDisplay = document.getElementById("score");
const streakDisplay = document.getElementById("streak");
const bestStreakDisplay = document.getElementById("best-streak");
const progressBar = document.getElementById("progress-bar");
const levelDisplay = document.getElementById("level-display"); // Novo elemento
const resetButton = document.getElementById("reset-game"); // Certifique-se de que este já existe ou adicione-o

let flashcardsData = [];
let currentCardIndex = -1;
let gameState = {
  score: 0,
  streak: 0,
  bestStreak: localStorage.getItem("bestStreak") ? parseInt(localStorage.getItem("bestStreak")) : 0,
  cardsAnswered: 0,
  level: 1, // Adicionado nível
  levelUpMessageShown: false, // Novo flag para controlar a exibição da mensagem de nível
};

async function fetchFlashcardsData() {
  try {
    const response = await fetch("data/data.json");
    flashcardsData = await response.json();
    return flashcardsData;
  } catch (error) {
    console.error("Erro ao buscar dados dos flashcards:", error);
    return [];
  }
}

function getRandomCardIndex() {
  if (flashcardsData.length === 0) {
    return -1;
  }

  let newIndex;

  do {
    newIndex = Math.floor(Math.random() * flashcardsData.length);
  } while (newIndex === currentCardIndex);

  return newIndex;
}

function createFlashcard(cardData) {
  return `
    <div class="flashcard">
      <div class="flashcard-front">
        <span class="flashcard-term">${cardData.termo}</span>
      </div>
      <div class="flashcard-back">
        <p class="flashcard-definition">${cardData.explicacaoTecnica}</p>
      </div>
    </div>
  `;
}

function updateStats() {
  scoreDisplay.textContent = gameState.score;
  streakDisplay.textContent = gameState.streak;
  bestStreakDisplay.textContent = gameState.bestStreak;
  
  // Update progress bar
  let progress;
  if (gameState.level === 1) {
    progress = Math.min((gameState.cardsAnswered / 10) * 100, 100);
  } else { // Level 2
    progress = (gameState.cardsAnswered % 10 / 10) * 100; // Reinicia a barra visualmente a cada 10 cards
  }
  progressBar.style.width = progress + "%";

  // Logic for Level 2 unlock and display
  if (gameState.cardsAnswered >= 10 && gameState.level === 1) {
    gameState.level = 2;
    if (!gameState.levelUpMessageShown) {
      levelDisplay.style.display = "block";
      setTimeout(() => {
        levelDisplay.style.display = "none";
      }, 3000); // Esconde a mensagem após 3 segundos
      gameState.levelUpMessageShown = true;
    }
    resetButton.style.display = "block"; // Mostra o botão de reiniciar uma vez que o nível 2 é alcançado
  } else if (gameState.cardsAnswered < 10 && gameState.level === 2) {
    // Isso deve lidar com casos onde o cardsAnswered pode diminuir (ex: debug), garantindo robustez.
    levelDisplay.style.display = "none";
    resetButton.style.display = "none";
    gameState.level = 1;
    gameState.levelUpMessageShown = false; // Reseta o flag se de alguma forma voltar ao nível 1
  }

  // Garante que o botão de reiniciar esteja visível no Nível 2 e que o progresso esteja sendo feito
  if (gameState.level === 2 && gameState.cardsAnswered > 0) {
      resetButton.style.display = "block";
  } else if (gameState.level === 1 && gameState.cardsAnswered === 0) {
      resetButton.style.display = "none";
  }
}

function showFeedback(type) {
  const flashcard = flashcardContainer.querySelector(".flashcard");
  flashcard.classList.add(type === "correct" ? "correct-feedback" : "wrong-feedback");
  
  setTimeout(() => {
    flashcard.classList.remove("correct-feedback", "wrong-feedback");
  }, 600);
}

function handleCorrectAnswer() {
  gameState.score += 10;
  gameState.streak += 1;
  gameState.cardsAnswered += 1;
  
  if (gameState.streak > gameState.bestStreak) {
    gameState.bestStreak = gameState.streak;
    localStorage.setItem("bestStreak", gameState.bestStreak);
  }
  
  showFeedback("correct");
  updateStats();
  
  setTimeout(() => {
    showRandomFlashcard();
  }, 600);
}

function handleWrongAnswer() {
  gameState.score = Math.max(0, gameState.score - 5);
  gameState.streak = 0;
  gameState.cardsAnswered += 1;
  
  showFeedback("wrong");
  updateStats();
  
  setTimeout(() => {
    showRandomFlashcard();
  }, 600);
}

function resetGame() {
  gameState.score = 0;
  gameState.streak = 0;
  gameState.cardsAnswered = 0;
  gameState.level = 1; // Reseta o nível para 1
  gameState.levelUpMessageShown = false; // Reseta o flag da mensagem de nível
  updateStats();
  showRandomFlashcard();
  levelDisplay.style.display = "none"; // Esconde o display de nível ao reiniciar
  resetButton.style.display = "none"; // Esconde o botão de reiniciar
}

function showRandomFlashcard() {
  currentCardIndex = getRandomCardIndex();

  if (currentCardIndex === -1) {
    flashcardContainer.innerHTML = "<p>Não há flashcards para exibir.</p>";
    return;
  }

  const cardData = flashcardsData[currentCardIndex];
  flashcardContainer.innerHTML = createFlashcard(cardData);

  const flashcard = flashcardContainer.querySelector(".flashcard");
  flashcard.addEventListener("click", () => {
    flashcard.classList.toggle("flip");
  });
}

export async function initFlashcards() {
  await fetchFlashcardsData();
  
  // Initialize display
  bestStreakDisplay.textContent = gameState.bestStreak;
  
  showRandomFlashcard();
  
  // Event listeners
  nextFlashcardButton.addEventListener("click", showRandomFlashcard);
  correctBtn.addEventListener("click", handleCorrectAnswer);
  wrongBtn.addEventListener("click", handleWrongAnswer);
  resetBtn.addEventListener("click", resetGame); // Certifique-se de que o resetButton está sendo usado aqui
  
  // Esconde o botão de reiniciar e o display de nível no início
  resetButton.style.display = "none";
  levelDisplay.style.display = "none";
}
