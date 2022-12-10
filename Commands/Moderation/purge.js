module.exports = {
  name: "purge",
  aliases: ["Purge", "clear", "Clear"],
  description: "Delete bulk messages",
  async run(client, message, args) {

    //Variables
    const { MessageEmbed } = require('discord.js');
    const clear = args.shift();
    //Variables

    //No perms
    const noPerms = new MessageEmbed()
      .setDescription(`You don't have permission to clear messages`)
      .setColor('RED');
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply({ embeds: [noPerms] });
    //No perms

    //Wrong usage embed
    const wrongUsage = new MessageEmbed()
      .setTitle('Wrong command usage')
      .setDescription(`**Correct usage:** \`-purge [number of messages]\`
> **Note:** The \`number of messages\` should be a natural integer and less than or equal to \`100\`. E.g. \`-purge 20\``)
      .setColor('RED');
    //Wrong usage embed

    //If number isn't provided
    if (!clear) return message.reply({ embeds: [wrongUsage] });
    //If number isn't provided

    //If the number isn't valid
    if (isNaN(clear)) return message.reply({ embeds: [wrongUsage] });
    //If the number isn't valid

    //If the number is more than 1000
    const moreThanH = new MessageEmbed()
      .setDescription(`I can't clear more than 100 messages at a time!`)
      .setColor('RED');
    if (clear > 100) return message.reply({ embeds: [moreThanH] })
    //If the number is more than 1000

    //If the number is smaller than 1
    const lessThanOne = new MessageEmbed()
      .setDescription(`You can't clear less than 1 message!`)
      .setColor('RED');
    if (clear < 1) return message.reply({ embeds: [lessThanOne] });
    //If the number is smaller than 1

    //Success
    const success = new MessageEmbed()
      .setDescription(`Succesfully cleared ${clear} messages! If purge fails please make sure I have \`MANAGE_MESSAGES\` permission to clear messages successfully.`)
      .setColor('#12c4ff');
    message.channel.bulkDelete(clear)
    message.delete()
    const m = await message.channel.send({ embeds: [success] });
    setTimeout(() => {
      m.delete()
    }, 7000);
    //Success

  }
}