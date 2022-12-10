module.exports = {
  name: "unmute",
  aliases: ["Unmute"],
  perms: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MDOERATE_MEMBERS'],
  botPerms: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'MDOERATE_MEMBERS'],
  usage: '-unmute [@user] <reason>',
  description: "Unmute a member",
  run(client, message, args) {
    const { MessageEmbed } = require("discord.js");
    const role = message.guild.roles.cache.find(role => role.name === "Muted");
    const member = message.mentions.members.first();
    const msg = args.join(" ")
    const msgSplit = msg.split(' - ');
    const reason = msgSplit[1] || 'Not specified'

    const notRole = new MessageEmbed()
      .setDescription(`This server doesn't have a mute role!

You can use the command \`muterole-create\` to create the muterole for this server`)
      .setColor("RED");

    const notMember = new MessageEmbed()
      .setDescription(`Wrong command usage!

**Command usage:** \`-unmute [@user] - <reason>\``)
      .setFooter({text: `[] - Required | <> - Optional`})
      .setColor("RED");

    const noMemberPerms = new MessageEmbed()
      .setDescription(`You don't have permission to unmute a member!`)
      .setColor("RED");

    const notMute = new MessageEmbed()
      .setDescription(`That user is not muted!`)
      .setColor("RED");

    const higherRole = new MessageEmbed()
      .setDescription(`You cannot unmute a member who have been muted by a mod who have higher roles than you!`)
      .setColor("RED");

    const noBotPerms = new MessageEmbed()
      .setDescription(`I don't have permission to unmute someone!`)
      .setColor("RED");

    const muteYourself = new MessageEmbed()
      .setDescription(`You couldn't unmute yourself!`)
      .setColor("RED");

    const embed = new MessageEmbed()
      .setDescription(`${member} was unmuted!
**Reason:** ${reason}`)
      .setColor("12c4ff")

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply({ embeds: [noMemberPerms] });
    if (!role) return message.reply({ embeds: [notRole] });
    if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply({ embeds: [noBotPerms] });

    if (!member) return message.channel.send({ embeds: [notMember] });
    
    if (member.id === message.author.id) return message.reply({embeds: [muteYourself]});
    
    if (member.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerId) return message.reply({ embeds: [higherRole] });

    if (!member.roles.cache.has(role.id)) return message.channel.send({ embeds: [notMute] });

    member.roles.remove(role)
    message.channel.send({ embeds: [embed] })

  }
}