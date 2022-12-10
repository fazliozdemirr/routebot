module.exports = {
  name: "mute",
  aliases: ["Mute", "timeout", "Timeout"],
  description: "Mute a member",
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
      .setTitle('Wrong command usage')
      .setDescription(`
**Command usage:** \`-mute [@user] - <reason>\``)
      .setFooter({text: `[] - Required | <> - Optional`})
      .setColor("RED");

    const noMemberPerms = new MessageEmbed()
      .setDescription(`You don't have permission to mute a member!`)
      .setColor("RED");

    const alreadyMute = new MessageEmbed()
      .setDescription(`That user is already muted!`)
      .setColor("RED");

    const higherRole = new MessageEmbed()
      .setDescription(`You cannot mute a member who have higher/equal roles than you!`)
      .setColor("RED");

    const noBotPerms = new MessageEmbed()
      .setDescription(`I don't have permissions to mute someone!`)
      .setColor("RED");

    const muteYourself = new MessageEmbed()
      .setDescription(`You couldn't mute yourself!`)
      .setColor("RED");

    const embed = new MessageEmbed()
      .setDescription(`${member} was muted!
**Reason:** ${reason}`)
      .setColor("12c4ff")

    if (!message.member.permissions.has("MDOERATE_MEMBERS")) return message.reply({ embeds: [noMemberPerms] });
    if (!role) return message.reply({ embeds: [notRole] });
    if (!message.guild.me.permissions.has("MODERATE_MEMBERS")) return message.reply({ embeds: [noBotPerms] });

    if (!member) return message.channel.send({ embeds: [notMember] });
    
    if (member.id === message.author.id) return message.reply({embeds: [muteYourself]});
    
    if (member.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerId) return message.reply({ embeds: [higherRole] });

    if (member.roles.cache.has(role.id)) return message.channel.send({ embeds: [alreadyMute] });

    member.roles.add(role)
    message.channel.send({ embeds: [embed] })

  }
}