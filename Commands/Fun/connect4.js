module.exports = {
  name: "connect4",
  aliases: ["Connect4"],
  description: "Play connect4 game with someone",
  run(client, message, args) {
    const { Connect4 } = require('discord-gamecord')

    try {
      new Connect4({
        message: message,
        slash_command: false,
        opponent: message.mentions.users.first(),
        embed: {
          title: 'Connect 4',
          description: 'Connect atleast 4 dots to Win!',
          color: '#5865F2',
        },
        emojis: {
          player1: '🔵',
          player2: '🟡'
        },
        waitMessage: 'Waiting for the opponent...',
        turnMessage: '{emoji} | Its turn of player **{player}**.',
        winMessage: '{emoji} | **{winner}** won the game!',
        gameEndMessage: 'The game went unfinished :(',
        drawMessage: 'It was a draw!',
        othersMessage: 'You are not allowed to use buttons for this message!',
        askMessage: 'Hey {opponent}, {challenger} challenged you for a game of Connect 4!',
        cancelMessage: 'Looks like they refused to have a game of Connect4. \:(',
        timeEndMessage: 'Since the opponent didnt answer, i dropped the game!',
      }).startGame()
    } catch (e) {
      console.log(e)
      return message.channel.send({
        content: `Wrong command usage!
Command usage: \`-connect4 @user\``})
    }
  }
}