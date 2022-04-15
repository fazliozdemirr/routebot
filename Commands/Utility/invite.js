module.exports = {
  name: "invite",
  aliases: ["botinvite", "bot-invite"],
  description: "Invite me to your server",
  run(client, message, args) {

    const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

    const inviteEmbed = new MessageEmbed()
      .setTitle("Invite me to your server")
      .setURL("https://youtube.com/c/ShadowCoDM")
      .setDescription(`I'm a functional bot with \`moderation, utility and fun commands\` with custom \`ticket system\`, \`welcomer\` and \`giveaway system\`. Invite me to your server and type \`-help/ping me\` for more information.`)
      .setColor("#12c4ff")
      .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL());

    const buttons = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel('Main Server')
          .setStyle('LINK')
          .setURL('https://dsc.gg/conquerx')
      )
      .addComponents(
        new MessageButton()
          .setLabel('Invite Me')
          .setStyle('LINK')
          .setURL('https://dsc.gg/crxbot')
      );

    message.channel.send({ embeds: [inviteEmbed], components: [buttons] })

  }
}