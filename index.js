const NUM_SQUARES = 4;
const cardGame = new CardGame(NUM_SQUARES);
const COLOR_PALETTE = ['lightblue', 'lightcoral', 'lightgreen', 'lightyellow', 'lightskyblue', 'lightgray'];
const GAME_AREA = "game-area";
const RESET_BTN = document.getElementById("resetBtn");

//TODO: Move logic to cardGame
let firstSelection = undefined;
let secondSelection = undefined;
let goodtries = 0;

function initialGameLayoutSetup() {
    let gameArea = document.getElementById(GAME_AREA);
    cardGame.shuffle();
    cardGame.cardElements.forEach((card) => {
        let square = createCardElement(card);
        gameArea.appendChild(square);
    });
}

function createCardElement(card) {
    let square = document.createElement("div");
    let squaredetails = document.createElement("p");
    let img = document.createElement("img");
    img.src = card.imgSrc;
    img.card = card;
    squaredetails.innerHTML = card.cardNumber;
    square.appendChild(img);
    square.classList.add('card', 'hidden');
    square.addEventListener('click', toggleClickEvent)
        //square.classList.add('hidden');
        //square.style.backgroundColor = COLOR_PALETTE[index % COLOR_PALETTE.length];
    return square;
}


function handleWins() {
    document.getElementById("tries").innerHTML = (`${goodtries} / ${(NUM_SQUARES * NUM_SQUARES) / 2}`);
    if (goodtries == (NUM_SQUARES * NUM_SQUARES) / 2) {
        document.getElementById("tries").innerHTML = "You Wins !!!";
    }
}


function toggleClickEvent(targetElem) {
    targetElem.target.classList.remove('hidden');
    if (!firstSelection) {
        firstSelection = targetElem.target;
    } else {
        secondSelection = targetElem.target;
    }
    if (firstSelection && secondSelection) {
        if (firstSelection.getElementsByTagName("img")[0].card.cardNumber == secondSelection.getElementsByTagName("img")[0].card.cardNumber) {
            firstSelection = undefined;
            secondSelection = undefined;
            goodtries += 1;
        } else {
            setTimeout(() => {
                firstSelection.classList.add('hidden');
                secondSelection.classList.add('hidden');
                firstSelection = undefined;
                secondSelection = undefined;
            }, 500);
        }
    }

    handleWins();
}

function resetMatchingGame(evt){
    let gameArea = document.getElementById(GAME_AREA);
    gameArea.innerHTML = '';
    initialGameLayoutSetup();
}

function init(){
    initialGameLayoutSetup();
    RESET_BTN.addEventListener('click', resetMatchingGame);
}

init();
