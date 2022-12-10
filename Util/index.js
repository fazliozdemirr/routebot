const { readdirSync } = require('fs')
let Util = {}
readdirSync(`./Util/Commands`).forEach(file => {
  Util[file.split(`.`)[0]] = require(`./Commands/${file}`)
})
global.Utility = Util