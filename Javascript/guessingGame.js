let maximum = parseInt(prompt("Enter the maximum number:"))

while (!maximum) {
  maximum = parseInt(prompt("Enter a valid number:"))
}

const targetNum = Math.floor(Math.random() * maximum) + 1

let guess = prompt("Enter your guess or type 'q' to quit")
let attempts = 1
while (parseInt(guess) != targetNum) {
  if (guess === "q") {
    break
  }
  guess = parseInt(guess)
  if (guess > targetNum) {
    guess = prompt("To high! Enter your guess again")
    attempts++
  } else if (guess < targetNum) {
    guess = prompt("To low! Enter your guess again")
    attempts++
  } else {
    guess = prompt("Invalid guess. Please enter a number or 'q' to quit")
  }
}

if (guess === "q") {
  alert("exiting...")
} else {
  alert(`YOU WIN!!!! It took ${attempts} guesses`)
}
