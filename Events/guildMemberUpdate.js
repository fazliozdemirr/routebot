module.exports = {
  name: `guildMemberUpdate`,
  async run(oldMember, { client, Discord }, newMember) {

    const { MessageEmbed } = require('discord.js');
    const channel = '1012096518838300712';

    // If the role(s) are present on the old member object but no longer on the new one (i.e role(s) were removed)
    const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
    if (removedRoles.size > 0) {
      client.channels.cache.get(channel).send({
        embeds: [
          new MessageEmbed()
            .setColor('RED')
            .setAuthor({
              name: newMember.user.tag,
              iconURL: newMember.displayAvatarURL()
            })
            .setDescription(`The role(s) \`${removedRoles.map(r => r.name)}\` were removed from ${oldMember.displayName}.`)
            .setFooter({
              text: `Member ID: ${newMember.id}`
            })
            .setTimestamp()
        ]
      });
    }

    // If the role(s) are present on the new member object but are not on the old one (i.e role(s) were added)
    const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
    if (addedRoles.size > 0) {
      client.channels.cache.get(channel).send({
        embeds: [
          new MessageEmbed()
            .setColor('BLUE')
            .setAuthor({
              name: newMember.user.tag,
              iconURL: newMember.displayAvatarURL()
            })
            .setDescription(`The role(s) ${addedRoles.map(r => r.name)} were added to ${oldMember.displayName}.`)
            .setFooter({
              text: `Member ID: ${newMember.id}`
            })
            .setTimestamp()
        ]
      });
    }

  }
}