module.exports = {
  name: "warn",
  aliases: ["Warn", "punish", "Punish"],
  description: "Warn a member",
  run(client, message, args) {

//------------------------------------
    const { MessageEmbed } = require("discord.js");
    const msg = args.join(' ').split(' - ')
    const member = message.mentions.members.first();
    const reason = msg[1] || 'Not specified';
console.log(reason)
    const noPerms = new MessageEmbed()
      .setDescription(`You don't have permission to warn members!`)
      .setColor("RED")

    if (!message.member.permissions.has("MODERATE_MEMBERS")) return message.reply({ embeds: [noPerms] });

    const wrongUsage = new MessageEmbed()
      .setTitle('Wrong command usage')
      .setDescription(`
**Correct usage:** \`-warn [@user] <reason>\``)
      .setFooter({ text: `[] - Required | <> - Optional` })
      .setColor("RED");

    const noBotPerms = new MessageEmbed()
      .setDescription(`I don't have permission to warn members!`)
      .setColor('RED');

    const warningYourself = new MessageEmbed()
      .setDescription(`You couldn't warn yourself!`)
      .setColor('RED');

    const higherRole = new MessageEmbed()
      .setDescription(`You cannot warn a member who have higher/equal roles than you!`)
      .setColor('RED');

    const embed = new MessageEmbed()
      .setTitle("Warning")
      .setDescription(`${member} you have been warned\nReason: ${reason}`)
      .setColor("#12c4ff")
      .setFooter({text: `Moderator: ${message.author.username}`})
      .setTimestamp()

    if (!member) message.reply({ embeds: [wrongUsage] })
    
    if (!message.guild.me.permissions.has("MODERATE_MEMBERS")) return message.reply({ embeds: [noBotPerms] });

        if (member.id === message.author.id) return message.reply({ embeds: [warningYourself] });

    if (member.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerId) {
      return message.reply({ embeds: [higherRole] })
    };

    message.channel.send({ embeds: [embed] })
    message.delete()
//------------------------------------

  }
}