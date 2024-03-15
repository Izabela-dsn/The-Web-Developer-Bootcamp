function singSong() {
  console.log("DÓ")
  console.log("RÉ")
  console.log("MI")
  console.log("FÁ")
}

singSong()

function greet(name) {
  console.log(`Hey there, ${name}!`)
}

//Functions Expressions
const add = function (x, y) {
  return x + y
}
add(32, 56)

//High Order Functions

//Accepting functions as arguments
function callTwice(argFunc) {
  argFunc()
  argFunc()
}

function rollDie() {
  const roll = Math.floor(Math.random() * 6) + 1
  console.log(roll)
}

callTwice(rollDie)

//Returning Functions
function makeMysteryFunc() {
  const rand = Math.random()
  if (rand > 0.5) {
    return function () {
      console.log("HEY YO LITTLE CUTE THING")
    }
  } else {
    return function () {
      alert("BRUH")
    }
  }
}

const mystery = makeMysteryFunc()
mystery()

// a function that makes a function
function makeBetweenFunc(min, max) {
  return function (num) {
    return num >= min && num <= max
  }
}

const isChildOrTeen = makeBetweenFunc(0, 18)
const isAdult = makeBetweenFunc(19, 60)
//put this on console
isChildOrTeen(15)
isAdult(49)

// The reserved word THIS
const dog = {
  name: "Nina Cristina",
  color: "Brown",
  breed: "Tektel",
  bark() {
    console.log(`This is: ${this}`)
    console.log(this.name)
    console.log("Oof oof oof")
  },
}

dog.bark()

// be careful with the context of invocation
// you are invocating from different objects
// here from the window and before from dog object
const anotherBark = dog
anotherBark()
