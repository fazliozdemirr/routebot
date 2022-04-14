module.exports = {
  name: "minesweeper",
  aliases: ["Minesweeper", "MS", "ms", "Ms"],
  description: "Play minesweeper game in discord!",
  run(client, message, args) {
    const Minesweeper = require('discord.js-minesweeper');

    const minesweeper = new Minesweeper({
      rows: 12,
      columns: 16,
      mines: 20,
      emote: 'tada',
      returnType: 'code',
    });
    minesweeper.start();
  }
}

/*

This is default which gives 9x9 minesweeper:
const minesweeper = new Minesweeper();
minesweeper.start();

For exploring the discord.js-minesweeper go to: https://www.npmjs.com/package/discord.js-minesweeper

  */