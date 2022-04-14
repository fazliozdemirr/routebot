exports.run = (client, message, args) => {
const Discord = require("discord.js")
    const embed = new Discord.MessageEmbed()
      .setTitle("Error")
      .setDescription(`That command doesn't exist`)
      .setURL("https://youtube.com/c/ShadowCoDM")
      .setFooter("Type \"-help\" for more information")
      .setColor("#12c4ff")
      .setTimestamp();
  
  if (!message.member.permissions.has
    ("MANAGE_CHANNELS")) return message.channel.send({embeds: [embed]})

  let whattosay = message.content.slice("".length).trim().split(/ +/);
  whattosay.shift().toLowerCase().split(" ")[0]
 
message.delete();
  message.channel.send(whattosay.join(" "))
}

exports.name = "say"