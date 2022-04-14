module.exports = {
  name: "eventroles",
  aliases: ["event-roles"],
  description: "Self roles for events",
async run(client, message, args) {
    const Discord = require ("discord.js");
    
  const commands = client.commands.map(command => command.name).join(", ")

  const giveaway = message.guild.roles.cache.find(role => role.name === "Giveaway");
  const event = message.guild.roles.cache.find(role => role.name === "Event");
  const news = message.guild.roles.cache.find(role => role.name === "News");
  const tournament = message.guild.roles.cache.find(role => role.name === "Tournament");

  const embed = new Discord.MessageEmbed()
    .setTitle(`Choose the roles which you want to get notified about!`)
    .setURL("https://youtube.com/ShadowCoDM")
    .setDescription(`
🎉: Giveaway: Get notified about the latest **Giveaways**.

🎁: Event: Get notified about fun **Events**.

🔔: News: Get notified about important **News & Updates**.

🗡️: Tournament: Get notified about new **Community Tournaments**.`)
    .setColor("#12c4ff")
    .setFooter(`Note: You can pick multiple roles from this category.`)

  const messageEmbed = await message.channel.send({ embeds: [embed] });

  const giveawayEmoji = "🎉";
  const eventEmoji = "🎁";
  const newsEmoji = "🔔";
  const tournamentEmoji = "🗡️";

  messageEmbed.react(giveawayEmoji);
  messageEmbed.react(eventEmoji);
  messageEmbed.react(newsEmoji);
  messageEmbed.react(tournamentEmoji);
  }
}