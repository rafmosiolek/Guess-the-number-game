// global variables

var randomNumber = Math.floor(Math.random() * 100) + 1;

var guesses = document.querySelector(".guesses");
var lastResult = document.querySelector(".lastResult");
var lowOrHi = document.querySelector(".lowOrHi");

var guessSubmit = document.querySelector(".guessSubmit");
var guessField = document.querySelector(".guessField");

var guessCount = 1;
var resetButton;

function checkGuess(){
    var userGuess = Number(guessField.value);   // check if entered value is a number; if not returns NaN;

    if (guessCount === 1) { // test whether this is player's first go or not
        guesses.textContent = "Previous guesses: ";
    }
    guesses.textContent += userGuess + " "; // appends the current userGuess value onto the end of the guesses paragraph

    if (userGuess === randomNumber) {   // checks if userGuess is equal to generated randomNumber
        lastResult.textContent = "Congratulations! You got it right!";  // if it is:
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();  // triggers setGameOver() function;
    } else if (guessCount === 10) { // checks if this is player's last turn, if yes:
        lastResult.textContent = "GAME OVER!";
        setGameOver();  // triggers setGameOver() function;
    } else {
        lastResult.textContent = "Wrong!";  // if player was wrong but still have turns it runs another conditional:
        lastResult.style.backgroundColor = "red";
        if (userGuess < randomNumber) { // if userGuess is lower than generated randomNumber:
            lowOrHi.textContent = "Last guess was too low! Try again!";
        } else if (userGuess > randomNumber) {  // if userGuess is greater than generated randomNumber:
            lowOrHi.textContent = "Last guess was too high! Try again!";
        }
    }

    guessCount++;   // add 1 to the guessCount so the player uses up their turn;
    guessField.value = "";  // empty the value out of the form text field
    guessField.focus(); // focus form text field ready for the next guess to be entered;
}

guessSubmit.addEventListener("click", checkGuess); // event listener: first argument is the type of event we are listening for - click, the second argument is the block of code is going to run after the event occur, in this case: function checkGuess();

function setGameOver() {
    guessField.disabled = true; // disable the form text input after the game is over
    guessSubmit.disabled = true;    // disable the button after the game is over
    
    resetButton = document.createElement("button"); // create a new <button> element in existing HTML file
    resetButton.textContent = "Start new game!";    // set new button's label;
    document.body.appendChild(resetButton); // place it on the bottom of the HTML -> creates child to the body element;

    resetButton.addEventListener("click", resetGame);   // event listener; when the new button is clicked, function resetGame() is run;
}

function resetGame() {
    guessCount = 1; // puts the guessCount back down to 1

    var resetParas = document.querySelectorAll(".resultParas p"); // creates a variable containing a list of all the paragraphs inside <div class="resultParas">
    for (var i = 0; i < resetParas.length; i++) {   // loops through each one, removing the text content of each
        resetParas[i].textContent = "";
    }

    resetButton.parentNode.removeChild(resetButton); // removes the reset button

    guessField.disabled = false; // enables the form elements and empties and focuses the text field
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    lastResult.style.backgroundColor = "white"; // removes the background color from the lastResult paragraph;

    randomNumber = Math.floor(Math.random() * 100) + 1; // generates new random number;
}


























