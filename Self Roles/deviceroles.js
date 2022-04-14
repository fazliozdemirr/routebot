module.exports = {
  name: "deviceroles",
  aliases: ["device-roles", "Deviceroles"],
  description: "Seld roles for device",
 async run(client, message, args) {
    const Discord = require ("discord.js");
   
  const commands = client.commands.map(command => command.name).join(", ")

  const android = message.guild.roles.cache.find(role => role.name === "Android");
  const ios = message.guild.roles.cache.find(role => role.name === "iOS");
  const emulator = message.guild.roles.cache.find(role => role.name === "Emulator");

  const androidEmoji = "📱"
  const iosEmoji = "🍎";
  const emulatorEmoji = "🖥️";

  const embed = new Discord.MessageEmbed()
    .setTitle(`Choose the device which you play on!
(Call of Duty: Mobile)`)
    .setURL("https://youtube.com/ShadowCoDM")
    .setDescription(`
:mobile_phone:: Android

🍎: iOS

:desktop:: Emulator`)
    .setColor("#12c4ff")
    .setFooter(`Note: You can only pick any one role from this category.`)

  const messageEmbed = await message.channel.send({ embeds: [embed] });

  messageEmbed.react(androidEmoji);
  messageEmbed.react(iosEmoji);
  messageEmbed.react(emulatorEmoji);
  }
}