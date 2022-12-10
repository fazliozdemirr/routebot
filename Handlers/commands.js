const fs = require('fs');

module.exports = (client, Discord) => {

  const commands = fs.readdirSync("./Commands").filter(f => !f.includes(`.`))
  for (fold of commands) {
    const folder = fs.readdirSync(`./Commands/${fold}`).filter(file => file.endsWith(`.js`))
    for (file of folder) {
      const command = require(`../Commands/${fold}/${file}`)
      client.commands.set(command.name, command)
    }
  }
}