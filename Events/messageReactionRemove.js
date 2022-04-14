module.exports = {
  name: `messageReactionRemove`,
  async run(reaction, { client, Discord }, user1) {

    let user = reaction.message.guild.members.cache.get(user1.id)

    if (reaction.message.partial) await reaction.message.fetch();

    if (reaction.partial)
      try {
        await reaction.fetch();
      }
      catch (error) {
        console.log(error);
        return;
      }

    if (user.bot) return;

    const AS = reaction.message.guild.roles.cache.find(r => r.id === "944060728543961118");
    const NA = reaction.message.guild.roles.cache.find(r => r.id === "944060738421522432");
    const SA = reaction.message.guild.roles.cache.find(r => r.id === "944060745992269834");
    const EU = reaction.message.guild.roles.cache.find(r => r.id === "944060734495686716");
    const OCE = reaction.message.guild.roles.cache.find(r => r.id === "944060758428377139");
    const Android = reaction.message.guild.roles.cache.find(role => role.name === "Android");
    const iOS = reaction.message.guild.roles.cache.find(role => role.name === "948039779453403166");
    const Emulator = reaction.message.guild.roles.cache.find(role => role.name === "Emulator");
    const Giveaway = reaction.message.guild.roles.cache.find(r => r.name === "Giveaway");
    const Event = reaction.message.guild.roles.cache.find(role => role.name === "Event");
    const News = reaction.message.guild.roles.cache.find(role => role.name === "News");
    const Tournament = reaction.message.guild.roles.cache.find(role => role.name === "Tournament");

    let members = await reaction.message.guild.members.fetch();

    let member = members.get(user.id);
    if (reaction.message.channel.id == "940632102813179925") {
      if (reaction.emoji.name === "🇦") {
        await member.roles.remove(AS);
      };
      if (reaction.emoji.name === "🇳") {
        await member.roles.remove(NA);
      };
      if (reaction.emoji.name === "🇸") {
        await member.roles.remove(SA);
      };
      if (reaction.emoji.name === "🇪") {
        await member.roles.remove(EU);
      };
      if (reaction.emoji.name === "🇴") {
        await member.roles.remove(OCE);
      };
      if (reaction.emoji.name === "📱") {
        await member.roles.remove(Android);
      };
      if (reaction.emoji.name === "🍎") {
        await member.roles.remove(iOS);
      };
      if (reaction.emoji.name === "🖥️") {
        await member.roles.remove(Emulator);
      };
      if (reaction.emoji.name === "🎉") {
        await member.roles.remove(Giveaway);
      };
      if (reaction.emoji.name === "🎁") {
        await member.roles.remove(Event);
      };
      if (reaction.emoji.name === "🔔") {
        await member.roles.remove(News);
      };
      if (reaction.emoji.name === "🗡️") {
        await member.roles.remove(Tournament);
      };
    } else {
      return;
    }
  }
}