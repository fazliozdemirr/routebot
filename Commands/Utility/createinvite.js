module.exports = {
  name: "createinvite",
  aliases: ["Createinvite", "createinv", "CreateInvite", "CreateInv"],
  description: "Create an invite link for a channel!",
  async run(client, message, args) {
    await message.channel.createInvite().then(i => {
      message.channel.send({ content: `https://discord.gg/${i.code}` })
    })
  }
}