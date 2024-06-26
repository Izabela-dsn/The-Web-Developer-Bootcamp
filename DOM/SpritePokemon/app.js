const URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

const container = document.querySelector("#container")

for (let i = 1; i < 1026; i++) {
  const pokemon = document.createElement("div")
  pokemon.classList.add("pokemon")
  const label = document.createElement("span")
  label.innerText = `#${i}`

  const newImg = document.createElement("img")
  newImg.src = `${URL}${i}.png`

  pokemon.appendChild(newImg)
  pokemon.appendChild(label)
  container.appendChild(pokemon)
}
