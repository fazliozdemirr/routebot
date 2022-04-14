module.exports = {
  name: "spank",
  aliases: ["Spank"],
  description: "Spank someone",
  async run(client, message, args) {

    const Discord = require("discord.js")
    const canvacord = require("canvacord")
    let arg = message.content.slice("".length).trim().split(/ +/g)
    arg.shift().toLowerCase();
    const member = message.mentions.members.first() || message.guild.members.cache.get(arg[0])

if (member === "893705256368750592") return message.channel.send("Lmao <:igotubitch:945828580854747136>")
    
    if (!member) {
      let avatar = client.user.displayAvatarURL({ format: "png", size: 2048 })
      let avatar2 = message.author.displayAvatarURL({ format: "png", size: 2048 })
      let image = await canvacord.Canvas.spank(avatar, avatar2);
      let attachment = new Discord.MessageAttachment(image, "spank.png");
      return message.channel.send({files: [attachment]})
    }
    if (!member) return message.reply('User not found!')
    let avatar = message.author.displayAvatarURL({ format: "png", size: 2048 })
    let avatar2 = member.user.displayAvatarURL({ format: "png", size: 2048 })
    let image = await canvacord.Canvas.spank(avatar, avatar2);
    let attachment = new Discord.MessageAttachment(image, "spank.png");
    return message.channel.send({files: [attachment]})
  }
}