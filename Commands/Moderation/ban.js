module.exports = {
  name: "ban",
  aliases: ["Ban"],
  description: "Ban a member",
  run(client, message, args) {

    const { MessageEmbed } = require("discord.js");
    const member = message.mentions.members.first() || args[0];
const reason = args.join[1] || 'No reason provided';

    const modEmoji = "<:mod:944912016068468737>";

    const noPerms = new MessageEmbed()
      .setDescription(`You don't have permission to ban members!`)
      .setColor('RED');

    const noBotPerms = new MessageEmbed()
      .setDescription(`I don't have permission to ban members!`)
      .setColor('RED');

    const banningYourself = new MessageEmbed()
      .setDescription(`You couldn't ban yourself!`)
      .setColor('RED');

    const higherRole = new MessageEmbed()
      .setDescription(`You cannot ban a member who have higher/equal roles than you!`)
      .setColor('RED');

    const wrongUsage = new MessageEmbed()
      .setTitle('Wrong command usage')
      .setDescription(`Command usage: \`-ban [@user] <reason>\``)
      .setColor("RED")
      .setTimestamp()
      .setFooter({ text: `[] - Required | <> - Optional` });

    if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply({ embeds: [noPerms] });

    if (!member) return message.reply({ embeds: [wrongUsage] });

    const banChanelEmbed = new MessageEmbed()
      .setDescription(`${member.user.tag} was banned!
**Reason:** ${reason}
`)
      .setColor("#12c4ff")
      .setTimestamp()
      .setFooter({ text: `This message was issued by Administration` });

    const banMemberEmbed = new MessageEmbed()
      .setDescription(`You were banned in ${message.guild.name} by ${message.author.username}!
**Reason:** ${reason}`)
      .setColor("#12c4ff");

    if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply({ embeds: [noBotPerms] });

    if (member.id === message.author.id) return message.reply({ embeds: [banningYourself] });

    if (member.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerID) {
      return message.reply({ embeds: [higherRole] })
    };
      
    member.ban({ reason: `${reason}`})
    message.channel.send({ embeds: [banChanelEmbed] });
    member.send({ embeds: [banMemberEmbed] });

  }
}