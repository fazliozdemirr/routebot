module.exports = {
  name: "nick",
  aliases: ["rename", "Nick", "Rename", "nickname", "Nickname"],
  description: "Change the nickname of a member",
  run(client, message, args) {
const Discord = require("discord.js")
    
    if (!message.member.permissions.has("MANAGE_NICKNAMES")) return message.channel.send("You don't have permission to do that!")

    const user = message.mentions.members.first();
    const nickname = args[1];

    if (!user) return message.channel.send(`Wrong command usage!
Command usage: \`-nick @user nickname\``)

    if (!nickname) return message.channel.send(`Please specify a nickname`)
    user.setNickname(`${nickname}`).then(() => {
      message.channel.send(`Success`)

    })
  }
}