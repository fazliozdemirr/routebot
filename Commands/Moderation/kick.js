module.exports = {
  name: "kick",
  aliases: ["Kick"],
  description: "Kick a member",
  run(client, message, args) {

    const Discord = require("discord.js");
    const member = message.mentions.members.first();
    if (!member) return message.channel.send({ content: `Wrong command usage!
Command usage: \`-kick @user\`` })
    const kickEmbed = new Discord.MessageEmbed()
      .setDescription(`${member.user.tag} was kicked!`)
      .setColor("#12c4ff");

    const modEmbed = new Discord.MessageEmbed()
      .setDescription(`**Message:** [Message](${message.url})`)
      .setColor("12c4ff")
      .setTimestamp()
      .setFooter({ text: `This message was issued by Administration` })
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: 'png' }));

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("You don't have permission to do that!");

    if (message.guild.id === `${process.env.myServer}`) {
      client.channels.cache.get('959357633733730324').send({
        content: `${process.env.modEmoji} **Mod log:**
> **Content:** ${message.content}
> **Action:** Kick
> **User:** ${member.user.tag}
> **Channel:** ${message.channel}
> **Message id:** ${message.id}
> **Moderator:** ${message.author}`, embeds: [modEmbed, kickEmbed]
      })
    }

    try {
      member.kick().then(() => {
        message.channel.send({ embeds: [kickEmbed] })
      })
    } catch (e) {
      console.log(e)
      message.channel.send("Oops! Something went wrong...")
    }
  }
}