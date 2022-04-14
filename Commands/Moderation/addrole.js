module.exports = {
  name: "addrole",
  aliases: ["Addrole", "add-role", "giverole", "Giverole"],
  description: "Add a role to a member",
  run(client, message, args) {

    if (!message.member.permissions.has('MANAGE_ROLES')) return message.channel.send(`You don't have permission to do that!`);

    const { MessageEmbed } = require('discord.js');
    if (!args[0] || !args[1]) return message.channel.send(`Wrong comamnd usage!
Commands usage: \`-addrole @user @role\``)
    try {
      const member = message.mentions.members.first();
      const roleName = message.mentions.roles.first();
      const alreadyHasRole = member.roles.cache.some(role => role.id === roleName.id)
      const alreadyHasRoleEmbed = new MessageEmbed()
        .setDescription(`User already has that role`)
        .setColor("#12c4ff");

      if (alreadyHasRole) return message.channel.send({ embeds: [alreadyHasRoleEmbed] });

      const modEmbed = new MessageEmbed()
        .setDescription(`**Message:** [Message](${message.url})`)
        .setColor("12c4ff")
        .setTimestamp()
        .setFooter({ text: `This message was issued by Administration` })
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: 'png' }));

      const embed = new MessageEmbed()
        .setAuthor(`Role Given`)
        .setDescription(`Successfully given the role **${roleName}** to **${member.user}**.`)
        .setColor('#12c4ff')
        .setFooter({ text: 'This message was issued by Administration', iconURL: message.guild.iconURL() })
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: 'png' }))

      if (message.guild.id === `${process.env.myServer}`) {
        client.channels.cache.get('959357633733730324').send({
          content: `${process.env.modEmoji} **Mod log:**
    > **Content:** ${message.content}
    > **Action:** Addrole
    > **Channel:** ${message.channel}
    > **Message id:** ${message.id}
    > **Moderator:** ${message.author}`, embeds: [modEmbed, embed]
        })
      }

      return member.roles.add(roleName).then(() =>
        message.channel.send({ embeds: [embed] }))

    } catch (e) {
      console.log(e)
      return message.channel.send('Oops! Something went wrong...')
    }
  }
}