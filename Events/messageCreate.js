module.exports = {
  name: `messageCreate`,
  async run(message, { client, Discord, snipe, prefix }) {
    const modEmoji = "<:mod:944912016068468737>";

    //Commands execute
    if (message.content.startsWith(prefix)) {
      const embed = new Discord.MessageEmbed()
        .setTitle("Error")
        .setDescription(`That command doesn't exist`)
        .setURL("https://youtube.com/c/ShadowCoDM")
        .setFooter("Type \"-help\" for more information")
        .setColor("#12c4ff")
        .setTimestamp();
      const args = message.content.slice(prefix.length).trim().split(/ +/g)
      const cmd = args.shift()
      const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
      if (!command) return message.channel.send({ embeds: [embed] });
      command.run(client, message, args)
    }
    //Commands execute

    //Blacklist system
    if (message.content.includes("Bhosdike")
      || message.content.includes("bhosdike")
      || message.content.includes("Bsdk")
      || message.content.includes("bsdk")
      || message.content.includes("Nigga")
      || message.content.includes("nigga")
      || message.content.includes("Mc")
      || message.content.includes("mc")
      || message.content.includes("Bhenchod")
      || message.content.includes("bhenchod")
      || message.content.includes("Lund")
      || message.content.includes("lund")
      || message.content.includes("fuck")
      || message.content.includes("Fuck")
      || message.content.includes("Fuck")
      || message.content.includes("Fuck")
      || message.content.includes("Fuck")
      || message.content.includes("Fuck")
      || message.content.includes("Fuck")
    ) {
      const embed = new Discord.MessageEmbed()
        .setTitle("Warning!")
        .setURL("https://youtube.com/c/ShadowCoDM")
        .setDescription(`<@${message.author.id}> You have been warned.
Reason: Swear

> Breaking the rules after warning may kead to a mute/kick.`)
        .setTimestamp()
        .setFooter({ text: "Do not use slang words" })
        .setColor("#12c4ff")
      message.channel.send({ embeds: [embed] })

/*client.channels.cache.get('959357633733730324').send({
        content: `${modEmoji} **Mod log:**
> **Content:** ${message.content}
> **Action:** Swear
> **Channel:** ${message.channel}
> **Message id:** ${message.id}
> **Message Author:** ${message.author}`, embeds: [embed]
      })*/
    }
    //Blacklist system

    //Snipe command
    if (message.content === ".snipe") {
      try {
        const modEmbed = new Discord.MessageEmbed()
          .setDescription(`**Message:** [Message](${message.url})`)
          .setColor("12c4ff")
          .setTimestamp()
          .setFooter({ text: `This message was issued by Administration` })
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: 'png' }));

        const msg = snipe.get(message.channel.id);
        if (!msg) return message.channel.send("There is Nothing To Snipe");
        const embed = new Discord.MessageEmbed()
          .setTitle(`Last Deleted Message in this channel`)
          .setColor("#12c4ff")
          .setTimestamp()
          .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
          .addFields(
            { name: "Sender", value: msg.author.username },
            { name: "Content", value: msg.content }
          )
        message.channel.send({ embeds: [embed] })

        client.channels.cache.get('959357633733730324').send({
          content: `${modEmoji} **Mod log:**
> **Content:** ${message.content}
> **Action:** Snipe
> **Channel:** ${message.channel}
> **Message id:** ${message.id}
> **Message Author:** ${message.author}`, embeds: [modEmbed, embed]
        })
      } catch (e) {
        console.log(e)
        return message.channel.send({ content: 'Message couldn\'t be sniped!' })
      }
    }
    //Snipe command

    //Antispam
    const AntiSpam = require('discord-anti-spam');
    const antiSpam = new AntiSpam({
      warnThreshold: 3,
      kickThreshold: 5,
      banThreshold: 7,
      maxInterval: 2000,
      warnMessage: `{@user}, Please stop spamming.`,
      kickMessage: '**{user_tag}** has been kicked for spamming.',
      muteMessage: '**{user_tag}** has been muted for spamming.',
      banMessage: '**{user_tag}** has been banned for spamming.',
      maxDuplicatesWarning: 7,
      maxDuplicatesKick: 10,
      maxDuplicatesBan: 12,
      exemptPermissions: ['ADMINISTRATOR', 'BAN_MEMBERS', 'KICK_MEMBERS'],
      ignoreBots: true,
      verbose: true,
      ignoredUsers: [],
      muteRoleName: "muted",
      removeMessages: true
    });

    antiSpam.message(message);
    //Antispam

    if (message.content === `<@940748261441028116>`) {
      message.channel.send(`Need help with my commands? 
Do \`-help\` to know about my commands`)
    };

    if (message.content === `<@893705256368750592>`) {
      let subscribe = new Discord.MessageEmbed()
        .setColor("#12c4ff")
        .setDescription("Subscribe to Shadow on **[YouTube!](https://youtube.com/c/ShadowCoDM)**")
      message.channel.send({ embeds: [subscribe] }).then(msg => msg.react('⭐'))
    };

if(message.content === `faceofgod`) {
  message.delete()
  message.channel.send({content: `<:faceofgod:853214955598643200>`})
}

  }
}