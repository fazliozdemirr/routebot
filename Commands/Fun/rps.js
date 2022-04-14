module.exports = {
  name: "rps",
  aliases: ["RPS", "RockPaperScissors", "Rock Paper  Human"],
  description: "Play Rock Paper Scissors with the bot or someone else",
  async run(client, message, args) {

    const { RockPaperScissors } = require('discord-gamecord')


//--------------Enemy---------------- 
    const enemy = message.mentions.members.first();
//--------------Enemy---------------- 


//----------If Enemy is Real----------
    if (enemy) {
      try {
        new RockPaperScissors({
          message: message,
          slash_command: false,
          opponent: message.mentions.users.first(),
          embed: {
            title: 'Rock Paper Scissors',
            description: 'Press a button below to make a choice!',
            color: '#5865F2',
          },
          buttons: {
            rock: 'Rock',
            paper: 'Paper',
            scissors: 'Scissors',
          },
          emojis: {
            rock: '🌑',
            paper: '📃',
            scissors: '✂️',
          },
          othersMessage: 'You are not allowed to use buttons for this message!',
          chooseMessage: 'You choose {emoji}!',
          noChangeMessage: 'You cannot change your selection!',
          askMessage: 'Hey {opponent}, {challenger} challenged you for a game of Rock Paper Scissors!',
          cancelMessage: 'Looks like they refused to have a game of Rock Paper Scissors. \:(',
          timeEndMessage: 'Since the opponent didnt answer, i dropped the game!',
          drawMessage: 'It was a draw!',
          winMessage: '{winner} won the game!',
          gameEndMessage: 'The game went unfinished :(',
        }).startGame();
      } catch (e) {
        console.log(e)
        return message.channel.send(`Wrong command usage!
Command usage: \`-rpshuman @user\``)
      }
    }
//----------If Enemy is Real----------


//----------If Enemy is Bot-----------
    if (!enemy) {
      try {
        const Discord = require('discord.js');

        const embed = new Discord.MessageEmbed()
          .setTitle("Rock Paper Scissors")
          .setDescription("React with your choice, you have 10 seconds!")
          .setColor("#12c4ff")
          .setTimestamp()

        const msg = await message.channel.send({ embeds: [embed] })
        await msg.react("🪨")
        await msg.react("✂")
        await msg.react("📰")

        const filter = (reaction, user) => {
          return ['🪨', '✂', '📰'].includes(reaction.emoji.name) && user.id === message.author.id;
        }

        const choices = ['🪨', '✂', '📰'];

        const me = choices[Math.floor(Math.random() * choices.length)]

        msg.awaitReactions({ filter, max: 1, time: 10000, error: ["time"] }).then(
          async (collected) => {
            const reaction = collected.first()

            const result = new Discord.MessageEmbed()
              .setTitle("Result:")
              .setColor("#12c4ff")
              .setTimestamp()
              .addField("Your choice:", `${reaction.emoji.name}`)
              .addField("My choice:", `${me}`)

            await msg.edit({ embeds: [result] })
            if ((me === "🪨" && reaction.emoji.name === "✂") ||
              (me === "📰" && reaction.emoji.name === "🪨") ||
              (me === "✂" && reaction.emoji.name === "📰")) {
              message.reply("You lost!");
            } else if (me === reaction.emoji.name) {
              return message.reply("It's a tie!");
            } else {
              return message.reply("You won!");
            }
          })
          .catch(collected => {
            message.reply('You ran out of time, cancelling game.');
          })
      } catch (e) {
        console.log(e)
        return message.channel.send(`Oops! Something went wrong...`)
      }
    }
//----------If Enemy is Bot-----------

  }
}