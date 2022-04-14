module.exports = {
  name: "warn",
  aliases: ["Warn", "punish", "Punish"],
  description: "Warn a member",
  run(client, message, args) {

//------------------------------------
    const Discord = require("discord.js");

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("You don't have permission to do that!");

    const user = message.mentions.users.first() || args[0]

    if (!user) message.channel.send(`Wrong command usage!
Command usage: \`-warn @user - reason(optional)\``)

    const msg = args.join(' ');
    const msgSplit = msg.split(' - ');
    const reason = msgSplit[1] || 'Not specified'

    const embed = new Discord.MessageEmbed()
      .setTitle("Warning")
      .setDescription(`${user} you have been warned\nReason: ${reason}`)
      .setColor("#12c4ff")
      .setFooter(`Moderator: ${message.author.username}`)
      .setTimestamp()

    message.channel.send({ embeds: [embed] })
    message.delete()
//------------------------------------

  }
}