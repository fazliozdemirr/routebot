module.exports = {
  name: "rules",
  aliases: ["Rules", "r"],
  description: "Server Rules",
  run(client, message, args) {
    if (!message.member.roles.cache.has
      ("940614698599084062")) return;

    const r = `<a:horn:943784100781768754>`
    const a = `<a:arrows:962691668920905749>`;

    const Discord = require("discord.js")

    const embed = new Discord.MessageEmbed()
      .setTitle(`${r} Server Rules:`)
      .setDescription(`
${a} Always use common language and respect everyone while interacting with users.

${a} Always use the correct channel  for your message content.

${a} Spamming in channels may lead to a Mute/Ban.

${a} Excessive loud sounds In Voice Channels is not allowed (Earraping) and may result in a Server Mute/Ban.

${a} No NSFW/L content is allowed in Server.

${a} No swearing, super offensive language, harassment, bullying, hate speech, etc. 

${a} No promoting or advertising.

${a} No drama or excessive arguments. Report any situation which requires Moderators attention.

${a} <@&940615716040736858>, <@&940616358666854410> reserve the right to take action on any content considered inappropriate.<@&940615358681862225> and <@&940614698599084062> decision is the final decision in any case.

${a} This server is semi-family friendly. Nothing will be explicit. <#940572040166006787> is allowed to get a little more “real world.”

${a} No links are allowed without permission.

${a} Begging for Roles/CP/Any kind of in-game currencies is prohibited.

${a} For any Queries/Help and Support, Create a ticket in <#962136466283167794>[.](https://media.discordapp.net/attachments/943047940371546182/962719759445688340/giga-chad.gif)`)
      .setColor("#12c4ff")
      .setFooter({ text: `ConquerX`, iconURL: message.guild.iconURL() })

    message.channel.send({ embeds: [embed] })
    message.delete()

  }
}