module.exports = {
  name: "unban",
  aliases: ['Unban'],
  description: "Unban a member",
 async run(client, message, args) {

    const { MessageEmbed } = require("discord.js");

const member = args[0];

    const noPerms = new MessageEmbed()
      .setDescription(`You don't have permission to ban members!`)
      .setColor('RED');

    const noBotPerms = new MessageEmbed()
      .setDescription(`I don't have permission to unban members!`)
      .setColor('RED');

    const unbanningYourself = new MessageEmbed()
      .setDescription(`You are not banned!`)
      .setColor('RED');

    const wrongUsage = new MessageEmbed()
      .setTitle('Wrong command usage')
      .setDescription(`Command usage: \`-unban [user_id]\``)
      .setColor("RED")
      .setTimestamp()
      .setFooter({ text: `[] - Required` });

    if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply({ embeds: [noPerms] });

    if (!member) return message.reply({ embeds: [wrongUsage] });

    const unbanMemberEmbed = new MessageEmbed()
      .setDescription(`You were unbanned in ${message.guild.name} by ${message.author.username}!`)
      .setColor("#12c4ff");

    if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply({ embeds: [noBotPerms] });

    if (member === message.author.id) return message.reply({ embeds: [unbanningYourself] });

    const unbanneduser = await message.channel.guild.members.unban(member);

    const unbanChanelEmbed = new MessageEmbed()
      .setDescription(`${unbanneduser.tag} was unbanned!`)
      .setColor("#12c4ff")
      .setTimestamp()
      .setFooter({ text: `Moderator: ${message.author.username}` });
   
    message.channel.send({ embeds: [unbanChanelEmbed] });
    unbanneduser.send({ embeds: [unbanMemberEmbed] });

  }
}