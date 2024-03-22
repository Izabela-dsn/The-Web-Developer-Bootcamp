// Default Params
function sumPercentage(a, b = 0.5) {
  return (a += a * b)
}

// Spread

// in Function Calls
// spread in separated arguments
// anything that is iterable whit for..of

const numbers = [1, 2, 5, 64, 6897, 15, 67, 9480, 64, 0]
const max = Math.max(...numbers)
console.log(numbers)
console.log(...numbers)

// in Array Literals
const cats = ["Nina", "Bina", "Anne"]
const dogs = ["Bela", "Mamute", "Lindy"]

const allPets = [...cats, ...dogs, "Pililiu"]

// in Objects Literals
const dataImportant = {
  email: "name@email.com",
  password: "ksjduig",
  username: "AnneMarie",
}

const payload = {
  ...dataImportant,
  data: "12-05-98",
  isAdmin: true,
  firstName: "Anne",
  lastName: "Marie de La Chez",
}

// Rest params
// needs information to be iterable
function sum(...info) {
  return info.reduce((total, num) => total + num)
}

function raceResults(gold, silver, ...others) {
  console.log(`Gold Medal: ${gold}`)
  console.log(`Silver Medal: ${silver}`)
  console.log(`Thanks to: ${others}`)
}

// Destructuring

//Array
// have order
const scores = [10, 20, 22, 30, 40, 50]
const [winner, second, ...others] = scores

// Objects
const user = {
  id: "123456789",
  username: "example_user",
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  birthdate: "1990-01-01",
  createdAt: "2024-03-21T12:00:00Z",
  updatedAt: "2024-03-21T12:00:00Z",
  isActive: true,
}

const { username, email } = user

// assign birthdate to the variable born and then use born
const { birthdate: born } = user

//assign a default value
const { id, password = "ssdsde" } = user

// Params

//I want to use just the first name and the last
function fullName({ firstName, lastName }) {
  return `I'm ${firstName} ${lastName}`
}

const movies = [
  {
    title: "The Shawshank Redemption",
    imdbRating: 9.3,
  },
  {
    title: "The Godfather",
    imdbRating: 9.2,
  },
  {
    title: "The Dark Knight",
    imdbRating: 9.0,
  },
  {
    title: "Pulp Fiction",
    imdbRating: 8.9,
  },
  {
    title: "Schindler's List",
    imdbRating: 8.9,
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    imdbRating: 8.9,
  },
  {
    title: "Fight Club",
    imdbRating: 8.8,
  },
]

// movies.filter((movie) => movie.imdbRating > 9)
const movieNotes = movies.filter(({ imdbRating }) => imdbRating > 9)

const movieInfo = movies.map(({ title, imdbRating }) => {
  return `${title} is rated ${imdbRating}`
})
