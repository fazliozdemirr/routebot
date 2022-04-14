const Database = require("@replit/database")
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const db = new Database()
module.exports = {
  name: 'ftb',
  aliases: ["Football"],
  run: async (client, message, args) => {

    let row1 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle(`SECONDARY`)
          .setCustomId(`goal1`)
          .setEmoji(`🥅`)
          .setDisabled(true),
        new MessageButton()
          .setStyle(`SECONDARY`)
          .setCustomId(`goal2`)
          .setEmoji(`🥅`)
          .setDisabled(true),
        new MessageButton()
          .setStyle(`SECONDARY`)
          .setCustomId(`goal3`)
          .setEmoji(`🥅`)
          .setDisabled(true)
      )
    let row2 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle(`SECONDARY`)
          .setCustomId(`keeper1`)
          .setEmoji(`⬛`)
          .setDisabled(true),
        new MessageButton()
          .setStyle(`SECONDARY`)
          .setCustomId(`keeper2`)
          .setEmoji(`🕴️`)
          .setDisabled(true),
        new MessageButton()
          .setStyle(`SECONDARY`)
          .setCustomId(`keeper3`)
          .setEmoji(`⬛`)
          .setDisabled(true)
      )
    let row3 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle(`SECONDARY`)
          .setCustomId(`empty1`)
          .setEmoji(`⬛`)
          .setDisabled(true),
        new MessageButton()
          .setStyle(`SECONDARY`)
          .setCustomId(`empty2`)
          .setEmoji(`⬛`)
          .setDisabled(true),
        new MessageButton()
          .setStyle(`SECONDARY`)
          .setCustomId(`empty3`)
          .setEmoji(`⬛`)
          .setDisabled(true)
      )
    let row4 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle(`SECONDARY`)
          .setCustomId(`soccer1`)
          .setEmoji(`⬛`)
          .setDisabled(true),
        new MessageButton()
          .setStyle(`SECONDARY`)
          .setCustomId(`soccer2`)
          .setEmoji(`⚽`)
          .setDisabled(true),
        new MessageButton()
          .setStyle(`SECONDARY`)
          .setCustomId(`soccer3`)
          .setEmoji(`⬛`)
          .setDisabled(true)
      )
    let row5 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle(`PRIMARY`)
          .setCustomId(`hit1`)
          .setLabel(`Kick!`),
        new MessageButton()
          .setStyle(`PRIMARY`)
          .setCustomId(`hit2`)
          .setLabel(`Kick!`),
        new MessageButton()
          .setStyle(`PRIMARY`)
          .setCustomId(`hit3`)
          .setLabel(`Kick!`)
      )
    let time = [650, 1000, 1500, 2000, 2500]
    let randomTime = `${time[Math.floor(Math.random() * time.length)]}`
    let score = 0
    let embed = new MessageEmbed()
      .setTitle(`Football`)
      .setDescription(`Hit the ball!\nScore: ${score}`)
      .setColor(`#12c4ff`)
    const msg = await message.channel.send({
      embeds: [embed],
      components: [row1, row2, row3, row4, row5]
    });
    let randomized = 1
    function update() {
      randomized = Math.floor(Math.random() * 3);
      row2.components.forEach(button => {
        button.setEmoji(`⬛`)
      })
      row2.components[randomized].setEmoji(`🕴️`)
      let embed = new MessageEmbed()
        .setTitle(`Football`)
        .setDescription(`Hit the ball!\nScore: ${score}`)
        .setColor(`#12c4ff`)
      msg.edit({
        embeds: [embed],
        components: [row1, row2, row3, row4, row5],
      });
    }
    let interval = setInterval(() => {
      return update();
    }, randomTime);

    const filter = i => {
      if (i.user.id === message.author.id) return true
      return interaction.reply({ content: `This is not your game!` })
    };
    let ended = false
    const collector = await msg.createMessageComponentCollector({ filter: filter, componentType: 'BUTTON', time: 15000 })
    collector.on(`collect`, (i) => {
      collector.resetTimer()
      if (Number(i.customId.slice(3)) - 1 !== randomized) {
        score++
        let embed = new MessageEmbed()
          .setTitle(`Football`)
          .setDescription(`Hit the ball!\nScore: ${score}`)
          .setColor(`#12c4ff`)
        i.update({ embeds: [embed] });

        if (score > 3) {
          console.log(score)
        }
        if (score > 13) {
          console.log(`someone got ${score} points`)
        }

      } else {
        clearInterval(interval)
        let rows = [row1, row2, row3, row4, row5]
        rows.forEach(row => {
          row.components.forEach(button => {
            button.setDisabled(true)
            if (button.customId === i.customId) button.setStyle(`DANGER`)
          })
        })
        let embed = new MessageEmbed()
          .setTitle(`Football`)
          .setDescription(`You lost!\nScore: ${score}`)
          .setColor(`#12c4ff`)
        i.update({ embeds: [embed], components: [row1, row2, row3, row4, row5] });
        ended = true
        collector.stop()
      }
    })
    collector.on(`end`, () => {
      if (ended) return
      clearInterval(interval)
      let embed = new MessageEmbed()
        .setTitle(`Football`)
        .setDescription(`You took to long to hit!\nScore: ${score}`)
        .setColor(`#12c4ff`)
      let rows = [row1, row2, row3, row4, row5]
      rows.forEach(row => {
        row.components.forEach(button => {
          button.setDisabled(true)
        })
      })
      msg.edit({ embeds: [embed], components: [row1, row2, row3, row4, row5] })
    })

  },
};