module.exports = {
  name: "purge",
  aliases: ["Purge", "clear", "Clear"],
  description: "Delete bulk messages",
  run(client, message, args) {
    const arg = message.content.split(" ")
    if (message.member.permissions.has("MANAGE_MESSAGES")) {
      const clear = arg[01]
      if (!clear) return message.channel.send(`Incorrect usage of command you need to provide an amount of messages to Clear.
Example: -purge 50`)
      if (isNaN(clear)) return message.channel.send("Please Put a Valid Number to Clear messages.")
      if (clear > 1000) return message.channel.send("I can't Clear more than 100 messages.")
      if (clear < 1) return message.channel.send("You cannot Clear less than 1 message.")
      message.channel.bulkDelete(clear)

if(message.guild.id === `${process.env.myServer}`) {
        client.channels.cache.get('959357633733730324').send({
          content: `${process.env.modEmoji} **Mod log:**
> **Content:** ${message.content}
> **Action:** Purge, ${clear} messages deleted from ${message.channel}
> **Channel:** ${message.channel}
> **Message id:** ${message.id}
> **Moderator:** ${message.author}`
        })
};
      message.channel.send(`Succesfully cleared ${clear} messages! If purge fails please make sure I have MANAGE_MESSAGES to make the purge successful.`).then(msg => msg.delete()
      )
    } else {
      message.reply("You dont have permission to do that!")
    }
  }
}