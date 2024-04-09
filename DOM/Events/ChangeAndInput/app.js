const input = document.querySelector("input")
const h1 = document.querySelector("h1")

// input event
input.addEventListener("input", (e) => {
  console.log(input.value)
})

// Event Bubbling
// Events trigger other events in a cascade
// e.stopPropagation()

//Event Delegation
// useful when we have elements that is not in the page
// at the time our event listeners are added.
// get the parent to make the action with the child
// e.target
// like to delete a li, you use the ul
/* 
ul.addEventListener('click', (e)=>{
    to verify is what i'm clicking is a li and deleting it
    e.target.nodeName === "LI" && e.target.remove()
})
*/
