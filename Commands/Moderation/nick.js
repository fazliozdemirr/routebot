module.exports = {
  name: "nick",
  aliases: ["rename", "Nick", "Rename", "nickname", "Nickname"],
  description: "Change the nickname of a member",
  run(client, message, args) {
const Discord = require("discord.js")
    
    if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("You don't have permission to do that!")

    const user = message.mentions.members.first();
    const nickname = args[1];

    const modEmbed = new Discord.MessageEmbed()
      .setDescription(`**Message:** [Message](${message.url})`)
      .setColor("12c4ff")
      .setTimestamp()
      .setFooter({ text: `This message was issued by Administration` })
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: 'png' }));

    if (!user) return message.channel.send(`Wrong command usage!
Command usage: \`-nick @user nickname\``)

    if (!nickname) return message.channel.send(`Please specify a nickname`)
    user.setNickname(`${nickname}`).then(() => {
      message.channel.send(`Success`)

      client.channels.cache.get('959357633733730324').send({
        content: `${process.env.modEmoji} **Mod log:**
> **Content:** ${message.content}
> **Action:** Rename
> **Rename:** ${nickname}
> **Channel:** ${message.channel}
> **Message id:** ${message.id}
> **Moderator:** ${message.author}`, embeds: [modEmbed]
      })

    })
  }
}