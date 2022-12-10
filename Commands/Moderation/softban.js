module.exports = {
  name: "softban",
  aliases: ["Softban"],
  description: "Softban a member",
  run(client, message, args) {

    const { MessageEmbed } = require("discord.js");
    const member = message.mentions.members.first() || args[0];
    const modEmoji = "<:mod:944912016068468737>";

    const noPerms = new MessageEmbed()
      .setDescription(`You don't have permission to softban members!`)
      .setColor('RED');

    const noBotPerms = new MessageEmbed()
      .setDescription(`I don't have permission to softban members!`)
      .setColor('RED');

    const banningYourself = new MessageEmbed()
      .setDescription(`You couldn't softban yourself!`)
      .setColor('RED');

    const higherRole = new MessageEmbed()
      .setDescription(`You cannot softban a member who have higher/equal roles than you!`)
      .setColor('RED');

    const botLowerRole = new MessageEmbed()
      .setDescription(`I cannot softban a member who have higher/equal roles than me!`)
      .setColor('RED');

    const wrongUsage = new MessageEmbed()
      .setTitle('Wrong command usage')
      .setDescription(`Command usage: \`-softban [@user]\``)
      .setColor("RED")
      .setTimestamp()
      .setFooter({ text: `[] - Required` })

    if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply({ embeds: [noPerms] });

    if (!member) return message.reply({ embeds: [wrongUsage] });

    const banChanelEmbed = new MessageEmbed()
      .setDescription(`${member.user.tag} was softbanned!`)
      .setColor("#12c4ff")
      .setTimestamp()
      .setFooter({ text: `Moderator: ${message.author}` });

    if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply({ embeds: [noBotPerms] });

    if (member.id === message.author.id) return message.reply({ embeds: [banningYourself] });

    if (member.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerId) {
      return message.reply({ embeds: [higherRole] })
    };

    member.ban();
    message.channel.guild.members.unban(member.id);
    message.channel.send({ embeds: [banChanelEmbed] });

  }
}