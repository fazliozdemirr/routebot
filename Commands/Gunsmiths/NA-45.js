const Discord = require("discord.js")
exports.run = (client, message, args) =>{
const commands = client.commands.map(command => command.name).join(", ")
const embed = new Discord.MessageEmbed()
.setTitle("Gunsmith:")
.setURL("https://youtube.com/c/ShadowCoDM")
.setDescription(`Don't use NA-45 you noob
Fuck Off`)
.setColor("#12c4ff")
.setTimestamp()
.setFooter("Gunsmith by ShadowOP | Do check Shadow on YouTube")
message.channel.send({embeds: [embed]})
}

exports.name = "NA-45"