module.exports = {
  name: "wouldyourather",
  aliases: ["Wouldyourather", "WouldYouRather"],
  description: "",
  run(client, message, args) {
    const { WouldYouRather } = require('discord-gamecord')
    try {
      new WouldYouRather({
        message: message,
        slash_command: false,
        embed: {
          title: 'Would You Rather',
          color: '#5865F2',
        },
        thinkMessage: '**Thinking...**',
        buttons: { option1: 'Option 1', option2: 'Option 2' },
        othersMessage: 'You are not allowed to use buttons for this message!',
      }).startGame();
    } catch (e) {
      console.log(e)
      return message.channel.send(`Wrong command usage!
Command usage: \`-ttt @user\``)
    }
  }
}