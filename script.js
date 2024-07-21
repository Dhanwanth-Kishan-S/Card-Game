const symbols = ['😂','😜','🤣','😭','🤩','😏','😁','😎', '😂','😜','🤣','😭','🤩','😏','😁','😎'];
let gameBoard = document.getElementById('game-board');
let cardElements = [];
let flippedCards = [];
let matchedPairs = 0;
let timer;
let timeLeft = 45;
let gameStarted = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(symbol) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">?</div>
            <div class="card-back">${symbol}</div>
        </div>
    `;
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (!gameStarted) {
        startTimer();
        gameStarted = true;
    }
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const symbol1 = card1.querySelector('.card-back').textContent;
    const symbol2 = card2.querySelector('.card-back').textContent;

    if (symbol1 === symbol2) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === symbols.length / 2) {
            clearInterval(timer);
            setTimeout(() => alert('You won!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function initializeGame() {
    shuffle(symbols);
    gameBoard.innerHTML = '';
    for (const symbol of symbols) {
        const card = createCard(symbol);
        gameBoard.appendChild(card);
        cardElements.push(card);
    }
    matchedPairs = 0;
    gameStarted = false;
    resetTimer();
}

function startTimer() {
    timeLeft = 45;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Time is up! Try again.');
            initializeGame();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    document.getElementById('timer').textContent = `Left: 45s`;

}

document.getElementById('restart-btn').addEventListener('click', initializeGame);

initializeGame();
