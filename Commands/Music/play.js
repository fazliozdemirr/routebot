module.exports = {
  name: "play",
  aliases: ["Play", "p", "P"],
  description: "Clan Recruitment page",
  async run(client, message, args) {

    const ytdl = require('ytdl-core');
    const ytSearch = require('yt-search');
    const { joinVoiceChannel } = require('@discordjs/voice')

    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) return message.channel.send({ content: `You need to be in a voice channel to play music!` });

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) return message.channel.send({ content: `You don't have permission to do that!` });
    if (!permissions.has('SPEAK')) return message.channel.send({ content: `You don't have permission to do that!` });
    if (!args.length) return message.channel.send({ content: `.....` });

    //    const connection = await voiceChannel.join();

    const connection = joinVoiceChannel({
      channelId: message.member.voice.channel,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator
    });

    const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);
      return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
    };

    const video = await videoFinder(args.join(' '));

    if (video) {
      const stream = ytdl(video.url, { filter: 'audioonly' });
      connection.play(stream, { seek: 0, volume: 1 })
        .on('Finish', () => {
          voiceChannel.leave();
        });

      await message.reply({ content: `Now Playing **${video.title}**` })

    } else {
      message.channel.send({ content: `No results found!` })
    }

  }
}