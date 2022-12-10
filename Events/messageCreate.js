module.exports = {
  name: `messageCreate`,
  async run(message, { client, Discord, args }) {

    const TicketTranscript = require('../Database/ticketTranscript');
    const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');

    //Commands execute
    let prefix = '-';
    if (message.content.startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(/ +/g)
      const cmd = args.shift()
      const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

      //If a command not exists
      if (!command) return message.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(`That command doesn't exist!`)
            .setTitle(`Error`)
            .setColor('RED')
        ]
      });
      //If a command not exists

      command.run(client, message, args)//Run the command
    }
    //Commands execute

    //Suggestions
    if (message.channel.id === '1012108681950810212') {
      if (message.author.bot) return;
      const embed = new MessageEmbed()
        .setColor('BLUE')
        .setAuthor({
          name: message.author.tag,
          iconURL: message.author.displayAvatarURL()
        })
        .setTitle(`Nexon Logistics Suggestion System`)
        .setDescription(`${message.content}`)
        .setFooter({
          text: 'Nexon Logistics',
          iconURL: 'https://media.discordapp.net/attachments/982291652314017864/984375320876576788/Nexon-Logo-1.5.jpg'
        });

      message.delete()
      return message.channel.send({ embeds: [embed] }).then(msg => {
        msg.react('⬆️')
        msg.react('⬇️')
      });
    };
    //Suggestions

    //Ticket transcript
    if (message.channel.name.startsWith('ticket')) {

      TicketTranscript.findOne({
        channelId: message.channel.id
      }, async (err, data) => {
        if (err) throw err;
        if (data) {

          const content = `${message.author.username}: ${message.content}`

          TicketTranscript.findOneAndUpdate({
            channelId: message.channel.id
          }, {
              $addToSet: {
                content: content
              }
            }, async (err, data) => {
              if (err) throw err;
            });

        } else {
          return;
        }
      });

    };
    //Ticket transcript

  }
}