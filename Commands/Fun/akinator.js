module.exports = {
  name: "akinator",
  aliases: ["Akinator"],
  description: "Play Akinator",
  run(client, message, args) {
    const akinator = require("discord.js-akinator");
    akinator(message, client);
  }
}