module.exports = {
  name: `messageDelete`,
  async run(message, { snipe, client, Discord }) {

    //Snipe
      snipe.set(message.channel.id, {
        content: message.content,
        author: message.author
      });
    //Snipe

  }
}