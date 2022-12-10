module.exports = {
  name: "nxp",
  aliases: ["nxp"],
  description: "Lock a channel",
  async run(client, message, args) {
    const Discord = require("discord.js");

    const member = message.mentions.users.first() || client.users.cache.get(args[0]);

    if (!member) return message.reply(`Member not Found. Please tag a user`);

    const fs = require("fs");
    const data = JSON.parse(await fs.readFileSync("../hub/croxydb/croxydb.json", "utf-8"));

    const members = data["members"] || [];
    const currUser = members.find(f => f?.discord?.id == member.id) || false;
    if (!currUser) return message.reply(`User Not found on DriversHub.`);

    const hubURL = "http://hub.nexonlogistics.com/"

    const jobs = data["jobs"] || [];
    const userJobs = jobs.filter(f => f?.driver?.userID == currUser.userID);

    const embed = new Discord.MessageEmbed()
      .setAuthor({ name: member.username, iconURL: member.displayAvatarURL() })
      //.setTitle(`User Details`)
      //.setURL(`${hubURL}`)
      .setThumbnail(`${hubURL}${currUser.avatar.replace("\\", "\/")}`)
      .addFields([
        {
          name: "DriversHub",
          value: `[${currUser.username}](${hubURL}profile/${currUser.userID})`,
          inline: true
        },
        {
          name: "Steam",
          value: `[Steam Profile](https://steamcommunity.com/profiles/${currUser.steamID})`,
          inline: true
        },
        {
          name: "TruckersMP",
          value: `[TruckersMP Profile](https://truckersmp.com/user/${currUser.TMPID})`,
          inline: true
        },
        {
          name: "Nexon XP",
          value: parseInt(currUser.NXP).toLocaleString() + " NXP",
          inline: true
        },
        {
          name: "Total Jobs",
          value: userJobs.length.toLocaleString(),
          inline: true
        },
        {
          name: "Total Distance",
          value: parseInt(currUser.distance).toLocaleString() + " kms",
          inline: true
        },
        {
          name: "Rank",
          value: `${currUser.rank}`,
          inline: true
        },
        {
          name: "License Number",
          value: `${currUser.license}`,
          inline: true
        }
      ])
      .setFooter({ text: "Provided By Nexon Drivers Hub", iconURL: client.user.displayAvatarURL() })
      .setTimestamp()
      .setColor(currUser.rankColor);
    message.channel.send({ embeds: [embed] });

  }
}