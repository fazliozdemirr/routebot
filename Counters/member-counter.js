module.exports = async (client, message) => {

  const guild = client.guilds.cache.get('940572040166006784')
  setInterval(() => {
    const memberCount = guild.memberCount;
    const channel = guild.channels.cache.get('945213348000182332');
    channel.setName(`Members: ${memberCount.toLocaleString()}`)
    console.log('Updating Member Count')
  }, 20000);

/*  if (!message.guild.id === `${process.env.myServer}`) {

    const guild = client.guilds.cache.get(`${message.guild.id}`);

    setInterval(async () => {

      const memberCount = guild.memberCount.toLocaleString();
      const [channelName] = [db.get(`customName_${message.guild.id}`)];
      const channel = await message.guild.channels.create(`${channelName}: ${memberCount}`, { type: 'GUILD_VOICE' });
      channel.permissionOverwrites.create(message.guild.id, {
        VIEW_CHANNEL: true,
        CONNECT: false
      })
      /*  channel.setName(`${customName}`)
    }, 20000);

  }*/

}