module.exports = {
  name: "shutdown",
  aliases: ["Shutdown"],
  description: "Shutdown the bot",
  run(client, message, args) {

    if (!message.member.roles.cache.has('940614698599084062')) return message.channel.send({ content: `You don't have permission to do that!` });

    message.channel.send({ content: "Bot shutting down" }).then(m => {
      setTimeout(() => {
        m.edit("Bot shutting down.").then(m2 => {
          setTimeout(() => {
            m2.edit("Bot shutting down..").then(m3 => {
              setTimeout(() => {
                m3.edit("Bot shutting down...").then(m4 => {
                  setTimeout(() => {
                    m4.edit("Bot shutting down").then(m5 => {
                      setTimeout(() => {
                        m5.edit("Bot shutting down.").then(m6 => {
                          setTimeout(() => {
                            m6.edit("Bot shutting down..").then(m7 => {
                              setTimeout(() => {
                                m7.edit("Bot shutting down...").then(m8 => {
                                  setTimeout(() => {
                                    m8.edit("Bot shutting down").then(m9 => {
                                      setTimeout(() => {
                                        m9.edit("Bot shutting down.").then(m10 => {
                                          setTimeout(() => {
                                            m10.edit("Bot shutting down..").then(m11 => {
                                              setTimeout(() => {
                                                m11.edit("Bot shutting down...").then(() => {
                                                  setTimeout(() => {
                                                    process.exit();
                                                  }, 2000)
                                                })
                                              }, 500)
                                            })
                                          }, 500)
                                        })
                                      }, 500)
                                    })
                                  }, 500)
                                })
                              }, 500)
                            })
                          }, 500)
                        })
                      }, 500)
                    })
                  }, 500)
                })
              }, 500)
            })
          }, 500)
        })
      }, 500)
    });

  }
}