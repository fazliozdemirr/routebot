module.exports = {
  name: "lock",
  aliases: ["Lock", "lockdown", "Lockdown"],
  description: "Lock a channel",
  run(client, message, args) {
    const Discord = require("discord.js");

    const channel = message.mentions.channels.first();
    const msg = args.join(' ');
    const msgSplit = msg.split(' - ');
    const reason = msgSplit[1] || 'Not specified';
    const everyone = message.guild.roles.everyone;

    const lockchannelError = new Discord.MessageEmbed()
      .setDescription('You don\'t have permission to lock channels!')
      .setColor("RED");

    const embed = new Discord.MessageEmbed()
      .setTitle(`Channel Locked!`)
      .setURL("https://youtube.com/c/ShadowCoDM")
      .setDescription(`**Channel:** ${channel} \n**Reason:** ${reason}`)
      .setColor("#12c4ff");

    if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send({ embeds: [lockchannelError] });

    if (!channel) return message.reply(`Wrong command usage!
Command usage: \`-lock #channel - reason\``);

    channel.permissionOverwrites.create(everyone, {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: false,
      READ_MESSAGE_HISTORY: true
    });

    message.channel.send({ embeds: [embed] });

    message.delete();

  }
}