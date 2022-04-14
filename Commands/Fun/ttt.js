module.exports = {
  name: "ttt",
  aliases: ["TTT", "TicTacToe", "tictactoe"],
  description: "",
  run(client, message, args) {
    const { TicTacToe } = require('discord-gamecord')

    try {
      new TicTacToe({
        message: message,
        slash_command: false,
        opponent: message.mentions.users.first(),
        embed: {
          title: 'Tic Tac Toe',
          overTitle: 'Game Over',
          color: '#5865F2',
        },
        oEmoji: '🔵',
        xEmoji: '❌',
        blankEmoji: '➖',
        oColor: 'PRIMARY',
        xColor: 'DANGER',
        waitMessage: 'Waiting for the opponent...',
        turnMessage: '{emoji} | Its now **{player}** turn!',
        askMessage: 'Hey {opponent}, {challenger} challenged you for a game of Tic Tac Toe!',
        cancelMessage: 'Looks like they refused to have a game of Tic Tac Toe. \:(',
        timeEndMessage: 'Since the opponent didnt answer, i dropped the game!',
        drawMessage: 'It was a draw!',
        winMessage: '{emoji} | **{winner}** won the game!',
        gameEndMessage: 'The game went unfinished :(',
      }).startGame();
    } catch (e) {
      console.log(e)
      return message.channel.send(`Wrong command usage!
Command usage: \`-ttt @user\``)
    }
  }
}