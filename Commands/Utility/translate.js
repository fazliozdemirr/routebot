module.exports = {
  name: "translate",
  aliases: ["Transltae"],
  description: "Translate anything",
  run(client, message, args) {
    const Discord = require('discord.js');
    const translate = require('@iamtraction/google-translate')

    const txt = message.content.split(" ").slice(2).join(" ")
    const lang = args[0]
    if (!lang) return message.channel.send(`Wrong comamnd usage!
Commands usage: \`-translate ISO-Code Text...\`
E.g.: \`-translate en Hello\``)
    if (!txt) return message.channel.send(`Wrong comamnd usage!
Commands usage: \`-translate ISO-Code Text...\``)
    translate(txt, { to: lang }).then(res => {
      const tlate = new Discord.MessageEmbed()
        .setDescription(res.text)
        .setColor("#34eb3a")
      message.channel.send({ embeds: [tlate] })
    }).catch(err => {
      message.channel.send("Provide a valid ISO code!")
    })
  }
}