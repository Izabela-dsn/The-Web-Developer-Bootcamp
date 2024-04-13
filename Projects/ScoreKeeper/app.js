const p1 = {
  score: 0,
  button: document.querySelector("#play1Btn"),
  display: document.querySelector("#player1"),
}

const p2 = {
  score: 0,
  button: document.querySelector("#play1Btn"),
  display: document.querySelector("#player2"),
}

const selectWinningScore = document.querySelector("#maxPoints")
let isGameOn = true
let winningScore = 5
const resetBtn = document.querySelector("#resetBtn")

selectWinningScore.addEventListener("change", function () {
  winningScore = parseInt(this.value)
  reset()
})

function updateScores(player, opponent) {
  if (isGameOn) {
    player.score += 1
    if (player.score === winningScore) {
      isGameOn = false
      player.display.classList.add("winner")
      opponent.display.classList.add("loser")
      player.button.disabled = true
      opponent.button.disabled = true
    }
    player.display.textContent = player.score
  }
}

btnP1.addEventListener("click", () => {
  updateScores(p1, p2)
})

btnP2.addEventListener("click", () => {
  updateScores(p2, p3)

  // if (isGameOn) {
  //   pointsPlayerTwo += 1
  //   if (pointsPlayerTwo === winningScore) {
  //     isGameOn = false
  //     scorePlayerTwo.classList.add("winner")
  //     scorePlayerOne.classList.add("loser")
  //     btnP1.disabled = true
  //     btnP2.disabled = true
  //   }
  //   scorePlayerTwo.textContent = pointsPlayerTwo
  // }
})

resetBtn.addEventListener("click", reset)

function reset() {
  isGameOn = true
  for (let p of [p1, p2]) {
    p.score = 0
    p.display.textContent = "0"
    p.display.classList.remove("loser", "winner")
    p.button.disabled = false
  }
}
