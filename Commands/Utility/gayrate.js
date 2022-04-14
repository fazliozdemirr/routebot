module.exports = {
  name: "gayrate",
  aliases: ["Gayrate", "gay-rate", "gay", "Gay"],
  description: "Check your gay rate! Lmao",
  run(client, message, args) {
    message.channel.send({ content: `You are ${(Math.floor(Math.random() * 100))}% Gæ` })
  }
}