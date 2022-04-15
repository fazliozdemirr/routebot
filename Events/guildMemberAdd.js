module.exports = {
  name: `guildMemberAdd`,
  async run(member, { client, Discord }) {

    //Member role add 
    const welcomeRole = member.guild.roles.cache.find(role => role.name === "Member");
    member.roles.add(welcomeRole);
    //Member role add 

    //Welcome message 
    const a = '<a:arrows:962691668920905749>';
    const w = '<:wow:945828533379428412>';
    const myServer = "940572040166006784";
    const welcomeChannel = "940619456609157150";

    const memberEmbed = new Discord.MessageEmbed()
      .setTitle(`Welcome ${member.displayName}`)
      .setURL("https://www.youtube.com/c/ShadowCoDM")
      .setDescription(`Do check out Shadow on [YouTube](https://youtube.com/c/ShadowCoDM)
New videos every Wednesday and Sunday, Do subscribe if you enjoy the content!`)
      .setColor("#12c4ff");

    const embed = new Discord.MessageEmbed()
      .setTitle("Welcome")
      .setURL("https://www.youtube.com/c/ShadowCoDM")
      .setDescription(`Hello! ${member}
Welcome to ConquerX

${a} Please follow the <#940575037763764265> of the Server.

${a} Take your roles from <#940632102813179925>

${a} Chat with everyone in <#940572040166006787>.

${w} Thank You For Joining Our Server.`)
      .setColor("#12c4ff")
      .setImage(`${process.env.welcomeImg}`);

    if (member.guild.id === myServer) {

      client.channels.cache.get(welcomeChannel).send({ content: `${member.user.tag} joined!`, embeds: [embed] })

      /*member.send({ embeds: [memberEmbed, embed] })*/

      client.channels.cache.get('959357633733730324').send({
        content: `${process.env.modEmoji} **Mod log:**
> **Member:** ${member}
> **Member id:** ${member.id}
> **Member tag:** ${member.user.tag}
> **Action:** Server Join
> **Server:** ${member.guild.id}
> **Channel:** <#940619456609157150>`, embeds: [embed]
      })

    }
    //Welcome message

  }
}