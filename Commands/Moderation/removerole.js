module.exports = {
  name: "removerole",
  aliases: ["Removerole", "remove-role", "Remove-role", "Remove-Role"],
  description: "Remove a role from a member",
  run(client, message, args) {

    const { MessageEmbed } = require('discord.js');

    //Check args
    const noArgs = new MessageEmbed()
      .setColor('RED')
      .setTitle('Wrong comamnd usage')
      .setDescription(`**Correct usage:** \`-removerole [@user] [@role]\``)
      .setFooter({ text: `[] - Required` });
    if (!args[0] || !args[1]) return message.channel.send({ embeds: [noArgs] })
    //Check args

    //Variables
    const member = message.mentions.members.first();
    const roleName = message.mentions.roles.first();
    //Variables

    //Checking user perms
    const noMemberPerms = new MessageEmbed()
      .setDescription(`You don't have permission to manage roles of a member!`)
      .setColor('RED');
    if (!message.member.permissions.has('MANAGE_ROLES')) return message.reply({ embeds: [noMemberPerms] });
    //Checking user perms

    //If the bot doesn't have perms to manage roles
    const noBotPerms = new MessageEmbed()
      .setDescription(`I don't have permission to manage roles of a member!`)
      .setColor('RED');
    if (!message.guild.me.permissions.has("MANAGE_ROLES")) return message.reply({ embeds: [noBotPerms] });
    //If the bot doesn't have perms to manage roles

    //If the mentioned member already has the role
    const Role = member.roles.cache.some(role => role.id === roleName.id);
    const notHasRoleEmbed = new MessageEmbed()
      .setDescription(`User does't have that role`)
      .setColor("RED");
    if (!Role) return message.reply({ embeds: [notHasRoleEmbed] });
    //If the mentioned member already has the role

    //If the mentioned role is higher than the user highest role
    const higherRole = new MessageEmbed()
      .setDescription(`You can't remove a role which is higher/equal than yours.`)
      .setColor('RED');
    if (roleName.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerID) {
      return message.reply({ embeds: [higherRole] })
    };
    if (member.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerID) {
      return message.reply({ embeds: [higherRole] })
    };
    //If the mentioned role is higher than the user highest role

    //If the mentioned role is higher than the bot role
    const botLowerRole = new MessageEmbed()
      .setDescription(`I can't remove a role which is higher/equal than me.`)
      .setColor('RED');
    if (roleName.position >= message.guild.me.roles.highest.position) return message.reply({ embeds: [botLowerRole] });
    //If the mentioned role is higher than the bot role

    //Role removed successfully
    const embed = new MessageEmbed()
      .setAuthor(`Role Given`)
      .setDescription(`Successfully removed the role **${roleName}** from **${member.user}**.`)
      .setColor('#12c4ff')
      .setFooter({ text: `Moderator: ${message.author.username}`, iconURL: message.guild.iconURL() })
      .setTimestamp()
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: 'png' }))

    member.roles.remove(roleName)
    message.channel.send({ embeds: [embed] })
    //Role removed successfully

  }
}