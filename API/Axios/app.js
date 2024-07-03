axios
  .get("https://swapi.dev/api/people/1/")
  .then((res) => console.log("response", res))
  .catch((e) => console.log("error: ", e))

//async
const getStarWarsPerson = async (id) => {
  try {
    const res = await axios.get(`https://swapi.dev/api/people/${id}/`)
    console.log(res.data)
  } catch (error) {
    console.log("error: ", error)
  }
}

getStarWarsPerson(10)

//config of headers
const jokes = document.querySelector(".jokes")
const btn = document.querySelector("button")

const addNewJoke = async () => {
  const newJoke = await getDadJoke()
  const newLI = document.createElement("li")
  newLI.append(newJoke)
  jokes.append(newLI)
}

const getDadJoke = async () => {
  try {
    const config = { headers: { Accept: "application/json" } }
    const res = await axios.get("https://icanhazdadjoke.com/", config)
    console.log("dad joke", res.data.joke)
    return res.data.joke
  } catch (error) {
    console.log("error:", error)
    return "No jokes today, come back tomorrow!"
  }
}
// getDadJoke()
btn.addEventListener("click", addNewJoke)
