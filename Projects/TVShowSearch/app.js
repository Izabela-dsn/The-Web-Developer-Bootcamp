const form = document.querySelector("#searchForm")

// submit event form
form.addEventListener("submit", async (e) => {
  e.preventDefault()
  console.log("submitted")
  // extract the input
  console.dir(form)
  console.log(form.elements.tvTitleQuery.value)
  // search the query in API
  const queryTerm = form.elements.tvTitleQuery.value
  const config = { params: { q: queryTerm } }
  const res = await axios.get(`https://api.tvmaze.com/search/shows`, config)
  console.log(res.data)
  // getting img
  console.log(res.data[0].show.image.medium)
  showImages(res.data)
  form.elements.tvTitleQuery.value = ""
})

const showImages = (shows) => {
  for (let result of shows) {
    if (result.show.image) {
      const img = document.createElement("img")
      img.src = result.show.image.medium
      document.body.append(img)
    }
  }
}
