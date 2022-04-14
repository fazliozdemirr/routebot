module.exports = {
  name: "removerole",
  aliases: ["Removerole", "remove-role", "Remove-role", "Remove-Role"],
  description: "Remove a role from a member",
  run(client, message, args) {
    if (!message.member.permissions.has('MANAGE_ROLES')) return message.channel.send(`You don't have permission to do that!`);

    const { MessageEmbed } = require('discord.js');
    if (!args[0] || !args[1]) return message.channel.send(`Wrong command usage!
Command usage: \`-removerole @user @role\``)
    try {

      const { MessageEmbed } = require("discord.js")
      const member = message.mentions.members.first();
      const roleName = message.mentions.roles.first();
      const notHasRole = member.roles.cache.some(role => role.id === roleName.id)
      const notHasRoleEmbed = new MessageEmbed()
        .setDescription(`User doesn't have that role`)
        .setColor("#12c4ff");

      if (!notHasRole) return message.channel.send({embeds: [notHasRoleEmbed]});

      const embed = new MessageEmbed()
        .setAuthor(`Role Removed`)
        .setDescription(`Successfully removed the role **${roleName}** from **${member.user}**.`)
        .setColor('#12c4ff')
        .setFooter("This message was issued by the Administration")
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: 'png' }))

      const modEmbed = new MessageEmbed()
        .setDescription(`**Message:** [Message](${message.url})`)
        .setColor("12c4ff")
        .setTimestamp()
        .setFooter({ text: `This message was issued by Administration` })
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: 'png' }));

      return member.roles.remove(roleName).then(() =>
        message.channel.send({ embeds: [embed] }),

        client.channels.cache.get('959357633733730324').send({
          content: `${process.env.modEmoji} **Mod log:**
> **Content:** ${message.content}
> **Action:** Removerole
> **Channel:** ${message.channel}
> **Message id:** ${message.id}
> **Moderator:** ${message.author}`, embeds: [modEmbed, embed]
        })
      );
    } catch (e) {
      console.log(e)
      return message.channel.send('Oops! Something went wrong...')
    }
  }
}