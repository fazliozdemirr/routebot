module.exports = {
  name: `guildMemberRemove`,
  async run(member, { client, Discord }) {

    //Leave message
    const myServer = "940572040166006784";
    const leaveChannel = "945110178666278913";

    const leaveMsg = new Discord.MessageEmbed()
      .setTitle("Member Left")
      .setURL("https://youtube.com/ShadowCoDM")
      .setDescription(`${member} left the Server.`)
      .setColor("#12c4ff");
    
    if (member.guild.id === myServer) {
      
      client.channels.cache.get(leaveChannel).send({ embeds: [leaveMsg], content: `${member.user.tag}` })

      client.channels.cache.get('959357633733730324').send({
        content: `${process.env.modEmoji} **Mod log:**
> **Member:** ${member}
> **Member id:** ${member.id}
> **Member tag:** ${member.user.tag}
> **Action:** Server Leave
> **Server:** ${member.guild.id}`, embeds: [leaveMsg]
      })
    }
    //Leave message

  }
}