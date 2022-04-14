module.exports = {
  name: "userinfo",
  aliases: ["Userinfo", "user-info", "User-info", "User-Info"],
  description: "Get the info of a user",
  run(client, message, args) {

    const Discord = require("discord.js");
    const member = message.mentions.members.first();

    if (!message.member.permissions.has("KICK_MEMBERS")) {

      if (!member) {
        let status = (message.member.presence || { status: `Unknown` }).status;
        if (status === `idle`) status = `Idle`
        if (status === `online`) status = `Online`
        if (status === `dnd`) status = `Do not Disturb`
        if (status === `invisible`) status = `Invisible`;

        const embed = new Discord.MessageEmbed()
          .setColor("12c4ff")
          .setTitle(`${message.member.displayName}'s Info`)
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          .addFields(
            { name: `Status`, value: `${status}` },
            { name: `Usertag:`, value: `<@${message.author.id}>` },
            { name: `User ID:`, value: `${message.author.id}` },
            { name: `Created at:`, value: `${message.author.createdAt}` },
            { name: `Joined At:`, value: `${message.member.joinedAt}` },
            { name: `Nickname:`, value: `${message.member.displayName}` },
            { name: `Roles`, value: `${message.member.roles.cache.map(r => `${r}`).join('  ')}` }
          )
          .setFooter({ text: `Requested by ${message.author.displayName}` })
          .setTimestamp();

        message.channel.send({ embeds: [embed] })
      };

      if (member) {
        const embed = new Discord.MessageEmbed()
          .setDescription("You can ask the Server Mods for getting others' information.")
          .setColor("#12c4ff");

        const modEmbed = new Discord.MessageEmbed()
          .setDescription(`**Message:** [Message](${message.url})`)
          .setColor("12c4ff")
          .setTimestamp()
          .setFooter({ text: `This message was issued by Administration` })
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: 'png' }));

        return message.channel.send({ embeds: [embed] }),

          client.channels.cache.get('959357633733730324').send({
            content: `${process.env.modEmoji} **Mod log:**
> **Content:** ${message.content}
> **Action:** Userinfo
> **Channel:** ${message.channel}
> **Message id:** ${message.id}
> **User:** ${message.author}
<@&940615716040736858>, <@&940616358666854410> ${message.member.displayName} is requesting ${member.displayName}'s userinfo`,
            embeds: [modEmbed]
          })

      }
    };


    if (message.member.permissions.has("KICK_MEMBERS")) {

      if (!member) {
        let status = (message.member.presence || { status: `Unknown` }).status;
        if (status === `idle`) status = `Idle`
        if (status === `online`) status = `Online`
        if (status === `dnd`) status = `Do not Disturb`
        if (status === `invisible`) status = `Invisible`;

        const embed = new Discord.MessageEmbed()
          .setColor("12c4ff")
          .setTitle(`${message.member.displayName}'s Info`)
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          .addFields(
            { name: `Status`, value: `${status}` },
            { name: `Usertag:`, value: `<@${message.author.id}>` },
            { name: `User ID:`, value: `${message.author.id}` },
            { name: `Created at:`, value: `${message.author.createdAt}` },
            { name: `Joined At:`, value: `${message.member.joinedAt}` },
            { name: `Nickname:`, value: `${message.member.displayName}` },
            { name: `Roles`, value: `${message.member.roles.cache.map(r => `${r}`).join('  ')}` }
          )
          .setFooter({ text: `Requested by ${message.author.displayName}` })
          .setTimestamp()

        message.channel.send({ embeds: [embed] })
      };

      if (member) {
        let status = (member.presence || { status: `Unknown` }).status;
        if (status === `idle`) status = `Idle`
        if (status === `online`) status = `Online`
        if (status === `dnd`) status = `Do not Disturb`
        if (status === `invisible`) status = `Invisible`;

        const embed = new Discord.MessageEmbed()
          .setColor("12c4ff")
          .setTitle(`${member.displayName}'s Info`)
          .setThumbnail(member.displayAvatarURL({ dynamic: true }))
          .addFields(
            { name: `Status`, value: `${status}` },
            { name: `Usertag:`, value: `<@${member.id}>` },
            { name: `User ID:`, value: `${member.id}`, inline: true },
            { name: `Created at:`, value: `${member.user.createdAt}` },
            { name: `Joined At:`, value: `${member.joinedAt}` },
            { name: `Nickname:`, value: `${member.displayName}` },
            { name: `Roles`, value: `${member.roles.cache.map(r => `${r}`).join('  ')}` }
          )
          .setFooter({ text: `Requested by ${member.displayName}` })
          .setTimestamp()

        message.channel.send({ embeds: [embed] });
      }
    };


  }
}