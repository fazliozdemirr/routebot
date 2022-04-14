function ms(str) {
  var result = 0;
  var regex = /(\d+)([dhms])/g;
  var match;
  while ((match = regex.exec(str))) {
    var num = parseInt(match[1]);
    var unit = match[2];
    switch (unit) {
      case "d":
        result += num * 86400000;
        break;
      case "h":
        result += num * 3600000;
        break;
      case "m":
        result += num * 60000;
        break;
      case "s":
        result += num * 1000;
        break;
      case "ms":
        result += num;
        break;
    }
  }
  return result;
}

const Database = require("@replit/database")
const db = new Database()

module.exports = {
  name: "gcreate",
  aliases: ["gc", "giveawaycreate"],
  description: "Start a giveaway",
  async run(client, message, args) {
    if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("You don't have permission to do that!");

    const Discord = require("discord.js");
    const diamond = "<:diamond:961819721974558740>";
    const wrongUsage = `**Wrong command usage!**
**Command usage:** \`\`\`
-giveaway time(1s, 1m, 1h, 1d...) no. of winner(s) #channel prize\`\`\`
**E.g.** \`\`\`
-giveaway 24h 1w #giveaway Discord Nitro\`\`\``;
    let duration = ms(args[0]);
    if (!duration) return message.channel.send(`${wrongUsage}`)
    let winnerCount = Number(args[1]);
    if (isNaN(winnerCount) || winnerCount < 1) return message.channel.send(`${wrongUsage}`);

    let giveawayChannel = message.mentions.channels.first();
    if (!giveawayChannel) return message.channel.send(`${wrongUsage}`);

    let prize = args.slice(3).join(" ");
    if (!prize) return message.channel.send(`${wrongUsage}`);

    /*let roles = message.mentions.roles.first() || args[4] || `No requirements`;*/
    try {

      const startGiveawayEmbed = new Discord.MessageEmbed()
        .setTitle(`${diamond} Giveaway:`)
        .setDescription(`
**${prize}**
React with 🎉 to participate in the giveaway!
**Winners:** ${winnerCount}
**Time:** ${duration}
**Hosted By:** ${message.author}
**Ends In:** <t:${Math.floor((Date.now() + duration) / 1000)}:R>`)
        .setColor('#12c4ff')

      let msg = await giveawayChannel.send({ embeds: [startGiveawayEmbed] })

      msg.react("🎉").catch(console.error);
      db.set(`giveaway_${msg.channel.id}_${msg.id}`, {
        duration: duration,
        hoster: message.author.id,
        winnerCount: winnerCount,
        prize: prize
      })
      setTimeout(() => {
        let embedGiveawayHandle = msg.channel.messages.fetch(msg.id).catch(() => { })
        let joined = embedGiveawayHandle.reactions.cache.get("🎉").users.cache.filter(user => !user.bot)
        if (joined.size < 1) {
          return giveawayChannel.send("Nobody participated in the giveaway!")
        };

        if (joined.size < winnerCount) {
          return giveawayChannel.send("There's not enough people in the giveaway to satisfy the number of winners!")
        }
        let winner = joined.random(winnerCount)
        const endedEmbedGiveaway = new Discord.MessageEmbed()
          .setTitle(`${diamond} Giveaway:`)
          .setDescription(`
**Prize:** ${prize}
**Participants:** ${joined.size}
**Winners:** ${winnerCount}
**Winner(s):** ${winner.join(`, `)}
**Hosted By:** ${message.author}
**Duration:** ${duration}`)
          .setColor('#12c4ff')
          .setFooter("Giveaway Ended");

        embedGiveawayHandle.edit({ embeds: [endedEmbedGiveaway] });

        const congratsEmbedGiveaway = new Discord.MessageEmbed()
          .setDescription(`Congratulations ${winner}!
You won **${prize}**!

Create a ticket by doing \`-ticket\` in <#940625921830961162> to claim your prize.`)
          .setColor('#12c4ff')

        giveawayChannel.send({ content: `${winner}`, embeds: [congratsEmbedGiveaway] })
        db.delete(`giveaway_${msg.channel.id}_${msg.id}`)
      }, duration)
    } catch (e) {
      console.log(e)
      return message.channel.send('Oops! Something went wrong...')
    }
  }
}