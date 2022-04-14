module.exports = {
  name: "image",
  aliases: ["Image"],
  description: "Check your gay rate! Lmao",
  run(client, message, args) {
    const Discord = require("discord.js");

    const rickroll = "https://media.discordapp.net/attachments/943047940371546182/958630379705737246/ezgif-2-63102d26c1f5_2.mp4"

    const image = new Discord.MessageAttachment(`${rickroll}`, `video.mp4`)
    message.channel.send({ files: [image] })
  }
}