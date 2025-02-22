const { REST, Routes } = require('discord.js');
require('dotenv').config();



const commands = [
    {
        name: "fenno_stinks",
        description: "vote that fenno is a stinky fox",
    },
    {
        name: "yes",
        description: "no",
    },
    {
        name: "fenno_stinks_count",
        description: "get the current ammount of how many people think fenno is stinky",
    }
];





const rest = new REST({ version: '10' }).setToken(process.env.DISCORDBOTTOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();