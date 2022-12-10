module.exports = {
  name: "suggest",
  aliases: ["suggestion"],
  async run(client, message, args) {

    const { MessageEmbed } = require("discord.js");

    if (!args[0]) return message.reply({
      embeds: [
        new MessageEmbed()
          .setColor('RED')
          .setTitle(`Wrong command usage`)
          .setDescription(`**Correct usage:** \`-suggest your suggestion...\``)
      ]
    });

    const embed = new MessageEmbed()
      .setColor('BLUE')
      .setTitle(`Nexon Logistics Suggestion System`)
      .setDescription(`${args.join(' ')}`)
      .setFooter({
        text: 'Nexon Logistics',
        iconURL: 'https://media.discordapp.net/attachments/982291652314017864/984375320876576788/Nexon-Logo-1.5.jpg'
      })

    const msg = await message.channel.send({ embeds: [embed] });
    msg.react('⬆️')
    msg.react('⬇️')

  }
}