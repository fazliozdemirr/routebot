const Database = require("@replit/database");

const {
  Client,
  Message,
  MessageEmbed,
  Role,
  TextChannel,
  GuildMember,
} = require("discord.js");
const db = new Database();
const client = require("../../index").client;

module.exports = {
  name: "greroll2",
  aliases: ["gr2"],
  description: "Reroll a ended giveaway!",
  async run(client, message, args) {
    const inactiveGiveaways = client.commands.get("giveaway").inactiveGiveaways;
    // Check if args[1] exists and is a inactive giveaway
    console.log(inactiveGiveaways);
    if (!args[0] || !inactiveGiveaways.has(args[0])) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle("Error")
            .setDescription("Please provide a valid giveaway ID to reroll!")
            .setColor("#ff0000"),
        ],
      });
    }
    // Get the giveaway
    const giveaway = inactiveGiveaways.get(args[0]);
    let msg = await client.channels
      .fetch(giveaway.channel)
      .then((channel) => channel.messages.fetch(giveaway.message))
      .catch((err) => {
        console.log(err);
      });

    // Make sure the message is defined and is editable otherwise return and delete the giveaway
    if (!msg || !msg.editable) {
      db.delete(`giveaway_${giveaway.message}`);
      return;
    }

    // Get the winners by getting the reactions and filtering out the bots uses resolve to get the users
    let winners = (await msg.reactions.resolve("🎉").users.fetch()).filter(
      (u) => !u.bot
    );

    // Get the winner count
    let winnerCount = winners.size;

    // If the winner count is less than the winners then continue by setting winners to none
    if (winnerCount < giveaway.winners) {
      winners = [];
    }

    // Get the winner by picking winnerCount amount of winners randomly
    let users = winners.random(giveaway.winners);

    // Now edit the message with the winners
    await msg.edit({
      embeds: [
        new MessageEmbed()
          .setTitle(`Giveaway Ended`)
          .setColor("#7289DA")
          .addField(`Prize`, `${giveaway.price}`)
          /*         .addField(`Participants`, `${message.reactions.fetch("🎉").users}`)  */
          .addField(
            "Winners",
            users
              ? users.map((u) => `<@${u.id}>`).join(", ")
              : "Not enough participants!"
          )
          .setTimestamp()
          .setFooter({
            text: "Ended at" + new Date(giveaway.end).toLocaleString(),
            iconURL: msg.author.avatarURL(),
          }),
      ],
    });

    // Reply the message to the channel that the giveaway has ended and mention the winners
    await msg.reply({
      content: `**Giveaway rerolled!**\n\n**Winners:** ${
        users ? users.map((u) => `<@${u.id}>`) : "Not enough participants!"
      }`,
    });
  },
};

Array.prototype["random"] = function (count = 1) {
  // Return a array only if count is more than 1
  if (count > 1) {
    // Make sure to clone the array to make sure there're not duplicate values
    let arr = this.slice(0);
    // Create an empty array
    let result = [];
    // Loop through the count
    for (let i = 0; i < count; i++) {
      // Get a random index
      let index = Math.floor(Math.random() * arr.length);
      // Push the value to the result array
      result.push(arr[index]);
      // Remove the value from the array
      arr.splice(index, 1);
    }
    // Return the result array
    return result;
  } else {
    // Return the random value
    return this[Math.floor(Math.random() * this.length)];
  }
};
