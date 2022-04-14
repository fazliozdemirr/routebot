module.exports = {
  name: "claim-nitro",
  aliases: ["claimnitro", "ClaimNitro", "Claim-nitro", "Claim-Nitro"],
  description: "Claim your free Nitro today!!",
  run(client, message, args) {
const { MessageActionRow, MessageButton } = require('discord.js');

  const btnRow = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel('Claim Nitro!')
      .setStyle('PRIMARY')
      .setCustomId('nitro')
  )

  message.channel.send({ content: 'Click the button to claim your Nitro!', components: [btnRow] }).then(msg => {
    const collecter = msg.createMessageComponentCollector({ time: 15000 })

    collecter.on('collect', async i => {
      if (i.customId === 'nitro') {
        i.update({ content: 'https://c.tenor.com/x8v1oNUOmg4AAAAM/rickroll-roll.gif', components: [] })
      }
    })

    collecter.on('collect', async collected => {
      return;
    })
  })
  }
}