module.exports = {
  name: "suggest",
  aliases: ["Suggest", "suggestion", "Suggestion"],
  description: "Suggest new video ideas!",
  run(client, message, args) {
    const Discord = require("discord.js");
    const arg = message.content.split(" ").slice(1);

    if (!arg[0]) return message.channel.send(`Wrong comamnd usage!
Commands usage: \`-suggest Suggestion...\``)

    const embed = new Discord.MessageEmbed()
      .setTitle('Suggestion!')
      .setURL("https://youtube.com/c/ShadowCoDM")
      .setColor('#12c4ff')
      .setDescription(`${args.join(" ")}
Sugegsted by <@${message.author.id}>
Do check Shadow on [YouTube](https://youtube.com/c/ShadowCoDM)`)
      .setTimestamp()

    client.channels.cache.get('949578973497675806').send({ embeds: [embed] }).then(msg => {
      msg.react("⬆️")
      msg.react("⬇️")
    })

    message.delete()
  }
}