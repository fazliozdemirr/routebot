module.exports = {
  name: "unlock",
  aliases: ["Unlock", "Unlockdown", "un-lock", "Un-Lock", "Un-lock"],
  description: "Unlock a locked channel",
  run(client, message, args) {
    const Discord = require("discord.js")

    const { MessageEmbed } = require("discord.js");

    if (!message.member.permissions.has('KICK_MEMBERS')) {

      const unlockchannelError = new Discord.MessageEmbed()
        .setDescription('You don\'t have permission to unlock channels!')
        .setColor("#12c4ff")

      return message.channel.send({ embeds: [unlockchannelError] })
    }

    const channel = message.mentions.channels.first();

    const msg = args.join(' ');
    const msgSplit = msg.split(' - ');
    const reason = msgSplit[1] || 'Not specified';

    const embed = new Discord.MessageEmbed()
      .setTitle(`Channel Unlocked!`)
      .setURL("https://youtube.com/c/ShadowCoDM")
      .setDescription(`**Channel:** ${channel} \n**Reason:** ${reason}`)
      .setColor("#12c4ff")

    channel.permissionOverwrites.create(message.guild.roles.everyone, { SEND_MESSAGES: true })

    message.channel.send({ embeds: [embed] })

    message.delete()
  }
}