module.exports = {
  name: "schedulemsg",
  aliases: ["smsg", "scheduledmsg"],
  description: "Schedule a message!",
  run(client, message, args) {
    const ms = require("ms");

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send({ content: `You don't have permission to do that!` })

    const msg = args.join(' ');
    const msgSplit = msg.split(' - ');
    const scheduledMsg = msgSplit[0];
    const time = msgSplit[1];

    if (!scheduledMsg) return message.channel.send({
      content: `Wrong command usage!
Command usage: \`-schedulemsg message - time(1s, 1m, 1h, 1d\``});

    if (!time) return message.channel.send({
      content: `Wrong command usage!
Command usage: \`-schedulemsg message - time(1s, 1m, 1h, 1d\``});

    try {
      setTimeout(() => {
        message.channel.send({ content: `${scheduledMsg}` })
      }, ms(time))
      message.delete();
    } catch (e) {
      console.log(e)
      return message.channel.send({ content: 'Oops! Something went wrong...' })
    }
  }
}