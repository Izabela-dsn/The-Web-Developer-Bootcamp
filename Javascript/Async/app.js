// async and await

//returns a promise
async function hello() {}

const sing = async () => {}

const singer = async () => {
  //   throw new Error("Oh no!")
  return "dó re mi fa"
}

singer()
  .then((data) => {
    console.log("Promise resolved with:", data)
  })
  .catch((err) => {
    console.log("Promise rejected")
    console.log(err)
  })

const login = async (username, passaword) => {
  const passwordUser = "kudasai"
  if (!username || !passaword) {
    throw "Missing Credentials"
  }
  if (passaword === passwordUser) {
    return true
  }
  throw "Invalid Password"
}

login("iza", "kudasai")
  .then((msg) => {
    console.log("Logged in!")
    console.log(msg)
  })
  .catch((err) => {
    console.log("error")
    console.log(err)
  })

const delayedColorChange = (color, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.body.style.backgroundColor = color
      resolve()
    }, delay)
  })
}
async function rainbow() {
  //await => wait the promise be done/resolved then continue
  await delayedColorChange("red", 1000)
  await delayedColorChange("orange", 1000)
  await delayedColorChange("blue", 1000)
  return "colors"
}

// rainbow().then((data) => console.log("END!", data))

// handle rejections
const fakeRequest = (url) => {
  const rand = Math.random()
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (rand < 0.7) {
        resolve(`fake data from: ${url}`)
      }
      reject("Time out!")
    }, rand)
  })
}

async function makeRequests() {
  try {
    let data = await fakeRequest("/page1")
    let data2 = await fakeRequest("/page2")
    console.log(data)
    console.log(data2)
  } catch (error) {
    console.log("sorry it's a error:", error)
  }
}
