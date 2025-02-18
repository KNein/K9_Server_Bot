const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.guilds.cache.forEach(guild => {
        console.log(`Connected to server: ${guild.name}`);
    });
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === "fenno") {

        await interaction.reply('<@548476592083697675> is a stinky fox!');

}});



//console.log(process.env.DISCORDBOTTOKEN);
client.login(process.env.DISCORDBOTTOKEN);