module.exports = {
  name: "serveravatar",
  aliases: ["server-avatar", "Serveravatar", "ServerAvatar", "Server-Avatar"],
  description: "Get the Avatar of the Server",
  run(client, message, args) {
    if (!message.member.permissions.has("BAN_MEMBERS")) return
    message.channel.send("You don't have permision to do that!");
    message.channel.send(`${message.guild.iconURL()}`)
  }
}