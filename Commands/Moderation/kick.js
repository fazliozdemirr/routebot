module.exports = {
  name: "kick",
  aliases: ["Kick"],
  description: "Kick a member",
  run(client, message, args) {

    const { MessageEmbed } = require("discord.js");
    const member = message.mentions.members.first();

    const noPerms = new MessageEmbed()
      .setDescription(`You don't have permissions to kick members!`)
      .setColor('RED');

    const noBotPerms = new MessageEmbed()
      .setDescription(`I don't have permissions to kick members!`)
      .setColor('RED');

    const kickingYourself = new MessageEmbed()
      .setDescription(`You couldn't kick yourself!`)
      .setColor('RED');

    const higherRole = new MessageEmbed()
      .setDescription(`You cannot kick a member who have higher/equal roles than you!`)
      .setColor('RED');

    const wrongUsage = new MessageEmbed()
     .setTitle('Wrong command usage')
      .setDescription(`
**Correct usage:** \`-kick [@user]\``)
      .setColor("RED")
      .setTimestamp()
      .setFooter({ text: `[] - Required` });

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply({ embeds: [noPerms] });

    if (!member) return message.reply({ embeds: [wrongUsage] })

    const kickChanelEmbed = new MessageEmbed()
      .setDescription(`${member.user.tag} was kicked!`)
      .setColor("#12c4ff")
      .setTimestamp()
      .setFooter({ text: `Moderator: ${message.author.username}` });

    const kickMemberEmbed = new MessageEmbed()
      .setDescription(`You were kicked from ConquerX by ${message.author.username}!`)
      .setColor("#12c4ff");

    if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply({ embeds: [noBotPerms] });

    if (member.id === message.author.id) return message.reply({ embeds: [kickingYourself] });

    if (member.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerId) {
      return message.reply({ embeds: [higherRole] })
    };
    
    member.kick()
    message.channel.send({ embeds: [kickChanelEmbed] })
    member.send({ embeds: [kickMemberEmbed] })

  }
}