let playerScore
let computerScore

game(-1) // Play continously, prompting for replays
// game(5) // Play 5 rounds
// game(0) // Play 0 rounds
// game(1) // Play 1 round

function computerPlay(){
    // Generate a random number between 1 and 3
    let random_number = Math.ceil(Math.random() * 3); 
    // Use that to choose either Rock, Paper, or Scissors
    switch(random_number) {
        case 1:
            return 'rock';
        case 2:
            return 'paper';
        case 3:
            return 'scissors';
    }
}

function promptPlayerPlay(){
    for (let i = 3; i > 0;) {
        // Prompt user for their play. Ensure it is in lower case so any case type can be accepted.
        let playerSelection = String(prompt('Rock, Paper, or Scissors?')).toLowerCase(); // String function handles null responses.
        // Input Validation
        if (['rock', 'paper', 'scissors'].includes(playerSelection)) { 
            return playerSelection;
        } else {
            alert(`Invalid value. ${--i} attempts remaining.`);
        };
    }
    // Code to handle case if too many invalid values have been entered.
    playerSelection = computerPlay();
    alert(`No attempts remaining as a invalid value has been entered 3 times. ${titleCase(playerSelection)} has been selected for you.`);
    return playerSelection;
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection.toLowerCase() == computerSelection) {
        // Draw Case, both selected same move
        return 'You Drew!'
    } else if ( // Checking for losing combination
        (playerSelection == 'rock' && computerSelection == 'paper') || 
        (playerSelection == 'paper' && computerSelection == 'scissors') ||
        (playerSelection == 'scissors' && computerSelection == 'rock')
    ) {
        changeScore(false);
        return `You Lost! ${titleCase(computerSelection)} beats ${titleCase(playerSelection)}`   
    } else { 
        // Winning Case
        changeScore(true);
        return `You Won! ${titleCase(playerSelection)} beats ${titleCase(computerSelection)}`
    };
}

function titleCase(string) {
    let sentence = string.toLowerCase().split(" ");
    for (let i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    document.write(sentence.join(" "));
    return sentence;
}

function changeScore(win) {
    if (win) {
        playerScore++
    } else {
        computerScore++
    }
}

function checkScore() {
    if (playerScore > computerScore) {
        return 'winning against'
    } else if (playerScore == computerScore) {
        return 'drawing with'
    } else {
        return 'losing against'
    }
}

function checkFinalScore() {
    if (playerScore > computerScore) {
        return 'won! Congratualtions!'
    } else if (playerScore == computerScore) {
        return 'drew! Well played!'
    } else {
        return 'lost! Better luck next time!'
    }
}

function game(rounds = -1) {
    // Reset scores
    playerScore = 0;
    computerScore = 0;
    if (rounds < 0) {
        // If rounds is -1 then play continuously and prompt for replays
        while (true) {
            console.log(playRound(promptPlayerPlay(), computerPlay()));
            if (confirm(`You are ${checkScore()} the computer, ${playerScore} to ${computerScore}. Would you like to play again?`)) {
                continue
            } else break;
        }
    } else {
        // If rounds are not set to -1 then play that many rounds continuously.
        for (let i = 0; i < rounds; i++) {
            console.log(playRound(promptPlayerPlay(), computerPlay()));
        }
    }
    // Game over code.
    console.log(`You ${checkFinalScore()} The final score was ${playerScore} to ${computerScore}!`)
}