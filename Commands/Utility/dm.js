module.exports = {
    name: 'dm',
    run(client, message, args) {

        const { MessageEmbed } = require('discord.js');

        const userId = args[0];
        const user = client.users.cache.get(userId);
        const content = args[1].join();

        user.send({
            embeds: [
                new MessageEmbed()
                    .setColor('BLUE')
                    .setDescription(content)
            ]
        });

    }
}