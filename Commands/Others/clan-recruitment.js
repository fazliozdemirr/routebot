module.exports = {
  name: "clan-recruitment",
  aliases: ["Clan-Recruitment"],
  description: "Clan Recruitment page",
  run(client, message, args) {
    const Discord = require("discord.js")
    if (!message.member.roles.cache.has
      ("947136682879238154", "947137098178244648")) return message.channel.send("You don't have permission to do that!")
    /*  const commands = client.commands.map(command => command.name).join(", ")*/
    const embed = new Discord.MessageEmbed()
      .addField("🏛️ Clan:", "> Name: ConquerX")
      .addField("<:crownn:944901749867692034> Leader information:", `
> Discord: <@893705256368750592>
> IGN: CrXShadowOP
> Youtube: https://youtube.com/ShadowCoDM`)
      .addField("📄 About:", `> This is an Indian Clan founded by <@893705256368750592> back in 2021, Mainly focused on being competitive. Join us and play with everyone and improve your gameplay together. There is also a General Category for those who want to chat, relax and have fun and play other games together like Among Us, Minecraft and more. Feel free to join`)
      .addField("🔍 Looking For:", "> Casual and Competitive Players")
      .addField("📢 Requirements and Rules:", `
> You have to put the clan tag "CrX" before your IGN without any spaces,symbols or numbers.

> Your IGN must not contain any Inappropriate Words, Caps or any Existing Name.

> No toxicity allowed.

> You should be active daily and be loyal.

> You must have a K/D of 1.3+ with minimum 3 times Legendary. (For MP Players)

> You must have an average damage of 600+ with minimum 3 times Legendary. (For BR Players).

> Minimum age requirement: 13+ years`)

      .setColor("#12c4ff")
    message.channel.send({ embeds: [embed] })
  }
}