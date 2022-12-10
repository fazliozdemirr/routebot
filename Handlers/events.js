module.exports = (client, Discord) => {
  const fs = require('fs');
  let prefix = "-";

  const events = fs.readdirSync("./Events")
  for (file of events) {
    const event = require(`../Events/${file}`)
    client.events.set(event.name, event)
  }
  client.events.forEach(event => {
    if (event.ws) {
      client.ws.on(event.name, item => {
        event.run(item, { client, Discord })
      })
    } else {
      client.on(event.name, (item1, item2) => {
        event.run(item1, { client, Discord, prefix, }, item2)
      })
    }
  });

}