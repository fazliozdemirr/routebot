module.exports = {
  name: "calc",
  aliases: ["Calc", "calculate", "Calculate"],
  description: "Calculator",
  run(client, message, args) {
    const Discord = require("discord.js")
    const math = require('discord-math');

    try {
      const num1 = Number(args[0]);
      const operation = args[1];
      const num2 = Number(args[2]);

      if (!num1) return message.channel.send(`Wrong comamnd usage!
Commands usage: \`-calc num1 operation(+, -, *, /...) num2\``);
      if (!operation) return message.channel.send(`Wrong comamnd usage!
Commands usage: \`-calc num1 operation(+, -, *, /...) num2\``);
      if (!num2) return message.channel.send(`Wrong comamnd usage!
Commands usage: \`-calc num1 operation(+, -, *, /...) num2\``);

      let embed = new Discord.MessageEmbed()
        .setTitle("⚙️ Answer:")
        .setURL("https://youtube.com/c/ShadowCoDM")
        .setDescription(`${math.calculate(num1, operation, num2)}`)
        .setColor("#12c4ff")
        .setTimestamp()
        .setFooter(`Requested by: ${message.author.username}`);

      message.channel.send({ embeds: [embed] });
    } catch (e) {
      console.log(e);
    }
  }
}