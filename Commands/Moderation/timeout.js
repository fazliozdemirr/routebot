module.exports = {
  name: "timeout",
  aliases: ["Timeout", "mute"],
  description: "Timeout a member",
  run(client, message, args) {
    try {
      const { MessageEmbed } = require('discord.js');
      const ms = require('ms');
      const msg = args.join(' ');
      const msgSplit = msg.split(' - ');
      const member = message.mentions.members.first() || msgSplit[0];
      const time = ms(msgSplit[1]);
      const reason = msgSplit[2] || `Not specified`;

      const noPerms = new MessageEmbed()
        .setColor('#12c4ff')
        .setDescription(`You don't have permission to do that!`);

      const timeout = new MessageEmbed()
        .setColor('#12c4ff')
        .setDescription(`${member} was muted!
**Reason:** ${reason}`);

      const modEmbed = new MessageEmbed()
        .setDescription(`**Message:** [Message](${message.url})`)
        .setColor("12c4ff")
        .setTimestamp()
        .setFooter({ text: `This message was issued by Administration` });

      const modContent = `${process.env.modEmoji} **Mod log:**
    > **Content:** ${message.content}
    > **Action:** Mute
    > **Channel:** ${message.channel}
    > **Message id:** ${message.id}
    > **Moderator:** ${message.author}`;

      if (!message.member.permissions.has('TIMEOUT_MEMBERS')) return message.channel.send({ embeds: [noPerms] });

      if (!member) return message.channel.send({
        content: `Wrong command usage!
**Command usage:** \`-mute @user - time(1s, 1m, 1h, 1d...) - reason(optional)\``});

      if (!time) return message.channel.send({
        content: `Wrong command usage!
**Command usage:** \`-mute @user - time(1s, 1m, 1h, 1d...) - reason(optional)\``});

   /*   if (!time.endsWith('s') ||
        !time.endsWith('m') ||
        !time.endsWith('h') ||
        !time.endsWith('d')
      ) return message.reply({
        content: `Wrong command usage!
**Command usage:** \`-mute @user - time - reason(optional)\``});*/

      member.timeout(time)
      message.channel.send({ embeds: [timeout] })
      message.delete()

      if (message.guild.id === `${process.env.myServer}`) {
        client.channels.cache.get('959357633733730324').send({
          content: `${modContent}`, embeds: [modEmbed, timeout]
        })
      }

    } catch (e) {

      console.log(e)
      return message.reply({
        content: `Wrong command usage!
**Command usage:** \`-mute @user - time(1s, 1m, 1h, 1d...) - reason(optional)\``});
    }

  }
}