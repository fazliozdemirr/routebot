module.exports = {
  name: "slowmode",
  aliases: ["Slowmode", "slow"],
  description: "Put slowmode to a channel",
  run(client, message, args) {
    if (message.member.permissions.has("KICK_MEMBERS")) {
      const Discord = require("discord.js");

      const sentence = message.content.split(" ");
      sentence.shift();

      const embed = new Discord.MessageEmbed()
        .setDescription(`This chat now has a slowmode of ${sentence} seconds!`)
        .setColor("12c4ff")

      const modEmbed = new Discord.MessageEmbed()
        .setDescription(`**Message:** [Message](${message.url})`)
        .setColor("12c4ff")
        .setTimestamp()
        .setFooter({ text: `This message was issued by Administration` })
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: 'png' }));

      if (!sentence) return message.channel.send(`Wrong command usage!
Command usage: \`-slowmode time(in seconds)\``)

      message.channel.setRateLimitPerUser(`${sentence}`)

      message.channel.send({ embeds: [embed] })

      client.channels.cache.get('959357633733730324').send({
        content: `${process.env.modEmoji} **Mod log:**
> **Content:** ${message.content}
> **Action:** Slowmode
> **Slowmode:** ${message.author} set a slowmode of ${sentence} seconds to ${message.channel}
> **Channel:** ${message.channel}
> **Message id:** ${message.id}
> **Moderator:** ${message.author}`, embeds: [modEmbed, embed]
      })
    } else {
      message.channel.send("You don't have permission to do that!")
    }
  }
}