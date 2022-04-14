module.exports = {
  name: "ticket",
  description: "Create a ticket",
  async run(client, message, args) {
    const Discord = require("discord.js");
    const myServer = "940572040166006784";

    const notMyServerEmbed = new Discord.MessageEmbed()
      .setTitle("Limited Feature")
      .setURL("https://dsc.gg/conquerx")
      .setDescription(`This feature is only limited to ConquerX official Server.
Join our Official Server here: [ConquerX](https://dsc.gg/conquerx)`)
      .setColor("#12c4ff");

    //If the server is ConquerX
    if (message.guild.id === myServer) {

      const modEmbed = new Discord.MessageEmbed()
        .setDescription(`**Message:** [Message](${message.url})`)
        .setColor("12c4ff")
        .setTimestamp()
        .setFooter({ text: `This message was issued by Administration` })
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: 'png' }));

      const buttons = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setLabel('Close')
            .setStyle('PRIMARY')
            .setCustomId('close')
            .setEmoji("🔒")
        )
        .addComponents(
          new Discord.MessageButton()
            .setLabel('Delete')
            .setStyle('PRIMARY')
            .setCustomId('delete')
            .setEmoji("⛔")
        );

      const embed = new Discord.MessageEmbed()
        .setTitle(`Welcome ${message.author.username}`)
        .setURL("https://youtube.com/c/ShadowCoDM")
        .setColor("#12c4ff")
        .setDescription(`<:Mod:944912016068468737> Staff will be with you soon, please be patient.`)
        .addField("Please mention the reason for creating the ticket to proceed:", `<:arrow:945106390781948044> Clan application
<:arrow:945106390781948044> Event winner prize claim
<:arrow:945106390781948044> Giveaway winner prize claim
<:arrow:945106390781948044> User report
<:arrow:945106390781948044> Staff application
<:arrow:945106390781948044> Others`)
        .setFooter({ text: `Note: Creating a ticket without any reason may lead to a mute/kick.` })
        .setTimestamp();

      const author = message.author.id;
      const guild = client.guilds.cache.get('940572040166006784')
      const modrole = guild.roles.cache.get('940616358666854410');
      const everyone = guild.roles.cache.get(guild.roles.everyone.id);
      const bot = guild.roles.cache.get('941297320149016601');
      const channel = await guild.channels.create(`ticket-${message.author.username}`, { type: 'text', reason: `Modmail created ticket.` });
      channel.setParent('944243724328775710');
      channel.setTopic(`Ticket for ${message.author.username}`)

      channel.permissionOverwrites.create(modrole, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        READ_MESSAGE_HISTORY: true
      });
      channel.permissionOverwrites.create(author, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        READ_MESSAGE_HISTORY: true
      });
      channel.permissionOverwrites.create(everyone, {
        VIEW_CHANNEL: false
      });
      channel.permissionOverwrites.create(bot, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        READ_MESSAGE_HISTORY: true,
        MANAGE_MESSAGES: true
      })

      message.channel.send(`Your ticket has been created in <#${channel.id}>`);

      client.channels.cache.get(channel.id).send({ embeds: [embed], components: [buttons] });

      client.channels.cache.get('959357633733730324').send({
        content: `${process.env.modEmoji} **Mod log:**
> **Content:** ${message.content}
> **Member:** ${message.author}
> **Member tag:** ${message.author.user.tag}
> **Action:** Ticket create
> **Ticket:** ${channel}
> **Channel:** ${message.channel}
`, embeds: [modEmbed]
      });
    }
    //If the server is ConquerX

    //If the server is not ConquerX
    else return message.channel.send({ embeds: [notMyServerEmbed] })
    //If the server is not ConquerX   

  }
}