module.exports = {
  name: "deletechannel",
  aliases: ["close", "Close", "Delete Channel"],
  description: "Delete a channel",
  run(client, message, args) {
    if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("You don't have permission to do that!");

    if (message.guild.id === `${process.env.myServer}`) {
      if (!message.channel.name.startsWith("ticket-")) return message.channel.send({content: "This is not a ticket!", ephemeral: true})
      else {
        message.channel.delete();
      }
      client.channels.cache.get('959357633733730324').send({
        content: `${process.env.modEmoji} **Mod log:**
> **Content:** ${message.content}
> **Action:** Channel Delete
> **Channel:** ${message.channel}
> **Channel name:** ${message.channel.name}
> **Message id:** ${message.id}`
      });
    }

      
    else {
      if (!message.channel.name.startsWith("ticket-")) return message.channel.send({content: "This is not a ticket!", ephemeral: true})
      else {
        message.channel.delete();
      }
    }
    
  }
}