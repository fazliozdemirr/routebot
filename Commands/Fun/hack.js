module.exports = {
  name: "hack",
  aliases: ["Hack"],
  description: "Hack someone!",
  run(client, message, args) {

    const user = message.mentions.users.first();
    if (!user) return message.channel.send({ content: "Mention Someone to hack!" });

    message.channel.send({ content: "**[25%]** Finding IP..." }).then(m => {
      setTimeout(() => {
        m.edit("**[50%]** IP Found! Looking for email and password...").then(m2 => {
          setTimeout(() => {
            m2.edit(`**[75%]** Done! 
Email: ${user.username}@icloud.comm
Pssword: XjdhgikshGdk`).then(m3 => {
              setTimeout(() => {
                m3.edit("**[90%]** Deleting System32...").then(m4 => {
                  setTimeout(() => {
                    m4.edit(`**[93%]** Getting user avatar.`).then(m5 => {
                      setTimeout(() => {
                        m5.edit(`**[100%]** Avatar hacked! ${user.displayAvatarURL()}`).then(m6 => {
                          setTimeout(() => {
                            m6.edit(`Done hacking ${user}! All info was sent online!`)
                          }, 5500)
                        })
                      }, 4500)
                    })
                  }, 4500)
                })
              }, 5000)
            })
          }, 5000)
        })
      }, 5000)
    })
  }
}