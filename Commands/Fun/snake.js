module.exports = {
  name: "snake",
  aliases: ["Snake", "snake-game"],
  description: "Play the classic snake game on Discord!",
  run(client, message, args) {
    const Discord = require("discord.js");
    const { Snake } = require("discord-gamecord");

    new Snake({
      message: message,
      embed: {
        title: 'Snake Game',
        color: '#12c4ff',
        OverTitle: "Game Over",
      },
      snake: { head: '🟢', body: '🟩', tail: '🟢' },
      emojis: {
        board: '⬛',
        food: '🍎',
        up: '⬆️',
        right: '➡️',
        down: '⬇️',
        left: '⬅️',
      },
      othersMessage: 'You are not allowed to use buttons for this message!',
    }).startGame();
  }
}