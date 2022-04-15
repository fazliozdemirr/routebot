module.exports = {
  name: 'help',
  aliases: ['Help'],
  description: 'Get information about bot commands',
  async run(client, message, args) {
    const {
      MessageEmbed,
      MessageActionRow,
      MessageButton,
      MessageSelectMenu
    } = require('discord.js');

    //Commands
    const m = '<:mod:944912016068468737>';
    const e = '<:ohno:948401869296898118>';
    const n = '<a:nitro:962692281926836285>';
    const g = '<:sniper:964340341492822027>';

    const help = new MessageEmbed()
      .setTitle('Commands:')
      .setURL('https://youtube.com/c/ShadowCoDM')
      .setDescription(
        `**Here are my commands that you can use.**

**${m}  Moderation:** Commands that can only be used by the Server Mods for moderation.

**🔧  Utility:** These commands can be used by every Server member for some work.

**${e}  Fun:** These commands can be used by every Server member for fun.

**${g}  Gunsmiths (CoDM):** You can get gunsmiths for any gun by Shadow. (SMGs not updated yet)

**🎟️  Ticket system:** Setup a ticket system for your server.

**${n} Giveaway system:** Host giveaways!

**📫  Welcome system:** Setup a welcome message for new members joining your server.

Did you see a loophole/bug in the bot? Report it using \`-reportbug\` command!
[Invite me](https://discord.com/api/oauth2/authorize?client_id=940748261441028116&permissions=8&scope=bot)`
      )
      .setColor('#12c4ff')
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();
    //Commands

    //Moderation
    const moderation = new MessageEmbed()
      .setTitle('<:mod:944912016068468737>  Moderation:')
      .setURL('https://youtube.com/c/ShadowCoDM')
      .setDescription(
        '`purge`, `kick`, `ban`, `mute`, `unmute`, `lock`, `unlock`, `slowmode`, `addrole`, `removerole`, `memberperms`, `roleperms`, `embed`, `userinfo`, `nick`, `.snipe`, `warn`, `deletechannel`'
      )
      .setColor('#12c4ff')
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();
    //Moderation

    //Utility
    const utility = new MessageEmbed()
      .setTitle(':wrench:  Utility:')
      .setURL('https://youtube.com/c/ShadowCoDM')
      .setDescription(
        '`setup-ticket`, `suggest`, `ping`, `youtube`, `serverinfo`, `giveaway`, `remind`, `avatar`, `invite`, `schedulemsg`, `calc`, `createinvite`, `weather`, `translate`, `servers`'
      )
      .setColor('#12c4ff')
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();
    //Utility

    //Fun
    const fun = new MessageEmbed()
      .setTitle(`${e}  Fun:`)
      .setURL('https://youtube.com/c/ShadowCoDM')
      .setDescription(
        '`meme`, `hack`, `kill`, `nitro`, `legit-nitro`, `cock`, `rps`, `ttt`, `trivia`, `wouldyourather`, `coinflip`, `claim-nitro`, `spank`, `akinator`, `gayrate`, `image`, `susrate`, `snake`, `connect4`, `football`, `amogus`'
      )
      .setColor('#12c4ff')
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();
    //Fun

    //Gunsmiths
    const gunsmiths = new MessageEmbed()
      .setTitle(`${g}  Gunsmiths (CoDM):`)
      .setURL('https://youtube.com/c/ShadowCoDM')
      .setDescription(
        '`Type the gun name same as in-game with the bot prefix -, use - where there are spaces in gun name and you can get the Gunsmith of your desired weapon.\nExamples:\n-Kilo-141\n-Man-O-War\n-Arctic--50\n-Kilo-Bolt-Action`'
      )
      .setColor('#12c4ff')
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();
    //Gunsmiths

    //Ticket system
    const ticket = new MessageEmbed()
      .setTitle(`🎟️  Ticket system:`)
      .setURL('https://youtube.com/c/ShadowCoDM')
      .setDescription(
        `
Follow all the steps given below to setup a ticket system for your server:
> \`1.\` Create a category in which you want the tickets to be created. Do not create the category if you already have one.
> 
> \`2.\` Copy the \`highest mod role id\`, \`bot's default role id\` and the \`category id\`.
> 
> \`3.\` Use the command \`setup-ticket\` in the correct format i.e. \`-setup-ticket title - description - highest modrole id - bot's default role id - category id\` and your ticket system will be ready!
> 
> \`E.g.\` \`-setup-ticket Create ticket - Create ticket by clicking on 🎟️ below - 960502372642226206 - 960453846457528333 - 962521268526153798\`
> 
> \`Output:\`
`
      )
      .setColor('#12c4ff')
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp()
      .setImage(
        `https://media.discordapp.net/attachments/943047940371546182/963089327460593745/Screenshot_20220411_202106.jpg`
      );
    //Ticket system

    //Giveaway system
    const giveaway = new MessageEmbed()
      .setTitle(`${n}  Giveaway system:`)
      .setURL('https://youtube.com/c/ShadowCoDM')
      .setDescription(
        `For hosting giveaways in your server use the \`giveaway\` command with the correct syntax i.e. \`-giveaway <#channel-name> <time(1s, 1m, 1h, 1d...)> <number of winners> <prize>\`.

E.g. \`-giveaway #giveaway 24h 1 Discord Nitro\`

After the command is executed, you will be asked for the role requirement. Type \`none\` for no role requirement or mention the \`role/role id\` for a role requirement in your giveaway.`
      )
      .setColor('#12c4ff')
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();
    //Giveaway system

    //Welcome system
    const welcome = new MessageEmbed()
      .setTitle(`:mailbox:  Welcome system:`)
      .setURL('https://youtube.com/c/ShadowCoDM')
      .setDescription(
        'This feature is in development, it will be available soon...'
      )
      .setColor('#12c4ff')
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();
    //Welcome system

    const dropdownMenu = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('select')
        .setPlaceholder('Commands')
        .addOptions([
          {
            label: 'Commands',
            description: 'All bot commands',
            value: 'home'
          },
          {
            label: 'Moderation',
            description: 'Moderation commands',
            value: 'moderation'
          },
          {
            label: 'Utility',
            description: 'Utility commands',
            value: 'utility'
          },
          {
            label: 'Fun',
            description: 'Fun commands',
            value: 'fun'
          },
          {
            label: 'Gunsmiths',
            description: 'Commands for getting good gunsmiths in CoDM',
            value: 'gunsmiths'
          },
          {
            label: 'Ticket System',
            description: 'Setup a ticket system in your server',
            value: 'ticket'
          },
          {
            label: 'Giveaway System',
            description: 'Host giveaways',
            value: 'giveaway'
          },
          {
            label: 'Welcome System',
            description: 'Setup a custom welcome system in your server',
            value: 'welcome'
          }
        ])
    );
    const buttons = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel('Main Server')
          .setStyle('LINK')
          .setURL('https://dsc.gg/conquerx')
      )
      .addComponents(
        new MessageButton()
          .setLabel('Bot Creator')
          .setStyle('LINK')
          .setURL('https://youtube.com/c/shadowCoDM')
      )
      .addComponents(
        new MessageButton()
          .setLabel('Support Server')
          .setStyle('LINK')
          .setURL('https://dsc.gg/crxbot')
      )
			/*    .addComponents(
        new MessageButton()
          .setLabel('Vote Me')
          .setStyle('LINK')
          .setURL('')
      )      */
      .addComponents(
        new MessageButton()
          .setLabel('Invite Me')
          .setStyle('LINK')
          .setURL('https://dsc.gg/crxbot')
      );

    const c = await message.reply({
      embeds: [help],
      components: [dropdownMenu, buttons]
    });

    const collector = c.createMessageComponentCollector({
      componentType: 'SELECT_MENU'
    });

    collector.on('collect', async c => {
      const value = c.values[0];

      if (value === 'home') {
        c.update({ embeds: [help] });
      }

      if (value === 'moderation') {
        c.update({ embeds: [moderation] });
      }

      if (value === 'utility') {
        c.update({ embeds: [utility] });
      }

      if (value === 'fun') {
        c.update({ embeds: [fun] });
      }

      if (value === 'gunsmiths') {
        c.update({ embeds: [gunsmiths] });
      }

      if (value === 'ticket') {
        c.update({ embeds: [ticket] });
      }

      if (value === 'giveaway') {
        c.update({ embeds: [giveaway] });
      }

      if (value === 'welcome') {
        c.update({ embeds: [welcome] });
      }
    });

  }
}