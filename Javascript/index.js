const colors = ["red", "blue", "orange"]
console.log(colors)
console.log(colors[1])
colors[0] = "Red"
console.log(colors)

// Array Methods:

let movieLine = ["iza", "lanne", "bruce"]
// Push and Pop [end]
console.log(movieLine)
movieLine.push("lili")
console.log(movieLine)
movieLine.pop()
console.log(movieLine)

//Shift and Unshift [start]
movieLine.shift() //remove
console.log(movieLine)
movieLine.unshift("anyz VIP") //add in the beginning
console.log(movieLine)

//Slice and Splice
//Slice
//negative starts at the end
colors.slice()
console.log("slice", colors)
console.log(colors.slice(2))

//Splice
colors.splice(0, 1)
console.log(colors)
colors.splice(0, 0, "pink")
console.log(colors)
colors.splice(3, 0, "pink-blueishs")
console.log(colors)

//Sort
let scores = [12, 56, 1, -15, 659, 5, -7]
scores.sort()
console.log(scores)

// == and === will verify if
// they are the same reference to
// the memory

// const is used in arrays because
// they are referencing to some
// place in memory that don't change/reassign
// but they don't
// care about the content inside the array
