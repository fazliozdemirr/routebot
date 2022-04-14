module.exports = {
  name: "reverse",
  aliases: ["Reverse"],
  perms: ["KICK_MEMBERS"],
  description: "Reverse a word/sentence",
  run(client, message, args) {

    const arg = message.content
      .trim()
      .split(/ +/g);
    const text = arg.slice(1).join(" ");
    if (!text) return message.channel.send(`Provide some text Bruh! **Example:** \`-reverse UwU\``)

    // Reverse the message
    var reversed = '';
    var i = text.length;

    while (i > 0) {
      reversed += text.substring(i - 1, i);
      i--;
    }

    // Reply to the user's message
    message.channel.send(reversed);
  }
}