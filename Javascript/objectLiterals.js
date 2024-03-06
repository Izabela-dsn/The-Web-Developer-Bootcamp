let person = { name: "Izabela", middleName: "da Silva", lastname: "Neves" }
const kitchen = { name: "fork", color: 983923 }

console.log("person:")
console.log(person.name)
console.log(person["lastname"])

console.log("kitchen:")
console.log(kitchen.name)
console.log(kitchen["color"])

// let variable = something
// person[variable] works
// person.variable not work

const midterms = { daniele: 96, thomas: "78" }

// midterms["thomas"]
midterms.thomas = 79
console.log(midterms)
midterms.thomas = "C+"
midterms["daniele"] = "A"

midterms.ezra = "B+"
midterms["baina"] = "A+"
console.log(midterms)

// Nested

const comment = [
  { username: "Tammy", text: "ahahahahah", votes: 9 },
  { username: "Tommy", text: "lololol", votes: 3 },
]
console.log(comment[1].username)
