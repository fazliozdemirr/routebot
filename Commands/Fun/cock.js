module.exports = {
  name: "cock",
  aliases: ["Cock"],
  description: "Cock",
  run(client, message, args) {
    message.channel.send({
      content: `You have been trolled by the cockroach.
Type \`-cockroach\``});
  }
}