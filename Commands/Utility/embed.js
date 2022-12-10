module.exports = {
  name: "embed",
  aliases: ["Embed"],
  run(client, message, args) {

    const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
    const splitArgs = require('../../Util/Commands/splitArgs');
    const role = message.guild.roles.cache.get('981494654115659796');
    const mods = message.guild.roles.cache
      .filter(r => r.position >= role.position)
      .map(r => r.id);

    if (!message.member.roles.cache.hasAny(...mods)) return message.reply({
      embeds: [
        new MessageEmbed()
          .setColor('RED')
          .setDescription(`You don't have permission to do that!`)
      ]
    });

    let msgSplit = splitArgs({
      content: args,
      args: [`--author`, `--authorUrl`, `--authorIcon`, `--title`, `--titleUrl`, `--desc`, `--color`, `--footerTxt`, `--footerIcon`, `--thumbnail`, `--image`]
    })

    const wrongUsage = new MessageEmbed()
      .setTitle(`Wrong command usage!`)
      .setColor(`RED`)
      .setDescription(`
**Command usage:** \`-embed build [--title] <--titleUrl> <--author> <--authorUrl> <--authorIcon> <--desc> <--color> <--footerTxt> <--footerIcon> <--thumbnail> <--image>\`
`)
      .setFooter(`[] - Required | <> - Optional`);

    const wrongLink = new MessageEmbed()
      .setTitle(`Invalid URL!`)
      .setColor(`RED`)
      .setDescription(`Make sure the link(s) provided only contain(s) numbers and a to z characters!`)

    let linkMatch = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g

    let author = msgSplit.find(item => item.name === `--author`)
    let authorUrl = msgSplit.find(item => item.name === `--authorUrl`)
    let authorIcon = msgSplit.find(item => item.name === `--authorIcon`)
    let title = msgSplit.find(item => item.name === `--title`)
    let url = msgSplit.find(item => item.name === `--titleUrl`)
    let desc = msgSplit.find(item => item.name === `--desc`)
    let color = msgSplit.find(item => item.name === `--color`)
    let footerTxt = msgSplit.find(item => item.name === `--footerTxt`)
    let footerIcon = msgSplit.find(item => item.name === `--footerIcon`)
    let thumbnail = msgSplit.find(item => item.name === `--thumbnail`)
    let image = msgSplit.find(item => item.name === `--image`)

    if (!title) return message.reply({ embeds: [wrongUsage] })

    if (
      (url && !url.value.match(linkMatch)) ||
      (thumbnail && !thumbnail.value.match(linkMatch)) ||
      (image && !image.value.match(linkMatch)) ||
      (footerIcon && !footerIcon.value.match(linkMatch)) ||
      (authorUrl && !authorUrl.value.match(linkMatch)) ||
      (authorIcon && !authorIcon.value.match(linkMatch))
    ) return message.reply({ embeds: [wrongLink] });
    if (!title) return message.reply({ embeds: [wrongUsage] });
    if (color && !color.value.match(/^(#[0-9A-Fa-f]{6})$/g)) color.value = Utility.decodeColor(color.value.toUpperCase()) || `#303136`;
    if (!color) color = {
      value: `#303136`
    };

    if (authorIcon && !author) return message.reply({
      embeds: [
        new MessageEmbed()
          .setColor('RED')
          .setDescription(`Please enter the author text!`)
      ]
    });
    if (authorUrl && !author) return message.reply({
      embeds: [
        new MessageEmbed()
          .setColor('RED')
          .setDescription(`Please enter the author text!`)
      ]
    });

    if (footerIcon && !footerTxt) return message.reply({
      embeds: [
        new MessageEmbed()
          .setColor('RED')
          .setDescription(`Please enter the footer text!`)
      ]
    });

    const embed = new MessageEmbed()
    .setTimestamp()
    if (author) embed.setAuthor({ name: `${author.value}` })
    if (authorUrl) embed.setAuthor({ name: `${author.value}`, url: `${authorUrl.value}` })
    if (authorIcon) embed.setAuthor({ name: `${author.value}`, iconURL: `${authorIcon.value}` })
    if (authorIcon && authorUrl) embed.setAuthor({ name: `${author.value}`, iconURL: `${authorIcon.value}`, url: `${authorUrl.value}` })
    if (title) embed.setTitle(`${title.value}`)
    if (url) embed.setURL(`${url.value}`)
    if (desc) embed.setDescription(`${desc.value}`)
    if (color) embed.setColor(`${color.value}`)
    if (footerTxt) embed.setFooter({ text: `${footerTxt.value}` })
    if (footerIcon) embed.setFooter({ text: `${footerTxt.value}`, iconURL: `${footerIcon.value}` })
    if (thumbnail) embed.setThumbnail(`${thumbnail.value}`)
    if (image) embed.setImage(`${image.value}`)

    message.channel.send({ embeds: [embed] });
message.delete();
  }
}