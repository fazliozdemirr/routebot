module.exports = {
  name: "remind",
  aliases: ["Remind", "timer", "Timer"],
  description: "Set a reminder for something important",
  run(client, message, args) {

    const { MessageEmbed } = require("discord.js");
    const ifh = require('intervals-for-humans');
    const pt = require('prettytime');
    const timer = args[0];
    const reason = args.slice(1).join(" ") || "No Reason Provided";

    const reminder = new MessageEmbed()
      .setTitle("Reminder")
      .setDescription(`**Timer:** ${pt(ifh(timer))}
**Reason:** ${reason}`)
      .setColor(`#12c4ff`)
      .setFooter({ text: "Make sure to have your dms on" })
      .setTimestamp();

    const remind = new MessageEmbed()
      .setTitle("Reminder")
      .setDescription(`Reason: ${reason}`)
      .setColor(`#12c4ff`)
      .setFooter({ text: "Reminder sent by ConquerX" })
      .setTimestamp();

    if (!timer) return message.channel.send(`Wrong comamnd usage!
Commands usage: \`-remind time(1s/1m/1h...) reason(optional)\``);

    message.channel.send({ embeds: [reminder] });

    setTimeout(async () => {
      message.author.send({ embeds: [remind] });
    }, ifh(timer))
  }
}