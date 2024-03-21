// Array methods that required
// passing functions

//Foreach
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

numbers.forEach(function (elem) {
  if (elem % 2 === 0) {
    console.log(elem)
  }
})

const movies = [
  {
    title: "Duna",
    score: 90,
  },
  {
    title: "Duna: Part Two",
    score: 98,
  },
  {
    title: "Parasite",
    score: 95,
  },
  {
    title: "Alien",
    score: 85,
  },
]

movies.forEach(function (movie) {
  console.log(`${movie.title} - ${movie.score}/100`)
})

// Map
const doubles = numbers.map(function (num) {
  return num * 2
})

const titles = movies.map(function (movie) {
  return movie.title.toUpperCase()
})

const newNotes = movies.map((movie) => `${movie.title} - ${movie.score / 10}`)

// Arrow Functions
const addPercentage = (bill) => {
  return (bill += 0.1 * bill)
}

// implicit returns {} -> ()
const addPercentageTwo = (bill) => (bill += 0.5 * bill)

// setTimeout and setInterval
const timeOut = () => {
  console.log("hi")
  setTimeout(() => {
    console.log("hello")
  }, 3000)
  console.log("I am groot")
}

const randomNumberInterval = () => {
  const id = setInterval(() => {
    console.log(Math.random())
  }, 2000)
  setTimeout(() => {
    clearInterval(id)
  }, 6000)
}

// Filter
numbers.filter((n) => {
  return n > 4
})

const goodMovies = movies.filter((movie) => movie.score > 90)
const goodMoviesTitle = movies
  .filter((movie) => movie.score > 90)
  .map((movie) => movie.title)

// exercise
const names = [
  "mark",
  "staceysmom1978",
  "q29832128238983",
  "carrie98",
  "MoanaFan",
]

const namesShort = names.filter((name) => {
  return name.length < 10
})

//Every and Some
const exams = [56, 26, 98, 91, 78, 97, 56, 89, 49]

// if some of condition of every is false
// all every is false
// if every condition is true then the every
// is true
let passed = exams.every((score) => score >= 60)
console.log(`everyone passed? ${passed}`)

let passedTwo = exams.some((exam) => exam > 60)
console.log(`someone passed in the exam? ${passedTwo}`)

const allEvens = (numbers) => {
  numbers.every((number) => number % 2 === 0)
}

//Reduce

const prices = [1.99, 25, 189.99]

const total = prices.reduce((total, price) => {
  return total + price
})

const minPrice = prices.reduce((min, price) => {
  if (price < min) {
    return price
  }
  return min
})

const highestRated = movies.reduce((bestMovie, currentMovie) => {
  if (currentMovie.score > bestMovie.score) {
    return currentMovie
  }
  return bestMovie
})

// initial value in reduce
const evens = [2, 4, 6, 8, 10] //sum = 30
const initialValue = 50
const sumEvens = evens.reduce((sum, nums) => sum + nums, initialValue)

// keyword this in arrow function
// reefers to the window object
// setTimeout is too but with arrow function works
