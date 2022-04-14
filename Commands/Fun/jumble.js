exports.run = async (client, message, args) => {
  const Discord = require("discord.js")
  const Jumble = require("jumble-words");
  const jumble = new Jumble();
  const word = jumble.generate();
  const filter = m => m.author.id === message.author.id;
  console.log(word);

  const jumbleEmbed = new Discord.MessageEmbed()
    .setTitle("Jumble Game")
    .setDescription(`Your word is: **${word[0].jumble}**`)
    .setColor("#12c4ff")
    .setFooter("You have only 10 seconds to answer!")
  await message.reply({ embeds: [jumbleEmbed] });

  message.channel.awaitMessages(filter, {
    max: 1,
    error: ["time"],
    time: 15000
  })
    .then(collected => {
      const m = collected.first();
      let jembed = new Discord.MessageEmbed()
        .setDescription(`❌ | Invalid guess, idiot! Correct word was **${word[0].word}**!`)
        .setColor("#12c4ff")
      if (m.content.toLowerCase() !== word[0].word.toLowerCase())

        return message.channel.send({ embeds: [jembed] });
      let fembed = new Discord.MessageEmbed()
        .setDescription(`✅ | Correct guess, smarty pants!`)
        .setColor("#12c4ff")
      return message.channel.send({ embeds: [fembed] })
    })
    .catch(() => {
      let lembed = new Discord.MessageEmbed()
        .setDescription(`❌ | You did not answer in time, late shoes. The correct word was **${word[0].word}**!`)
        .setColor("#12c4ff")
      message.channel.send({ embeds: [lembed] });
    })
};

exports.name = "jumble"