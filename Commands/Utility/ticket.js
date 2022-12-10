module.exports = {
  name: "ticket",
  aliases: ["Ticket"],
  run(client, message, args) {

    const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
    const command = args.shift();

    if (!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply({
      embeds: [
        new MessageEmbed()
          .setColor('RED')
          .setDescription(`You don't have permission to do that!`)
      ]
    })

    const management = new MessageEmbed()
      .setTitle('Management Ticket')
      .setDescription(`Clicking this button will open a ticket with the Management Team! You can use this ticket to contact us for any issues or questions that do not fit in the below categories.`)
      .setColor('ORANGE');

    const human = new MessageEmbed()
      .setTitle('Human Resources Ticket')
      .setDescription(`Clicking this button will open a ticket with the Human Resources Team! You can use this ticket to contact us for any HR related issues including reporting drivers, application enquires and HR related questions.`)
      .setColor('ORANGE');

    const event = new MessageEmbed()
      .setTitle('Event Management Ticket')
      .setDescription(`Clicking this button will open a ticket with the VTC Event Team! You can use this ticket to contact us for event invitations, slot enquiries, general questions and feedback. 
      
      Before opening a ticket make sure your event is no more than **3 months** from now .`)
      .setColor('ORANGE');

    const support = new MessageEmbed()
      .setTitle('Support Ticket')
      .setDescription(`Clicking this button will open a ticket with the Staff Team! You can use this ticket to contact us for any support related issues.`)
      .setColor('ORANGE');

    if (!['management', 'human', 'event', 'support'].includes(command)) return message.reply({
      embeds: [
        new MessageEmbed()
          .setColor('RED')
          .setDescription('Please use a valid sub command i.e. `management`, `human`, `event`, `support`')
      ]
    });

    const managementBtn = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle('PRIMARY')
          .setLabel('Management Ticket')
          .setCustomId('mTicket')
      );

    const humanBtn = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle('PRIMARY')
          .setLabel('Human Resouces Ticket')
          .setCustomId('hTicket')
      );

    const eventBtn = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle('PRIMARY')
          .setLabel('Event Management Ticket')
          .setCustomId('eTicket')
      );

    const supportBtn = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle('PRIMARY')
          .setLabel('Support Ticket')
          .setCustomId('sTicket')
      );

    if (command === 'management') {
      message.channel.send({
        embeds: [management],
        components: [managementBtn]
      })
    };

    if (command === 'human') {
      message.channel.send({
        embeds: [human],
        components: [humanBtn]
      })
    };

    if (command === 'event') {
      message.channel.send({
        embeds: [event],
        components: [eventBtn]
      })
    };

    if (command === 'support') {
      message.channel.send({
        embeds: [support],
        components: [supportBtn]
      })
    };

  }
}