//Importing packages
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: 32767,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
exports.client = client;
const { exec } = require('child_process');
const fs = require("fs")
//Importing packages

//Express Server
const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send('Bot is working!')
});
app.listen(3000, () => {
  console.log(`Successfully logged in!
Succesfully loaded ${client.commands.size} commands!`)
});
//Express server

//Handlers
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
['commands', 'events'].forEach(handler => {
  require(`./Handlers/${handler}`)(client, Discord)
});
//Handlers

//Anti-crash
client.on('debug', info => {
  if (info.startsWith(`Hit a 429`)) exec(`kill 1`, () => { })
});
process.on("unhandledRejection", (reason, p) => {
  console.error(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.error(err, origin)
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.error(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
  console.error(type, promise, reason);
});
//Anti-crash

//Bot login
client.login('#YOUR BOT TOKEN HERE').catch((e) => console.log(e));
//Bot login