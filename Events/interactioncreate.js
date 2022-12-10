module.exports = {
  name: `interactionCreate`,
  async run(i, { client, Discord }) {
    //Variables
    const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
    const Database = require('@replit/database');
    const db = new Database();
    const TicketTranscript = require('../Database/ticketTranscript');
    const fs = require('fs');
    //Variables

    //Ticket system
    if (
      i.customId === 'mTicket' ||
      i.customId === 'eTicket' ||
      i.customId === 'sTicket' ||
      i.customId === 'hTicket'
    ) {

      const bot = i.guild.me.roles.botRole;

      const btns = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('Close')
            .setStyle('DANGER')
            .setEmoji('🔒')
            .setCustomId('ticketDelete'),
          /*
          new MessageButton()
            .setLabel('Transcript')
            .setStyle('PRIMARY')
            .setEmoji('📄')
            .setCustomId('ticketTranscript'),
            */
        );

      const channel = await i.guild.channels.create(
        `ticket-${i.user.username}`,
        {
          type: 'GUILD_TEXT'
        }
      );

      {
        const doc = new TicketTranscript({
          userId: i.user.id,
          guildId: i.guild.id,
          channelId: channel.id
        });
        await doc.save();
      }

      i.reply({
        content: `Your ticket has been created in ${channel}`,
        ephemeral: true
      });

      channel.permissionOverwrites.create(i.guild.id, {
        VIEW_CHANNEL: false
      });

      channel.permissionOverwrites.create(bot, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        MANAGE_CHANNELS: true
      });
      channel.permissionOverwrites.create(i.user.id, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true
      });

      if (i.customId === 'mTicket') {
        channel.setParent('1012102327261470821');

        const role = i.guild.roles.cache.get('981593706236878859');
        channel.permissionOverwrites.create(role, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          MODERATE_MEMBERS: true,
          MANAGE_CHANNELS: true
        })
      }

      else if (i.customId === 'hTicket') {
        channel.setParent('1012100995750314014');

        const role = i.guild.roles.cache.get('981631078387306568');
        channel.permissionOverwrites.create(role, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          MODERATE_MEMBERS: true,
          MANAGE_CHANNELS: true
        })
      }

      else if (i.customId === 'sTicket') {
        channel.setParent('1038823557330915389');

        const role = i.guild.roles.cache.get('984535169950187540');
        channel.permissionOverwrites.create(role, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          MODERATE_MEMBERS: true,
          MANAGE_CHANNELS: true
        })
      }

      else if (i.customId === 'eTicket') {
        channel.setParent('1012096273467310233');

        const role = i.guild.roles.cache.get('983284896200007702');
        channel.permissionOverwrites.create(role, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          MODERATE_MEMBERS: true,
          MANAGE_CHANNELS: true
        })
      }

      let type = '';
      let ping = '';
      if (i.customId === 'mTicket') type = 'Management', ping = '<@&981593706236878859>';
      if (i.customId === 'hTicket') type = 'Human Resource Team', ping = '<@&981631078387306568>';
      if (i.customId === 'sTicket') type = 'Staff', ping = '<@&981494654115659796>';
      if (i.customId === 'eTicket') type = 'Event Team', ping = '<@&983284896200007702>';

      channel.send({
        content: ping,
        embeds: [
          new MessageEmbed()
            .setColor('#12c4ff')
            .setTitle(`Welcome ${i.member.displayName}`)
            .setDescription(`Your ticket has been created with ${type}, they will be with you shortly.`)
        ],
        components: [btns]
      });
    };

    /*
    if (i.customId === 'ticketClose') {

      if (!i.member.permissions.has('MODERATE_MEMBERS')) i.reply({
        embeds: [
          new MessageEmbed()
            .setColor('RED')
            .setDescription(`You don't have permission to close tickets!`)
        ],
        ephemeral: true
      });

      i.channel.permissionOverwrites.create(user, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: false
      });

      i.reply({
        embeds: [
          new MessageEmbed()
            .setColor('#12c4ff')
            .setDescription(`Ticket closed by ${i.member.displayName}`)
        ]
      });
    };
    */

    if (i.customId === 'ticketDelete') {

      if (!i.member.permissions.has('MODERATE_MEMBERS')) i.reply({
        embeds: [
          new MessageEmbed()
            .setColor('RED')
            .setDescription(`You don't have permission to delete tickets!`)
        ],
        ephemeral: true
      });

      TicketTranscript.findOne({
        channelId: i.channel.id
      }, async (err, data) => {
        if (err) throw err;
        if (data) {
          const user = i.guild.members.cache.find(u => u.id === data.userId);
          fs.writeFileSync(`../${user.displayName}.txt`, data.content.join('\n\n'))
          const transcript = new MessageAttachment(fs.createReadStream(`../${user.displayName}.txt`))

          client.channels.cache
            .get('1012115646148001822')
            .send({
              files: [transcript]
            })

          TicketTranscript.findOneAndDelete({
            channelId: i.channel.id
          })

        };

      });


      i.reply({
        embeds: [
          new MessageEmbed()
            .setColor('#12c4ff')
            .setDescription('This ticket will be deleted shortly.')
        ]
      });

      setTimeout(() => {
        i.channel.delete();
      }, 5000);

    };

    /*
    if (i.customId === 'ticketTranscript') {

      TicketTranscript.findOne({
        channelId: i.channel.id
      }, async (err, data) => {
        if (err) throw err;
        if (data) {
          fs.writeFileSync(`../${i.channel.id}.txt`, data.content.join('\n'))
          const transcript = new MessageAttachment(fs.createReadStream(`../${i.channel.id}.txt`))

          i.channel.send({
            files: [transcript]
          })
        };

      });

    };
    */
    //Ticket system

  }
}