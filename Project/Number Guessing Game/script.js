let secretNumber = Math.floor(Math.random() * 100) + 1;

function checkGuess() {
  const guess = parseInt(document.getElementById("guessInput").value);
  const message = document.getElementById("message");

  if (isNaN(guess)) {
    message.textContent = "Please enter a valid number.";
  } else if (guess < 1 || guess > 100) {
    message.textContent = "Number must be between 1 and 100.";
  } else if (guess === secretNumber) {
    message.textContent = "Congratulations! You guessed it right!";
  } else if (guess < secretNumber) {
    message.textContent = "Too low! Try again.";
  } else {
    message.textContent = "Too high! Try again.";
  }
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  document.getElementById("guessInput").value = "";
  document.getElementById("message").textContent = "";
}