const banner = document.getElementById("banner")
const imgs = document.getElementsByTagName("img") //HTML Collections

console.dir(banner)
console.dir(imgs)

for (let img of imgs) {
  console.log(img.src)
}

const squareImg = document.getElementsByClassName("square")

for (let img of squareImg) {
  console.log("squareImg:", img.src)
}

//the return of the getElements... is not an array

// querySelector
const banner2 = document.querySelector("#banner")
const square2 = document.querySelector(".square")

const secondImage = document.querySelector("img:nth-of-type(2)")

const java = document.querySelector('a[title="Java"]')

// querySelectorAll
const Ps = document.querySelectorAll("p")
const AInsideP = document.querySelectorAll("p a")
for (let link of AInsideP) {
  console.log("links:", link.href)
}

//innerHTML , innerText, textContext

// attributes
const firstLink = document.querySelector("a")
firstLink.getAttribute("href")

// change styles
const h1 = document.querySelector("h1")
h1.style.color = "#F546"

const container = document.querySelector("#container")
console.log(container.querySelector("h1"))

// ClassList - manipulate classes
const h2 = document.querySelector("h2")
// h2.setAttribute("class", "purple")
// h2.setAttribute("class", "border")

h2.classList.add("purple")
h2.classList.add("border")
h2.classList.remove("purple")
h2.classList.contains("purple")
h2.classList.toggle("purple") // nice way

// accessing parents, siblings

//Creating a element

//createElement
const newImage = document.createElement("img")
newImage.src =
  "https://images.unsplash.com/photo-1711703049564-907b88e2005a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

//appendChild
document.body.appendChild(newImage)
newImage.classList.add("square")

const newH3 = document.createElement("h3")
newH3.innerText = "hi lovelies"
document.body.appendChild(newH3)

//append
const p = document.querySelector("p")
p.append("i am little love", "love chickens")

//prepend
const newB = document.createElement("b")
newB.append("Yooo gurl")

p.prepend(newB)

// not a child - adjacent
// insertAdjacentElement
const newH2 = document.createElement("h2")
newH2.append("Yooo gurl")
h1.insertAdjacentElement("afterend", newH2)

//removeChild
// just after defining who is the parent element that
// is possible to remove the child
const firstLi = document.querySelector("li")
const ul = firstLi.parentElement
ul.removeChild(firstLi)

// remove
const img = document.querySelector("img")
// img.remove()
