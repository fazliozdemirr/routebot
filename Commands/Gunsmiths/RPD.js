const Discord = require("discord.js")
exports.run = (client, message, args) =>{
const commands = client.commands.map(command => command.name).join(", ")
const embed = new Discord.MessageEmbed()
.setTitle("Gunsmith:")
.setURL("https://youtube.com/c/ShadowCoDM")
.setDescription(`https://youtube.com/c/ShadowCoDM`)
.setColor("#12c4ff")
.setImage("https://media.discordapp.net/attachments/943047940371546182/950385374784536627/Screenshot_20220307_180757_2923542ffeefa041adc0c105fc5bf76c.jpg?width=931&height=418")
.setTimestamp()
.setFooter("Gunsmith by ShadowOP | Do check Shadow on YouTube")
message.channel.send({embeds: [embed]})
}

exports.name = "RPD"