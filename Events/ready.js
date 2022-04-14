function ms(str) {
  let result = 0;
  let regex = /(\d+)([dhms])/g;
  let match;
  while ((match = regex.exec(str))) {
    let num = parseInt(match[1]);
    let unit = match[2];
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
  name: `ready`,
  async run(ready, { memberCounter, client, Discord }) {

    //Bot activity/status
client.user.setActivity('youtube.com/c/ShadowCoDM', {
      type: 'STREAMING',
      URL: 'https://youtube.com/c/ShadowCoDM'
    })
    //Bot activity/status

    //Member counter
    console.log(`Logged in`)
    memberCounter(client)
    //Member counter
    
    let giveaways = await db.list(`giveaway`)

    giveaways.forEach(async giveaway => {
      let [channelId, messageId] = giveaway.split(`_`).splice(1)
      let channel = await client.channels.fetch(channelId).catch(() => {})
      if(!channel) return
      let message = await channel.messages.fetch(messageId).catch(() => {})
      if(!message) return
      let {
        duration, hoster, winnerCount, prize
      } = await db.get(giveaway)
      setTimeout(() => {
        let embedGiveawayHandle = message
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
    })
  }
}