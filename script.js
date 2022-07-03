let playerScore = 0;
let computerScore = 0;

// HTML Elements - Updates for Score and Round Outcome
const scoreDiv = document.querySelector('.game__game-info');
const scoreCounter = document.createElement('p');
const roundResult = document.createElement('p');

scoreCounter.classList.add('score');
roundResult.classList.add('result');

roundResult.textContent = 'Best of 5'

scoreCounter.textContent = `${playerScore} : ${computerScore}`;
scoreDiv.appendChild(scoreCounter);
scoreDiv.appendChild(roundResult);

let previousSelection;
// HTML Elements - Game Over
const gameResultsDiv = document.querySelector('.game__game-results');
const gameResultsMsg = document.createElement('p');

gameResultsMsg.style.marginBottom = '1rem';
gameResultsMsg.style.color = '#fffaff';

const resetButton = document.querySelector('.reset-btn');

gameResultsDiv.insertBefore(gameResultsMsg, resetButton);

// Game Function - Begins via Player Choice Buttons
function playRound(option){
    let playerSelection = option.value;
    let computerSelection;

    // Calculate Computer Choice
    function computerPlay(){
        const selectionChoice = ["Rock", "Paper", "Scissors"];

        computerSelection = selectionChoice[Math.floor(Math.random()*selectionChoice.length)];
        return computerSelection
    }

    computerPlay();

    // Score Update Function
    function updateScore(){
        scoreCounter.textContent = `${playerScore} : ${computerScore}`;
    };

    // Outcomes
    if (computerSelection === 'Rock' && playerSelection === 'Paper') {
        playerScore++;
        roundResult.textContent = `Point to you! ${playerSelection} beats ${computerSelection}!`;
    } else if (computerSelection === 'Rock' && playerSelection === 'Scissors') {
        computerScore++;
        roundResult.textContent = `Point to AI! ${computerSelection} beats ${playerSelection}!`;
    } else if (computerSelection === 'Paper' && playerSelection === 'Rock') {
        computerScore++;
        roundResult.textContent = `Point to AI! ${computerSelection} beats ${playerSelection}!`;
    } else if (computerSelection === 'Paper' && playerSelection === 'Scissors') {
        playerScore++;
        roundResult.textContent = `Point to you! ${playerSelection} beats ${computerSelection}!`;
    } else if (computerSelection === 'Scissors' && playerSelection === 'Rock') {
        playerScore++;
        roundResult.textContent = `Point to you! ${playerSelection} beats ${computerSelection}!`;
    } else if (computerSelection === 'Scissors' && playerSelection === 'Paper') {
        computerScore++
        roundResult.textContent = `Point to AI! ${computerSelection} beats ${playerSelection}!`;
    } else {
        playerScore++;
        computerScore++;
        roundResult.textContent = `Draw! You both picked ${playerSelection}`;
    }

    previousSelection = document.querySelectorAll(`.${computerSelection}`);

    function addPrevious(){
        previousSelection[0].classList.add('game__previous');
        setTimeout(removePrevious, 200)
    }
    function removePrevious(){
        previousSelection[0].classList.remove('game__previous');
    }

    addPrevious();

    updateScore();

    // Game Over
    if (playerScore == 5 || computerScore == 5) {
        if (playerScore == computerScore) {
            gameResultsDiv.classList.add('game__finished');
            gameResultsMsg.textContent = "Draw!";
        } else if (playerScore > computerScore) {
            gameResultsDiv.classList.add('game__finished');
            gameResultsMsg.textContent = "You Win!";
        } else if (playerScore < computerScore){
            gameResultsDiv.classList.add('game__finished');
            gameResultsMsg.textContent = "You Lose!";
        }
    }

    // Reset Game
    function gameReset(){
        playerScore = 0;
        computerScore = 0;
        updateScore();
        roundResult.textContent = "New Game!"

        gameResultsDiv.classList.remove('game__finished');
    }

    resetButton.addEventListener('click', gameReset, true);
}