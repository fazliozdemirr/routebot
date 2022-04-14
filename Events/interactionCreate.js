module.exports = {
  name: `interactionCreate`,
  async run(i, { client, Discord }) {
    const Database = require('@replit/database')
    const db = new Database()
    const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

    //-----------Ticket System------------
    if (i.guild.id === `940572040166006784`) {
      //Close and Delete buttons
      const buttons = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('Close')
            .setStyle('PRIMARY')
            .setCustomId('close')
            .setEmoji("🔒")
        )
        .addComponents(
          new MessageButton()
            .setLabel('Delete')
            .setStyle('DANGER')
            .setCustomId('delete')
            .setEmoji("⛔")
        )
        .addComponents(
          new MessageButton()
            .setLabel('Settings')
            .setStyle('SUCCESS')
            .setCustomId('settings')
            .setEmoji("⚙️")
        );

      const addons = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('Add')
            .setStyle('PRIMARY')
            .setCustomId('add')
            .setEmoji("<:plus:963616725746712576>")
        )
        .addComponents(
          new MessageButton()
            .setLabel('Remove')
            .setStyle('DANGER')
            .setCustomId('remove')
            .setEmoji("<:minus:963613043676303400>")
        )
        .addComponents(
          new MessageButton()
            .setLabel('Open')
            .setStyle('SUCCESS')
            .setCustomId('openticket')
            .setEmoji("🔓")
        );
      //Close and Delete buttons

      //User, Emoji, Embeds and Roles
      const clicker = i.user.username;
      const arrow = `<a:arrows:962691668920905749>`;

      const supportEmbed = new MessageEmbed()
        .setTitle(`Welcome ${clicker}`)
        .setURL("https://youtube.com/c/ShadowCoDM")
        .setColor("#12c4ff")
        .setDescription(`<:Mod:944912016068468737> Staff will be with you soon, please be patient.`)
        .addField("Please mention the reason for creating the ticket to proceed:", `
${arrow} Clan application
${arrow} Event winner prize claim
${arrow} Giveaway winner prize claim
${arrow} User report
${arrow} Staff application
${arrow} Others`)
        .setFooter({ text: `Note: Creating a ticket without any reason may lead to a mute/kick!` });

      const settingsEmbed = new MessageEmbed()
        .setColor("#12c4ff")
        .setTitle('Ticket settings configuration')
        .setURL("https://youtube.com/c/ShadowCoDM")
        .setDescription(`Configure the ticket settings:

<:plus:963616725746712576> : Add a member to ticket.
<:minus:963613043676303400> : Remove a meber from ticket.
🔓 : Open the ticket`);

      const closingEmbed = new MessageEmbed()
        .setColor("#12c4ff")
        .setDescription(`Ticket closed`);

      const openingEmbed = new MessageEmbed()
        .setColor("#12c4ff")
        .setDescription(`Ticket opened`);

      const noPerms = new MessageEmbed()
        .setColor("#12c4ff")
        .setDescription(`You don't have permission to do that!`);

      const deleteEmbed = new MessageEmbed()
        .setColor("#12c4ff")
        .setDescription(`This ticket will be deleted shortly`);

      const guild = client.guilds.cache.get('940572040166006784');
      const modrole = i.guild.roles.cache.get('940615716040736858');
      const everyone = i.guild.roles.everyone;
      const bot = i.guild.roles.cache.get('941297320149016601');
      //User, Emoji, Embeds and Roles

      //Ticket creation
      if (i.customId === 'open') {
        if (!i.isButton()) return;

        const channel = await i.guild.channels.create(`ticket-${clicker}`, { type: 'text', reason: `Modmail created ticket.` });
        channel.setParent(`944243724328775710`);

        channel.setTopic(`Ticket for ${clicker}`)
        channel.permissionOverwrites.create(everyone, {
          VIEW_CHANNEL: false
        });
        if (modrole) channel.permissionOverwrites.create(modrole, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          READ_MESSAGE_HISTORY: true
        });
        channel.permissionOverwrites.create(i.user.id, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          READ_MESSAGE_HISTORY: true
        });
        if (bot) channel.permissionOverwrites.create(bot, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          READ_MESSAGE_HISTORY: true,
          MANAGE_MESSAGES: true
        })
        i.reply({ content: `Your ticket has been created in ${channel}`, ephemeral: true });

        let msg = await channel.send({ embeds: [supportEmbed], components: [buttons] });

        client.channels.cache.get('959357633733730324').send({
          content: `${process.env.modEmoji} **Mod log:**
> **Member:** ${i.user}
> **Member id:** ${i.user.id}
> **Member tag:** ${i.user.tag}
> **Action:** Ticket create
> **Ticket:** ${channel}`
        })

        let collector = msg.createMessageComponentCollector()
        collector.on(`collect`, async inter => {
          if (!inter.isButton()) return;
          //Ticket creation

          //Ticket closing          
          if (inter.customId === `close`) {

            await inter.channel.send({ embeds: [closingEmbed] })

            await inter.channel.permissionOverwrites.edit(i.user.id, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: false,
              READ_MESSAGE_HISTORY: true
            });
            buttons.components[0].setDisabled(true)
            inter.update({ components: [buttons] })
          };
          //Ticket closing

          //Ticket opening          
          if (inter.customId === `openticket`) {

            await inter.reply({ embeds: [openingEmbed] })

            await inter.channel.permissionOverwrites.edit(i.user.id, {
              SEND_MESSAGES: true
            });
            buttons.components[2].setDisabled(true)
            inter.update({ components: [addons] })
          };
          //Ticket opening

          //Ticket deleting
          if (inter.customId === `delete`) {
            if (!inter.member.permissions.has('KICK_MEMBERS')) return (
              inter.reply({ embeds: [noPerms], ephemeral: true })
            );

            inter.reply({ content: `Deleting...`, ephemeral: true })
            buttons.components.forEach(button => button.setDisabled(true))
            inter.update({ components: [buttons] })
            await inter.channel.send({ embeds: [deleteEmbed] })

            setTimeout(async () => {
              await inter.channel.delete()
            }, 5000)
          };
          //Ticket deleting

          //Ticket member add          
          if (inter.customId === `add`) {

            const addedMember = inter.mentions.members.first();

            await inter.reply({ content: `Mention the member whom you want to add in the ticket` })

            await inter.channel.permissionOverwrites.edit(addedMember, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              READ_MESSAGE_HISTORY: true
            });
            inter.update({ components: [addons] })
          };
          //Ticket member add          

          //Ticket member remove          
          if (inter.customId === `remove`) {

            const removedMember = inter.mentions.members.first();

            await inter.reply({ content: `Mention the member whom you want to remove from the ticket` })

            await inter.channel.permissionOverwrites.edit(removedMember, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false
            });
            inter.update({ components: [addons] })
          };
          //Ticket member remove 
      
          //Ticket settings
          if (inter.customId === `settings`) {
            if (!inter.member.permissions.has('KICK_MEMBERS')) return (
              inter.reply({ embeds: [noPerms], ephemeral: true })
            );
            buttons.components[2].setDisabled(true)
            await inter.channel.send({ embeds: [settingsEmbed], components: [addons] })
            inter.update({ embeds: [supportEmbed], components: [buttons] })

          };
          //Ticket settings
        })
      }
      //Ticket Deleting
    }
    //-----------Ticket System------------






    //--------Global Ticket System--------
    else {
      //Close and Delete buttons
      const buttons = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('Close')
            .setStyle('PRIMARY')
            .setCustomId('closing')
            .setEmoji("🔒")
        )
        .addComponents(
          new MessageButton()
            .setLabel('Delete')
            .setStyle('DANGER')
            .setCustomId('deleting')
            .setEmoji("⛔")
        );

      const disable = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('Close')
            .setStyle('PRIMARY')
            .setCustomId('closing')
            .setEmoji("🔒")
            .setDisabled(true)
        )
        .addComponents(
          new MessageButton()
            .setLabel('Delete')
            .setStyle('DANGER')
            .setCustomId('deleting')
            .setEmoji("⛔")
        );
      //Close and Delete buttons

      //User, Emoji, Embeds and Roles
      const clicker = i.user.username;

      const supportEmbed = new MessageEmbed()
        .setTitle(`Welcome ${clicker}`)
        .setURL("https://youtube.com/c/ShadowCoDM")
        .setColor("#12c4ff")
        .setDescription(`<:Mod:944912016068468737>  Staff will be with you soon, please be patient.`)

      const closingEmbed = new MessageEmbed()
        .setColor("#12c4ff")
        .setDescription(`Ticket closed`);

      const noPerms = new MessageEmbed()
        .setColor("#12c4ff")
        .setDescription(`You don't have permission to delete ticket!`);

      const deleteEmbed = new MessageEmbed()
        .setColor("#12c4ff")
        .setDescription(`This ticket will be deleted shortly`);

      const everyone = i.guild.roles.everyone;

      const [
        modrole,
        botrole,
        category
      ] = [
          await db.get(`modrole_${i.guild.id}`),
          await db.get(`botrole_${i.guild.id}`),
          await db.get(`category_${i.guild.id}`)
        ]
      //User, Emoji, Embeds and Roles

      //Ticket creation
      if (i.customId === 'create') {
        if (!i.isButton()) return;

        db.set(`person_${i.guild.id}`, `${i.user.id}`)
        const member = await db.get(`person_${i.guild.id}`)

        const channel = await i.guild.channels.create(`ticket-${clicker}`, { type: 'text', reason: `Modmail created ticket.` });

        if (category) channel.setParent(`${category}`);

        channel.setTopic(`Ticket for ${clicker}`)
        channel.permissionOverwrites.create(everyone, {
          VIEW_CHANNEL: false
        });
        if (modrole) channel.permissionOverwrites.create(modrole, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          READ_MESSAGE_HISTORY: true
        });
        channel.permissionOverwrites.create(member, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          READ_MESSAGE_HISTORY: true
        });
        if (botrole) channel.permissionOverwrites.create(botrole, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          READ_MESSAGE_HISTORY: true,
          MANAGE_MESSAGES: true
        })
        i.reply({ content: `Your ticket has been created in ${channel}`, ephemeral: true });

        let msg = await channel.send({ embeds: [supportEmbed], components: [buttons] });

        let collector = msg.createMessageComponentCollector()
        collector.on(`collect`, async inter => {
          if (!inter.isButton()) return;
          //Ticket creation

          //Ticket closing          
          if (inter.customId === `closing`) {
            await inter.channel.send({ embeds: [closingEmbed] })

            await inter.channel.permissionOverwrites.edit(i.user.id, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: false,
              READ_MESSAGE_HISTORY: true
            });
            inter.update({ components: [disable] })
          }
          //Ticket closing

          //Ticket deleting
          if (inter.customId === `deleting`) {
            if (!inter.member.permissions.has('KICK_MEMBERS')) return (
              inter.reply({ embeds: [noPerms], ephemeral: true })
            );
            inter.reply({ content: `Deleting...`, ephemeral: true })
            await inter.channel.send({ embeds: [deleteEmbed] })

            setTimeout(async () => {
              await inter.channel.delete()
            }, 5000)
          };
          //Ticket deleting
        });
      };
    };
    //--------Global Ticket System--------

  }
}



/*
Don't mind this:

    const disable = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel('Close')
          .setStyle('PRIMARY')
          .setCustomId('close')
          .setEmoji("🔒")
          .setDisabled(true)
      )
      .addComponents(
        new MessageButton()
          .setLabel('Delete')
          .setStyle('DANGER')
          .setCustomId('delete')
          .setEmoji("⛔")
      )
      .addComponents(
        new MessageButton()
          .setLabel('Settings')
          .setStyle('SUCCESS')
          .setCustomId('settings')
          .setEmoji("⚙️")
      );

    const disableSettings = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel('Close')
          .setStyle('PRIMARY')
          .setCustomId('close')
          .setEmoji("🔒")
      )
      .addComponents(
        new MessageButton()
          .setLabel('Delete')
          .setStyle('DANGER')
          .setCustomId('delete')
          .setEmoji("⛔")
      )
      .addComponents(
        new MessageButton()
          .setLabel('Settings')
          .setStyle('SUCCESS')
          .setCustomId('settings')
          .setEmoji("⚙️")
          .setDisabled(true)
      );
*/