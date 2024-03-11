let chooseOperation = prompt("what would you like to do?")

const todos = ["colect pink eggs", "clean my room"]

while (chooseOperation !== "quit" && chooseOperation !== "q") {
  if (chooseOperation === "list") {
    console.log("******")
    for (let i = 0; i < todos.length; i++) {
      console.log(`${i} : ${todos[i]}`)
    }
    console.log("******")
  } else if (chooseOperation === "new") {
    const newTodo = prompt("what I have todo?")
    todos.push(newTodo)
    console.log(`${newTodo} added to the list`)
  } else if (chooseOperation === "delete") {
    const indexOfDeletedTodo = parseInt(prompt("Enter the index of the todo:"))
    if (!Number.isNaN(indexOfDeletedTodo)) {
      const deletedTodo = todos.splice(indexOfDeletedTodo, 1)
      console.log(`${deletedTodo} removed from the list`)
    } else {
      console.log("Unknown index")
    }
  }
  chooseOperation = prompt("what would you like to do?")
}
console.log("you quit the app")
