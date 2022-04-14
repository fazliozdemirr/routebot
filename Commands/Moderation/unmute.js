module.exports = {
  name: "unmute",
  aliases: ["Unmute", "Un-mute", "un-mute"],
  description: "Unmute a muted member",
  run(client, message, args) {
    {
      const { MessageEmbed } = require("discord.js");
      const role = message.guild.roles.cache.find(role => role.name === "muted");
      const member = message.mentions.members.first();
      const msg = args.join(" ")
      const msgSplit = msg.split(' - ');
      const reason = msgSplit[1] || 'Not specified';

      const notRole = new MessageEmbed()
        .setDescription("This server doesn't have a mute role!")
        .setColor("12c4ff");

      /*const notMember = new MessageEmbed()
          .setDescription("You didn't mention a member!")
          .setColor("12c4ff");*/

      const notMute = new MessageEmbed()
        .setDescription(`"That user is not muted!"`)
        .setColor("12c4ff");

      const embed = new MessageEmbed()
        .setDescription(`${member} was unmuted!
**Reason:** ${reason}`)
        .setColor("12c4ff");

      const modEmbed = new MessageEmbed()
        .setDescription(`**Message:** [Message](${message.url})`)
        .setColor("12c4ff")
        .setTimestamp()
        .setFooter({ text: `This message was issued by Administration` })
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: 'png' }));

      if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("You don't have permission to do that!");
      if (!role) return message.channel.send({ embeds: [notRole] });
      if (!member) return message.channel.send(`Wrong command usage!
Command usage: \`-mute @user - reason(optional)\``);
      if (!member.roles.cache.has(role.id)) return message.channel.send({ embeds: [notMute] });

      member.roles.remove(role)
        .then(() => {
          message.channel.send({ embeds: [embed] }),

            client.channels.cache.get('959357633733730324').send({
              content: `${process.env.modEmoji} **Mod log:**
> **Content:** ${message.content}
> **Action:** Unmute
> **Channel:** ${message.channel}
> **Message id:** ${message.id}
> **Moderator:** ${message.author}`, embeds: [modEmbed, embed]
            })
        })
        .catch(() => {
          message.channel.send("Oops! something went wrong...")
        })
    };
  }
}