module.exports = {
  name: "setup-ticket",
  aliases: ["s-ticket"],
  description: "Setup ticket system",
  run(client, message, args) {

    //Variables
    const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
    const Database = require("@replit/database")
    const db = new Database()
    //Variables

    //No permissions
    const noPerms = new MessageEmbed()
      .setColor('#12c4ff')
      .setDescription(`You don't have permission to do that!`);

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send({ embeds: [noPerms] });
    //No permissions

    //If server is ConquerX
    if (message.guild.id === `${process.env.myServer}`) {

      const ticketEmbed = new MessageEmbed()
        .setTitle("🎟️ Create a ticket")
        .setDescription(`Create a ticket by clicking on 🎟️ below.

**Note:** In case the ticket creation fails, do \`-ticket\` in <#940625921830961162> to create a ticket. Only use this method if the above feature doesn't works else your ticket will be rejected.`)
        .setFooter({ text: `Note: Creating a ticket without any reason may lead to a mute/kick!` })
        .setColor("#12c4ff");

      const button = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('Create ticket')
            .setStyle('SUCCESS')
            .setCustomId('open')
            .setEmoji("🎟")
        );

      message.channel.send({ embeds: [ticketEmbed], components: [button] })
    }
    //If server is ConquerX

    //If server is not ConquerX
    else {

      const msg = args.join(' ');
      const msgSplit = msg.split(' - ');
      const title = msgSplit[0];
      const desc = msgSplit[1];
      const modrole = msgSplit[2];
      const botrole = msgSplit[3];
      const category = msgSplit[4];

      if (!title) return message.reply({
        content: `Wrong command usage!
Command usage: \`-setup-ticket title - description - highest modrole id - bot's default role id - category id\``});

      if (!desc) return message.reply({
        content: `Wrong command usage!
Command usage: \`-setup-ticket title - description - highest modrole id - bot's default role id - category id\``});

      if (!modrole) return message.reply({
        content: `Wrong command usage!
Command usage: \`-setup-ticket title - description - highest modrole id - bot's default role id - category id\``});

      if (!botrole) return message.reply({
        content: `Wrong command usage!
Command usage: \`-setup-ticket title - description - highest modrole id - bot's default role id - category id\``});

      if (!category) return message.reply({
        content: `Wrong command usage!
Command usage: \`-setup-ticket title - description - highest modrole id - bot's default role id - category id\``});

      const ticketEmbed = new MessageEmbed()
        .setTitle(`${title}`)
        .setDescription(`${desc}`)
        .setColor("#12c4ff");

      const button = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('Create ticket')
            .setStyle('SUCCESS')
            .setCustomId('create')
            .setEmoji("🎟")
        );

      message.channel.send({ embeds: [ticketEmbed], components: [button] })
      db.set(`modrole_${message.guild.id}`, modrole)
      db.set(`botrole_${message.guild.id}`, botrole)
      db.set(`category_${message.guild.id}`, category)
    };
    //If server is not ConquerX

  }
}
