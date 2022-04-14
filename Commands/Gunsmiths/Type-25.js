const Discord = require("discord.js")
exports.run = (client, message, args) =>{
const commands = client.commands.map(command => command.name).join(", ")
const embed = new Discord.MessageEmbed()
.setTitle("Type-25 Gunsmith:")
.setURL("https://youtube.com/c/ShadowCoDM")
.setDescription(`https://youtube.com/c/ShadowCoDM`)
.setColor("#12c4ff")
.setImage("https://media.discordapp.net/attachments/943047940371546182/945293224799514674/Screenshot_20220206_195723_2923542ffeefa041adc0c105fc5bf76c.jpg")
.setTimestamp()
.setFooter("Gunsmith by ShadowOP | Do check Shadow on YouTube")
message.channel.send({embeds: [embed]})
}

exports.name = "Type-25"