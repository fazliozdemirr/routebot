module.exports = {
  name: "cockroach",
  aliases: ["Cockroach"],
  description: "It's a cockroach!",
  run(client, message, args) {
    message.channel.send({ content: "Lol" })
  }
}