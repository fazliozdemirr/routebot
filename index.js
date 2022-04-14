//Importing packages
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: 32767,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
exports.client = client
const db = require("quick.db");
const ms = require("ms");
const fs = require('fs');
const memberCounter = require('./Counters/member-counter');
const ifh = require("intervals-for-humans");
const pt = require("prettytime");
const prefix = "-";
const snipe = new Discord.Collection();
//Importing packages

//Express Server
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`Successfully logged in!
Succesfully loaded ${client.commands.size} commands!`)
});

app.listen(3000, () => {
  console.log(`Successfully logged in!
Succesfully loaded ${client.commands.size} commands!`)
});
//Express server

//Command handler
client.commands = new Discord.Collection();
const commands = fs.readdirSync("./Commands").filter(f => !f.includes(`.`))
for (fold of commands) {
  const folder = fs.readdirSync(`./Commands/${fold}`).filter(file => file.endsWith(`.js`))
  for (file of folder) {
    const command = require(`./Commands/${fold}/${file}`)
    client.commands.set(command.name, command)
  }
}
//Command handler

//Event handler
client.events = new Discord.Collection();
const events = fs.readdirSync("./Events")
for (file of events) {
  const event = require(`./Events/${file}`)
  client.events.set(event.name, event)
}
client.events.forEach(event => {
  if (event.ws) {
    client.ws.on(event.name, item => {
      event.run(item, { client, Discord })
    })
  } else {
    client.on(event.name, (item1, item2) => {
      event.run(item1, { client, Discord, db, prefix, memberCounter, snipe }, item2)
    })
  }
})
//Event handler

//Debug, Unhandled Rejection
client.on('debug', info => {
  console.log(info)
});

process.on("unhandledRejection", async error => {
  console.log(error);
});
//Debug, Unhandled Rejection

//Bot login
client.login(process.env.token).catch((e) => console.log(e));
//Bot login