const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const { MessageActionRow, MessageButton } = require('discord.js');

function getText(spam1, spam2) {
  let [barRed, barGreen] = ["[0;31m|[0m", "[0;32m|[0m"]
  let [number1, number2] = [`[[0;31m${spam1}[0m] `, `[[0;31m${spam2}[0m] `]
  if (spam1 >= 10) number1 = `[[0;33m${spam1}[0m]`
  if (spam2 >= 10) number2 = `[[0;33m${spam2}[0m]`
  if (spam1 >= 20) number1 = `[[0;32m${spam1}[0m]`
  if (spam2 >= 20) number2 = `[[0;32m${spam2}[0m]`
  let [bar1, bar2] = [[], []]
  for (let i = 0; i < 20; i++) {
    if (spam1 > i) bar1.push(barGreen)
    else bar1.push(barRed)
    if (spam2 > i) bar2.push(barGreen)
    else bar2.push(barRed)
  }
  let [toReturn1, toReturn2] = [`${number1} ${bar1.join(``)}`, `${number2} ${bar2.join(``)}`]
  return {
    bar1: toReturn1,
    bar2: toReturn2
  }
}

module.exports = {
  name: "spam",
  aliases: ["Spam"],
  run: async (client, message, args) => {

    const opponent = message.mentions.users.first();
    if (!opponent) return message.channel.send(`Please mention who you want to play with.`);

    let [spam1, spam2] = [0, 0]

    const button = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel(`${message.author.username}`)
          .setStyle('PRIMARY')
          .setCustomId('button1')
          .setEmoji("🖱️"),
        new MessageButton()
          .setLabel(`${opponent.username}`)
          .setStyle('PRIMARY')
          .setCustomId('button2')
          .setEmoji("🖱️")
      )
    let { bar1, bar2 } = getText(spam1, spam2)
    let embed = new Discord.MessageEmbed()
      .setDescription("Spam as fast as you can on your button!")
      .addFields(
        { name: `${message.author.username}`, value: `\`\`\`ansi\n${bar1}\`\`\`` },
        { name: `${opponent.username}`, value: `\`\`\`ansi\n${bar2}\`\`\`` }
      )
      .setColor("YELLOW")
    message.channel.send({ embeds: [embed], components: [button] }).then(msg => {
      const collector = msg.createMessageComponentCollector({ time: 30000 })
      let win = false
      collector.on('collect', async i => {
        if (i.customId === 'button1') spam1++
        if (i.customId === 'button2') spam2++

        let { bar1, bar2 } = getText(spam1, spam2)
        let embed = new Discord.MessageEmbed()
          .setDescription("Spam as fast as you can on your button!")
          .addFields(
            { name: `${message.author.username}`, value: `\`\`\`ansi\n${bar1}\`\`\`` },
            { name: `${opponent.username}`, value: `\`\`\`ansi\n${bar2}\`\`\`` }
          )
          .setColor(`YELLOW`)
        if (spam1 >= 20) {
          i.update({ embeds: [embed] })
          message.channel.send(`${message.author.username} won!`)
          win = true
          collector.stop()
        }
        if (spam2 >= 20) {
          i.update({ embeds: [embed] })
          message.channel.send(`${opponent.username} won!`)
          win = true
          collector.stop()
        }
        if (!win) i.update({ embeds: [embed] })
      })
      collector.on('end', async () => {
        button.components.forEach(item => {
          item.setDisabled(true)
        })
        if (!win) {

          if (spam1 > spam2) message.channel.send(`${message.author.username} got a higher amount and won!`)
          else if (spam2 > spam1) message.channel.send(`${opponent.username} got a higher amount and won!`)
          else message.channel.send(`It's a tie!`)
        }

        let { bar1, bar2 } = getText(spam1, spam2)
        let embed = new Discord.MessageEmbed()
          .setDescription("Spam as fast as you can on your button!")
          .addFields(
            { name: `${message.author.username}`, value: `\`\`\`ansi\n${bar1}\`\`\`` },
            { name: `${opponent.username}`, value: `\`\`\`ansi\n${bar2}\`\`\`` }
          )
          .setColor(`YELLOW`)
        msg.edit({ embeds: [embed], components: [button] })
      })
    })
  }
}