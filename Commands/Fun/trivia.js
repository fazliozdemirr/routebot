module.exports = {
  name: "trivia",
  aliases: ["Trivia", "quiz","Quiz"],
  description: "",
  run(client, message, args) {
    const { Trivia } = require('discord-gamecord')

    try {
      new Trivia({
        message: message,
        slash_command: false,
        embed: {
          title: 'Trivia',
          description: 'You have {time} seconds to respond!',
          color: '#5865F2',
        },
        difficulty: 'medium',
        winMessage: 'GG, Your answer was correct! It was **{answer}**',
        loseMessage: 'Your answer was Incorrect! The correct answer was **{answer}**',
        othersMessage: 'You are not allowed to use buttons for this message!',
      }).startGame();
    } catch (e) {
      console.log(e)
      return message.channel.send(`Wrong command usage!
Command usage: \`-ttt @user\``)
    }
  }
}