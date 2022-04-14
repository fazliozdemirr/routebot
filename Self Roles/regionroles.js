module.exports = {
  name: "regionroles",
  aliases: ["region-roles"],
  description: "Self roles for regions",
 async run(client, message, args) {
const Discord = require("discord.js");

  const channel = "940632102813179925";

  const AS = message.guild.roles.cache.find(role => role.name === "Asia");
  const NA = message.guild.roles.cache.find(role => role.name === "North America");
  const SA = message.guild.roles.cache.find(role => role.name === "South America");
  const EU = message.guild.roles.cache.find(role => role.name === "Europe");
  const OCE = message.guild.roles.cache.find(role => role.name === "Ocenia");

  const ASEmoji = "🇦";
  const EUEmoji = "🇪";
  const NAEmoji = "🇳";
  const SAEmoji = "🇸";
  const OCEEmoji = "🇴";

  const embed = new Discord.MessageEmbed()
    .setTitle(`Choose athe region which you play on!
(Call of Duty: Mobile)`)
    .setURL("https://youtube.com/ShadowCoDM")
    .setDescription(`
:regional_indicator_a:: Asia

:regional_indicator_e:: Europe

:regional_indicator_n:: North America

:regional_indicator_s:: South America

:regional_indicator_o:: Ocenia`)
    .setColor("#12c4ff")
    .setFooter(`Note: You can only pick any one role from this category.`)

  const messageEmbed = await message.channel.send({ embeds: [embed] });

  messageEmbed.react(ASEmoji);
  messageEmbed.react(NAEmoji);
  messageEmbed.react(SAEmoji);
  messageEmbed.react(EUEmoji);
  messageEmbed.react(OCEEmoji);
  }
}