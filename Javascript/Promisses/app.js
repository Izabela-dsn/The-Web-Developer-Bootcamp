// new Promise((resolve, reject) => {

// })

const fakeRequest = (url) => {
  const rand = Math.random()
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (rand < 0.7) {
        resolve("fake data")
      }
      reject("error in server")
    }, 1000)
  })
}

fakeRequest("/dogs/1")
  .then((data) => {
    console.log("request made")
    console.log("your data:", data)
  })
  .catch((err) => {
    console.log(err)
  })
