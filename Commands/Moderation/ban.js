module.exports = {
  name: "ban",
  aliases: ["Ban"],
  description: "Ban a member",
  run(client, message, args) {

    const Discord = require("discord.js");
    const member = message.mentions.members.first();
    const modEmoji = "<:mod:944912016068468737>";

    if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("You don't have permissions to do that!");

        if (!message.member.roles.cache.has("Administrator")) return message.channel.send("You can't ban Server Admin!");

            if (!message.member.roles.cache.has("Head Moderator")) return message.channel.send("You can't ban Server Admin!");
    
    if (!member) return message.channel.send(`Wrong command usage!
Command usage: \`-ban @user\``);

    const modEmbed = new Discord.MessageEmbed()
      .setDescription(`**Message:** [Message](${message.url})`)
      .setColor("12c4ff")
      .setTimestamp()
      .setFooter({ text: `This message was issued by Administration` })
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: 'png' }));

    const banChanelEmbed = new Discord.MessageEmbed()
      .setDescription(`${member.user.tag} was banned!`)
      .setColor("#12c4ff")
      .setTimestamp()
      .setFooter({ text: `This message was issued by Administration` });

    const banMemberEmbed = new Discord.MessageEmbed()
      .setDescription(`You were banned in ConquerX!`)
      .setColor("#12c4ff");

    if (message.guild = `${process.env.myServer}`) {
      client.channels.cache.get('959357633733730324').send({
        content: `${modEmoji} **Mod log:**
> **Content:** ${message.content}
> **Action:** Ban
> **User:** ${member.user.tag}
> **Channel:** ${message.channel}
> **Message id:** ${message.id}
> **Moderator:** ${message.author}`, embeds: [modEmbed, banChanelEmbed]
      })
    }

    try {
      member.ban()
      message.channel.send({ embeds: [banChanelEmbed] });
      member.send({ embeds: [banMemberEmbed] });
    } catch (e) {
      console.log(e)
      message.channel.send("Oops! Something went wrong!")
    };

  }
}