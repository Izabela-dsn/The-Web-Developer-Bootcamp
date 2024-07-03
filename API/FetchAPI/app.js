//request ->  promise -> that resolve as soon as can ->
// -> get data -> is a promise too -> then resolve and return the JSON we want
fetch("https://swapi.dev/api/people/1/")
  //this promise is resolved as soon as
  //fetch receive any headers
  //that means that we do not have the full body, e.g, the data
  .then((res) => {
    console.log("resolved", res)
    //now we get data
    return res.json()
  })
  .then((data) => {
    console.log("JSON: ", data)
  })
  .catch((e) => {
    console.log("error: ", e)
  })

// async
const loadStarWarsPeople = async () => {
  try {
    const response = await fetch("https://swapi.dev/api/people/5/")
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log("error: ", error)
  }
}

loadStarWarsPeople()
