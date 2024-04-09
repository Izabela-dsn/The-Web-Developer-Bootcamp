const btn = document.querySelector("#v2")
btn.onclick = function () {
  alert("version 2")
}

const scream = () => {
  alert("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  alert("get out")
}

btn.onmouseenter = scream

const btn3 = document.querySelector("#v3")
// btn3.addEventListener("click", () => {
//   alert("hie from btn 3")
// })
btn3.addEventListener("dblclick", () => {
  alert("double click")
})
