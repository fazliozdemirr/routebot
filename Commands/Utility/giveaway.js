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
let giveaways = [];
let keyLookupGiveaway = new Map();

module.exports = {
  name: "giveaway",
  aliases: ["Giveaway", "gaw"],
  description: "Host a giveaway!",
  inactiveGiveaways: new Map(),
  async run(client, message, args) {
    if (!message.member.permissions.has("KICK_MEMBERS"))
      return message.channel.send({
        content: "You do not have the permission to host giveaways!",
      });

    const channel = message.mentions.channels.first();

    // Check if they mentioned a text channel
    if (!channel) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle("Giveaway")
            .setColor("RED")
            .setDescription(
              "Wrong command usage!\n\nCommand Usage: `-giveaway #channel duration winners prize`"
            ),
        ],
      });
    }

    // Check if they entered a time
    if (!args[1]) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle("Giveaway")
            .setColor("RED")
            .setDescription(
              "Wrong command usage!\n\nCommand Usage: `-giveaway #channel duration winners prize`"
            ),
        ],
      });
    }

    // Check if they entered a number of winners
    if (!args[2] || isNaN(parseInt(args[2])) || parseInt(args[2]) < 1) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle("Giveaway")
            .setColor("RED")
            .setDescription(
              "Wrong command usage!\n\nCommand Usage: `-giveaway #channel duration winners prize`"
            ),
        ],
      });
    }

    if (!args[3]) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle("Giveaway")
            .setColor("RED")
            .setDescription(
              "Wrong command usage!\n\nCommand Usage: `-giveaway #channel duration winners prize`"
            ),
        ],
      });
    }

    // Price is the last argument, it can be more than one word
    let price = args.slice(3).join(" ");

    // Slice price to be only 250 characters long
    price = price.slice(0, 250);

    // Make sure that provided time is valid by converting it to milliseconds
    let time = this.parseMillis(args[1]);

    // Check if the time is valid
    if (time < 1) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle("Giveaway")
            .setColor("RED")
            .setDescription(
              "Wrong command usage!\n\nCommand Usage: `-giveaway #channel duration winners prize`"
            ),
        ],
      });
    }

    // Convert the time from millis
    let end = Date.now() + time;

    // Convert the time to a epoch time
    let endDate = Math.round(end / 1000);

    // Ask user for the role required to enter the giveaway
    let role = await this.getRole(message);

    // Send a message to the channel with a giveaway a message embed with title of prize, set the color to yellow and set the description React with 🎉 to enter
    let msg = await channel.send({
      embeds: [
        new MessageEmbed()
          .setTitle(`Giveaway`)
          .setColor("#12c4ff")
          .setDescription(`React with 🎉 to enter!`)
          .addField("Prize", `${price}`)
          .addField("Winners", args[2])
          .addField("Ends", `<t:${endDate}:R>`)
          .addField("Role Required", `${role}`)
          .setTimestamp()
          .setFooter({
            text: "Giveaway hosted by " + message.author.tag,
            iconURL: message.author.avatarURL(),
          }),
      ],
    });

    // React with 🎉
    await msg.react("🎉");
    db.set(`giveaway_${msg.id}`, {
      price: price,
      end: end,
      winners: parseInt(args[2]),
      channel: message.channel.id,
      message: msg.id,
      active: true,
      role: role.id,
    });

    // Add the giveaway to the giveaways array and the key lookup
    giveaways.push({
      price: price,
      end: end,
      winners: parseInt(args[2]),
      channel: message.channel.id,
      message: msg.id,
      active: true,
      role: role.id,
    });
    keyLookupGiveaway.set(msg.id, {
      price: price,
      end: end,
      winners: parseInt(args[2]),
      channel: message.channel.id,
      message: msg.id,
      active: true,
      role: role.id,
    });
  },
  parseMillis(str) {
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
  },
  async getRole(message) {
    let msg = await message.channel.send({
      embeds: [
        new MessageEmbed()
          .setTitle("Giveaway")
          .setColor("#12c4ff")
          .setDescription(
            "What role do you need to enter the giveaway? Mention a role/role-id if you want to specify or type `none` for no requirements."
          ),
      ],
    });

    let role = message.guild.roles.everyone;

    try {
      let a = await msg.channel.awaitMessages({
        filter: (m) => m.author.id === message.author.id,
        max: 1,
        time: 60000,
      });
      let mes = a.first();
      let roleA =
        mes.mentions.roles.first() || mes.guild.roles.cache.get(mes.content);
      if (!roleA) {
        throw new Error("No role found!");
      }
      role = roleA;
    } catch (e) {
      // Edit the message to tell the user that the role was not found
      msg.edit({
        embeds: [
          new MessageEmbed()
            .setTitle("Giveaway")
            .setColor("#12c4ff")
            .setDescription(
              "No role was mentioned!\n\nUsing `@everyone` as the role requirement."
            ),
        ],
      });
    }
    return role;
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

(async function loadRightNow() {
  giveaways = await db.list("giveaway");

  let inactiveGiveaways = (
    await Promise.all(
      (await db.list("giveaway")).map((giveaway) => db.get(giveaway))
    )
  ).filter((a) => !a.active);

  module.exports.inactiveGiveaways = new Map(
    inactiveGiveaways.map((giveaway) => [giveaway.message, giveaway])
  );

  giveaways = (
    await Promise.all((await db.list(`giveaway`)).map((a) => db.get(a)))
  ).filter((giveaway) => giveaway.active && giveaway.end <= Date.now());
  // Key is the giveaway.message, and value is each giveaway
  keyLookupGiveaway = new Map(
    giveaways.map((giveaway) => [giveaway.message, giveaway])
  );
})();

// This is more prefeable
setInterval(async () => {
  console.log("calling..");
  giveaways = (
    await Promise.all((await db.list(`giveaway`)).map((a) => db.get(a)))
  ).filter((giveaway) => giveaway?.active && giveaway.end <= Date.now());

  // Get message and channel for each giveaway using fetch async
  for (let giveaway of giveaways) {
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

    // Change the giveaway's active status to false
    giveaway.active = false;

    // Save the giveaway
    await db.set(`giveaway_${giveaway.message}`, giveaway);

    // Set the giveaway to inactive
    module.exports.inactiveGiveaways.set(giveaway.message, giveaway);

    // Reply the message to the channel that the giveaway has ended and mention the winners
    await msg.reply({
      content: `**Giveaway ended!**\n\n**Winners:** ${
        users ? users.map((u) => `<@${u.id}>`) : "Not enough participants!"
      }`,
    });
  }
}, 1000 * 30);

// Check reaction event to make sure it is the correct reaction
client.on("messageReactionAdd", async (reaction, user, msg) => {
  // Make sure the message is a giveaway by checking if it is in the key lookup
  if (!keyLookupGiveaway.has(reaction.message.id)) return;
  // Get the giveaway
  let giveaway = keyLookupGiveaway.get(reaction.message.id);
  // Make sure the user is not a bot
  if (user.bot) return;
  // Make sure the user is not the author of the message
  if (user.id === reaction.message.author.id) return;
  // If the giveaway is not active then return
  if (!giveaway.active) return;
  // Make sure that the message is in a guild
  if (!reaction.message.guild) return;

  // Make sure that the user has the role otherwise cancel the reaction
  let member = await reaction.message.guild.members.fetch(user);
  if (!member.roles.cache.has(giveaway.role)) {
    reaction.users.remove(user);
    member.send({
      embeds: [
        new MessageEmbed()
          .setTitle("Giveaway")
          .setColor("#12c4ff")
          .setDescription(
            `You don't have the required role to enter the giveaway!`
          )
          .addField("Required Role", `<@&${giveaway.role.name}>`),
      ],
    });
    return;
  }
});
