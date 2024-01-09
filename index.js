let menu = document.querySelector('.menuItems');
let menuButton = document.getElementById('menu');

function menuShow() {
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'inline-block';

        window.addEventListener('click', closeMenu);
    } else {
        menu.style.display = 'none';
        window.removeEventListener('click', closeMenu);
    }
}

function closeMenu(event) {
    if (!menu.contains(event.target) && event.target !== menuButton) {
        menu.style.display = 'none';
        window.removeEventListener('click', closeMenu);
    }
}

function generateRandomCard() {
    let randomNumber = Math.trunc(Math.random() * (14 - 1)) + 2;
    let randomColour = Math.trunc(Math.random() * 4) + 1;

    let cardValue = randomNumber <=10 ? randomNumber : 10;

    return {
        imageUrl: `${randomColour}c${randomNumber}.png`,
        value: cardValue
    };
    }

    function playAgain() {
    window.location.reload();
    }

let heading = document.querySelector('.paragraph');
let score = document.getElementById('scorePlayer');
let playing = true;
let blankCard = document.getElementById('card-player');
let blankCardD = document.getElementById('card-dealer');
let dealerDeck = document.querySelector('.dealer');
let youDeck = document.querySelector('.you');
let hitBtn = document.getElementById('hit');
let standBtn = document.getElementById('stand');

let playerScore = 0;

hitBtn.addEventListener('click', function () {
    if (!playing) {
        return;
    }

    heading.textContent = 'Good Luck!';
    let card = generateRandomCard();
    blankCard.classList.add('hidden');

    let newCard = document.createElement('img');
    newCard.classList.add('random-cards', 'fadeIn');
    newCard.src = card.imageUrl;
    youDeck.appendChild(newCard);

    playerScore += card.value;
    score.textContent = `Score: ${playerScore}`;

    if (playerScore > 21) {
        playing = false;
        dealerTurn();
    }
});

function dealerTurn() {
    blankCardD.classList.add('hidden');
    let dealerScore = 0;

    let card1 = generateRandomCard();
    let dealerCard1 = document.createElement('img');
    dealerCard1.classList.add('random-cards');
    dealerCard1.src = card1.imageUrl;
    dealerDeck.appendChild(dealerCard1);
    dealerScore += card1.value;
    document.getElementById('scoreDealer').textContent = `Score: ${dealerScore}`;

    let card2 = generateRandomCard();
    let dealerCard2 = document.createElement('img');
    dealerCard2.classList.add('random-cards');
    dealerCard2.src = card2.imageUrl;
    dealerDeck.appendChild(dealerCard2);
    dealerScore += card2.value;
    document.getElementById('scoreDealer').textContent = `Score: ${dealerScore}`;

    while (dealerScore < 17) {
        let card = generateRandomCard();

        let newDealerCard = document.createElement('img');
        newDealerCard.classList.add('random-cards', 'fadeIn'); 
        newDealerCard.src = card.imageUrl;
        dealerDeck.appendChild(newDealerCard);

        dealerScore += card.value;
        document.getElementById('scoreDealer').textContent = `Score: ${dealerScore}`;
    }

    document.querySelectorAll('.dealer .random-cards').forEach(card => card.classList.add('fadeIn'));

    winner(playerScore, dealerScore);
}

function winner(playerScore, dealerScore) {
    if (playerScore > 21 || (dealerScore <= 21 && dealerScore >= playerScore)) {
        heading.textContent = 'Dealer Wins!';
    } else {
        heading.textContent = 'You Win!';
    }
    if (playerScore === dealerScore) {
        heading.textContent = 'It\'s a draw!';
    }
}

standBtn.addEventListener('click', function() {
   if (!playing) {
       return;
   }
   playing = false;
   dealerTurn();
});