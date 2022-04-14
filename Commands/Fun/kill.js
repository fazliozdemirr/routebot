module.exports = {
  name: "kill",
  aliases: ["Kill"],
  description: "Kill someone!",
  run(client, message, args) {
    let victim = message.mentions.users.first()

    if (victim === "893705256368750592") return message.channel.send("Lmao <:igotubitch:945828580854747136>")

    if (!victim) message.reply("Mention someone to Kill.")
    else {
      let replies = [
        (`${victim} has been shot.`), (`${victim} https://c.tenor.com/V8Q-RyphiEoAAAAM/peachandgoma-goma.gif`), (`${victim} has been drowned.`),
        (`${victim} has been electrified.`), (`A goose honked at ${victim} to death.`),
        (`https://c.tenor.com/zopcO8RpVpUAAAAM/kill-yourself-killing-me-smalls.gif`),
        (`${victim} ate a poisonous potato.`),
        (`${victim} died from slowmode being tooo long.`),
        (`${victim} hit the ground too hard`),
        (`${victim} tried to swim in lava.`),
        (`${victim} https://c.tenor.com/6hfGuoFqEMIAAAAM/duck-mad.gif`),
        (`${victim} was found dead in a dumpster.`),
        (`https://c.tenor.com/50egAhARCjEAAAAM/cat-shooting.gif`),
        (`${victim} got drunk and fell in the water.`),
        (`${victim} made a deal with the devil.`),
        (`Aukaat hai to jake khud maar.`), (`https://c.tenor.com/cjQBQCbyr2EAAAAM/killed-em-hold-this.gif`), (`An alien named Jadoo abducted ${victim} in their sleep.`),
      ];

      const killed = `${replies[Math.floor(Math.random() * replies.length)]}`;

      message.channel.send({ content: `${killed}` })
    }
  }
}