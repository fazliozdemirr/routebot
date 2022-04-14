module.exports = {
  name: "coinflip",
  aliases: ["Coinflip"],
  description: "Flip a coin",
  run(client, message, args) {
    const { Discord,
      MessageActionRow,
      MessageButton,
      MessageEmbed,
    } = require("discord.js");

    const sides = ['heads', 'tails']

    const side = sides[Math.floor(Math.random() * sides.length)]

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel('Flip!')
          .setStyle('PRIMARY')
          .setCustomId('flip')
      )

    message.channel.send({ content: '**Click the button to flip a coin!**', components: [row] })

    const filter = (interaction) => {
      if (interaction.user.id === message.author.id) return true;
      return interaction.reply({ content: "You cannot use this button!", ephemeral: true })
    };

    const collector = message.channel.createMessageComponentCollector({
      filter,
      max: 1,
    });

    collector.on("end", async (ButtonInteraction) => {
      const id = ButtonInteraction.first().customId;

      if (id === "flip") {
        const embed = new MessageEmbed()
          .setTitle("Coinflip!")
          .setDescription(`You flipped ${side}!`)
          .setFooter({ text: `Requested by: ${message.author.username}` })
          .setColor('#12c4ff')
          .setTimestamp()

        return ButtonInteraction.first().reply({ embeds: [embed] })
      }
     })
  }
}