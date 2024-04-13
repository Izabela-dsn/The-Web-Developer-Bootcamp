let scorePlayerOne = document.querySelector("#player1")
let scorePlayerTwo = document.querySelector("#player2")
const selectWinningScore = document.querySelector("#maxPoints")

let pointsPlayerOne = 0
let pointsPlayerTwo = 0
let isGameOn = true

let winningScore = 5

const btnP1 = document.querySelector("#play1Btn")
const btnP2 = document.querySelector("#play2Btn")
const resetBtn = document.querySelector("#resetBtn")

selectWinningScore.addEventListener("change", function () {
  winningScore = parseInt(this.value)
  reset()
})

btnP1.addEventListener("click", () => {
  if (isGameOn) {
    pointsPlayerOne += 1
    if (pointsPlayerOne === winningScore) {
      isGameOn = false
      scorePlayerOne.classList.add("winner")
      scorePlayerTwo.classList.add("loser")
      btnP1.disabled = true
      btnP2.disabled = true
    }
    scorePlayerOne.textContent = pointsPlayerOne
  }
})

btnP2.addEventListener("click", () => {
  if (isGameOn) {
    pointsPlayerTwo += 1
    if (pointsPlayerTwo === winningScore) {
      isGameOn = false
      scorePlayerTwo.classList.add("winner")
      scorePlayerOne.classList.add("loser")
      btnP1.disabled = true
      btnP2.disabled = true
    }
    scorePlayerTwo.textContent = pointsPlayerTwo
  }
})

resetBtn.addEventListener("click", reset)

function reset() {
  isGameOn = true
  pointsPlayerOne = 0
  pointsPlayerTwo = 0
  scorePlayerTwo.textContent = "0"
  scorePlayerOne.textContent = "0"
  scorePlayerTwo.classList.remove("loser", "winner")
  scorePlayerOne.classList.remove("loser", "winner")
  btnP1.disabled = false
  btnP2.disabled = false
}
