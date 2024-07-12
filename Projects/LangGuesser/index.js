const franc = require("franc")
const langs = require("langs")
const colors = require("colors")

const input = process.argv[2]
const langCode = franc(input)
if (langCode === "und") {
  console.log("try again with other words".red)
} else {
  const language = langs.where("3", langCode)
  if (language) {
    console.log("our best guess is:", language.name.rainbow)
  } else {
    console.log(
      colors.red(`SORRY, COULDN'T FIND A LANGUAGE FOR CODE: ${langCode}`)
    )
  }
}
