module.exports = {
  name: "nitro",
  aliases: ["Nitro"],
  description: "Get Nitro!",
  run(client, message, args) {

const nitro = `||1. Wait till your mom isn’t home||
||2. Lock all the doors||
||3. Find your moms credit car||
||4. Buy some gift cards||
||5. Send the codes here||
||6. Buy a lot of nitro||
||7. Run||`;
    
  message.channel.send({content: `${nitro}`})
  }
}