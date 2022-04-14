/*module.exports = {
  name: "membercounter",
  aliases: ['memberCounter', 'member-counter', 'Member-Counter', 'MemberCounter'],
  description: "Set member counter for your server",
  async run(client, message, Discord, args) {

    const Database = require("@replit/database");
    const db = new Database();
    const memberCount = message.guild.memberCount.toLocaleString();
    let customName = args[0];

if(!customName) customName = `Members: ${memberCount}`
    
    db.set(`customName_${message.guild.id}`, `${customName}`);

  if (!message.guild.id === `${process.env.myServer}`) {

    const guild = client.guilds.cache.get(`${message.guild.id}`);

    setInterval(async () => {

      const [channelName] = [db.get(`customName_${message.guild.id}`)];
      const channel = await message.guild.channels.create(`${channelName}: ${memberCount}`, { type: 'GUILD_VOICE' });
      channel.permissionOverwrites.create(message.guild.id, {
        VIEW_CHANNEL: true,
        CONNECT: false
      })
      /*   channel.setName(`${customName}`)
    }, 20000);

  }
    
  }
}*/