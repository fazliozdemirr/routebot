module.exports = {
  name: "roleperms",
  aliases: ["Roleperms"],
  description: "Check the permissions of a role",
  run(client, message, args) {

    const { MessageEmbed } = require('discord.js');

    const role = message.mentions.roles.first();
    const rolePerms = role.permissions.toArray().join(',  ');

    const rolePermsEmbed = new MessageEmbed()
      .setTitle(`Permissions for ${role.name} role`)
      .setURL(`https://youtube.com/c/ShadowCoDM`)
      .setDescription(`${rolePerms}`)
      .setColor(`#12c4ff`)
      .setTimestamp();

if(!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send({content: `You don't have permission to do that!`})
    
if(!role) return message.channel.send({content: `Wrong command usage!
**Command usage:** \`-roleperms @role\``})
    
    try {
      message.channel.send({ embeds: [rolePermsEmbed] })
    } catch (e) {
      console.log(e)
      message.channel.send({ content: `Oops! Something went wrong...` })
    };

  }
}